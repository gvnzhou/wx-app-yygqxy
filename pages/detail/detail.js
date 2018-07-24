// pages/detail/detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songDetail: {},
    isCollect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.setData({
      songId: options.id
    })
    // 获取详情
    this.getSongDetail(options.id)

    this.isCollected(options.id)
  },

  isCollected: function (id) {
    try {
      let songCollections = wx.getStorageSync('song_collections')
      if (songCollections) {
        if (songCollections.map(item => item._id).indexOf(id) > -1) {
          this.setData({
            isCollect: true
          })
        } else {
          this.setData({
            isCollect: false
          })
        }
      }
    } catch (e) {
      wx.showToast({
        title: e,
        icon: 'none',
        duration: 2000
      })
    }
  },

  // 取消收藏
  deleteCollection: function (e) {
    let _this = this
    wx.request({
      url: app.globalData.serverUrl + '/user/deleteCollection',
      header: {
        'third-session': wx.getStorageSync('third_session')
      },
      method: 'POST',
      data: {
        id: _this.data.songId
      },
      success: function (res) {
        if (res.data.code === 200) {
          // 删除本地相关缓存数据
          try {
            let localSongData = wx.getStorageSync('song_collections')
            localSongData.splice(localSongData.indexOf(_this.data.songId), 1)
            wx.setStorageSync('song_collections', localSongData)
          } catch (e) {
            wx.showToast({
              title: e,
              icon: 'none',
              duration: 2000
            })
          }
          
          _this.setData({
            isCollect: false
          })
          wx.showToast({
            title: '取消收藏成功',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: res.data.error,
            icon: 'none',
            duration: 2000
          })
        }
      }
    }, function (error) {
      wx.showToast({
        title: error,
        icon: 'none',
        duration: 2000
      })
    })
  },

  addCollection: function (e) {
    let _this = this
    // 判断用户是否授权登录
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，收藏歌曲，并且本地记录收藏信息
          wx.request({
            url: app.globalData.serverUrl + '/user/addCollection',
            header: {
              'third-session': wx.getStorageSync('third_session')
            },
            method: 'POST',
            data: {
              id: _this.data.songId
            },
            success: function (res) {
              if (res.data.code === 200) {
                // 添加收藏记录
                try {
                  let localSongData = wx.getStorageSync('song_collections')
                  localSongData.push(_this.data.songDetail)
                  wx.setStorageSync('song_collections', localSongData)
                } catch (e) {
                  wx.showToast({
                    title: e,
                    icon: 'none',
                    duration: 2000
                  })
                }
                _this.setData({
                  isCollect: true
                })
                wx.showToast({
                  title: '收藏成功',
                  icon: 'none',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: res.data.error,
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          }, function (error) {
            wx.showToast({
              title: error,
              icon: 'none',
              duration: 2000
            })
          })
        } else {
          // 跳转登录页
          wx.switchTab({
            url: '/pages/member/member'
          })
        }
      }
    })
  },

  getSongDetail: function (id) {
    let _this = this
    wx.request({
      url: app.globalData.serverUrl + '/song/' + id,
      success: function (res) {
        // TODO: 处理歌词
        res.data.data[0].content = res.data.data[0].content.replace(/\|/g, '\n')
        _this.setData({
          songDetail: res.data.data[0]
        })
      }
    })
  }
})
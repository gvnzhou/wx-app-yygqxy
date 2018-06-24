// pages/search/search.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    historySearch: ['喜帖街','红玫瑰','浮夸'],
    songList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self = this
    wx.getStorage({
      key: 'historySearch',
      success: function (res) {
        self.setData({
          historySearch: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // input数据绑定
  bindValueInput: function (e) {
    this.setData({
      [e.target.dataset.name]: e.detail.value
    })
  },
  // 获取搜索结果
  getSongList: function () {
    let self = this
    wx.getStorage({
      key: 'historySearch',
      success: function (res) {
        if (self.data.keyword && !~res.data.indexOf(self.data.keyword)) {
          wx.setStorage({
            key: 'historySearch',
            data: [self.data.keyword, ...res.data]
          })
        }
      },
      fail: function (error) {
        wx.setStorage({
          key: 'historySearch',
          data: [self.data.keyword]
        })
      }
    })

    let _this = this
    let reqUrl
    if (this.data.keyword.length === 0) {
      reqUrl = app.globalData.serverUrl + '/song?limit=20'
    } else {
      reqUrl = app.globalData.serverUrl + '/song?keyword=' + _this.data.keyword
    }
    wx.request({
      url: reqUrl,
      success: function (res) {
        _this.setData({
          songList: res.data.data
        })
      }
    })
  },
  // 清空历史记录
  clearHistorySearch: function () {
    wx.setStorage({
      key: 'historySearch',
      data: []
    })
    this.setData({
      historySearch: []
    })
  },
  searchHistoryKeyword: function (event) {
    this.setData({
      keyword: event.currentTarget.dataset.keyword
    })
    this.getSongList()
  },
  // 删除一条历史搜索
  deleteHistoryRecord: function (event) {
    let self = this
    wx.getStorage({
      key: 'historySearch',
      success: function (res) { 
        res.data.splice(res.data.indexOf(event.currentTarget.dataset.keyword), 1)
        wx.setStorage({
          key: 'historySearch',
          data: res.data
        })
        self.setData({
          historySearch: res.data
        })
      }
    })
  }
})
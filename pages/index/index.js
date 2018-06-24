//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    isShowModal: false,
    keyword: '',
    songList: [],
    suggest: '',
    contact: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getSongList()
  },
  goSearchPage: function (e) {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  getSongList: function() {
    let _this = this
    let reqUrl = app.globalData.serverUrl + '/song?limit=20'

    wx.request({
      url: reqUrl,
      success: function(res) {
        _this.setData({
          songList: res.data.data
        })
      }
    })
  },
  changeFeedbackModal: function(e) {
    if (!e.target.dataset.hasOwnProperty('isShow')) return
    this.setData({
      isShowModal: !!+e.target.dataset.isShow
    })
  },
  // 提交反馈
  submitFeedback: function(e) {
    if (this.data.suggest.length === 0) {
      wx.showToast({
        title: '反馈内容不能为空！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let _this = this
    let reqUrl = app.globalData.serverUrl + '/feedback'
    let data = {
      contact: this.data.contact,
      suggest: this.data.suggest
    }
    wx.request({
      url: reqUrl,
      data: data,
      method: 'POST',
      success: function (res) {
        if (res.data.code === 200) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              _this.setData({
                isShowModal: false
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.error,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})

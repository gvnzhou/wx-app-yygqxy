//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    isShowModal: false,
    keyword: '',
    songList: []
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
  }
})

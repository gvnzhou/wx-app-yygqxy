//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    keyword: '',
    hotSongList: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 获取热门歌曲
    this.getHotSongList()
  },
  getHotSongList: function() {
    let _this = this
    wx.request({
      url: app.globalData.serverUrl + '/song?limit=20',
      success: function(res) {
        _this.setData({
          hotSongList: res.data.data
        })
      }
    })
  },
  searchSong: function(e) {
    let _this = this
    wx.request({
      url: app.globalData.serverUrl + '/song?keyword=' + _this.data.keyword,
      success: function (res) {
        _this.setData({
          hotSongList: res.data.data
        })
      }
    })
  },
  bindKeywordInput: function(e) {
    this.setData({
      keyword: e.detail.value
    })
  }
})

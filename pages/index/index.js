//index.js
//获取应用实例
const app = getApp()
// TODO: 搜索提示框
// TODO: 热门歌曲异步加载
// TODO: 记录热门歌曲
Page({
  data: {
    isSearch: false,
    keyword: '',
    songList: []
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
  getSongList: function(e) {
    let _this = this
    let reqUrl
    if (!e) {
      // 默认
      reqUrl = app.globalData.serverUrl + '/song?limit=20'
    } else if (e) {
      // 搜索
      this.setData({
        isSearch: true
      })
      reqUrl = app.globalData.serverUrl + '/song?keyword=' + _this.data.keyword
    }
    wx.request({
      url: reqUrl,
      success: function(res) {
        _this.setData({
          songList: res.data.data
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

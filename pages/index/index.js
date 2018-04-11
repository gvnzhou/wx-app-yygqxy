//index.js
//获取应用实例
const app = getApp()
// TODO: 搜索提示框
// TODO: 热门歌曲异步加载
// TODO: 记录热门歌曲
// TODO: 反馈
Page({
  data: {
    isShowModal: false,
    isSearch: false,
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
  getSongList: function(e) {
    let _this = this
    let reqUrl
    if (!e || this.data.keyword.length === 0) {
      // 默认
      this.setData({
        isSearch: false
      })
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
  },
  changeFeedbackModal: function(e) {
    if (!e.target.dataset.hasOwnProperty('isShow')) return
    this.setData({
      isShowModal: !!+e.target.dataset.isShow
    })
  },
  bindValueInput: function(e) {
    this.setData({
      [e.target.dataset.name]: e.detail.value
    })
  },
  submitFeedback: function(e) {
    // 反馈接口
  }
})

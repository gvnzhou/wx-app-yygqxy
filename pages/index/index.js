//index.js
//获取应用实例
const app = getApp()
// TODO: 搜索提示框
// TODO: 热门歌曲异步加载
// TODO: 记录热门歌曲
// TODO: 反馈
// TODO: 搜索无结果，展示优化
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
  // input数据绑定
  bindValueInput: function (e) {
    this.setData({
      [e.target.dataset.name]: e.detail.value
    })
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

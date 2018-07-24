// pages/search/search.js
const { bindValueInput } = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    historySearch: [],
    songList: [],
    isRequested: false
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

  // input数据绑定
  bindValueInput: bindValueInput,

  // 获取搜索结果
  getSongList: function () {
    wx.showLoading()
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
          songList: res.data.data,
          isRequested: true
        })
        wx.hideLoading()
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
  // 通过历史关键词搜索
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
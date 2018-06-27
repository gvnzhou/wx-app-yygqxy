// components/feedback/feedback.js
const util = require('../../utils/util.js')
const app = getApp()

Component({

  /**
   * 页面的初始数据
   */
  data: {
    suggest: '',
    contact: ''
  },

  methods: {
    bindValueInput: util.bindValueInput,
    changeFeedbackModal: function (e) {
      if (!e.target.dataset.hasOwnProperty('isShow')) return
      this.setData({
        isShowModal: !!+e.target.dataset.isShow
      })
    },
    // 提交反馈
    submitFeedback: function (e) {
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
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})
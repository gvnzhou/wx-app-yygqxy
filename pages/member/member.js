// pages/member/member.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuth: false,
    userInfo: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isAuthUserInfo()
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

  getUserCollection: function () {

  },

  login: function () {
    let _this = this
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.serverUrl + "/user/login",
            method: 'POST',
            data: {
              code: res.code,
              userInfo: _this.data.userInfo
            },
            success: function (res) {
              wx.setStorage({
                key: 'third_session',
                data: res.data.thirdSession
              })
              _this.getUserCollection()
            }
          })
        } else {
          wx.showToast({
            title: '登录失败！' + res.errMsg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    });
  },

  // 判断是否登录
  isLogin: function () {
    let _this = this
    // 查看登录态是否过期
    wx.checkSession({
      success: function () {
        // 登录态未过期，可进行我们所需要的业务
        _this.getUserCollection()
        console.log('登录态未过期')
      },
      fail: function () {
        _this.login() // 登录态已过期，需重新登录
        console.log('登录态已过期')
      }
    })
  },

  // 判断是否授权
  isAuthUserInfo: function () {
    let _this = this
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              _this.setData({
                isAuth: true,
                userInfo: res.userInfo
              })
              _this.isLogin()
            }
          })
        } else {
          _this.setData({
            isAuth: false
          })
        }
      }
    })
  },

  bindGetUserInfo: function (e) {
    this.setData({
      isAuth: true,
      userInfo: e.detail.userInfo
    })
    this.isLogin()
  }
})
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
    // 查看是否授权
    this.isUserAuth()
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

  loginUser: function (userInfo) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.serverUrl + "/user/login",
            method: 'POST',
            data: {
              code: res.code,
              userInfo: userInfo
            },
            success: function (res) {
              console.log(res.data)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  isUserAuth: function () {
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
              _this.loginUser(res.userInfo)
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
    this.loginUser(e.detail.userInfo)
  }
})
// pages/member/member.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuth: false,
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    collectionsData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isAuthUserInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onShow: function () {
    this.data.isAuth && this.getUserCollection()
  },

  getUserCollection: function () {
    let _this = this
    // 获取收藏记录并同步到本地
    wx.request({
      url: app.globalData.serverUrl + "/user/getCollections",
      method: 'GET',
      header: {
        'third-session': wx.getStorageSync('third_session')
      },
      success: function (res) {
       // 存入本地缓存
       if (res.data.code === 200) {
         try {
           wx.setStorageSync('song_collections', res.data.data)
           _this.setData({
             collectionsData: wx.getStorageSync('song_collections')
           })
         } catch (e) {
           wx.showToast({
             title: e,
             icon: 'none',
             duration: 2000
           })
         }
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
              // 存入本地缓存
              try {
                wx.setStorageSync('third_session', res.data.thirdSession)
              } catch (e) {
                wx.showToast({
                  title: e,
                  icon: 'none',
                  duration: 2000
                })
              }
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
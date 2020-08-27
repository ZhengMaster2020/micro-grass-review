// pages/about/about.js
Page({
  data: {
    collectionCount: 0, // 书籍收藏数
    userInfo: {},
    isLogin: false,
    totalCount: 0, 
  },
  // 用户登录
  login() {
    const that = this
    wx.showModal({
      title: '微信授权登录',
      content: '青春活力书友会申请获取您的公开信息（昵称、头像等）',
      confirmText: '允许',
      cancelText: '拒绝',
      success(res) {
        if (res.confirm) {
          wx.getSetting({
            success(res) {
              const auth = res.authSetting['scope.userInfo']
              if (auth) {
                wx.setStorage({ key: 'auth', data: auth })
                wx.getUserInfo({
                  success(res) {
                    const { userInfo } = res
                    that.setData({ 'userInfo': userInfo, 'isLogin': true })
                  }
                })
              }
            }
          })
         
        } else {
          wx.removeStorage({ key: 'auth' })
          that.setData({ 'isLogin': false })
        }
      },
    })
  },
  // 注销登录
  logout() {
    const that = this
    this.setData({ "isLogin": false })
    wx.removeStorage({ key: 'auth' })
  },
  // 跳往我的书评库
  toMyBookReview() {
    wx.navigateTo({
      url: '../review/review',
    })
  },
  // 跳往书籍收藏
  toMyBookCollect() {
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  // 跳往书籍浏览历史记录
  toMyBookHistory() {
    wx.navigateTo({
      url: '../history/history',
    })
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    const that = this
    const auth = wx.getStorageSync('auth')
    if (auth) { // 已经授权登录
    wx.showLoading({ title: '加载中...'})
    const msg = wx.getStorageSync('userInfo')
    that.setData({ 'userInfo': msg.userInfo, 'isLogin': msg.isLogin })
    this.fetchTotalCount()
    wx.cloud.callFunction({
      name: 'fetchCollection',
      data: { count: true }
    })
    .then(res => {
      console.log(res, '获取书籍收藏数')
      const count = res.result.data.length
      this.setData({ 'collectionCount': count ? count : 0 })
    })
    .catch(err => {
      console.log(err, 'err')
    })
    .finally(() => {
      wx.hideLoading()
    })
    }
  },

  // 获取书籍读后感以及评价总数
  fetchTotalCount() {
    wx.cloud.callFunction({
      name: 'fetchThoughtComment',
      data: { fetchCount: true }
    })
    .then(res => {
      const count = res.result.totalCount
      this.setData({'totalCount': count ? count : 0})
      console.log(res, 'total count')
    })
    .catch(err => console.log(err, 'err'))
  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh() {},
 // 页面上拉触底事件的处理函数 
  onReachBottom () {},
  // 用户点击右上角分享
  onShareAppMessage () {
    console.log('share')
  }
})
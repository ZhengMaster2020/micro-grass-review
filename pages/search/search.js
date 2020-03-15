Page({
  // 点击取消返回首页
  returnToIndex () {
    wx.switchTab({ url: '../index/index' })
    console.log('returnToIndex')
  },
  // 点击搜索搜索书籍
  searchBooks (e) {
    console.log('searchBooksVal:', e.detail)
  },
  // 点击书名跳转书籍详情
  toBookDetail () {
    console.log('toBookDetail')
  },
  // 页面的初始数据
  data: {
    searchValue: '',
    searchBookTopTen: [
      { bookId: '001', searchBookName: '书名1', rankNum: 1, type: 'danger' },
      { bookId: '002', searchBookName: '书名2', rankNum: 2, type: 'warning' },
      { bookId: '003', searchBookName: '书名3', rankNum: 3, type: 'success' },
      { bookId: '004', searchBookName: '书名4', rankNum: 4, type: 'default' },
      { bookId: '005', searchBookName: '书名5', rankNum: 5, type: 'default' },
      { bookId: '006', searchBookName: '书名6', rankNum: 6, type: 'default' },
      { bookId: '002', searchBookName: '书名7', rankNum: 7, type: 'default' },
      { bookId: '002', searchBookName: '书名8', rankNum: 8, type: 'default' },
      { bookId: '002', searchBookName: '书名9', rankNum: 9, type: 'default' },
      { bookId: '002', searchBookName: '书名10', rankNum: 10, type: 'default' },
    ],
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
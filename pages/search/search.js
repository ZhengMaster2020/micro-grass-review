Page({
  // 点击取消返回首页
  returnToIndex () {
    wx.switchTab({ url: '../index/index' })
  },
  // 点击清空输入框的处理事件
  initSearchPage (e) {
    console.log(e, 'detail')
    this.setData({ 'searchResult': '' })
  },
  // 点击搜索搜索书籍
  searchBooks (e) {
    console.log('searchBooksVal:', e.detail)
    const that = this
    const keyword = e.detail
    if (!keyword) return wx.showToast({ title: '输入值不能为空', image: '../../images/icon/warning.png' })
    wx.showLoading({
      title: '查询中...',
      mask: true
    })
    // 调用查询书籍云函数
    wx.cloud.callFunction({
      name: 'searchBooks',
      data: { inputValue: keyword }
    })
    .then(res => {
      console.log('云函数调用成功', res)
      const { result } = res
      if (!result.length) {
        that.setData({ 'searchResult': [] })
      } else {
        result.forEach(item => {
          const { publishTime } = item
          console.log(publishTime, 'time')
          item['publishTime'] = publishTime.split('T')[0] // 时间格式转换
        })
        that.setData({ 'searchResult': result })
      }
      wx.hideLoading()
    })
    .catch(err => { wx.hideLoading() && console.log('err', err)})
  },
  // 点击书名跳转书籍详情
  toBookDetail (e) {
    console.log('toBookDetail', e)
    wx.navigateTo({ url: `../details/detail?bookID=${e.currentTarget.dataset.bookid}` })
  },
  // 页面的初始数据
  data: {
     keyword: [],
    searchValue: '', // 输入框的绑定值
    searchResult: '', // 搜索结果值
    searchBookTopTen: [ // 热搜数据
      { bookId: 'f149f6775e9f6baf00a9969e3e54d337', searchBookName: '活着', rankNum: 1, type: 'danger' },
      { bookId: 'djWUXfDoZ7rMJCq19GNZ6JTK5UmiqYljjkMsUSZtqbPbc5q9', searchBookName: '百年孤独', rankNum: 2, type: 'warning' },
      { bookId: '003', searchBookName: '1984', rankNum: 3, type: 'success' },
      { bookId: '004', searchBookName: '三体（全集）', rankNum: 4, type: 'default' },
      { bookId: '005', searchBookName: '小王子', rankNum: 5, type: 'default' },
      { bookId: '006', searchBookName: '人类简史', rankNum: 6, type: 'default' },
      { bookId: '002', searchBookName: '围城', rankNum: 7, type: 'default' },
      { bookId: '002', searchBookName: '平凡的世界', rankNum: 8, type: 'default' },
      { bookId: '002', searchBookName: '霍乱时期的爱情', rankNum: 9, type: 'default' },
      { bookId: '002', searchBookName: '肖申克的救赎', rankNum: 10, type: 'default' },
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
Page({
  data: {
    myHistoryBook: [
      // {
      //   time: '2020-04-02 看过',
      //   books: [
      //     { 
      //       img: 'https://img1.doubanio.com/view/subject/l/public/s33519539.jpg',
      //       name: '呼吸',
      //       author: '[美]特德·姜',
      //       publishAddr: '译林出版社 ',
      //       publishTime: '2019-12',
      //       score: 4.5 ,
      //       remark: '经典必备'
      //     }
      //   ]
      // }
    ],
    indexList: ['4月', '3月', '2月', '1月'],
    scrollTop: 0
  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    })
  },
  // 跳转书籍详情
  toBookDetail(e) {
    wx.navigateTo({
      url: `../details/detail?bookID=${e.currentTarget.dataset.bookid}`,
    })
  },

  // 页面加载函数
  onLoad() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'fetchHistoryRecords',
    })
      .then(res => {
        console.log(res, 'history')
        const historyBooks = []
        const bookListArr = res.result.list
        bookListArr.forEach(item => { // 进行数据格式化
          const books = []
          item.historyList[0].reviewTime = item.historyList[0].publishTime.split('T')[0]
          books.push(item.historyList[0])
          historyBooks.push({
            time: new Date(item.reviewTime).toLocaleString(),
            books
          })
        })
        console.log('list', historyBooks)
        this.setData({ 'myHistoryBook': historyBooks.reverse() })
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        wx.hideLoading()
      })
  }
})
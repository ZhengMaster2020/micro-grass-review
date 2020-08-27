Page({
  data: {
    myHistoryBook: [
      {
        time: '2020-04-02 收藏',
        books: [
          {
            img: 'https://img1.doubanio.com/view/subject/l/public/s33519539.jpg',
            name: '呼吸',
            author: '[美]特德·姜',
            publishAddr: '译林出版社 ',
            publishTime: '2019-12',
            score: 4.5,
            remark: '经典必备',
            isCollection: 1,
          },
          {
            img: 'https://img1.doubanio.com/view/subject/s/public/s1070959.jpg',
            name: '红楼梦',
            author: '马尔克斯',
            publishTime: '2011-06',
            publishAddr: '人民文学出版社 ',
            score: 4.2,
            remark: 'Good Book',
            isCollection: 1
          }
        ]
      },
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
  // 取消收藏书籍记录
  cancelCollection(e) {
    const that = this
    wx.showModal({
      title: '是否取消收藏并删除该条记录',
      success(res) {
        console.log(res)
        const collectBookFlag = e.currentTarget.dataset.flag
        const { bookid } = e.currentTarget.dataset
        if(res.confirm) {
          wx.showLoading({
            title: '加载中...',
          })
          wx.cloud.callFunction({
            name: 'collectionBooks',
            data: { bookid, collectBookFlag }
          })
          .then(res => {
            wx.cloud.callFunction({
              name: 'fetchCollection',
            })
              .then(res => {
                console.log(res, 'res')
                const historyBooks = []
                const bookListArr = res.result.list
                bookListArr.forEach(item => {
                  const books = []
                  item.collectionList[0].publishTime = item.collectionList[0].publishTime.split('T')[0]
                  books.push(item.collectionList[0])
                  historyBooks.push({
                    time: new Date(item.collectionTime).toLocaleString(),
                    collectContent: item.collectContent,
                    books
                  })
                })
                console.log('list', historyBooks)
                that.setData({ 'myHistoryBook': historyBooks.reverse() })
                wx.hideLoading()
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            wx.hideLoading()
            console.log(err, "err")
          })
        }
      }
    })
  },
  // 页面加载函数
  onLoad() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'fetchCollection',
    })
    .then(res => {
      console.log(res, 'res')
      const historyBooks = []
      const bookListArr = res.result.list
      bookListArr.forEach(item => { // 进行数据格式化
        const books = []
        item.collectionList[0].publishTime = item.collectionList[0].publishTime.split('T')[0]
        books.push(item.collectionList[0])
        historyBooks.push({
          time: new Date(item.collectionTime).toLocaleString(),
          collectContent: item.collectContent,
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
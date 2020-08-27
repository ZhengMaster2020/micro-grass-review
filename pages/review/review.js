Page({
  data: {
    thoughtList: [
      {
        time: '2020-04-02 发表',
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
    commentList: [],
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
  // 删除书籍评价或读后感记录记录
  cancelCollection(e) {
    console.log(e, 'ee')
    const that = this
    const type = e.currentTarget.dataset.time.split(' ')[2]
    const collectBookFlag = e.currentTarget.dataset.flag
    const { listid } = e.currentTarget.dataset
    wx.showModal({
      title: `是否取消删除该条${type}记录`,
      success(res) {
        console.log(res)
        if (res.confirm) {
          wx.showLoading({ title: '加载中...'})
          wx.cloud.callFunction({
            name: 'updateThoughtComment',
            data: { _id: listid, type }
          })
          .then(res => {
            console.log(res, 'delete op')
            that.onLoad()
          })
          .catch(err => {
            wx.hideLoading()
            console.log(err, "err")
          })
          .finally(() => {
            wx.hideLoading()
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
      name: 'fetchThoughtComment',
    })
      .then(res => {
        console.log(res, 'res')
        const list = []
        const { commentList, thoughtList } = res.result
        commentList.forEach(item => { // 进行数据格式化
          const books = []
          books.push(item.bookList[0])
          list.push({
            _id: item._id,
            time: new Date(item.publishTime).toLocaleString() + '发表了 书评',
            content: item.content,
            publishTime: item.bookList[0].publishTime.split('T')[0],
            books
          })
        })
        thoughtList.forEach(item => { // 进行数据格式化
          const books = []
          books.push(item.bookList[0])
          list.push({
            _id: item._id,
            time: new Date(item.publishTime).toLocaleString() + '发表了 读后感',
            content: item.content,
            publishTime: item.bookList[0].publishTime.split('T')[0],
            books
          })
        })
        console.log('list', list)
        this.setData({ 'thoughtList': list.reverse() })
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        wx.hideLoading()
      })
  }
})
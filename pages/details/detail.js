const desc = '《斗罗大陆》是唐家三少创作的穿越玄幻小说，2008年12月14日-2009年12月13日首发于起点中文网，2009年5月首次出版。《斗罗大陆》讲述的是穿越到斗罗大陆的唐三如何一步步修炼武魂，由人修炼为神，最终铲除了斗罗大陆上的邪恶力量，报了杀母之仇，成为斗罗大陆最强者的故事 [1]  。主要角色有唐三、小舞、戴沐白等。'


Page({
  data: {
    point: 5,  // 评分分数
    thoughtContent: '', // 读后感内容 
    appraisalContent: '', // 书籍评价内容
    averageScore: 0, // 书籍平均分
    starCount: 0, // 评分对应的icon
    read: false, // 是否看过该书籍
    commentLists: [], // 书籍评论
    hotCommentLists: [], // 热门评论

    bookID: '',
    bookDetailMsg: {},
    show: false,
    commentShow: false,
    isShare: false,
    bookDetail: {
    authorLabel: '作者：',
    author: '唐家三少',
    starCount: '4',
    collection: '200',
    point: '5.6',
    tag: '人气榜',
    publishTime: '',
    thoughts:[
      {
        username: '小熊ing书',
        readFeelingText: '读完，我个人觉得挺不错的一本书，内容情节都挺吸引人的，还是值得书友们一看的',
        publishTime: '2020-4-19 21:35',
        likeNum: '520', // 点赞数
        commentNum: '1314', // 评论数
      }
    ], 
    giveLike: false, // 点赞
    desc,
    bookName: '斗罗大陆',
    bookImgSrc: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    bookSaleLink: 'https://detail.tmall.com/item.htm?spm=a230r.1.14.1.31a729e1rsOf4v&id=611212882092&ns=1&abbucket=5',
    bookShopLink: 'https://www.taobao.com'
   },
   userOperation: {
    collectBookFlag: false, // 添加收藏
    giveLike: false //读后感点赞
   } 
  },

  // 添加收藏书籍
  collectBook (e) {
    wx.showLoading({
      title: '加载中...',
    })
    console.log(e,'collection')
    const that = this
    const collectBookFlag = e.currentTarget.dataset.flag
    const { bookid } = e.currentTarget.dataset
    wx.cloud.callFunction({
      name: 'collectionBooks',
      data: { bookid, collectBookFlag }
    })
    .then(res => {
      console.log('collection operate', res)
      that.initBookData()
      if (res.result.flag) {
        wx.showToast({
          title: '收藏成功',
          image: '../../images/icon/success.png',
        })
      } else {
        wx.showToast({
          title: '已取消收藏',
          image: '../../images/icon/warning.png',
        })
      }
      wx.hideLoading()
    })
    .catch(err => {
      console.log('collection operate', res)
      wx.hideLoading()
    })
  },
  // 分享书籍功能
  onShareAppMessage (res) {
    console.log(res, 'res')
    const { userInfo } = wx.getStorageSync('userInfo')
    console.log(userInfo.avatarUrl, 'url')
    const that = this
    this.setData({ 'isShare': true })
    wx.downloadFile({
      url: userInfo.avatarUrl,
      success: function (res1) {
        //缓存头像图片
        that.setData({
          portrait_temp: res1.tempFilePath
        })
        //缓存canvas绘制小程序二维码
        wx.downloadFile({
          url: that.data.qrcode,
          success: function (res2) {
            console.log('二维码：' + res2.tempFilePath)
            //缓存二维码
            that.setData({
              qrcode_temp: res2.tempFilePath
            })
            console.log('开始绘制图片')
            that.drawImage();
            wx.hideLoading();
            setTimeout(function () {
              that.canvasToImage()
            }, 200)
          },
          fail (err) {console.log('err', err)}
        })
      },
      fail(err) {console.log(err, 'errr')}
    })
    return {
      title: '分享该书籍',
      path: '/pages/details/details',
      success(res) {
        console.log(res, 'res')
      }
    }
  },
  // 查看书籍简介详细内容
  viewMore(e) {
    console.log(e, 'viewmore')
    wx.showModal({
      title: '简介',
      content: e.target.dataset.intro,
      showCancel: false
    })
  },
  // 复制书籍链接
  toBookMall(e) {
    console.log('toBookMall', e)
    const that = this
    wx.showModal({
      title: '纸质书籍购买链接',
      content: e.currentTarget.dataset.link,
      confirmText: '复制链接',
      success(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: e.currentTarget.dataset.link,
            success(res) {
              wx.showToast({
                title: '复制成功',
                image: '../../images/icon/success.png',
              })
            }
          })
        }
      }
    })
  },
  // 跳转评论详细页面
  toCommentDetail () {
    console.log('toCommentDetail')
    wx.navigateTo({
      url: '../comment/comment',
    })
  },
  // 点赞操作
  addLikeNum(e) {
    wx.showLoading({
      title: '加载中...',
    })
    console.log('toCommentDetail', e)
    const that = this
    const { commentid, thoughtid, like } = e.currentTarget.dataset
    // const { giveLike } = that.data.bookDetail
    if (like) { // 点赞操作
      wx.cloud.callFunction({
        name: 'updateThoughtComment',
        data: { thoughtid, commentid, giveLike: like }
      })
      .then(res => {
        console.log(res, 'dianzan')
        that.initBookData()
        // this.setData({ 'bookDetail.giveLike': !giveLike })
      })
      .catch(err => console.log('err', err))
    } else { // 取赞操作
      wx.cloud.callFunction({
        name: 'updateThoughtComment',
        data: { thoughtid, commentid, giveLike: like }
      })
      .then(res => {
        console.log(res, 'dianzan')
        that.initBookData()
        // this.setData({'bookDetail.giveLike': !giveLike})
      })
      .catch(err => console.log('err', err))
    }
  },

  //评分功能
  toGrade(e) {
    const bookID = e.currentTarget.dataset.bookid
    this.setData({ show: true })
  },

  // 设置分值
  setPoint(e) {
    console.log(e, 'setting poing')
    this.setData({ 'point': e.detail })
  },
  
  // 设置读后感内容
  settingThought(e) {
    this.setData({ 'thoughtContent': e.detail.value })
  },
  // 书籍评论内容
  settingAppraisal(e) {
    this.setData({ 'appraisalContent': e.detail.value })
  },

  // 书籍评分以及发表读后感
  publishThought(e) {
    const that = this
    const bookID = e.currentTarget.dataset.bookid
    const point = this.data.point
    const content = this.data.thoughtContent
    console.log(bookID, point, content, 'bookID', 'point', 'content')
    wx.showLoading({ title: '发表中...' })
    wx.cloud.callFunction({
      name: 'publishBookThought',
      data: { bookID, point, content  }
    })
    .then(res => {
      console.log(res, 'res')
      if (res.result.flag) that.initBookData()
      that.hidePublishThought()
      that.setData({
        'thoughtContent': ''
      })
    })
    .catch(err => { console.log(err, 'err') })
    .finally(() => {
      wx.hideLoading()
    })
  },

  // 书籍评价
  publishComment(e) {
    console.log(e, 'comment click')
    const that = this
    const content = this.data.appraisalContent
    const bookID = e.currentTarget.dataset.bookid
    wx.showLoading({ title: '发表中...' })
    wx.cloud.callFunction({
      name: 'publishBookComment',
      data: { content, bookID }
    })
    .then(res => {
      console.log(res, 'publish comment')
      that.initBookData()
      that.setData({'appraisalContent': ''})
      that.commentHide()
    })
    .catch(err => {
      console.log(err, 'err')
    })
    .finally(() => {
      wx.hideLoading()
    })
  },

  //点击读过数更新书籍信息
  updateBookMsg(e) {
    const that = this
    if (this.data.read) return
    wx.showModal({
      title: '您是否阅读过该书籍？',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中...',
          })
          wx.cloud.callFunction({
            name: 'fetchBookDetail',
            data: { readerFlag: true, bookID: e.currentTarget.dataset.bookid }
          })
            .then(res => {
              console.log(res, 'res')
              that.setData({ 'read': res.result.read })
              that.initBookData()
            })
            .catch(err => {
              console.log(err, 'err')
            })
            .finally(() => {
              wx.hideLoading()
            })
        } 
      }
    })
  },
  
  // 隐藏发表读后感以及评分Model
  hidePublishThought() {
    this.setData({ show: false })
  },

 // 展示蒙层
  showCommentModel() {
    this.setData({ commentShow: true }) 
  },
  // 隐藏蒙层
  commentHide() {
    this.setData({ commentShow: false })
  },

  // 初始化书籍详情信息
  initBookData() {
    const that = this
    const bookID = wx.getStorageSync('bookID')
    wx.showLoading({ title: '加载中...'})
    wx.cloud.callFunction({
      name: 'fetchBookDetail',
      data: { bookID }
    })
    .then(res => {
      console.log('detail onload', res.result)
      const { data, list, commentList } = res.result
      const thoughtsArr = []
      const commentArr = []
      list.forEach(item => {
        thoughtsArr.push({
          _id: item._id,
          bookID: item.bookID,
          // openid: item.usersList[0].openid,
          giveLike: item.giveLike,
          username: item.usersList[0].nickName,
          readFeelingText: item.content,
          publishTime: new Date(item.publishTime).toLocaleString(),
          likeNum: item.likeNum, // 点赞数
          commentNum: 0, // 评论数
        })
      })
      commentList.forEach(item => {
        commentArr.push({
          _id: item._id,
          bookID: item.bookID,
          giveLike: item.giveLike,
          // openid: item.usersList[0].openid,
          content: item.content,
          likeNum: item.likeNum,
          publishTime: new Date(item.publishTime).toLocaleString(),
          nickName: item.usersList[0].nickName,
          commentNum: 0, // 评论数
        })
      })
      that.setData({
        'bookDetailMsg': data,
        'bookDetail.thoughts':  thoughtsArr.reverse(),
        'commentLists': commentArr.reverse(),
        'averageScore': data.point ? (data.point / data.pointCount).toFixed(1) : 0,
        'starCount': Math.round((data.point / data.pointCount) / 2)
      })
      wx.hideLoading()
    })
    .catch(err => {
      console.log(err, 'err')
      wx.hideLoading()
    }) 
  },

  // 新增浏览记录
  addHistoryRecord(bookID) {
    wx.cloud.callFunction({
      name: 'historyRecords',
      data: { bookID }
    })
    .then(res => {
      console.log(res, '历史记录')
    })
    .catch(err => console.log(err, 'err'))
  },

  onLoad(e) {
    console.log(e, 'details')
    wx.setStorageSync('bookID', e.bookID ? e.bookID : 'f149f6775e9f6baf00a9969e3e54d337')
    this.initBookData()
    this.addHistoryRecord(e.bookID)
  }
})
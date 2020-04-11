const desc = '《斗罗大陆》是唐家三少创作的穿越玄幻小说，2008年12月14日-2009年12月13日首发于起点中文网，2009年5月首次出版。《斗罗大陆》讲述的是穿越到斗罗大陆的唐三如何一步步修炼武魂，由人修炼为神，最终铲除了斗罗大陆上的邪恶力量，报了杀母之仇，成为斗罗大陆最强者的故事 [1]  。主要角色有唐三、小舞、戴沐白等。'


Page({
  data: {
   bookDetail: {
    authorLabel: '作者：',
    author: '唐家三少',
    starCount: '4',
    collection: '200',
    point: '5.6',
    likeNum: '520',
    commentNum: '1314',
    tag: '人气榜',
    publishTime: '',
    readFeelingText: 'After reading feeling 通过disabled属性来禁用按钮，此时按钮不可点击',
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
  // 添加收藏
  collectBook () {
    const that = this
    const { collectBookFlag } = that.data.userOperation
    this.setData({ 'userOperation.collectBookFlag': !collectBookFlag })
    !collectBookFlag && wx.showToast({
      title: '收藏成功',
      image: '../../images/icon/success.png',
    })
    collectBookFlag && wx.showToast({
      title: '已取消收藏',
      image: '../../images/icon/warning.png',
      complete: function(res) {},
    })
  },
  // 查看书籍简介详细内容
  viewMore() {
    wx.showModal({
      title: '简介',
      content: this.data.bookDetail.desc,
      showCancel: false
    })
  },
  // 复制书籍链接
  toBookMall() {
    const that = this
    console.log('toBookMall')
    wx.showModal({
      title: '纸质书籍购买链接',
      content: that.data.bookDetail.bookSaleLink,
      confirmText: '复制链接',
      success(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: that.data.bookDetail.bookSaleLink,
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
  addLikeNum () {
    const that = this
    const nonGiveLike = !that.data.bookDetail.giveLike
    nonGiveLike ? that.data.bookDetail.likeNum++ : that.data.bookDetail.likeNum--
    this.setData({
      'bookDetail.giveLike': nonGiveLike,
      'bookDetail.likeNum': that.data.bookDetail.likeNum
    })
  },
})
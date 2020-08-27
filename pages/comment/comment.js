Page({
  data: {
    commentValue: '',
    showReplyPopup: false,
    bookSaleLink: 'https://detail.tmall.com/item.htm?spm=a230r.1.14.1.31a729e1rsOf4v&id=611212882092&ns=1&abbucket=5',
    commentTime: '2020-03-15 16:30',
    allReplyText: [1,2,3,4,5],
    username: '夜空中最亮的仔',
    replyText: '我也觉得这是一本好看的书籍，值得推荐',
    commentText: '三少写过了很多书，都非常的好，但我一直认为，《斗罗大陆》这本书是最成功的一本。故事中，唐三是一名唐门外门弟子，为证明自己的存在价值，偷了内门的秘籍，不想成功的研制了200年来没人做出的佛怒唐莲，最后被发现，以死明志，纵身跳下鬼见愁，灵魂重生在斗罗大陆。',
  },
  // 点击头像跳往用户中心
  toUserCenter () {
    console.log('toUserCenter')
  },
  // 复制书籍链接
  toBookMall () {
    const that = this
    console.log('toBookMall')
    wx.showModal({
      title: '纸质书籍购买链接',
      content: that.data.bookSaleLink,
      confirmText: '复制链接',
      success(res) {
        if(res.confirm) {
          wx.setClipboardData({
            data: that.data.bookSaleLink,
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
  // 打开回复用户弹窗
  replyUserComment () {
    console.log('replyUserComment')
    this.setData({
      showReplyPopup: true
    })
  },
  // 关闭回复弹窗
  closeReplyPopup () {
    console.log('closeReplyPopup')
    this.setData({
      showReplyPopup: false
    })
  },
  // 绑定输入回复的值
  setCommentVal (e) {
    this.setData({
      commentValue: e.detail
    })
  },
  // 提交回复内容
  submitReplyText () {
    console.log('submitReplyText')
    const that = this
    if(!that.data.commentValue) return wx.showToast({
      title: '请输入内容',
      image: '../../images/icon/warning.png'
    }) 
    wx.showToast({
      title: '回复成功',
      image: '../../images/icon/success.png',
      success(res) {
        that.closeReplyPopup()
      }
    })
   
  },
  // 分享书籍
  shareBook () {
    wx.showToast({
      title: '分享成功',
      image: '../../images/icon/success.png',
    })
  },
  // 书籍评分操作
   giveScore () {
     console.log('ppp')
   },
   // 发表书评
   publishBookReview () {
     console.log('shuping')
   },
   // 发表读后感
   publishBookThoughts () {
     console.log('thougth')
   }
})
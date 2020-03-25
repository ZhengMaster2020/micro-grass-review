Page({
  data: {
    commentValue: '',
    showReplyPopup: false,
    bookSaleLink: 'https://detail.tmall.com/item.htm?spm=a230r.1.14.1.31a729e1rsOf4v&id=611212882092&ns=1&abbucket=5',
    commentTime: '2020-03-15 16:30',
    allReplyText: [1,2,3,4,5],
    username: '夜空中最亮的仔',
    replyText: '也可以传入图标 URL通过icon属性设置按钮图标',
    commentText: 'After reading feeling 通过disabled属性来禁用按钮，此时按钮不可点击。通过icon属性设置按钮图标，支持 Icon 组件里的所有图标，也可以传入图标 URL通过icon属性设置按钮图标，支持 Icon 组件里的所有图标，也可以传入图标 URL通过icon属性设置按钮图标，支持 Icon 组件里的所有图标，也可以传入图标 URL通过icon属性设置按钮图标，支持 Icon 组件里的所有图标，也可以传入图标 URL通过icon属性设置按钮图标，支持 Icon 组件里的所有图标，也可以传入图标 URL通过icon属性设置按钮图标，支持 Icon 组件里的所有图标，也可以传入图标',
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
})
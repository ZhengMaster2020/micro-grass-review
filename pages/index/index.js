
var bookTitle = ['人类群星闪耀时', '追风筝的人']

var outline = '《人类群星闪耀时》内容介绍：拜占廷的沦陷、亨徳尔的一生、一个流星般的天才、好不完美。描述了农村青年的奋斗生活以及感情经历。改革开放初期的不完美事物，完全爆率出社会百态生活'

var outline1 = '《追风筝的人》12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。'

var appInstance = getApp()

Page({
  data: {
    initDailyData: [],
    initHotData: [],
    initNewBookData: [],
    initClassicData: [],
    bookMsg: [
      {
        type: '每日推荐',
        name: '做梦的男孩',
        intro: '2岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国',
        imgUrl: 'https://img9.doubanio.com/view/subject/s/public/s1134166.jpg'
      }
    ],
    searchValue: '',
    bookOutline: [outline, outline1],
    bookNodes: [{
      name: 'a',
      attrs: {
        class: 'book_title',
        style: 'color: #323233; font-size:13px;font-weight:bold;'
      },
      children: [{
        type: 'text',
        text: bookTitle[0]
      }],
    }],
    swiperImg: [
      "https://img9.doubanio.com/view/freyr_page_photo/raw/public/5415.jpg",
      "https://img9.doubanio.com/view/freyr_page_photo/raw/public/5494.jpg",
      "https://img9.doubanio.com/view/freyr_page_photo/raw/public/4535.jpg"
    ],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertival: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  // 点击跳转专栏内容
  toTopicBlock (e) {
    console.log(e, 'e')
    const { type } = e.currentTarget.dataset
    wx.navigateTo({ url: `../topic/topic?type=${type}`})
  },
  toSearchPage () {
    wx.navigateTo({ url: '../search/search' })
  },
  // 跳往搜索书籍
  searchBook (e) {
       wx.navigateTo({ url: '../search/search' })
  },
  // 查看书籍详情内容
  toDetial(e) {
    console.log('e', e)
    wx.navigateTo({
      url: `../details/detail?bookID=${e.currentTarget.dataset.book._id}`,
    })
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },

   // 生命周期函数--监听页面加载
  onLoad: function (options) {
    wx.showLoading({
      title: '数据初始化中...',
    })
  // 初始化书籍展示数据
  wx.cloud.callFunction({
    name: 'initBooksData',
    data: {
      type: {
        daily: '每日推荐',
        hot: '热门书籍',
        newBook: '新书推荐',
        classic: '经典文学'
      }
    }
  })
  .then(res => {
    const { result } = res
    result && wx.hideLoading()
    this.setData({
      'initDailyData': result.daily.data,
      'initHotData': result.hot.data,
      'initNewBookData': result.newBook.data,
      'initClassicData': result.classic.data,
    })
    console.log(res, '初始化数据')
  })
  .catch(err => console.log(err, 'err'))
  }
})
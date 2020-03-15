const desc = '《斗罗大陆》是唐家三少创作的穿越玄幻小说，2008年12月14日-2009年12月13日首发于起点中文网，2009年5月首次出版。《斗罗大陆》讲述的是穿越到斗罗大陆的唐三如何一步步修炼武魂，由人修炼为神，最终铲除了斗罗大陆上的邪恶力量，报了杀母之仇，成为斗罗大陆最强者的故事 [1]  。主要角色有唐三、小舞、戴沐白等。'


Page({
  data: {
   bookDetail: {
    authorLabel: '作者：',
    author: '唐家三少',
    starCount: '4',
    collection: '200',
    point: '5.6',
    tag: '人气榜',
    desc,
    bookName: '斗罗大陆',
    bookImgSrc: 'https://img.yzcdn.cn/vant/ipad.jpeg',
    bookShopLink: 'https://www.taobao.com'
   } 
  },
  viewMore() {
    wx.showModal({
      title: '简介',
      content: this.data.bookDetail.desc,
      showCancel: false
    })
  },
})
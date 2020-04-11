Page({
  data: {
    title: ''
  },
  onLoad(e) {
    console.log(e, '排行榜title')
    this.setData({ 'title': e.title })
  }
})
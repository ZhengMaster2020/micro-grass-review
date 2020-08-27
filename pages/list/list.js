Page({
  data: {
    annual: '年度书籍排行榜',
    weekly: '一周书籍排行榜',
    clickChangTimes: 0, // 点击换一批的次数
    loading: false, // 加载中
    bookRankingList: [
      {
        rankingType: "影视原著榜",
        typeNum: '20',
        bookList: [
          { bookName: '肖申克的救赎', score: '9.7' },
          { bookName: '阿甘正传', score: '9.6' },
          { bookName: '霸王别姬', score: '9.5' }
        ]
      },
      {
        rankingType: "女生飙升榜",
        typeNum: '200',
        bookList: [
          { bookName: '红楼梦', score: '9.7' },
          { bookName: '活着', score: '9.6' },
          { bookName: '百年孤独', score: '9.5' }
        ]
      },
      {
        rankingType: "男生飙升榜",
        typeNum: '200',
        bookList: [
          { bookName: '三体', score: '9.7' },
          { bookName: '白夜行', score: '9.6' },
          { bookName: '丰乳肥臀', score: '9.5' }
        ]
      },
      {
        rankingType: "外语热门",
        typeNum: '200',
        bookList: [
          { bookName: '小王子', score: '9.7' },
          { bookName: '人类简史', score: '9.6' },
          { bookName: '霍乱时期的爱情', score: '9.5' }
        ]
      },
      {
        rankingType: "科幻经典",
        typeNum: '200',
        bookList: [
          { bookName: '三体(全集)', score: '9.7' },
          { bookName: '献给阿尔吉侬的花束', score: '9.6' },
          { bookName: '银河帝国', score: '9.5' }
        ]
      },
      {
        rankingType: "悬疑恐怖榜",
        typeNum: '200',
        bookList: [
          { bookName: '七宗罪', score: '9.5' },
          { bookName: '白夜行', score: '9.2' },
          { bookName: '长安十二时辰', score: '9.0' }
        ]
      },
    ],
    suggestBookList: [
      {
        picUrl: 'https://img9.doubanio.com/view/subject/l/public/s29849366.jpg',
        name: '莎莎的石头',
        author: '作者：（美）艾伦·贝克尔',
        desc: '这是异步很好看的修仙类的图书'
      },
      {
        picUrl: 'https://img3.doubanio.com/view/subject/l/public/s2810951.jpg',
        name: '玛法达与伙伴们',
        author: '作者：（阿根廷）季诺',
        desc: '这是异步很好看的修仙类的图书'
      },
      {
        picUrl: 'https://img3.doubanio.com/view/subject/l/public/s3530831.jpg',
        name: '撒哈拉的故事',
        author: '作者：三毛',
        desc: '出版年: 1987 出版于湖南文艺出版社'
      }
    ]
  },
  // 书籍排行榜
  bookRanking() {
    console.log('opop')
  },
  // 跳往特定类型排行榜详情页面
  toRankingDetail(e) {
    console.log('toBookDetail', e)
    const title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `../ranking/ranking?title=${title}`,
    })
  },
  // 点击更换猜你喜欢的书籍推荐
  changBatch() {
    const that = this
    const count = that.data.clickChangTimes + 1
    console.log(count, 'count')
    const list1 = [{
      picUrl: 'https://img3.doubanio.com/view/subject/l/public/s29347432.jpg',
      name: '银儿与我',
      author: '作者：[西班牙] 胡安·拉蒙·希梅内斯',
      desc: '出版年: 2017-01'
    },
    {
      picUrl: 'https://img3.doubanio.com/view/subject/l/public/s1033563.jpg',
      name: '卡尔文与霍布斯',
      author: '作者: [美] 比尔·沃特森',
      desc: '出版年: 1992-2'
    },
    {
      picUrl: 'https://img1.doubanio.com/view/subject/l/public/s1123247.jpg',
      name: '一次・图片和故事',
      author: '作者: 维姆・文德斯',
      desc: '出版年: 2004-04'
    }]
    const list2 = [{
      picUrl: 'https://img1.doubanio.com/view/subject/l/public/s28872219.jpg',
      name: '不属于我们的世纪',
      author: '作者: [美] 马修·托马斯',
      desc: '出版年: 2016-9-1'
    },
    {
      picUrl: 'https://img1.doubanio.com/view/subject/l/public/s27284098.jpg',
      name: '安徒生童话全集',
      author: '作者: 安徒生(Andersen.H.C.)',
      desc: '出版年: 2008-2-1'
    },
    {
      picUrl: 'https://img3.doubanio.com/view/subject/l/public/s5735941.jpg',
      name: '灌篮高手31',
      author: '作者: [日] 井上雄彦',
      desc: '出版年: 2005-1'
    }]
    const list3 = [{
      picUrl: 'https://img3.doubanio.com/view/subject/l/public/s29524800.jpg',
      name: '海贼王',
      author: '作者: 尾田荣一郎',
      desc: '出版年: 2007-11'
    },
    {
      picUrl: 'https://img1.doubanio.com/view/subject/l/public/s11318109.jpg',
      name: '哈尔罗杰历险记(全套共14册)',
      author: '作者: 威勒德·普赖斯',
      desc: '出版年: 1998-05-01'
    },
    {
      picUrl: 'https://img3.doubanio.com/view/subject/l/public/s4416851.jpg',
      name: '资治通鉴（全四册）',
      author: '作者: 司马光',
      desc: '出版年:  2009-1'
    }]
    const list4 = [{
      picUrl: 'https://img9.doubanio.com/view/subject/l/public/s29849366.jpg',
      name: '莎莎的石头',
      author: '作者：（美）艾伦·贝克尔',
      desc: '这是异步很好看的修仙类的图书'
    },
    {
      picUrl: 'https://img3.doubanio.com/view/subject/l/public/s2810951.jpg',
      name: '玛法达与伙伴们',
      author: '作者：（阿根廷）季诺',
      desc: '这是异步很好看的修仙类的图书'
    },
    {
      picUrl: 'https://img3.doubanio.com/view/subject/l/public/s3530831.jpg',
      name: '撒哈拉的故事',
      author: '作者：三毛',
      desc: '出版年: 1987 出版于湖南文艺出版社'
    }]
    this.setData({ 'loading': true })
    setTimeout(() => {
      if (count === 1) return this.setData({ 'suggestBookList': list1, 'clickChangTimes': count, 'loading': false })
      if (count / 2 === 1) return this.setData({ 'suggestBookList': list2, 'clickChangTimes': count, 'loading': false })
      if (count / 3 === 1) return this.setData({ 'suggestBookList': list3, 'clickChangTimes': count, 'loading': false })
      if (count / 4 === 1) return this.setData({ 'suggestBookList': list4, 'clickChangTimes': count, 'loading': false })
      if (count > 4) this.setData({ 'clickChangTimes': 0, 'loading': false })
    }, 500)
  }
})
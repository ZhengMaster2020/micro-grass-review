Page({
  data: {
    selectType: '类型',
    bookType: [
      { text: '每日推荐', value: '每日推荐' },
    ],
    initType: '每日推荐',
    title: '每日推荐',
    bookMsg: [
      {
        num: 1,
        imgUrl: 'https://img3.doubanio.com/view/ark_column_cover/retina/public/32900783.jpg?v=1583117159',
        name: '凶案密码——保险柜里的骷髅',
        intro: '北宋绍圣年间，京师开封府巡使山樵、判官林霆侦破了一起连环杀人案，查获一张玉玺印记，根据在连环杀人案中获得的线索，山巡史、林判官奉旨赴长安寻找传国玺，在寻找过程中，一一桩案件浮出水面，他俩解开了一个个谜团，发现了仿制秦玺之真相，找到了印记之本玺，在回京师的途中，他俩被人追杀，回到京师又遭官府缉拿，恰在这时，农民段义修舍得玉印送至京师，引起了真伪之争，那么此秦玺与彼秦玺有关系吗，山巡史和林判官如何走出了困境？且看本书讲述的故事——',
        author: '说于桑田',
        type: '悬疑'
      },
      {
        num: 2,
        imgUrl: 'https://img3.doubanio.com/view/ark_column_cover/retina/public/32556872.jpg?v=1571825483',
        name: '传国玉玺事件',
        intro: '“这种事情我觉得你可以找警方帮忙吧？”“毕竟是我的客户呀，我得为他保密，我还是有职业操守的。”“这四个字做梦也想不到有一天会从你的嘴里被说出来吧。”',
        author: '山藤谷野',
        type: '悬疑'
      },
      {
        num: 3,
        imgUrl: 'https://img9.doubanio.com/view/ark_column_cover/retina/public/8017664.jpg?v=1553237133',
        name: '滁州案',
        intro: '宋代滁州惊现离奇连环凶杀，传奇词人辛弃疾走马上任，豪放断案。',
        author: '陈言',
        type: '悬疑'
      },
      {
        num: 4,
        imgUrl: 'https://img9.doubanio.com/view/ark_column_cover/retina/public/32697165.jpg?v=1579068848',
        name: '找到她',
        intro: '儿子深陷少女失踪谜案，为证清白娱记妈妈只身探案。她逐一撕开相关者的伪装面具，原来我们离罪恶如此之近。',
        author: '洛熙',
        type: '悬疑'
      },
      {
        num: 5,
        imgUrl: 'https://img3.doubanio.com/view/ark_column_cover/retina/public/32682723.jpg?v=1584674208',
        name: '追光',
        intro: '南方局上海站负责人“老火”，牺牲前给谍报员英杨留下“71号保险箱”，指示他“将来开启之人可绝对信任”。两年后，转隶上海情报科的英杨接到了开启“71号保险箱”的指令，出于对“老火”的信任，英杨决定赴约，就此接触并最终加入了神秘的“仙子”小组……民族危亡的漫漫长夜里，英杨的信仰像极光般莫测而又绚烂，感召他，也鼓舞他。',
        author: '波兰加黑仑',
        type: '悬疑'
      }
    ],
  },

  // 切换书籍类型
  changeType(e) {
    console.log("change", e.detail)
    const that = this
    const {detail} = e
    this.fetchBookByType(detail)
  },

  // 获取书籍所有类型
  fetchBookAllType() {
    wx.showLoading({
      title: '加载中...',
    })
    const that = this
    wx.cloud.callFunction({
      name: 'fetchBookByType',
      data: { fetchType: true }
    })
    .then(res => {
      console.log(res, 'res')
      const { data } = res.result
      const typeArr = []
      data.forEach(item => {
        typeArr.push({
          text: item.type,
          value: item.type
        })
      })
     that.setData({'bookType': typeArr})
    })
    .catch((err) => {
      console.log(err, 'err')
      return [{}]
    })
    .finally(() => {
      wx.hideLoading()
    })
  },

  // 根据书籍类型获取书籍
  fetchBookByType(type='每日推荐') {
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.callFunction({
      name: 'fetchBookByType',
      data: { type }
    })
    .then(res => {
      console.log(res, 'res')
      const { data } = res.result
      const books = []
      data.forEach((item, index) => {
        books.push({
          num: index+1,
          imgUrl: item.avatarUrl,
          name: item.bookName,
          intro: item.introduction,
          author: item.author,
          type: item.type[1]
        })
      })
      this.setData({'bookMsg': books})
    })
    .catch(err => {
      console.log(err, 'err')
    })
    .finally(() => {
      wx.hideLoading()
    })
  },

  // 页面加载初始化数据
  onLoad(e) {
    console.log(e, 'topic')
    wx.showLoading({ title: '加载中...' })
    this.fetchBookAllType()
    this.fetchBookByType(e.type)
    this.setData({
      'title': e.type,
      'initType': e.type,
    })
  },

  onSwitch1Change({ detail }) {
    this.setData({ switch1: detail });
  },

  onSwitch2Change({ detail }) {
    this.setData({ switch2: detail });
  }
});
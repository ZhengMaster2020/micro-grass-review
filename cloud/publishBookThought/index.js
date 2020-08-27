// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'book-review-2020-v0u22'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const { bookID, point, content } = event
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const db = cloud.database()
  const _ = db.command
  try { // 先新增读后感记录后更新书籍记录信息
    const thoughtID = await db.collection('thoughts')
      .add({ data: { content, bookID, openid, publishTime: new Date(), giveLike:false, likeNum: 0} })
    console.log(thoughtID, 'thoughtID')

    const book = await db.collection('books').where({ _id: bookID })
      .update({ data: { point: _.inc(point*2), pointCount: _.inc(1), thoughtsID: _.push([thoughtID._id]) } })

    return { flag: true, ...thoughtID, ...book }
  } catch (e) {
    console.log(e, 'eee')
  }

}
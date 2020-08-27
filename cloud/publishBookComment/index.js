// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'book-review-2020-v0u22'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const { bookID, content } = event
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const db = cloud.database()
  const _ = db.command
  try {
    const commentID = await db.collection('comments')
      .add({ data: { content, bookID, openid, publishTime: new Date(), giveLike:false, likeNum: 0 } })

    const book = await db.collection('books').where({ _id: bookID }).update({ data: {commentCount: _.inc(1)}})
    console.log(commentID, 'comment', book, 'book')
    return commentID
  } catch (e) {
    console.log(e, 'eee')
  }

}
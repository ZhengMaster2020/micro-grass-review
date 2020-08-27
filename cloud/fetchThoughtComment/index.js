// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'book-review-2020-v0u22'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const { fetchCount } = event
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const db = cloud.database()
  const _ = db.command
  try {

    // 获取用户的书籍评价以及读后感总数
    if(fetchCount) {
      const thoughtCount = await db.collection('thoughts').where({openid}).count()
      const CommentCount = await db.collection('comments').where({openid}).count()
      console.log('thoughtCount', thoughtCount, 'CommentCount', CommentCount )
      return { totalCount: thoughtCount.total + CommentCount.total }
    }

    // 根据书籍id获取该书籍的读后感
    const thoughtList = await db.collection('thoughts').aggregate().lookup({
      from: 'books',
      localField: 'bookID',
      foreignField: '_id',
      as: 'bookList',
    }).match({ openid }).end()

    // 根据书籍id获取该书籍的书评内容
    const commentList = await db.collection('comments').aggregate().lookup({
      from: 'books',
      localField: 'bookID',
      foreignField: '_id',
      as: 'bookList',
    }).match({ openid }).end()

    console.log(thoughtList, 'list',commentList, 'comment')
    return { thoughtList:thoughtList.list, commentList: commentList.list }
  } catch (e) {
    console.log(e, 'eee')
  }

}
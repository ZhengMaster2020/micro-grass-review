// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'book-review-2020-v0u22'
})

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event, 'event')
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const openid = wxContext.OPENID
  try {
    // collections表与books表进行连表查询
    const result = await db.collection('histories').aggregate().lookup({
      from: 'books',
      localField: 'bookID',
      foreignField: '_id',
      as: 'historyList',
    }).match({ openid }).limit(20).end()
    console.log(result, 'result')
    return result
  } catch (e) {
    console.log(e, 'e')
  }
}
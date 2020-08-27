// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'book-review-2020-v0u22'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const openid = wxContext.OPENID
  console.log(openid, 'openid')
  try {
    if (event.count) return await db.collection('collections').where({ openid }).get()
    // collections表与books表进行连表查询
    const collection = await db.collection('collections').aggregate().lookup({
      from: 'books',
      localField: 'bookID',
      foreignField: '_id',
      as: 'collectionList',
    }).match({openid}).end()
    console.log(collection, 'collection')
    return collection
  } catch(e) {
    console.log(e, 'e')
  }
}
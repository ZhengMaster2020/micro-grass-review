// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'book-review-2020-v0u22'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const { collectBookFlag } = event
  const bookID = event.bookid
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const openid = wxContext.OPENID
  console.log(event, openid)
  const _ = db.command
  try {
    await db.collection('books').where({ _id: bookID }).update({ data: { collectBookFlag: !collectBookFlag }})
    if (!collectBookFlag) { 
      // 新增收藏记录
      const add = await db.collection('collections').add({ data: { bookID, openid, collectionTime: new Date() }})
      const book = await db.collection('books').where({ _id: bookID })
        .update({ data: { collectionCount: _.inc(1)}})
      console.log(add, 'add', book, 'book')
      return {flag: true, ...add }
    } else {
      // 取消收藏记录
      const remove = await db.collection('collections').where({ bookID, openid }).remove()
      const book = await db.collection('books').where({ _id: bookID })
        .update({ data: { collectionCount: _.inc(-1) } })
      console.log(remove, 'remove', book, 'book')
      return { flag: false, ...remove }
    }
  } catch(e) {
    console.log(e, '数据库操作失败')
    return false
  }
}
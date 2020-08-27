// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'book-review-2020-v0u22'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const { bookID, fetchType, type } = event
  const db = cloud.database()
  const _ = db.command
  try {

    // 获取有所书籍类型
    if(fetchType) {
      const types = await db.collection('types').get()
      console.log(types, 'type')
      return types
    }

    // 根据类型获取书籍
    const books = await db.collection('books')
    .where({ type: _.in([type]) }).orderBy('collectionCount', 'desc').get()
    console.log(books, 'oppop')
    return books
  } catch (e) {
    console.log(e, 'eee')
  }

}
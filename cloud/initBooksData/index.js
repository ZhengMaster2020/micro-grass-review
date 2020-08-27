// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'book-review-2020-v0u22'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const initBooks = {}
  const keyword = event.type
  const db = cloud.database()
  const _ = db.command
  console.log(keyword, 'keyword')
  for(let key in keyword) {
    const books =  await db.collection('books').where({ type: keyword[key] }).limit(5).get()
    initBooks[key] = books
    console.log(initBooks, 'innit')
  }
  return initBooks
}
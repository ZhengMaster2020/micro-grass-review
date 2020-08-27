// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'book-review-2020-v0u22'
  // env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口 - 根据数据如关键字查询书籍
exports.main = async (event, context) => {
  const keyword = event.inputValue
  console.log(keyword, "keyword")
  const db= cloud.database()
  const _ = db.command
  return db.collection('books').where(_.or({ bookName: _.eq(keyword) }, { author: _.eq(keyword)}))
  .get().then(res => res.data).catch(err => console.log('err', err))
}
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'book-review-2020-v0u22'
  // env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口 - 根据数据如关键字查询书籍
exports.main = async (event, context) => {
  console.log(event, "keyword")
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const db = cloud.database()
  const _ = db.command
  try {
    await db.collection('users').update({ data: { openid, ...event } })
  } catch(e) {
    console.log(e, '数据库操作失败')
  }
}
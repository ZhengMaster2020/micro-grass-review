// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'book-review-2020-v0u22'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const { bookID } = event
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const openid = wxContext.OPENID
  try {
    const result = await db.collection('histories').where({bookID}).get()
    if (!result.data.length) {
      const history =   await db.collection('histories').add({ data: { openid, bookID, reviewTime: new Date() }})
      return history
    }
  } catch (e) {
    console.log(e, 'e')
  }
}
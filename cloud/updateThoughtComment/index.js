// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'book-review-2020-v0u22'
  // env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口 - 根据数据如关键字查询书籍
exports.main = async (event, context) => {
  const { thoughtid, commentid, giveLike, type, _id } = event
  console.log(event, "keyword")
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  console.log(giveLike, 'giveLike')
  try {

    // 删除操作
    if(type === '读后感') {
      const status = await db.collection('thoughts').where({_id}).remove()
      return status
      console.log(status, 'status')
    } else if(type === '书评') {
      const deleteStatus = await db.collection('comments').where({_id}).remove()
      console.log(deleteStatus)
      return deleteStatus
    }

    if (!giveLike) { // 点赞操作
      if (thoughtid) {
        return await db.collection('thoughts')
          .where({ _id: thoughtid }).update({ data: { likeNum: _.inc(1), giveLike: !giveLike } })
      } {
        return await db.collection('comments')
          .where({ _id: commentid }).update({ data: { likeNum: _.inc(1), giveLike: !giveLike}})
      }
    } else { // 取消点赞
      if (thoughtid) {
        return await db.collection('thoughts')
          .where({ _id: thoughtid }).update({ data: { likeNum: _.inc(-1), giveLike: !giveLike } })
      } {
        return await db.collection('comments')
          .where({ _id: commentid }).update({ data: { likeNum: _.inc(-1), giveLike: !giveLike } })
      }
    }
  } catch (e) {
    console.log(e, '数据库操作失败')
  }
}
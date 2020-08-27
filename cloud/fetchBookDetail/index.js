// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'book-review-2020-v0u22'
})

// 云函数入口函数
exports.main = async (event, context) => {
  const { bookID, readerFlag } = event
  const db = cloud.database()
  const _ = db.command
  try {

    // 更新书籍字段readers值
    if(readerFlag) { 
      await db.collection('books').where({ _id: bookID }).update({data: { readers: _.inc(1) }})
      return { read: true }
    }

    // 根据id获取书籍
    const book = await db.collection('books').doc(event.bookID).get()
  
    // 根据书籍id获取该书籍的读后感
    const list = await db.collection('thoughts').aggregate().lookup({
      from: 'users',
      localField: 'openid',
      foreignField: 'openid',
      as: 'usersList',
    }).match({ bookID }).end()
    
    // 根据书籍id获取该书籍的书评内容
    const commentList = await db.collection('comments').aggregate().lookup({
      from: 'users',
      localField: 'openid',
      foreignField: 'openid',
      as: 'usersList',
    }).match({ bookID }).end()

    console.log(list ,'list', book, 'book', commentList, 'comment')
    return { ...book , ...list, commentList: commentList.list }
  } catch(e) {
    console.log(e, 'eee')
  }

}
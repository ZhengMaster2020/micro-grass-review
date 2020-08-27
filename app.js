App({
  onLaunch(options) {
    // 云开发环境初始化
    wx.cloud.init({
      env: 'book-review-2020-v0u22'
    })
    const that = this
    // 微信版本判断
    if (wx.nextTick) {
      wx.nextTick()
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    // 获取缓存中的授权登录标识
    let auth = wx.getStorageSync('auth') || false
    console.log(auth, 'auth')
    // 如果没有授权登录则让用户授权
    if (!auth) {
      wx.showModal({
        title: '微信授权登录',
        content: '青春活力书友会申请获取您的公开信息（昵称、头像等）',
        confirmText: '允许',
        cancelText: '拒绝',
        success(res) {
          if (res.confirm) {
            wx.getSetting({
              success(res) {
                const authFlag = res.authSetting['scope.userInfo']
                if (authFlag) {
                  wx.setStorage({ key: 'auth', data: authFlag })
                  wx.getUserInfo({
                    success(res) {
                      const { userInfo } = res
                      wx.cloud.callFunction({
                        name: 'updateUserInfo',
                        data: userInfo
                      }).then(res => {
                        consol.log(res, 'res')
                      })
                      .catch(err => {
                        console.log('err', err)
                      })
                      wx.setStorage({
                        key: 'userInfo',
                        data: { userInfo, 'isLogin': true },
                      })
                    }
                  })
                }
              }
            })

          } else {
            wx.removeStorage({ key: 'auth' })
            wx.removeStorage({ key: 'userInfo' })
          }
        },
        
      })
    }
  },
})
//app.js

const init = require('/base/config.js')

App({
  onLaunch: function () {
    init(this)
    let res = wx.getSystemInfoSync()
    this.titleBarHeight = 44
    this.systemInfo = res
    this.statusBarHeight = res.statusBarHeight
    this.totalTopHeight = this.statusBarHeight + this.titleBarHeight
  },
  globalData: {
    userInfo: null
  }
})
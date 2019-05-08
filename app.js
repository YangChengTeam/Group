//app.js

const init = require('/base/config.js')

App({
  onLaunch: function () {
    init(this)
  },
  globalData: {
    userInfo: null
  }
})
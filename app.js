//app.js
const regeneratorRuntime = global.regeneratorRuntime = require('/libs/runtime')
const {
  tabListAdpater
} = require("/base/adpater.js")
const init = require('/base/config.js')
const request = require('/libs/kk/request.js')

App({
  async onLaunch () {
    init(this)
    let res = wx.getSystemInfoSync()
    this.titleBarHeight = 44
    this.systemInfo = res
    
    this.statusBarHeight = res.statusBarHeight
    this.totalTopHeight = this.statusBarHeight + this.titleBarHeight

    let data = await request.post("/user/Config", {}).catch(e => {
         
    })
    if(data && data.data && data.data.code == 1){
      this.config = data.data.data
      this.tabList = tabListAdpater(data.data.data.menu)
      console.log(this.tabList)
      if(this.configCallback){
        this.configCallback(this.config)
      }
    }

  },
  rpx2px(rpx){
    console.log(this.systemInfo.screenWidth)
     return this.systemInfo.screenWidth / 750 * rpx
  },
  px2rpx(px){
    return 750 / this.systemInfo.screenWidth * px
  },
  globalData: {
    userInfo: null
  }
})
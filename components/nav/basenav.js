// components/nav/nav.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: { 
    color: {
      type: String,
      value: '#000'
    },
    background: {
      type: String,
      value: '#fff'
    }
  },
  ready(){
    if (app.totalTopHeight && app.statusBarHeight && app.titleBarHeight){
      this.setData({
        totalTopHeight: app.totalTopHeight,
        statusBarHeight: app.statusBarHeight,
        titleBarHeight: app.titleBarHeight,
        ...this.properties
      })
      return
    }
    let thiz = this
    wx.getSystemInfo({
      success: function (res) {
        app.titleBarHeight = 44
        app.systemInfo = res
        app.statusBarHeight = res.statusBarHeight
        app.totalTopHeight = app.statusBarHeight + app.titleBarHeight

        thiz.setData({
          totalTopHeight: app.totalTopHeight,
          statusBarHeight: app.statusBarHeight,
          titleBarHeight: app.titleBarHeight
        })
      }
    })
  },
  
})

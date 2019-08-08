// components/loading/loading.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached() {
    let thiz = this
    if(!app.systeminfo){
      let res = wx.getSystemInfoSync()
      this.titleBarHeight = 44
      app.systemInfo = res
      app.totalTopHeight = res.statusBarHeight + this.titleBarHeight
    }
    var height = app.systemInfo.screenHeight - app.totalTopHeight
    thiz.setData({
      ...thiz.properties,
      height: height,
      version: app.version,
      color: app.templateConfig.theme.backgroundColor
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

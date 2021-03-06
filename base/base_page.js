const app = getApp();

const regeneratorRuntime = global.regeneratorRuntime = require('../libs/runtime')
const request = require('../libs/kk/request.js')


/**
 *  页面基类
 */
var BasePage = function(obj) {

  /**
   * 选择Tab 
   */
  obj.selectedTab = function() {
    var thiz = this
    var index = -1;

    var hasTabBar = typeof this.getTabBar === 'function' &&
      this.getTabBar()

    for (let i = 0; i < app.tabList.length; i++) {
      let item = app.tabList[i]
      if (item.pagePath.indexOf(thiz.route) != -1) {
        index = i
        break
      }
    }
    this.setData({
      selected: index
    })
    if (hasTabBar) {
      this.getTabBar().setData({
        selected: index
      })
    } 
  }

  obj.loading = function() {
    if (this.loaded) return
    this.loaded = 1
    this.setData({
      navOpacity: 1,
      loading: 1
    })
    obj.showTabs(0)
  }

  obj.loadend = function() {
    obj.showTabs(1)
    this.setData({
      navOpacity: 0,
      loading: 0
    })
  }

  obj.showTabs = function(show) {
    var thiz = this
    var hasTabBar = typeof this.getTabBar === 'function' &&
      this.getTabBar()
    if (hasTabBar) {
      console.log("show->"+show)
      thiz.getTabBar().setData({
        show: show
      })
    }
  }
  /**
   * 刷新Tab 
   */
  obj.refreshTabs = function(list) {
    var thiz = this

    if (list) {
      app.tabList = list
    }

    if (!app.tabList || app.tabList.length == 0) return

    var hasTabBar = typeof this.getTabBar === 'function' &&
      this.getTabBar()

    var isRefreshTabs = false
    for (let i = 0; i < app.tabList.length; i++) {
      let item = app.tabList[i]
      if (item.pagePath.indexOf(thiz.route) != -1) {
        isRefreshTabs = true
        break
      }
    }

    if (isRefreshTabs) {
      if (hasTabBar) {
        thiz.getTabBar().setData({
          list: app.tabList
        })
      }
    }
  }
  obj.request = async function(options, msg) {
    var params = {
      token: "1",
    }

    if (options.params) {
      params = {
        ...params,
        ...options.params
      }
    }
    let data = await request.post(options.path, params).catch(e => {
      this.err = e
      console.log(e)
    })

    if (data && data.data && data.data.code == 1) {
      if (options.success) {
        options.success(data.data.data)
      }
    } else {
      if (options.fail) {
        var msg = "网络错误"
        if (data && data.data) {
          msg = data.data.msg
        }
        options.fail(msg)
      }
    }
    wx.stopPullDownRefresh()
  }
  /**
   * 重载Page onLoad
   */
  obj.mirror_onLoad = obj.onLoad || function(options) {};
  obj.onLoad = function(options) {
    obj = {
      ...obj,
      ...this
    } // 合并到子Page

    obj.mirror_onLoad(options)
    this.page = 1
    this.data.status = -2

    this.setData({
      version: app.version || "v1.0.0",
      config: app.config || {},
      basicConfig: app.templateConfig.theme,
      totalTopHeight: app.totalTopHeight,
      userInfo: app.userInfo || {}
    })
    this.refreshTabs()
  }

  /**
   * 重载Page onShow
   */
  obj.mirror_onShow = obj.onShow || function() {};
  obj.onShow = function() {
    obj.mirror_onShow()
    this.selectedTab()
  }
  obj.mirror_select = obj.select || function(e){};
  obj.select = function(e) {
    this.params.status = e.currentTarget.dataset.type
    if (this.data.type === this.params.status) return
    obj.mirror_select()
    this.setData({
      type: this.params.status,
      list: []
    })
    this.refreshData()
  }

  

  Page(obj)
}


module.exports = BasePage
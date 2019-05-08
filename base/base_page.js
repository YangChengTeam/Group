
const {tabListAdpater} = require("../base/adpater.js")

const app = getApp();

app.tabList = tabListAdpater([
  {
    "title": "首页",
    "xcx_url": "/views/home/index",
    "pic": "http://q159.img.aiyichuan.com/urm_huodong/20190330/1553912112502.jpg"
  },
  {
    "title": "搜索",
    "xcx_url": "/views/list/search_list",
    "pic": "http://q159.img.aiyichuan.com/urm_huodong/20190419/1555676824384.jpg"
  },
  {
    "title": "抢购",
    "xcx_url": "/views/list/quick_list",
    "pic": "http://q159.img.aiyichuan.com/urm_huodong/20190124/1548262096999.jpg"
  },
  {
    "title": "赚钱",
    "xcx_url": "/views/card/index",
    "pic": "http://q159.img.aiyichuan.com/urm_huodong/20190330/1553912116425.jpg"
  },
  {
    "title": "我的",
    "xcx_url": "/views/my/index",
    "pic": "http://q159.img.aiyichuan.com/urm_huodong/20190330/1553912119794.jpg"
  }
])

/**
 *  页面基类
 */
var BasePage = function(obj) {

  /**
   * 选择Tab 
   */
  obj.selectedTab = function() {
    var thiz = this

    let hasTabBar = typeof thiz.getTabBar === 'function' &&
      thiz.getTabBar();
    if (!hasTabBar) return

    var index = 0;
    for (let i = 0; i < app.tabList.length; i++) {
      let item = app.tabList[i]
      if (item.pagePath.indexOf(thiz.route) != -1) {
        index = i
        break
      }
    }

    thiz.getTabBar().setData({
      selected: index
    })
  }

  /**
   * 刷新Tab 
   */
  obj.refreshTabs = function(list) {
    var thiz = this
    
    if(list){
      app.tabList = list
    }

    if(!app.tabList || app.tabList.length == 0) return

    var isRefreshTabs = false
    for (let i = 0; i < app.tabList.length; i++) {
      let item = app.tabList[i]
      if (item.pagePath.indexOf(thiz.route) != -1) {
        isRefreshTabs = true
        break
      }
    }

    if (isRefreshTabs) {
      thiz.setData({
         tabList: app.tabList
      })
    }
  }

  /**
   * 重载Page onLoad
   */
  obj.mirror_onLoad = obj.mirror_onLoad || function() {};
  obj.onLoad = function() {
    obj.mirror_onLoad()
    this.setData({
      basicConfig: app.templateConfig.basic
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


  Page(obj)
}


module.exports = BasePage
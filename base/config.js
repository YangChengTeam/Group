/**
 *  模板设置
 */

var templateConfig = {
  /**
   *  基础设置
   */
  theme: {
    backgroundColor: "#fb715d", //小程序顶部自定义颜色
    themeColor: "#000", //小程序主题颜色
    subColor: "#fff" //小程序辅助配色
  },
  /**
   *  视图类型
   */
  viewtype: ["0" , "1", "2", "3"]
}

/**
 *  Tab默认设置
 */
var tabList = []

module.exports = function(app) {
  app.templateConfig = templateConfig
  app.tabList = tabList
  app.version = "v1.0.0"
  app.BASE_URL = "http://www.shop.m"
  app.TAB_BARS = [{
    pagePath: "views/home/index",
    text: "首页"
  }, {
    pagePath: "views/list/search_list",
    text: "分类"
  }, {
    pagePath: "views/list/quick_list",
    text: "抢购"
  }, {
    pagePath: "views/good/index",
      text: "好评"
  }, {
    pagePath: "views/my/index",
    text: "我的"
  }]
}
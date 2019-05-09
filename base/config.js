/**
 *  模板设置
 */

var templateConfig = {
  /**
   *  基础设置
   */
  theme: {
    backgroundColor: "#f10000", //小程序顶部自定义颜色
    themeColor: "#000", //小程序主题颜色
    subColor: "#fff" //小程序辅助配色
  }
}

/**
 *  Tab默认设置
 */
var tabList = []

module.exports = function(app) {
  app.templateConfig = templateConfig
  app.tabList = tabList
  app.BASE_URL = "https://xcxb.aiyichuan.com/wxapp/v1."
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
    pagePath: "views/shop/index",
    text: "好店"
  }, {
    pagePath: "views/my/index",
    text: "我的"
  }]
}
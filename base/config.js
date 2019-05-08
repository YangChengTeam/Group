
/**
 *  模板设置
 */

var templateConfig = {
  /**
   *  基础设置
   */
  basic: {
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
  app.tabList = tabList;
}
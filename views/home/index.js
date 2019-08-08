//index.js
//团购首页

const app = getApp()

const regeneratorRuntime = global.regeneratorRuntime = require('../../libs/runtime')
const InfoPage = require('../../base/info_page.js')

const {
  tabListAdpater
} = require("../../base/adpater.js")

const md5 = require("../../miniprogram_npm/_md5@2.2.1@md5/index")

const request = require('../../libs/kk/request.js')



InfoPage({
  data: {
    viewtype: [0, 1, 2, 3]
  },

  async onLoad() {
    var that = this
    this.path="/user/Config"
    app.configCallback = function(config) {
      that.refreshTabs()
      that.selectedTab() 
    }
    if (app.tabList.length) {
      that.setData({
         loading: 0
      })
    }
    this.setData({
      navOpacity: 0,
      bannerList: [{
        "title": "",
        "path": "/views/list/search_list",
        "icoUrl": "http://q159.img.aiyichuan.com/urm_huodong/20190507/1557236207810.jpg?imageMogr2/thumbnail/!750x426r|imageView2/1/w/750/h/426"
      }]
    })
  },
  onPageScroll(e) {
    let scrollTop = e.scrollTop

    var navOpacity = (scrollTop / app.totalTopHeight)
    if (navOpacity > 1) {
      navOpacity = 1
    } else if (navOpacity < 0.1) {
      navOpacity = 0
    }
    this.setData({
      navOpacity: navOpacity
    })
  }

})
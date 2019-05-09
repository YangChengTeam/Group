//index.js
//团购首页

const regeneratorRuntime = global.regeneratorRuntime = require('../../libs/runtime')
const app = getApp()

const BasePage = require('../../base/base_page.js')

BasePage({
  data: {

  },

  async onLoad() {
    this.setData({
      navOpacity: 0,
      bannerList: [{
        "title": "",
        "path": "/views/list/search_list",
        "icoUrl": "http://q159.img.aiyichuan.com/urm_huodong/20190507/1557236207810.jpg?imageMogr2/thumbnail/!750x426r|imageView2/1/w/750/h/426"
      }]
    })

    console.log(this.getTabBar())
    

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
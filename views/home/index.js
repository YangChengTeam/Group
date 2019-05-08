//index.js
//团购首页

const regeneratorRuntime = global.regeneratorRuntime = require('../../libs/runtime')
const app = getApp()

const BasePage = require('../../base/base_page.js')

BasePage({
  data: {

  },

  async onLoad() {
    console.log(Page)
    console.log(await this.test())
    console.log(1001)

   
  },
  
  test() {
    return new Promise((r, j) => {
      setTimeout(() => {
        r(1000)
      }, 4000)
    })
  }
})

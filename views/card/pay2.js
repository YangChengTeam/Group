// views/card/pay2.js
// 购买超级粉丝卡
const regeneratorRuntime = global.regeneratorRuntime = require('../../libs/runtime')
const app = getApp()

const BasePage = require('../../base/base_page.js')

BasePage({

  /**
   * 页面的初始数据
   */
  data: {
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.cardInfo)
    this.setData({
       info: app.cardInfo
    })
  },

  submit(e){
    var that = this
    var options = {}
    options.path = "/user/card/paySuccess"

    options.params = {
      order_id: app.cardInfo.order_id
    }

    options.success = function (info) {
       app.userInfo.card.is_carder = 1
       wx.navigateBack({
         delta: 2
       })
    }

    options.fail = function (msg) {
      wx.showToast({
        title: msg || "支付失败，请重试",
        icon: "none",
      })
    }
    this.request(options)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
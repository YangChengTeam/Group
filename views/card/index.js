// views/card/index.js
// 会员卡首页
const regeneratorRuntime = global.regeneratorRuntime = require('../../libs/runtime')
const app = getApp()

const InfoPage = require('../../base/info_page.js')
InfoPage({

  /**
   * 页面的初始数据
   */
  data: {
    code: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.path = "/user/card/memberCardInfo"
      this.params = {
        card_id: app.userInfo.card.cardinfo.card_id
      }
  },
  nav2pay(e){
     wx.navigateTo({
       url: '/views/card/pay',
     })
  },
  show_code_dialog(e) {
    this.setData({
      show: 1
    })
  },
  cancel() {
    this.setData({
      show: 0
    })
  },
  inputCode(e) {
    this.data.code = e.detail.value
    console.log(this.data.code)
  },
  submitCode(e) {
    var that = this
    var options = {}
    options.path = "/user/card/bindCardExchange"
    options.params = {
      code: this.data.code
    }
    options.success = function (info) {
      
      wx.showToast({
        title: '激活成功',
      })

      wx.navigateBack({

      })

      that.refreshData() 
    }

    options.fail = function (msg) {
      wx.showToast({
        title: msg || "激活失败，请重试",
        icon: "none"
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
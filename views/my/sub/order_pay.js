// views/my/sub/order_pay.js
// 订单支付

const regeneratorRuntime = global.regeneratorRuntime = require('libs/runtime')
const app = getApp()

const InfoPage = require('base/info_page.js')

InfoPage({

  /**
   * 页面的初始数据
   */
  data: {
    show: 0,
    countdownStr: "..."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.path = "/user/buy/goPay"
    this.params = {
      orders_id: app.orderInfo.id,
      type: 'o'
    }
    this.success = function(info){
      var t = info.info.countdown
      if (info && info.info && info.info.countdown > 0){
          setInterval(()=>{
            t -= 1
            that.setData({
              countdownStr: that.int2time(t)
            })
          }, 1000)
      } else {
        that.setData({
           countdownStr: that.int2time(0)
        })
      }
    }
  },

  int2time(t){
     var m = parseInt(t / 60)
     var s = t % 60
     return `0${m}:${s>9?s+'':'0'+s}`
  },

  show_pay_dialog() {
    if (this.data.countdownStr = "00:00") {
      wx.showToast({
         title: "付款已超时",
         icon: "none"
      })
      return
    }
    this.setData({
      show: 1
    })
  },

  payd(e) {
    if(this.data.countdownStr="00:00") return
    var that = this
    var options = {}
    options.path = "/user/buy/hadPay"
    options.params = {
      orders_id: app.orderInfo.id,
      type: 'o'
    }
    options.success = function(res) {
      app.isRefresh = true
      wx.navigateBack({

      })
    }
    options.fail = function(msg) {
      wx.showToast({
        title: msg || '您没有支付~',
        icon: 'none'
      })
      that.setData({
        show: 0
      })
    }
    this.request(options)
  },
  pay(e) {
    if (this.data.countdownStr = "00:00") return
    var options = {}
    options.path = "/user/buy/pay"
    options.params = {
      orders_id: app.orderInfo.id,
      type: 'o'
    }
    options.success = function(res) {
      app.isRefresh = true
      wx.showToast({
        title:  '支付成功~',
      })
      wx.navigateBack({

      })
    }
    options.fail = function(msg) {
      console.log(msg)
      wx.showToast({
        title: msg || '您没有支付~',
        icon: 'none'
      })
      this.setData({
        show: 0
      })
    }
    this.request(options)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})
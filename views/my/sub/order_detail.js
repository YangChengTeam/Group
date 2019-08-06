// views/my/sub/order_detail.js
// 订单详情

const regeneratorRuntime = global.regeneratorRuntime = require('libs/runtime')
const app = getApp()

const InfoPage = require('base/info_page.js')
InfoPage({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.path = "/user/my_orders/info"
      this.params = {
        id: app.orderInfo.id
      }
  },
  refund(e){
    var that = this
    var options = {}
    options.path = "/user/buy/refund"
    options.params = {
      orders_id: app.orderInfo.id,
      type: 'o'
    }
    options.success = function (res) {
      app.isRefresh = true
      wx.navigateBack({

      })
    }
    options.fail = function (msg) {
      wx.showToast({
        title: msg || '退款失败，请联系客服~',
        icon: 'none'
      })
      that.setData({
        show: 0
      })
    }
    this.request(options)
  },
  callphone(e){
    var item = e.currentTarget.dataset.item
    wx.makePhoneCall({
      phoneNumber: item.tel,
    })
  },
  openmap(e){
    var item = e.currentTarget.dataset.item
    wx.openLocation({
      latitude: parseFloat(item.latitude),
      longitude: parseFloat(item.longitude),
      address: item.address
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
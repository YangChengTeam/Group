// views/my/sub/exchange_red_envelope.js
// 兑换红包

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
  onLoad: function(options) {
    this.path = "/user/hongbao/getExchangeList"
  },
  exchange(e) {
    if (this.isexchange) return

    var that = this
    var item = e.currentTarget.dataset.item
    wx.showModal({
      title: '提示',
      content: `您确定要兑换${item.fix_money_str}红包么`,
      success(res) {
        if (res.confirm) {
          that.isexchange = 1
          var options = {}
          options.path = "/user/hongbao/receiveExchange"
          options.params = {
            hongbao_id: item.id
          }
          options.success = function(info) {
            that.isexchange = 0
            app.userInfo.point = app.userInfo.point - item.exchange_point
            that.setData({
              userInfo: app.userInfo
            })
            wx.showToast({
              title: '兑换成功',
            })
          }
          options.fail = function(msg) {
            that.isexchange = 0
            wx.showToast({
              title: msg || '兑换失败，请重试',
              icon: 'none'
            })
          }
          that.request(options)
        }
      }
    })

  },
  nav2record(e) {
    wx.navigateTo({
      url: '/views/my/sub/point_record',
    })
  },
  back(e){
    wx.navigateBack({
      
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
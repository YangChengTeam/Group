// views/withdraw/withdraw.js
// 提现

const app = getApp()

const regeneratorRuntime = global.regeneratorRuntime = require('../../libs/runtime')
const request = global.regeneratorRuntime = require('../../libs/kk/request.js')

const InfoPage = require('../../base/info_page.js')
InfoPage({
  /**
   * 页面的初始数据
   */
  data: {
    can_draw_income: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
       can_draw_income: options.can_draw_income
    })
  },
  submit(e){
     wx.showLoading({
       title: '正在提交...',
     })
     var that = this
     var options = {}
     options.path = "/user/my_assets/apply"
     options.success = function(info){
        app.success = info
        wx.navigateTo({
          url: 'success',
        })
        wx.hideLoading()
     }
    options.fail = function(msg){
        wx.hideLoading()
        wx.showToast({
           title: msg || '提现失败，请重试',
           icon: 'none'
        })
     }
     that.request(options)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// views/withdraw/index.js
// 提现

const app = getApp()

const regeneratorRuntime = global.regeneratorRuntime = require('../../libs/runtime')
const request = global.regeneratorRuntime = require('../../libs/kk/request.js')

const ListPage = require('../../base/list_page.js')
ListPage({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.path = "/user/my_assets"
    this.setData({
      navOpacity: 1,
      loading: 1
    })
    this.success = function(info) {
      that.setData({
        navOpacity: 0,
        loading: 0,
        info: info
      })
    }
    this.fail = function() {

    }
  },
  nav2withdraw(e){
     var can_draw_income = e.currentTarget.dataset.income
    if (parseInt(can_draw_income) <= 0){
       wx.showModal({
         title: '提示',
         content: '无提现余额',
         showCancel: false
       })
       return
    }
     wx.navigateTo({
       url: 'withdraw?can_draw_income=' + can_draw_income,
     })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.refreshData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
     this.loadData()
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
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
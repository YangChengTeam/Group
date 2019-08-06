// views/shop/index.js
// 我的店铺

const app = getApp()

const regeneratorRuntime = global.regeneratorRuntime = require('../../libs/runtime')

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
    this.setData({
      navOpacity: 1,
      loading: 1
    })
    this.path = "/user/my_shop"
    this.success = function(info) {
      that.setData({
        navOpacity: 0,
        loading: 0
      })
    }
    this.fail = function(info) {
      that.setData({
        navOpacity: 0,
        loading: 0
      })
    }
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
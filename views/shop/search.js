// views/shop/search.js
// 店铺搜索

const app = getApp()

const regeneratorRuntime = global.regeneratorRuntime = require('../../libs/runtime')

const ListPage = require('../../base/list_page.js')

ListPage({

  /**
   * 页面的初始数据
   */
  data: {
    name: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.path = "/user/my_shop/goods"
    this.params = {
      name: this.data.name
    }
  },
  input(e) {
    this.data.name = e.detail.value
  },
  genposter(e) {
    var item = e.currentTarget.dataset.item
    var options = {}
    options.path = "/user/my_shop/poster"
    options.params = {
      goods_id: item.id
    }
    options.success = function(info) {
        wx.hideLoading()
        wx.previewImage({
          urls: [info],
        })
    }
    options.fail = function(msg) {
       wx.hideLoading()
       wx.showToast({
         title: msg || '生成失败, 请重试',
         icon: "none"
       })
    }
    wx.showLoading({
      title: '生成中',
    })
    this.request(options)
  },
  nav2promotion_content(e) {
    var item = e.currentTarget.dataset.item
    app.goodInfo = item
    wx.navigateTo({
      url: '/views/shop/promotion_content',
    })
  },
  search(e) {
    this.params.name = this.data.name
    if (this.params.name.trim().length == 0) {
      wx.showToast({
        title: '请输入需要搜索的商品',
        icon: 'none'
      })
      return
    }
    this.refreshData()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.loadList()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
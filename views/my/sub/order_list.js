// views/my/order_list.js
// 订单页面

const regeneratorRuntime = global.regeneratorRuntime = require('libs/runtime')
const app = getApp()

const ListPage = require('base/list_page.js')

ListPage({

  /**
   * 页面的初始数据
   */
  data: {
    type: "all",
    typeInfos: [{
        name: "全部",
        type: "all"
      }, {
        name: "待支付",
        type: "waiting_pay"
      },
      {
        name: "待使用",
        type: "waiting_use"
      },
      {
        name: "待收货",
        type: "waiting_receive"
      },
      {
        name: "待评论",
        type: "waiting_comment"
      },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: this.data.typeInfos[app.type].type
    })
    this.path = "/user/my_orders"
    this.params = {
      status: this.data.type
    }
  },
  onShow() {
    if (app.isRefresh) {
      this.refreshData()
    }
  },
  nav2logistics(e) {
    var item = e.currentTarget.dataset.item
    app.orderInfo = item
    wx.navigateTo({
      url: '/views/my/sub/order_logistics',
    })
  },
  nav2comment(e) {
    var item = e.currentTarget.dataset.item
    app.orderInfo = item
    wx.navigateTo({
      url: '/views/my/sub/order_comment',
    })
  },
  contact(e) {
    wx.makePhoneCall({
      phoneNumber: app.config.business_config_service.tel,
    })
  },
  cancel_refund(e){
    var item = e.currentTarget.dataset.item
    app.orderInfo = item
    wx.showModal({
      title: '提示',
      content: '您确定取消退款吗?',
      success: (res) => {
        if (res.confirm) {
          that.request({
            path: "/user/my_orders/del",
            params: {
              id: id
            },
            success(info) {
              wx.showToast({
                title: '删除成功',
              })
            }
          })
        }
      }
    })
  },
  refund(e) {
    var item = e.currentTarget.dataset.item
    app.orderInfo = item
    wx.showModal({
      title: '提示',
      content: '您确定退款吗?',
      success: (res) => {
        if (res.confirm) {
          that.request({
            path: "/user/my_orders/del",
            params: {
              id: id
            },
            success(info) {
              wx.showToast({
                title: '删除成功',
              })
            }
          })
        }
      }
    })
  },
  confirm_receipt(e) {
    var item = e.currentTarget.dataset.item
    app.orderInfo = item
    wx.showModal({
      title: '提示',
      content: '您确定收货吗?',
      success: (res) => {
        if (res.confirm) {
          that.request({
            path: "/user/my_orders/del",
            params: {
              id: id
            },
            success(info) {
              wx.showToast({
                title: '删除成功',
              })
            }
          })
        }
      }
    })
  },
  del(e) {
    var id = e.currentTarget.dataset.id
    var that = this
    wx.showModal({
      title: '提示',
      content: '您确定删除此订单吗?',
      success: (res) => {
        if (res.confirm) {
          that.request({
            path: "/user/my_orders/del",
            params: {
              id: id
            },
            success(info) {
              wx.showToast({
                title: '删除成功',
              })
              for (var i = 0; i < that.data.list.length; i++) {
                var item = that.data.list[i]
                if (item.id == id) {
                  that.data.list.splice(i, 1)
                  break
                }
              }
              that.setData({
                list: that.data.list
              })
            }
          })
        }
      }
    })
  },

  nav2pay(e) {
    var item = e.currentTarget.dataset.item
    app.orderInfo = item
    wx.navigateTo({
      url: '/views/my/sub/order_pay',
    })
  },
  nav2detail(e) {
    var item = e.currentTarget.dataset.item
    app.orderInfo = item
    wx.navigateTo({
      url: '/views/my/sub/order_detail',
    })
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
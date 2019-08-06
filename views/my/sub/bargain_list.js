// views/my/sub/bargain_list.js
// 砍价订单

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
      name: "砍价中",
        type: "cutting"
    },
    {
      name: "已完成",
      type: "finish"
    },
    {
      name: "已失败",
      type: "failed"
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.path = "/user/my_bargain_orders"
    this.params = {
       status: this.data.type
     }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     this.loadList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
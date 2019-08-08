// views/my/sub/promotion_record.js
// 推广记录

const regeneratorRuntime = global.regeneratorRuntime = require('libs/runtime')
const app = getApp()

const ListPage = require('base/list_page.js')

ListPage({

  /**
   * 页面的初始数据
   */
  data: {
    type: "no_draw",
    typeInfos: [{
      name: "待提现",
      type: "no_draw"
    },
    {
      name: "可提现",
      type: "can_draw"
    },
    {
      name: "已提现",
      type: "had_draw"
    },
    {
      name: "已失效",
      type: "lose_draw"
    },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.path = "/user/my/sellerRecord"
    this.params = {
      status: this.data.type
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.loadData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
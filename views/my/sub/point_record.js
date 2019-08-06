// views/my/sub/point_record.js
// 积分兑换记录

const regeneratorRuntime = global.regeneratorRuntime = require('libs/runtime')
const app = getApp()

const ListPage = require('base/list_page.js')

ListPage({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.path = "/user/hongbao/getPointLogList"
    this.params = {}
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
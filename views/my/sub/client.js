// views/my/client.js
// 我的客户

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
     this.path = "/user/my/customers"
  },
  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
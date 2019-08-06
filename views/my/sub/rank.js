// views/my/rank.js
// 达人排行

const regeneratorRuntime = global.regeneratorRuntime = require('libs/runtime')
const app = getApp()

const InfoPage = require('base/info_page.js')

InfoPage({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'all',
    typeInfos: [{
        name: "全部",
        type: "all"
      },
      {
        name: "日榜",
        type: "day"
      },
      {
        name: "周榜",
        type: "week"
      },
      {
        name: "月榜",
        type: "month"
      },
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.path = "/user/my/ranking"
    this.params = {
      status: this.data.type
    }
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.refreshData()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
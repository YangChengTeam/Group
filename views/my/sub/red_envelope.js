// views/my/red_envelope.js
// 我的红包

const regeneratorRuntime = global.regeneratorRuntime = require('libs/runtime')
const app = getApp()

const ListPage = require('base/list_page.js')

ListPage({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      this.path = "/user/hongbao/getReceivedList"
      this.params = {
         is_used: this.data.currentIndex
      }
      this.success = function(info){
        that.setData({
            info: info
        })
      }
  },
  selectTab(e){
     this.params.is_used = e.currentTarget.dataset.index
     this.setData({
       currentIndex: this.params.is_used
     })
     this.refreshData()
  },
  nav2detail(e){
    app.item = e.currentTarget.dataset.item
    if (app.item.diff_time <= 0){
       wx.showToast({
         title: '已过期',
         icon: 'none'
       })
       return;
    }
    wx.navigateTo({
      url: '/views/my/sub/red_envelope_detail',
    })
  },
  exchange(e){
     wx.navigateTo({
       url: '/views/my/sub/exchange_red_envelope',
     })
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
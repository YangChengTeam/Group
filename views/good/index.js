// views/good/index.js
// 好评

const regeneratorRuntime = global.regeneratorRuntime = require('../../libs/runtime')
const app = getApp()

const ListPage = require('../../base/list_page.js')
ListPage({

  /**
   * 页面的初始数据
   */
  data: {
    type: "0",
    typeInfos: [{
      name: "优质好评",
      type: "0"
    }, {
      name: "推荐好店",
      type: "1"
    }
    ],
    goodType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: app.templateConfig.theme.backgroundColor,
    })
    var that = this
    this.path = "/user/fav_comment"
    this.params = {
       status : this.data.type,
       goods_type_id: this.data.goodType
    }
    this.success = function(info){
      that.setData({
         info: info
      })
    }
  },
  select(e){
     if(this.data.type == "0"){
       this.path = "/user/fav_comment2"
     } else {
       this.path = "/user/fav_comment"
     }
  },
  selectType(e){
    this.params.goods_type_id = e.currentTarget.dataset.id
    if (this.params.goods_type_id == this.data.goodType){
       return
    }
    this.setData({
      goodType: this.params.goods_type_id
    })
    this.refreshData()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
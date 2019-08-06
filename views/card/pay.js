// views/card/pay.js
// 购买超级粉丝卡
const regeneratorRuntime = global.regeneratorRuntime = require('../../libs/runtime')
const app = getApp()

const InfoPage = require('../../base/info_page.js')

InfoPage({

  /**
   * 页面的初始数据
   */
  data: {
    show: 0,
    currentCardInfo: {},
    currentCardIndex: 0,
    code: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.path = "/user/card/memberCardList",
    this.success = function(info){
      that.setData({
        currentCardInfo: info[0]
      })
    }
  },
  selectCard(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      currentCardIndex: index,
      currentCardInfo: this.data.info[index]
    })
  },
  submit(){
     var that = this
     var options = {}
     options.path = "/user/card/addCardOrder"
     
     options.params = {
        card_id: this.data.currentCardInfo.id
     }
     
     options.success = function(info){
         app.cardInfo = info
         console.log(app.cardInfo)
         wx.navigateTo({
           url: '/views/card/pay2',
         })
     }

     options.fail = function (msg) {
         wx.showToast({
           title: msg || "开通失败，请重试",
           icon: "none",
         })
     }
     this.request(options)
  },
  show_code_dialog(e) {
    this.setData({
      show: 1
    })
  },
  cancel() {
    this.setData({
      show: 0
    })
  },
  inputCode(e){
     this.data.code = e.detail.value
  },
  submitCode(e) {
    var options = {}
    options.path = "/user/card/bindCardExchange"
    options.params = {
      code: this.data.code
    }
    options.success = function (info) {
       app.userInfo.card.is_carder = 1
       
       wx.showToast({
          title: '开通成功',
       })

       wx.navigateBack({
          
       })
    }

    options.fail = function (msg) {
      wx.showToast({
        title: msg || "激活失败，请重试",
        icon: "none"
      })
    }
    this.request(options)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
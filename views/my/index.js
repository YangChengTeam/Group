// views/my/index.js
// 个人中心
const regeneratorRuntime = global.regeneratorRuntime = require('../../libs/runtime')
const app = getApp()

const InfoPage = require('../../base/info_page.js')
const request = require('../../libs/kk/request.js')

InfoPage({

  /**
   * 页面的初始数据
   */
  data: {
    topBgHeight: 0,
    show_bind_wx: 0,
    show_rank: 0,
    show_card: 0,
    wx_account: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    var that = this
    this.setData({
       navOpacity: 1,
       loading: 1
    })
    this.path = "/user/my"
    this.success = function(info){
      var topBgOffset = 280
      if (info.user_info.is_seller) {
        topBgOffset = 335
      }
      this.setData({
        topBgHeight: app.rpx2px(topBgOffset)
      })
      app.userInfo = info.user_info
      that.setData({
          navOpacity: 0,
          loading: 0
      })
    }
    this.fail = function(){
       
    }
    this.seeLevel()
  },
  seeLevel(e){
      var that = this
      var options = {}
      options.path = "/user/member/seeLevel"
      options.success = function(info){
        if(info.status){
          that.setData({
            level: info.data
          })
        }
      }
      this.request(options)
  },
  onPageScroll(e) {
    let scrollTop = e.scrollTop

    var navOpacity = (scrollTop / app.totalTopHeight)
    if (navOpacity > 1) {
      navOpacity = 1
    } else if (navOpacity < 0.1) {
      navOpacity = 0
    }
    this.setData({
      navOpacity: navOpacity
    })
  },
  onPullDownRefresh(){
     this.refreshData()
  },
   /**
   *  打开商品兑换
   */
  show_card_dialog(e){
     this.setData({
        show_card: 1
     })
  },
  cancel() {
    this.setData({
      show_card: 0
    })
  },
  inputCode(e) {
    this.data.code = e.detail.value
    console.log(this.data.code)
  },
  submitCode(e) {
    var that = this
    var options = {}
    options.path = "/user/card/bindCardExchange"
    options.params = {
      code: this.data.code
    }
    options.success = function (info) {
      app.userInfo.card.is_carder = 1
      wx.showToast({
        title: '激活成功',
      })

      wx.navigateBack({

      })

      that.refreshData()
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
   *  进入超级粉丝卡首页
   */
  nav2super_fan_card() {
    var url = '/views/card/pay'
    if (app.userInfo.card.is_carder){
      url = '/views/card/index'
    }
    wx.navigateTo({
      url: url
    })
  },
  /**
   *  打开绑定微信弹窗
   */
  show_bind_wx_dialog() {
    this.setData({
      show_bind_wx: 1
    })
  },
  /**
   *  进入邀请会员页面
   */
  nav2join_partner() {
    wx.navigateTo({
      url: '/views/my/sub/join_partner',
    })
  },
  /**
   *  进入我的客户页面
   */
  nav2client() {
    wx.navigateTo({
      url: '/views/my/sub/client',
    })
  },
  /**
  *  进入推广记录页面
  */
  nav2promotion_record() {
    wx.navigateTo({
      url: '/views/my/sub/promotion_record',
    })
  },
   /**
   *  进入达人排行页面
   */
  nav2rank() {
    wx.navigateTo({
      url: '/views/my/sub/rank',
    })
  },
   /**
   *  进入我的店铺页面
   */
  nav2shop(e) {
    console.log(e)
    wx.navigateTo({
      url: '/views/shop/index',
    })
  },
  /**
   *  进入订单列表页面
   */
  nav2order_list(e) {
    var type = e.currentTarget.dataset.type
    app.type = type
    wx.navigateTo({
      url: '/views/my/sub/order_list?type=' + type,
    })
  },
  /**
   *  打开邀请排行弹窗
   */
  show_rank_dialog(){
    this.setData({
      show_rank: 1
    })
  },
   /**
   *  进入我的红包页面
   */
  nav2red_envelope(){
    wx.navigateTo({
      url: '/views/my/sub/red_envelope',
    })
  },
  input(e){
     this.setData({
        wx_account : e.detail.value
     })
  },
  bindwx(e){
    var that = this
    if(!that.data.wx_account){  
       return
    }
    this.request({
      path: "/user/member/bindWx",
      params: {
        wx_account: this.data.wx_account
      },
      success(info){
        that.setData({
           show_bind_wx: 0
        })  
        wx.showToast({
          title: '绑定成功',
        })
      },
      fail(msg){
        that.setData({
          show_bind_wx: 0
        })  
        wx.showToast({
          title: msg || '绑定失败',
          icon: "none"
        })
      }
    })
  },
  close(e){
     this.setData({
       show_rank: 0
     })
  },

  contact(e){
    wx.makePhoneCall({
      phoneNumber: app.config.business_config_service.tel,
    })
  },
  /**
   * 进入申请为商家
   */
  nav2apply(e){
     
  },
  nav2withdraw(e){
    wx.navigateTo({
      url: '/views/withdraw/index',
    })
  },
  nav2bargain_list(e){
    wx.navigateTo({
      url: '/views/my/sub/bargain_list',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
// views/my/join_partner.js
// 邀请会员

const regeneratorRuntime = global.regeneratorRuntime = require('libs/runtime')
const app = getApp()

const BasePage = require('base/base_page.js')
const request = require('libs/kk/request.js')

BasePage({

  /**
   * 页面的初始数据
   */
  data: {
    isSubmit: false,
    phone: "",
    name: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  inputName(e){
    this.data.name = e.detail.value              
    console.log(e.detail.value     )
  },
  inputPhone(e){
    this.data.phone = e.detail.value
    console.log(this.data.phone)
  },
  submit(){
    if (this.data.isSubmit){
       wx.navigateBack({
         
       })
       return
    }
     var that = this
     this.request({
       path: "/user/member/joinPartners",
       params: {
         name: that.data.name,
         mobile: that.data.phone
       },
       success: (res)=>{
         that.setData({
            isSubmit: true
         })
       },
       fail: (msg)=>{
         wx.showToast({
           title: msg || "提交信息失败，请重试",
           icon: "none"
         })
       }
     })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// views/my/sub/order_comment.js
// 我的评论

const regeneratorRuntime = global.regeneratorRuntime = require('libs/runtime')
const app = getApp()

const BasePage = require('base/base_page.js')
BasePage({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    score: 1,
    imgs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderInfo: app.orderInfo
    })
  },
  // 打分
  playScore(res) {
    console.log(res)
    this.setData({
      score: res.currentTarget.dataset.index + 1,
    })
  },
  // 上传图片
  uploadimg() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.uploadFile({
          url: app.BASE_URL + '/user/my_orders/upload',
          filePath: res.tempFilePaths.join(""),
          name: 'file',

          success(info) {
            var data
            if (typeof info.data === "object") {
              data = info.data
            } else {
              data = JSON.parse(info.data)
            }
            if (data && data.code == 1) {
              var imgInfo = data.data[0]
              imgInfo.local_path = res.tempFilePaths.join("")
              that.data.imgs.push(imgInfo)
              that.setData({
                imgs: that.data.imgs
              })
            } else {
              wx.showToast({
                title: '上传图片失败',
                icon: 'none'
              })
            }
          }
        })
      }
    })
  },
  input(e) {
    this.data.content = e.detail.value
  },
  cancel() {
    if (this.data.content.length > 0 || this.data.imgs.length > 0){
        wx.showModal({
          title: '提示',
          content: '尚未编辑成功,您确定退出评论?',
          success: (res) => {
            if(res.confirm){
              wx.navigateBack({

              })
            }
          }
        })
        return
    }
    wx.navigateBack({

    })
  },
  async submit() {
    if (!this.data.content || this.data.content.length < 15) {
      wx.showToast({
        title: '请写下至少15字的点评哦',
        icon: "none"
      })
      return
    }
    var img = ""
    for (var i = 0; i < this.data.imgs.length; i++) {
      var item = this.data.imgs[i]
      img += item.url
      if (i != this.data.imgs.length - 1) {
        img += ","
      }
    }
    this.request({
      path: "/user/my_orders/comment",
      params: {
        goods_id: this.data.orderInfo.goods_id,
        orders_id: this.data.orderInfo.id,
        star: this.data.score,
        content: this.data.content,
        img: img
      },
      success: (res) => {
        wx.navigateTo({
            url: '/views/my/sub/order_comment_success',
        })
      },
      fail: (msg) => {
        wx.showToast({
          title: msg || '评论失败',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
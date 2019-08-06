// views/shop/promotion_content.js
// 推广内容

const app = getApp()

const regeneratorRuntime = global.regeneratorRuntime = require('../../libs/runtime')
const request = global.regeneratorRuntime = require('../../libs/kk/request.js')

const InfoPage = require('../../base/info_page.js')
InfoPage({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    saving: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.path = "/user/my_shop/spread"
    this.params = {
      id: app.goodInfo.id
    }
    this.success = function(info) {
      info.ad_imgs.forEach((item, i) => {
        that.data.imgs.push({
          img: item,
          id: i,
          isselect: 0
        })
      })
      that.setData({
        imgs: that.data.imgs
      })
    }
  },
  save(e) {
    this.setData({
      saving: 1
    })
    this.toogleImgs(1)
  },
  chooseImg(e) {
    if(!this.data.saving) return
    var tmpitem = e.currentTarget.dataset.item;
    this.data.imgs.forEach(item => {
      if (item.id == tmpitem.id) {
        item.isselect = !tmpitem.isselect
      }
    })
    this.setData({
      imgs: this.data.imgs
    })
  },
  cancel(e) {
    this.setData({
      saving: 0
    })
    this.toogleImgs(0)
  },
  toogleImgs(isselect){
    this.data.imgs.forEach(item => {
      item.isselect = isselect
    })
    this.setData({
      imgs: this.data.imgs
    })
  },
  showSaveStatusInfo(save_succ_count){
    if (save_succ_count == 0) {
      wx.showToast({
        title: '保存失败',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '保存成功',
        icon: 'none'
      })
    }
    this.cancel()
  },
  async save2Album(e) {
    var select_count = 0;
    var save_succ_count = 0;
    var save_total_count = 0
    for (var i = 0; i < this.data.imgs.length; i++) {
      var item = this.data.imgs[i]
      if (item.isselect) {
        var that = this
        var res = await request.downloadFile(item.img)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            save_succ_count++
            save_total_count++
            if (save_count == select_count){
              that.showSaveStatusInfo(save_succ_count)
            }
          },
          fail(){
            save_total_count++
            if (save_count == select_count) {
              that.showSaveStatusInfo(save_succ_count)
            }
          }
        })
        select_count++
      }
    }
    if (select_count == 0) {
      wx.showToast({
        title: '请至少选择一张图片',
        icon: 'none'
      })
    }
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
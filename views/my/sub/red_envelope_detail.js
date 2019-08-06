// views/my/sub/red_envelope_detail.js
// 兑换红包

const regeneratorRuntime = global.regeneratorRuntime = require('libs/runtime')
const app = getApp()

const InfoPage = require('base/info_page.js')

InfoPage({

  /**
   * 页面的初始数据
   */
  data: {
    time: {
      day: "00",
      hour: "00",
      minute: "00",
      second: "00",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.path = "/user/hongbao/getOneHongBao"
    this.params = {
      id: app.item.id
    }
    var total
    this.success = function(info) {
      total = info.diff_time
      var timeid = setInterval(() => {
        if (total <= 0) {
          clearInterval(timeid)
          return
        }
        var time = {}
        var day = parseInt(total / (3600 * 24))
        var hour = parseInt((total - 3600 * 24 * day) / 3600)
        var minute = parseInt((total - 3600 * 24 * day - hour * 3600) / 60)
        var seconds = parseInt((total - 3600 * 24 * day - hour * 3600 - minute * 60))
        time.day = day > 9 ? day : "0" + day
        time.hour = hour > 9 ? hour : "0" + hour
        time.minute = minute > 9 ? minute : "0" + minute
        time.second = seconds > 9 ? seconds : "0" + seconds
        that.setData({
          time: time
        })
        total -= 1
      }, 1000)
    }
  },
  back(e) {
    wx.navigateBack({

    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
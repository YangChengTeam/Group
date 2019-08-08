const app = getApp();

const regeneratorRuntime = global.regeneratorRuntime = require('../libs/runtime')
const request = require('../libs/kk/request.js')
const BasePage = require('./base_page.js')

var ListPage = function (obj) {
  obj.loadList = async function () {
    if (!this.path) return
    // 0  正在加载 2 加载完成
    if (this.data.status == 0 || this.data.status == 2) return

    this.setData({
      status: 0
    })

    var options = {}
    var params = {
      token: "1",
      page: this.page,
      p: this.page
    }
    if (this.params) {
      params = {
        ...params,
        ...this.params
      }
    }
    options.params = params
    options.path = this.path
    var that = this
    options.success = function (info) {
      that.loadend()
      var status = 1
      if (!info.list) {
        info.list = []
        status = 2
      }
      if (info.list.length < info.page_size) {
        status = 2
      } else {
        that.page++
        console.log(that.page)
      }
      var list = [...that.data.list, ...info.list]
      if (list.length == 0) {
        status = 3
      }
      that.setData({
        list: list,
        status: status
      })
      if (that.success) {
        that.success(info)
      }
      wx.stopPullDownRefresh()
    }
    options.fail = function () {
      that.setData({
        status: -1
      })
      if (that.fail) {
        that.fail(data)
      }
      wx.stopPullDownRefresh()
    }
    this.loading()
    that.request(options)
  }
  obj.loadData = function () {
    obj.loadList()
  }
  obj.refreshData = function () {
    this.page = 1
    this.data.status = -2
    this.data.list = []
    obj.loadList()
  }
  obj.list_onLoad = obj.onLoad || function () { };
  obj.onLoad = function () {
    obj = {
      ...obj,
      ...this
    } // 合并到子Page
    obj.list_onLoad()
    this.page = 1
    this.data.list = []
    obj.loadList()
  }
  BasePage(obj)
}

module.exports = ListPage
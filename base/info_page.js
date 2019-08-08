const app = getApp();

const regeneratorRuntime = global.regeneratorRuntime = require('../libs/runtime')
const request = require('../libs/kk/request.js')
const BasePage = require('./base_page.js')

var InfoPage = function (obj) {
  obj.loadInfo = async function () {
    if (!this.path) return

    var options = {}
    options.path = this.path
    var params = {
      token: "1"
    }
    if (this.params) {
      params = {
        ...params,
        ...this.params
      }
    }

    options.params = params
    var that = this

    options.success = function (info) {
      that.loadend()
      that.setData({
        info: info
      })
      if (that.success) {
        that.success(info)
      }
    }
    options.fail = function (msg) {
      if (that.fail) {
        that.fail(msg)
      }
    }
    this.loading()
    this.request(options, this.msg)
  }
  obj.loadData = function () {
    obj.loadInfo()
  }
  obj.refreshData = function () {
    obj.loadInfo()
  }

  obj.info_onLoad = obj.onLoad || function (optoins) { };
  obj.onLoad = function (optoins) {
    obj = {
      ...obj,
      ...this
    } // 合并到子Page
    obj.info_onLoad(optoins)
    this.data.info = {}

    obj.loadInfo()
  }
  BasePage(obj)
}

module.exports = InfoPage
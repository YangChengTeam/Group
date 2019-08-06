// 网络请求
var BASE_URL = "http://www.shop.m"
const wxpromise = require('wx-promise')

const get = function(url, data, headers) {
  url = BASE_URL + url
  return wxpromise.request({
    url: url,
    header: headers,
    data: data,
    method: 'GET'
  })
}

function uploadFile(url, filePath, data, headers) {
  url = BASE_URL + url
  return wxpromise.uploadFile({
    url: url,
    name: 'file',
    header: headers,
    filePath: filePath,
    formData: data,
    method: 'POST'
  })
}

function post(url, data, headers) {
  url = BASE_URL + url
  return wxpromise.request({
    url: url,
    header: headers,
    data: data,
    method: 'POST'
  })
}

function downloadFile(url) {
  return wxpromise.downloadFile({
    url: url
  })
}

module.exports = {
  get: get,
  post: post,
  uploadFile: uploadFile,
  downloadFile: downloadFile
}
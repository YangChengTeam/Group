function commonAdpater(map, list) {
  var dstList = []
  list.forEach(item => {
    var dstObj = {}
    Object.keys(map).forEach(key => {
      dstObj[key] = item[map[key]];
    })
    dstList.push(dstObj)
  })
  return dstList
}

function tabListAdpater(list) {
  return commonAdpater({
    "pagePath": "link",
    "text": "title",
    "iconPath": "ico"
  }, list)
}

function categoryListAdpater(list) {
  return commonAdpater({
    "name": "name",
    "pic": "img",
    "url": "path"
  }, list)
}



module.exports = {
  tabListAdpater
}
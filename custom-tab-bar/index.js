const app = getApp()

Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
    selected: {
      type: Number,
      value: 0
    },
    color: {
      type: Array,
      value: []
    },
    selectedColor: {
      type: Array,
      value: []
    },
    show: {
       type: Number,
       value: 0
    }
  },
  created() {

  },
  attached() {
    var index = -1    
    this.setData({
      ...this.properties,
      list: app.tabList
    })
   
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      if (this.properties.selected == data.index) return

      const path = data.path
      var isTabs = false
      for (let i = 0; i < app.TAB_BARS.length; i++) {
        let item = app.TAB_BARS[i]
        if (path.indexOf(item.pagePath) != -1) {
          isTabs = true
          break
        }
      }

      if (isTabs) {
        wx.switchTab({
          url: path,
        })
      } else {
        wx.redirectTo({
          url: path,
        })
      }

      this.setData({
         selected: data.index
      })
    }
  }
})
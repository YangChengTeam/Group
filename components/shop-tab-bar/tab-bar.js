// components/shop-tab-bar/tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: 0
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },
  attached() {
    let thiz = this
    thiz.setData({
      currentIndex: this.properties.index
    })
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    nav2index(e) {
      var index = e.currentTarget.dataset.index
      if (index == this.data.currentIndex) return

      if (index == 0) {
        wx.switchTab({
          url: '/views/home/index'
        })
      } else if (index == 1) {
        wx.redirectTo({
          url: '/views/shop/index',
        })
      } else if (index == 2) {
        wx.redirectTo({
          url: '/views/shop/search',
        })
      }
    },
  }
})
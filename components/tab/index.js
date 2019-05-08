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
    }
  },
  created(){
    
  },
  attached() {
      this.setData({
          ...this.properties
      })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      console.log(url)
      wx.redirectTo({
        url: url,
      })
      this.setData({
          selected: data.index
      })
    }
  }
})
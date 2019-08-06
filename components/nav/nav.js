// components/nav/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    delta: {
      type: Number,
      value: 1
    },
    isback: {
      type: Number,
      value: 0
    },
    back_confirm_msg: {
      type: String,
      value: ''
    },
    issearch: {
      type: Number,
      value: 0
    },
    back_icon_path: {
      type: String,
      value: '../../images/icon-leftjt.png'
    },
    title: {
      type: String,
      value: ''
    },
    color: {
      type: String,
      value: '#000'
    },
    background: {
      type: String,
      value: '#fff'
    },
    path: {
      type: String,
      value: ''
    },
    isnop: {
      type: Number,
      value: 0
    },
    opacity: {
      type: Float32Array,
      value: 1
    }
  },
  attached() {
    let thiz = this
    thiz.setData({
      ...thiz.properties
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    navigateBack(e) {
      var that = this
      if (this.properties.path) {
        wx.redirectTo({
          url: this.properties.path,
        })
      } else {
        if (this.properties.back_confirm_msg) {
          wx.showModal({
            title: '提示',
            content: this.properties.back_confirm_msg,
            success: (res) => {
              if (res.confirm) {
                wx.navigateBack({
                  delta: that.data.delta
                })
              }
            }
          })
          return
        }
        wx.navigateBack({

        })
      }
    }
  }
})
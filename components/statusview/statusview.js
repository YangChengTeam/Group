// components/statusview/statusview.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status: {
      type: Number,
      value: 0
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: -2
  },
  attached() {
    let thiz = this
    thiz.setData({
       ...this.properties
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
       
  }
})

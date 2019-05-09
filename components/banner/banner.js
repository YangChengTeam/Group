// components/banner/banner.js
// 团购首页轮播图

const BaseComponent = require('../../base/base_components.js')

BaseComponent({
  /**
   * 组件的属性列表
   */
  properties: {
     list: {
        type: Array,
        value: []
     }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  attached: function(){
      this.setData({
         ...this.properties
      })   
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

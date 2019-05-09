/**
 *  组件基类
 */

const BaseComponent = function(obj){
  
  /**
   *   基类组件方法
   */
  const methods = {
     nav2path: function(e){
         const path = e.currentTarget.dataset.path
         wx.navigateTo({
           url: path,
         })
     }
  }


  /**
   * 合并方法到子组件
   */
  obj.methods = {
    ...obj.methods, ...methods
  }

  Component(obj)
}

module.exports = BaseComponent
// pages/index/index.js
var common = require('../../utils/common.js')
const db = wx.cloud.database()
const combos = db.collection('combos')

var that = this

var row = 5 //每次读取的新闻数量
var page = 0 //当前是第几页

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comborollinglist:null
  },

  /**
   * 自定义函数-跳转新闻浏览页面
   */
  goToDetail: function(e) {
    //console.log(e.currentTarget.dataset.id)
    common.goToDetail(e.currentTarget.dataset.id)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    that.getComboRollingData()
    that.getComboListData()
  },
  getComboRollingData : function (){
    db.collection('picListDetails').where({
      typename: '套餐滚动图'
      })
      .get({
        success(res) {
          if (res.errMsg == "collection.get:ok") {
            that.setData({
              loadingState: 1,
              comborollinglist: res.data,
            })
            console.log(123)
            console.log(comborollinglist)
          } else {
            that.setData({
              loadingState: 3
            })
          }
        }
      })
  },

  getComboListData : function (){
    combos.limit(row).get({
      success: res => {
        console.log(res)
        this.setData({
          newsList: res.data
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // 翻下一页
    page++
    // 获取当前页面的新闻记录
    combos.skip(row * page).limit(row).get({
      success: res => {
        // 获取原有的新闻记录
        let old_data = this.data.newsList
        // 获取新页面的新闻记录
        let new_data = res.data
        // 更新首页新闻列表
        this.setData({
          newsList: old_data.concat(new_data)
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

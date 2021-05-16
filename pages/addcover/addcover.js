// pages/add/add.js
var app = getApp()

// 连接云数据集photos
const db = wx.cloud.database()
const photos = db.collection('photoTypes')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typename: '无'
  },

  /**
   * 自定义函数--上传图片
   */
  upload: function () { 
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // loading提示框表示正在上传图片
        wx.showLoading({
          title: '上传中',
        })

        // 获取图片临时地址
        const filePath = res.tempFilePaths[0]

        // 自定义云端的图片名称
        const cloudPath = Math.floor(Math.random() * 1000000) + filePath.match(/\.[^.]+?$/)[0]
        // 上传图片到云存储中
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            // 提示上传成功
            wx.showToast({
              title: '上传成功',
              duration: 3000
            })
            // 往云数据集photoTypes中更新一条记录
            console.log(this.data.typename)
            console.log(res.fileID)
            let sql = photos.where({typename:this.data.typename}).update({
              data: {
                coverurl: res.fileID
              },
              success: res => {
                console.log('success')
                console.log(res)
                console.log(e)
              },
              fail: e => {
                console.log(e)
              }
            }) //往云数据集photos中添加一条记录结束                                   
            console.log(sql)
            // 更新图片历史记录
            this.getHistoryPhotos()
          },
          fail: e => {
            console.log(e)
          }
        }) //上传图片到云存储中结束
      },
      fail: e => {
        console.log(e)
      },
      complete: () => {
        // 关闭loading提示框
        wx.hideLoading()
        // 更新图片历史记录
        this.getHistoryPhotos()
      }
    }) //选择图片API结束
  },

  /**
   * 自定义函数--获取已上传图片的历史记录
   */
  getHistoryPhotos: function () {
    // 从云数据集中查找当前用户的上传记录
    photos.where({
      typename: this.data.typename
    }).get({
      success: res => {
        this.setData({
          historyPhotos: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 尝试输出用户的个人信息
    // console.log(app.globalData.userInfo)

    // 尝试输出用户的openid
    // console.log(app.globalData.openid)

    // 更新图片历史记录
    var that = this;

    this.setData({
      typename: options.typename
    })
    this.getHistoryPhotos()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/my/my.js
const db = wx.cloud.database();
const shanuo = db.collection('user');
var app = getApp();
var userInfo;
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收藏新闻总数
    num: 0

  },

 
  getUserInfo: function (e) {
    if(!(null||undefined)){
      console.log("test")
    }
    if (!wx.getStorageSync('user')) {
      this.getUserProfile();
      return
    }else {
      // 成功后返回首页
      let info = wx.getStorageSync('user');
      this.setData({
        isLogin: true,
        src: info.avatarUrl,
        nickName: info.nickName
      })
      // 获取收藏列表
      this.getMyFavorites()
    }    
  },


  getUserProfile: function () {
    wx.getUserProfile({
      desc: "获取你的昵称、头像、地区及性别", // 不写不弹提示框
      success: res => {
        console.log('getUserProfile')
        console.log(res)
        console.log(res.userInfo)
        let info = res.userInfo;
        wx.cloud.callFunction({
          name: 'getOpenid',
          complete: res => {
            // 尝试打印用户的openid，看是否获取成功
            console.log('getOpenid')
            console.log(res.result.openid)
            let openid = res.result.openid;
            shanuo.where({
                _openid: openid,
              })
              .get().then(ress => {
                console.log('ressressressressressressressress', ress.data[0])
                //如果没有查到 就添加
                if (ress.data.length == 0) {
                  shanuo.add({
                    data: info,
                    success: res => {
                    },
                    fail: err => {
                      console.log('err')
                      console.log(err)
                      // 失败提示
                      wx.showToast({
                        title: '保存失败',
                      })
                    }
                  })
                }
                //不论添加成功没有，都设置本地缓存，设置页面值
                wx.setStorageSync('user', ress.data[0]);
                // 成功后返回首页
                this.setData({
                  isLogin: true,
                  src: info.avatarUrl,
                  nickName: info.nickName
                })
                // 获取收藏列表
                this.getMyFavorites()
              })
          },
          fail(res) {
            console.log('登录失败', res)
          }
        })
      },
      fail: res => {
        //拒绝授权
        console.log("您拒绝了授权")
        console.log(res);
        wx.showToast({
          title: '您拒绝了授权',
          icon: 'none'
        })
        return;
      }
    })
  },

  /**
   * 自定义函数--获取收藏列表
   */
  getMyFavorites: function () {
    // 读取本地缓存信息
    let info = wx.getStorageInfoSync()
    // 获取全部的key信息
    let keys = info.keys 

    // 获取新闻总数量
    let num = 0

    let myList = []
    for (var i = 0; i < keys.length; i++) {
      let obj = wx.getStorageSync(keys[i])
      console.log(obj.title)
      console.log(obj.title!=undefined)
      if(obj.title!=undefined){
        myList.push(obj)
        num++
      }
    }

    // 更新新闻列表
    this.setData({
      newsList: myList,
      num: num
    })


  },

  /**
   * 自定义函数--跳转新页面浏览新闻内容
   */
  goToDetail: function (e) {
    // 获取新闻id
    let id = e.currentTarget.dataset.id

    // 跳转新页面
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 如果已经登录
    if (this.data.isLogin) {
      // 更新收藏列表
      this.getMyFavorites()
    }

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
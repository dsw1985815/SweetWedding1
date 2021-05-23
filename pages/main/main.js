//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg_img: undefined,
    btn_txt: '  咨询微信客服  ',
    btbTop: 10,
    call : '../../static/images/call.jpg',
    lat: 40.661232,
    lon: 109.823256,
    guest: [
      {
        avatar: '/static/images/avatar/avatar2.jpg',
        name: '老板娘',
        phoneNumber: '13030477967'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  /**
 * 查看位置
 */
  showGuide: function () {
    var that = this
    wx.openLocation({
      latitude: that.data.lat,
      longitude: that.data.lon,
    })
  },
  call: function (e) {
   
    wx.makePhoneCall({
      phoneNumber: '13030477967',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //this.getSysconfig()  
  },
  getSysconfig(){
    const _this = this
    wx.request({
      url: `https://api.it120.cc/${CONFIG.subDomain}/config/values`,
      method: 'get',
      data: {
        keys: 'mallName,btbTop,bg_img,btn_txt'
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        const data = request.data
        const _d = {}
        if (data.code == 0) {
          data.data.forEach(ele => {
            if (ele.key == 'mallName'){
              wx.setNavigationBarTitle({
                title: ele.value
              })
            }
            _d[ele.key] = ele.value
          })
        }
        _this.setData(_d)
      },
      fail(error) {
        console.error(error)
      },
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
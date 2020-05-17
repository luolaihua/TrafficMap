// miniprogram/pages/map/map.js
const myApi = require('../../utils/myApi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setting: {
      scale: 14,
      skew: 0,
      rotate: 0,
      showLocation: true,
      showScale: true,
      subKey: '',
      layerStyle: -1,
      enableZoom: true,
      enableScroll: true,
      enableRotate: true,
      showCompass: false,
      enable3D: false,
      enableOverlooking: false,
      enableSatellite: false,
      enableTraffic: false,
    },
    longitude: 120.28827667236328,
    latitude: 31.914357509494074,
    markers: [{
      id: 111,
      longitude: 120.29454,
      latitude: 31.90735,
      callout: {
        content: '点位1',
        padding: 8,
        display: 'ALWAYS',
        fontSize: 12,
        textAlign: 'center',
        borderRadius: 10,
        anchorY: -15
      },
      iconPath: '../../images/Marker1.png',
      width: '34px',
      height: '34px',
      rotate: 0,
      alpha: 1
    }, {
      id: 222,
      longitude: 120.28432,
      latitude: 31.91919,
      callout: {
        content: '点位2',
        padding: 8,
        display: 'ALWAYS',
        fontSize: 12,
        textAlign: 'center',
        borderRadius: 10,
        anchorY: -15
      },
      iconPath: '../../images/Marker2.png',
      width: '34px',
      height: '34px',
      rotate: 0,
      alpha: 1
    }],
    polyline: [{
      points: [{
        longitude: 120.28432,
        latitude: 31.91919,
      },{
        longitude: 120.29454,
        latitude: 31.90735,
      }],
      color: "#4169E1",
      width: 4,
      dottedLine: true
    }],
    lon:'',
    lat:''

  },
  //点击地图maker
  onMarkerTap: function (event) {
    console.log(event)
    var id = event.markerId


    wx.navigateTo({
      url: '../chartsData/chartsData?id='+id
    })
  },
  tapMap(e){
    //console.log(e)
    this.setData({
      lon:e.detail.longitude,
      lat:e.detail.latitude
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
    setTimeout(() => {
      var dataNameList = ['position1', 'position2']
      var weekList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      if (wx.getStorageSync('position1' + '_week') == '') {
        myApi.getCloudData('position1', 'week', '')
      }
      if (wx.getStorageSync('position2' + '_week') == '') {
        myApi.getCloudData('position2', 'week', '')
      }
      dataNameList.forEach(item => {
        weekList.forEach(item2 => {
          if (wx.getStorageSync(item + '_day_' + item2) == '') {
            try {
               myApi.getCloudData(item, 'day', item2)
            } catch (error) {
              console.log(error)
            }
           
          }
        })
      });
    }, 10000);
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
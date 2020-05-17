//app.js
const myApi = require('./utils/myApi')
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'skyrim-traffic-map-gxuc6',
        traceUser: true,
      })
    }
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

  },
  onShow:function(){
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
    }, 6000);
  }
})
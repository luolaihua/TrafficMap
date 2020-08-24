//index.js
import * as echarts from '../../components/ec-canvas/echarts';
const myApi = require('../../utils/myApi')
const app = getApp()
let chart = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    /*     title: {
          text: '某点一周各类车型流量',
          left: 'center'
        }, */
    legend: {
      data: ['sm_car', 's_truck', 'b_car', 'm_truck', 'b_truck', 'sb_truck', 'box_truck']
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      confine: true
    },
    grid: {
      containLabel: true
    },
    /*     dataset: {
          // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
          // 如果不指定 dimensions，也可以通过指定 series.encode 完成映射，参见后文。
          //dimensions: ['_id', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          source: [{
              _id: 'Mon',
              'b_car': 431.3,
              'b_truck': 851.8,
              'box_truck': 923.7,
              's_truck': 875.8,
              'sb_truck': 893.7,
              'sm_car': 785.8,
              'm_truck': 123
            },
            {
              _id: 'Tue',
              'b_car': 434.3,
              'b_truck': 855.8,
              'box_truck': 293.7,
              's_truck': 825.8,
              'sb_truck': 913.7,
              'sm_car': 485.8,
              'm_truck': 123
            },
            {
              _id: 'Wed',
              'b_car': 473.3,
              'b_truck': 853.8,
              'box_truck': 893.7,
              's_truck': 853.8,
              'sb_truck': 983.7,
              'sm_car': 835.8,
              'm_truck': 123
            },
            {
              _id: 'Thu',
              'b_car': 483.3,
              'b_truck': 885.8,
              'box_truck': 693.7,
              's_truck': 885.8,
              'sb_truck': 893.7,
              'sm_car': 885.8,
              'm_truck': 123
            },
            {
              _id: 'Fri',
              'b_car': 743.3,
              'b_truck': 785.8,
              'box_truck': 793.7,
              's_truck': 857.8,
              'sb_truck': 973.7,
              'sm_car': 585.8,
              'm_truck': 123
            },
            {
              _id: 'Sat',
              'b_car': 643.3,
              'b_truck': 185.8,
              'box_truck': 293.7,
              's_truck': 815.8,
              'sb_truck': 923.7,
              'sm_car': 285.8,
              'm_truck': 123
            },
            {
              _id: 'Sun',
              'b_car': 413.3,
              'b_truck': 815.8,
              'box_truck': 913.7,
              's_truck': 885.8,
              'sb_truck': 913.7,
              'sm_car': 185.8,
              'm_truck': 123
            }
          ]
        }, */
    /*     dataZoom: [{
            type: 'slider',
            show: true,
            start: 1,
            end: 35
          },
          {
            type: 'inside',
            start: 1,
            end: 35
          }
        ], */
    xAxis: {
      type: 'category'
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
        smooth: true,
        type: 'line'
      },
      {
        smooth: true,
        type: 'line'
      },
      {
        smooth: true,
        type: 'line'
      },
      {
        smooth: true,
        type: 'line'
      },
      {
        smooth: true,
        type: 'line'
      },
      {
        smooth: true,
        type: 'line'
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

function setOption(chart) {
  const option = {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [{
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666'
      }
    }],
    yAxis: [{
      type: 'category',
      axisTick: {
        show: false
      },
      data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666'
      }
    }],
    series: [{
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310],
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220],
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },
      {
        name: '负面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110],
        itemStyle: {
          // emphasis: {
          //   color: '#67e0e3'
          // }
        }
      }
    ]
  };
  chart.setOption(option);
}
const line = {
  series: [{
      smooth: true,
      type: 'line'
    },
    {
      smooth: true,
      type: 'line'
    },
    {
      smooth: true,
      type: 'line'
    },
    {
      smooth: true,
      type: 'line'
    },
    {
      smooth: true,
      type: 'line'
    },
    {
      smooth: true,
      type: 'line'
    },
    {
      smooth: true,
      type: 'line'
    }
  ]
}
const bar = {
  series: [{
      type: 'bar'
    },
    {
      type: 'bar'
    },
    {
      type: 'bar'
    },
    {
      type: 'bar'
    },
    {
      type: 'bar'
    },
    {
      type: 'bar'
    },
    {
      type: 'bar'
    }
  ]
}

Page({
  data: {
    precisionList: ['5mins', '10mins', '20mins', '40mins', '80mins', '160mins'],
    dayList: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    defaultDay: 0,
    defaultPrecision: 0,
    ec: {
      lazyLoad: true
    },
    isBar: false,
    isShowDayData: false,
    isShowWeekData: false,
  },
  /**
   * 288*1=144*2=72*4=36*8=18*16=9*32
   * @param {*} e 
   */
  choosePrecision(e) {
    wx.showLoading({
      title: '加载中',
    });
    var precision = Math.pow(2, Number(e.detail.value))
    console.log(precision)
    //选择的条目变
    if (e.detail.value != this.data.defaultPrecision) {
      var dayDataList = this.data.dayData
      var newDayList = []
      if (precision == 1) {
        newDayList = dayDataList
      } else {
        var k=1
        newDayList.push(dayDataList[0])
        for (let i = 1; i < dayDataList.length; i += precision) {
      
          var sumList = []
          for (let j = 0; j < dayDataList[0].length; j++) {
            if (j == 0) {
              sumList.push(k *precision)
            } else {
              var sum= dayDataList[i][j]
              for (let m = 1; m < precision; m++) {            
                sum = sum + dayDataList[i + m][j]
              }
              sumList.push(sum)
            }

          }
          k++
          newDayList.push(sumList)
        }
      }
      //console.log(newDayList)
      newDayList= this.proDayData(newDayList)
      this.chart_day.setOption({
        dataset: {
          source: newDayList
        }
      })

      this.setData({
        defaultPrecision: e.detail.value
      }, () => {
        wx.hideLoading()
      })
    } else {
      wx.hideLoading()
    }

  },
  async chooseDay(e) {
    wx.showLoading({
      title: '加载中',
    });
    var index = e.detail.value
    if (index != this.data.defaultDay) {
      console.log(index)
      var data2 = wx.getStorageSync('position' + this.data.id + '_day_' + this.data.dayList[index])
      if (data2 == '') {
        data2 = await myApi.getCloudData('position' + this.data.id, 'day', this.data.dayList[index])
        console.log(data2)
      }
      this.data.dayData = data2
      data2= this.proDayData(data2)
      this.chart_day.setOption({
        dataset: {
          source: data2
        }
      });
      this.setData({
        defaultPrecision: 0,
        defaultDay: e.detail.value
      }, () => {
        wx.hideLoading()
      })
    } else {
      wx.hideLoading()
    }

  },
  // 点击按钮后初始化图表
  initWeekData: function (option) {
    this.ecComponent_week.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      chart.setOption(option);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart_week = chart;

      this.setData({
        isShowWeekData: true
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  // 点击按钮后初始化图表
  initDayData: function (option) {
    this.ecComponent_day.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart2 = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      chart2.setOption(option);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart_day = chart2;

      this.setData({
        isShowDayData: true
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart2;
    });
  },
  changeStyle() {
    if (this.data.isBar) {
      this.chart_week.setOption(line);
      this.chart_day.setOption(line);
    } else {
      this.chart_week.setOption(bar);
      this.chart_day.setOption(bar);
    }
    this.setData({
      isBar: !this.data.isBar
    })

  },
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    });
    var that = this
    //console.log(options)
    if (options.id == undefined || options.id == '') {
      this.data.id = '1'
    } else {
      this.data.id = options.id
    }
    wx.setNavigationBarTitle({
      title: '点位' + this.data.id + "车流量",
    })
  },
  async onReady() {
    var that = this
    // 获取组件
    this.ecComponent_week = this.selectComponent('#mychart-week');
    this.ecComponent_day = this.selectComponent('#mychart-day');
/*     if (this.data.id == '1') {
      var data1 = wx.getStorageSync('position1_week')
      var data2 = wx.getStorageSync('position1_day_Mon')
    } else {
      var data1 = wx.getStorageSync('position2_week')
      var data2 = wx.getStorageSync('position2_day_Mon')
    } */
    var data1 = wx.getStorageSync('position'+this.data.id+'_week')
    var data2 = wx.getStorageSync('position'+this.data.id+'_day_Mon')
    if (data1 == '') {
      data1 = await myApi.getCloudData('position' + this.data.id, 'week', '')
      console.log(data1)
    }
    if (data2 == '') {
      data2 = await myApi.getCloudData('position' + this.data.id, 'day', 'Mon')
      console.log(data2)
    }
    this.data.dayData = data2
   data2= this.proDayData(data2)
    var initOption1 = {
      legend: {
        // data: ['sm_car', 's_truck', 'b_car', 'm_truck', 'b_truck', 'sb_truck', 'box_truck']
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        confine: true
      },
      grid: {
        containLabel: true
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      dataZoom: [{
          type: 'slider',
          show: true
        },
        {
          type: 'inside'
        }
      ],
      series: [{

          smooth: true,
          type: 'line'
        },
        {

          smooth: true,
          type: 'line'
        },
        {

          smooth: true,
          type: 'line'
        },
        {

          smooth: true,
          type: 'line'
        },
        {

          smooth: true,
          type: 'line'
        },
        {

          smooth: true,
          type: 'line'
        },
        {

          smooth: true,
          type: 'line'
        }
      ],
      dataset: {
        source: data1
      }
    };
    var initOption2 = {
      legend: {
        // data: ['sm_car', 's_truck', 'b_car', 'm_truck', 'b_truck', 'sb_truck', 'box_truck']
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        confine: true
      },
      grid: {
        containLabel: true
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      dataZoom: [{
          type: 'slider',
          show: true,
          start: 1,
          end: 30
        },
        {
          type: 'inside',
          start: 1,
          end: 30
        }
      ],
      series: [{

          smooth: true,
          type: 'line'
        },{

          smooth: true,
          type: 'line'
        },
        {

          smooth: true,
          type: 'line'
        },
        {

          smooth: true,
          type: 'line'
        },
        {

          smooth: true,
          type: 'line'
        },
        {

          smooth: true,
          type: 'line'
        },
        {

          smooth: true,
          type: 'line'
        }
      ],
      dataset: {
        source: data2
      }
    };
    that.initWeekData(initOption1)
    that.initDayData(initOption2)

    wx.hideLoading();
  },
  proDayData(data){
    /**
     * 时间编号1-288转到24进制时间
     * @param {*时间编号} num 
     */
    function num2Date(num){
     var totalMins = num*5
     var hours =parseInt(totalMins/60) 
     var mins = totalMins%60

     hours = (hours<10?'0'+hours:hours)
     mins = (mins<10?'0'+mins:mins)
      return hours+':'+mins

    }
    for (let index = 1; index < data.length; index++) {
      //data[index][0]=data[index][0]
      data[index][0] =  num2Date(data[index][0])
    }
    return data
  },
  save() {
    const ecComponent = this.selectComponent('#mychart-dom-bar');

    // 先保存图片到临时的本地文件，然后存入系统相册
    ecComponent.canvasToTempFilePath({
      success: res => {
        console.log("tempFilePath:", res.tempFilePath)

        // 存入系统相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath || '',
          success: res => {
            console.log("success", res)
          },
          fail: res => {
            console.log("fail", res)
          }
        })
      },
      fail: res => console.log(res)
    });
  },
  start(e) {
    this.setData({
      startTime: e.timeStamp
    })
    // console.log(e)
  },
  end(e) {
    if (e.timeStamp - this.data.startTime > 1000) {
      this.save()
    }
  }
});
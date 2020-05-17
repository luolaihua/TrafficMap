//index.js
import * as echarts from '../../components/ec-canvas/echarts';
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

Page({

  data: {
    ec: {
      lazyLoad: true
    },
    isBar: false,
    isLoaded: false,
    isDisposed: false
  },
  // 点击按钮后初始化图表
  init: function (option) {
    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      });
      chart.setOption(option);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  changeStyle() {
    if (this.data.isBar) {
      this.chart.setOption({
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
      });
    } else {
      this.chart.setOption({
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
          }
        ]
      });
    }
    this.setData({
      isBar: !this.data.isBar
    })

  },
  onLoad(options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    console.log(options)
    this.data.id = options.id
    var title = '一周车流量'
    if (options.id == '111') {
      title = '点位1' 
    } else {
      title = '点位2' 
    }
    wx.setNavigationBarTitle({
      title: title,
    })
  },
  onReady() {
    var that = this
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    setTimeout(function () {
      wx.cloud.callFunction({
          // 云函数名称
          name: 'dataPro',
          // 传给云函数的参数
          data: {
            id: that.data.id
          },
        })
        .then(res => {
          console.log(res.result)
          if (res.result.length != 0) {
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
                  end: 10
                },
                {
                  type: 'inside',
                  start: 1,
                  end: 10
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
                }
              ],
              dataset: {
                source: res.result
              }
            };
            that.init(option)
          }
          wx.hideLoading({
            complete: (res) => {},
          })
        })
        .catch(console.error)

    }, 500);
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
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
    legend: {
      data: ['sm_car', 's_truck', 'b_car', 'm_truck', 'b_truck', 'sb_truck', 'box_truck']
    },
    tooltip: {},
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
    yAxis: {},
    series: [{
        type: 'line'
      },
      {
        type: 'line'
      },
      {
        type: 'line'
      },
      {
        type: 'line'
      },
      {
        type: 'line'
      },
      {
        type: 'line'
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

Page({

  data: {
    ec: {
      onInit: initChart
    },
    isBar:false
  },
changeStyle(){
  if(this.data.isBar){
    chart.setOption({
      series: [{
        type: 'line'
      },
      {
        type: 'line'
      },
      {
        type: 'line'
      },
      {
        type: 'line'
      },
      {
        type: 'line'
      },
      {
        type: 'line'
      }
    ]
    });
  }else{
      chart.setOption({
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
    isBar:!this.data.isBar
  })

},
onLoad(options){
   wx.cloud.callFunction({
    // 云函数名称
    name: 'dataPro',
    // 传给云函数的参数
    data: {
      a: 1,
      b: 2,
    },
  })
  .then(res => {
    console.log(res.result) 
    if(res.result.length!=0){
      chart.setOption({
        dataset:{
          source:res.result
        }
      })
    }
  })
  .catch(console.error) 
},
  onReady() {
    var that = this
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
      /*       const ecComponent = that.selectComponent('#mychart-dom-bar');

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
            }); */
    }, 4000);
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
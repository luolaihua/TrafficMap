// 云函数入口文件
const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
  env: 'skyrim-traffic-map-gxuc6'
})

const db = cloud.database()
const $ = db.command.aggregate
const MAX_LIMIT = 100
const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //点位1还是点位2
  var position = event.position
  //请求周数据还是日数据
  var requestDataType = event.requestDataType
  //请求哪一天的数据
  var whichDay = event.whichDay
  //默认情况
  if (position != 'position1'&&position != 'position2') {
    position = 'position2'
    requestDataType='day'
    whichDay = 'Fri'
  }
  var SUM = [],sumList = []
  switch (requestDataType) {
    case 'week':
      for (let index = 0; index < WEEK.length; index++) {
        SUM.push(getDataSum(WEEK[index], 'week',position))
      }
      var res = await Promise.all(SUM)
      //console.log(res)
      res.forEach((item, index) => {
        sumList.push(item.list[0])
      })
      break;
      case 'day':
        for (let i = 0; i < 15; i++) {
          var tasks = []
          for (let index = i*20+1; index < (i+1)*20+1; index++) {
            if(index>288){
              break
            }
            tasks.push(getDataSum(whichDay, index,position))
          }
          var res1 = await Promise.all(tasks)
          //console.log('res1', res1)
          res1.forEach((item, index) => {
            sumList.push(item.list[0])
          })      
        }
    default:
      break;
  }
  console.log(sumList)
  return sumList
}
    /**
     * 通过周几加时间编号就能确定时间段
     * @param {*周几} week 
     * @param {*时间编号} time_num 
     */
function getDataSum(week, time_num,position) {
  var matchData = {},id = ''
  matchData.week = week
  if(time_num=='week'){
    id=week
  }else{
    id=time_num
    matchData.time_num = time_num
  }
  return db.collection(position)
    .aggregate()
    .match(matchData)
    .group({
      _id: id,
      sm_car: $.sum('$sm_car'),
      s_truck: $.sum('$s_truck'),
      b_car: $.sum('$b_car'),
      m_truck: $.sum('$m_truck'),
      b_truck: $.sum('$b_truck'),
      sb_truck: $.sum('$sb_truck'),
      box_truck: $.sum('$box_truck')
    })
    .end()
}
/*     for (let index = 1; index < 20; index++) {
      SUM1.push(getDataSum('Tue', index))
    }
    var res1 = await Promise.all(SUM1)
    //console.log('res1', res1)
    res1.forEach((item, index) => {
      sumList.push(item.list[0])
    }) */

/*             //分三次取，第2次
          for (let index = 100; index < 200; index++) {
            SUM2.push(getDataSum('Tue', index))
          }
          var res2 = await Promise.all(SUM2)
          //console.log('res2'+WEEK[i], res2)
          res2.forEach((item, index) => {
            sumList.push(item.list[0])
          })
                  //分三次取，第3次
          for (let index = 200; index < 289; index++) {
            SUM3.push(getDataSum('Tue', index))
          }
          var res3 = await Promise.all(SUM3)
          //console.log('res2'+WEEK[i], res2)
          res3.forEach((item, index) => {
            sumList.push(item.list[0])
          })  */


  /*   function getDataSum(week,time_num){
      return db.collection(position)
      .aggregate()
      .match({
        week: week,
        time_num:time_num
      })
      .group({
        _id: time_num,
        sm_car: $.sum('$sm_car'),
        s_truck: $.sum('$s_truck'),
        b_car: $.sum('$b_car'),
        m_truck: $.sum('$m_truck'),
        b_truck: $.sum('$b_truck'),
        sb_truck: $.sum('$sb_truck'),
        box_truck: $.sum('$box_truck')
      })
      .end()
    }
    for (let index = 0; index < WEEK.length; index++) {
      
      
    }
    var undefinedList=[]
    for (let index = 1; index < 100; index++) {
      SUM.push(getDataSum("Tue",index))
    }
    var res = await Promise.all(SUM)
    console.log('res1',res)
    res.forEach((item, index) => {
      sumList.push(item.list[0])
    })
    for (let index = 100; index < 289; index++) {
      SUM2.push(getDataSum("Tue",index))
    }
    var res2 = await Promise.all(SUM2)
     console.log('res2',res2)
     res2.forEach((item, index) => {
      sumList.push(item.list[0])
    })
    console.log(sumList)
    sumList.forEach((item, index)=>{
      if(item==undefined){
        undefinedList.push(index+1)
       // console.log('position1-Tue-undefined:',index+1)
      }
    })
    console.log('position1-Tue-undefinedList:',undefinedList)

    return sumList  */

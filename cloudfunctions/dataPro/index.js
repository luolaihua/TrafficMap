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
  var position = 'position1'
  var id = event.id
  if (id == '222') {
    position = 'position2'
  }
  // 先取出集合记录总数
  const countResult = await db.collection(position).count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  var SUM = [],
    sumList = [],
    sumList2 = []
  if (true) {
    for (let index = 1; index < 100; index++) {

      const promise = db.collection(position)
        .aggregate()
        .match({
          week: "Mon",
          time_num:index
        })
        .group({
          _id: index,
          sm_car: $.sum('$sm_car'),
          s_truck: $.sum('$s_truck'),
          b_car: $.sum('$b_car'),
          m_truck: $.sum('$m_truck'),
          b_truck: $.sum('$b_truck'),
          sb_truck: $.sum('$sb_truck'),
          box_truck: $.sum('$box_truck')
        })
        .end()
      SUM.push(promise)
    }
    var res = await Promise.all(SUM)
    console.log('res1',res)
    res.forEach((item, index) => {
      sumList.push(item.list[0])
    })

    var SUM2 = []
    for (let index = 100; index < 289; index++) {

      const promise = db.collection(position)
        .aggregate()
        .match({
          week: "Mon",
          time_num:index
        })
        .group({
          _id: index,
          sm_car: $.sum('$sm_car'),
          s_truck: $.sum('$s_truck'),
          b_car: $.sum('$b_car'),
          m_truck: $.sum('$m_truck'),
          b_truck: $.sum('$b_truck'),
          sb_truck: $.sum('$sb_truck'),
          box_truck: $.sum('$box_truck')
        })
        .end()
      SUM2.push(promise)
    }
    var res2 = await Promise.all(SUM2)
     console.log('res2',res2)
     res2.forEach((item, index) => {
      sumList.push(item.list[0])
    })
    console.log(sumList)
    return sumList 
  } else {
    for (let index = 0; index < WEEK.length; index++) {

      const promise = db.collection(position)
        .aggregate()
        .match({
          week: WEEK[index]
        })
        .group({
          _id: WEEK[index],
          sm_car: $.sum('$sm_car'),
          s_truck: $.sum('$s_truck'),
          b_car: $.sum('$b_car'),
          m_truck: $.sum('$m_truck'),
          b_truck: $.sum('$b_truck'),
          sb_truck: $.sum('$sb_truck'),
          box_truck: $.sum('$box_truck')
        })
        .end()
      SUM.push(promise)
    }
    var res = await Promise.all(SUM)
    // console.log(res)
    res.forEach((item, index) => {
      sumList.push(item.list[0])
    })
    console.log(sumList)
    return sumList
  }


  // 承载所有读操作的 promise 的数组

  /*   const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      //get()操作返回的是Promise对象，每获取一个Promise就压栈进入tasks数组
      const promise = db.collection('position1').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promise)
    }
    console.log(tasks)
    console.log(await Promise.all(tasks)) */
  // 等待所有
  /* Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
   在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组。
   在这里，返回的数组的元素就是res.data
   数组reduce操作：array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
   total  必需。初始值, 或者计算结束后的返回值。
   currentValue  必需。当前元素
   currentIndex  可选。当前元素的索引
   arr  可选。当前元素所属的数组对象。
   initialValue  可选。传递给函数的初始值
   **此处acc为初始值，cur为当前元素
   concat() 方法用于连接两个或多个数组
  */

  /*   return {
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
    } */
}
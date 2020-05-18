/**
 * 
 * @param {*点位:position1,position2} position 
 * @param {*week或者day} requestDataType 
 * @param {*星期几} whichDay 
 */
async function getCloudData(position, requestDataType, whichDay) {
    var res = await wx.cloud.callFunction({
        name: 'dataPro',
        data: {
            position: position,
            requestDataType: requestDataType,
            whichDay: whichDay
        },
    })
    //console.log(res.result)
    //processCloudData(res.result,requestDataType)
    if (res.result.length != 0) {
        var key = position + '_' + requestDataType
        if (whichDay != '') {
            key += '_' + whichDay
        }
        var dataPro = processCloudData(res.result, requestDataType)
        wx.setStorageSync(key, dataPro);

        return dataPro
    }
}

function processCloudData(res, requestDataType) {

    var initDataList = [
            ['_id']
            ['sm_car'],
            ['s_truck'],
            ['b_car'],
            ['m_truck'],
            ['b_truck'],
            ['sb_truck'],
            ['box_truck']
        ],
        idList = ['_id'],
        sm_carList = ['sm_car'],
        s_truckList = ['s_truck'],
        b_carList = ['b_car'],
        m_truckList = ['m_truck'],
        b_truckList = ['b_truck'],
        sb_truckList = ['sb_truck'],
        box_truckList = ['box_truck']

    //initDataList[0] = ['_id', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    res.forEach(element => {
        idList.push(element._id)
        sm_carList.push(element.sm_car)
        s_truckList.push(element.s_truck)
        b_carList.push(element.b_car)
        m_truckList.push(element.m_truck)
        b_truckList.push(element.b_truck)
        sb_truckList.push(element.sb_truck)
        box_truckList.push(element.box_truck)
    });
    initDataList[0] = idList
    initDataList[1] = sm_carList
    initDataList[2] = s_truckList
    initDataList[3] = b_carList
    initDataList[4] = m_truckList
    initDataList[5] = b_truckList
    initDataList[6] = sb_truckList
    initDataList[7] = box_truckList
    
    //数组转置
    //定义一个新的数组
    var arr_new = [];
    //初始化，定下有多少行
    for (var i = 0; i < initDataList[0].length; i++) {
        arr_new[i] = [];
    }
    //遍历旧数组
    for (var  i = 0; i < initDataList.length; i++) //控制有几个元素
    {
        for (var j = 0; j < initDataList[i].length; j++) //遍历每一个具体的值
        {
            arr_new[j][i] = initDataList[i][j];
        }
    }
    // console.log(arr_new)
    // console.log(initDataList)
    return arr_new
}

function checkCloudData() {
    var dataNameList = ['position1', 'position2']
    var weekList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    if (wx.getStorageSync('position1' + '_week') == '') {
        getCloudData('position1', 'week', '')
    }
    if (wx.getStorageSync('position2' + '_week') == '') {
        getCloudData('position2', 'week', '')
    }
    dataNameList.forEach(item => {
        weekList.forEach(item2 => {
            if (wx.getStorageSync(item + '_day_' + item2) == '') {
                try {
                    getCloudData(item, 'day', item2)
                } catch (error) {
                    console.log(error)
                }
            }
        })
    });
}
module.exports = {
    getCloudData,
    processCloudData,
    checkCloudData
}
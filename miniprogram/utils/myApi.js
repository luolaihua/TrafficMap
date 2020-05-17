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
        var dataPro = processCloudData(res.result,requestDataType)
        wx.setStorageSync(key, dataPro);
       
        return dataPro
    }
}

function processCloudData(res, requestDataType) {
    //console.log('66666666666666666666666')
    var initDataList = [
        ['_id']
        ['sm_car'],
        ['s_truck'],
        ['b_car'],
        ['m_truck'],
        ['b_truck'],
        ['sb_truck'],
        ['box_truck']
    ],idList=['_id'],sm_carList=['sm_car'],s_truckList=['s_truck'],b_carList=['b_car'],m_truckList=['m_truck'],b_truckList=['b_truck'],
    sb_truckList=['sb_truck'],box_truckList=['box_truck']

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
    return initDataList
}

module.exports = {
    getCloudData,
    processCloudData
}
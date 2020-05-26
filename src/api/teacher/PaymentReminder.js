import request from '@/utils/request'

// 缴费提醒--历史记录
export function PaymentHistory(date,query) {
    return request({
        url: '/api/mobile/feeReminder/history',
        method: 'get',
        params:{
            date,query
        }
    })

}// 缴费提醒
export function PaymentReminder() {
    return request({
        url: '/api/mobile/feeReminder',
        method: 'get',
    })
}

// 提交学生缴费时间
export function SetFeeTime(stuId,date) {
    return request({
        url: '/api/mobile/feeReminder',
        method: 'post',
        data:{
            stuId,date
        }
    })
}

// 缴费提醒-学生缴费详情记录
export function SearchStuFee(stuId,startDate,endDate) {
    return request({
        url: '/api/mobile/feeReminder/student/details',
        method: 'get',
        params:{
            stuId,startDate,endDate
        }
    })
}

// 缴费提醒-提交缴费提醒的设置
export function ReminderDays( isNotice,advanceDay) {
    return request({
        url: '/api/mobile/feeReminder/config',
        method: 'post',
        params:{
            isNotice,advanceDay
        }
    })
}

// 缴费提醒-获取提醒设置天数
export function GetSetDays() {
    return request({
        url: '/api/mobile/feeReminder/config',
        method: 'get',
    })
}


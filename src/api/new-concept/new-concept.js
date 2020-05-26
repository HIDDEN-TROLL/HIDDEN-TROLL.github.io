import request from '@/utils/request'

//人数报表
export function Populationreport(agent,area,brand,school) {
    return request({
        url: '/api/mobile/newConceptRole/numberPeopleReport',
        method: 'get',
        params:{agent,area,brand,school}
    })
}
// 收费报表
export function FeeReport(data) {
    return request({
        url: '/api/mobile/newConceptRole/financeReport',
        method: 'get',
        params:data
    })
}

// 数据统计
export function Statistics(schoolId,year,month,day) {
    return request({
        url: '/api/mobile/newConceptRole/'+ schoolId +'/dataStatistics/'+ year +'/'+ month +'/'+ day +'/',
        method: 'get',
        params:{
            year,month,day
        }
    })
}

// 数据统计（折线图数据）
export function BrokenlineDiagram(schoolId,type,year,month) {
    return request({
        url: '/api/mobile/newConceptRole/'+ schoolId +'/dataStatistics/'+ type +'/chart/'+ year +'/'+ month +'/',
        method: 'get',
        params:{
            year,month
        }
    })
}

// 获取所有学校（全部机构）/获取机构编号
export function GetStudId() {
    return request({
        url: 'api/common/misc/school/all_school',
        method: 'get',
    })
}


//

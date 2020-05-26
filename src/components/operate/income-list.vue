<template>
    <div>
        <div>
            <van-nav-bar
                    title="今日收入统计"
                    left-text="搜索机构"
                    right-text="其他日期"
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
            />
        </div>

        <div class="date_title">{{startDate}} 至 {{endDate}}</div>
        <div class="pages-tables " id="pages-tables" >
            <div class="waterMask" id="watermark"></div>
            <div class="rolling-table meal-table" ref="tableBox" style="">

                <table class="table" id="table" cellpadding="0" cellspacing="0" ref="rollingTable">
                    <tr v-for="(x,i) in xList" :key="i">
                        <th class="rows "  v-for="(l,index) in x" :key="index" :colspan="l.colspan" :rowspan="l.rowspan">{{l.name}}</th>
                    </tr>
                    <tr v-for="(l,i) in yList" :key="i + 'a'">
                        <template v-for="(x, xKey) in xField">
                            <td v-for="(ll,yKey) in l" :key="yKey" v-if="x === yKey" >
                                <!--{{ yList[i][yKey]}}-->
                                <a v-if="yList[i][yKey]">
                                    <pre>{{ yList[i][yKey]}}</pre>
                                </a>
                            </td>
                        </template>
                    </tr>
                    <tr></tr>
                </table>
            </div>
        </div>
        <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn" v-if="btnType === 1"></FooterBtn>
        <FooterBtn :event-arr="btnTextSe" v-on:commenEvent="operateBtn" v-if="btnType === 2" style="    background-color: #b5b5b5;"></FooterBtn>

        <van-actionsheet
                v-model="Cdate"
                :actions="actions"
                @select="onSelect"
        />

        <van-dialog
                v-model="Search"
                title="输入搜索机构名称"
                show-cancel-button
                @confirm="SearchFun"
        >
            <div style="text-align: center;margin: 0.15rem;">
                <input type="text" id="SearchName" >
            </div>
        </van-dialog>
    </div>
</template>
<script>
    import { NavBar, Icon, Tab, Tabs, Row, Col, DatetimePicker, Popup, Actionsheet,List,Dialog,Toast  } from "vant";
    import { createIScroller } from "../../utils/operate-box";
    import { RevenueStatistics } from '@/api/operate/operate';
    import FooterBtn from "../common/footer-operate-btn";
    import { getParamFromUrlAndRoute } from '@/utils'

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Toast.name]: Toast,
            [Tab.name]: Tab,
            [Dialog .name]: Dialog ,
            [Tabs.name]: Tabs,
            [Row.name]: Row,
            [Col.name]: Col,
            [List.name]: List,
            [Popup.name]: Popup,
            [Actionsheet.name]: Actionsheet,
            [DatetimePicker.name]: DatetimePicker,
            FooterBtn:FooterBtn

        },
        data() {
            return {
                startDate:'',
                endDate:'',
                btnType:1,
                //底部按钮
                btnText: [
                    {
                        type: 1,
                        title: "点击此处加载更多"
                    },
                 ], btnTextSe: [
                    {
                        type: 2,
                        title: "已加载全部"
                    },
                ],
                max:'',
                maxHeight:'100%',
                scroll: {
                    scroller: null
                },
                // 顶部表格冻结格式
                xList: [
                    [
                        {
                            field_name: "custom_field",
                            name: "日期",
                            colspan: 1, //指定单元格 横向 跨越的 列数
                            rowspan: 1, //指定单元格 纵向 跨越的 行数
                        },
                        {
                            field_name: "custom_field",
                            name: "收入/支出",
                            colspan: 1,
                            rowspan: 1,
                        },
                        {
                            field_name: "custom_field",
                            name: "机构",
                            colspan: 1,
                            rowspan: 1,
                        },
                        {
                            field_name: "custom_field",
                            name: "来源",
                            colspan: 1,
                            rowspan: 1,
                        },
                        {
                        field_name: "custom_field",
                        name: "类型",
                        colspan: 1, //指定单元格 横向 跨越的 列数
                        rowspan: 1, //指定单元格 纵向 跨越的 行数
                        },
                        {
                            field_name: "custom_field",
                            name: "详情",
                            colspan: 1,
                            rowspan: 1,
                        },
                    ],
                ],
                xField: ['statis_date', 'area_name', "area_name1", "area_name2", "area_name3", "area_name4", ],
                // 表格数据格式
                yList: [
                    // 数据格式例子
                    // {
                    //     area_name: "新增数据",
                    //     area_name1: "新增数据1",
                    //     area_name2: "新增数据2",
                    //     area_name3: "新增数据3",
                    //     area_name4: "新增数据4",
                    //     area_name5: "新增数据5",
                    //     area_name6: "新增数据6",
                    //     statis_date: 201807,
                    // },
                ],
                query:'',
                nextId:'',
                filterType:1,

                // 日期选择
                Cdate:false,
                Search:false,

                actions: [
                    {
                        name: '今日',
                        type:1
                    },
                    {
                        name: '昨日',
                        type:2

                    }, {
                        name: '本周',
                        type:3

                    }, {
                        name: '上周',
                        type:4
                    },
                    {
                        name: '本月',
                        type:5

                    },{
                        name: '上月',
                        type:6

                    }
                ],
                // 文档格式
                list:[
                    {
                        "id":'',
                        "time":"",
                        "amount":"",// 收入支出
                        "schoolName":"",// 机构名
                        "origin":"",// 来源
                        "type":"",// 类型
                        "desc":""// 详情描述
                    },
                ],
                // 阻止重复点击加载
                stop:false
            }
        },
        mounted() {
            this.maxHeight = window.screen.height
            this.scroll.scroller = createIScroller(".meal-table");

            var now=new Date();
            var year=now.getFullYear();
            var month=now.getMonth()+1;
            var day=now.getDate();

            const startDate = getParamFromUrlAndRoute('startDate', this.$router)
            const endDate = getParamFromUrlAndRoute('endDate', this.$router)

            if(this.$route.query.endDate || endDate){
                this.endDate = endDate
            }else{
                this.endDate = year + '-' + (month > 9 ? month : '0' +month) + '-' + (day > 9 ? day : '0' +day)
            }

            (this.$route.query.startDate || startDate) ? this.startDate = startDate : this.startDate = year + '-' + (month > 9 ? month : '0' +month) + '-' +(day > 9 ? day : '0' +day)

            this.getStatisticsList()
        },
        methods:{
            week(){
                var now=new Date();
                var year=now.getFullYear();
                //因为月份是从0开始的,所以获取这个月的月份数要加1才行
                var month=now.getMonth()+1;
                var date=now.getDate();
                var day=now.getDay();
                let n = 0
                //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
                if(day!==0){
                    n=n+(day-1);
                }
                else{
                    n=n+day;
                }
                if(day){
                    //这个判断是为了解决跨年的问题
                    if(month>1){
                        month=month;
                    }
                    //这个判断是为了解决跨年的问题,月份是从0开始的
                    else{
                        year=year-1;
                        month=12;
                    }
                }
                now.setDate(now.getDate()-n);
                year=now.getFullYear();
                month=now.getMonth()+1;
                date=now.getDate();
                let s=year+"-"+(month<10?('0'+month):month)+"-"+(date<10?('0'+date):date);
                this.startDate = s

                let Nowdate=new Date();
                let WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
                let WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
                let M=Number(WeekLastDay.getMonth())+1;
                if(M<10){
                    M="0"+M;
                }
                let D=WeekLastDay.getDate();
                if(D<10){
                    D="0"+D;
                }
                this.endDate =  WeekLastDay.getFullYear()+"-"+M+"-"+D

                this.getStatisticsList()
            },
            today(){
                var now=new Date();
                var year=now.getFullYear();
                //因为月份是从0开始的,所以获取这个月的月份数要加1才行
                var month=now.getMonth()+1;
                var date=now.getDate();
                var day=now.getDay();

                let s=year+"-"+(month<10?('0'+month):month)+"-"+(date<10?('0'+date):date);
                this.startDate = s
                this.endDate = s
                this.getStatisticsList()
            },
            yestoday(){
                var day1 = new Date();
                day1.setTime(day1.getTime()-24*60*60*1000);
                var s1 = day1.getFullYear()+"-" +
                    ((day1.getMonth()+1) > 9 ? (day1.getMonth()+1) : '0' + (day1.getMonth()+1))
                    +"-" +
                    (day1.getDate() > 9 ? day1.getDate() : '0' + day1.getDate() )
                this.startDate = s1
                this.endDate = s1
                this.getStatisticsList()
            },
            month(){
                var nowDate = new Date();
                var cloneNowDate = new Date();
                var fullYear = nowDate.getFullYear();
                var month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
                var endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
                function getFullDate(targetDate) {
                    var D, y, m, d;
                    if (targetDate) {
                        D = new Date(targetDate);
                        y = D.getFullYear();
                        m = D.getMonth() + 1;
                        d = D.getDate();
                    } else {
                        y = fullYear;
                        m = month;
                        d = date;
                    }
                    m = m > 9 ? m : '0' + m;
                    d = d > 9 ? d : '0' + d;
                    return y + '-' + m + '-' + d;
                };
                this.endDate = getFullDate(cloneNowDate.setDate(endOfMonth));//当月最后一天
                this.startDate = getFullDate(cloneNowDate.setDate(1));//当月第一天
                this.getStatisticsList()
            },
            // 上周时间段
            laseweek(){
                let myDate = new Date(new Date().getTime() - 7 * 24 * 3600 * 1000)
                let day = myDate.getDay()
                let time = myDate.getDate() - day + (day === 0 ? -6 : 1)
                let startTime = new Date(myDate.setDate(time))
                let startDateTime =
                    startTime.getFullYear() +
                    '-' +
                    ((startTime.getMonth() + 1) > 9 ? (startTime.getMonth() + 1) : '0' + (startTime.getMonth() + 1))+
                    '-' +(startTime.getDate() > 9 ? startTime.getDate() : '0' + startTime.getDate())
                let endTime = new Date(myDate.setDate(time + 6))
                let endDateTime =
                    endTime.getFullYear() +
                    '-' +
                    ((endTime.getMonth() + 1) > 9 ? (endTime.getMonth() + 1 ): '0' + (endTime.getMonth() + 1))+
                    '-' +(endTime.getDate() > 9 ? endTime.getDate() : '0' + endTime.getDate())

                this.endDate =  endDateTime
                this.startDate = startDateTime
                this.getStatisticsList()
            },
            lasemonth(){
                var lastMonthDate = new Date(); //上月日期
                lastMonthDate.setDate(1);   //变成这个月一号
                lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
                var lastYear = lastMonthDate.getYear();
                lastYear += (lastYear < 2000) ? 1900 : 0; //
                var lastMonth = lastMonthDate.getMonth();
                var lastMonthStartDate = new Date(lastYear, lastMonth, 1);
                this.formatDate(lastMonthStartDate,1)
                this.lasemonthE()
            },
            // 上周时间段方法2
            formatDate(date,type) {
                var myyear = date.getFullYear();
                var mymonth = date.getMonth()+1;
                var myweekday = date.getDate();

                if(mymonth < 10){
                    mymonth = "0" + mymonth;
                }
                if(myweekday < 10){
                    myweekday = "0" + myweekday;
                }
                if(type === 1){
                    this.startDate = myyear+"-"+mymonth + "-" + myweekday
                }else if(type === 2){
                    this.endDate = myyear+"-"+mymonth + "-" + myweekday
                }
            },
            // 获取上个月最后一天日期
            lasemonthE(){
                var lastMonthDate = new Date(); //上月日期
                lastMonthDate.setDate(1);   //变成这个月一号
                lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
                var lastYear = lastMonthDate.getYear();
                lastYear += (lastYear < 2000) ? 1900 : 0; //
                var lastMonth = lastMonthDate.getMonth();
                var lastMonthEndDate = new Date(lastYear, lastMonth, this.getMonthDays(lastMonth));
                this.formatDate(lastMonthEndDate,2);
                this.getStatisticsList()
            },
            // 获取上个月天数
            getMonthDays(myMonth){
                var now = new Date(); //当前日期
                var nowYear = now.getYear(); //当前年
                nowYear += (nowYear < 2000) ? 1900 : 0; //
                var monthStartDate = new Date(nowYear, myMonth, 1);
                var monthEndDate = new Date(nowYear, myMonth + 1, 1);
                //   console.log('天数'+monthStartDate+'==='+ monthEndDate)
                var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
                //  console.log('天数，数量：'+days);
                return days;
            },
            // 查找机构
            SearchFun(){
                this.query = document.getElementById('SearchName').value
                this.yList = []
                this.list = []
                this.nextId = ''
                this.getStatisticsList()
            },
            // 切换日期
            onSelect(item) {
                this.Cdate = false;
                this.filterType = item.type
                this.nextId = ''
                this.yList = []
                this.list = []
                if(item.type === 1){
                    this.today()
                }if(item.type === 2){
                    this.yestoday()
                }
                if(item.type === 3){
                    this.week()
                } if(item.type === 4){
                    this.laseweek()
                }if(item.type === 5){
                    this.month()
                }if(item.type === 6){
                    this.lasemonth()
                }
            },
            onClickLeft(){
                this.Search = true
            },
            onClickRight(){
                this.Cdate = true
            },
            // 获取机构信息列表
            getStatisticsList() {
                this.stop = true
                    this.$loading()
                    setTimeout(() => {
                        const data = {}
                        data.schoolName = this.query
                        data.startDate = this.startDate
                        data.endDate = this.endDate
                        data.nextId = this.nextId
                        RevenueStatistics(data)
                            .then(res => {
                                //班级列表数据处理
                                if (res.status === 200) {
                                    this.$loadingHide()
                                    if(res.data.data.list.length > 0){
                                        this.list = res.data.data.list
                                        let max = res.data.data.list[0].id
                                        for (var i = 1; i < res.data.data.list.length; i++){
                                            if (res.data.data.list[i].id < max){
                                                max = res.data.data.list[i].id;
                                            }
                                        }
                                        this.nextId = max
                                        if (res.data.data.list.length >= 20  ) {
                                            this.btnType = 1
                                        }else {
                                            this.btnType = 2
                                        }
                                        this.AddListMes()
                                        this.stop = false
                                    }else{
                                        this.$loadingHide()
                                        Toast.fail('无机构信息')
                                    }
                                }
                            }).catch(()=>{
                            throw new Error("异常！")
                        })
                    }, 500);
            },
            // 机构表格内容
            AddListMes(){
                for (let b = 0; b < this.list.length; b++) {
                    let lsObj = {}
                            lsObj['statis_date'] = this.list[b].time
                            lsObj['area_name']   = this.list[b].amount
                            lsObj['area_name1' ] = this.list[b].schoolName
                            lsObj['area_name2' ] = this.list[b].origin
                            lsObj['area_name3' ] = this.list[b].type
                            lsObj['area_name4' ] = this.list[b].detail
                    this.yList.push(lsObj)
                }
            },

            //底部按钮
            operateBtn(type) {
                if(this.stop === false){
                    if (type === 1) {
                        this.getStatisticsList()
                    } else if (type === 2) {
                        Toast.fail('没有更多信息')
                    }
                }

            },
        }
    }

</script>
<style lang="less" scoped>
    *{
        font-size: 0.14rem;
    }
    .pages-tables {
        -webkit-overflow-scrolling: touch; // ios滑动顺畅
        position: relative;
        margin: 0.1rem;
    }
    .rolling-table {
        /*height: 3rem;*/
        font-size: 0.14rem;
        color: #86939a;
        background-color: #fff;
        width: 100%;
        -webkit-overflow-scrolling: touch;
        position: relative;
        top: 0;
        overflow: hidden;
        height: 77vh;
        border-left:solid 2px #efefef;
        border-right:solid 2px #efefef;
        border-bottom:solid 2px #efefef;
    }
    .rows {
        position: relative;
        z-index: 3;
    }
    .cross {
        position: relative;
        z-index: 99;
    }
    table td {
        border: 0px solid #000;
        font-size: 0.14rem;

        background: #fff;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    .table {
        //   border-collapse: collapse; //去掉重复的border
        color: #86939e;
        font-size: 0.14rem;

        border: 0px solid #000;
        min-height: 100%;
        text-align: center;
        .cols{
            /*border-right: 0.02rem solid #eee;*/
            padding: 0;
            background-color: #f3f4f6;
            color: #43484d;
            border-right: 0.01rem solid #a1a1a1;
            border-bottom: 0.01rem solid #a1a1a1;
        }
        td {
            border-bottom: 0.02rem solid #eee;
            border-right: 0.02rem solid #eee;
            white-space: nowrap;
            height: 0.3rem;
            line-height: 0.35rem;
            padding: 0 0.2rem;
        }
        th {
            color: #43484d;
            white-space: nowrap;
            height: 0.2rem;
            line-height: 0.35rem;
            padding: 0.1rem 0;
            background-color: #f3f4f6;
            font-weight: normal;
            padding-bottom: 0;
            padding-top: 0;
            border: 0.01rem solid #a1a1a1;
        }
    }
    tr{
        position: relative;
        background-color: #fff;
        &:nth-of-type(odd){
            td{
                // background-color: pink;
            }
        }
    }
    /deep/.van-list__finished-text{
        display: none;
    }
    .C_class{
        border-bottom: solid blue;
        padding-bottom: 0.1rem;
        color: blue;
    }
    .U_class{
        border-bottom: solid white;
        padding-bottom: 0.1rem ;
    }
    .date_title{
        text-align: center;
        margin: 0.1rem 0.1rem 0 0.1rem;
        font-weight: 700;
    }

</style>
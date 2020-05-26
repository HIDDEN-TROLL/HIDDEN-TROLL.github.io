<template>
    <div id="attendance-sheet">
        <!--考勤关联学生-->
        <div class="go-back">
            <van-nav-bar
                    title="教师考勤报表"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div style="border-bottom: 10px solid #f3f7f8;">
            <div class="select-cell">
                <van-row>
                    <van-col span="11">
                        <span @click="monthSelect">
                            {{year}}年{{month}}月
                            <van-icon name="arrow-down" />
                        </span>
                    </van-col>
                    <van-col span="2">
                        |
                    </van-col>
                    <van-col span="11">
                        <span @click="changeType()">
                            {{typeSelectText}}
                        </span>
                        <van-icon name="arrow-down" />
                    </van-col>
                </van-row>
            </div>
        </div>

        <div style="border: 1px solid #eee;margin: 0.15rem">
            <ScorllTabel :x-list="xList" :x-field="xField" :y-list="yList" :type-obj="objs"></ScorllTabel>
        </div>


        <div class="month-sleect">
            <van-popup v-model="showMonth" position="bottom" :overlay="true">
                <van-datetime-picker
                        v-model="currentDate"
                        type="year-month"
                        :formatter="formatter"
                        @cancel="cancelPopup"
                        @confirm="confirmPopup"
                        :max-date="maxDate"
                />
            </van-popup>
        </div>
<!--        考勤类型列表-->
        <div class="type-sleect">
            <van-actionsheet
                    v-model="showTypeSelectSe"
                    :actions="teacherTypeList"
                    @select="onSelect"
            />
        </div>
    </div>
</template>

<script>
    import { NavBar, Icon, Tab, Tabs, Row, Col, DatetimePicker, Popup, Actionsheet } from "vant";
    import { Report } from '@/api/teacher/attendance';
    import ScorllTabel from "./teacher-siginbox";
    import { attendanceTeacher} from '@/api/school/attendance-type-manage'


    export default {
        name: "attendance-sheet",
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Row.name]: Row,
            [Col.name]: Col,
            [Popup.name]: Popup,
            [Actionsheet.name]: Actionsheet,
            [DatetimePicker.name]: DatetimePicker,
            ScorllTabel:ScorllTabel
        },
        data() {
            return {
                currentDate: new Date(),

                objs: {
                    type: null,
                    showGarde: true,
                    maxHeight: 2,
                },

                showMonth: false,
                showTypeSelect: false,
                showTypeSelectSe: false,
                cuntDays: null,//当月天数
                maxDate:new Date(),

                teacherList:[],
                xList: [
                    [
                        {
                            field_name: "statis_date",
                            name: "",
                            week: '',
                            colspan: 1, //指定单元格 横向 跨越的 列数
                            rowspan: 2, //指定单元格 纵向 跨越的 行数
                        },
                    ],
                ],
                xField: [
                    "statis_date",
                ],
                yList: [],
                year:new Date().getFullYear(),
                month:new Date().getMonth() + 1,
                date:'',
                actions: [
                    {
                        name: '全部数据',
                        id: null,
                    },
                    {
                        name: '考勤记录',
                        id: 0,
                    },
                ],
                teacherlist:[],
                teacherTypeList:[
                    {name:'全部记录',id:null},
                    {name:'考勤记录',id:0}
                    ],
                typeSelectText: "全部记录",
                backData:[]

            };
        },
        methods:{
            // 查看考勤类型
            LoadingType(){
                attendanceTeacher()
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                            if (res.data.data.length > 0) {
                                this.teacherlist = res.data.data
                                for(let i=0;i<this.teacherlist.length;i++){
                                    this.teacherTypeList[i+2]=
                                        {
                                            id:this.teacherlist[i].id,
                                            name:this.teacherlist[i].name
                                        }

                                }
                            }
                        }
                    }).catch(() => {
                    throw new Error("异常！")
                })
            },
            changeType(){
                this.showTypeSelectSe = true
            },
            GetReport() {
                return Report(this.date)
                    .then(res => {
                        if (res.data.meta.success) {
                            //this.yList=[];
                            this.total = res.data.data.length;
                            this.backData = res.data.data;
                            this.tabelFunction();//生成列表
                        }
                    })
            },
            onClickRight(){
            },
            onClickLeft(){
                this.$router.go(-1)
            },
            typeSelect(){
                this.showTypeSelect = true;
            },
            monthSelect(){
                this.showMonth = true;
            },
            cancelPopup() {
                this.showMonth = false;
            },
            confirmPopup() {
                this.getSheetDate();
                this.showMonth = false;
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                this.getCountDays();//设置表格当月天数
                return value;
            },
            getCountDays() {
                var curDate = this.currentDate;
                /* 获取当前月份 */
                var curMonth = curDate.getMonth();
                /* 生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
                curDate.setMonth(curMonth + 1);
                /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
                curDate.setDate(0);
                /* 返回当月的天数 */
                this.cuntDays = curDate.getDate();
            },
            getSheetDate() {
                this.year =  this.currentDate.getFullYear()
                this.month =  this.currentDate.getMonth() +1
                this.date = this.year + '-' +
                    (
                        (this.month) < 10 ?
                            '0' + (this.month) :
                            (this.month)
                    )
                    return Report(this.date)
                    .then(res => {
                        if (res.data.meta.success) {
                            //this.yList=[];
                            this.total = res.data.data.length;
                            this.backData = res.data.data;
                            this.tabelFunction();//生成列表
                        }
                    })
            },
            onSelect(item) {
                this.showTypeSelectSe = false;
                this.typeSelectText = item.name;
                this.objs.type = item.id

                console.log(this.objs)
            },
            // 列表表格数据处理
            tabelFunction() {
                //重置表格
                this.xList= [
                    [
                        {
                            field_name: "statis_date",
                            name: "",
                            week: '',
                            colspan: 1, //指定单元格 横向 跨越的 列数
                            rowspan: 2, //指定单元格 纵向 跨越的 行数
                        },
                    ],
                ];

                this.yList=[];
                this.xField=["statis_date"]
                //根据当月天数生成数组
                let weekArray = ["日", "一", "二", "三", "四", "五", "六"];
                let thDate = [];//表头数据
                //生成表格内容
                for (let b = 0; b < this.backData.length; b++) {

                    let lsObj = {}
                    for (let x = 1; x <= this.cuntDays; x++) {//创建容器对象生成表格时间列表内容

                        lsObj['area_name' + x] = { time: [], exitTime: [], otherTime: [] ,attendanceTypeId:0}
                        for (let s = 0; s < this.backData[b].records.length; s++) {
                            if (this.backData[b].records[s].day == x) {
                                lsObj['area_name' + x].time = this.backData[b].records[s].list;
                                lsObj['area_name' + x].attendanceTypeId = this.backData[b].records[s].attendanceTypeId;
                                lsObj['area_name' + x].exitTime = this.backData[b].records[s].exitTime;
                                lsObj['area_name' + x].otherTime = this.backData[b].records[s].otherTime
                            }
                        }
                    }
                    lsObj.statis_date = { sName: this.backData[b].name, sNameTimes: "10", sGarde: this.backData[b].gradeName,id:this.backData[b].id }
                    this.yList.push(lsObj)
                }

                console.log(this.yList)

                for (let i = 1; i <= this.cuntDays; i++) {//从当月1号开始
                    //生成表头
                    //生成日期
                    let today = this.currentDate.getFullYear() + '-' + (this.currentDate.getMonth()>9 ? this.currentDate.getMonth()+1 : '0'+(this.currentDate.getMonth()+1)) + '-' + (i>10 ? i : '0'+i)
                    //获取对应日期的星期
                    let weeks = weekArray[new Date(today).getDay()];
                    thDate.push(
                        {
                            field_name: "area_name" + i,
                            name: i + "号",
                            week: '周' + weeks,
                            colspan: 1, //指定单元格 横向 跨越的 列数
                            rowspan: 1, //指定单元格 纵向 跨越的 行数
                        },
                    )
                    //生成列名称
                    this.xField.push("area_name" + i);
                }
                this.xList.push(thDate);
            },
        },
         filters: {
             timeFilters: function (value) {
                 return value.getFullYear() + '年' + (value.getMonth() + 1) + '月'
             },
         },
        mounted() {
           this.date = this.year + '-' +
                (
                    (this.month) < 10 ? '0' + (this.month) : (this.month)
                )
            this.getCountDays();//获取当月天数
            this.GetReport()
            this.LoadingType()

        }
    };
</script>

<style scoped lang="less">
    .go-back .van-nav-bar .van-nav-bar__text{
        font-size: 0.16rem;
    }
    .select-cell {
        height: 48px;
        justify-content: center;
        align-items: center;
    }
    .select-cell {
        color: #666;
        padding: 0 0.16rem;
        height: 0.48rem;
        font-size: 0.14rem;
        text-align: center;
        line-height: 0.48rem;
    }

</style>

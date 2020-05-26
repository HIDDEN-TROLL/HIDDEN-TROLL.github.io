<template>
    <div>
        <div>
            <van-nav-bar
                    :title="name+'请假记录'"
                    left-text="返回"
                    right-text="筛选日期"
                    left-arrow
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
            />
        </div>
        <div class="toptitle">
            <van-row>
                <van-col span="8">
                    本月请假{{Record.monthNumber}}次
                </van-col>
                <van-col span="8">
                    本周请假{{Record.weekNumber}}次
                </van-col>
                <van-col span="8">
                    今日请假{{Record.dayNumber}}次
                </van-col>
            </van-row>
        </div>
        <div class="allmes" v-if="Record.list">
            共{{Record.list.length}}条数据
        </div>
        <div class="record" v-for="(item,index) in Record.list" :key="index">
            <van-row>
                <van-col span="8">
                    {{item.date}}
                </van-col>
                <van-col span="8">
                    {{item.attendPeriod}}
                </van-col>
            </van-row>
        </div>


        <div class="setTimebox" >
            <van-dialog
                    v-model="setTime"
                    title=""
                    show-cancel-button
                    @confirm="choicedate()"
            >
                <div style="padding: 0.15rem">
                    <div style="line-height: 0.6rem;text-align: center;font-size: 0.2rem;font-weight: 700;" >
                        请选择开始时间
                    </div>
                    <div @click="ChoiceTime(1)" class="choiceTime">{{startTime}}</div>

                    <div >
                        <div style="line-height: 0.6rem;text-align: center;font-size: 0.2rem;font-weight: 700;" >
                            请选择结束时间
                        </div>
                        <div @click="ChoiceTime(2)" class="choiceTime" v-if="showEnd">{{endTime}}</div>
                        <div class="choiceTime" v-if="showEnd===false" style="background-color: #c9c9c9" @click="ToastChioce">0-0-0</div>
                    </div>
                </div>
            </van-dialog>
        </div>
        <div >
            <van-popup v-model="CStime" position="bottom" :overlay="true" >
                <van-datetime-picker
                        v-model="currentDate"
                        type="date"
                        title="选择时间"
                        :max-date="minDate"
                        :formatter="formatter"
                        @confirm="confirm"
                        @cancel="close"

                />
            </van-popup>
        </div>
    </div>

</template>

<script>
    import { NavBar,Icon, Tab, Tabs,Actionsheet,Row, Col, Button,Toast,Switch,Checkbox, CheckboxGroup,DatetimePicker,Search ,Popup  } from "vant";
    import { mapState } from "vuex";
    import { getStuRecord } from '@/api/school/attendance-leave';


    export default {
        name: "clas-title-list",

        components: {
            [Icon.name]: Icon,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [DatetimePicker .name]: DatetimePicker ,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Row.name]: Row,
            [Search.name]: Search,
            [Popup.name]: Popup,
            [NavBar.name]: NavBar,
            [Col.name]: Col,
            [Toast.name]: Toast,
            [Button.name]: Button,
            [Actionsheet.name]:Actionsheet,
            [Switch .name]:Switch ,
            /*DownMenu: DownMenu*/
        },
        data() {
            return {
                value:'',
                id:this.$route.query.id,
                name:this.$route.query.name,
                Record:[],

                // 筛选年级
                date:'',
                EndYear:'',
                Endmonth:'',
                endday:'',
                startday:'',
                FirstChoice:0,
                currentDate: new Date(),
                minDate: new Date(),
                Ctype:0,
                CStime:false,
                setTime:false,
                showEnd:false,
                showDate:false,
                startTime:'',
                endTime:'',
                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                day:new Date().getDate()

            };
        },
        methods: {
            close(){
                this.CStime = false
                this.setTime = true
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                } else if (type === 'day') {
                    return `${value}日`
                }
                return value
            },
            ToastChioce(){
                Toast("请先选择开始时间")
            },
            ChoiceTime(type){
                if(type === 1){
                    this.CStime = true ,
                        this.setTime = false ,
                        this.Ctype = 1,
                        this.minDate =  new Date()
                }else if(type === 2){
                    this.CStime = true
                    this.setTime = false
                    this.Ctype = 2
                }
            },
            getStuRecordFun(){
                this.$loading();
                getStuRecord(this.id,this.startTime,this.endTime)
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                            this.Record = res.data.data
                                    console.log(res.data.data)
                        }
                    }).catch(() => {
                    throw new Error("历史记录获取异常!")
                })
            },

            onClickRight(){
                this.setTime = true
            },
            onClickLeft(){
                this.$router.back()
            },

            choicedate(){
                this.showDate = true

                this.getStuRecordFun()

            },
            confirm(value){
                var date = value;
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate()

                if(this.Ctype === 1){
                    this.year = y
                    this.month = m
                    this.startday = d

                    this.startTime = this.year+"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))+'-'+((this.startday) < 10 ? '0' + (this.startday) : (this.startday))
                    // this.minDate = value
                    this.showEnd = true
                    if(this.FirstChoice === 0){
                        this.endTime =  this.startTime
                        this.FirstChoice = 1
                    }
                    if(this.year > this.EndYear ||  this.month>this.Endmonth && (this.year >= this.EndYear))  {
                        this.endTime = this.startTime
                    }
                }else if(this.Ctype === 2){
                    this.EndYear = y
                    this.Endmonth = m
                    this.endday = d

                    this.endTime = this.EndYear+"-"+((this.Endmonth) < 10 ? '0' + (this.Endmonth) : (this.Endmonth))+"-"+((this.endday) < 10 ? '0' + (this.endday) : (this.endday))

                }
                console.log(this.startTime,this.endTime)
                this.CStime = false
                this.setTime = true

            },

        },
        mounted(){
            this.date = this.year
                +"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))
                +"-"+((this.day) < 10 ? '0' + (this.day) : (this.day))
            this.startTime = this.date
            this.endTime = this.date
            this.getStuRecordFun()
        },
    };
</script>

<style scoped lang="less">
    *{
        font-size:0.14rem;
        word-wrap:break-word
    }
    .toptitle{
        line-height: 0.4rem;
        text-align: center;
        font-size: 0.14rem;
    }
    .allmes{
        text-align: center;
        line-height: 0.4rem;
        background-color: #E4E4E4;
    }
    .record{
        line-height: 0.4rem;
        font-size: 0.14rem;
        border-bottom: solid 1px #E4E4E4;
        margin: 0 0.15rem;
    }
    .choiceTime{
        text-align: center;
        border-top: solid 1px #CCCCCC;
        border-bottom: solid 1px #CCCCCC;
        line-height: 0.4rem;
    }

</style>

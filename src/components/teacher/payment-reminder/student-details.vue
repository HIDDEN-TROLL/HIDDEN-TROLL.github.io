<template>
    <div>
        <van-nav-bar
                title="缴费详情记录"
                left-text="返回"
                right-text="筛选日期"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
        <div>
            <div>
                <van-row style="text-align: center;line-height: 0.5rem">
                    <van-col span="8" style="font-size: 0.18rem;font-weight: 700;">{{Meslist.stuName}}</van-col>
                    <van-col span="8" v-if="Meslist.className">{{Meslist.className}}</van-col>
                    <van-col span="8" v-else>暂无班级</van-col>
                    <van-col span="8">{{Meslist.gradeName}}</van-col>
                </van-row>
            </div>
            <div class="ac_line"></div>

            <div class="mes_time" v-for="(item,index) in Meslist.fees" :key="index">
                <van-row>
                    <van-col span="17">
                        到期缴费时间：{{item.maturityDate}}
                    </van-col>
                    <van-col span="7">

                        <span v-if="item.isRead === true" style="color:#6699CC" >
                            家长已阅
                        </span>
                        <span
                                v-if="item.isRead === false
                                && config.isNotice === 0
                                && (item.maturityDate[8]+item.maturityDate[9])  > today
                                && (item.maturityDate[5]+item.maturityDate[6]) >= thismonth
                                && (item.maturityDate[0]+item.maturityDate[1]+item.maturityDate[2]+item.maturityDate[3]) >= thisyear
                                    "
                                >
                            {{item.laveDay}}天后通知
                        </span>
                        <span
                                v-if="item.isRead === false
                                && config.isNotice === 1
                                && ((item.maturityDate[8]+item.maturityDate[9]) ) > today
                                && (item.maturityDate[5]+item.maturityDate[6]) >= thismonth
                                && (item.maturityDate[0]+item.maturityDate[1]+item.maturityDate[2]+item.maturityDate[3]) >= thisyear
                                && item.laveDay != 0
                                    "
                                >
                            {{item.laveDay}}天后通知
                        </span>
                        <span
                                v-if="item.isRead === false
                                && ((((item.maturityDate[8]+item.maturityDate[9])  ) < today
                                && (item.maturityDate[5]+item.maturityDate[6]) <= thismonth
                                && (item.maturityDate[0]+item.maturityDate[1]+item.maturityDate[2]+item.maturityDate[3]) <= thisyear)
                                || (item.maturityDate[0]+item.maturityDate[1]+item.maturityDate[2]+item.maturityDate[3]) < thisyear)
                                    "
                                style="color: #FF6666">
                            已过期
                        </span>
                        <span
                                v-if="item.isRead === false
                                && config.isNotice === 0
                                && (item.maturityDate[8]+item.maturityDate[9]) == today
                                && (item.maturityDate[5]+item.maturityDate[6]) == thismonth
                                && (item.maturityDate[0]+item.maturityDate[1]+item.maturityDate[2]+item.maturityDate[3]) == thisyear
                                "
                                style="font-weight: 700">
                            今日通知
                        </span>
                        <span
                                v-if="item.isRead === false
                                && config.isNotice === 1
                                && ((item.maturityDate[8]+item.maturityDate[9]) ) == today
                                && (item.maturityDate[5]+item.maturityDate[6]) == thismonth
                                && (item.maturityDate[0]+item.maturityDate[1]+item.maturityDate[2]+item.maturityDate[3]) == thisyear
                                && item.laveDay === 0
                                "
                                style="font-weight: 700">
                            今日通知
                        </span>
                    </van-col>
                </van-row>
            </div>
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
                    <div>
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
                    type="year-month"
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
    import { NavBar,Icon, Tab, Tabs,Actionsheet,Row, Col, Button,Toast,Switch,Checkbox, CheckboxGroup,DatetimePicker,Search,Popup    } from "vant";
    import { SearchStuFee } from '@/api/teacher/PaymentReminder';
    export default {
        name: "student-details",
        data() {
            return {
                currentDate: new Date(),
                minDate: new Date(),
                Sdate:'',

                day:0,
                setTime:false,
                Ctype:0,
                id:this.$route.params.id,

                date:'',
                startTime:'',
                endTime:'',
                FirstChoice:0,
                Meslist:[],
                config:[],

                CStime:false,
                showEnd:false,
                showDate:false,

                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                EndYear:'',
                Endmonth:'',
                SYear:'',
                Smonth:'',

                today:new Date().getDate(),
                thismonth:new Date().getMonth()+1,
                thisyear:new Date().getFullYear(),


            }
        },
        components: {
            [Icon.name]: Icon,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [DatetimePicker .name]: DatetimePicker ,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Row.name]: Row,
            [Search.name]: Search,
            [Popup .name]: Popup ,
            [NavBar.name]: NavBar,
            [Col.name]: Col,
            [Toast.name]: Toast,
            [Button.name]: Button,
            [Actionsheet.name]:Actionsheet,
            [Switch .name]:Switch ,
            /*DownMenu: DownMenu*/
        },
        methods:{
            // 筛选日期
            choicedate(){
                this.SearchStuFeeFun()
                this.showDate = true
                this.SYear = this.startTime
                this.Smonth = this.endTime

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
            confirm(value){
                var date = value;
                var y = date.getFullYear();
                var m = date.getMonth() + 1;

                if(this.Ctype === 1){
                    this.year = y
                    this.month = m
                    this.startTime = this.year+"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))
                    // this.minDate = value
                    this.showEnd = true
                    if(this.FirstChoice === 0){
                        this.endTime =  this.startTime
                        this.FirstChoice = 1
                    }
                    if(this.year > this.EndYear || (this.month>this.Endmonth && (this.year >= this.EndYear))){
                        this.endTime = this.startTime
                    }
                }else if(this.Ctype === 2){
                    this.EndYear = y
                    this.Endmonth = m
                    this.endTime = this.EndYear+"-"+((this.Endmonth) < 10 ? '0' + (this.Endmonth) : (this.Endmonth))
                }
                console.log(this.date)
                this.CStime = false
                this.setTime = true
            },
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
            changedate(value){
                let y = value.getColumnValue(0)
                let m = value.getColumnValue(1)
                let d = value.getColumnValue(2)
                this.Sdate = y+m+d
            },
            onClickLeft(){
                this.$router.back()
            },
            onClickRight(){
                this.setTime = true
            },
            onCancel(time){
                this.setTime = false
            },
            SearchStuFeeFun(){
                this.$loading();
                SearchStuFee(this.id,this.startTime,this.endTime)
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                            this.config = res.data.data.config

                            this.Meslist = res.data.data
                            // this.endTime = '0-0-0'
                        }
                    }).catch(() => {
                    throw new Error("历史记录获取异常!")
                })
            },
        },
        mounted() {
            this.date = this.year
                +"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))
            this.startTime = this.date
            this.endTime = this.date
            this.SearchStuFeeFun()
        }

    }
</script>

<style scoped>
*{
    font-size: 0.14rem;
}
.ac_line{
    height: 0.1rem;
    background: #F3F7F8;
}
    .mes_time{
        padding: 0.15rem;
        border-bottom: solid 1px #e4e4e4;
    }
/*.setTimebox/deep/.van-dialog .van-button{*/
/*    display: none;*/
/*}*/
    .choiceTime{
        text-align: center;
        border-top: solid 1px #CCCCCC;
        border-bottom: solid 1px #CCCCCC;
        line-height: 0.4rem;
    }
</style>
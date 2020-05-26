<template>
    <div class="backgrouncolor">

        <div class="date_list">
            <i @click="left" class="van-icon van-icon-arrow-left van-cell__left-icon" is-link arrow-direction="left" :class="{choosetime:chooseleft}"><!----></i>
            <span @click="Cymonth"> {{year}}年{{month}}月账单   <i data-v-506ad3dd="" class="van-icon van-icon-arrow-down van-cell__right-icon"><!----></i></span>
            <i @click="right" data-v-506ad3dd="" class="van-icon van-icon-arrow van-cell__right-icon" :class="{choosetime:chooseright}"><!----></i>
        </div>

        <div style="height: 0.1rem;background-color:#F3F7F8 "></div>

        <div>
            <div class="top_search">
                <div class="left">
                    <div class="date_top_list">
                        <van-cell title="代理商" is-link arrow-direction="down"   @click="showcho" />
                    </div>
                    <div class="search_div">
                        <div><input type="text" class="search" placeholder="请输入搜索关键词"  v-model='search'></div>
                        <div> <i class="van-icon van-icon-search"><!----></i></div>
                    </div>
                </div>
                <img :src="settingpic" @click="HideBox">
            </div>
        </div>

        <div>
            <div style="float:left;width: 3.55rem;height:4.4rem;border: solid 0.01rem #dcdcdc;overflow-x: scroll;margin: 0 0.1rem ;">

                <div class="testsilder" style="width: 4.4rem;padding:0.01rem">
                    <div>
                        <div  class="box toptitle " :class={DL:DL}>
                            <span>代理商</span>
                        </div>
                        <div  class="box toptitle"  :class={DL:DQ} >
                            <span>地区</span>
                        </div>
                        <div  class="box toptitle" :class={DL:PP} >
                            <span>品牌</span>
                        </div>
                        <div  class="box toptitle"  :class={DL:XQ}>
                            <span>校区</span>
                        </div>
                        <div  class="box toptitle"  >
                            <span>类型</span>
                        </div>
                        <div  class="box toptitle_se"  >
                            <span>历史欠款</span>
                        </div>
                        <div  class="box toptitle_se"  >
                            <span>上月应付</span>
                        </div>
                        <div  class="box toptitle_se"  >
                            <span>合计应付</span>
                        </div>
                        <div  class="box toptitle_se"  >
                            <span>本次支付</span>
                        </div>
                        <div  class="box toptitle_se"  >
                            <span>本次结余</span>
                        </div>
                    </div>


            <div v-if="searchData.length > 0">
                    <div style="float: left;    width: 100%;" v-for="(item,index) in searchData" :key="index" v-show="show">

                        <div  class="box" :class={DL:DL}>
                            <span>{{item.agentName}}</span>
                        </div>
                        <div  class=" " style="float:left;">

                            <div v-for="(itemse,index) in item.area" :key="index">
                                <div  class="box" :class={DL:DQ} >
                                    {{itemse.areaName}}
                                </div>

                                <div class=" " style="float:left;"  >

                                    <div v-if="itemse.brand.length>0">
                                        <div  v-for="(itemth,index) in itemse.brand" :key="index"  >
                                            <div class="box address"   :class={DL:PP} >
                                                <span>{{itemth.brandName}}</span>
                                            </div>

                                            <div style="float:left;">
                                                <div v-for="(itemfo,index) in itemth.school" :key="index">
                                                    <div class="schoolname" :class={DL:XQ}> {{itemfo.schoolName}}</div>
                                                    <div style="float:left;">
                                                        <div class="numberbox">{{itemfo.type}}</div>
                                                        <div class="numberbox">{{itemfo.historyOverdraft}}</div>
                                                        <div class="numberbox">{{itemfo.lastMonthFee}}</div>
                                                        <div class="numberbox">{{itemfo.totalFee}}</div>
                                                        <div class="numberbox">{{itemfo.currentPay}}</div>
                                                        <div class="numberbox">{{itemfo.surplus}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div   v-else >
                                        <div class="box address"  >
                                            <span> </span>
                                        </div>
                                        <div style="float:left;">
                                            <div  >
                                                <div class="schoolname"> </div>
                                                <div style="float:left;">
                                                    <div class="numberbox"> </div>
                                                    <div class="numberbox"></div>
                                                    <div class="numberbox"> </div>
                                                    <div class="numberbox"> </div>
                                                    <div class="numberbox"> </div>
                                                    <div class="numberbox"> </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> </div>
                    <div style="float: left;text-align: center;width: 100%;line-height: 1rem;" v-else>无数据</div>


                </div>
            </div>
        </div>

        <van-popup v-model="showMonth" position="bottom" :overlay="true">
            <div style="font-size: 0.15rem;border-bottom: solid 1px #dcdcdc;line-height: 0.5rem;color: #1989fa;font-weight: 700" @click="reset">点击此处返回今日所有数据</div>
            <PayPicker  @func="Showdate"></PayPicker>
        </van-popup>


        <van-popup v-model="Cdate" position="bottom" :overlay="true">
            <div style="font-size: 0.15rem;border-bottom: solid 1px #dcdcdc;line-height: 0.5rem;color: #1989fa;font-weight: 700" @click="reset">点击此处返回今日所有数据</div>
            <van-datetime-picker
                    v-model="currentDate"
                    type="year-month"
                    :max-date="minDate"
                    :formatter="formatter"
                    @cancel="ondateCancel"
                    @confirm="ondateConfirm"

            />
        </van-popup>

        <van-popup v-model="HideBoxTitle" position="bottom" :overlay="true">
            <div style="text-align: left;padding: 0.1rem;font-size: 0.14rem;float: left;" @click="onCancel">返回</div>
            <div style="text-align: left;padding: 0.1rem;font-size: 0.14rem;text-align: center;text-align: center;color: #1989fa;">选择要隐藏的表头</div>
            <van-checkbox v-model="DL" class="hidebtn">代理商</van-checkbox>
            <van-checkbox v-model="DQ" class="hidebtn">地区</van-checkbox>
            <van-checkbox v-model="PP" class="hidebtn">品牌</van-checkbox>
            <van-checkbox v-model="XQ" class="hidebtn">校区</van-checkbox>
        </van-popup>

    </div>
</template>

<script>
    import { NavBar } from 'vant';
    import { Search } from 'vant';
    import { Checkbox, CheckboxGroup } from 'vant';
    import { Cell, CellGroup,icon } from 'vant';
    import { Popup } from 'vant';
    import { Picker } from 'vant';
    import { DatetimePicker } from 'vant';
    import { FeeReport } from '@/api/new-concept/new-concept';
    import PayPicker from './components/pay-picker'

    export default {
        name: "",
        data(){
            return {
                HideBoxTitle: false,
                DL:false,
                DQ:false,
                PP:false,
                XQ:false,
                fee:[],
                chooseright:true,
                chooseleft:false,

                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                sendmonth:'',

                search:'',
                columnss:[],
                showMonth: false,

                show:true,

                settingpic: require("../../assets/img/newconcept/settingse.png"),

                Cdate: false,
                minDate: new Date(),
                currentDate: new Date(),

                date:'',
                data:'',
                agent:'',
                area:'',
                brand:'',
                school:''
            }
        },

        components: {
            [NavBar.name]:NavBar,
            [Search.name]:Search,
            [icon.name]:icon,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [DatetimePicker.name]: DatetimePicker,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            PayPicker:PayPicker
        },
        methods:{
            reset(){
                this.year = new Date().getFullYear()
                this.month = new Date().getMonth()+1
                this.GetFeeReport()
                this.Cdate = false
                this.showMonth = false
            },
            HideBox(){
                this.HideBoxTitle= true
            },
            Showdate(agent,area,brand,school){
                this.$loading();

                const data = {}

                if (agent) {
                    data.agent = agent
                }
                if (area) {
                    data.area = area
                }
                if (brand) {
                    data.brand = brand
                }
                if (school) {
                    data.school = school
                }
                if (this.date) {
                    data.date = this.date
                }

                this.data = data
                this.agent = agent
                this.area = area
                this.brand = brand
                this.school = school

                FeeReport(data).then(res => {
                    this.$loadingHide();
                    if (res.status === 200) {
                        this.fee = res.data.data;
                    }}).catch(() => {
                    throw new Error("异常!")
                })
                this.showMonth = false
            },
            // 获取数据
            GetFeeReport(){
                this.sendmonth = this.month
                if(this.month<10){
                    this.sendmonth = '0' + this.month
                }
                const date = this.year+'-'+this.sendmonth

                const data = {}
                if (date) {
                    data.date = date
                }

                this.$loading();
                FeeReport(data).then(res => {
                    this.$loadingHide();
                    if (res.status === 200) {
                        this.fee = res.data.data;
                    }
                }).catch(() => {
                    throw new Error("异常!")
                })
            },
            left(){
                this.$loading();
                this.month-=1
                this.sendmonth  = this.month

                if(this.month>10) {
                    this.sendmonth = this.month
                }
                if(this.month<10){
                    this.sendmonth = '0' + this.month
                    if(this.month<1){
                        this.month=12
                        this.year-=1
                        this.sendmonth = this.month
                    }
                }

                const date = this.year+'-'+this.sendmonth
                this.date = date

                const data = {}

                if (date) {
                    data.date = date
                }
                if (this.agent) {
                    data.agent = this.agent
                }
                if (this.area) {
                    data.area = this.area
                }
                if (this.brand) {
                    data.brand = this.brand
                }
                if (this.school) {
                    data.school = this.school
                }
                this.chooseright = false
                FeeReport(data).then(res => {
                    this.$loadingHide();
                    if (res.status === 200) {
                        this.fee = res.data.data;
                    }
                }).catch(() => {
                    throw new Error("异常!")
                })
            },
            right(){
                this.$loading();

                this.month+=1
                this.sendmonth  = this.month
                if(this.month>10) {
                    this.sendmonth = this.month
                }
                if(this.month<10){
                    this.sendmonth = '0' + this.month
                }

                if(this.month>12){
                    this.month-=12
                    this.year+=1
                    this.sendmonth = this.month
                    if(this.month<10){
                        this.sendmonth = '0' + this.month
                    }
                }

                const date = this.year+'-'+this.sendmonth
                this.date = date


                const data = {}

                if (date) {
                    data.date = date
                }
                if (this.agent) {
                    data.agent = this.agent
                }
                if (this.area) {
                    data.area = this.area
                }
                if (this.brand) {
                    data.brand = this.brand
                }
                if (this.school) {
                    data.school = this.school
                }

                if(this.month === new Date().getMonth()+1 && this.year === new Date().getFullYear()){
                    this.chooseright = true
                }

                FeeReport(data).then(res => {
                    this.$loadingHide();
                    if (res.status === 200) {
                        this.fee = res.data.data;
                    }
                }).catch(() => {
                    throw new Error("异常!")
                })
            },
            Cymonth(){
                this.Cdate = true
            },
            showcho(){
                var address= [];
                for (let ad of this.fee){
                    address.push(ad.agentName)
                }
                this.columnss = address
                this.showMonth = true
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;

                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            },
            onCancel(){
                this.HideBoxTitle = false
                this.showMonth = false
            },
            onConfirm(){
                this.showMonth = false
            },
            ondateConfirm(value) {
                var timer = value;
                var y = timer.getFullYear();
                var m = timer.getMonth() + 1;

                if (m >= 1 && m <= 9) {
                    m = "0" + m;
                }
                var date = y + "-" + m
                this.date = date

                const data = {}

                if (date) {
                    data.date = date
                }
                if (this.agent) {
                    data.agent = this.agent
                }
                if (this.area) {
                    data.area = this.area
                }
                if (this.brand) {
                    data.brand = this.brand
                }
                if (this.school) {
                    data.school = this.school
                }

                FeeReport(this.date,this.agent,this.area,this.brand,this.school).then(res => {
                    this.fee = res.data.data;
                    // console.log(this.fee);
                }).catch(() => {
                    throw new Error("异常!")
                })
                this.year = y
                this.month = m

                this.left()
                this.right()

                this.Cdate = false;
            },
            ondateCancel() {
                this.Cdate = false;
            },
        },
        mounted(){
            this.GetFeeReport()
        },
        computed: {
            searchData: function() {
                var search = this.search;
                if (search) {
                    return this.fee.filter(function(product) {
                        return Object.keys(product).some(function(key) {
                            return String(product[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.fee;
            }
        }
    }
</script>

<style scoped>
    .top_list{
        margin:0 auto;
        width:1rem;
    }
    .van-cell__title{
        text-align: center;
    }
    .top_list{
        font-size: 0;
        margin: 0 auto;
        width: 2.2rem;
        padding:0.2rem;
    }
    .left_img{
        float: left;
    }
    .time_title{
        margin: 0 0.3rem;
        float: left;
    }
    .van-cell__title{
        color:#666666;
        text-align: center;
    }
    .van-cell  {
        line-height: 0.24rem;
        font-size: 0.14rem;
        margin:0 auto;
        width:1.3rem;
        padding:0;
        height: 0.2rem;
    }
    .titile_bottom{
        width:90%;
        margin:0 auto;
        border-bottom: 0.02rem solid #eee;
    }


    .date_list{
        height: 0.5rem;
        text-align: center;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.5rem
    }
    .date_list span{
        margin: 0 0.4rem;
    }
    .left{
        font-size:0.14rem;
        float: left;
        width: 3.12rem;
        height: 0.25rem;
        border: solid #BCBCBC 0.01rem;
        border-radius: 0.04rem;
    }
    .top_search{
        float: left;
        margin:0.15rem ;
    }
    .top_search img{
        width:0.24rem;
        height:0.24rem;
        margin-left: 0.07rem;
        float: left;
    }
    .search_div{
        width:75%;
        margin-left:0.05rem;
        float: left;
        border-left: solid 1px #CCCCCC;
    }
    .search{
        float: left;
        width:90%;
        margin-left:0.05rem;
        border:solid 1px white;
        line-height: 0.2rem;
    }
    .lation_mes{
        float: left;
        margin-top: 0.3rem;
    }
    .date_top_list{
        width:0.7rem;
        float: left;
    }
    .van-cell__title{
        flex:none;
        color:#666666;
        text-align: center;
    }
    .van-cell  {
        line-height: 0.24rem;
        font-size: 0.14rem;
        margin-left:0.05rem;
        width:100%;
        padding: 0 ;
    }
    .van-icon {
        font-size: 0.16rem;
        line-height: 0.24rem;
    }

    div{
        font-size: 0.12rem;
        text-align: center;
    }
    .box{
        width: 0.4rem;
        float: left;
        height: 1rem;
        margin: 0.01rem;
        border: solid #dcdcdc 0.01rem;
    }
    .toptitle{
        line-height:0.4rem;
        height: 0.8rem;
        margin: 0.01rem;
        border: solid #dcdcdc 0.01rem;
    }
    .toptitle_se{
        line-height:0.4rem;
        height: 0.8rem;
        margin: 0.01rem;
        border: solid #dcdcdc 0.01rem;
    }
    .schoolname{
        width: 0.4rem;
        text-align: center;
        height: 1rem;
        float: left;
        margin: 0.01rem;
        border: solid #dcdcdc 0.01rem;
    }
    .numberbox{
        width: 0.4rem;
        height: 1rem;
        float: left;
        margin: 0.01rem;
        border: solid #dcdcdc 0.01rem;
    }
    .personbox .one{
        line-height: 0.45rem;
        border: solid #dcdcdc;
        border-width: 0 0 0.01rem  0;
    }
    .address{
        height: 1rem;
        line-height: 0.2rem;
    }
    .hidebtn{
        margin: 0.1rem 0;
    }
    .DL {
        display: none;
    }
    .choosetime{
        display: none;
    }
</style>

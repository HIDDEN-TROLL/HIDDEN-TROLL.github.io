<template>
    <div class="backgrouncolor">

        <div class="date_list">
            <i @click="left" class="van-icon van-icon-arrow-left van-cell__left-icon" is-link arrow-direction="left"><!----></i>
            <span @click="Cymonth"> {{year}}年{{month}}月账单  <i data-v-506ad3dd="" class="van-icon van-icon-arrow-down van-cell__right-icon"><!----></i></span>
            <i @click="right" data-v-506ad3dd="" class="van-icon van-icon-arrow van-cell__right-icon" :class="{choosetime:choosetime}"><!----></i>
        </div>

        <div style="height: 0.1rem;background-color:#F3F7F8 "></div>

        <div>
            <div class="top_search">
                <div class="left">
                    <div class="date_top_list">
                        <van-cell title="地区" is-link arrow-direction="down"    @click="showcho"/>
                    </div>
                    <div class="search_div">
                        <div><input type="text" class="search" placeholder="请输入地区名称"  v-model='search'></div>
                        <div> <i class="van-icon van-icon-search"><!----></i></div>
                    </div>
                </div>
                <img :src="settingpic"  @click="HideBox">
            </div>
        </div>

        <div>
            <div style="float:left;width: 3.55rem;border: solid 0.01rem #dcdcdc;overflow-x: scroll;margin:0 0.1rem;padding: 0.02rem">

                <div class="testsilder" style="width: 4rem">
                    <div>
                        <div  class="box toptitle"   :class={DL:DQ}>
                            <span>地区</span>
                        </div>
                        <div  class="box toptitle"  :class={DL:PP}>
                            <span>品牌</span>
                        </div>
                        <div  class="box toptitle"  :class={DL:XQ} >
                            <span>校区</span>
                        </div>
                        <div  class="box toptitle" :class={DL:LX}  >
                            <span>类型</span>
                        </div>
                        <div  class="box toptitle"  :class={DL:LSQK} >
                            <span>历史欠款</span>
                        </div>
                        <div  class="box toptitle" :class={DL:SYYF}  >
                            <span>上月应付</span>
                        </div>
                        <div  class="box toptitle" :class={DL:HJYF}  >
                            <span>合计应付</span>
                        </div>
                        <div  class="box toptitle" :class={DL:BCZF}  >
                            <span>本次支付</span>
                        </div>
                        <div  class="box toptitle"  :class={DL:BCJY} >
                            <span>本次结余</span>
                        </div>
                    </div>
                    <div v-if="searchData.length>0">
                        <div v-for="(itemse,index) in searchData" :key="index" style="float: left; width: 100%;">
                            <div  class="box firaddress" :class={DL:DQ}>
                                     {{itemse.areaName}}
                            </div>
                            <div class=" " style="float:left;">
                                <div v-for="(itemth,index) in itemse.brand" :key="index">
                                    <div class="box address brand" :class={DL:PP}>
                                            <span>{{itemth.brandName}}</span>
                                    </div>
                                    <div style="float:left;">
                                        <div v-for="(itemfo,index) in itemth.school" :key="index">
                                            <div class="schoolname" :class={DL:XQ} > {{itemfo.schoolName}}</div>
                                            <div style="float:left;">
                                                <div class="numberbox" :class={DL:LX}>{{itemfo.type}}</div>
                                                <div class="numberbox" :class={DL:LSQK}>{{itemfo.historyOverdraft}}</div>
                                                <div class="numberbox" :class={DL:SYYF}>{{itemfo.lastMonthFee}}</div>
                                                <div class="numberbox" :class={DL:HJYF} >{{itemfo.totalFee}}</div>
                                                <div class="numberbox" :class={DL:BCZF}>{{itemfo.currentPay}}</div>
                                                <div class="numberbox" :class={DL:BCJY}>{{itemfo.surplus}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="none">
                        查无此地区数据
                    </div>
                </div>
            </div>
        </div>

        <van-popup v-model="Caddress" position="bottom" :overlay="true">
            <div style="font-size: 0.15rem;border-bottom: solid 1px #dcdcdc;line-height: 0.5rem;color: #1989fa;font-weight: 700" @click="GetAgentFeeReport()">点击此处返回今日所有数据</div>
            <PaytablePicker @func="Getdata"></PaytablePicker>
        </van-popup>

        <van-popup v-model="Cdate" position="bottom" :overlay="true">
            <van-datetime-picker
                    v-model="currentDate"
                    type="year-month"
                    :max-date="minDate"
                    @cancel="ondateCancel"
                    :formatter="formatter"
                    @confirm="ondateConfirm"
                    @change="change"
            />
        </van-popup>

        <van-popup v-model="HideBoxTitle" position="bottom" :overlay="true">
            <div style="text-align: left;padding: 0.1rem;font-size: 0.14rem;float: left;" @click="onCancel">返回</div>
            <div  class="hidetitle">选择要隐藏的表头</div>
            <van-checkbox v-model="DQ" class="hidebtn">地区</van-checkbox>
            <van-checkbox v-model="PP" class="hidebtn">品牌</van-checkbox>
            <van-checkbox v-model="XQ" class="hidebtn">校区</van-checkbox>
            <van-checkbox v-model="LX" class="hidebtn">类型</van-checkbox>
            <van-checkbox v-model="LSQK" class="hidebtn">历史欠款</van-checkbox>
            <van-checkbox v-model="SYYF" class="hidebtn">上月应付</van-checkbox>
            <van-checkbox v-model="HJYF" class="hidebtn">合计应付</van-checkbox>
            <van-checkbox v-model="BCZF" class="hidebtn">本次支付</van-checkbox>
            <van-checkbox v-model="BCJY" class="hidebtn">本次结余</van-checkbox>
        </van-popup>

    </div>
</template>

<script>
    import { NavBar } from 'vant';
    import { Search } from 'vant';
    import { Popup } from 'vant';
    import { Picker } from 'vant';
    import { Cell, CellGroup,icon } from 'vant';
    import { DatetimePicker } from 'vant';
    import { Checkbox, CheckboxGroup } from 'vant';
    import PaytablePicker from './components/paytable-picker'
    import { AgentFeeReport } from '@/api/agent/agent';

    export default {
        name: "",
        data(){
            return {
                fee:[],
                date:'',
                data:'',

                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                currentDate: new Date(),
                search:'',
                columnss: [],
                Caddress: false,
                Cdate: false,
                minDate: new Date(),
                show:true,

                HideBoxTitle: false,
                DQ:false,
                PP:false,
                XQ:false,
                LX:false,
                LSQK:false,
                SYYF:false,
                HJYF:false,
                BCZF:false,
                BCJY:false,
                choosetime:true,

                settingpic: require("../../assets/img/newconcept/settingse.png"),

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
            PaytablePicker:PaytablePicker
        },
        mounted() {
            this.GetAgentFeeReport()
            // console.log(this.fee)
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
        },
        methods:{
            Getdata(area,brand,school){
                const data = {}
                if (area) {
                    data.area = area
                }
                if (brand) {
                    data.brand = brand
                }
                if (school) {
                    data.school = school
                }
                if(this.date){
                    data.date = this.date
                }

                this.data = data

                console.log(data)
                AgentFeeReport(data).then(res => {
                    this.fee = res.data.data;
                }).catch(() => {
                    throw new Error("代理角色(收费报表)搜索参数异常!")
                })
                this.Caddress = false
            },
            GetAgentFeeReport(){
                this.$loading();

                AgentFeeReport().then(res => {
                    this.$loadingHide();
                    if (res.status === 200) {
                        this.fee = res.data.data;
                    }
                }).catch(() => {
                    throw new Error("获取代理（人数报表）数据异常!")
                })
                this.Caddress = false
            },
            HideBox(){
                this.HideBoxTitle= true
            },
            left(){
              this.month-=1
                if(this.month<1){
                    this.month+=12
                    this.year-=1
                }
                let m = this.month
                if(this.month<10){
                    m = "0"+m
                }

                this.date = this.year+'-'+m

                const data = {}
                if (m) {
                    data.date = this.year+'-'+m
                }
                if (this.data.area) {
                    data.area = this.data.area
                }
                if (this.data.brand) {
                    data.brand = this.data.brand
                }
                if (this.data.school) {
                    data.school = this.data.school
                }

                this.choosetime = false


                AgentFeeReport(data).then(res => {
                    this.fee = res.data.data;
                }).catch(() => {
                    throw new Error("代理角色(收费报表)搜索参数异常!")
                })

                console.log(this.year+'-'+m)
                // console.log(this.year+'-'+this.month)
            },
            right(){
              this.month+=1
                if(this.month>12){
                    this.month-=12
                    this.year+=1
                }

                let m = this.month
                if(this.month<10){
                    m = "0"+m
                }

                const data = {}
                if (m) {
                    data.date = this.year+'-'+m
                }
                if (this.data.area) {
                    data.area = this.data.area
                }
                if (this.data.brand) {
                    data.brand = this.data.brand
                }
                if (this.data.school) {
                    data.school = this.data.school
                }

                this.date = this.year+'-'+m

                if(this.month === new Date().getMonth()+1 && this.year === new Date().getFullYear()){
                    this.choosetime = true
                }

                AgentFeeReport(data).then(res => {
                    this.fee = res.data.data;
                }).catch(() => {
                    throw new Error("代理角色(收费报表)搜索参数异常!")
                })

            },
            showcho(){
                var address= [];
                for (let ad of this.fee){
                    address.push(ad.areaName)
                }
                this.columnss = address
                this.Caddress = true
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            },
            Cymonth(){
                this.Cdate = true
            },
            onConfirm() {
                this.Caddress = false;
            },
            ondateCancel() {
                this.Cdate = false;
            },
            ondateConfirm(value) {
                var date = value;
                var m = date.getMonth() + 1;
                var d = date.getDate();
                if (m >= 1 && m <= 9) {
                    m = "0" + m;
                }
                if (d >= 0 && d <= 9) {
                    d = "0" + d;
                }
                this.year=date.getFullYear()
                this.month=m
                var timer = date.getFullYear() + "-" + m

                const data = {}
                if (timer) {
                    data.date = timer
                }
                if (this.data.area) {
                    data.area = this.data.area
                }
                if (this.data.brand) {
                    data.brand = this.data.brand
                }
                if (this.data.school) {
                    data.school = this.data.school
                }

                if(this.month === new Date().getMonth()+1 && this.year === new Date().getFullYear()){
                    this.choosetime = true
                }

                AgentFeeReport(data).then(res => {
                    this.fee = res.data.data;
                    this.searchfee = res.data.data;
                    // console.log(this.fee);
                }).catch(() => {
                    throw new Error("异常!")
                })

                this.left()
                this.right()

                this.Cdate = false;
            },
            onCancel() {
                this.Caddress = false;
                this.HideBoxTitle= false
            },
            change(e) {
                console.log(e.getValues()) // 打印出了选中的时间，是个数组
            }
        }
    }
</script>

<style scoped>
    *{
        word-wrap:break-word
    }
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
        height: 0.24rem;
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
        border:none;
        line-height: 0.2rem;
        height:0.2rem
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
        border: solid #dcdcdc;
        border-width: 0 0.01rem 0.01rem 0;
    }
    .toptitle{
        height: 1rem;
        width: 0.4rem;
        border: solid 1px #dcdcdc;
        margin: 0.01rem;
    }
    .schoolname{
        width: 0.4rem;
        text-align: center;
        height: 1rem;
        float: left;
        margin: 0.01rem;
        border: solid 1px #dcdcdc;
    }
    .numberbox{
        line-height: 0.4rem;
        width: 0.4rem;
        height: 1rem;
        float: left;
        margin: 0.01rem;
        border: solid 1px #dcdcdc;
    }
    .personbox .one{
        line-height: 0.45rem;
        border: solid #dcdcdc;
        border-width: 0 0 0.01rem  0;
    }
    .address{
        /*height: 0.4rem;*/
    }
    .brand{
        border: solid 1px #dcdcdc;
        height: 1rem;
        width: 0.4rem;
        margin: 0.01rem;
    }
    .firaddress{
        border: solid 1px  #dcdcdc;
        height: 1rem;
        width: 0.4rem;
        margin: 0.01rem;
    }
    .hidebtn{
        margin: 0.1rem 0;
    }
    .DL{
        display: none;
    }
    .hidetitle{
        padding: 0.1rem;
        font-size: 0.14rem;
        text-align: center;
        color: #1989fa;
    }
    .none{
        text-align: center;
        width: 100%;
        float:left;
        line-height: 1rem;
    }
    .choosetime{
        display: none;
    }

</style>

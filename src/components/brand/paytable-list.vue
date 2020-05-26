<template>
    <div class="backgrouncolor">

        <div class="date_list">
            <i @click="left" class="van-icon van-icon-arrow-left van-cell__left-icon" is-link arrow-direction="left"><!----></i>
            <span @click="Cymonth" v-if="year && month"> {{year}}年{{month}}月账单  <i data-v-506ad3dd="" class="van-icon van-icon-arrow-down van-cell__right-icon"><!----></i></span>
            <i @click="right" data-v-506ad3dd="" class="van-icon van-icon-arrow van-cell__right-icon" :class="{choosetime:choosetime}"><!----></i>
        </div>

        <div style="height: 0.1rem;background-color:#F3F7F8 "></div>

        <div>
            <div class="top_search">
                <div class="left">
                    <div class="date_top_list">
                        <van-cell title="校区" is-link arrow-direction="down"  @click="showcho" />
                    </div>
                    <div class="search_div">
                        <div><input type="text" class="search" placeholder="请输入校区名称"  v-model='search'></div>
                        <div> <i class="van-icon van-icon-search"><!----></i></div>
                    </div>
                </div>
                <img :src="settingpic" @click="HideBox">
            </div>
        </div>

        <div>
            <div style="float:left;width: 3.55rem;overflow-x: scroll;margin: 0 0 0.1rem 0.1rem;border: solid 1px #dcdcdc;padding: 0.02rem">

                <div class="testsilder" style="width: 4rem">
                    <div style="float: left;width: 4rem">
                        <div  class="firsttoptitle  toptitle"  :class={DL:XQ}>
                            <span>校区</span>
                        </div>
                        <div  class="box toptitle"  :class={DL:PP}>
                            <span>类型</span>
                        </div>
                        <div  class="box toptitle" :class={DL:LS} >
                            <span>历史欠款</span>
                        </div>
                        <div  class="box toptitle"   :class={DL:LM} >
                            <span>上月应付</span>
                        </div>
                        <div  class="box toptitle"   :class={DL:AP} >
                            <span>合计应付</span>
                        </div>
                        <div  class="box toptitle"   :class={DL:TP} >
                            <span>本次支付</span>
                        </div>
                        <div  class="box toptitle"   :class={DL:TL} >
                            <span>本次结余</span>
                        </div>
                        <div  class="box toptitle lasttoptitle" :class={DL:CT} >
                            <span>操作</span>
                        </div>
                    </div>
                    <div v-if="searchData.length>0">

                               <div v-for="(itemfo,index) in searchData" :key="index" style="float: left;width: 4rem">
                                   <div class="firschoolname" :class={DL:XQ}> {{itemfo.schoolName}}</div>
                                   <div style="float:left;">
                                       <div class="typebox" :class={DL:PP}>{{itemfo.type}}</div>
                                       <div class="numberbox" :class={DL:LS}>{{itemfo.historyOverdraft}}</div>
                                       <div class="numberbox"  :class={DL:LM}>{{itemfo.lastMonthFee}}</div>
                                       <div class="numberbox" :class={DL:AP}>{{itemfo.totalFee}}</div>
                                       <div class="numberbox" :class={DL:TP}>{{itemfo.currentPay}}</div>
                                       <div class="numberbox" :class={DL:TL} >{{itemfo.surplus}}</div>
                                       <div class="numberbox lastnumberbox" v-if="itemfo.isStopServing==1" :class={DL:CT}>充值</div>
                                       <div class="numberbox lastnumberbox" v-else-if="itemfo.isStopServing==2" :class={DL:CT}>补交</div>
                                   </div>
                               </div>

                    </div>
                    <div class="notdate" v-else style="line-height: 1.2rem;text-align:center; border: solid #dcdcdc;
    border-width: 0 0.01rem 0.01rem 0.01rem;" >查无此校区（{{this.search}}）</div>

                </div>
            </div>
        </div>

        <van-popup v-model="Cdate" position="bottom" :overlay="true">
            <van-datetime-picker
                    :value="currentDate"
                    type="year-month"
                    :max-date="minDate"
                    :formatter="formatter"
                    @confirm="ondateConfirm"
                    @cancel="ondateCancel"
            />
        </van-popup>

        <van-popup v-model="Caddress" position="bottom" :overlay="true">
            <div style="font-size: 0.15rem;border-bottom: solid 1px #dcdcdc;line-height: 0.5rem;color: #1989fa;font-weight: 700" @click="reset()">点击此处返回今日所有数据</div>
            <van-picker
                    show-toolbar
                    title="请选择校区"
                    :columns="columnss"
                    @cancel="onCancel"
                    @confirm="onConfirm"

            />
        </van-popup>

        <van-popup v-model="HideBoxTitle" position="bottom" :overlay="true">
            <div style="text-align: left;padding: 0.1rem;font-size: 0.14rem;float: left;" @click="onCancel">返回</div>
            <div style="text-align: left;padding: 0.1rem;font-size: 0.14rem;text-align: center;text-align: center;color: #1989fa;">选择要隐藏的表头</div>
            <van-checkbox v-model="XQ" class="hidebtn">校区</van-checkbox>
            <van-checkbox v-model="PP" class="hidebtn">类型</van-checkbox>
            <van-checkbox v-model="LS" class="hidebtn">历史欠款</van-checkbox>
            <van-checkbox v-model="LM" class="hidebtn">上月应付</van-checkbox>
            <van-checkbox v-model="AP" class="hidebtn">合计应付</van-checkbox>
            <van-checkbox v-model="TP" class="hidebtn">本次支付</van-checkbox>
            <van-checkbox v-model="TL" class="hidebtn">本次结余</van-checkbox>
            <van-checkbox v-model="CT" class="hidebtn">操作</van-checkbox>
<!--            <van-checkbox v-model="DQ" class="hidebtn">地区</van-checkbox>-->
        </van-popup>

    </div>
</template>

<script>
    import { NavBar } from 'vant';
    import { Search } from 'vant';
    import { Cell, CellGroup,icon } from 'vant';
    import { Popup } from 'vant';
    import { Picker } from 'vant';
    import { DatetimePicker } from 'vant';
    import { brandFeeReport } from '@/api/brand/brand';
    import { Checkbox, CheckboxGroup } from 'vant';


    export default {
        name: "",
        porps:name,
        data(){
            return {
                fee:[],

                one:true,
                choosetime:true,

                search:'',
                show:true,
                columnss:[],
                showMonth: false,

                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                date:'',
                data:'',

                testtt:1231,

                Cdate: false,
                Caddress: false,

                minDate: new Date(),
                currentDate: new Date(),

                settingpic: require("../../assets/img/newconcept/settingse.png"),
                HideBoxTitle: false,
                DQ:false,
                PP:false,
                XQ:false,
                LS:false,
                LM:false,
                AP:false,
                TP:false,
                TL:false,
                CT:false,

                TitleName:''
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
        },
        mounted() {
            this.GetbrandFeeReport()
        },
        methods:{
            reset(){
                this.year = new Date().getFullYear()
                this.month = new Date().getMonth()+1
                this.data = ''
               this.GetbrandFeeReport()
            },
            HideBox(){
                this.HideBoxTitle= true
            },
            // 获取数据
            GetbrandFeeReport(){
                this.$loading();

                if(this.month<10 ){
                    this.date=this.year+'-'+'0'+this.month
                }else{
                    this.date=this.year+'-'+this.month
                }

                const data = {}
                if (this.date) {
                    data.date = this.date
                }

                brandFeeReport(data).then(res => {
                    this.$loadingHide();
                    if (res.status === 200) {
                        this.fee = res.data.data.school;
                        this.TitleName = res.data.data.brandName;
                    }
                    console.log(this.fee);
                }).catch(() => {
                    throw new Error("获取品牌（收费报表）数据异常!")
                })

                this.Caddress = false
            },

            left(){
                this.$loading();
                this.month-=1
                if(this.month<1){
                    this.month+=12
                    this.year-=1
                }

                if(this.month<10 ){
                    this.date=this.year+'-'+'0'+this.month
                }else{
                    this.date=this.year+'-'+this.month
                }

                const data = {}
                if (this.month) {
                    data.date = this.date
                }
                if (this.data) {
                    data.school = this.data
                }
                this.choosetime = false
                brandFeeReport(data).then(res => {
                    this.$loadingHide();
                    if (res.status === 200) {
                        this.fee = res.data.data.school;
                    }
                    // console.log(this.fee);
                }).catch(() => {
                    throw new Error("异常!")
                })

            },
            right(){
                this.$loading();
                this.month+=1
                if(this.month>12){
                    this.month-=12
                    this.year+=1
                }
                if(this.month<10 ){
                    this.date=this.year+'-'+'0'+this.month
                }else{
                    this.date=this.year+'-'+this.month
                }

                const data = {}
                if (this.month) {
                    data.date = this.date
                }
                if (this.data) {
                    data.school = this.data
                }
                if(this.year === new Date().getFullYear() && this.month === new Date().getMonth()+1 ){
                    this.choosetime = true
                }
                brandFeeReport(data).then(res => {
                    this.$loadingHide();
                    if (res.status === 200) {
                        this.fee = res.data.data.school;
                    }
                    // console.log(this.fee);
                }).catch(() => {
                    throw new Error("异常!")
                })
            },
            showcho(){
                var address= [];
                for (let ad of this.fee){
                    address.push(ad.schoolName)
                }
                this.columnss = address
                this.Caddress = true
            },
            // 校区选择
            onConfirm(val) {


                this.search = ''

                if(this.month<10 && this.month[0]!=0){
                    this.date=this.year+'-'+'0'+this.month
                }else{
                    this.date=this.year+'-'+this.month
                }


                const data = {}
                if (this.date) {
                    data.date = this.date
                }
                if (val) {
                    data.school = val
                }

                this.data = val
                brandFeeReport(data).then(res => {
                    this.fee = res.data.data.school;
                    // console.log(this.fee);
                }).catch(() => {
                    throw new Error("异常!")
                })
                this.Caddress = false;
            },
            ondateCancel() {
                this.Cdate = false;
            },
            // 时间 选择
            ondateConfirm(value) {
                this.$loading();
                var date = value;
                var m = date.getMonth() + 1;
                var d = date.getDate();
                this.year=date.getFullYear()
                this.month=m

                if (m >= 1 && m <= 9) {
                    m = "0" + m;
                }
                if (d >= 0 && d <= 9) {
                    d = "0" + d;
                }

                this.date = date.getFullYear() + "-" + m

                const data = {}
                if (this.month) {
                    data.date = this.date
                }
                if (this.data) {
                    data.school = this.data
                }

                if(this.year === new Date().getFullYear() && this.month === new Date().getMonth()+1){
                    this.choosetime = true
                }else{
                    this.choosetime = false
                }

                brandFeeReport(data).then(res => {
                    this.$loadingHide();
                    if (res.status === 200) {
                        this.fee = res.data.data.school;
                        this.searchfee = res.data.data;
                    }
                }).catch(() => {
                    throw new Error("异常!")
                })

                this.Cdate = false;
            },
            onCancel() {
                this.Caddress = false;
                this.HideBoxTitle= false
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
        margin:0.15rem;
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
        line-height: 0.2rem;
        border:solid 1px white;
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
        border-width: 0.01rem 0.01rem 0.01rem 0;
    }
    .toptitle{
        width: 0.4rem;
        border: solid 1px #dcdcdc;
        height: 0.45rem;
        margin: 0.01rem;
    }
    .firsttoptitle{
        width: 0.4rem;
        height: 0.45rem;
        float: left;
        border: solid 1px #dcdcdc;
        margin: 0.01rem;
    }
    .lasttoptitle{
        width: 0.65rem;
    }
    .firschoolname{
        width: 0.4rem;
        text-align: center;
        height: 1rem;
        float: left;
        margin: 0.01rem;
        border: solid 1px #dcdcdc;
    }
    .numberbox{
        width: 0.4rem;
        height: 1rem;
        float: left;
        border: solid 1px #dcdcdc;
        margin: 0.01rem;
    }
    .typebox{
        width: 0.4rem;
        height: 1rem;
        float: left;
        margin: 0.01rem;
        border: solid 1px #dcdcdc;
    }
    .lastnumberbox{
        width: 0.65rem;
    }
    .address{
        /*height: 0.4rem;*/
        line-height: 0.2rem;
    }
    .hidebtn{
        margin: 0.1rem 0;
    }
    .DL{
        display: none;
    }
    .choosetime{
        display: none;
    }
</style>

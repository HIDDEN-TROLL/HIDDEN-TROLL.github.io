<template>
    <div>
        <div class="backgroundcolor">

            <div class="date_top_list" >
                <div  style="line-height: 0.45rem;font-size: 0.15rem;text-align: center">
                    <span @click="getStuId()">{{schoolname}}
                    <i data-v-e71e25ae="" data-v-506ad3dd="" class="van-icon van-icon-arrow-down van-cell__right-icon"></i>
                    </span>
                </div>
            </div>

            <timelist  ref="mychild" ></timelist>

            <div class="bgc">
                <div class="date_list">
                    <i @click="left" class="van-icon van-icon-arrow-left van-cell__left-icon" is-link arrow-direction="left"><!----></i>
                    <span @click="Cymonth"> {{year}}年{{month}}月 <i data-v-506ad3dd="" class="van-icon van-icon-arrow-down van-cell__right-icon"><!----></i></span>
                    <i @click="right" data-v-506ad3dd="" class="van-icon van-icon-arrow van-cell__right-icon" :class="{choosetime:choosetime}"><!----></i>
                </div>

                <div class="titile_bottom"></div>

                <div class="flowermes f_mask giflower">
                    <div class="gi_div">
                        <div class="gi_l" >
                            <div>奖励红花</div>
                            <div class="g_flower">{{brokenline.rewardCount}}</div>
                        </div>
                        <div class="gi_r">
                            <div>扣除红花</div>
                            <div>{{brokenline.deductCount}}</div>
                        </div>
                    </div>
                </div>

                <div class="f_mask">
                    <div id="light" style="width: 3.74rem;height:2.4rem;">
                    </div>
                    <div class="lf_tab"><span>红花奖励统计图</span></div>
                </div>
                <div class="f_mask">
                    <div id="black" style="width: 3.74rem;height:2.4rem;">
                    </div>
                    <div class="lf_tab"><span>红花扣除统计图</span></div>
                </div>
                <div class="buttom"></div>
            </div>

            <thismonth ref="mychildse"  ></thismonth>

        </div>

        <van-popup v-model="Cdate" position="bottom" :overlay="true">
            <van-datetime-picker
                    v-model="currentDate"
                    type="year-month"
                    :max-date="minDate"
                    :formatter="formatter"
                    @cancel="ondateCancel"
                    @confirm="ondateConfirm"

            />
        </van-popup>

        <van-popup v-model="Gstuid" position="bottom" :overlay="true" style="height:4rem">
            <div style="border-bottom: solid 1px #eee;line-height: 0.6rem" class="schoollist">
                <div style="float:left;width: 50%;color: rgb(157, 157, 157);border-bottom: solid 1px rgb(157, 157, 157);" ><span @click="ondateCancel()">取消</span></div>
                <div style="width: 50%;color: #1989fa;float: left;border-bottom: solid 1px rgb(157, 157, 157);" @click="Allmes()">返回所有机构</div>
            </div>

            <div style="overflow: scroll;height: 3.4rem;text-align: left;width: 100%" >
                 <div class="schoollist"   v-for="(item,index) in schoollist" :key="index" @click="changeId(item.schoolId,item.schoolName)" >
                     {{item.schoolName}}
                 </div>
            </div>
        </van-popup>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { Popup } from 'vant';
    import { Picker } from 'vant';
    import { DatetimePicker } from 'vant';
    import { Cell, CellGroup } from 'vant';
    import timelist from './components/class-detail-box';
    import thismonth from './components/this-month';
    import echarts from 'echarts'
    import { BrokenlineDiagram } from '@/api/new-concept/new-concept';
    import { GetStudId } from '@/api/new-concept/new-concept';

    export default {
        data() {
            return {
                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                brokenline:[],
                deduct:[],
                reward:[],
                RewardDay:[],
                DeductDay:[],
                RewardNumber:[],
                DeductNumber:[],
                currentDate: new Date(),
                minDate: new Date(),

                Cdate: false,
                Gstuid:false,

                schoolId:0,
                type:1,

                schoollist:[],
                schoolname:'全部机构',

                ad:false,
                choosetime:true,

                gfnumber:[]

            }
        },

        components: {
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [DatetimePicker.name]: DatetimePicker,
            thismonth:thismonth,
            timelist:timelist
            //someComponent
        },
        methods: {
            changeId(id,name){
                this.Gstuid = false
                this.schoolId = id
                this.schoolname = name
                this.GetBrokenlineDiagram()
                this.$refs.mychild.parentHandleclick(id);
                this.$refs.mychildse.parentHandleclickse(id);
            },
            // 点击全部机构获取学校数据
            getStuId(){
                this.Gstuid = true
            },
            Allmes(){
                this.schoolId = 0
                this.GetBrokenlineDiagram()
                this.$refs.mychild.parentHandleclick(0);
                this.$refs.mychildse.parentHandleclickse(0);
                this.ondateCancel()
                this.schoolname = '全部机构'
            },
            // 切换上个月
            left(){
                this.month-=1
                if(this.month<1){
                    this.month+=12
                    this.year-=1
                }
                // var data = this.year+'-'+this.month
                this.choosetime = false
                this.GetBrokenlineDiagram()
            },
            // 切换下个月
            right(){
                this.month+=1
                if(this.month>12){
                    this.month-=12
                    this.year+=1
                }
                // var data = this.year+'-'+this.month
                if(this.month === new Date().getMonth()+1 && this.year === new Date().getFullYear()){
                    this.choosetime = true
                }
                this.GetBrokenlineDiagram()
            },
            // 获取页面数据
            GetBrokenlineDiagram(){
                // var data = this.year+"-"+this.month
                BrokenlineDiagram(this.schoolId,this.type,this.year,this.month).then(res => {
                    this.brokenline = res.data.data.safflower;
                    this.RewardDay = res.data.data.safflower.reward.day;
                    this.RewardNumber = res.data.data.safflower.reward.number;
                    this.DeductDay = res.data.data.safflower.deduct.day;
                    this.DeductNumber = res.data.data.safflower.deduct.number;
                    this.deduct = res.data.data.safflower.deduct;

                    var Gflower = echarts.init(document.getElementById('light'));
                    // 指定图表的配置项和数据
                    var Goption = {
                        grid: {
                            top:'15%',
                            bottom:'15%',
                            right: '15%',  //距离右侧边距
                        },
                        color: ['#DA0000'],
                        title: {
                            text: '',
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            textStyle:{
                                fontSize:12,
                                color:'#fff'
                            },
                            data:['']
                        },
//                    取消Y轴刻度值
                        xAxis: {
                            name:'日期',
                            splitLine:{
                                show:false
                            },
                            axisLine: {
                                lineStyle: {
                                    type: 'solid',
                                    color: '#BFBFBF',//左边线的颜色
                                    width:'1'//坐标线的宽度
                                }
                            },
                            data: this.RewardDay
                        },
                        yAxis: {
                            name:'奖励',
                            splitLine :{
                                lineStyle:{
                                    type:'dashed'
                                }
                            },
                            axisLabel: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    type: 'solid',
                                    color: '#BFBFBF',//左边线的颜色
                                    width:'1'//坐标线的宽度
                                }
                            },
                        },
                        series: [{
                            name: '销量',
                            type: 'bar',
                            data: this.RewardNumber,
                            itemStyle : {
                                normal : {
                                    label: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            color: '#DA0000'
                                        }
                                    }
                                },
                            },
                            barWidth : 23
                        }],
                        dataZoom: [//给x轴设置滚动条
                            //下面这个属性是里面拖到
                            {
                                type: 'inside',
                                show: true,
                                xAxisIndex: [0],
                                startValue:0,
                                endValue:6
                            },
                        ],
                    };
                    //另一个图表--------------------------------------------------------------------------
                    var Lflower = echarts.init(document.getElementById('black'));
                    var Boption = {
                        grid: {
                            top:'15%',
                            bottom:'15%',
                            right: '15%',  //距离右侧边距
                        },
                        color: ['#999999'],
                        title: {
                            text: '',
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            textStyle:{
                                fontSize:12,
                                color:'#fff'
                            },
                            data:['']
                        },
//                    取消Y轴刻度值
                        xAxis: {
                            name:'日期',
                            splitLine:{
                                show:false
                            },
                            axisLine: {
                                lineStyle: {
                                    type: 'solid',
                                    color: '#BFBFBF',//左边线的颜色
                                    width:'1'//坐标线的宽度
                                }
                            },
                            data: this.DeductDay
                        },
                        yAxis: {
                            name:'扣除',
                            splitLine :{
                                lineStyle:{
                                    type:'dashed'
                                }
                            },
                            axisLabel: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    type: 'solid',
                                    color: '#BFBFBF',//左边线的颜色
                                    width:'1'//坐标线的宽度
                                }
                            },
                        },
                        series: [{
                            name: '销量',
                            type: 'bar',
                            data:  this.DeductNumber,
                            itemStyle : {
                                normal : {
                                    label: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            color: '##999999'
                                        }
                                    }
                                },
                            },
                            barWidth : 23
                        }],
                        dataZoom: [//给x轴设置滚动条
                            //下面这个属性是里面拖到
                            {
                                type: 'inside',
                                show: true,
                                xAxisIndex: [0],
                                startValue:0,
                                endValue:6
                            },
                        ],
                    };
                    // 使用刚指定的配置项和数据显示图表。
                    Gflower.setOption(Goption);
                    Lflower.setOption(Boption);
                }).catch(() => {
                    throw new Error("获取红花统计图异常!")
                })
            },
            GetStuList(){
                GetStudId().then(res => {
                    this.schoollist = res.data.data;
                }).catch(() => {
                    throw new Error("获取全部机构列表异常!")
                })
            },
            Cymonth(){
                this.Cdate = true
            },
            // 弹出层选择日期
            ondateConfirm(value) {
                var timer = value;
                var y = timer.getFullYear();
                var m = timer.getMonth() + 1;
                this.year = y
                this.month = m
                    if (m >= 1 && m <= 9) {
                        m = "0" + m;
                    }
                if(this.month === new Date().getMonth()+1 && this.year === new Date().getFullYear()){
                    this.choosetime = true
                }else{
                    this.choosetime = false
                }
               this.GetBrokenlineDiagram()
                this.Cdate = false;
            },
            ondateCancel() {
                this.Cdate = false;
                this.Gstuid = false;
            },
            // 弹出层时间配置
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            },
        },
        mounted(){
            this.GetBrokenlineDiagram()
            this.GetStuList()
        },
       }
</script>

<style scoped>
    .date_top_list{
        width:100%;
        background-color: white;
    }
    .date_top_list>>>.van-cell{
       line-height: 0.45rem;
    }
    .date_top_list>>>.van-icon{
       line-height: 0.45rem;
    }
    .van-cell__title{
        color:#666666;
        text-align: center;
    }
    .van-cell  {
        margin:0 auto;
        width:1rem;
        padding: 0.15rem 0;
    }
    .date_message{
        border: solid white;
        background-color: white;
        margin-top:0.1rem;
    }
    .date_message_center{
        margin:0.1rem auto;
        width: 2.3rem;
        height: 0.3rem;
    }
    .leftcli{
        float: left;
        width:0.24rem;
        height:0.24rem;
    }
    .leftcli img {
        width: 0.24rem;
        height:0.24rem;
        float: left;
    }
    .middate{
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.2rem;
        float: left;
        padding: 0 0.3rem;
    }
    .backgroundcolor{
        height:100%;
        background-color: #F3F7F8;
    }

    .bgc{
        margin-top:0.1rem;
        background-color: white;
    }
    .buttom{
        height:0.2rem;
        background-color: white;
    }
    #light, #black{
        background-color: white;
    }
    .flowermes{
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.2rem;
    }
    .f_mask{
        background-color: white;
    }
    .lf_tab{
        text-align: center;
        background-color: white;
        margin: 0 auto;
        width: 1rem;
        height:0.2rem;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.2rem;
    }
    .giflower{
        margin-top:0.1rem;
    }
    .gi_div{
        margin: 0 auto;
        width: 50%;
        height: 0.5rem;
    }
    .gi_l{
        text-align: center;;
        float: left;
    }
    .gi_r{
        text-align: center;;
        float: right;
    }
    .g_flower{
        color: #D80000;
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
    }
    .titile_bottom{
        width:90%;
        margin:0 auto;
        border-bottom: 0.02rem solid #eee;
    }
    .date_list{
        height: 0.5rem;
        text-align: center;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.5rem
    }
    .date_list span{
        margin: 0 0.4rem;
    }
    .schoollist{
        font-size: 0.15rem;
        line-height: 0.4rem;
        border-bottom: solid 1px;
        text-align: center;
        border-bottom: 0.01rem solid #eee;
    }
    .ad{
        font-weight: 700;
        background: aliceblue;
    }
    .choosetime{
        display: none;
    }

</style>

<template>
    <div class="month" >
        <div class="date_list">
            <i @click="left" class="van-icon van-icon-arrow-left van-cell__left-icon" is-link arrow-direction="left"><!----></i>
            <span @click="Cymonth">{{year}}年{{month}}月  <i data-v-506ad3dd="" class="van-icon van-icon-arrow-down van-cell__right-icon"><!----></i></span>
            <i @click="right" data-v-506ad3dd="" class="van-icon van-icon-arrow van-cell__right-icon" :class="{choosetime:choosetime}"><!----></i>
        </div>

        <div class="titile_bottom"></div>

        <div class="month_list_first">
            <div class="flowermes f_mask">
                <div class="gi_f">
                    <div>本月使用作业功能的次数</div>
                    <div>{{WNumber}}</div>
                </div>
            </div>
            <div class="f_mask">
                <div id="fir" style="width: 3.74rem;height:2.4rem;"></div>
            </div>
            <div class="b_hr"></div>
        </div>

        <div class="month_list">
            <div class="flowermes f_mask">
                <div class="gi_s">
                    <div>本月录入成绩的次数</div>
                    <div>{{SNumber}}</div>
                </div>
            </div>
            <div class="f_mask">
                <div id="sec" style="width: 3.74rem;height:2.4rem;"></div>
            </div>
            <div class="b_hr"></div>
        </div>

        <div class="month_list">
            <div class="flowermes f_mask">
                <div class="gi_t">
                    <div>本月发布的社区</div>
                    <div>{{CNumber}}</div>
                </div>
            </div>
            <div class="f_mask">
                <div id="thi" style="width: 3.74rem;height:2.4rem;">
                </div>
            </div>
        </div>

        <van-popup v-model="Cdate" position="bottom" :overlay="true">
            <van-datetime-picker
                    v-model="currentDate"
                    type="year-month"
                    :max-date="maxDate"
                    :formatter="formatter"
                    @cancel="ondateCancel"
                    @confirm="ondateConfirm"

            />
        </van-popup>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { Popup } from 'vant';
    import { Picker } from 'vant';
    import { DatetimePicker } from 'vant';
    import echarts from 'echarts';
    import { Cell, CellGroup } from 'vant'
    import { BrokenlineDiagram } from '@/api/new-concept/new-concept';

    //import someComponent from './someComponent'
    export default {
        name: "",
        data(){
            return {
                schoolId:0,
                type:2,

                year:new Date().getFullYear(),
                month:new Date().getMonth()+1,
                date:'',

                changedate:'',

                work:[],
                workday:[],
                worknumber:[],
                community:[],
                communityday:[],
                communitynumber:[],
                score:[],
                scoreday:[],
                scorenumber:[],

                currentDate: new Date(),
                maxDate: new Date(),

                Cdate: false,

                WNumber:'',
                CNumber:'',
                SNumber:'',

                choosetime:true
            }
        },
        components: {
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [DatetimePicker.name]: DatetimePicker,
            //someComponent
        },
        methods:{
            parentHandleclickse(e) {
                this.schoolId = e
                this.GetBrokenlineDiagram()
            },
            left(){
                this.month-=1
                if(this.month<1){
                    this.month+=12
                    this.year-=1
                }
                this.date = this.year+'-'+this.month
                this.choosetime = false
                this.GetBrokenlineDiagram()
            },
            right(){
                this.month+=1
                if(this.month>12){
                    this.month-=12
                    this.year+=1
                }
                this.date = this.year+'-'+this.month
                if(this.month === new Date().getMonth()+1 && this.year === new Date().getFullYear()){
                    this.choosetime = true
                }
                this.GetBrokenlineDiagram()
            },
            computedDate(type){
                let date = new Date(this.changedate);
                date.setDate(type === 1 ? date.getDate() - 1 : date.getDate() + 1);
                this.changedate = date.getFullYear() +"."+ (date.getMonth()+1) +"."+ date.getDate();
            },
            GetBrokenlineDiagram(){
                BrokenlineDiagram(this.schoolId,this.type,this.year,this.month).then(res => {
                    this.work = res.data.data.work;
                    this.workday = res.data.data.work.day;
                    this.worknumber = res.data.data.work.number;
                    this.score = res.data.data.score;
                    this.scoreday = res.data.data.score.day;
                    this.scorenumber = res.data.data.score.number;
                    this.community = res.data.data.community;
                    this.communityday = res.data.data.community.day;
                    this.communitynumber = res.data.data.community.number;
                    // console.log(this.community);
                    var workn = 0;
                    this.worknumber.forEach((item) => {
                        workn += item;
                    });
                    this.WNumber = workn;

                    var communityn = 0;
                    this.communitynumber.forEach((item) => {
                        communityn += item;
                    });
                    this.CNumber = communityn;

                    var scoren = 0;
                    this.scorenumber.forEach((item) => {
                        scoren += item;
                    });
                    this.SNumber = scoren;
                    // 基于准备好的dom，初始化echarts实例
                    var Lflower = echarts.init(document.getElementById('fir'));
                    var Bflower = echarts.init(document.getElementById('sec'));
                    var Cflower = echarts.init(document.getElementById('thi'));
                    // 指定图表的配置项和数据
                    var option = {
                        grid: {

                            top:'15%',
                            bottom:'15%',
                            right: '15%',  //距离右侧边距
                        },
                        color: ['#3770FB'],
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
                            data: this.workday
                        },
                        yAxis: {
                            name:'次数',
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
                            type: 'line',
                            data: this.worknumber,
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
//第二个折线图表--------------------------------------------------------------------------
                    var Boption = {
                        grid: {

                            top:'15%',
                            bottom:'15%',
                            right: '15%',  //距离右侧边距
                        },
                        color: ['#52C9C4'],
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
                            data: this.scoreday
                        },
                        yAxis: {
                            name:'数量',
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
                            type: 'line',
                            data: this.scorenumber,
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
//第三个折线图表----------------------------------------------------------
                    var Coption = {
                        grid: {
                            top:'15%',
                            bottom:'15%',
                            right: '15%',  //距离右侧边距
                        },
                        color: ['#F6A500'],
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
                            data: this.communityday
                        },
                        yAxis: {
                            name:'数量',
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
                            type: 'line',
                            data: this.communitynumber,
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
                    Lflower.setOption(option);
                    Bflower.setOption(Boption);
                    Cflower.setOption(Coption);
                }).catch(() => {
                    throw new Error("社区/作业/成绩统计图获取数据异常!")
                })
            },
            Cymonth(){
                this.Cdate = true
            },
            ondateConfirm(value) {
                var timer = value;
                var y = timer.getFullYear();
                var m = timer.getMonth() + 1;
                this.year = y
                this.month = m
                if (m >= 1 && m <= 9) {
                    m = "0" + m;
                }
                var date = y + "-" + m

                this.date = date

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
            },
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            },
        },
        created(){
            //获取初始时间
            if (this.$route.params.date){
                this.changedate = this.$route.params.date
            }else {
                let date = new Date();
                date.setDate(date.getDate());
                this.changedate = date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate() ;
            }
        },
        mounted() {
            this.date = this.year+'-'+this.month

            this.GetBrokenlineDiagram()



        },
    }

</script>

<style scoped>
    .month{
        margin-top:0.1rem;
    }
    .month_list{
        margin-top:0.2rem;
    }
    .month_top{
        height:0.2rem;
        background-color: white;
    }
    .month{
        background-color: white;
    }
    .month_list_first{
        margin-top:0.2rem;
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
    .b_hr{
        margin:0 auto;
        width:90%;
        border:solid 0.01rem #EEEEEE;
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
    .gi_div{
        margin: 0 auto;
        width: 50%;
        height: 0.6rem;
    }
    .gi_f{
        color: #3770FB;
        text-align: center;
    }
    .gi_s{
        color:  #52C9C4;
        text-align: center;
    }
    .gi_t{
        color:  #F6A500;
        text-align: center;
    }


    .top_list{
        font-size: 0 ;
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
    .choosetime{
        display: none;
    }
</style>

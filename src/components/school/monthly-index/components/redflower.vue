<template>
    <div class="body" >
        <div class="ach_div_mar">
            <div class="ach_div">
                <div class="number">为   <span class="stu_number">{{safflowerse.stuCount}}</span>    名学生记录日常表现共     <span class="stu_number">{{safflowerse.number}}</span>     次</div>
                <div class="students_div">
                    <div class="students">
                        <div class="tab_list">
                            <div class="tab_mar">
                                <div class="Ytap_title">有记录学生</div>
                                <div class="Ytap"></div>
                            </div>
                        </div>
                        <div class="tab_list">
                            <div class="tab_mar">
                                <div class="Ntap_title">无记录学生</div>
                                <div class="Ntap"></div>
                            </div>
                        </div>
                    </div>
                    <div class="echarts" id="restudents" :style="{width: '2rem', height: '1.2rem'}" >
                    </div>
                </div>

                <div class="ac_line"><hr></div>

                <div id="allregister" style="width: 3.5rem;height:2.2rem;"></div>
            </div>
        </div>

        <div class="get_loss_div">
            <div class="GandL_div">
                <div class="get_number_div">奖励<span class="get_bumber">{{get}}</span>朵红花</div>
                <div id="get" style="width: 3.5rem;height:2.2rem;"></div>

                <div class="ac_line"><hr></div>

                <div class="loss_number_div">扣除<span class="loss_number">{{loss}}</span>朵红花</div>
                <div id="loss" style="width: 3.5rem;height:2.2rem;"></div>
            </div>
        </div>

        <div class="Gift_div">
            <div>
                <div class="gift_div_mar">
                    <div class="gift_div">
                        <div class="number">有   <span class="stu_number">{{safflowerse.convertStuCount}}</span>    名学生兑换奖品   <span class="stu_number">{{safflowerse.convertNumber}}</span>    次</div>
                        <div class="students_div">
                            <div class="students">
                                <div class="tab_list">
                                    <div class="tab_mar">
                                        <div class="Ytap_title">有兑奖学生</div>
                                        <div class="Ytap"></div>
                                    </div>
                                </div>
                                <div class="tab_list">
                                    <div class="tab_mar">
                                        <div class="Ntap_title">无兑奖学生</div>
                                        <div class="Ntap"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="echartsse" id="gift" :style="{width: '2rem', height: '1.2rem'}">
                            </div>
                        </div>

                        <div class="ac_line"><hr></div>

                        <div id="exchangetimes" style="width: 3.5rem;height:2.2rem;"></div>

                    </div>
                </div>
            </div>
        </div>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import echarts from 'echarts'
    import { TeacherMes } from '@/api/school/monthly-index'
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                date:this.$route.query.date,
                uid:this.$route.query.uid,
                community:'',

                safflowerse:[],
                SafflowerBarChart:[],
                numberData:[],
                rewardData:[],
                deductData:[],
                convertBarChart:[],
                unExistStuCount:'',
                existStuCount:'',
                unexistConvertStuCount:'',
                existConvertStuCount:'',

                get:'',
                loss:'',
            }
        },
        components: {
        },
        methods:{
            Getteachermes(){
                TeacherMes(this.uid,this.date)
                    .then(res => {
                        var datefir = res.data.data.safflower.unExistStuCount;
                        var datese = res.data.data.safflower.existStuCount;

                        var datath = res.data.data.safflower.existConvertStuCount;
                        var datafo = res.data.data.safflower.unexistConvertStuCount;

                        this.safflowerse = res.data.data.safflower;
                        this.SafflowerBarChart = res.data.data.safflower.barChart;

                        this.convertBarChart = res.data.data.safflower.convertBarChart;

                        this.numberData = res.data.data.safflower.barChart.numberData;
                        this.rewardData = res.data.data.safflower.barChart.rewardData;
                        this.deductData = res.data.data.safflower.barChart.deductData;

                        // 记录次数圆形统计图-------------------------------------
                        var timesdate= [];
                        for (let td of this.numberData){
                            timesdate.push(td.date)
                        }
                        var timesvalue= [];
                        for (let tv of this.numberData){
                            timesvalue.push(tv.value)
                        }
                        // 基于准备好的dom，初始化echarts实例
                        var Record = echarts.init(document.getElementById('allregister'));
                        // var Bflower = echarts.init(document.getElementById('black'));
                        // 指定图表的配置项和数据
                        var Recordoption = {
                            grid: {
                                top:'15%',
                                bottom:'15%',
                                left:'5%',
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
                                data: timesdate
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
                                name: '次数',
                                type: 'bar',
                                data: timesvalue,
                                itemStyle : {
                                    normal : {
                                        label: {
                                            show: true,
                                            position: 'top',
                                            textStyle: {
                                                color: '#3770FB'
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
//        另一个--------------------------------------------------------------------------
                        var gflowersdate= [];
                        for (let gfd of this.rewardData){
                            gflowersdate.push(gfd.date)
                        }
                        var gflowersvalue= [];
                        for (let gfv of this.rewardData){
                            gflowersvalue.push(gfv.value)
                        }

                        var lflowersdate= [];
                        for (let lfd of this.deductData){
                            lflowersdate.push(lfd.date)
                        }
                        var lflowersvalue= [];
                        for (let lfv of this.deductData){
                            lflowersvalue.push(lfv.value)
                        }

                        var exdate= [];
                        for (let ed of this.convertBarChart){
                            exdate.push(ed.date)
                        }
                        var exvalue= [];
                        for (let ev of this.convertBarChart){
                            exvalue.push(ev.value)
                        }


                        var Lflower = echarts.init(document.getElementById('get'));
                        var Rflower = echarts.init(document.getElementById('loss'));
                        // var Bflower = echarts.init(document.getElementById('black'));
                        // 指定图表的配置项和数据
                        var option = {
                            grid: {
                                top:'15%',
                                bottom:'15%',
                                left:'5%',
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
                                data: gflowersdate
                            },
                            yAxis: {
                                name:'朵',
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
                                name: '朵',
                                type: 'bar',
                                data: gflowersvalue,
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

                        var lossflower = {
                            grid: {
                                top:'15%',
                                bottom:'15%',
                                left:'5%',
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
                                data:lflowersdate
                            },
                            yAxis: {
                                name:'朵',
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
                                name: '朵',
                                type: 'bar',
                                data: lflowersvalue,
                                itemStyle : {
                                    normal : {
                                        label: {
                                            show: true,
                                            position: 'top',
                                            textStyle: {
                                                color: '#999999'
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

                        //   // 使用刚指定的配置项和数据显示图表。

                        // 基于准备好的dom，初始化echarts实例
                        var Exchangetimes = echarts.init(document.getElementById('exchangetimes'));
                        // var Bflower = echarts.init(document.getElementById('black'));
                        // 指定图表的配置项和数据
                        var Exchangetimesoption = {
                            grid: {
                                top:'15%',
                                bottom:'15%',
                                left:'5%',
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
                                data: exdate
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
                                type: 'bar',
                                data: exvalue,
                                itemStyle : {
                                    normal : {
                                        label: {
                                            show: true,
                                            position: 'top',
                                            textStyle: {
                                                color: '#3770FB'
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
//        另一个--------------------------------------------------------------------------
                        // 使用刚指定的配置项和数据显示图表。
                        Exchangetimes.setOption(Exchangetimesoption);
                        Lflower.setOption(option);
                        Rflower.setOption(lossflower);
                        Record.setOption(Recordoption);

                        var get = 0;
                        this.rewardData.forEach((item) => {
                            get += item.value;
                        });
                        this.get = get;

                        var loss = 0;
                        this.deductData.forEach((item) => {
                            loss += item.value;
                        });
                        this.loss = loss;

                        var bread = document.getElementById('restudents');
                        let myChart = this.echarts.init(bread);
                        myChart.setOption({
                            color:[ '#1890FF','#84C225'],
                            series: [{
                                name:'记录表现',
                                type: 'pie',
                                radius: '70%',
                                center: ['50% ', ' 50%','',''],
                                // 设置值域的那指向线
                                labelLine: {
                                    normal: {
                                        length: 0,  // 改变标示线的长度
                                        show: false,   // show设置线是否显示，默认为true，可选值：true ¦ false
                                    },
                                },
                                // 设置值域的标签
                                label: {
                                    normal: {
                                        position: 'outside',
                                        formatter: '{d}%' +'\n'+ '{c}人' ,
                                    },
                                    align: 'right',
                                    lineHeight: 17,
                                },
                                data: [
                                    {
                                        value: datefir
                                    },
                                    {
                                        value: datese
                                    },

                                    // {
                                    //     value: 121,
                                    //     /*color:'#2FC25B'*/
                                    // },
                                    // {
                                    //     value:20,
                                    //     /*color:'#1890FF'*/
                                    // },
                                ],
                            }]
                        })

                        var breadse = document.getElementById('gift');
                        var giftex = this.echarts.init(breadse);
                        // 绘制图表
                        giftex.setOption({
                            color:[ '#1890FF','#84C225'],
                            series: [{
                                name:'兑换奖品',
                                type: 'pie',
                                radius: '70%',
                                center: ['50% ', ' 50%','',''],
                                // 设置值域的那指向线
                                labelLine: {
                                    normal: {
                                        length: 0,  // 改变标示线的长度
                                        show: false,   // show设置线是否显示，默认为true，可选值：true ¦ false
                                    },
                                },
                                // 设置值域的标签
                                label: {
                                    normal: {
                                        position: 'outside',
                                        formatter: '{d}%' +'\n'+ '{c}人' ,
                                    },
                                    align: 'right',
                                    lineHeight: 17,
                                },
                                data: [
                                    {
                                        value: datath
                                        /*color:'#2FC25B'*/
                                    },
                                    {
                                        value: datafo
                                        /*color:'#1890FF'*/
                                    },
                                ],
                            }]
                        })

                        console.log(this.safflowerse)
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },
        },

        mounted() {
            this.Getteachermes()
        },

    }
</script>

<style scoped>
    .body{
        background-color: #F3F7F8;
    }
    *{
        font-size: 0.14rem;
    }
    hr{
        color: #EEEEEE;
        border:solid 1px  #EEEEEE;
    }
    .number{

    }
    .stu_number{
        color:#84C225 ;
    }
    .students{
        margin: 0.2rem 0;
        float:left;
    }
    .students_div{
        margin-top: 0.1rem;
    }
    .echarts{
        margin-left:1.5rem;
    }
    .echartsse{
        margin-left:1.5rem;
    }
    .Ytap_title{
        float: left;
    }
    .Ytap{
        margin: 0.03rem;
        background-color: #3770FB;
        float: left;
        width: 0.45rem;
        height: 0.15rem;
    }
    .Ntap_title{
        float: left;
    }
    .Ntap{
        margin: 0.03rem;
        background-color: #84C225;
        float: left;
        width: 0.45rem;
        height: 0.15rem;
    }
    .tab_list{
        /*margin: 0.15rem 0;*/
    }
    .tab_mar{
        color: #999999;
        float: left;
        margin: 0.1rem 0;
    }
    .ach_div_mar{
        width: 100%;
        background-color: white;
    }
    .ach_div{
        background-color: white;
        margin: 0.15rem 0.15rem 0 0.15rem;
    }


    .get_loss_div{
        background-color:white;
        margin-top: 0.1rem;
    }
    .Gift_div{
        margin-top: 0.1rem;
    }

    /*//================GANL样式=*/

    .ac_line hr{
        color:#EEEEEE;
        border: solid 1px #EEEEEE;
    }
    .GandL_div{
        padding: 0.15rem ;
    }
    .get_bumber{
        color: #DA0000;
        font-size: 0.16rem;
    }
    .loss_number{
        color: #999999;
        font-size: 0.16rem;
    }
    .get_number_div{
        margin: 0.15rem 0;
    }
    .loss_number_div{
        margin: 0.15rem 0;
    }
    /*//================GANL样式=*/
    .gift_div_mar{
        width: 100%;
        background-color: white;
    }
    .gift_div{
        background-color: white;
        padding: 0.15rem 0.15rem 0 0.15rem;
    }

</style>

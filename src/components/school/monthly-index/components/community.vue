<template>
    <div class="body">

        <div class="ach_div_mar">
            <div class="ach_div">
                <div class="number">发布   <span class="stu_number">{{community.count}}</span>    条家长互动社区</div>

                <div id="communitytop" style="width: 3.5rem;height:2.2rem;"></div>
            </div>
        </div>

        <div class="ach_div_mar">
            <div class="ach_div">
                <div class="number">共获   <span class="stu_number">{{community.likeCount}}</span>    位家长点赞</div>
                <div class="students_div">
                    <div class="students">
                        <div class="tab_list">
                            <div class="tab_mar">
                                <div class="Ytap_title">有点赞家长</div>
                                <div class="Ytap"></div>
                            </div>
                        </div>
                        <div class="tab_list">
                            <div class="tab_mar">
                                <div class="Ntap_title">无点赞家长</div>
                                <div class="Ntap"></div>
                            </div>
                        </div>
                    </div>
                    <div class="echarts" id="communityf" :style="{width: '2rem', height: '1.2rem'}">
                    </div>
                </div>

                <div class="ac_line"><hr></div>

                <div class="nice">共获点赞   <span class="stu_number">{{community.likeNumber}}</span>    个</div>


                <div id="communityse" style="width: 3.5rem;height:2.2rem;"></div>
            </div>
        </div>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>

    import echarts from 'echarts'
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                testlist:[
                    {name:'12'},
                    {name:'13'},
                    {name:'123'},
                    ],
                students:'0',
                register:'0',
                habitSituation:[
                    {
                        value: this.community.existLikeCount,
                        /*color:'#2FC25B'*/
                    },
                    {
                        value:this.community.unexistLikeCount,
                        /*color:'#1890FF'*/
                    },
                ],
                msg: "Hello Vue.js"
            }
        },
        components: {

            //someComponent
        },
        methods:{

        },
        props:{
            community:{
                type:Array.Object
            }
        },
        mounted() {

            let communityf = document.getElementById('communityf');
            let Communityf = this.echarts.init(communityf);
            // 绘制图表
            Communityf.setOption({
                color:[ '#1890FF','#84C225'],
                series: [{
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
                    data: this.habitSituation
                }]
            })
// /获取点赞次数及日期
            var liketimes= [];
            for (let lt of this.community.barChartLike) {
                liketimes.push(lt.date)
            }
            // console.log(liketimes)

            var likedate= [];
            for (let ld of this.community.barChartLike) {
                likedate.push(ld.value)
            }
            // console.log(likedate)
            // 基于准备好的dom，初始化echarts实例

            var Communityse = echarts.init(document.getElementById('communityse'));
            var Communitytop = echarts.init(document.getElementById('communitytop'));
            // var Bflower = echarts.init(document.getElementById('black'));
            // 指定图表的配置项和数据
            var Communityseop = {
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
                    data: liketimes
                },
                yAxis: {
                    name:'个',
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
                    data: likedate,
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
            var datelist= [];
            for (let cd of this.community.barChart) {
                datelist.push(cd.date)
            }

            var valuelist= [];
            for (let cv of this.community.barChart) {
                valuelist.push(cv.value)
            }

            var Communitytopop = {
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
                    data:  datelist
                    // data: ['2','2','2','2','2','2','2','2','2','2',]
                },
                yAxis: {
                    name:'条',
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
                    name: '发布条数',
                    type: 'bar',
                    data: valuelist,
                    // data: [1,2.3,4,5,6,7,8,9,10,12],
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

                    {
                        type: 'inside',
                        show: true,
                        xAxisIndex: [0],
                        // start: 0,//默认为1
                        // end: 50
                        startValue:0,
                        endValue:6
                    },
                ],
            };
            // 使用刚指定的配置项和数据显示图表。
            Communityse.setOption(Communityseop);
            Communitytop.setOption(Communitytopop);

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
        margin-bottom: 0.15rem;
    }
    .nice{
        margin: 0.15rem 0;
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
    .ach_div_mar:nth-child(2){
        margin-top: 0.1rem;
    }
    .ach_div{
        background-color: white;
        padding: 0.15rem 0.15rem 0 0.15rem;
    }
    .register{
        margin-top: 0.1rem;
    }


    .get_loss_div{
        background-color:white;
        margin-top: 0.1rem;
    }
    .Gift_div{
        margin-top: 0.1rem;
    }
</style>

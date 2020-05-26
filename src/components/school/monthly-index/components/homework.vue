<template>
    <div class="body">
        <div class="ach_div_mar">
            <div class="ach_div">
                <div class="number">检查   <span class="stu_number">{{work.completeStuCount}}</span>    名学生完成作业，共记完成     <span class="stu_number">{{work.completeNumber}}</span>     次</div>
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
                    <div class="echarts" id="homework" :style="{width: '2rem', height: '1.2rem'}">
                    </div>
                </div>
                <div class="ac_line"><hr></div>
                <div id="homewotk_times" style="width: 3.5rem;height:2.2rem;"></div>
            </div>
        </div>


        <div class="ach_div_mar">
            <div class="ach_div">
                <div class="number">为   <span class="stu_number">{{work.detailedStucount}}</span>    名学生录入作业详情，共记数     <span class="stu_number">{{work.detailedNumber}}</span>     次</div>
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
                    <div class="echarts" id="homework_se" :style="{width: '2rem', height: '1.2rem'}">
                    </div>
                </div>
                <div class="ac_line"><hr></div>
                <div id="homewotk_times_se" style="width: 3.5rem;height:2.2rem;"></div>
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
                students:'23',
                times:'25',
                register:'0',
                habitSituation:[
                    {
                        value: this.work.existCompleteStuCount,
                        /*color:'#2FC25B'*/
                    },
                    {
                        value: this.work.unexistCompleteStuCount,
                        /*color:'#1890FF'*/
                    },
                ],
                habitSituationse:[
                    {
                        value: this.work.existDetailedStuCount,
                        /*color:'#2FC25B'*/
                    },
                    {
                        value: this.work.unexistDetailedStuCount,
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
            work:{
                type:Array.Object
            },
        },
        mounted() {

            var checkdate= [];
            for (let lt of this.work.completeBarChart) {
                checkdate.push(lt.date)
            }

            var checkvalue= [];
            for (let lt of this.work.completeBarChart) {
                checkvalue.push(lt.value)
            }

            var signdate= [];
            for (let lt of this.work.detailedBarChart) {
                signdate.push(lt.date)
            }

            var signvalue= [];
            for (let lt of this.work.detailedBarChart) {
                signvalue.push(lt.value)
            }


            let bread = document.getElementById('homework');
            let homelist_f = document.getElementById('homework_se');
            let myChart = this.echarts.init(bread);
            let Homelist_f = this.echarts.init(homelist_f);
            // 绘制图表
            myChart.setOption({
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
            });
            Homelist_f.setOption({
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
                    data: this.habitSituationse
                }]
            })

            // 基于准备好的dom，初始化echarts实例
            var Lflower = echarts.init(document.getElementById('homewotk_times'));
            var Times = echarts.init(document.getElementById('homewotk_times_se'));
            // var Bflower = echarts.init(document.getElementById('black'));
            // 指定图表的配置项和数据
            var option = {
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
                    data: checkdate
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
                    data: checkvalue,
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

            var timelist = {
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
                    data: signdate
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
                    data: signvalue,
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
            Lflower.setOption(option);
            Times.setOption(timelist);

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



</style>

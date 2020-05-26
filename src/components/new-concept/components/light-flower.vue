<template>
    <div class="bgc">
        <div class="date_list">
            <i  class="van-icon van-icon-arrow-left van-cell__left-icon" is-link arrow-direction="left"><!----></i>
            <span> 2019年2月账单  <i data-v-506ad3dd="" class="van-icon van-icon-arrow-down van-cell__right-icon"><!----></i></span>
            <i data-v-506ad3dd="" class="van-icon van-icon-arrow van-cell__right-icon"><!----></i>
        </div>

        <div class="titile_bottom"></div>

        <div class="flowermes f_mask giflower">
            <div class="gi_div">
                <div class="gi_l" @click="show">
                    <div>奖励红花</div>
                    <div class="g_flower">{{brokenline.rewardCount}}</div>
                    <!--<div class="g_flower">123</div>-->
                </div>
                <div class="gi_r">
                    <div>扣除红花</div>
                    <div>{{brokenline.deductCount}}</div>
                    <!--<div>{123</div>-->
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
    <!--<someComponent></someComponent>-->
</template>

<script>
    import echarts from 'echarts'

    import { Cell } from 'vant';
    //import someComponent from './someComponent'
    export default {
        name: "",
        data(){
            return {
                msg: "Hello Vue.js"
            }
        },
        props:{
            brokenline:{
                type:Array.Object
            }
        },
        components: {
            [Cell.name]:Cell,
            //someComponent
        },
        methods:{
          show(){
              console.log(this.brokenline);

          }
        },
        created(){
            console.log(this.brokenline);

        },
        mounted() {
                var gfday= [];
                for (let gfd of this.brokenline.reward){
                    gfday.push(gfd.day)
                    console.log(gfday)

                }

                var gfnumber= [];
                for (let gfn of this.brokenline.reward){
                    gfnumber.push(gfn.number)
                    console.log(gfnumber)

                }

            var lfday= [];
            for (let lfd of this.brokenline.deduct){
                lfday.push(lfd.day)
                console.log(lfday)

            }

            var lfnumber= [];
            for (let lfn of this.brokenline.deduct){
                lfnumber.push(lfn.number)
                console.log(lfnumber)

            }
                // 基于准备好的dom，初始化echarts实例

                var Lflower = echarts.init(document.getElementById('light'));
                var Bflower = echarts.init(document.getElementById('black'));
                // 指定图表的配置项和数据
                var option = {
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
                        data:[gfday]
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
                        data: gfnumber,
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
                    }]
                };
//        另一个--------------------------------------------------------------------------
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
                        data: [lfday]
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
                        data: lfnumber,
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
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                Lflower.setOption(option);
                Bflower.setOption(Boption);
            }

        }

</script>

<style scoped>
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
</style>

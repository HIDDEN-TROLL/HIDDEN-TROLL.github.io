<template>
    <div  class="all">
        <!--点击后将当前页面生成为图片-->
        <!--<button @click="getimg" style="text-align: center">点击生成图片测试</button>-->
        <div style="text-align: center;font-size: 0.2rem;line-height: 0.45rem;padding-top: 0.2rem">我的成长值</div>

        <div style="border: solid 1px #669900;margin:0.2rem;border-radius:0.08rem;background-color: white">
            <div class="top_mes">
                <div style="margin: 0.1rem 0.1rem 0.05rem 0.1rem;">
                    <van-row type="flex" justify="space-between" >
                        <van-col span="12">
                            <img :src="headimg">
                            <span style="font-size: 0.16rem;">{{name}}</span>
                        </van-col>
                        <van-col span="12" style="text-align: right">
                            <span >共计获得奖励红花<span style="color:#6699FF">{{allflowers}}</span>朵</span>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div>
                <div id="container" style="height: 2.7rem"></div>
                <div style="text-align: center;margin-bottom: 0.1rem ;">天赋异禀天资卓越</div>
            </div>
        </div>

        <div style="border:solid 1px #669900;margin:0.2rem;border-radius: 0.08rem;background-color: white">
            <div class="seven_days_title">近7天获奖情况</div>
            <div id="get" style="height:2.2rem;"></div>
        </div>

        <div class="today">
            <div class="today_title">今日的评分和评语</div>
            <div style="margin: 0.15rem;">
                <div>
                    <i class="icon-flower" style="color: red;font-size: 0.16rem;margin-right: 0.2rem;"></i>
                    <span class="today_getflowers">奖励16朵</span>
                </div>
                <div style="margin: 0.1rem 0;">
                    <div v-for="(item,index) in flowerslist" :key="index">
                     <div class="today_getflowers_list">+{{item.flowernumber}}</div>
                     <div class="today_getflowers_list_mes">{{item.flowertext}}</div>
                    </div>
                </div>
                <div>
                    <img :src=item.upload v-for="(item,index) in imglist" :key="index">
                </div>
                <div>
                    <span>-15:32  美育家教园-东厦校区</span>
                </div>
            </div>
        </div>

        <div class="bottom_mes">
            <div>
                <img src="../../../assets/img/Redflowers/head.jpg">
            </div>
            <div style="padding: 0.1rem 0;">
                <span>美育家教园-东厦校区</span><br>
                <span style="font-size: 0.12rem">香港洪兴尖沙咀区九龙冰室東頭灣道99號葵青区隔壁.</span>
            </div>
        </div>

        <div class="bottom_mes bottom_mes_wechat">
            <img src="../../../assets/img/Redflowers/head.jpg">
            <div style="line-height: 0.72rem">
                <span>扫描二维码查看美育家教园官网</span><br>
            </div>
        </div>

        <div class="t_mes">
            技术支持：新师路教育科技
        </div>

        </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    // 导入html2canvas插件生成图片
    // import html2canvas from 'html2canvas';
    import { Row, Col } from 'vant';
    import echarts from 'echarts'
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                headimg:require('../../../assets/img/Redflowers/head.jpg'),
                name:'周晓东',
                allflowers:'119',
                flowerslist:[
                   {flowernumber:'11',flowertext:'啦啦啦啦啦啊'},
                   {flowernumber:'11',flowertext:'啦啦啦啦啦啊2'},
                   {flowernumber:'11',flowertext:'啦啦啦啦啦啊3'},
                   {flowernumber:'11',flowertext:'啦啦啦啦啦啊4'},
                   {flowernumber:'11',flowertext:'啦啦啦啦啦啊5'},
                   ],
                imglist:[
                    {upload:require('../../../assets/img/Redflowers/head.jpg')},
                    {upload:require('../../../assets/img/Redflowers/head.jpg')},
                    {upload:require('../../../assets/img/Redflowers/head.jpg')},
                    {upload:require('../../../assets/img/Redflowers/head.jpg')},
                    {upload:require('../../../assets/img/Redflowers/head.jpg')},
                    {upload:require('../../../assets/img/Redflowers/head.jpg')},
                    ]
            }
        },
        components: {
            [Row.name]:Row,
            [Col.name]:Col,
            //someComponent
        },
        mounted() {
            var arr1 = [70,73,85,40,60,59];
            var Lflower = echarts.init(document.getElementById('get'));
            var myChart = echarts.init(document.getElementById('container'));
            var option = {
                title: {},
                tooltip: {trigger: 'axis'},
                radar: [
                    {
                        indicator: [
                            {text: '德育', max: 100},
                            {text: '审美', max: 100},
                            {text: '劳动', max: 100},
                            {text: '其他', max: 100},
                            {text: '体育', max: 100},
                            {text: '智慧', max: 100}
                        ],
                        center: ['50%','50%'],
                        radius:70,
                    },
                ],
                series: [
                    {
                        type: 'radar',
                        tooltip: {trigger: 'item'},
                        symbol: 'circle',
                        itemStyle: {
                            normal: {
                                color:"#6699FF",
                                areaStyle: {type: 'default',color:'#6699FF'},
                                lineStyle: {color:"#6699FF"},
                                // label: {
                                //         show: true,
                                //         color:'black',
                                //         // formatter: '{c}%' ,
                                //     formatter: '{c}%'
                                // },
                            }
                        },
                        data: [
                            {
                                value: arr1,
                                name: '各项指数数值',
                                    // label: {
                                    //     normal: {
                                    //         show: true,
                                    //         formatter:function(params) {
                                    //             return params.value;
                                    //         },
                                    //         color:'black'
                                    //     }
                                    // }
                            },
                        ],

                    },
                ],
                // itemStyle: {
                //     normal: {
                //         color: 'rgba(255,225,0,.3)',
                //         lineStyle: {
                //             color: 'rgba(255,225,0,.3)',
                //         },
                //     },
                // },

            };

            var flower = {
                grid: {
                    top:'20%',
                    bottom:'15%',
                    left:'10%',
                    right: '20%',  //距离右侧边距
                },
                color: ['#6699FF'],
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
                    data: ["01","02","03","04","05","06","07"]
                },
                yAxis: {
                    name:'朵数',
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
                    name: '获取',
                    type: 'bar',
                    data: [4, 8, 33, 5, 20, 20,20],
                    itemStyle : {
                        normal : {
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#6699FF'
                                }
                            }
                        },
                    },
                    barWidth : 23
                }]
            };
            myChart.setOption(option);
            Lflower.setOption(flower);

            // 雷达图数据显示样式
            var i = -1;
            myChart.setOption({
                radar: [
                    {
                        name: {
                            rich: {
                                a: {
                                    color: '#666666',
                                    lineHeight: 20
                                },
                                b: {
                                    color: '#999999',
                                    align: 'center',
                                    backgroundColor: 'white',
                                    padding: 3,
                                    borderRadius: 4,

                                }
                            },
                            formatter: (a)=>{
                                i++;
                                return `${a}\n${arr1[i]}%`
                            }
                        }
                    }
                ]
            })



            },
        methods:{
            // 执行后将当前页面生成为图片
            // getimg(){
            //     html2canvas(document.querySelector(".all")).then(canvas => {
            //         document.body.appendChild(canvas)
            //     });
            // }
        }

        }

</script>

<style scoped>
   *{
       font-size: 0.14rem;
   }
   .all{
       background-color: rgb(216,229,241);
   }
   .top_mes{
       line-height: 0.45rem;
       border-bottom: solid 1px #CCCCCC;
   }
    .top_mes img{
        width: 0.36rem;
        height: 0.36rem;
        border-radius: 0.7rem;
        float: left;
        margin: 0.05rem;
    }
    .today img {
        width: 0.6rem;
        height: 0.6rem;
        margin: 0.07rem
    }
    .today{
        border: solid 1px #669900 ;
        margin: 0.2rem;
        border-radius: 0.08rem;
        background-color: white
    }

    .seven_days_title{
        line-height: 0.45rem;
        text-align: center;
        border-bottom: solid 1px #CCCCCC;
    }
    .today_title{
        line-height: 0.45rem;
        text-align: center;
        border-bottom: solid 1px #CCCCCC;
    }
    .today_getflowers{
        color: #6699FF;
    }
   .today_getflowers_list{
       width: 0.35rem;
       color: #6699FF;
       float: left;
    }
   .today_getflowers_list_mes{
       margin-left: 0.35rem;
   }
    .bottom_mes img{
        width: 0.72rem;
        height: 0.72rem;
        float: left;
        margin-right: 0.1rem;
    }
    .bottom_mes{
        margin: 0 0.25rem;
    }
    .bottom_mes_wechat{
        margin: 0.15rem 0.25rem;
    }
    .t_mes{
        font-size: 0.12rem;
        text-align: center;
        color: #666666;
        padding: 0.1rem 0;
    }
</style>

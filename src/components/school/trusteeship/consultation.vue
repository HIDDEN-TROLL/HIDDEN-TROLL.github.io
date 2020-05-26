<template>
    <div class="bgc">
        <van-nav-bar
            title="等待上门咨询"
            left-text="返回"
            right-text=""
            left-arrow

    />
        <div class="title">
            <van-row type="flex" justify="space-between">
                <van-col span="5">2人待咨询</van-col>
                <van-col span="13">列表显示预约上门咨询的客户</van-col>
            </van-row>
        </div>


        <div class="mes_list" v-for="(item,index) in list" :key="index">
            <div>{{item.time}}</div>
            <div>
                <span class="parent">家长：{{item.name}}</span>
                <span class="sex">身份：{{item.sex}}</span>
                <span class="number">号码:{{item.number}}</span>
            </div>
            <div>
                <span class="child">孩子：{{item.child}}</span>
                <span class="year">在读:{{item.year}}</span>
                <span class="get" @click="change(index)">标记已上门</span>
            </div>
        </div>




<button @click="test">aa</button>



    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { NavBar } from 'vant';
    import { Row, Col } from 'vant';
    //import someComponent from './someComponent'
    import wx from 'weixin-js-sdk'

    export default {
        name: "",
        data() {
            return {
                list:[{time:'-2019.01.06   15:37',name:'周晓东',sex:'妈妈',number:'137111111111',child:'周晓东',year:'一年级'},
                    {time:'-2019.01.06   2:27',name:'周晓东',sex:'妈妈',number:'137111111111',child:'周晓东',year:'一年级'},
                    {time:'-2019.01.08   15:27',name:'周晓东',sex:'妈妈',number:'137111111111',child:'周晓东',year:'一年级'},]
            }
        },
        components: {
            [NavBar.name]:NavBar,
            [Row.name]:Row,
            [Col.name]:Col,
            //someComponent
        },
        methods:{
            change(index){
                alert(index)
            },
          test() {
            wx.getLocation({
              type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                console.log(res)
                wx.openLocation({
                  latitude: res.latitude, // 纬度，浮点数，范围为90 ~ -90
                  longitude: res.longitude, // 经度，浮点数，范围为180 ~ -180。
                  name: 'asd', // 位置名
                  address: '广东省汕头市金平区龙眼南路泰联商厦', // 地址详情说明
                  scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
                  infoUrl: 'http://www.baidu.com' // 在查看位置界面底部显示的超链接,可点击跳转
                });
              }
            });
          }
        },
      created() {
        this.$store.dispatch('initJSSDK')
      },
    }
</script>

<style scoped>
    .bgc{
        background-color: #F3F7F8;
    }
    *{
        font-size: 0.14rem;

    }
    .van-nav-bar{
        background-color: #3770FB;
    }
    .van-nav-bar__title{
        color: #ffffff;
    }
    .van-nav-bar__text{
        color: white;
    }
    .van-nav-bar .van-icon{
        color: white;
    }

    /*.van-col--6{*/
        /*width: 50%;*/
    /*}*/
    .title{
        background-color: white;
        line-height: 0.4rem;
        padding: 0 0.15rem;
    }
    .parent,.sex,.child,.year{
        margin-right: 0.15rem;
    }
    .mes_list{
        background-color: white;
        padding:0.1rem 0.15rem;
        line-height: 0.4rem;
        margin-top: 0.1rem;
    }
    .get{
        margin-left: 0.6rem;
        padding: 0.05rem 0.1rem;
        border-radius: 0.03rem;
        background-color: #6699FF;
        color: white;
    }
    .number{
        margin-left: 0.2rem;
    }
</style>

<template>
    <div class="bgc">
        <!--<Classlist></Classlist>-->
        <div class="sendnotice">
            <img :src="settingpic">
           <span class="showclass"> 显示年级</span>
            <span class="showclassline"></span>
            <van-button type="default"  >一键通知本班级全部学生</van-button>
        </div>
        <div class="acline"></div>
        <div class="unfinish_list">
            <div class="unfinish"><span>2人未完成</span></div>
            <van-row type="flex" justify="space-between" class="name" v-for="(item,index) in finish" :key="index">
                <van-col span="6"> <span class="span" span="6">{{item.name}}</span></van-col>
                <van-col span="6"> <span class="span" span="6">{{item.year}}</span></van-col>
                <van-col span="6"><van-button type="default" span="6">确认完成作业</van-button></van-col>
            </van-row>
        </div>
        <div class="acline"></div>
        <div class="finish_list">
            <div class="unfinish">
                <span class="finperson">3个人已完成</span>
                <span class="unfinish_t_m"></span>
                <span>一个学生家长未查阅</span>
            </div>
            <van-row type="flex" justify="space-between" class="name" v-for="(item,index) in unread" :key="'name-'+index">
                <van-col span="8"> <span class="span">{{item.name}}</span></van-col>
                <van-col span="8">  <span class="span">{{item.year}}</span></van-col>
                <van-col span="8"> <span class="span unread">{{item.unread}}</span></van-col>
                <van-col span="8" > <span class="span ">{{item.time}}</span></van-col>
            </van-row>
            <van-row type="flex" justify="space-between" class="name" v-for="(item,index) in read" :key="index">
                <van-col span="8"> <span class="span">{{item.name}}</span></van-col>
                <van-col span="8">  <span class="span">{{item.year}}</span></van-col>
                <van-col span="8"> <span class="span read">{{item.unread}}</span></van-col>
                <van-col span="8"> <span class="span span_time">{{item.time}}</span></van-col>
            </van-row>
        </div>
    </div>

    <!--<someComponent></someComponent>-->
</template>

<script>
    import { Button } from 'vant';
    import { Row, Col } from 'vant';
    //import someComponent from './someComponent'
    export default {
        name: "",
        data(){
            return {
                settingpic: require("../../../../assets/img/homework/setting.png"),
                finish:[
                    {name:'苏大强',year:'一年级'},
                    {name:'周晓明',year:'一年级'}
                    ],
                unread:[
                    {name:'周晓明',year:'一年级',unread:'未阅',time:'17:19:23'},
                    {name:'周晓明',year:'一年级',unread:'未阅',time:'17:19:23'}
                    ],
                read:[
                    {name:'周晓明',year:'一年级',unread:'已阅',time:'17:19:23'}
                    ]
            }
        },
        components: {
            [Button.name]:Button,
            [Row.name]:Row,
            [Col.name]:Col,
            //someComponent
        },
        methods:{
        }
    }
</script>

<style scoped>

    .sendnotice .van-button{
        color:#3770FB;
        float: right;
        width: 2.4rem;
        line-height: 0.25rem;
        height:0.3rem;
        border:solid 1px #3770FB;
    }
    .sendnotice{
        margin:0.15rem 0.15rem;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.3rem;
    }
    .sendnotice img{
        width: 0.24rem;
        height: 0.24rem;
        float: left;
        margin-right: 0.05rem;
        margin-top:0.03rem;
    }
    .acline{
        width:100%;
        height:0.1rem;
        background-color:#F3F7F8;
    }
    .unfinish_list ,.finish_list{
        margin: 0  0.15rem;

    }
    .unfinish_list .van-button{
        color:#3770FB;
        /*float: right;*/
        width: 1.5rem;
        line-height: 0.25rem;
        height:0.3rem;
        border:solid 1px #3770FB;
    }
    .unfinish{
        text-align: center;
        border-bottom: solid 1px #EEEEEE;
        height: 0.55rem;
        font-size:0.14rem;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(216,0,0,1);
        line-height:0.55rem;
    }
    .unfinish_t_m{
        margin:0 0.5rem;
    }
    .finperson{
        color:#84C225;
    }
    .hr_b{
        margin: 0.2rem 0;
        width: 98%;
        border: solid 1px #EEEEEE;
    }
    .name{
        border-bottom: dotted 1px #EEEEEE;
        height:0.5rem;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.5rem;
    }
    .unread{
        color: #D80000;
    }
    .read{
        color: #84C225;
    }
    .span_time{
        text-align: right;
    }
    .showclassline{
        margin-left: 0.08rem;
        border-right: solid 1px #EEEEEE;
    }

    .van-col--6{
        width: 100%;
    }
    .van-col--8{
        width: 16%;
    }
</style>

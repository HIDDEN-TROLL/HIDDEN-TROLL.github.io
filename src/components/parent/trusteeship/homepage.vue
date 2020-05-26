<template>
    <div class="body">
        <van-nav-bar
                title="广东省-汕头市 "
                left-text=""
                right-text=""
                left-arrow

        />

        <div class="top_search">
            <div class="left">
                <div class="date_top_list">
                    <van-cell class="s_title" title="托管名称" is-link arrow-direction="down"   />
                </div>
                <div class="search_div">
                    <div><input type="text" class="search" placeholder="请输入搜索关键词" ></div>
                    <div> <i class="van-icon van-icon-search"><!----></i></div>
                </div>
            </div>
        </div>

        <div class="ac_line">
        </div>

        <div class="outdiv">
            <div class="choice">
                <van-row type="flex" justify="space-between">
                    <van-col span="6"> <van-cell title="选择学期" is-link arrow-direction="down"   /></van-col>
                    <van-col span="6"><van-cell title="选择科目" is-link arrow-direction="down"   /></van-col>
                    <van-col span="6"><van-cell title="选择单元" is-link arrow-direction="down"   /></van-col>
                </van-row>
            </div>
            <div class="for_list">
                <div v-for="(item,index) in list" :key="index" class="for_div">
                    <div class="l_r_mar">
                        <div class="head_mes_div">
                            <div class="head">
                                <img :src=item.headimg>
                            </div>
                            <div class="explain">
                                <div>
                                    <van-row type="flex" justify="space-between">
                                        <van-col span="6">{{item.name}}</van-col>
                                        <van-col span="6" class="text_r">{{item.way}}</van-col>
                                    </van-row>
                                </div>
                                <div class="introduce">
                                    {{item.introduce}}
                                </div>
                            </div>
                        </div>
                        <div class="morenews">
                            <div class="morenews_fun">在地图上定位</div>
                            <div class="morenews_fun">查看机构官网</div>
                            <div class="morenews_fun">联系机构咨询</div>
                        </div>
                        <div class="button" v-if="item.signup=='直接报名'" >
                            {{item.signup}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { NavBar } from 'vant';
    import { Search } from 'vant';
    import { Cell, CellGroup,icon } from 'vant';
    import { Row, Col } from 'vant';
    //import someComponent from './someComponent'
    export default {
        name: "",
        data(){
            return {
                list:[
                    {
                        name:'阳扬家教园',
                        way:'距离金龙小学67m',
                        introduce:'机构介绍内容：公司拥有来自教育一线十多年的校长、教育技术研发近十年。',
                        signup:'直接报名',
                        headimg:require("../../../assets/img/trusteeship/head.jpg")
                    },
                    {   name:'乐乐家教园',
                        way:'距离长沙小学50m',
                        introduce:'机构介绍内容：公司拥有来自教育一线十多年的校长、教育技术研发近十年。',
                        signup:' ',
                        headimg:require("../../../assets/img/trusteeship/head.jpg")
                    },
                    ]
            }
        },
        components: {
            [NavBar.name]:NavBar,
            [Row.name]:Row,
            [Col.name]:Col,
            [Search.name]:Search,
            [icon.name]:icon,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            //someComponent
        }
    }
</script>

<style scoped>
    *{
        font-size: 0.14rem;
    }
    .body{
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
        display: none;
    }
    /*代理商------------------------------------------------------------------*/
    .left{
        font-size:0.14rem;
        height: 0.24rem;
        border: solid #BCBCBC 0.01rem;
        border-radius: 0.04rem;
    }
    .top_search{

        margin:0.15rem  ;
    }
    .search_div{
        width:72%;
        margin-left:0.05rem;
        float: left;
        border-left: solid 1px #CCCCCC;
    }
    .search{
        float: left;
        width:90%;
        margin-left:0.05rem;
        border:solid 1px white;
    }

    .date_top_list{
        width:0.8rem;
        float: left;
    }
    .van-cell__title{
        flex:none;
        color:#666666;
        text-align: center;
    }
    .date_top_list>>>.van-cell__title span{
        font-size: 0.12rem;
    }
    .van-cell{
        line-height: 0.24rem;
        font-size: 0.14rem;
        margin-left:0.05rem;
        width:100%;
        padding: 0 ;
        background-color: transparent;
    }
    .van-icon {
        font-size: 0.16rem;
        line-height: 0.24rem;
    }
    .choice{
        font-weight: 700;
        margin: 0 0.15rem;
        border-bottom: solid 1px #EEEEEE;
        text-align: center;
        line-height: 0.5rem;
    }
    .outdiv{

        /*margin:  0 0.15rem;*/
    }
    .van-col--6{
        width: 23%;
    }

    .choice>>>.van-icon {
        font-size: 0.16rem;
        line-height: 0.5rem;
    }
    .choice>>>.van-cell__title{
        line-height: 0.5rem;
    }

    .head_mes_div{
        margin-top: 0.16rem;
    }
    .head{
        /*margin: 0.15rem;*/
        margin-right: 0.16rem;
        float: left;
        height: 0.72rem;
        width: 0.72rem;
    }
    .head img{
        width: 100%;
        height: 100%;

    }
    .explain{
        /*margin: 0.18rem 0 0 0.15rem;*/
    }
    .explain>>>.van-col--6{
        width: 50%;
    }
    .explain>>>.text_r{
        font-size: 0.12rem;
        color: #999999;
        text-align: right;
    }
    .morenews{
        float: left;
        margin: 0.15rem 0;
    }
    .morenews_fun{
        color: #84C225;
        float: left;
        width: 1.1rem;
        border-right: solid 1px ;
        margin-left: 0.2rem;
    }
    .morenews_fun:nth-child(3){
        text-align: right;
        float: left;
        width: 0.86rem;
        border-right: solid 1px ;
        border-right: none;
    }
    .morenews_fun:nth-child(1){
        float: left;
        width: 1.05rem;
        border-right: solid 1px ;
        margin-left: 0;
    }

    .introduce{
        margin-top: 0.05rem;
    }
    .button{

        border-radius:0.03rem;
        text-align: center;
        float: left;
        line-height: 0.3rem;
        margin: 0 0.45rem 0.15rem 0.45rem;
        width: 2.5rem;
        height: 0.3rem;
        background-color: #3770FB;
        color:white;
    }
    .for_div{
        margin-top: 0.1rem;
        background-color: white;
        float: left;
    }
    .for_div:nth-child(1){
        margin-top: 0;
        background-color: white;
        float: left;
    }
    .ac_line{
        width: 100%;
        height: 0.1rem;
        background-color: #F3F7F8;
    }
    .for_list{
        float: left;
        background-color:  #F3F7F8;
    }
    .l_r_mar{
        margin: 0 0.15rem;
    }
</style>

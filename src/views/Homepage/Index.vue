<template>
    <div id="row">
        <router-view>
        </router-view>

            <van-notice-bar color="white" background="rgb(13, 43, 58)" left-icon="info-o" speed="60" :scrollable="true">
                最新消息：无内鬼！→点赞进入XXXXhubKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKP
            </van-notice-bar>
            <transition name="fade">
                <div v-if="show">
                    <div class="BoxDiv">
                        <van-swipe class="my-swipe"  indicator-color="black" :loop=false :initial-swipe=value1 >
                            <van-swipe-item v-for="(item,index) in BoxList" :key="index">
                                <van-row class="FunctionBoxLeft">
                                    <van-col span="6" v-for="(item2,index2) in item.Function" :key="index2" >
                                        <div class="FunctionBox" :id="'box'+index2" >
                                            <div class="iconBox" :style="{background:item2.color}" @click="jump(item2.name)" ><van-icon :name="item2.icon" size="1.5rem" /></div>
                                            <div class="iconTxt">{{item2.name}}</div>
                                        </div>
                                    </van-col>
                                </van-row>
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                </div>
            </transition>

            <div style="1.5rem 0 0.5rem 0;">
                <van-divider
                 :style="{ color: '#969799', borderColor: 'rgb(4, 4, 4)', padding: '0 2rem' , margin: '16px 0 0 0' }"
                >最新动态，下拉刷新
                </van-divider>
            </div>

            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <div  v-for="(item,index) in list" :key="index">
                        <div class="messageBox">
                            <van-row>
                                <van-col span="4">
                                    <div class="icon_box" >
                                        <!--<div class="icon_box" :style="{background:item.color}">-->
                                        <!--<van-icon :name="item.icon" />-->
                                        <img src="../../assets/img/head.jpg">
                                    </div>
                                </van-col>
                                <van-col span="20">
                                    <div class="mes_title">{{item.title}}</div>
                                    <div class="date_title">{{item.date}}</div>
                                </van-col>
                            </van-row>
                            <div class="information">
                                {{item.mes}}

                            </div>
                            <div class="Com_number">
                                <van-row>
                                    <van-col span="4">
                                        <van-icon name="chat-o"  size="1.3rem"/> {{item.number}}
                                    </van-col>
                                    <van-col span="20">
                                    </van-col>
                                </van-row>
                            </div>
                        </div>
                    </div>

                </van-list>
            </van-pull-refresh>

    </div>
</template>

<script>
    import { Grid, GridItem,NoticeBar,DropdownMenu, DropdownItem,Col,Row,Icon,Swipe, SwipeItem,Divider,PullRefresh,List,cell  } from 'vant';
    import { Uploader } from 'vant';
    export default {
        name: "automatic-mode",
        data() {
            return {
                show:false,
                value1: 0,
                value2: 0,
                BoxList:[
                    {Function:[
                            {name:'购物',icon:"shopping-cart-o",color:'red'},
                            {name:'礼物',icon:'gift',color:'black'},
                            {name:'购物',icon:"shopping-cart-o",color:'#9dc918'},
                            {name:'撩舔',icon:"phone",color:'#efff00'},
                            {name:'购物',icon:"shopping-cart-o",color:'red'},
                            {name:'点赞看P',icon:"good-job",color:'#910a0a'},
                            {name:'二刺螈',icon:"hot",color:'red'},
                            {name:'购物',icon:"shopping-cart-o",color:'red'},]
                    },
                    {Function:[
                            {name:'购物',icon:"shopping-cart-o",color:'black'},
                            {name:'购物',icon:"shopping-cart-o",color:'black'},
                            {name:'购物',icon:"shopping-cart-o",color:'black'},
                            ]
                    },
                    {Function:[
                            {name:'购物',icon:"shopping-cart-o",color:'black'},
                            {name:'购物',icon:"shopping-cart-o",color:'black'},
                            {name:'购物',icon:"shopping-cart-o",color:'black'},
                            {name:'购物',icon:"shopping-cart-o",color:'black'},
                            {name:'购物',icon:"shopping-cart-o",color:'black'},
                            {name:'购物',icon:"shopping-cart-o",color:'black'},
                            ]
                    },
                ],
                option1: [
                    { text: '全部商品', value: 0 },
                    { text: '新款商品', value: 1 },
                    { text: '活动商品', value: 2 },
                ],

                list: [
                    {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:22223},
                    {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:3},
                    {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:3},
                    {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:2},
                    {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:23},
                    {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:23},
                    {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:23},
                    {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:23},
                    ],
                loading: false,
                finished: false,
                refreshing: false,
            };
        },
        watch:{

        },
        components: {
            [PullRefresh.name]: PullRefresh ,
            [SwipeItem.name]: SwipeItem,
            [Icon.name]: Icon,
            [List.name]: List ,
            [cell.name]: cell ,
            [Swipe.name]: Swipe,
            [Row.name]: Row,
            [Divider.name]: Divider,
            [Col.name]: Col,
            [DropdownItem.name]: DropdownItem,
            [DropdownMenu.name]: DropdownMenu,
            [NoticeBar.name]: NoticeBar,
            [Grid.name]: Grid,
            [GridItem.name]: GridItem,
            [Uploader.name]: Uploader,
        },
        methods:{
            jump(d){
                console.log(d)
              // this.$router.push({name:'test',parmas:{type:name}})
                this.$router.push({
                    name:'TypeList',
                    params:{
                        d:d,
                    }
                })
            },
            onLoad() {
                setTimeout(() => {
                    if (this.refreshing) {
                        // this.list = [];
                        this.list =  [
                            {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:22223},
                            {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:3},
                            {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:3},
                            {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:2},
                            {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:23},
                            {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:23},
                            {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:23},
                            {title:'围魏救赵',mes:'顶顶顶顶顶顶顶顶顶顶顶顶顶顶',date:'2020-02-5',number:23},
                        ],
                        this.refreshing = false;
                    }

                    for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    this.loading = false;

                    if (this.list.length >= 40) {
                        this.finished = true;
                    }
                }, 1000);
            },
            onRefresh() {
                // 清空列表数据
                this.finished = false;

                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.loading = true;
                this.onLoad();
            },
        },
        mounted(){
                    console.log(this.list)
            this.show = true
        }
    }

</script>
<style lang="less" scoped>
    .head{
        width: 200px;
        height: 200px;
        border-radius: 90%;
        /*border: solid 1px;*/
        background: white;
        margin: 0 auto;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .BoxDiv{
        padding: 1rem 0 1rem 0.5rem;
        background: white;
        margin: 1rem;
        -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.3), -10px 10px 10px 10px rgba(255, 255, 255, 0.5);
        box-shadow: 0px 0px 16px 0px rgba(0.5, 0.5, 0.5, 0.3), -10px 10px 10px 10px rgba(255, 255, 255, 0.5);
        border-radius: 1rem;
    }
    .FunctionBox{
        /*border: solid 1px;*/
        border-radius: 6px;
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .iconBox{
        border: none;
        border-radius: 90%;
        width: 2.5rem;
        height: 2.5rem;
        text-align: center;
        line-height: 2.5rem;
        margin: 0 auto;
    }
    .iconTxt{
        font-size: 0.8rem;
        line-height: 1.6rem;
    }
     .FunctionBox .van-icon::before {
         line-height: 2.4rem;
         color: white;
     }
    .messageBox{
        text-align: left;
        opacity: 0.8;
        background: #fff;
        background: -webkit-linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
        background: -moz-linear-gradient(top,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);; /*FireFox*/
        background: -o-linear-gradient(top,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);  /* Opear */
        background: -ms-linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)); /*IE10及IE10+*/
        -webkit-border-radius: 0.8rem;
        -moz-border-radius:0.8rem;
        border-radius:0.8rem;
        border: solid 2px #dddddd;
        margin: 0.8rem;
        padding: 0.5rem ;
    }
    .icon_box img{
        line-height: 3rem;
        text-align: center;
        font-size: 2rem;

        width: 3rem;
        height: 3rem;
        margin: 0 auto;
        border-radius: 80px;
        border: solid 1px;
        color: white;
    }
    .mes_title{
          line-height: 1.5rem;
          font-weight: 700;
          color: black;
    }
    .date_title{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.5rem;
        color: #565656;
        font-size:0.8rem
    }
    .information{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.5rem;
        color: black;
        font-size:0.8rem;
        margin-top: 0.5rem;
    }
    .Com_number{
        color: black;
        font-size:0.8rem;
        line-height: 1.5rem;
        margin-top: 0.5rem;
    }
    /deep/ .van-divider {
        margin: 16px 0 0 0;
    }
</style>



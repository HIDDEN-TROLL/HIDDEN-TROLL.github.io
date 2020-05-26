<template>
    <div id="row">
        <transition name="fade">
            <div v-if="show">
                <div  v-for="(item,index) in BoxList" :key="index">
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
                                <div class="mes_title">{{item.name}}</div>
                                <div class="information">{{item.information}}</div>
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { Grid, GridItem,NoticeBar,DropdownMenu, DropdownItem,Col,Row,Icon,Swipe, SwipeItem } from 'vant';
    import { Uploader } from 'vant';
    export default {
        name: "automatic-mode",
        data() {
            return {
                show:false,
                value1: 0,
                BoxList:[
                            {name:'系统公告',icon:'volume',color:'red',information:'KKP'},
                            {name:'陈真',icon:'volume',color:'#2c2a2a',information:'汪汪汪'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'shopping-cart-o',color:'red'},

                ],
                option1: [
                    { text: '全部商品', value: 0 },
                    { text: '新款商品', value: 1 },
                    { text: '活动商品', value: 2 },
                ],
            };
        },
        components: {
            [SwipeItem.name]: SwipeItem,
            [Icon.name]: Icon,
            [Swipe.name]: Swipe,
            [Row.name]: Row,
            [Col.name]: Col,
            [DropdownItem.name]: DropdownItem,
            [DropdownMenu.name]: DropdownMenu,
            [NoticeBar.name]: NoticeBar,
            [Grid.name]: Grid,
            [GridItem.name]: GridItem,
            [Uploader.name]: Uploader,
        },
        methods:{
        },
        mounted(){
            this.show = true
        }
    }

</script>
<style  scoped>

    .FunctionBox .van-icon-shopping-cart::before {
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
        border-bottom: solid 1px #dddddd;
        -webkit-border-radius: 0.8rem;
        -moz-border-radius:0.8rem;
        border-radius:0.8rem;
        border-bottom: solid 2px #dddddd;
        margin: 0.8rem;
        padding: 0.5rem 0;
    }
    .mes_title{
        line-height: 1.5rem;
        font-weight: 700;
        color: black;
    }
    .information{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.5rem;
        color: #565656;
        font-size:0.8rem
    }
    .van-icon{
        line-height: 3rem;
        width: 100%;
        text-align: center;
        font-size: 2rem;
    }
    .icon_box{
        width: 3rem;
        height: 3rem;
        margin: 0 auto;
        border-radius: 80px;
        border: solid 1px;
        color: white;
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


</style>



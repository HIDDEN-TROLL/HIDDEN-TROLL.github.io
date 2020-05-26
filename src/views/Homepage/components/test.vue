<template>
    <div id="row">
        <van-nav-bar
                :title="key"
                left-text="返回"
                right-text="按钮"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />

        <transition name="fade">
            <div v-if="show">
                <div style="height: 2.8rem;"></div>
                <div  v-for="(item,index) in BoxList" :key="index">
                    <div class="messageList">
                        <van-row>
                            <van-col span="4">
                                <div class="icon_box" >
                                    <img src="../../../assets/img/head.jpg">
                                </div>
                            </van-col>
                            <van-col span="20">
                                <div class="mes_title">{{item.name}}</div>
                                <div class="information">{{item.information}}</div>
                            </van-col>
                        </van-row>
                    </div>
                </div>

                <UnLoginBtn v-if="gettoken === null"></UnLoginBtn>
            </div>
        </transition>
    </div>
</template>

<script>
    import { Grid,GridItem,NoticeBar,DropdownMenu,DropdownItem,Col,Row,Icon,Swipe,SwipeItem,NavBar  } from 'vant';
    import { Uploader } from 'vant';
    import  UnLoginBtn  from '../../../components/UnLogin/UnLoginBottomBtn.vue';
    import { mapState} from 'vuex'

    export default {
        name: "automatic-mode",
        data() {
            return {
                show:false,
                value1: 0,
                BoxList:[
                            {name:'系统',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'#2c2a2a',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
                            {name:'购物',icon:'volume',color:'red',information:'笑嘻嘻嘻嘻嘻嘻嘻嘻ssssssssssssssssssssssss嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻'},
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

                key:this.$route.params.d
            };
        },
        components: {
            [SwipeItem.name]: SwipeItem,
            [Icon.name]: Icon,
            [NavBar.name]: NavBar,
            [Swipe.name]: Swipe,
            [Row.name]: Row,
            [Col.name]: Col,
            [DropdownItem.name]: DropdownItem,
            [DropdownMenu.name]: DropdownMenu,
            [NoticeBar.name]: NoticeBar,
            [Grid.name]: Grid,
            [GridItem.name]: GridItem,
            [Uploader.name]: Uploader,
            UnLoginBtn,
        },
        computed: {
            // 获取vuex中的个人信息（PersonalInformation）
            ...mapState('UserFunction', {
                PersonalInformation: 'PersonalInformation',
                gettoken: 'token',
            }),
        },
        methods:{
            onClickLeft() {
                this.$router.back()
            },
            onClickRight() {
            },
        },
        mounted(){
            console.log(this.type)
            this.show = true
        }
    }

</script>
<style  scoped>
    .FunctionBox .van-icon-shopping-cart::before {
        line-height: 2.4rem;
        color: white;
    }
    .messageList{
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



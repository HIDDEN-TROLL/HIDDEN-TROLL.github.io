<template>
    <div class="mall">
        <nav-bar
                class="header"
                title="结果通知"
        />
        <div class="bodyList" >

           <div style="color: #66CC99;font-size: 0.24rem;text-align: center;font-weight: 700;margin-bottom: 0.2rem">
               <a v-if="data.tradeState === 0">
                   支付中...
               </a>
               <a v-if="data.tradeState === 1">
                   {{data.buyType}}成功
               </a>
               <a v-if="data.tradeState === 2">
                   支付失败
               </a>
           </div>

            <div>购买内容：{{data.name}} </div>

            <div>购买模式：{{data.typeValue}}
                <!--<a v-if="data.type === 1">-->
                <!--软件-年付费-->
                <!--</a>-->
                <!--<a v-if="data.type === 2">-->
                <!--软件-充值扣费-->
                <!--</a>-->
                <!--<a v-if="data.type === 3">-->
                <!--其他-->
                <!--</a>-->
            </div>

            <div>
                <a v-if="data.type != 3">选择套餐：{{data.package}}</a>
                <a v-else>购买数量：{{data.number}}</a>
            </div>

            <div class="img_box" style="margin-top: 1rem">
                <img :src="data.qrcode"/>
            </div>
            <div style="text-align: center;margin-top: 0.2rem">
                <div  >长按识别图中二维码</div>
                <div  >联系新师路开通系统</div>
            </div>

        </div>

        <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn" ></FooterBtn>
    </div>
</template>

<script>
    import { orderStatus } from '@/api/common/mall'
    import { Col, List, NavBar, NoticeBar, Row, Swipe, SwipeItem, Tag,Tabbar, TabbarItem,Tab, Tabs  } from 'vant'
    import FooterBtn from "../../../common/footer-operate-btn";

    export default {
        name: 'MallIndex',
        components: {
            NavBar,
            vanRow: Row,
            vanCol: Col,
            vanList: List,
            vanSwipe: Swipe,
            vanSwipeItem: SwipeItem,
            vanNoticeBar: NoticeBar,
            vanTag: Tag,
            vanTabbar: Tabbar,
            vanTabbarItem: TabbarItem,
            vanTab: Tab,
            vanTabs: Tabs,
            FooterBtn:FooterBtn

        },
        data() {
            return {
                swipeHeight: document.body.clientHeight / 10 * 3,
                data:[],

                btnText: [
                    {
                        type: 1,
                        title: "返回选购商品"
                    },{
                        type: 2,
                        title: "查看购买记录"
                    },
                ],
                recordId:this.$route.params.recordId
            }
        },
        mounted() {
            this.SearchStatus()
        },
        watch:{

        },
        computed: {},
        methods: {
            SearchStatus(){
                this.$loading()
                    orderStatus(this.recordId)
                        .then(response => {
                            if (response.data.meta.success) {
                                this.data = response.data.data
                            }
                        })
                        .finally(() => {
                            this.$loadingHide()
                        }).catch(()=>{
                        throw new Error("获取订单状态接口异常！")
                    })
            },
            //底部按钮
            operateBtn(type) {
                if (type === 1) {
                    this.$router.push({name:'CommonMallIndex'})
                } else if (type === 2) {
                    this.$router.push({name:'OrderRecord'})
                }
            },
        },
    }
</script>




<style scoped lang="less">
    .bodyList{
        font-size: 0.14rem;
        line-height: 0.25rem;
        padding: 0.3rem;
    }
    .img_box{
        margin:  0 auto;
        height: 1.2rem;
        width: 1.2rem;
    }
    img{
        height:100%;
        width: 100%;
    }
</style>

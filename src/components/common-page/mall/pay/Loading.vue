<template>
    <div class="mall">
        <nav-bar
                class="header"
                title="查询订单结果中"
        />

        <div style="margin-top: 0.2rem;" >
            <div style="color: #66CC99;font-size: 0.24rem;text-align: center;font-weight: 700;margin-bottom: 0.2rem">正在获取订单信息...</div>
        </div>

    </div>
</template>

<script>
    import { getStatus } from '@/api/common/mall'
    import { Col, List, NavBar, NoticeBar, Row, Swipe, SwipeItem, Tag,Tabbar, TabbarItem,Tab, Tabs  } from 'vant'

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
                order:this.$route.params.order,
                recordId:this.$route.params.recordId,
            }
        },
        mounted() {
            this.SearchStatus()
            console.log(this.recordId)
        },
        watch:{

        },
        computed: {},
        methods: {
            // 循环获取订单支付状态
            SearchStatus(){
                this.$loading()
                    getStatus(this.order)
                        .then(response => {
                            if (response.data.meta.success ) {
                                if(response.data.data.trade_state){
                                    this.$loadingHide()
                                    this.$route.push({
                                        name: 'SuccessfulPayment',
                                        params: {
                                            recordId:this.recordId
                                        },
                                    })
                                }else{
                                    let timer = setTimeout(()=>{
                                        this.SearchStatus()
                                    },5000)
                                }
                            }
                            console.log(this,data)
                        })
                        .finally(() => {
                            let timer = setTimeout(()=>{
                                this.SearchStatus()
                            },5000)
                            console.log(this.recordId)
                        }).catch(()=>{
                        throw new Error("获取订单状态接口异常！")
                    })
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
</style>

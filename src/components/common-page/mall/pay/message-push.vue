<template>
    <div class="mall">
        <nav-bar
                class="header"
                title="购买通知"
        />
        <div class="bodyList" >
            <div style="color: #66CC99;font-size: 0.24rem;text-align: center;font-weight: 700;margin-bottom: 0.2rem">{{data.buyType}}通知</div>
            <div>商品内容： {{data.category}} - {{data.name}}</div>
            <div v-if="data.type === 2">购买套餐： {{data.package}}</div>
            <div v-if="data.type === 1">购买数量： {{data.number}}</div>
            <div>购买金额： {{data.amount}}</div>
            <div>机构名称： {{data.mechanismName}}</div>
            <div>机构地址： {{data.address}}</div>
            <div>手机号码： {{data.phone}}</div>
            <div>微信账号： {{data.wechat}}</div>
        </div>
    </div>
</template>

<script>
    import { template } from '@/api/common/mall'
    import { getParamFromUrlAndRoute } from '@/utils'
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
                data:[],
                loading:true,
                from:'template',
                templateId:0
            }
        },
        mounted() {
            this.OrderMessage()
        },
        methods: {
            OrderMessage(){
                const template_id = getParamFromUrlAndRoute('template_id', this.$router)
                if(this.$route.query.template_id || template_id) {
                    this.templateId = template_id
                    template(this.from,template_id)
                        .then(res => {
                            this.data = res.data.data;
                        }).catch(() => {
                        throw new Error("订单查询异常!")
                    })
                }else{
                    alert("无购买信息id")
                }
            },
        },
    }
</script>




<style scoped lang="less">
    .bodyList{
        font-size: 0.14rem;
        line-height: 0.4rem;
        padding: 0.3rem;
    }
</style>

<template>
    <div class="mall">
        <div style="z-index: 18;
                    top: 0;
                    position: fixed;
                    width: 100%;">
            <nav-bar
                    class="header"
                    title="购买记录"
                    left-text="返回"
                    left-arrow
                    @click-left="$router.back()"/>
        </div>

        <div style="height: 46px;"></div>

        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
        >
            <div class="bodyList" v-for="(item,index) in data" :key="index">
                <div style="padding: 0.15rem;border-bottom: solid 1px #CCCCCC">
                    <div>
                        购买日期：{{item.date}}
                        <span style="float: right;color: #6699FF" @click="ShowQrcode(item.qrcode)">联系新师路</span>
                    </div>
                    <div>购买内容：{{item.name}} </div>
                    <div>购买模式：{{item.type}}-{{item.payType}}</div>
                    <div v-if="item.package === null">选择数量：{{item.number}}</div>
                    <div v-else>选择套餐：{{item.package}}</div>
                    <div style="text-align: center;color: #6699FF" @click="show(index)" :id="'Show'+index">展开详细信息 &#9660;	</div>
                    <div style="text-align: center;color: #6699FF;display: none" @click="hide(index)" :id="'Hide'+index">收起详细信息 &#9650;</div>
                    <div :id="'List'+index" style="display: none;">
                        <div>机构名称：{{item.mechanismName}}</div>
                        <div>所在学校：{{item.schoolName}}</div>
                        <div>机构地址：{{item.address}}</div>
                        <div>手机号码：{{item.phone}}</div>
                        <div>微信账号：{{item.wechat}}</div>
                    </div>
                </div>
                <van-tabbar v-model="active" style="border-top: 1px solid rgb(222, 222, 222)">
                    <van-tabbar-item icon="home-o">商城</van-tabbar-item>
                    <van-tabbar-item icon="search" >记录</van-tabbar-item>
                </van-tabbar>
            </div>

        </van-list>

        <van-dialog
                v-model="ShowQrcodeDia"
                title=""
                :show-cancel-button = "false"
                confirm-button-text="好的"
        >
            <div class="qrcode_box">

                <div class="qrcode">
                    <img :src="img">
                </div>
                <div style="margin-top: 0.15rem;">长按识别图中二维码</div>
                <div>联系新师路开通系统</div>
            </div>

        </van-dialog>

        <div style="height: 1rem;"></div>

    </div>
</template>

<script>
    import { getList,orderRecord } from '@/api/common/mall'
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
                data: [],
                list: {
                    items: null,
                    categoryId: 0,
                    page: 1,
                    loading: false,
                    finished: false,
                },
                active: 1,
                loading: false,
                finished: false,
                ShowQrcodeDia: false,

                nextId:'',

                img:''
            }
        },
        created() {
            this.$loading()
        },
        watch:{
            active(s){
               this.$router.push({name:'CommonMallIndex'})
            }
        },
        computed: {},
        methods: {
            // 联系新师路弹出
            ShowQrcode(img){
              this.img = img
              this.ShowQrcodeDia = true
            },
            // 展开跟多信息
            hide(index){
                document.getElementById('List'+index).style.display="none"
                document.getElementById('Hide'+index).style.display="none"
                document.getElementById('Show'+index).style.display="block"
            },  // 展开跟多信息
            show(index){
                document.getElementById('List'+index).style.display="block"
                document.getElementById('Show'+index).style.display="none"
                document.getElementById('Hide'+index).style.display="block"

            },
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    orderRecord(this.nextId)
                        .then(response => {
                            if (response.data.meta.success) {
                                this.data = response.data.data
                                // 加载状态结束
                                    if(this.data.length === 0){
                                        this.finished = true;
                                        this.loading = false;
                                    }else{
                                        // 加载状态结束
                                        let length = this.data.length
                                        this.nextId = this.data[length-1].id
                                        // console.log(this.data[length-1].id)
                                        this.loading = false;
                                        // 数据全部加载完成
                                        if (response.data.data.length < 10) {
                                            this.finished = true;
                                        }else{
                                            for (let i = 0; i < 10; i++) {
                                                this.data.push(this.data.length + 1);
                                            }
                                        }
                                    }
                            }
                        })
                        .finally(() => {
                            this.$loadingHide()
                        })
                }, 500);
            },
            Comlist(){
                this.$loading()
                getList(this.listId)
                    .then(response => {
                        if (response.data.meta.success) {
                            this.MallList = response.data.data
                        }
                    })
                    .finally(() => {
                        this.$loadingHide()
                    })
            },
        },
    }
</script>




<style scoped lang="less">
.bodyList{
    font-size: 0.14rem;
    line-height: 0.25rem;
}
    .qrcode{
        width: 1.2rem;
        height: 1.2rem;
        margin: 0 auto;
    } .qrcode img{
        width: 100%;
        height: 100%;
    }.qrcode_box{
                   text-align: center;
                   font-size: 0.14rem;
                   margin: 0.15rem;
    }
</style>

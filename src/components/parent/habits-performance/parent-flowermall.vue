<template>
    <div id="flower-mall">
        <!--红花商城   校长端-->
        <div class="go-back">
            <van-nav-bar :fixed="true" title="红花商城" left-text="返回" left-arrow @click-left="onClickLeft">
<!--                <span slot="right" class="record right-text" @click="awardRecord">-->
<!--                     <van-icon name="orders-o"  title="兑奖记录"/>-->
<!--                     <span class="title">兑奖记录</span>-->
<!--                </span>-->
<!--                <span slot="right" class="prize right-text" @click="prizeManagement">-->
<!--                      <van-icon name="point-gift-o" title="管理奖品"/>-->
<!--                      <span class="title">管理奖品</span>-->
<!--                </span>-->
            </van-nav-bar>
        </div>
        <div class="mall-content">
            <div class="gift-list" >
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                >
                    <van-row gutter="16">
                        <van-col span="12" v-for="(item,index) in prize" :key="index">
                            <div class="prize-info">
                                <div class="figure" v-for="(val,idx) in item.imgurl" :key="idx">
                                    <img class="image" :src="val" alt="" />
                                </div>
                                <span class="title info">【{{item.name}}】</span>
                                <span class="conditions info">需要：{{item.worth}} 朵红花</span>
                                <span class="inventory info">库存：{{item.stock}}/{{item.number}}</span>
                                <span class="viewRecord info" @click="selectSingleGiftRecord(item.mallId,item.name)">查看兑奖记录</span>
                            </div>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
    import { NavBar, Icon, Row, Col, List  } from "vant";
    import { flowerMall } from '@/api/school/safflower'
    import { getAccountList } from '@/api/common/index'
    export default {
        name: "flower-mall",
        components:{
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Row.name]:Row,
            [Col.name]:Col,
            [List.name]:List
        },
        data(){
            return{
                loading:false,
                finished:false,
                prize:[],
                page:0,
                middleA:[],
                userType:null
            }
        },
        methods:{
            onClickLeft() {
                if (this.userType === 2) {
                    this.$router.push({name:"TeacherHomeWorkbench"})
                }else if (this.userType === 3) {
                    this.$router.push({name:"SchoolHomeWorkbench"})
                }else{
                    this.$router.back(-1);
                }
            },
            awardRecord(){
                this.$router.push({name:"SafflowerTicketRecord"})
            },
            prizeManagement(){
                this.$router.push({name:"SafflowerPrizeManagement"})
            },
            selectFlowerMall(){
                return new Promise((resolve, reject) =>{
                    flowerMall()
                        .then(res=>{
                            if (res.status === 200){
                                resolve(res.data.data);
                            }else {
                                reject('数据异常！')
                            }
                        }).catch(()=>{
                        throw new Error("异常！")
                    })
                })
            },
            onLoad(){
                if (this.prize.length === 0){
                    this.selectFlowerMall().then(response=>{
                        if (Array.isArray(response)){
                            let res = response
                            //   .map(item=>{
                            //   item.imgurl = JSON.parse(item.imgurl);
                            //   return item;
                            // });
                            //console.log(res)
                            if (res.length<=8){
                                this.loading = false;
                                this.prize = res;
                                this.finished = true;
                            }else {
                                this.middleA = res;
                                let timer = setTimeout(()=>{
                                    for (let i=0*(this.page); i<8*(this.page+1); i++){
                                        if (res[i]){
                                            this.prize.push(res[i])
                                        }
                                    }
                                    this.loading = false;
                                    if (this.prize.length >= res.length){
                                        this.finished = true;
                                    }
                                    clearTimeout(timer)
                                },1000);
                            }
                        }
                    })
                }else {
                    let timer = setTimeout(()=>{
                        for (let i=8*(this.page); i<8*(this.page+1); i++){
                            if (this.middleA[i]){
                                this.prize.push(this.middleA[i])
                            }
                        }
                        this.loading = false;
                        if (this.prize.length >= this.middleA.length){
                            this.finished = true;
                        }
                        clearTimeout(timer)
                    },1000);
                }

                this.page = this.page + 1;
            },
            //查询单个商品兑换记录
            selectSingleGiftRecord(id, name){
                this.$router.push({name:'SafflowerTicketRecord',params:{id:id,name:name}})
            }
        },
        created() {
            getAccountList()
                .then(res=>{
                    if (res.data.meta.code === 0) {
                        let d = res.data.data.filter(item=>item.isCurrent);
                        this.userType = d[0].type;
                    }
                })
                .catch(()=>{
                    throw new Error("异常！")
                })
        }
    }
</script>

<style scoped lang="less">
    #flower-mall{
        font-size: 0.12rem;
        background-color: #fff;
        .go-back {
            .van-nav-bar {
                background-color: #3770fb;
                .van-icon {
                    font-size: 0.22rem;
                    color: #fff;
                }
                .van-nav-bar__text {
                    font-size: 0.16rem;
                    line-height: 0.22rem;
                    color: #fff;
                    font-weight: 400;
                }
                .van-nav-bar__title {
                    color: #fff;
                    font-weight: 400;
                }
                .right-text{
                    /*display: inline-block;*/
                    width: 0.6rem;
                    height: 0.46rem;
                    float: left;
                    line-height: 0.18rem;
                    .van-icon{
                        line-height: 0.28rem;
                    }
                    .title{
                        display: block;
                        font-size: 0.12rem;
                        line-height: 0.14rem;
                        color: #fff;
                    }
                }
            }
        }
        .mall-content{
            width: 100%;
            padding: 0.62rem 0.16rem 0;
            box-sizing: border-box;
            .gift-list{
                width: 100%;
                .prize-info{
                    width: 100%;
                    border: 1px solid #eee;
                    border-radius: 0.05rem;
                    margin-bottom: 0.16rem;
                    box-sizing: border-box;
                    .figure{
                        width: 100%;
                        height: 0.8rem;
                        overflow: hidden;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .info{
                        display: block;
                        font-size: 0.12rem;
                        color: #666;
                        line-height: 0.2rem;
                        text-align: center;
                    }
                    .viewRecord{
                        color: #999;
                        border-top: 1px solid #eee;
                    }
                }
            }
        }
    }
    .image {
        object-fit: cover;
    }
</style>

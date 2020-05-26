<template>
    <div>
    <div style="padding: 0.2rem 0 0.8rem 0;">
        <div class="watch">
          充值互动：啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊呃呃呃呃呃呃呃呃呃呃呃呃
        </div>
        <div class="Explain">
            充值模式：每月05日X点开始扣费<br>
            支付模式：每月05日X点开始结算，10日前支付
        </div>

        <div style="height: 0.1rem;background-color: rgb(243, 247, 248);"></div>

        <div class="pay_list"  >
            <van-row type="flex" justify="space-between">
                <van-col span="8">校区</van-col>
                <van-col span="4">待付</van-col>
                <van-col span="5" >余额</van-col>
                <van-col span="7" >操作</van-col>
            </van-row>
        </div>
        <div class="pay_list"  >
            <van-row type="flex" justify="space-between">
                <van-col span="8" class="borderline address" ><a @click="jump">东厦南校区(深1圳)</a></van-col>
                <van-col span="4" class="borderline">-135</van-col>
                <van-col span="5" class="borderline">支付模式</van-col>
                <van-col span="7" ><span style="margin-right:0.1rem ;background: red;color: white;padding: 0.05rem;">操作</span><span>操作</span>  </van-col>
            </van-row>
        </div>



    </div>

<div class="footbtndiv">
            <div class="footbtn">
                <!--充值-->
                <van-button type="primary">充值</van-button>
            </div>
</div>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { Button } from 'vant';
    import { Row, Col } from 'vant';
    import { Account } from '@/api/brand/brand';

    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                statistics:[],
                msg: "Hello Vue.js",
                list: [
                    {
                    time:'2018-12-15',
                    place:'啊士夫撒旦-金龙小(山偶他)',
                    pay:'+300'
                },      {
                    time:'2018-12-15',
                    place:'啊士大夫-金龙小(山偶他)',
                    pay:'+300'
                },
                ]
            }
        },
        components: {
            [Row.name]:Row,
            [Col.name]:Col,
            [Button.name]:Button,


            //someComponent
        },
        methods:{
            GetAccount(){
                Account().then(res => {
                                    this.statistics = res.data.data;
                                    console.log(this.statistics);
                    }).catch(() => {
                    throw new Error("异常!")
                })
            },

            jump(){
                this.$router.push({path:'/School/DirectorManage'})
            }
        },
        mounted(){
            this.GetAccount()
        }
    }
</script>

<style scoped>
    div{
    }
    .footbtn{
        font-size: 0.18rem;
        font-weight:700;
        position: fixed;
        bottom: 0.1rem;
        left: 20%;
        height: 0.4rem;
        width: 60%;
        line-height: 0.4rem;
        text-align: center;
        color:white;
        border-radius: 0.08rem;
    }
    .footbtndiv{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 0.6rem;
        background-color:white;
        width: 100%;
    }
    >>>.van-button{
        text-align: center;
        height: 0.4rem;
        width: 2.2rem;
        line-height: 0.3rem;
        font-size: 0.18rem;
        font-weight:700;
        border-radius: 0.08rem;
    }
    .watch{
        font-size: 0.14rem;
        padding: 0.1rem 0.2rem;
        margin: 0 0.2rem;
        border: solid 1px #CCCCCC;
        border-radius: 7px ;
    }
    .account_balance{
        text-align: center;
    }
    .Explain{
        color: #CCCCCC;
        font-size: 0.14rem;
        line-height: 0.2rem;
        /*text-align: left;*/
        /*border: solid #dcdcdc;*/
        /*border-width: 0 0 0.01rem  0;*/
        padding: 0.2rem;
    }
    .pay_list{
        text-align: center;
        font-size: 0.12rem;
        /*margin: 0 0.15rem;*/
        line-height: 0.35rem;
    }
    .borderline{
        border-right: 0.01rem solid #CCCCCC;
    }
    .address{
        color: #6699FF;
    }
</style>

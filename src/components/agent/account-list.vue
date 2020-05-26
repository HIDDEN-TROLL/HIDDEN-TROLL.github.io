<template>
    <div style="padding-top: 0.2rem;">
        <div class="watch">
            <van-row type="flex" justify="space-between">
                <van-col span="5">
                    <div class="account_balance">
                        <span style="color: #6699FF">账户余额</span><br>
                        <span>{{overage}}</span>
                    </div>

                </van-col>
                <van-col span="12">
                    <div>
                    <van-button type="primary">提现至微信零钱</van-button>
                </div>
                </van-col>

            </van-row>
        </div>
        <div class="Explain">
            每月16日8点开始结算，16日至20日可结算
        </div>

        <div class="pay_list" v-for="(item,index) in detail" :key="index">
            <van-row type="flex" justify="space-between">
                <van-col span="6">{{item.date}}</van-col>
                <van-col span="13">{{item.name}}</van-col>
                <van-col span="4" v-if="item.type==='1'"><span style="color: #6699FF" >+{{item.amount}}</span></van-col>
                <van-col span="4" v-else-if="item.type==='2'"><span style="color: red">-{{item.amount}}</span></van-col>
            </van-row>
        </div>







    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { Button } from 'vant';
    import { Row, Col } from 'vant';

    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {

                // list: [{
                    overage: '112',
                    detail:[
                        {
                            date: '2018-12-15',
                            name: '啊士夫撒旦-金龙小(山偶他)',
                            amount: '300',
                            type: '1'
                        },
                        {
                            date: '2018-12-15',
                            name: '啊士夫撒旦-金龙小(山偶他)',
                            amount: '300',
                            type: '2'
                        }
                    ]

                 // }]

            }
        },
        components: {
            [Row.name]:Row,
            [Col.name]:Col,
            [Button.name]:Button,


            //someComponent
        }
    }
</script>

<style scoped>
    div{
    }
    >>>.van-button{
       height: 0.3rem;
        width: 1.4rem;
        line-height: 0.3rem;
        font-size: 0.14rem;
        margin-top: 0.04rem;
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
        line-height: 0.5rem;
        text-align: center;
        border: solid #dcdcdc;
        border-width: 0 0 0.01rem  0;
    }
    .pay_list{
        font-size: 0.12rem;
        margin: 0 0.15rem;
        line-height: 0.35rem;
    }
</style>

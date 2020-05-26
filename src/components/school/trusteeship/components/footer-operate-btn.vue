<template>
    <div class="operate-btn">
        <!--此组件用于固定底部按钮-->
        <!--此组件 运用 vant 组件的 flex 布局 vant 运用 24列栅格 最好-->
        <!--最好是24倍数的列表-->
        <!--eventArr 是个数组 数组格式为 [{title:确认修改,type:1}] 这种类型-->
        <!--在父组件中的运用  <Footer :event-arr="arr" v-on:commenEvent="parent"></Footer>  Footer为引入组件的变量 parent为父组件绑定的事件，接受一个参数 参数为从父组件传递的 type 类型-->
        <van-row>
            <van-col v-for="item in eventArr" :span="calculateGrid"><div @click="eventParent(item.type)">{{item.title}}</div></van-col>
        </van-row>
    </div>

</template>

<script>
    import { Row, Col } from 'vant';
    export default {
        name: "footer-operate-btn",
        components:{
            [Row.name]:Row,
            [Col.name]:Col
        },
        props:{
          eventArr:{
              type:Array,
          }
        },
        data(){
            return{
                len:0,
            }

        },
        methods:{
          eventParent(data){
              this.$emit('commenEvent',data)
          }
        },
        computed:{
            calculateGrid:{
                get(){
                    return 24/this.eventArr.length;
                },
                set(val){
                    this.len = val;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .operate-btn{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.4rem;
        padding: 0.08rem 0;
        background-color: #3770FB;
        box-sizing: border-box;
        .van-col{
            flex: 1;
            font-size: 0.14rem;
            color: #fff;
            line-height: 0.24rem;
            text-align: center;
            border-left: 0.01rem solid #fff;
        }
        .van-col:first-child{
            border-left-width:0 ;
        }
    }
</style>
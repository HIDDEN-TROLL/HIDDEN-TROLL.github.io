<template>
    <div class="cl-list">
        <div class="list">
            <van-tabs v-model="active" title-active-color="#3770FB" color="#3770FB" class="van-tabs_width"   >
                <van-tab title="第1班">
                    <div class="test">
                        <Finnotice></Finnotice>
                    </div>
                </van-tab>
                <van-tab title="第2班">  2</van-tab>
                <van-tab title="第3班"></van-tab>
                <van-tab title="第4班"></van-tab>
                <van-tab title="第5班"></van-tab>
                <van-tab title="第6班"></van-tab>
                <van-tab title="第7班"></van-tab>
                <van-tab title="第8班"></van-tab>
                <van-tab title="第9班"></van-tab>
                <van-tab title="第10班"></van-tab>
            </van-tabs>
        </div>
        <div class="c-dowm" @click="downMenuShow">
            <span class="fonticon"><van-icon name="arrow-down" /></span>
        </div>
        <DownMenu  :actions="list" v-on:getIndex="getChange"></DownMenu>
    </div>
</template>

<script>
    import { Icon, Tab, Tabs } from 'vant';
    import DownMenu from './grade-List';
    import Finnotice from './fin-notice';
    import { mapState } from 'vuex';
    import store from '../../../../store'
    export default {
        name: "clas-title-list",
        props:{
            list:{//下拉菜单列表
                mar:'12',
                type:Array
            },
        },
        components:{
            [Icon.name]:Icon,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            DownMenu:DownMenu,
            Finnotice:Finnotice

        },
        data(){
            return{
                active:0
            }
        },
        methods:{
            downMenuShow() {
                this.$store.commit('getShow');
            },
            getChange(data){
                this.active = data.index;
            },
        },
        computed: {
            ...mapState([
                'isShow'
            ]),
        }
    }
</script>

<style scoped lang="less">
    .cl-list{
        font-size: 0.14rem;
        width: 100%;
        overflow: hidden;
        .list{
            float: left;
            /*width: 3rem;*/
            width: 100%;
            overflow: hidden;
            line-height: 0.2rem;
             /deep/ .van-tabs__wrap {
                width: 3rem;
            }
        }
        .c-dowm{
            right: 0.5rem;
            z-index: 555;
            position: relative;
            float: left;
            /*width: 0.4rem;*/
            height: 0.44rem;
            border-bottom: 0.01rem solid #eee;
            box-sizing: border-box;
            .fonticon{
                position: absolute;
                top: 0.11rem;
                height: 0.2rem;
                padding-left: 0.16rem;
                font-size: 0.16rem;
                color: #999;
                border-left: 0.01rem solid #EEEEEE;
            }
        }
    }

       .van-tabs_width>.van-tabs__wrap .van-tabs__wrap--scrollable .van-hairline--top-bottom{
            border: solid;
        }

    .sendnotice[data-v-3460dc55]{
        line-height: 0.2rem;
        font-size: 0.14rem;
    }



</style>

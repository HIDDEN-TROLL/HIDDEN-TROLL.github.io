<template>
    <div >
        <van-nav-bar
                title="校长管理"
                left-text="返回"
                left-arrow
                @click-left="$router.back()"
        />

        <div class="all">

            <div style="font-size: 0.14rem;text-align: center;line-height: 0.5rem;">东西南校区（深圳）</div>

            <div>
                <van-row type="flex" justify="space-between">
                    <van-col span="10"> <div><span style="font-size: 0.14rem;">共计2位校长</span></div></van-col>

                    <van-col span="10">  <div class="search_div">
                        <div><input type="text" class="search" placeholder="输入校长的名称" v-model='search'></div>
                        <div> <i class="van-icon van-icon-search"><!----></i></div>
                    </div></van-col>
                </van-row>
            </div>
            <!--<div class="list">-->
                <!--<span class="head"><img src="../../assets/img/head.jpg"> </span>-->
                <!--<span>林小艾比</span>-->
                <!--<span>账号：123131232</span>-->
                <!--<span>状态：为绑定</span>-->
            <!--</div>-->
            <div v-if="searchData.length > 0">

            <div class="list" v-for="(item,index) in searchData" :key="index">
                <van-row type="flex" justify="space-between">
                    <van-col span="4"><span class="head"><img src="../../assets/img/head.jpg"> </span> </van-col>
                    <van-col span="5"><span style="font-size: 0.14rem;font-weight: 700;">{{item.name}}</span></van-col>
                    <van-col span="8">账号：{{item.account}}</van-col>
                    <van-col span="6" style="margin-right: 0.15rem;"><span>状态：{{item.state}}</span></van-col>
                </van-row>
            </div>

            </div><div v-else style="text-align: center;line-height: 2rem;">找不到此人信息</div>
        </div>


        <Footer :event-arr="arr" v-on:commenEvent="parent"></Footer>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { NavBar } from 'vant';
    import { Row, Col } from 'vant';
    import Footer from '../common/footer-operate-btn'
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                search:'',
                arr:[{title:'新增校长',type:1}],
              list:[
                    {
                    name:'利能效',
                      account:'12324565',
                      state:'未绑定'
                    },  {
                    name:'分为氛围',
                      account:'12324565',
                      state:'未绑定'
                    },  {
                    name:'利昂是效',
                      account:'12324565',
                      state:'未绑定'
                    },
              ]
            }
        },
        components: {
            [NavBar.name]:NavBar,
            [Row.name]:Row,
            [Col.name]:Col,
            Footer:Footer

            //someComponent
        },
        methods:{
            parent(){

            }
        },
      computed: {
          searchData: function() {
              var search = this.search;
              if (search) {
                  return this.list.filter(function(product) {
                      return Object.keys(product).some(function(key) {
                          return String(product[key]).toLowerCase().indexOf(search) > -1
                      })
                  })
              }

              return this.list;
          }
      }
    }
</script>

<style scoped>
    .all{
        margin:0 0.15rem 0.55rem 0.15rem;
        font-size: 0.12rem;

    }
    /**{*/
        /*font-size: 0.12rem;*/

    /*}*/
    .search_div{
        font-size: 0.12rem;
        margin-left:0.05rem;
        float: left;
        border: solid 1px #CCCCCC;
    }
    .van-icon {
        font-size: 0.16rem;
        line-height: 0.24rem;
    }

    .search{
        float: left;
        width:78%;
        margin-left:0.05rem;
        border:solid 1px white;
    }

    /*.list span{*/
        /*margin-right:0.15rem ;*/
    /*}*/
    .list img{
        width: 0.32rem;
        height: 0.32rem;
        border-radius: 7rem;
    }
    .list{
        margin: 0.15rem 0;
        border-radius: 7px;
        line-height: 0.5rem;
        border: solid 1px #CCCCCC;
    }
    .head{
        float: left;
        height: 0.32rem;
        margin: 0.09rem 0.15rem;
    }
</style>


<template>

 <div>
     <van-nav-bar
             :title="name"
             right-text="切换账号"
             @click-right="$router.push({ name: 'SwitchAccount' })"
     />
     <div class="van-tabs_div">
         <van-tabs type="card" custom-class="tag">
             <van-tab title="人数报表"><population @func="getMsgFormSon"></population></van-tab>
             <van-tab title="收费报表"><Pay ></Pay></van-tab>
             <van-tab title="账户管理"><account></account></van-tab>
         </van-tabs>
     </div>
 </div>
</template>

<script>
    import population from './population-list'
    import Pay from './paytable-list'
    import account from './account-list'
    // import datasta from './date-list'
    import { NavBar } from 'vant';
    import { Tab, Tabs } from 'vant';
    import { ROLE_TYPE_BRAND_USER } from '@/utils/constant'

    //import someComponent from './someComponent'
    export default {
        name: "",
        data(){
            return {
                populationmes:[],
                fee:[],
                statistics:[],
                name:'未选择校区'

            }
        },
        components: {
            [NavBar.name]:NavBar,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            population:population,
            account:account,
            Pay:Pay,


            //someComponent
        },
        methods:{
            getMsgFormSon(data){
                this.name = data
                console.log(this.name)
            }
        },
        mounted(){
          // 设置当前是品牌角色端
          this.$store.commit('UPDATE_ROLE_TYPE', ROLE_TYPE_BRAND_USER)
            this.getMsgFormSon()
        }
    }
</script>


<style scoped>
    .van-nav-bar{
        background-color: #3770FB;
    }
    .van-nav-bar__title{
        color: #ffffff;
    }
    .van-nav-bar__text{
        color: white;
    }
    .van-nav-bar .van-icon{
        color: white;
    }


    .van-tabs_div>>>.van-tabs__nav--card .van-tab.van-tab--active {
        background-color: #3770fb;
        color: white;
    }
    .van-tabs_div>>>.van-tabs__nav--card {
        border: 1px solid #3770fb;
    }
    .van-tabs_div>>>.van-tabs__nav--card .van-tab{
        color: #3770fb;
        border-right: 1px solid #3770fb;
    }
    .van-tabs_div>>>.van-tabs__nav--card .van-tab:last-child{
        border-right: none;
    }
    .van-tabs_div>>>.van-tabs--card>.van-tabs__wrap{
        margin-top:0.15rem;
    }
    .van-tabs_div>>>.van-tabs__content{
        margin-top:0.2rem;
    }


</style>

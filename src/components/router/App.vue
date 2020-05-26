
<template>
  <div id="app">
      <keep-alive>
          <router-view />
      </keep-alive>

      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <div id="nav">
        <!--<van-tabbar  v-model="active">-->
            <!--<van-tabbar-item replace to="Homepage" icon="home-o">-->
                <!--首页-->
            <!--</van-tabbar-item>-->
            <!--<van-tabbar-item replace to="Function" icon="bag">-->
                <!--收藏-->
            <!--</van-tabbar-item>-->
            <!--<van-tabbar-item replace to="Message" icon="chat">-->
                <!--消息-->
            <!--</van-tabbar-item>-->
            <!--<van-tabbar-item replace :to="token === null ? '/Login' : 'Person'" icon="manager">-->
                <!--个人-->
            <!--</van-tabbar-item>-->
        <!--</van-tabbar>-->

          <van-tabbar v-model="active">
              <van-tabbar-item @click="go(item.place,index)" v-for="(item,index) in tabList" :key="index">
                  <div>
                      <van-icon :name="item.icon" size="1.5rem" :color="active === index ? '#1989fa' : 'gray'" />
                  </div>
                  {{item.name}}
              </van-tabbar-item>
          </van-tabbar>
      </div>
      <!--<keep-alive>-->
      <!--</keep-alive>-->
  </div>
</template>
<script>
    import { Tabbar, TabbarItem,Icon } from 'vant';
    import { mapState } from 'vuex'

    import '../../assets/js/test-clear.js'
    export default {

        name: "automatic-mode",
        data() {
            return {
                active:0,
                tabList:[
                        {name:'首页',icon:'home-o',place:'Homepage'},
                        {name:'收藏',icon:'bag',place:'Function'},
                        {name:'消息',icon:'chat',place:'Message'},
                        {name:'个人',icon:'manager',place:'Person'},
                    ],
            };
        },
        computed: {
            // 获取vuex中的个人信息（PersonalInformation）
            ...mapState('UserFunction', {
                token: 'token',
                routerIndex: 'routerIndex',
            }),
        },
        components: {
            [Icon.name]: Icon,
            [TabbarItem.name]: TabbarItem,
            [Tabbar.name]: Tabbar,
        },
        methods:{
            go(place,index){
                console.log(index,this.token,place)
                if(index === 3 && this.token === null){
                    this.$router.push({name:'VerificationPage'})
                }
                this.$router.push({name:place})
            }
        },
        mounted(){
            for(let i =0;i<this.tabList.length;i++){
                if(this.tabList[i].place == this.$route.name){
                    this.active = i
                }
            }
        },
        created() {
        }
    }
</script>
<style lang="less" scoped>
    html {font-size: 625%; /*10 ÷ 16 × 100% = 62.5%*/}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 4rem;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: white;
    }
  }
}
a:hover {
    text-decoration: none;
}
 /deep/.van-tabbar {
    border-bottom: solid 1px white;
     -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.2), -10px 10px 10px 10px rgba(255, 255, 255, 0.5);
     box-shadow: 0px 0px 16px 0px rgba(0.5, 0.5, 0.5, 0.3), -10px 10px 10px 10px rgba(255, 255, 255, 0.5);
}
/deep/.van-nav-bar {
    background: #1c1c1c;
    color: white;
}
/deep/.van-nav-bar__text {
    color: white;
}
/deep/.van-nav-bar__title {
    color: white;
}
/deep/.van-nav-bar .van-icon{
    color: white;
}
</style>

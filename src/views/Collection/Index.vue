<template>
  <div class="hello">
    <van-tabs swipeable animated>
      <van-tab v-for="(item,index) in newlsitL" :key="index" :title="item.name">
        <div style="height: 4rem;"></div>

        <div class="card" style="" v-for="(item2,index2) in item.list" :key="index2">
          <div >
            <div style="width: 100px;height: 100px;margin: 0 auto;padding: 15px 0">
              <img class="card-img-top" src="../../assets/img/head.jpg" alt="Card image cap">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{item2.title}}</h5>
              <p class="card-text">{{item2.dec}}.</p>
              <a href="#" @click="checkMore()" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import { NoticeBar,Tab, Tabs,List  } from 'vant';
  export default {
    components: {
      [List.name]: List,
      [Tabs.name]: Tabs,
      [Tab.name]: Tab,
      [NoticeBar.name]: NoticeBar,
    },
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data(){
      return{
        page:0,
        show:false,

        newlsitL:[
          { name:'收藏',
            list: [
              {title:'1PS', dec:'They appear on the TV screen. They occupy a conspicuous place in newspapers and magazines. They are displayed or '},
              {title:'FreeP2', dec:'They appear on the TV scnd magazines. They are displayed or '},
              {title:'AR', dec:'ewspapers and magazines. They are displayed or '},
              {title:'SAI', dec:'They appear onlayed onlayed onlayed onlayed or '},
              {title:'AE', dec:'They appear onlayed onlayed onlayed onlayed or '},
            ]
          },
          { name:'记录',
            list: [
              {title:'1P2222S', dec:'They appear on the TV screen. They occupy a conspicuous place in newspapers and magazines. They are displayed or '},
              {title:'SAI', dec:'They appear onlayed onlayed onlayed onlayed or '},
              {title:'AE', dec:'They appear onlayed onlayed onlayed onlayed or '},
            ]
          },
          { name:'热点',
            list: [
              {title:'1P3S', dec:'They appear on the TV screen. They occupy a conspicuous place in newspapers and magazines. They are displayed or '},
              {title:'SAI', dec:'They appear onlayed onlayed onlayed onlayed or '},
              {title:'AE', dec:'They appear onlayed onlayed onlayed onlayed or '},
            ]
          },
        ],
        active:0
      }
    },
    mounted() {
      this.show = true
    },
    methods:{
      checkMore(){
        this.$router.push({path:'/Person'})
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  .card{
    width: 18rem;
    margin: 0 auto;
    margin-bottom: 20px;
    opacity: 0.8;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  /deep/.van-tab--active {
    font-size: 20px;
  }
  .hello /deep/.van-tabs__line {
    width: 20px !important;
  }
  /deep/.van-tabs__wrap {
    height: 44px;
    position: fixed;
    width: 100%;
    z-index: 9;
  }
</style>

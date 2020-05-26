<template>
    <div>

        <van-nav-bar
            title="林小白"
            left-text="详情通知"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class="van-tabs_div">
            <van-tabs type="card">
                <van-tab title="未读">
                    <Parentsread :task-list="taskListUnread"></Parentsread>
                </van-tab>
                <van-tab title="已阅">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                    >
                        <Parentsread :task-list="taskList"></Parentsread>
                    </van-list>
                </van-tab>
            </van-tabs>
        </div>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
  import { NavBar,List,Tab, Tabs } from 'vant';
  import Parentsread from './components/parents-read'
  import { stuHomework } from '@/api/parent/homework'
  export default {
    name: "",
    components: {
      [NavBar.name]:NavBar,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [List.name]:List,
      Parentsread:Parentsread
    },
    data(){
      return {
        msg: "Hello Vue.js",
        loading:false,
        finished:false,
        taskList:[],
        taskListUnread:[],
        page:1,
      }
    },
    methods:{
      onClickLeft(){
        this.$router.back(-1)
      },
      //获取 已阅、未阅信息
      selectStuworkRead(){
        stuHomework(this.page)
          .then(res=>{
            if (res.status === 200){
              this.loading = false;
              if (this.page === 1){
                if (res.data.data.unReadList.length>0){
                  for (let item of res.data.data.unReadList){
                    if (item.type === '2'){
                      item.subject = item.subject.map(i=>{
                        return `#${i}`
                      })
                    }
                  }
                }
                this.taskListUnread = res.data.data.unReadList
              }
              if (res.data.data.readList.length < 10){
                this.finished = true;
              }else {
                this.page = this.page + 1
              }
              if (res.data.data.readList.length>0){
                for (let item of res.data.data.readList){
                  if (item.type === '2'){
                    item.subject = item.subject.map(i=>{
                      return `#${i}`
                    })
                  }
                }
                this.taskList.push(res.data.data.readList)
              }
            }
          }).catch(()=>{
          throw new Error("异常！")
          })
      },
      onLoad(){
        this.selectStuworkRead();
      }
    },
    created(){
      this.selectStuworkRead();
    }
  }
</script>

<style scoped>
    .van-nav-bar .van-icon ,.van-nav-bar__text{
        color: white;
    }
    .van-nav-bar{
        background-color:#3770FB ;
    }
    .van-nav-bar__title{
        color: white;
    }


    .van-tabs{
        margin-top:0.15rem;
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
    }
    .van-tabs_div>>>.van-tabs__nav--card .van-tab{
        border-right: none;
    }


</style>

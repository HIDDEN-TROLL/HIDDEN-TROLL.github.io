<template>
  <div id="history-record">
    <!--作业通知历史记录-->
    <div class="go-back">
      <van-nav-bar
          :fixed="true"
          title="作业通知情况"
          left-text="返回"
          right-text="作业通知"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
      />
    </div>
    <div class="content">
      <div class="tab">
        <span class="left-icon flex" @click="computedDate(1)"><van-icon name="arrow-left" /></span>
        <span class="date flex">{{requestDate}}</span>
        <span class="right-icon flex" @click="computedDate(2)"><van-icon name="arrow"  v-show="requestDate!==currentDate"/></span>
      </div>
      <div class="student">
        <van-tabs type="card" title-active-color="#fff" color="#3770FB" title-inactive-color="#3770FB" >
          <van-tab title="完成通知">
            <Classlist :class-list="classList" v-on:classGrade="getChangeIndex"></Classlist>
            <div class="complete" v-if="JSON.stringify(homeWork)!=='{}'">
              <!--完成列表-->
              <div class="info-summary">
                <span class="flex">{{homeWork.doneNum}}人完成</span>
                <span class="flex">{{homeWork.doneNum - homeWork.readNum}}人未阅</span>
                <span class="flex">{{homeWork.readNum}}人已阅</span>
              </div>
              <van-row type="flex" justify="center" v-for="(item,index) in homeWork.stuList.done" :key="index">
                <van-col span="8" class="items">{{item.stuName}}</van-col>
                <van-col span="8" class="items">{{item.read === 0?'未阅':'已阅'}}</van-col>
                <van-col span="8" class="items">{{item.time}}</van-col>
              </van-row>
            </div>
            <div class="uncomplete" v-if="JSON.stringify(homeWork)!=='{}'">
              <!--未完成列表-->
              <div class="info-summary">
                <span class="flex">{{homeWork.undoneNum}}人未完成</span>
              </div>
              <van-row type="flex" justify="center" v-for="(item,index) in homeWork.stuList.undone" :key="index">
                <van-col span="12" class="items">{{item.stuName}}</van-col>
                <van-col span="12" class="items">未完成</van-col>
              </van-row>
            </div>
          </van-tab>
          <van-tab title="详情通知">
            <Classlist :class-list="classList" v-on:classGrade="getChangeIndex"></Classlist>
            <div class="complete" v-if="JSON.stringify(homeWork)!=='{}'">
              <!--完成列表-->
              <div class="info-summary">
                <span class="flex">{{homeWork.doneNum}}人完成</span>
                <span class="flex">{{homeWork.doneNum - homeWork.readNum}}人未阅</span>
                <span class="flex">{{homeWork.readNum}}人已阅</span>
              </div>
              <van-row type="flex" justify="center" v-for="(item,index) in homeWork.stuList.done" :key="index">
                <van-col span="6" class="items">{{item.stuName}}</van-col>
                <van-col span="6" class="items">{{item.read === 0?'未阅':'已阅'}}</van-col>
                <van-col span="6" class="items">{{item.time}}</van-col>
                <van-col span="6" class="items viewdetail" ><span @click="studentDetail(item.stuId, item.stuName)">{{item.doneSubject ? '查看详情':''}}</span></van-col>
              </van-row>
            </div>
            <div class="uncomplete" v-if="JSON.stringify(homeWork)!=='{}'">
              <!--未完成列表-->
              <div class="info-summary">
                <span class="flex">{{homeWork.undoneNum}}人未完成</span>
              </div>
              <van-row type="flex" justify="center" v-for="(item,index) in homeWork.stuList.undone" :key="index">
                <van-col span="8" class="items">{{item.stuName}}</van-col>
                <van-col span="16" class="items">未完成：{{item.undoneSubject ? item.undoneSubject.join('&'):'语文&数学&英语'}}</van-col>
              </van-row>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import { NavBar,Icon,Tab, Tabs,Row, Col } from 'vant';
  import Classlist from './components/class-list';
  import { dateHistoryHomework } from '@/api/teacher/homework'
  export default {
    name: "history-record",
    components:{
      [NavBar.name]:NavBar,
      [Icon.name]:Icon,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [Row.name]:Row,
      [Col.name]:Col,
      Classlist:Classlist,
    },
    data(){
      return{
        classList:[],//保存班级列表
        classHomework:[],//保存班级学生作业情况
        homeWork:{},//保存当前页面显示的数据
        current:0,//记录当前班级的下标
        requestDate:'',//请求日期
        currentDate:'',//保存当前日期
      }
    },
    methods:{
      onClickLeft(){
        this.$router.back(-1)
      },
      onClickRight(){
        this.$router.push({name:'TeacherHomeworkIndex'})
      },
      getChangeIndex(obj){
        this.current = obj.active;
        this.homeWork = this.classHomework[this.current];
      },
      //获取 某个日期下的 历史作业记录
      selectHistory(){
        this.$loading(undefined, undefined, true)
        dateHistoryHomework(this.requestDate).then(res=>{
          //console.log(res);
          this.$loadingHide()
          if (res.status === 200){
            if (res.data.data.clsStu && res.data.data.clsStu.length > 0){
              this.homeWork = {};
              this.classHomework = [];
              this.classList = [];
              let d = res.data.data.clsStu;
              for (let item of d){
                this.classList.push({
                  name:item.clsName,
                  id:item.clsId
                });

                this.classHomework.push({
                  doneNum:item.doneNum,
                  readNum:item.readNum,
                  undoneNum:item.undoneNum,
                  stuList:item.stuList,
                  id:item.clsId
                })
              }
              //console.log(this.classHomework)
              this.homeWork = this.classHomework[this.current]
            }
          }
        }).catch(()=>{
          throw new Error("异常！")
        })
      },
      //计算时间
      computedDate(type){
        let date = new Date(this.requestDate);
        date.setDate(type === 1 ? date.getDate() - 1 : date.getDate() + 1);
        this.requestDate = date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate();
        this.selectHistory();
      },
      // 详情
      studentDetail(id, name){
        this.$router.push({name:'TeacherHomeworkUnread',params:{
            stuId:id,
            date:this.requestDate,
            name:name
          }
        })
      },
    },
    created(){
      //获取初始时间
      if (this.$route.params.date){
        this.requestDate = this.$route.params.date
      }else {
        let date = new Date();
        date.setDate(date.getDate() - 1);
        this.requestDate = date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate();
      }
      this.selectHistory();

      let current = new Date();
      current.setDate(current.getDate() - 1);
      this.currentDate = current.getFullYear() +"-"+ (current.getMonth()+1) +"-"+ current.getDate();
    }
  }
</script>

<style scoped lang="less">
#history-record{
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
    }
  }
  .content{
    width: 100%;
    padding:0.46rem 0.16rem 0.16rem;
    box-sizing: border-box;
    .tab{
      width: 100%;
      display: flex;
      line-height: 0.4rem;
      .flex{
        flex: 1;
        text-align: center;
        font-size: 0.14rem;
        color: #666;
      }
      .date{
        flex: 2;
        color: #3770fb;
      }
    }
    .student{
      width: 100%;
     /deep/ .van-tabs--card{
        .van-tabs__nav--card{
          margin: 0;
        }
       .complete,.uncomplete{
         .info-summary{
           display: flex;
           .flex{
             flex: 1;
             font-size: 0.14rem;
             color: #666;
             line-height: 0.4rem;
             text-align: center;
           }
         }
         /deep/ .van-row--flex{
           padding: 0.08rem 0 ;
           border-bottom: 1px solid #666;
           .items{
             font-size: 0.14rem;
             color: #666;
             line-height: 0.2rem;
             text-align: center;
           }
           .viewdetail{
             color: #3770fb;
           }
         }
       }
      }
    }
  }
}
</style>
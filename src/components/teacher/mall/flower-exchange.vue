<template>
  <div id="flower-exchange">
    <!--红花兑换  教师端-->
    <div class="go-back">
      <van-nav-bar :fixed="true" title="红花兑奖" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    </div>
    <div class="student">
      <p class="title">请选择学生</p>
      <van-collapse v-model="activeName" accordion>
        <van-collapse-item :title="item.clsName" :name="'共'+item.stuList.length+'人'" v-for="(item,index) in studentArr" :key="index">

          <div class="student-list">
            <van-row gutter="16">
              <van-col span="6"  v-for="(list, idx) in item.stuList" :key="idx">
                <div class="student-info" :class="{active:classIndex===index&&studentIndex===idx}" @click="nextExchange(list.stuId, index, idx, list.safflowerNum)">
                  <span class="name">{{list.stuName}}</span>
                  <span class="flower">{{list.safflowerNum}}朵</span>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
  import { NavBar, Icon, Row, Col, List,Collapse, CollapseItem  } from "vant";
  import { flowerStudent } from '@/api/teacher/mall'
  import FooterBtn from '../../common/footer-operate-btn'
  export default {
    name: "flower-exchange",
    components:{
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Row.name]:Row,
      [Col.name]:Col,
      [List.name]:List,
      [Collapse.name]:Collapse,
      [CollapseItem.name]:CollapseItem,
      FooterBtn:FooterBtn
    },
    data(){
      return{
        activeName: '1',
        studentArr:[],
        classIndex:0,
        studentIndex:0,
        btnText:[
          {
            type:1,
            title:'下一步'
          }
        ],
        studentId:null,//保存选择的学生id
        flowerNumber:0,//当前选择的学生的红花数量
      }
    },
    methods:{
      onClickLeft() {
        this.$router.back(-1);
      },
      //获取 学生列表
      selectStudentList(){
        flowerStudent()
          .then(res=>{
            //console.log(res);
            if (res.status === 200){
              this.studentArr = res.data.data;
            }
          }).catch(()=>{
            throw new Error("异常！")
          })
      },
      nextExchange(id, pIndex, cIndex, flowerNum){
        this.studentId = id;
        this.classIndex = pIndex;
        this.studentIndex = cIndex;
        this.flowerNumber = flowerNum;
      },
      operateBtn(){
        this.$router.push({name:'TeacherMallExchangePrize',params:{id:this.studentId,flower:this.flowerNumber}})
      }
    },
    created(){
      this.selectStudentList();
    }
  }
</script>

<style scoped lang="less">
#flower-exchange{
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
  .student{
    width: 100%;
    padding: 0.46rem 0 0.4rem;
    box-sizing: border-box;
    .title{
      font-size: 0.14rem;
      line-height: 0.3rem;
      color: #666;
      text-align: center;
    }
    /*.van-collapse{
      .van-collapse-item{
       /deep/ .van-cell{
          background-color: #3770fb;
        }
      }
    }*/
    .student-list{
      /*display: flex;*/
      .student-info{
        /*flex: 1;*/
        font-size: 0.14rem;
        color: #999;
        margin:0.08rem 0;
        text-align: center;
        border: 1px solid #ddd;
        .name{
          display: block;
          font-size: 0.14rem;
          color: #999;
          line-height: 0.2rem;
          border-bottom: 1px solid #ddd;
        }
        .flower{
          display: block;
          font-size: 0.14rem;
          line-height: 0.2rem;
          color: #999;
        }
      }
      .student-info.active{
        border-color: #3770fb;
        .name,.flower{
          color: #3770fb;
        }
      }
    }
  }
}
</style>
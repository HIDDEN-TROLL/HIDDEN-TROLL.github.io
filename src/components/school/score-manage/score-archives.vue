<!-- 成绩档案-->
<template>
  <div class="score-archives">
    <nav-bar :title="'成绩档案'" :leftText="'返回'" :rightText="''" :id="''"></nav-bar>
    <div class="chooseClass">
    <!-- 班级选择 -->
      <ClassList :class-list="classNameList" v-on:classGrade="getChangeIndex"></ClassList>
    </div>
    <ul class="chooseSubject">
      <li
        v-for="(item,index) of arr"
        :key="index"
        @click="changeCurrent(index)"
        :class="{active:idex==index}"
      >{{item}}</li>
    </ul>
    <div class style="height: 0.1rem;background-color: #F3F7F8;"></div>
    <div id="barChart" class="barCharts"></div>
    <div class style="height: 0.1rem;background-color: #F3F7F8;"></div>
    <Swipe :show-indicators="false" :autoplay="0">
      <SwipeItem>
        <div class="score-table">
          <p class="table-thead">
            <span style="width: 20%;">姓名</span>
            <span style="width: 20%;">最新分数</span>
            <span style="width: 25%;">单元</span>
            <span style="width: 28%;">录入日期</span>
            <span style="width: 5%;text-align: right;"></span>
          </p>
          <div class="">

            <div class="" ref="touchContent" v-for="(item,index) of tabListLeft" :key="index" :style="leftTran(index)">
              <p class="table-body"
                 @click="$router.push({name: 'ScoreManageEcharts',query:{id:item.stuId,subjectId:subjectId,stuName:item.stuName,className:className}})"
              >
                <span style="width: 20%;">{{item.stuName}}</span>
                <span style="width: 20%;">{{item.latestScore}}</span>
                <span style="width: 25%;">{{item.unit}}</span>
                <span style="width: 28%;">{{item.date}}</span>
                <span style="width: 5%;text-align: right;"> > </span>
              </p>
            </div>

          </div>
          <!--<p style="color: #999;text-align: center;margin-top: 0.2rem;margin-bottom: 0.1rem" v-if="count>1">{{page===count?' &lt;&lt;可左滑动':page===1?' 可右滑动&gt;&gt;':'&lt;&lt; 可左右滑动&gt;&gt;'}}</p>-->
        </div>
      </SwipeItem>
      <SwipeItem>
        <div class="score-table">
          <p class="table-thead">
            <span style="width: 20%;">姓名</span>
            <span style="width: 20%;">历史最高</span>
            <span style="width: 25%;">历史最低</span>
            <span style="width: 28%;">进/退步(分数)</span>
            <span style="width: 5%;text-align: right;"></span>
          </p>
          <div class="">

            <div ref="touchContent" v-for="(item,index) of tabListRight" :key="index" :style="leftTran(index)">
              <p class="table-body" @click="$router.push({name: 'ScoreManageEcharts',query:{id:item.stuId,subjectId:subjectId,stuName:item.stuName,className:className}})">
                <span style="width: 20%;">{{item.stuName}}</span>
                <span style="width: 20%;">{{item.highest}}</span>
                <span style="width: 25%;">{{item.minimum}}</span>
                <span style="width: 28%;">{{item.between}}</span>
                <span style="width: 5%;text-align: right;"> > </span>
              </p>
            </div>

          </div>
          <!--<p style="color: #999;text-align: center;margin-top: 0.2rem;margin-bottom: 0.1rem" v-if="count>1">{{page===count?' &lt;&lt;可左滑动':page===1?' 可右滑动&gt;&gt;':'&lt;&lt; 可左右滑动&gt;&gt;'}}</p>-->
        </div>
      </SwipeItem>

    </Swipe>

    <div class="bott_yi">
      <p class="tip">&lt;&lt; 可左右滑动&gt;&gt;</p>
      <van-button size="large" @click="$router.push({name: 'ChangeClassList'})">修改成绩</van-button>
    </div>
  </div>
</template>
<script>
import { Button, Swipe, SwipeItem } from "vant";
import navBar from "../../common/nav-bar";
import ClassList from "../components/class-list";
import { selectClassList } from "@/api/school/score-manage";
import { getScoreRecord } from "@/api/school/score-manage";
export default {
  components: {
    [Button.name]: Button,
    navBar,
    ClassList: ClassList,
    Swipe,
    SwipeItem,
  },
  data() {
    return {
      subjectId: 1,
      arr: ["语文", "数学", "英语"],
      idex: 0,
      currentClaassId:"",
      className:"",
      classNameList:[],
      //echarts date
      legendData:[],
      seriesColor:[],
      seriesData:[],

      // tabel date
      tabListLeft:[],
      tabListRight:[],
      count:1,
      page:1,
    };
  },
  mounted() {

  },
  created() {
   this.getClassList();
  },

  methods: {
    //科目选择
    changeCurrent(index) {
      this.idex = index;
      this.subjectId = index + 1;
        this.$loading(undefined, undefined, true)
      this.getScoreRecord(); //更新数据
    },

    // 点击班级,子组建传过来的
    classGrade(val) {
      this.classTypeId = val.id;
      // console.log(val.id,"子组件班级传来的");
    },
    // 切换年级级重置
    getChangeIndex(obj) {
      if (obj.id != this.activeId) {
        this.currentClaassId = obj.id;
        this.className =obj.name;
        this.$loading(undefined, undefined, true)
        this.getScoreRecord(); //更新数据
      }
    },
    // //点击跳转详情页
    // routerLink(item){

    // },
    onSwipeLeft(){
     //console.log(1)
      //console.log(this.$refs.touchContent);
      if (this.page < this.count) {
        for (let item of this.$refs.touchContent) {
          let lf = item.style.left.slice(0,-2);
          item.style.left = `${parseFloat(lf) - 3.75}rem`
        }
        this.page = this.page + 1;
      }

    },
    onSwipeRight(){
      if (this.page <= this.count && this.page !==1) {
        for (let item of this.$refs.touchContent) {
          let lf = item.style.left.slice(0,-2);
          item.style.left = `${parseFloat(lf) + 3.75}rem`
        }
        this.page = this.page - 1;
      }

    },
    //获取档案内容
    getScoreRecord() {
      return getScoreRecord(this.currentClaassId, this.subjectId)
        .then(res => {
          //班级列表数据处理
          if (res.data.meta.success) {
            this.legendData = res.data.data.pieChart.legendData;
            this.seriesColor = res.data.data.pieChart.seriesColor;
            this.seriesData = res.data.data.pieChart.seriesData;
            //this.tabListLeft = res.data.data.leftLatestScore;
            // this.tabListLeft = [];
            // if (res.data.data.leftLatestScore.length > 0) {
            //   let len = res.data.data.leftLatestScore.length;
            //   let n = 5;
            //   let lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1 );
            //   this.count = lineNum;
            //   for (let i = 0; i < lineNum; i++) {
            //     // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
            //     let temp = res.data.data.leftLatestScore.slice(i*n, i*n+n);
            //     this.tabListLeft.push(temp);
            //   }
            //   //console.log(this.tabListLeft)
            // }
            this.tabListLeft = res.data.data.leftLatestScore
            this.tabListRight = res.data.data.rightHistoryScore
            this.initCharts();
            this.$loadingHide()
          }
        })
        .catch(() => {});
    },
      //获取班级列表
    getClassList() {
       this.$loading(undefined, undefined, true)
      return selectClassList(0, 0).then(res => {
        //班级列表数据处理
        if (res.data.meta.success) {
          this.classNameList = [];
          this.currentClaassId = res.data.data.list[0].id;
           this.className=res.data.data.list[0].name;
            //获取档案内容
          this.getScoreRecord()
          for (let item of res.data.data.list) {
            if (item.id) {
              this.classNameList.push({
                id: item.id,
                name: item.name
              });
            }
          }
        }
      });
    },

    initCharts() {
      let echartId = document.getElementById("barChart");
      let barChart = this.echarts.init(echartId);
      let option = {
        legend: {
          orient: "vertical",
          top: "middle",
          bottom: 10,
          right: 60,
          data: this.legendData,
        },
        color: this.seriesColor,
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["35%", "50%"],
            // 隐藏标题
            label: {
              normal: {
                show: false
              }
            },
            // 隐藏指示线
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.seriesData
          }
        ]
      };
      barChart.setOption(option);
    }
  },
  computed:{
    leftTran:()=>{
      return (i)=>{
        return {left:`${i*3.75}rem`}
      }

    }
  },
};
</script>
<style lang="less" scoped>
@import "performance";
.tip {
  color: rgb(153, 153, 153);
  text-align: center;
  position: fixed;
  bottom: 0.4rem;
  width: 100%;
  background: white;
  line-height: 0.3rem;
  z-index: 99;
}
</style>



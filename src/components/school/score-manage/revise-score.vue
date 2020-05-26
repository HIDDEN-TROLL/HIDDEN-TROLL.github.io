<!-- 修改时间 -->
<template>
  <div class="resiveScore">
    <head-top :title="'修改成绩'" :rightText="''" :leftText="'取消修改'" :id="''"></head-top>
    <div class="chooseClass">
      <!-- 班级选择 -->
      <ClassList :class-list="classNameList" v-on:classGrade="getChangeIndex"></ClassList>
    </div>
    <section class="student-wrapper">
      <div class="all-student">
        <van-row gutter="20">
          <van-col span="8" v-for="(item,index) of performance"
                   :key="index">
            <span @click="changeCurrent(index,item.stuId,item.oftenScores)" :class="{active:idex==index}">{{item.stuName}}</span></van-col>
        </van-row>

      </div>
      <p class="discription">向上滑动查看更多 ^</p>
    </section>
    <div class style="height: 0.1rem;background-color: #F3F7F8;"></div>
    <div class="term-tab">
      <van-tabs type="card" v-model="teamId" @click="teamSelect">
        <van-tab title="上学期"></van-tab>
        <van-tab title="下学期"></van-tab>
      </van-tabs>
    </div>
    <section class="student-score">
      <p class="discription">该学生最后一次录入的成绩为：</p>
      <van-row class="subject">
        <van-col span="12">科目：{{lastSubjctName}}</van-col>
        <van-col span="6">
          修改为
          <van-icon name="arrow"/>
        </van-col>
        <van-col span="6">
          <span @click="onSubjectSlecte">
            <span class="select-text">{{subjectValue}}</span>
            <van-icon name="arrow-down"/>
          </span>
        </van-col>
      </van-row>
      <van-row class="unit">
        <van-col span="12">单元：{{lastUnit}}</van-col>
        <van-col span="6">
          修改为
          <van-icon name="arrow"/>
        </van-col>
        <van-col span="6">
          <span @click="onUnitSlecte">
            <span class="select-text">{{unitValue}}</span>
            <van-icon name="arrow-down"/>
          </span>
        </van-col>
      </van-row>
      <van-row class="score">
        <van-col span="12">分数：{{lastScore}}</van-col>
        <van-col span="6">
          修改为
          <van-icon name="arrow"/>
        </van-col>
        <van-col span="6">
          <van-button type="info" @click="modifiedGrades()">{{submitScore}}</van-button>
        </van-col>
      </van-row>
      <p class="input-time">该成绩录入时间：{{inputTime}}</p>
      <p class="edit-time">最近一次修改时间：{{editTime}}</p>
      <p class="notify">须知：修改功能仅能修改，每位学生最后一次录入的成绩！</p>
    </section>
    <van-button type="info" class="modify-score" @click="editScore">确认修改</van-button>
    <!-- 科目选择下拉菜单 -->
    <van-actionsheet v-model="showSubjectSlecte" :actions="subjectArr" @select="onSelectSubject"/>
    <!-- 单元选择下拉菜单 -->
    <van-actionsheet v-model="showUnitSlecte" :actions="unitArr" @select="onSelectUnit"/>
    <!-- 成绩选择弹窗 -->
    <van-popup v-model="showScore" position="right" :overlay="false">
      <div id="resultsPop-up" :style="popupHeight">
        <div class="content">
          <div class="top-nav">
            <van-row>
              <van-col span="10">
                <div @click="cancelChange">
                  <van-icon name="arrow-left"/>取消修改
                </div>
              </van-col>
              <van-col span="10">修改分数</van-col>
              <van-col span="4"></van-col>
            </van-row>
          </div>
          <div class="header">
            <div class="bod-s">
              <span class="xiaodian" @click="swichT">
                <van-switch
                  v-model="codeChecked"
                  size="0.2rem"
                  inactive-color="#fff"
                  active-color="#84C225"
                />
                <span v-text="codeChecked?'小数点功能已开启':'小数点功能已关闭'"></span>
              </span>
            </div>
          </div>
          <div class="middle">
            <div>
              <p class="p_flex">
                <span class="studs_yi">
                  <i></i>常用
                </span>
              </p>
              <ul>
                <li
                  v-for="(item,index) in fenshuList"
                  :key="index"
                  :class="item===studeF?'fenshu--active':''"
                >
                  <p v-text="item" @click="scoresSelecte(item)"></p>
                </li>
              </ul>
            </div>
          </div>
          <p class="huis"></p>
          <div class="ftooer">
            <p class="p_flex">
              <span class="studs_yi">
                <i></i>全部
              </span>
            </p>
            <van-row>
              <van-col span="12" :class="['one_col',qujianI===1?'col-active':'ol-m']">
                <div @click="scoresRange(1)">0至50</div>
              </van-col>
              <van-col span="12" :class="['two_col',qujianI===2?'col-active':'ol-m']">
                <div @click="scoresRange(2)">51至100</div>
              </van-col>
              <!-- <van-col span="8" :class="['thre_col',qujianI===3?'col-active':'ol-m']">
                <div @click="scoresRange(3)">101至150</div>
              </van-col> -->
            </van-row>
            <ul>
              <li
                v-for="(item,index) in fenshu"
                :key="index"
                :class="item==studeF?'fenshu--active':''"
              >
                <p v-text="item" @click="fenshuC(item)"></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import {
  Tab,
  Tabs,
  Button,
  Row,
  Col,
  Icon,
  Actionsheet,
  Switch,
  Popup
} from "vant";
import headTop from "../../common/nav-bar";
import ClassList from "../components/class-list";
import { selectClassList } from "@/api/school/score-manage";
import { getScoreStudent } from "@/api/school/score-manage";
import { getLastScore } from "@/api/school/score-manage";
import { putStudentScores } from "@/api/school/score-manage";
import { getCollection } from "@/api/school/score-manage";
import { isEmpty, isNumeric } from '@/utils'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    [Switch.name]: Switch,
    [Popup.name]: Popup,
    [Actionsheet.name]: Actionsheet,
    headTop,
    ClassList: ClassList
  },
  data() {
    return {
      showSubjectSlecte: false, //科目选择框
      showUnitSlecte: false, //单元选择框
      subjectArr: [], //科目数据
      unitArr: [], //单元数据
      subjectValue: "选择科目",
      unitValue: "选择单元",
      subjectId: "",
      unitId: "",
      teamId: "",
      lastScore: "--", //最后一次录入的成绩
      lastSubjct: "--", //最后一次录入的科目·
      lastSubjctName: "--", //最后一次录入的科目名称
      lastUnit: "--", //最后一次录入的单元
      lastUnitId: 0, //最后一次录入的单元ID
      inputTime: "--", //录入时间
      editTime: "--", //最近修改时间
      lastScoreId: "--", //成绩ID
      classNameList: [], //班级列表
      currentClaassId: [], //班级ID
      performance: [], //学生列表
      idex: 0, // class:active 控制
      stuId: "--", //学生ID
      scoreId: "--", //成绩ID

      showScore: false, //成绩选择弹窗
      codeChecked: false, //弹窗小数点
      fenshu1: [],
      fenshu2: [],
      fenshu3: [],
      show2: false,
      qujianI: 1,
      linFen: "", //临时分数
      checked: false,
      achievementScoreList: [], //学生分数成绩
      fenshuList: [],
      fenshu: [], //分数列表
      oftenScores: [],
      studeF: "", //当前学生分数回显
      popupHeight: "",
      submitScore: "点我改分"
    };
  },
  created() {
    this.getClassList();
    this.getCollection();
    this.teamset(); //设置默认学期
  },
  watch: {
    showScore() {
      if (!this.showScore) {
        this.qujianI = 1;
        this.codeChecked = false;
        // this.studeF=''
        // //console.log(777);
      } else {
        if (this.studeF !== "") {
          if (String(this.studeF).indexOf(".") + 1 > 0) {
            this.codeChecked = true;
            if (this.studeF <= 50) {
              this.qujianI = 1;
            } else if (this.studeF >= 101) {
              this.qujianI = 3;
            } else {
              this.qujianI = 2;
            }
            this.swichT();
          } else {
            this.codeChecked = false;
            if (this.studeF <= 50) {
              this.qujianI = 1;
            } else if (this.studeF >= 101) {
              this.qujianI = 3;
            } else {
              this.qujianI = 2;
            }
            this.swichT();
          }
        } else {
          this.qujianI = 2;
          this.swichT();
        }
      }
    }
  },
  methods: {
    // 跳到修改成绩弹框
    modifiedGrades() {
      this.studeF = this.lastScore; //弹窗回显
      let id = this.stuId; //学生ID
      let oftenScores = this.oftenScores; //常用分数
      this.popupHeight = "height:" + window.screen.height + "px"; //弹窗高度
      this.showScore = true;
      this.studentid = id;
    },
    //设置弹窗分数
    staticFraction() {
      this.fenshu1 = [];
      this.fenshu2 = [];
      this.fenshu3 = [];
      for (let i = 0; i < 51; i++) {
        if (this.codeChecked) {
          this.fenshu1.push(i + 0.5);
        } else {
          this.fenshu1.push(i);
        }
      }
      for (let i = 51; i < 101; i++) {
        if (this.codeChecked) {
          // this.fenshu2.push(i + 0.5);
           if (i == 100) {
            this.fenshu2.push(i);
          } else {
            this.fenshu2.push(i + 0.5);
          }
        } else {
          this.fenshu2.push(i);
        }
      }
      // for (let i = 101; i < 151; i++) {
      //   if (this.codeChecked) {
      //     if (i == 150) {
      //       this.fenshu3.push(i);
      //     } else {
      //       this.fenshu3.push(i + 0.5);
      //     }
      //   } else {
      //     this.fenshu3.push(i);
      //   }
      // }
    },
    // 取消修改分数
    cancelChange() {
      this.showScore = false;
      this.codeChecked = false;
      this.studeF = 0; //清除回显分数
      this.fenshu = this.fenshu1; //设置默认区间
    },
    // 开关小数点
    swichT() {
      //console.log(this.codeChecked);
      this.staticFraction();
      this.intervalAssignment();
      // //console.log(this.fenshu1,this.fenshu2)
    },
    // 分数区间
    scoresRange(i) {
      this.qujianI = i;
      this.intervalAssignment();
    },
    // 分数区间判断复制
    intervalAssignment() {
      if (this.qujianI === 1) {
        this.fenshu = this.fenshu1;
      } else if (this.qujianI === 2) {
        this.fenshu = this.fenshu2;
      } else {
        this.fenshu = this.fenshu3;
      }
    },
    // 列表分数选择
    fenshuC(item) {
      this.submitScore = item;
      this.showScore = false;
      this.codeChecked = false;
    },
    // 常用分数选择
    scoresSelecte(item) {
      item = parseInt(item);
      this.fenshuC(item);
    },

    //设置默认学期
    teamset() {
      if (new Date().getMonth() + 1 >= 2 && new Date().getMonth() + 1 < 9) {
        this.teamId = 1; //下学期
      } else {
        this.teamId = 0; //上学期
      }
    },
    //学期选择
    teamSelect() {
      this.$loading(undefined, undefined, true);
      this.getScore(); //获取学数学最后一次录入成绩
    },
    //科目选择弹窗
    onSubjectSlecte() {
      this.showSubjectSlecte = true;
    },
    //单元选择弹窗
    onUnitSlecte() {
      this.showUnitSlecte = true;
    },
    //科目选择
    onSelectSubject(item) {
      this.subjectValue = item.name;
      this.subjectId = item.value;
      this.showSubjectSlecte = false;
    },
    //单元选择
    onSelectUnit(item) {
      this.unitValue = item.name;
      this.unitId = item.value;
      this.showUnitSlecte = false;
    },
    //提交修改
    editScore() {
      if (isEmpty(this.stuId) || !isNumeric(this.stuId)) {
        this.$toast('还没有选择学生，请先选择学生')
        return
      }
      if (isEmpty(this.lastScoreId) || !isNumeric(this.lastScoreId)) {
        this.$toast('这个学生还没有提交过成绩，请先到“成绩管理”录入成绩')
        return
      }

      let isModified = false
      let subjectValue
      let unitValue
      let score
      if (isNumeric(this.subjectId)) {
        isModified = true
        subjectValue = this.subjectId
      } else if (isNumeric(this.lastSubjct)) {
        subjectValue = this.lastSubjct
      } else {
        this.$toast('请选择要修改的科目')
        return
      }

      if (isNumeric(this.unitId)) {
        isModified = true
        unitValue = this.unitId
      } else if (isNumeric(this.lastUnitId)) {
        unitValue = this.lastUnitId
      } else {
        this.$toast('请选择要修改的单元')
        return
      }

      if (isNumeric(this.submitScore)) {
        isModified = true
        score = this.submitScore
      } else if (isNumeric(this.lastScore)) {
        score = this.lastScore
      } else {
        this.$toast('请选择要修改的分数')
        return
      }

      if (!isModified) {
        this.$toast('请选择要修改的科目、单元、分数')
        return
      }

      let parmes = {
        scoreId: this.lastScoreId,
        subjectValue,
        unitValue,
        score,
      };
      if(this.submitScore==="点我修改"){
          parmes.score = this.lastScore
      }
      // if (this.subjectId === "" && this.submitScore==="点我修改" && this.unitId ==="") {
      //   Toast("请修改成绩后提交");
      // } else {
        this.$loading()
        return putStudentScores(parmes).then(res => {
          //修改分数提交
          if (res.data.meta.success) {
            this.$toast('修改成功')
            // this.getScoreStudent(); //重新渲染学生列表
            this.getScore()
          } else {
            this.$loadingHide()
          }
        })
          .catch(() => {
            this.$loadingHide()
          });
      // }
    },
    // 切换班级重置
    getChangeIndex(obj) {
      if (obj.id != this.activeId) {
        this.currentClaassId = obj.id;
        this.idex = 0; //重置选中学生
        this.$loading(undefined, undefined, true);
        this.getClassList(); //更新数据
      }
    },

    changeCurrent(index, id, oftenScores) {
      this.idex = index;
      this.stuId = id;
      this.oftenScores = oftenScores; //常用分数，修改成绩弹窗用
      //   置空数据，避免污染
      this.lastScore = ""; //最后一次录入的成绩
      this.lastSubjct = ""; //最后一次录入的科目ID
      this.lastUnit = ""; //最后一次录入的单元
      this.inputTime = ""; //录入时间
      this.editTime = ""; //最近修改时间
      this.lastSubjctName = "";

      this.subjectValue = '选择科目'
      this.unitValue = '选择单元'
      this.subjectId = ''
      this.unitId = ''
      this.submitScore = '点我改分'
      this.$loading(undefined, undefined, true);
      this.getScore();
    },
    //学生最后一次录入成绩
    getScore() {
      return getLastScore(this.teamId + 1, this.stuId).then(res => {
        //班级列表数据处理
        if (res.data.meta.success) {
          this.lastScore = res.data.data.score; //最后一次录入的成绩
          this.lastSubjct = res.data.data.subject; //最后一次录入的科目ID
          this.lastUnit = res.data.data.unit; //最后一次录入的单元
          this.lastUnitId = res.data.data.unitId; //最后一次录入的单元
          this.inputTime = res.data.data.createDate; //录入时间
          this.editTime = res.data.data.lastUpdateTime; //最近修改时间
          this.lastScoreId = res.data.data.scoreId; //成绩id
          this.lastSubjctName = res.data.data.subjectText; //科目
          this.submitScore = "点我改分";
        }
      })
        .finally(() => {
          this.$loadingHide()
        })
    },
    //获取班级列表
    getClassList() {
      this.$loading(undefined, undefined, true);
      return selectClassList(0, 0).then(res => {
        //班级列表数据处理
        if (res.data.meta.success) {
          this.classNameList = [];
          if (isEmpty(this.currentClaassId)) {
            this.currentClaassId = res.data.data.list[0].id;
          }
          this.getScoreStudent(); //获取页面学生列表
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
    //获取下拉框内容
    getCollection() {
      return getCollection().then(res => {
        if (res.data.meta.success) {
          this.termArr = res.data.data.terms;
          this.subjectArr = res.data.data.subject;
          this.unitArr = res.data.data.unit;
        }
      });
    },
    //获取学生列表
    getScoreStudent() {
      return getScoreStudent(this.currentClaassId).then(res => {
        if (res.data.meta.success) {
          const data = [...res.data.data.hasData, ...res.data.data.notData]
          if (data[0]) {
            this.stuId = data[0].stuId;
          }
          this.getScore(); //获取页面学生最后一次录入成绩
          this.performance = data;
        }
      })
        .finally(() => {
          this.$loadingHide()
        })
    }
  }
};
</script>
<style lang="less">
@import "performance";
</style>

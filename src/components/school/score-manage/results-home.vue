<template>
  <div id="performance_yi">

    <van-nav-bar title="录入成绩" left-text="返回" left-arrow @click-left="getBack">
      <van-icon name="wap-nav" slot="right" @click="jump = true" />
    </van-nav-bar>

    <div class="slect_yi">
      <div class="chooseSelect">
        <div class="group-select">
          <van-row>
            <van-col span="7">
              <div class="select-text" @click="onTermSlecte">{{termValue}}</div>
              <van-icon name="arrow-down" @click="onTermSlecte"/>
            </van-col>
            <van-col span="7">
              <div class="select-text" @click="onSubjectSlecte">{{subjectValue}}</div>
              <van-icon name="arrow-down" @click="onSubjectSlecte"/>
            </van-col>
            <van-col span="7">
              <div class="select-text" @click="onUnitSlecte">{{unitValue}}</div>
              <van-icon name="arrow-down" @click="onUnitSlecte"/>
            </van-col>
            <van-col span="3">
              <div class="add" @click="showAddUnit">
                <img :src="addImgPath" alt>
              </div>
            </van-col>
          </van-row>
        </div>
        <div>
          <van-actionsheet v-model="jump" :actions="jumpList" @select="onSelectJump"/>
          <!-- 学期选择下拉菜单 -->
          <van-actionsheet v-model="showTermSlecte" :actions="termArr" @select="onSelectTerm"/>
          <!-- 科目选择下拉菜单 -->
          <van-actionsheet
            v-model="showSubjectSlecte"
            :actions="subjectArr"
            @select="onSelectSubject"
          />
          <!-- 单元选择下拉菜单 -->
          <van-actionsheet v-model="showUnitSlecte" :actions="unitArr" @select="onSelectUnit"/>
          <van-dialog v-model="showDialog" title="标题" show-cancel-button></van-dialog>
        </div>
      </div>
    </div>
    <div class="blank_yi"></div>
    <div class="content_yi">
      <!-- 班级选择 -->
      <ClassList :class-list="classNameList" v-on:classGrade="getChangeIndex"></ClassList>
      <div class="tody_yi">
        <p class="p_flex">
          <span class="studs_yi">
            <i></i>今日未操作的学生
          </span>
          <span>
            <van-switch v-model="checked" size="0.2rem" @input="onInput"/>
            <span class="yincang">隐藏年级</span>
          </span>
        </p>
        <div class="name_yi">
          <ul v-if="performance.length>0">
            <li
              @click="modifiedGrades(item.stuId,item.oftenScores)"
              v-for="item in performance"
              :key="item.stuId"
            >
              <p v-text="item.stuName+item.Score"></p>
              <p v-text="item.gradeName" v-show="showGradeName"></p>
            </li>
          </ul>
          <div v-if="performance.length===0">
            <p style="text-align: center;line-height: 0.6rem;">暂无未操作学生</p>
          </div>
        </div>
        <p class="p_flex">
          <span class="studs_yi">
            <i></i>今日已操作的学生
          </span>
          <span></span>
        </p>
        <div class="name_yi sy_name_yi">
          <ul v-if="hasData.length>0">
            <li
              @click="modifiedGrades(item.stuId,item.oftenScores)"
              v-for="item in hasData"
              :key="item.stuId"
            >
              <p>
                <span v-text="item.stuName+item.Score"></span>
                <!-- <span v-text="item.stuName"></span> -->
              </p>
              <p v-text="item.gradeName" v-show="showGradeName"></p>
            </li>
          </ul>
          <div v-else>
            <p style="text-align: center;line-height: 0.6rem;">暂无已操作学生</p>
          </div>
        </div>
        <p class="color_6" style="position: fixed;bottom: 0.4rem;text-align: center;width: 100%;left: 0">涉及{{classNmb}}个班级，本次共录入{{studentNmb}}个学生</p>
      </div>
    </div>
    <div class="bott_yi">
      <van-button size="large" @click="tijiao">确认提交</van-button>
    </div>
    <!-- 新增单元弹窗 -->
    <van-dialog
      v-model="show"
      title="新增单元"
      @confirm="addUnit();"
      :before-close="beforeClose"
      show-cancel-button
    >
      <div class="unitInput">
        <van-field v-model="value" placeholder="请输入单元名称"/>
      </div>
    </van-dialog>
    <!-- 成绩选择弹窗 -->
    <van-popup v-model="showScore" position="right" :overlay="false">
      <div id="resultsPop-up">
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
import "./performance.less";
import {
  NavBar,
  Row,
  Col,
  Switch,
  Button,
  Icon,
  Actionsheet,
  Dialog,
  Popup,
  Toast,
  Field
} from "vant";
import ClassList from "../components/class-list";
import { selectClassList } from "@/api/school/score-manage";
import { getCollection } from "@/api/school/score-manage";
import { getScoreStudent } from "@/api/school/score-manage";
import { postStudentScores } from "@/api/school/score-manage";
import { postUnit } from "@/api/school/score-manage";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Switch.name]: Switch,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Actionsheet.name]: Actionsheet,
    [Dialog.name]: Dialog,
    [Popup.name]: Popup,
    ClassList: ClassList,
    [Toast.name]: Toast,
    [Field.name]: Field
  },
  data() {
    return {
      classNmb: 0, //操作的班级数量
      studentNmb: 0, //操作的学生数量
      studentIdArr: [], //提交时学生Id数组
      scoreArr: [], //提交时成绩数组
      studentid: "", //学生id
      codeChecked: false, //弹窗小数点
      putStudentId: [], //提交的学生Id数组
      putStudentScore: [], //提交的学生成绩数组
      fenshu: [], //分数列表
      studeF: "", //当前学生分数回显
      showScore: false, //成绩选择弹窗
      score: "", //成绩
      termId: "", //学期Id
      unitId: "", //单元ID
      subjectId: "", //科目id
      scoreId: "", //成绩id
      show: false, //新增单元弹窗
      showGradeName: true, //年级显示与隐藏
      showTermSlecte: false, //学期选择框
      showSubjectSlecte: false, //科目选择框
      showUnitSlecte: false, //单元选择框
      classNameList: [], //班级列表
      currentClaassId: [], //班级ID
      showDialog: false,
      columns: [],

      selectType: 1,
      addImgPath: require("@/assets/img/teachers/Mine/add.png"),
      termValue: "选择学期",
      subjectValue: "选择科目",
      unitValue: "选择单元",
      value: "", //新增单元名称
      termArr: [],
      tag: false,
      subjectArr: [],
      unitArr: [],
      fenshu1: [],
      fenshu2: [],
      fenshu3: [],
      show2: false,
      qujianI: 1,
      linFen: "", //临时分数
      checked: false,
      achievementScoreList: [], //学生分数成绩
      classTypeId: "", //子组件当前点击的id
      performance: [], //未操作学生
      hasData: [], //已操作学生
      fenshuList: [],

      jumpList:[
                {name:'单元管理',path:'ScoreManageUnitManage'},
                {name:'成绩档案',path:'ScoreManage'},
                {name:'修改成绩',path:'ChangeClassList'},
              ],
      jump:false
    };
  },
  created() {
    this.getClassList(); //获取班级列表
    this.getCollection(); //获取下拉菜单
    this.staticFraction(); //静态分数
    this.fenshu = this.fenshu1;
  },
  watch: {
    showScore() {
      if (!this.showScore) {
        this.qujianI = 1;
        this.codeChecked = false;
        // this.studeF=''
        //console.log(777);
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
    //新增单元
    showAddUnit() {
      this.value = ""; //置空单元名称
      this.show = true;
    },
    //新增单元弹窗校验
    beforeClose(action, done) {
      //console.log(done);
      if (action === "confirm") {
        if (this.value === "") {
          Toast("请输入单元名称");
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
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
      //filterArr仅用于设置班级个数和学生个数
      let filterArr = this.achievementScoreList;
      //true为放弃录入，false放弃修改
      if (
        this.achievementScoreList[this.achievementScoreList.length - 1]
          .grade === ""
      ) {
        //删除数组末位
        this.achievementScoreList = filterArr.filter(function(
          ele,
          idx,
          filterArr
        ) {
          return filterArr.length - 1 !== idx;
        });
      }

      //设置班级个数
      let classArray = [];
      for (let x in this.achievementScoreList) {
        if (this.achievementScoreList.length == 0) {
          break;
        }
        this.achievementScoreList[x].classId;
        classArray.push(this.achievementScoreList[x].classId);
      }
      if (this.achievementScoreList.length == 0) {
        this.classNmb = this.achievementScoreList.length;
      } else {
        classArray = new Set(classArray); //去重
        this.classNmb = classArray.size;
      }
      //设置学生数量
      this.studentNmb = this.achievementScoreList.length;
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
      for (let i = 0; i < this.achievementScoreList.length; i++) {
        if (this.achievementScoreList[i].id === this.studentid) {
          this.achievementScoreList[i].grade = item;
        }
      }
      for (let j = 0; j < this.performance.length; j++) {//页面学生成绩回显
        if (this.performance[j].stuId === this.studentid) {
          this.performance[j].Score = ' ('+item+')';
        }
      }
      for (let j = 0; j < this.hasData.length; j++) {//页面学生成绩回显
        if (this.hasData[j].stuId === this.studentid) {
          this.hasData[j].Score = ' ('+item+')';
        }
      }

      this.showScore = false;
      this.codeChecked = false;
    },
    // 常用分数选择
    scoresSelecte(item) {
      item = parseInt(item);
      this.fenshuC(item);
    },
    //学期选择弹窗
    onTermSlecte() {
      this.showTermSlecte = true;
    },
    //科目选择弹窗
    onSubjectSlecte() {
      this.showSubjectSlecte = true;
    },
    //单元选择弹窗
    onUnitSlecte() {
      this.showUnitSlecte = true;
    },
    //学期选择
    onSelectJump(item) {
      let name = item.name;
      let path = item.path;
      this.jump = false;
      this.$router.push({name:path})
    },
    //学期选择
    onSelectTerm(item) {
      this.termValue = item.name;
      this.termId = item.value;
      this.showTermSlecte = false;
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
    //年级显示隐藏
    onInput(checked) {
      this.showGradeName = !checked;
    },
    // 切换班级重置
    getChangeIndex(obj) {
      if (obj.id != this.activeId) {
        this.currentClaassId = obj.id;
        this.getScoreStudent(); //更新数据
      }
    },
    // 返回
    getBack() {
      this.$router.go(-1);
    },
    //获取班级列表
    getClassList() {
      this.$loading(undefined, undefined, true);
      return selectClassList(0, 0).then(res => {
        //班级列表数据处理
        if (res.data.meta.success) {
          this.classNameList = [];
          this.currentClaassId = res.data.data.list[0].id;
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
    getCollection(type) {
      return getCollection().then(res => {
        if (res.data.meta.success) {
          if (type) {//新增单元时操作
            this.unitArr = res.data.data.unit;
             //选中单元
             this.unitValue = this.unitArr[0].name;
             this.unitId = this.unitArr[0].value;
          } else {
            this.termArr = res.data.data.terms;
            this.subjectArr = res.data.data.subject;
            this.unitArr = res.data.data.unit;
          }
        }
      });
    },
    //获取学生列表
    getScoreStudent() {
      getScoreStudent(this.currentClaassId).then(res => {
        if (res.data.meta.success) {
          for(let i=0;i<res.data.data.notData.length;i++){
            res.data.data.notData[i].Score = "";//添加成绩属性
          }

          this.performance = res.data.data.notData.map(item => {
            const achievementScore = this.achievementScoreList.find(stu => stu.id == item.stuId)
            if (achievementScore) {
              item.Score = `(${achievementScore.grade})`
            }
            return item
          });
          //console.log(this.performance)

          res.data.data.hasData = res.data.data.hasData.map(item => {
            item.Score = ''
            return item
          });
          this.hasData = res.data.data.hasData;
          // this.$loadingHide();
        }
      })
        .finally(() => {
          this.$loadingHide()
        })
    },
    //新增单元并选中
    addUnit() {
      if (this.value === "") {
        this.show = true;
        Toast("请输入单元名称");
      } else {
        postUnit({ name: this.value }).then(res => {
          if (res.data.meta.success) {
            Toast.success("新增单元成功");
            this.getCollection(1); //刷新下拉菜单

          } else {
            Toast.fail("新增单元失败");
          }
        });
      }
    },
    unitManagement() {},
    // 跳到修改成绩弹框
    modifiedGrades(id, oftenScores) {
      if (oftenScores.length > 0) {
        this.fenshuList = oftenScores; //.map(item => item.fscrcm_score);
      }
      if (this.achievementScoreList.length > 0) {
        for (let i = 0; i < this.achievementScoreList.length; i++) {
          //已录入
          if (this.achievementScoreList[i].id === id) {
            this.tag = true;
            //回显分数
            this.linFen = this.achievementScoreList[i].grade;
          }
          //          //设置分数区间
          //  if (this.linFen < 51) {
          //   this.fenshu = this.fenshu1;
          // } else if (this.linFen > 50 && this.linFen < 101) {
          //   this.fenshu = this.fenshu2;
          // } else {
          //   this.fenshu = this.fenshu3;
          // }
        }
        //未录入
        if (!this.tag) {
          //设置分数区间为默认0-50
          // this.fenshu = this.fenshu1;
          this.achievementScoreList.push({
            id: id,
            grade: "",
            classId: this.currentClaassId
          });
        } else {
          this.studeF = this.linFen;
        }
      } else {
        this.achievementScoreList.push({
          id: id,
          grade: "",
          classId: this.currentClaassId
        });
      }
      this.tag = false;
      //console.log(this.achievementScoreList);
      this.showScore = true;
      this.studentid = id;
      //设置班级个数
      let classArray = [];
      for (let x in this.achievementScoreList) {
        if (this.achievementScoreList.length == 0) {
          break;
        }
        this.achievementScoreList[x].classId;
        classArray.push(this.achievementScoreList[x].classId);
      }
      if (this.achievementScoreList.length == 0) {
        this.classNmb = this.achievementScoreList.length;
      } else {
        classArray = new Set(classArray); //去重
        this.classNmb = classArray.size;
      }
      //设置学生数量
      this.studentNmb = this.achievementScoreList.length;
    },
    //成绩提交
    tijiao() {
      this.studentIdArr = [];
      this.scoreArr = [];
      let x;
      //提交数据处理
      for (x in this.achievementScoreList) {
        this.studentIdArr.push(this.achievementScoreList[x].id);
        this.scoreArr.push(this.achievementScoreList[x].grade);
      }
      if (this.studentIdArr.length === 0) {
        Toast("请选择学生成绩");
      } else if (this.termId == "") {
        Toast("请选择学期");
      } else if (this.subjectId == "") {
        Toast("请选择科目");
      } else if (this.unitId == "") {
        Toast("请选择单元");
      } else {
        this.$loading(undefined, undefined, true);
        let params = {
          stuIds: this.studentIdArr,
          scores: this.scoreArr,
          termValue: this.termId,
          subjectValue: this.subjectId,
          unitValue: this.unitId
        };
        return postStudentScores(params).then(res => {
          if (res.data.meta.success) {
            this.achievementScoreList = []
            Toast.success("成绩提交成功");
            let _this = this;
            setTimeout(function() {
              Toast.clear();
              _this.getScoreStudent();
            }, 1000);
          } else {
            Toast.fail("成绩提交失败");
          }
        });
      }
    }
  }
};
</script>
<style  scoped lang="less">
@import "performance";
</style>


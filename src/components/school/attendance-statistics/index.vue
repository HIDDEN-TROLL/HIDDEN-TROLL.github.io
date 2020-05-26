<template>
  <div id="attendance-statistics">
    <div class="go-back">
      <van-nav-bar
          title="考勤统计"
          left-text="返回"
          :right-text=" C_G_type === 1  ? '按班级显示' : '按年级显示'"
          left-arrow
          @click-left="onClickLeft"
          @click-right="changeShow = true"
      />
    </div>
    <div class="top-banner">
      <inlineCalendar :dayClick="onChange" v-if="calender" :disabledDate="disdate" :defaultDate="date" @switch="nowview"></inlineCalendar>
      <!-- <van-datetime-picker v-model="currentDate" type="date"/> -->
      <!--<img src="@/assets/img/schoolRole/attendance_statistics_banner@2x.png" alt="">-->
    </div>
    <!-- 考勤类型选择 -->
    <div class="check-time">
      <van-row>
        <van-col span="4" class="type-left">
          <div>{{typeText}}</div>
          <div>
            <van-icon name="arrow-down" @click="onTypeSlecte"/>
          </div>
        </van-col>
        <van-col span="20">
          <TrustList
            :trust-list="trustList"
            :width="width"
            :content-width="contentWidth"
            :attendanceId="attendanceId"
            v-on:attendanceType="attendanceTypep"
          ></TrustList>
        </van-col>
      </van-row>
    </div>
    <!-- 筛选下拉列表事件 -->
    <div class="table-slecet">
      <van-row>
        <van-col span="6">共{{ Array.isArray(studentList) ? studentList.length : 0 }}条数据</van-col>
        <van-col span="6">
          <span class="slecteTextOver">{{classText}}</span>
          <van-icon name="arrow-down" @click="onClassSlecte"/>
        </van-col>
        <van-col span="6">
          <span class="slecteTextOver">{{gradeText}}</span>
          <van-icon name="arrow-down" @click="onGradeSlecte"/>
        </van-col>
        <van-col span="6">
          <span class="slecteTextOver">{{originsText}}</span>
          <van-icon name="arrow-down" @click="onOriginsSlecte"/>
        </van-col>
      </van-row>
    </div>
    <!-- 列表头部 -->
    <div class="table-head">
      <van-row>
        <van-col span="3">时间</van-col>
        <van-col span="5">姓名</van-col>
        <van-col span="5">{{C_G_type === 1 ? '班级' : '年级'}}</van-col>
        <van-col span="5">类型</van-col>
        <van-col span="6">来源</van-col>
      </van-row>
    </div>
    <!-- 列表内容 -->
    <div class="table-content">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-row v-for="(item,index) in studentList" :key="index">
          <van-col span="3">{{item.time}}</van-col>
          <van-col span="5">{{item.name}}</van-col>
          <van-col span="5">{{C_G_type === 1 ? item.className : item.gradeName}}</van-col>
          <van-col span="5">{{item.typeText}}</van-col>
          <van-col span="6" style="overflow: auto;white-space: nowrap;">{{item.originText}}</van-col>
        </van-row>
      </van-list>
    </div>
    <!-- 考勤类型选择弹窗 -->
    <div>
      <van-actionsheet
        v-model="typeListShow"
        :actions="typeList"
        cancel-text="取消"
        @select="onSelect"
        @cancel="onCancel"
      />
    </div>
    <!-- 班级多选 -->
    <van-popup v-model="showClass" position="bottom" :close-on-click-overlay="false">
      <div class="btn">
        <span class="cancel" @click="cancelClass">取消</span>
        <span class="confirm" @click="confirmClass">确定</span>
      </div>
      <van-checkbox-group v-model="checkClassList" @change="classMonitorSelecte">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in classNameList"
            clickable
            :key="item.id"
            :title="`${item.name}`"
            @click="classToggle(index)"
          >
            <van-checkbox :name="item.id" ref="classCheckboxes"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
    <!-- 年级多选 -->
    <van-popup v-model="showGrade" position="bottom" :close-on-click-overlay="false">
      <div class="btn">
        <span class="cancel" @click="cancelGrade">取消</span>
        <span class="confirm" @click="confirmGrade">确定</span>
      </div>
      <van-checkbox-group v-model="checkGradeList" @change="gradeMonitorSelecte">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in gradeList"
            clickable
            :key="item.id"
            :title="`${item.name}`"
            @click="gradeToggle(index)"
          >
            <van-checkbox :name="item.id" ref="gradeCheckboxes"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
    <!-- 来源级多选 -->
    <van-popup v-model="showOrigins" position="bottom" :close-on-click-overlay="false">
      <div class="btn">
        <span class="cancel" @click="cancelOriginsList">取消</span>
        <span class="confirm" @click="confirmOriginsList">确定</span>
      </div>
      <van-checkbox-group v-model="checkOriginsList" @change="originsMonitorSelecte">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in originsList"
            clickable
            :key="item.id"
            :title="`${item.name}`"
            @click="originsToggle(index)"
          >
            <van-checkbox :name="item.id" ref="originsCheckboxes"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
    <!--切换年级班级显示 -->
    <van-actionsheet v-model="changeShow" :actions="gradeFilterOptions" @select="onSelectGrade"/>
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  Tab,
  Tabs,
  Row,
  Col,
  List,
  Toast,
  Checkbox,
  Actionsheet,
  CheckboxGroup,
  Cell,
  CellGroup,
  Popup,
  DatetimePicker
} from "vant";
import TrustList from "./trust-type";
import { selectClassList } from '@/api/school/class-manage'
import { getAttendanceType } from '@/api/school/attendance-type-manage'
import { getAttendanceStatistics, getAttendanceDate } from '@/api/school/attendance-statistics'


export default {
  name: "attendance-statistics",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Row.name]: Row,
    [Col.name]: Col,
    [List.name]: List,
    [Toast.name]: Toast,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Actionsheet.name]: Actionsheet,
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker,
    TrustList: TrustList,
  },
  data() {
    return {

      calender:true,
      disdate:[],//禁用日期
      width: {
        width: "3rem"
      },
      contentWidth: {
        width: "4.4rem"
      },
      currentDate: new Date(),
      loading: false,
      finished: false,
      // 弹窗默认隐藏
      typeListShow: false, //考勤弹窗隐藏
      showClass: false, //班级列表隐藏
      showGrade: false, //年级列表隐藏
      showOrigins: false, //来源列表隐藏
      //选项页面回显
      studentList: [], //学生列表
      typeText: "离园", //考勤类型回显
      classText: "全部班级",
      gradeText: "全部年级",
      originsText: "全部来源",
      //考勤记录类型
      typeList: [
        {
          name: "考勤记录",
          id: 0
        },
        {
          name: "进园",
          id: 1
        },
        {
          name: "离园",
          id: 2
        },
        {
          name: "显示全部",
          id:-1
        }
      ],
      //年级列表
      gradeList: [
        {
          name: "全部年级",
          id: 0
        },
        {
          name: "一年级",
          id: 1
        },
        {
          name: "二年级",
          id: 2
        },
        {
          name: "三年级",
          id: 3
        },
        {
          name: "四年级",
          id: 4
        },
        {
          name: "五年级",
          id: 5
        },
        {
          name: "六年级",
          id: 6
        },
        {
          name: "初中",
          id: 7
        }
      ],
      classNameList: [
        {
          id: 0,
          name: "全部班级"
        }
      ], //班级列表
      originsList: [
        {
          name: "所有来源",
          id: 0
        },
        {
          name: "App人脸签到",
          id: 21
        },
        {
          name: "App手动签到",
          id: 22
        },
        {
          name: "微信手动签到",
          id: 11
        },
        {
          name: "设备打卡",
          id: 31
        }
      ], //全部来源

      //选中的来源数组
      //考勤类型所有数据
      attendanceTypeList:[],
      trustList: [], //考勤类型数据
      //选中的班级数组
      //选中的年级数组
      backList: [], //返回的统计列表
      totals: 0, //总条数
      //筛选获取列表信息的接口数据
      typeId: 2, // type 0普通考勤记录 1进园 2离园 (默认1)
      attendanceId: 13, //attendanceTimeId 考勤时间ID
      checkGradeList: [0], // grades 	年级的值组成的数组, 默认所有年级
      checkClassList: [0], // classes  班级ID组成的数组 默认所有班级
      checkOriginsList: [0], // origins 	考勤数据来源（1=>手机人脸识别，2=>手机手动签到，3=>微信手动签到，4=>设备打卡签到）默认所有来源
      // date 		默认为今天 参数示例：2018-01-01
      page: 0, // page 		页码; 默认1 (传入0不分页)
      pageSize: 0, // pageSize 			每页返回的数量; 默认20 (传入0不分页)
      date: "",//选定日期,

      // 切换显示班级或年级
      C_G_type:1,
      TypeList: ['显示班级', '显示年级'],
      changeShow: false, //年级下拉列表隐藏
      // 进页面自动选择考勤类型
      gradeFilterIndex:0,
      attendanceList:[]

    };
  },
  computed: {
    gradeFilterOptions() {
      return this.TypeList.map((name, index) => {
        return {
          index,
          name,
          className: index === this.gradeFilterIndex ? 'GradeActive' : 'non-active',
        }
      })
    },
  },
    methods: {
    onSelectGrade(item) {
      this.C_G_type = item.index + 1
      this.changeShow = false;
      this.gradeFilterIndex = item.index
    },

    onClickLeft() {
      this.$router.back(-1)
    },
    //列表加载
    onLoad() {
      this.getBackList();
    },
    onChange(date){
      let fordate = date.format('YYYY-MM-DD');
     // console.log(date.format('YYYY-MM-DD'));
      if (this.disdate.indexOf(fordate) >= 0){
        return false
      }else {
        this.date = fordate;
        this.loading = true;
        this.finished = false;
        if (this.loading){
          this.onLoad();
        }
        return true;
      }

    },
    //年月切换
    nowview(date){
      let d = date.year+'-'+(date.month>9?date.month:'0'+date.month);
      let  moment = require('moment');// 一个日期的工具库
      let ds = moment(d,'YYYY-MM').daysInMonth();//获取指定月份的天数
      let dateArr = [];
      for (let i=1;i<=ds;i++){
        dateArr.push(`${d}-${i>9?i:'0'+i}`)
      }
      getAttendanceDate({date:d})
        .then(res=>{
          if (res.status === 200) {
            let getd = res.data.data;
            if (Array.isArray(getd) && getd.length>0 ){
              this.disdate = dateArr.filter(item=>{
                if(getd.indexOf(item)==-1){
                  return item
                }
              });
            }else {
              this.disdate = dateArr
            }
            let day = moment().date();//当前日期
            this.date = `${d}-${day}`;
            this.loading = true;
            this.finished = false;
            if (this.loading){
              this.onLoad();
            }
            this.calender = false;
            this.$nextTick(()=>{
              this.calender = true;
            })
          } else {
          }
        })
      //console.log(ds)
    },
    //班级选中
    classToggle(index) {
      this.$refs.classCheckboxes[index].toggle();
      if (index) {
        //点击选择框非全部项时移除全部选中勾选
        if (this.checkClassList.length > 0) {
          if (this.checkClassList.indexOf(0) >= 0) {
            this.checkClassList.splice(this.checkClassList.indexOf(0), 1);
          }
        }
      }
    },
    //选择班级改变时触发
    classMonitorSelecte() {
      //点击选择框非全部项时移除全部选中勾选
      if (this.checkClassList.length > 0) {
        if (this.checkClassList.indexOf(0) >= 0) {
          this.checkClassList.length = 1;
          this.checkClassList[0] = 0;
        }
      }
    },
    //选择年级事件
    gradeToggle(index) {
      this.$refs.gradeCheckboxes[index].toggle();
      if (index) {
        //点击选择框非全部项时移除全部选中勾选
        if (this.checkGradeList.length > 0) {
          if (this.checkGradeList.indexOf(0) >= 0) {
            this.checkGradeList.splice(this.checkGradeList.indexOf(0), 1);
          }
        }
      }
    },
    //选择年级改变时触发
    gradeMonitorSelecte() {
      //点击选择框非全部项时移除全部选中勾选
      if (this.checkGradeList.length > 0) {
        if (this.checkGradeList.indexOf(0) >= 0) {
          this.checkGradeList.length = 1;
          this.checkGradeList[0] = 0;
        }
      }
    },
    //成绩复选框点击事件
    originsToggle(index) {
      this.$refs.originsCheckboxes[index].toggle();
      if (index) {
        //点击选择框非全部项时移除全部选中勾选
        if (this.checkOriginsList.length > 0) {
          if (this.checkOriginsList.indexOf(0) >= 0) {
            this.checkOriginsList.splice(this.checkOriginsList.indexOf(0), 1);
          }
        }
      }
    },
    //成绩复选框点击事件监听
    originsMonitorSelecte() {
      //点击选择框非全部项时移除全部选中勾选
      if (this.checkOriginsList.length > 0) {
        if (this.checkOriginsList.indexOf(0) >= 0) {
          this.checkOriginsList.length = 1;
          this.checkOriginsList[0] = 0;
        }
      }
    },
    //考勤类型选择（离园）
    onTypeSlecte() {
      this.typeListShow = true;
    },
    //考勤类型取消（离园）
    onCancel() {},
    //考勤类型弹窗开启
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.typeListShow = false;
      this.typeText = item.name;
      this.typeId = item.id;

      this.loading = true;
      this.finished = false;

      if (this.typeId === 1) {
        this.trustList = []
        for (let item of this.attendanceList) {
          //进园
          this.trustList.push({
            id: item.id,
            name: item.name,
            time: `${item.entryTimeStart}-${item.entryTimeEnd}`
          });
        }
      }
      if (this.typeId === 2) {
        this.trustList = []
        //离园
        for (let item of this.attendanceList) {
          this.trustList.push({
            id: item.id,
            name: item.name,
            time: `${item.exitTimeStart}-${item.exitTimeEnd}`
          });
        }
      }

      if (this.loading){
        this.onLoad();
      }
    },

    //返回操作
    onClickLeft() {
      this.$router.back(-1);
    },

    //班级选择
    onClassSlecte() {
      this.showClass = true;
    },
    //班级选择取消
    cancelClass() {
      this.showClass = false;
    },
    //班级选择确定
    confirmClass() {
      this.showClass = false;
      let check = [];
      //当用户全不选时，默认选中全部
      if (this.checkClassList.length == 0) {
        this.checkClassList = [0];
      }
      for (let i of this.checkClassList) {
        for (let v of this.classNameList) {
          if (i === v.id) {
            check.push(v.name);
          }
        }
      }
      this.classText = check.join(" , ");
      this.loading = true;
      this.finished = false;
      if (this.loading){
        this.onLoad();
      }
    },

    //年级选择
    onGradeSlecte() {
      this.showGrade = true;
    },
    //年级选择取消
    cancelGrade() {
      this.showGrade = false;
    },
    //年级选择确定
    confirmGrade() {
      this.showGrade = false;
      let check = [];
      //当用户全不选时，默认选中全部
      if (this.checkGradeList.length == 0) {
        this.checkGradeList = [0];
      }
      for (let i of this.checkGradeList) {
        for (let v of this.gradeList) {
          if (i === v.id) {
            check.push(v.name);
          }
        }
      }
      this.gradeText = check.join(" , ");
      this.loading = true;
      this.finished = false;
      if (this.loading){
        this.onLoad();
      }
    },

    //来源选择
    onOriginsSlecte() {
      this.showOrigins = true;
    },
    //来源选择取消
    cancelOriginsList() {
      this.showOrigins = false;
    },
    //来源选择确定
    confirmOriginsList() {
      this.showOrigins = false;
      let check = [];
      //当用户全不选时，默认选中全部
      if (this.checkOriginsList.length == 0) {
        this.checkOriginsList = [0];
      }
      for (let i of this.checkOriginsList) {
        for (let v of this.originsList) {
          if (i === v.id) {
            check.push(v.name);
          }
        }
      }
      this.originsText = check.join(" , ");
      this.loading = true;
      this.finished = false;
      if (this.loading){
        this.onLoad();
      }
    },
    //切换考勤类型 获取数据
    attendanceTypep(item) {
      this.attendanceId = item.item.id;
      this.loading = true;
      this.finished = false;
      if (this.loading){
        this.onLoad();
      }
    },
    //获取某个月有考勤数据的日期
    selectAttendanceDate(sDate){
      return new Promise((resolve, reject) => {
        getAttendanceDate({date:sDate})
          .then(res=>{
            if (res.status === 200) {
              resolve(res.data.data);
            } else {
              reject("ggg");
            }
          })
      })
    },
    //获取班级列表
    selectClassList() {
      //this.$store.commit("showLoadings");
      // this.$store.commit('hideLoadings')
      return new Promise((resolve, reject) => {
        selectClassList(0, 0)
          .then(res => {
            if (res.status === 200) {
              resolve(res.data.data.list);
            } else {
              reject("ggg");
            }
          })
          .catch(() => {
            throw new Error("异常！");
          });
      });
    },
    //获取考勤类型
    selectAttendanceType() {
      return new Promise((resolve, reject) => {
        getAttendanceType()
          .then(res => {
            if (res.status === 200) {
              resolve(res.data.data);
              this.attendanceList = res.data.data
            } else {
              reject("ggg");
            }
          })
          .catch(() => {
            throw new Error("异常！");
          });
      });
    },
    //获取统计列表数据
    getBackList() {
      this.$loading(undefined,undefined,true);
      /*this.loading = false;
      this.finished = false;*/
      getAttendanceStatistics({
          page: this.page,
          pageSize: this.pageSize,
          type: this.typeId,
          date: this.date,
          grades:
            this.checkGradeList.length == 1 && this.checkGradeList[0] == 0
              ? null
              : this.checkGradeList,
          origins:
            this.checkOriginsList.length == 1 &&
            this.checkOriginsList[0] == 0
              ? null
              : this.checkOriginsList,
          attendanceTimeId: this.attendanceId,
          classes:
            this.checkClassList.length == 1 && this.checkOriginsList[0] == 0
              ? null
              : this.checkClassList
        })
          .then(res => {
            this.$loadingHide()
            //学生列表数据处理
            if (res.data.meta && res.data.meta.code === 0) {
              this.studentList = [];
              this.backList = [];
              if (res.data.data.length > 0) {
                this.studentList = res.data.data; //学生列表
                this.backList = res.data.data;

              }
            }
            this.loading = false;
            this.finished = true;
          })
          .catch(() => {
            throw new Error("异常！");
          });
    },

  },
  created() {
    Promise.all([
      this.selectClassList(),
      this.selectAttendanceType(),
      this.selectAttendanceDate()
    ]).then(res => {
      //this.$store.commit("hideLoadings");
      //班级列表数据处理
      if (res[0].length > 0) {
        for (let item of res[0]) {
          if (item.id) {
            this.classNameList.push({
              id: item.id,
              name: item.name
            });
          }
        }
      }
      //考勤类型数据处理
      if (res[1].length > 0) {
        this.attendanceTypeList = res[1];
        this.trustList = [];

          const attendance = this.attendanceTypeList.find(attendance => attendance.status !== 0)
          if (attendance) {
            this.attendanceId = attendance.id
            if (attendance.status === 2) {
              this.typeId = 2
            }
          } else {
            this.attendanceId = this.attendanceTypeList[0].id;
          }

        if (this.typeId === 1) {
          for (let item of res[1]) {
            //进园
            this.trustList.push({
              id: item.id,
              name: item.name,
              time: `${item.entryTimeStart}-${item.entryTimeEnd}`
            });
          }
        }
        if (this.typeId === 2) {
          console.log(res)
          //离园
          for (let item of res[1]) {
            this.trustList.push({
              id: item.id,
              name: item.name,
              time: `${item.exitTimeStart}-${item.exitTimeEnd}`
            });
          }
        }
        this.contentWidth.width = 1.12 * res[1].length + "rem";
      }

      //获取某月的考勤日期
      let moment = require('moment');
      let now=moment().format("YYYY-MM");
      let ds = moment(now,'YYYY-MM').daysInMonth();//获取指定月份的天数
      let dateArr = [];
      for (let i=1;i<=ds;i++){
        dateArr.push(`${now}-${i>9?i:'0'+i}`)
      }
      if (res[2].length>0){
        this.disdate = dateArr.filter(item=>{
          if(res[2].indexOf(item)===-1){
            return item
          }
        })
      }else {
        this.disdate = dateArr
      }
      this.date = moment().format("YYYY-MM-DD");
      this.loading = true;
      this.finished = false;
      if (this.loading){
        this.onLoad();

      }
      this.calender = false;
      this.$nextTick(()=>{
        this.calender = true;
      });
     // console.log(res[2])
    });
  },
  updated(){
     /*let dom = document.getElementsByClassName('m-months');//m-row
    let lgn = dom.length;
    for (let i=0; i<lgn; i++){
      let childrenDom = dom[i].getElementsByClassName('m-row');// m-grey
      let childrenNextDom = childrenDom[5].getElementsByClassName('m-grey')
      //console.log(childrenNextDom.length)
      if (childrenNextDom.length===7){
        childrenDom[5].classList.add("disnone");
      }else {
        childrenDom[5].classList.remove("disnone");
      }
    }*/

  }
};
</script>

<style scoped lang="less">
  .go-back {
    .van-nav-bar {
      background-color: #3770FB;

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
#attendance-statistics {
  font-size: 0;
  background-color: #fff;
  .top-banner {
    /deep/.m-calendar .m-months-container .m-months-wrapper .m-months {
      .m-row {
        display: flex;
        .m-day {
           /*.m-grey{
             display: none;
           }*/
           .m-disable{
             text-decoration: none;
           }
         }
      }
      .disnone.m-row{
        display: none;
      }
    }
  }
  .check-time {
    padding-top: 0.17rem;
    height: 0.72rem;
    font-size: 0.14rem;
    box-sizing: border-box;
    overflow: hidden;
    .van-row {
      line-height: 0.7rem;
      .type-left {
        font-size: 0.14rem;
        color: #333;
        text-align: center;
        line-height: 0.24rem;
        padding-top: 0.08rem;
      }
      .trust-detail {
        .outer-box {
          width: 3rem;
        }
      }
    }
  }
  .table-slecet {
    font-size: 0.14rem;
    color: #666;
    padding: 0 0.16rem;
    line-height: 0.48rem;
    padding-top: 0.17rem;
    .van-row {
      text-align: right;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      .van-col {
        line-height: 0.48rem;
        height: 0.48rem;
        .slecteTextOver {
          display: inline-block;
          width: 0.6rem;
          white-space: nowrap;
          overflow: auto;
          padding-right: 0.06rem;
          text-align: right;
        }
        .van-icon {
          position: relative;
          top: -0.18rem;
          padding-left: 0.05rem;
        }
      }
      .van-col:first-child {
        text-align: left;
        color: #333;
      }
    }
  }
  .table-head {
    padding: 0 0.16rem;
    font-size: 0.14rem;
    padding-top: 0.06rem;
    color: #666;
    line-height: 0.38rem;
    .van-row {
      text-align: center;
       .van-col:first-child {
        text-align: left;
      }
    }
  }
  .table-content {
    /*height: 5.20rem;*/
    overflow: auto;
    padding: 0 0.16rem;
    font-size: 0.12rem;
    color: #999;
    line-height: 0.28rem;
    .van-row {
      text-align: center;
      .van-col:first-child {
        text-align: left;
      }
    }
  }
}
.btn {
  padding: 0 0.2rem;
  overflow: hidden;
  .cancel {
    padding: 0.1rem 0;
    float: left;
    font-size: 0.14rem;
    color: #3770fb;
  }
  .confirm {
    padding: 0.1rem 0;
    float: right;
    font-size: 0.14rem;
    color: #3770fb;
  }
}
  .GradeActive {
    color: #fff;
    background: #3770fb;
  }
</style>

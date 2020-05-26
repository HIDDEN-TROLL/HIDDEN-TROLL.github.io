<template>
  <div id="student-add">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar title="新增学生" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="class-from">
      <van-field v-model="studentName" label="学生名称：" maxlength="10" placeholder="请输入学生名称" border/>
      <div class="modal-stu">
        <span class="title">考勤模式：</span>
        <van-radio-group v-model="addType" @change="getAddStuType">
          <van-radio name="1">智能设备</van-radio>
          <van-radio name="2">人脸识别</van-radio>
        </van-radio-group>
      </div>
      <div v-show="bStudentId" style="position: relative">
        <van-field v-model="studentIdCard" label="学生卡号：" class="card-num cardNo"  placeholder="请输入学生卡号" border/>
         <!--<span style="position: absolute;top: 0.14rem;left: 1.05rem">NO.</span>-->
      </div>
      <van-field v-model="studentNumber" label="手机号码："  v-show="bStudentNumber" placeholder="请输入手机号码" border/>
      <!--<van-field v-model="studentId" label="学号：" maxlength="32" placeholder="请输入学号" border/>-->
      <van-field
        v-model="grade"
        label="学生年级："
        placeholder="请选择"
        border
        readonly
        right-icon="arrow"
        @click="onGradeActionsheet"
        @click-right-icon="onGradeActionsheet"
      />
      <van-field
        v-model="className"
        label="托管分班："
        placeholder="请选择"
        border
        readonly
        right-icon="arrow"
        @click="onClassNameActivateSlecte"
        @click-right-icon="onClassNameActivateSlecte"
      />
      <van-field
        v-model="attendanceType"
        label="考勤类型："
        placeholder="请选择（多选）"
        border
        readonly
        right-icon="arrow"
        @click="onAttendanceTypeActivateSlecte"
        @click-right-icon="onAttendanceTypeActivateSlecte"
      />
      <van-field
              v-model="selectedTeachersName"
              label="培训分班："
              placeholder="请选择"
              border
              readonly
              right-icon="arrow"
              @click="TraningClass"
              @click-right-icon="TraningClass"
      />
      <van-popup v-model="showTraning" position="bottom" style="max-height: 80vh;">
        <p v-if="Array.isArray(TrainingClassList) && TrainingClassList.length === 0" style="font-size: .16rem;text-align: center;margin: .1rem 0;">没有可选的培训班级</p>
        <p v-else style="font-size: .16rem;text-align: center;margin: .1rem 0;">选择培训班级</p>
        <van-checkbox-group v-model="selectedTeachersId">
          <van-cell-group>
            <van-cell
                    v-for="item in TrainingClassList"
                    :key="item.id"
                    :title="`${item.name}`"
                    clickable
                    @click="toggleTeacher(item)" >
              <van-checkbox :name="item.id" ref="checkboxes"/>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-popup>

    </div>
    <div class="select-menu">
      <!-- 年级选择下拉菜单 -->
      <van-actionsheet v-model="showGrade" :actions="gradeList" @select="onSelectGrade"/>
      <!-- 培训班班级下拉菜单 -->
      <!--<van-actionsheet v-model="showTraning" :actions="TrainingClassList" @select="onSelectGrade"/>-->
      <!-- 班级选择下拉菜单 -->
      <van-actionsheet
        v-model="showClassName"
        :actions="classNameList"
        @select="onSelectClassName"
      />
    </div>
    <!-- 考勤类型选择下拉菜单 -->
    <van-popup v-model="showAttendanceType" position="bottom">
      <!-- 弹窗确定按钮 -->
      <div class="btn">
        <span class="cancel" @click="cancelAttendanceType">取消</span>
        <span class="confirm" @click="confirmAttendanceType">确定</span>
      </div>
      <!-- 考勤类型复选框 -->
      <van-checkbox-group v-model="checkAttendanceType">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in attendanceTypeList"
            clickable
            :key="item.id"
            :title="`${item.name} ${item.entryTimeStart}~${item.entryTimeEnd}`"
            @click="toggle(index)"
          >
            <van-checkbox :name="item.id" ref="checkboxes"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>
    <!--底部提交按钮-->
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  Field,
  Actionsheet,
  Row,
  Col,
  Popup,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Toast
} from "vant";
import FooterBtn from "../../common/footer-operate-btn";
import { getAttendanceType } from '@/api/school/attendance-type-manage'
import { getTrainingList } from '@/api/school/training-course'



// import { Promise } from "q";
// import { resolve } from "dns";
import { classList } from '@/api/school/class-manage'
import { addStudent } from '@/api/school/student-manage'

export default {
  name: "student-add",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Actionsheet.name]: Actionsheet,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popup.name]: Popup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    FooterBtn: FooterBtn
  },
  data() {
    return {
      TraningName:'',
      selectedTeachers:[],//选中的培训班
      TrainingList:[],//培训班级
      TrainingClassList:[],//培训班级
      studentName: "", //学生姓名
      studentIdCard: "", //学生卡号
      studentNumber: "", //手机号码
      bStudentNumber:false,//隐藏学生卡号
      //studentId:'',//学号
      bStudentId:true,//
      addType:'1',//学生模式 1 考勤 2 人脸
      grade: "", //选中的学生年级
      className: "", //选中的学生班级
      attendanceType: "", //选中的考勤类型
      showGrade: false, //年级下拉列表隐藏
      showTraning: false, //培训班下拉
      showClassName: false, //班级下拉列表隐藏
      showAttendanceType: false, //隐藏考勤类型复选框
      //学生年级
      gradeList: [
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
      //学生班级
      classNameList: [],
      //考勤类型列表
      attendanceTypeList: [],
      //选择的年级ID
      gradeId:null,
      //选择的班级ID
      classNameId:null,
      //选中的考勤类型id
      checkAttendanceType: [],
      //底部按钮
      btnText: [
        {
          type: 2,
          title: "取消"
        },
        {
          type: 1,
          title: "确定"
        },
      ]
    };
  },
  computed: {
    selectedTeachersId() {
      return this.selectedTeachers.map(s => s.id)
    },
    selectedTeachersName() {
      return this.selectedTeachers.map(s => s.name).join('，')
    },
  },
  methods: {
    //  选择教师
    toggleTeacher(teacher) {
      const index = this.selectedTeachersId.indexOf(teacher.id)
      if (index >= 0) {
        this.selectedTeachers.splice(index, 1)
      } else {
        this.selectedTeachers.push(teacher)
      }
      this.TraningName = teacher.name
      console.log(this.selectedTeachers)
    },
    // 获取培训班级列表
    getTrainingListFun() {
      getTrainingList()
              .then(res => {
                if (res.data.meta && res.data.meta.code === 0) {
                  this.TrainingList = res.data.data

                  this.TrainingClassList = [];
                  for (let item of this.TrainingList) {
                    if (item.id) {
                      this.TrainingClassList.push({
                        id: item.id,
                        name: item.name
                      });
                    }
                  }

                  console.log(this.TrainingClassList)

                }
              }).catch(() => {
        throw new Error("异常！")
      })
    },
    //考勤类型复选框
    toggle(index) {
      this.$refs.checkboxes[index].toggle();

    },
    //新增学生选择类型
    getAddStuType(name){
      //console.log(name)
      if (name === '1'){
        this.addType = '1';
        this.bStudentNumber = false;
        this.bStudentId = true;
      } else{
        this.addType = '2';
        this.bStudentId = false;
        this.bStudentNumber = true;
      }
    },
    //返回
    onClickLeft() {
      this.$router.back(-1);
    },
    //年级选择点击事件
    onGradeActionsheet() {
      this.showGrade = true;
    },
    //培训班级点击事件
    TraningClass() {
      this.showTraning = true;
    },
    //年级选择
    onSelectGrade(item) {
      this.showGrade = false;
      this.grade = item.name;
      this.gradeId =item.id
    },
    //班级选择点击事件
    onClassNameActivateSlecte() {
      this.showClassName = true;

    },
    //班级选择
    onSelectClassName(item) {
      this.showClassName = false;
      this.className = item.name;
       this.classNameId = item.id
    },
    //考勤类型弹窗关闭
    cancelAttendanceType() {
      this.showAttendanceType = false;
    },
    // 考勤类型弹窗确定
    confirmAttendanceType() {
      this.showAttendanceType = false;
      let check = [];
      for (let i of this.checkAttendanceType) {
        for (let v of this.attendanceTypeList) {
          if (i === v.id) {
            check.push(v.name);
          }
        }
      }
      this.attendanceType = check.join(" , ");

      console.log(check)
    },
    //显示考勤复选框
    onAttendanceTypeActivateSlecte() {
      this.showAttendanceType = true;
    },
    //确认添加
    operateBtn(type) {
      if (type === 1) {
        this.addStudent();
      } else if (type === 2) {
        this.$router.back();
      }
    },
    //获取班级列表
    selectClassList() {
      this.$loading();
      //
      return new Promise((resolve, reject) => {
        classList({ page: 0, all: true })
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
            } else {
              reject("ggg");
            }
          })
          .catch(() => {
            throw new Error("异常！");
          });
      });
    },
    //新增学生
    addStudent() {
      if (!this.studentName){
        Toast('请输入学生姓名')
      }else if (!this.gradeId){
        Toast('请选择学生年级')
      }
      /*else if (!this.studentId){
        Toast('请输入学生学号')
      }*/
      else {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确认新增学生！"
          })
          .then(() => {
            this.$loading();
            let dt = {
              name: this.studentName,         //学生姓名
              grade: this.gradeId,          //学生年级ID
              //studentNumber:this.studentId, //学号
              attendanceTypes: this.checkAttendanceType, //考勤类型
              trainingClasses: this.selectedTeachersId //培训班
            };
            if (this.classNameId){
              dt['classId'] = this.classNameId
            }
            if (this.studentNumber && this.addType === '2'){
              dt['phone'] = this.studentNumber
            }
            if (this.studentIdCard && this.addType === '1'){
              dt['cardNo'] = `NO.${this.studentIdCard}`
            }
            addStudent(dt)
              .then(res => {
                if (res.data.meta && res.data.meta.code === 0) {
                  this.$loadingHide();
                  Toast.success({
                    forbidClick: true, // 禁用背景点击
                    loadingType: "success",
                    position:'middle',
                    message: "新增学生成功"
                  });
                  // 暂时代替批量增加
                  this.studentName = ''
                  this.studentIdCard = ''
                  this.studentNumber = ''
                  const timer = setInterval(() => {
                    clearInterval(timer);
                    Toast.clear();
                    // this.$router.push({ name: "StudentManage" });
                  }, 2000);
                } else {
                  this.$dialog
                    .alert({
                      message: "新增异常！"
                    })
                    .then(() => {
                      // on close
                    });
                }
              })
              .catch(() => {
                throw new Error("异常！");
              })
              .finally(() => {
                this.$loadingHide()
              })
          })
          .catch(() => {
            // on cancel
          });
      }
    }
  },
  created() {
    this.getTrainingListFun()
    Promise.all([this.selectClassList(), this.selectAttendanceType()]).then(
      res => {
        this.$loadingHide();

        if (res[1].length > 0) {
          this.attendanceTypeList = [];
          for (let item of res[1]) {
            this.attendanceTypeList.push({
              name: item.name,
              id: item.id,
              entryTimeEnd: item.entryTimeEnd,
              entryTimeStart: item.entryTimeStart
            });
          }
        }
        if (res[0].length > 0) {
          this.classNameList = [];
          for (let item of res[0]) {
            if (item.id) {
              this.classNameList.push({
                id: item.id,
                name: item.name
              });
            }
          }
        }
      }
    );
  }
};
</script>

<style scoped lang="less">
#student-add {
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
  .class-from {
    padding-top: 25px;
    padding-right: 14px;
    .van-cell::after {
      content: " ";
      position: absolute;
      pointer-events: none;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      left: 15px;
      right: 0;
      bottom: 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      border-bottom: 1px solid #ebedf0;
    }
    .modal-stu{
     /* overflow: hidden;*/
      position: relative;
      display: flex;
      padding: 0.1rem 0.15rem;
      box-sizing: border-box;
      .title{
        flex: 1;
        font-size: 0.14rem;
        max-width: 0.9rem;
      }
      .van-radio-group{
        flex: 1;
        font-size: 0.14rem;
        overflow: hidden;
        .van-radio{
          float: left;
          margin-right: 0.2rem;
        }
      }
    }
    .modal-stu::after{
      content: ' ';
      position: absolute;
      pointer-events: none;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      left: 15px;
      right: 0;
      bottom: 0;
      -webkit-transform: scaleY(.5);
      transform: scaleY(.5);
      border-bottom: 1px solid #ebedf0;
    }
  }
  .footer-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.4rem;
    padding: 0.08rem 0;
    background-color: #3770fb;
    box-sizing: border-box;
    .van-col {
      font-size: 0.14rem;
      color: #fff;
      line-height: 0.24rem;
      text-align: center;
      border-right: 0.01rem solid #fff;
    }
    .van-col:last-child {
      border-right-width: 0;
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
  .van-cell__value {
    line-height: 0.48rem;
  }
}
.cardNo {
  & /deep/ .van-field__body::before {
    content: "NO. ";
    color: #999;
  }
}
</style>

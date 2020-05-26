<template>
  <div id="student-mdf">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar title="修改学生信息" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <van-row class="bind" type="flex" justify="center">
      <van-col span="8">
        <span class="info" :class="{ red: bindNumber == 0 }">{{ bindNumber > 0 ? `已绑定${bindNumber}人` : '未绑定'}}</span>
      </van-col>
      <van-col span="16">
        <span class="showQrCode" @click="showQrCode">点击生成学生绑定二维码&gt;&gt;</span>
      </van-col>
    </van-row>

    <p class="from-title">学生信息</p>
    <div class="class-from">
      <van-field v-model="studentName" label="学生名称：" placeholder="请输入学生名称" border/>
      <div class="modal-stu">
        <span class="title">模式：</span>
        <van-radio-group v-model="addType" @change="getAddStuType">
          <van-radio name="1">考勤</van-radio>
          <van-radio name="2">人脸</van-radio>
        </van-radio-group>
      </div>
      <div v-show="bStudentId" style="position: relative">
        <van-field v-model="studentCard" label="学生卡号：" class="card-num cardNo"  placeholder="请输入学生卡号" border/>
        <!--<span style="position: absolute;top: 0.14rem;left: 1.05rem">NO.</span>-->
      </div>

      <van-field v-model="internalNumber" label="手机号码：" v-show="bStudentNumber" placeholder="请输入手机号码" border/>
      <!--<van-field v-model="studentId" label="学号：" maxlength="32" placeholder="请输入学号" border/>-->
      <van-field v-model="remark" label="备注：" placeholder="请输入备注" border/>
      <van-field
        v-model="grade"
        label="学生年级："
        placeholder="请选择"
        border
        readonly
        clickable
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
        clickable
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
        clickable
        right-icon="arrow"
        @click="onAttendanceTypeActivateSlecte"
        @click-right-icon="onAttendanceTypeActivateSlecte"
      />
    </div>
    <div class="select-menu">
      <!-- 年级选择下拉菜单 -->
      <van-actionsheet v-model="showGrade" :actions="gradeList" @select="onSelectGrade"/>
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

    <van-dialog v-model="bindQrCode.show" class="bindQrCodeDialog">
      <van-loading v-show="bindQrCode.loading" class="loading" size="40px" />
      <img class="bindQrCode" :src="bindQrCode.image" alt="" />
    </van-dialog>
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
  Toast,
  Loading,
} from "vant";
import FooterBtn from "../../common/footer-operate-btn";
import { getAttendanceType } from '@/api/school/attendance-type-manage'
import { classList } from '@/api/school/class-manage'
import { getStudentInfo, updateStudent, getStudentBindQrcode } from '@/api/school/student-manage'
import { isEmpty } from '@/utils'
import { isMatchPhone } from '@/utils/regexpMatch'

export default {
  name: "student-mdf",
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
    [Cell.name]: Cell,
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    FooterBtn: FooterBtn
  },
  data() {
    return {
      //loading: false,
      //finished: false,
      totalNumber: "",
      studentName: null, //搜索的学生姓名
      studentCard: null, //学生卡号
      bStudentNumber:false,//隐藏学生卡号
      internalNumber: null, //手机号码
      //studentId:null,//学号
      bStudentId:true,//
      addType:'1',
      remark:null,
      grade: null, //选择的年级
      className: null, //选择的班级
      attendanceType: null, //选择的类型
      showGrade: false, //年级下拉列表隐藏
      showClassName: false, //班级下拉列表隐藏
      showAttendanceType: false, //隐藏考勤类型复选框
      //年级列表
      gradeList: [
        {
          name: "请选择",
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
      //底部按钮
      btnText: [
        {
          type: 2,
          title: "取消"
        },
        {
          type: 1,
          title: "确定"
        }
      ],
      //学生列表
      studentList: [],
      //学生班级
      classNameList: [],
      //考勤类型列表
      attendanceTypeList: [],
      //选择的年级ID
      gradeId: null,
      //选择的班级ID
      classNameId: null,
      //选择的状态
      stuStateId: null,
      //选中的考勤类型id
      checkAttendanceType: [],
      page: 1, //当前页
      pageSize: 20, //每页数据
      totalPage: 0, //保存总页数
      classListArr: [],
      statistical: {}, //统计信息

      bindNumber: 0,
      bindQrCode: {
        show: false,
        loading: true,
        image: '',
      }
    };
  },
  methods: {
    async showQrCode() {
      this.bindQrCode.show = true
      if (!isEmpty(this.bindQrCode.image)) {
        return
      }

      this.bindQrCode.loading = true
      getStudentBindQrcode(this.$route.query.id)
        .then(response => {
          if (response.data.meta.success) {
            this.bindQrCode.image = response.data.data.image
          }
        })
        .finally(() => {
          this.bindQrCode.loading = false
        })
    },
    //考勤类型复选框
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    //返回
    onClickLeft() {
      this.$router.back(-1);
    },
    //修改学生选择类型
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
    //底部按钮
    operateBtn(type) {
      if (type === 2){
        this.$router.back();
        return
      }
      /*this.$dialog
        .confirm({
          title: "提示",
          message: "确定修改该学生信息？"
        })
        .then(() => {*/
          // on confirm
      if (!this.studentName){
        Toast('请输入学生姓名')
      }else if (!this.gradeId){
        Toast('请选择学生年级')
      }else {
        this.mdfStudent(this.result);
      }

       /* })
        .catch(() => {
          // on cancel
        });*/
    },
    //年级选择点击事件
    onGradeActionsheet() {
      this.showGrade = true;
    },
    //年级选择
    onSelectGrade(item) {
      this.showGrade = false;
      this.grade = item.name;
      this.gradeId = item.id;
      //(this.studentList = []), (this.finished = true);
    },
    //班级选择点击事件
    onClassNameActivateSlecte() {
      this.showClassName = true;
    },
    //班级选择
    onSelectClassName(item) {
      this.showClassName = false;
      this.className = item.name;
      this.classNameId = item.id;
     // this.studentList = [];
      //this.finished = true;
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
      if (this.attendanceType.length == 0) {
        this.attendanceType = "请选择（多选）";
      }
    },
    //显示考勤复选框
    onAttendanceTypeActivateSlecte() {
      this.showAttendanceType = true;
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
    //获取学生信息
    getStudentInfo() {
      let id = this.$route.query.id;
      return new Promise((resolve, reject) => {
        getStudentInfo(id)
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
     //修改学生
    mdfStudent() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认修改该学生信息！"
        })
        .then(() => {
          this.$loading();
           let id = this.$route.query.id;
           let dt = {
             name: this.studentName,         //学生姓名
             grade: this.gradeId,          //年级
             remark:this.remark,       //学生备注
             //studentNumber:this.studentId,//学号
             attendanceTypes: this.checkAttendanceType //考勤类型
           };
          if (this.classNameId){//班级
            dt['classId'] = this.classNameId
          }
          if (this.internalNumber && this.addType === '2'){//手机号码
            dt['phone'] = this.internalNumber
          }
          if (this.studentCard && this.addType === '1'){//卡号
            dt['cardNo'] = `NO.${this.studentCard}`
          }
           updateStudent(id, dt)
            .then(res => {
              if (res.data.meta && res.data.meta.code === 0) {
                this.$loadingHide();
                Toast.success({
                  forbidClick: true, // 禁用背景点击
                  loadingType: "success",
                  position:'middle',
                  message: "修改学生成功"
                });
                const timer = setInterval(() => {
                  clearInterval(timer);
                  Toast.clear();
                  this.$router.push({ name: "StudentManage" });
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
            });
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  created() {
    Promise.all([
      this.selectClassList(),
      this.selectAttendanceType() ,
      this.getStudentInfo()
    ]).then(res => {
      this.$loadingHide();

      //班级列表数据处理
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
      //考勤类型数据处理
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
        //学生个人信息数据处理

      if (res[2]) {
        this.bindNumber = res[2].bindingInfo.length

        if (res[2].studentNumber){
          if (isMatchPhone(res[2].studentNumber)) {
            this.addType = '2';
            res[2].phone = res[2].studentNumber
          } else {
            this.addType = '1';
          }
        }else {
          this.addType = '1';
        }
        this.studentName = res[2].name;
        if (res[2].cardNo && res[2].cardNo.startsWith('NO.')) {
          res[2].cardNo = res[2].cardNo.slice(3)
        }
        this.studentCard = res[2].cardNo;
        this.internalNumber = res[2].phone;
        if (this.internalNumber) {
          this.getAddStuType('2')
        }
        this.grade = res[2].gradeName;
        this.gradeId = res[2].grade;
        this.classNameId = res[2].classId;
        this.className = res[2].className;
        this.remark = res[2].remark;
        //this.studentId = res[2].studentNumber;
        for (let item of res[2].attendanceTypes) {
          this.checkAttendanceType.push(item.id);
        }
        let check = [];

        for (let i of this.checkAttendanceType) {
          for (let v of this.attendanceTypeList) {
            if (i === v.id) {
              check.push(v.name);
            }
          }
        }
        this.attendanceType = check.join(",");
        if (this.attendanceType.length == 0) {
          this.attendanceType = null;
        }
      }
    });
  }
};
</script>

<style scoped lang="less">
#student-mdf {
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
    /*padding-top: 25px;*/
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
          font-size: 0.14rem;
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
.from-title {
  text-align: center;
  background: #f2f2f2;
  padding-top: .1rem;
  padding-bottom: .05rem;
}
.bind {
  font-size: 0.14rem;
  margin: .1rem 0;
  .info {
    color: #333;
    width: 100%;
    text-align: center;
    display: inline-block;
    border-right: .01rem solid #eee;
    &.red {
      color: #d80000;
    }
  }
  .showQrCode {
    color: #333;
    width: 100%;
    text-align: center;
    display: inline-block;
  }
}
.bindQrCodeDialog {
  .loading {
    margin: .12rem auto;
  }
  .bindQrCode {
    margin: 0 auto;
    display: block;
    max-width: 80vw;
    max-height: 70vh;
  }
}
.cardNo {
  & /deep/ .van-field__body::before {
    content: "NO. ";
    color: #999;
  }
}
</style>

<template>
  <div id="del-student">
    <div class="go-back">
      <van-nav-bar title="删除学生" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="student-select">
      <van-row>
        <van-col span="6">
          <div class="select-text" @click="onGradeActionsheet">{{grade}}</div>
          <van-icon name="arrow-down"  @click="onGradeActionsheet"/>
        </van-col>
        <van-col span="6">
          <div class="select-text" @click="onClassNameActivateSlecte">{{className}}</div>
          <van-icon name="arrow-down" @click="onClassNameActivateSlecte"/>
        </van-col>
        <van-col span="6">
          <div class="select-text" @click="onAttendanceTypeActivateSlecte">{{attendanceType}}</div>
          <van-icon name="arrow-down" @click="onAttendanceTypeActivateSlecte"/>
        </van-col>
        <van-col span="6">
          <div class="select-text" @click="onStuStateActivateSlecte">{{stuState}}</div>
          <van-icon name="arrow-down" @click="onStuStateActivateSlecte"/>
        </van-col>
      </van-row>
    </div>
    <div class="role-info">
      <van-row>
        <van-col span="6">共{{totalNumber}}位学生</van-col>
        <van-col span="18">
          <form action="/">
            <van-search
              v-model="studentName"
              placeholder="请输入搜索的学生名称"
              show-action
              @search="onSearch"
              @cancel="onCancel"
            />
          </form>
        </van-col>
      </van-row>
    </div>
    <div class="role-list">
      <ul>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-checkbox-group v-model="result">
            <van-cell-group>
              <van-cell
                v-for="(item,index) in studentList"
                :key="index"
                clickable
                @click="studentToggle(index)"
              >
                <li class="role-list-item">
                  <van-row>
                    <van-col span="4">
                      <img :src="item.image" alt>
                    </van-col>
                    <van-col span="6">
                      <p>{{item.name}}</p>
                      <p>
                        分班：
                        <i
                          :class="item.className?'':'active'"
                        >{{item.className ? item.className : '未分班'}}</i>
                      </p>
                    </van-col>
                    <van-col span="1">
                      <div class="border-l"></div>
                    </van-col>
                    <van-col span="11">
                      <van-row>
                        <van-col span="10">{{item.gradeName}}</van-col>
                        <van-col span="14" style="text-align:right;">{{item.cardNo}}</van-col>
                      </van-row>
                      <van-row>
                        <van-col span="24" style="overflow: scroll;white-space: nowrap;">
                          类型：
                          <span
                            v-for="(item1,index) in item.attendanceTypes"
                            :key="index"
                          >{{item1.name}}</span>
                        </van-col>
                      </van-row>
                    </van-col>
                    <van-col span="2">
                      <van-checkbox :name="item.id" ref="checkboxesStudent"/>
                    </van-col>
                  </van-row>
                </li>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-list>
      </ul>
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
      <!-- 状态选择 -->
      <van-actionsheet v-model="showStuState" :actions="stuStateList" @select="onSelectStuState"/>
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
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import {
  NavBar,
  Icon,
  Row,
  Col,
  List,
  Toast,
  Search,
  Actionsheet,
  Cell,
  CellGroup,
  Popup,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
} from "vant";
import FooterBtn from "../../common/footer-operate-btn";
import { getAttendanceType } from '@/api/school/attendance-type-manage'
import { classList } from '@/api/school/class-manage'
import { batchDeleteStudent, getStudentList } from '@/api/school/student-manage'

export default {
  name: "del-student",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [List.name]: List,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Toast.name]: Toast,
    [Search.name]: Search,
    [Actionsheet.name]: Actionsheet,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      loading: false,
      finished: false,
      totalNumber: "",
      studentName: null, //搜索的学生姓名
      grade: "全部年级 ", //选择的年级
      className: "全部班级 ", //选择的班级
      attendanceType: "全部类型", //选择的类型
      stuState: "全部状态", //选择的状态
      showGrade: false, //年级下拉列表隐藏
      showClassName: false, //班级下拉列表隐藏
      showAttendanceType: false, //隐藏考勤类型复选框
      showStuState: false, //隐藏状态下拉列表
      //年级列表
      gradeList: [
        {
          name: "全部年级",
          id: 0,
        },
        {
          name: "一年级",
          id: 1,
        },
        {
          name: "二年级",
          id: 2,
        },
        {
          name: "三年级",
          id: 3,
        },
        {
          name: "四年级",
          id: 4,
        },
        {
          name: "五年级",
          id: 5,
        },
        {
          name: "六年级",
          id: 6,
        },
        {
          name: "初中",
          id: 7,
        },
      ],
      //状态
      stuStateList: [
        {
          name: "全部状态",
          id: 0,
        },
        {
          name: "已绑定",
          id: 1,
        },
        {
          name: "未绑定",
          id: 2,
        },
      ],
      //底部按钮
      btnText: [
        {
          type: 2,
          title: "取消",
        },
        {
          type: 1,
          title: "删除学生",
        },
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
      result: [], //选中的要删除的学生id
    };
  },
  methods: {
    //列表加载
    onLoad() {
      this.getStudentList();
    },
    //选择删除的学生
    studentToggle(index){
      this.$refs.checkboxesStudent[index].toggle();
    },
    //考勤类型复选框
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    //返回
    onClickLeft() {
      this.$router.back(-1);
    },
    //底部按钮
    operateBtn(type) {
      if (type === 1) {
        if (!Array.isArray(this.result) || this.result.length === 0) {
          this.$toast('请先选择学生')
          return
        }
        this.$dialog
          .confirm({
            title: "提示",
            message: "确定删除当前选中的学生？",
          })
          .then(() => {
            // on confirm
            this.delStudent(this.result);
          })
          .catch(() => {
            // on cancel
          });
      } else if (type === 2) {
        this.$router.back();
      }
    },
    //年级选择点击事件
    onGradeActionsheet() {
      this.showGrade = true;
    },
    //年级选择
    onSelectGrade(item) {
      this.page = 1;
      this.showGrade = false;
      this.grade = item.name;
      this.gradeId = item.id;
      this.studentList = [];
      this.loading = true;
      this.finished = false;
      //this.getStudentList();
      if (this.loading){
        this.onLoad();
      }
    },
    //状态选择点击事件
    onStuStateActivateSlecte() {
      this.showStuState = true;
    },
    //状态选择
    onSelectStuState(item) {
      this.page = 1;
      this.showStuState = false;
      this.stuState = item.name;
      this.stuStateId = item.id;
      this.studentList = [];
      this.loading = true;
      this.finished = false;
      //this.getStudentList();
      if (this.loading){
        this.onLoad();
      }
    },
    //班级选择点击事件
    onClassNameActivateSlecte() {
      this.showClassName = true;
    },
    //班级选择
    onSelectClassName(item) {
      this.page = 1;
      this.showClassName = false;
      this.className = item.name;
      this.classNameId = item.id;
      this.studentList = [];
      this.loading = true;
      this.finished = false;
      //this.getStudentList();
      if (this.loading){
        this.onLoad();
      }
    },
    //搜索
    onSearch() {
      this.page = 1;
      this.studentList = [];
      this.loading = true;
      this.finished = false;
      //this.getStudentList();
      if (this.loading){
        this.onLoad();
      }
      //this.onLoad();
    },
    //搜索取消
    onCancel() {
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
      if (this.attendanceType.length === 0) {
        this.attendanceType = "全部类型";
      }
      this.page = 1;
      this.studentList = [];
      this.loading = true;
      this.finished = false;
      //this.getStudentList();
      if (this.loading){
        this.onLoad();
      }
      //this.onLoad();
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
    //获取学生列表
    getStudentList() {
      this.$loading();
      getStudentList({
        page: this.page,
        pageSize: this.pageSize,
        query: this.studentName,
        grade: this.gradeId,
        classId: this.classNameId,
        attendanceTypes: this.checkAttendanceType,
        bindingState: this.stuStateId,
      })
        .then(res => {
          this.$loadingHide()
          //学生列表数据处理
          if (res.data.meta.code === 0) {
            this.totalNumber = res.data.data.paginate.total; //学生总数
            this.totalPage = res.data.data.paginate.totalPage;
            if (res.data.data.list.length > 0) {
              this.studentList.push.apply(this.studentList,res.data.data.list); //学生列表
              this.loading = false;
              if (this.page === this.totalPage) {
                this.finished = true;
              } else {
                //this.finished = false;
                this.page = this.page + 1;
              }
            }else {
              this.loading = false;
              this.finished = true;
            }
          }
        })
        .catch(() => {
          throw new Error("异常！");
        });
    },
    //删除学生
    delStudent(id) {
      this.$loading();
      batchDeleteStudent({list:id})
        .then(res => {
          this.$loadingHide();
          if (res.data.meta && res.data.meta.code === 0) {
            this.page = 1;
            this.studentList = [];
            this.result = [];
            this.loading = true;
            this.finished = false;
            //this.getStudentList();
            if (this.loading){
              this.onLoad();
            }
            Toast.success({message:"删除成功",position:'middle'});
          } else {
            Toast.success({message:"删除失败",position:'middle'});
          }
        })
        .catch(() => {
          this.$loading();
          throw new Error("异常！");
        });
    },
  },
  created() {
    Promise.all([this.selectClassList(), this.selectAttendanceType()]).then(
      res => {
        this.$loadingHide();
        //班级列表数据处理
        if (res[0].length > 0) {
          this.classNameList = [];
          this.classNameList.push({
            id: null,
            name: '全部班级'
          });
          for (let item of res[0]) {
            if (item.id) {
              this.classNameList.push({
                id: item.id,
                name: item.name,
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
              entryTimeStart: item.entryTimeStart,
            });
          }
        }
      },
    );
  },
  // computed: {
  //   teacherNum() {
  //     return len => {
  //       return (parseInt(len) + 1).toFixed(0);
  //     };
  //   }
  // }
};
</script>

<style scoped lang="less">
#del-student {
  font-size: 0;
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

  .student-select {
    text-align: center;
    height: 0.48rem;
    font-size: 0.14rem;
    line-height: 0.48rem;
    color: #666;
    border-bottom: 10px solid #f3f7f8;

    .select-text {
      float: left;
      width: 70%;
      text-align: right;
      white-space: nowrap;
      overflow: auto;
    }
  }

  .role-info {
    text-align: center;
    height: 0.48rem;
    font-size: 0.14rem;
    line-height: 0.48rem;
    color: #666;
    border-bottom: 10px solid #f3f7f8;

    .van-search {
      padding: 0.06rem 0.16rem;
    }
  }

  .role-list {
    padding: 0 0.16rem 0.4rem;
    text-align: center;
    /*height: 0.48rem;*/
    font-size: 0.14rem;
    /*line-height: 0.48rem;*/
    color: #666;

    .van-cell {
      text-align: center;
      padding: 0;
      line-height: 0.48rem;

      .role-list-item {
        .van-row {
          height: 0.48rem;
          padding: 0.1rem 0;
          border-bottom: 1px solid #f3f7f8;
          color: #666;

          .van-col {
            text-align: left;
            height: 0.48rem;
            line-height: 0.24rem;
            font-size: 0.12rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            i {
              font-style: normal;
            }

            i.active {
              font-style: normal;
              color: #d80000;
            }

            .border-l {
              width: 1px;
              height: 0.48rem;
              margin-top: 10%;
              background-color: #f3f7f8;
            }

            .van-row {
              height: 0.24rem;
              line-height: 0.24rem;
              padding: 0;
              border: 0;
            }

            img {
              width: 0.48rem;
              height: 0.48rem;
              border-radius: 50%;
              border: 1px solid #f3f7f8;
            }

            .van-checkbox {
              text-align: right;
              line-height: 0.48rem;
            }
          }
        }
      }
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
/*底部按钮颜色*/
/deep/ #bottom1{
  background: #FF6666;
}
  /deep/.van-checkbox__icon--checked .van-icon{
    border-color: #FF6666;
    background-color: #FF6666;
  }
</style>

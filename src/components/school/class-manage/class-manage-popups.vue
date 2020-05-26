<template>
  <div id="class-manage-popups">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar title="新增班级" left-text="返回" left-arrow @click-left="$router.back()"/>
    </div>
    <div class="class-from">
      <van-field v-model="className" label="班级名称：" placeholder="请输入班级名称" required border/>
      <van-field
        v-model="selectedTeachersName"
        label="教师：" 
        placeholder="请选择教师" 
        border
        readonly
        right-icon="arrow"
        @click="showTeacher = true"
        @click-right-icon="showTeacher = true"/>
      <van-field
        v-model="selectedStudentsName"
        label="学生入班："
        placeholder="请选择学生"
        border
        readonly
        right-icon="arrow"
        @click="showStudent = true"
        @click-right-icon="showStudent = true"/>
    </div>

    <van-popup v-model="showTeacher" position="bottom" style="max-height: 80vh;">
      <p v-if="Array.isArray(teachersArr) && teachersArr.length === 0" style="font-size: .16rem;text-align: center;margin: .1rem 0;">没有可选的教师</p>
      <p v-else style="font-size: .16rem;text-align: center;margin: .1rem 0;">选择教师</p>
      <van-checkbox-group v-model="selectedTeachersId">
        <van-cell-group>
          <van-cell
            v-for="item in teachersArr"
            :key="item.id"
            :title="`${item.name}`"
            clickable
            @click="toggleTeacher(item)" >
            <van-checkbox :name="item.id" ref="checkboxes"/>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </van-popup>

    <van-popup v-model="showStudent" position="bottom" style="max-height: 80vh;">
      <p v-if="Array.isArray(studentsArr) && studentsArr.length === 0" style="font-size: .16rem;text-align: center;margin: .1rem 0;">没有可选的学生</p>
      <p v-else style="font-size: .16rem;text-align: center;margin: .1rem 0;">选择学生</p>
      <van-checkbox-group v-model="selectedStudentsId">
        <van-cell-group>
          <van-cell
            v-for="item in studentsArr"
            :key="item.id"
            :title="`${item.name}`"
            clickable
            @click="toggleStudent(item)" >
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
  Cell,
  CellGroup,
  Toast,
} from "vant";
import FooterBtn from '../../common/footer-operate-btn';
import { getTeacherList } from '@/api/school/teacher-manage'
import { getStudentList, getDistributionStudentList } from '@/api/school/student-manage'
import { addClass } from '@/api/school/class-manage'

export default {
  name: "class-manage-popups",
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
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      className: "",//保存班级名称
      btnText: [
        {
          type: 2,
          title: "取消",
        },
        {
          type: 1,
          title: "确定",
        },
      ],
      //所有教师列表
      showTeacher: false,//教师菜单显示
      teachersArr: [],
      selectedTeachers: [],//保存选中的教师
      //所有学生 列表
      showStudent: false,//学生菜单显示
      studentsArr: [],
      selectedStudents: [],//保存选中的学生
    };
  },
  computed: {
    selectedTeachersId() {
      return this.selectedTeachers.map(s => s.id)
    },
    selectedTeachersName() {
      return this.selectedTeachers.map(s => s.name).join('，')
    },
    selectedStudentsId() {
      return this.selectedStudents.map(s => s.id)
    },
    selectedStudentsName() {
      return this.selectedStudents.map(s => s.name).join('，')
    },
  },
  methods: {
    toggleTeacher(teacher) {
      const index = this.selectedTeachersId.indexOf(teacher.id)
      if (index >= 0) {
        this.selectedTeachers.splice(index, 1)
      } else {
        this.selectedTeachers.push(teacher)
      }
    },
    toggleStudent(student) {
      const index = this.selectedStudentsId.indexOf(student.id)
      if (index >= 0) {
        this.selectedStudents.splice(index, 1)
      } else {
        this.selectedStudents.push(student)
      }
    },
    confirmStudent() {
      this.showStudent = false;
    },
    confirmTeacher(item) {
      this.showTeacher = false;
    },
    operateBtn(type) {
      if (type === 1) {
        if (!this.className){
          Toast('请输入班级名称')
        }else {
          this.addClassDefine()
        }
      } else if (type === 2) {
        this.$router.back()
      }
    },
    //获取 所有未分班的 学生列表
    selectStudentList() {
      getDistributionStudentList()
        .then(res => {
          //console.log(res);
          if (res.data.meta && res.data.meta.code === 0) {
            if (res.data.data.length > 0) {
              this.studentsArr = [];
              for (let item of res.data.data) {
                  this.studentsArr.push({
                    id: item.id,
                    name: item.name,
                  })
              }
            }
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    //获取 教师列表
    selectTeacherList() {
      getTeacherList({ page: 0 })
        .then(res => {
          //console.log(res);
          if (res.data.meta && res.data.meta.code === 0) {
            if (res.data.data.list.length > 0) {
              this.teachersArr = [];
              for (let item of res.data.data.list) {
                this.teachersArr.push({
                  name: item.name,
                  id: item.id,
                })
              }
            }
          }
        })
    },
    //新增班级
    addClassDefine() {
      this.$dialog.confirm({
        title: '提示',
        message: '确认新增班级',
      }).then(() => {

        addClass({
          name: this.className,
          teachers: this.selectedTeachersId,
          students: this.selectedStudentsId,
        })
          .then(res => {
            if (res.data.meta && res.data.meta.code === 0) {
              Toast.success({
                forbidClick: true, // 禁用背景点击
                loadingType: 'success',
                message: '新增班级成功',
              });
              this.$router.replace({ name: 'ClassManage'})
            } else {
              this.$dialog.alert({
                message: '新增异常！',
              }).then(() => {
                // on close
              });
            }
          }).catch(() => {
          throw new Error("异常！")
        })
      }).catch(() => {
        // on cancel
      });
    },
  },
  created() {
    this.selectTeacherList();
    this.selectStudentList();
  },
};
</script>

<style scoped lang="less">
#class-manage-popups {
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
  }

  .footer-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.4rem;
    padding: 0.08rem 0;
    background-color: #3770FB;
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
}
</style>

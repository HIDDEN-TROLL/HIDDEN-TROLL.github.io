<template>
  <div>

    <div id="statistical" style="margin-bottom: 0.46rem">
      <div class="go-back">
        <van-nav-bar
          :title="title"
          :left-text="!isFromTemplate ? '返回' : ''"
          :left-arrow="!isFromTemplate"
          right-text="更多"
          @click-left="$router.back()"
          @click-right="isMenuActionSheetShow = true"
        />
      </div>
      <div class="trust-box">
        <TrustList :trust-list="trustList" :current-id="currentAttendanceId"
                   v-on:attendanceType="onAttendanceTypeChange"></TrustList>
      </div>
      <div class="stat-list">
        <more-tabs v-show="showType !== 3" class="scrollable" v-model="tabIndex" :list="tabCandidateList" />
        <UnsignedList
          :type="type"
          :show-type="showType"
          :can-sign="canSign"
          :unsign-list="studentList"
          :is-unsign-list-filtered="isStudentListFiltered"
          :filter-action-sheet-actions="filterCandidates"
          :empty-student-list-reason="emptyStudentListReason"
          :LeaveList = "LeaveList"
          @onFilterActionSelect="onFilterActionSelect"
          @updateRemark="updateRemark"
          @signed="onStudentSigned"
          :attendId="currentAttendanceId"/>
      </div>

      <Actionsheet
        class="action-sheet"
        v-model="isMenuActionSheetShow"
        :actions="menuActionSheetActions"
        get-container="#app"
        cancel-text="取消"
        @select="onMenuActionSheetSelect"/>

    </div>

    <div class="leave" @click="jump()">
      请假记录
    </div>

  </div>
</template>

<script>
import { NavBar, Actionsheet } from 'vant';
import TrustList from '../components/trust-type';
import UnsignedList from './components/unsigned-list'
import { getAttendanceType } from '@/api/school/attendance-type-manage'
import { unsignedStudent } from '@/api/school/attendance'
import { getAllClass, getAllGrade } from '@/api/common'
import { Notify } from 'vant'
import { getParamFromUrlAndRoute, isNumeric } from '@/utils'
import moreTabs from '@/components/common/more-tabs'

import { getConfig, setConfig, ConfigKey_attendanceUnSignedStatisticalShowType } from '@/utils/config'

export default {
  name: "statistical",
  components: {
    vanNavBar: NavBar,
    Actionsheet,
    TrustList: TrustList,
    UnsignedList: UnsignedList,
    moreTabs,
  },
  data() {
    return {
      isMenuActionSheetShow: false,

      emptyStudentListReason: '', // 当前学生列表为空的原因
      attendanceTypeCurrentTimeStatus: 0, // 当前选择的考勤类型, 在当前时间段内的状态, 0既不在进校时间范围也不在离校时间范围, 1进, 2离
      type: 1,//当前页面的状态 1 进园 2 离园
      showType: getConfig(ConfigKey_attendanceUnSignedStatisticalShowType, 2, [1,2,3]),//学生的显示类型, 按什么进行分类. 1按年级显示 2按班级显示 3显示全部

      tabIndex: 0,
      disableTabIndexWatcher: false,
      currentAttendanceId: 0,//保存当前考勤类型的id
      currentClassId: 0,//保存当前选中班级的id 默认 0 表示全班级
      currentGradeId: 0,//保存年级id 默认 0 表示全年级

      attendanceTypeList: [],//考勤类型
      classList: [],//班级列表
      gradeList: [],//年级列表
      unsignList: [],//查询的学生列表
      LeaveList: [],//查询的学生列表

      isFromTemplate: false,
      templateId: 0,
      additionalParams: {},
    }
  },
  watch: {
    tabIndex() {
      if (this.disableTabIndexWatcher) {
        return
      }

      if (this.showType === 1 && Array.isArray(this.gradeList) && this.gradeList[this.tabIndex]) {
        this.currentGradeId = this.gradeList[this.tabIndex].id
      } else if (this.showType === 2 && Array.isArray(this.classList) && this.classList[this.tabIndex]) {
        this.currentClassId = this.classList[this.tabIndex].id
      }
      this.getStudentList()
    },
  },
  computed: {
    title() {
      const title = this.type === 1 ? '未进园学生统计' : '未离园学生统计'
      document.title = title
      return title
    },
    trustList() {
      return this.attendanceTypeList.map(attendanceType => {
        if (this.type === 1) {
          attendanceType.time = `${attendanceType.entryTimeStart}-${attendanceType.entryTimeEnd}`
        } else {
          if (!attendanceType.exitTimeStart || !attendanceType.exitTimeEnd) {
            attendanceType.time = `未设置离园`
          } else {
            attendanceType.time = `${attendanceType.exitTimeStart}-${attendanceType.exitTimeEnd}`
          }

        }
        return attendanceType
      })
    },
    isStudentListFiltered() { // studentList 是否有经过过滤
      return (this.showType === 1 && this.currentClassId > 0) || (this.showType === 2 && this.currentGradeId > 0)
    },
    studentList() {
      if (this.showType === 1 && this.currentClassId > 0) {
        return this.unsignList.filter(student => student.classId === this.currentClassId)
      } else if (this.showType === 2 && this.currentGradeId > 0) {
        return this.unsignList.filter(student => student.grade === this.currentGradeId)
      }
      return this.unsignList
    },
    tabCandidateList() {
      if (this.showType === 2) {
        return this.classList.map(clazz => clazz.name)
      } else {
        return this.gradeList.map(grade => grade.name)
      }
    },
    menuActionSheetActions() {
      return [
        {
          name: '切换进园',
          value: 1,
          associateKey: 'type',
          disabled: this.type === 1,
        },
        {
          name: '切换离园',
          value: 2,
          associateKey: 'type',
          disabled: this.type === 2,
          className: 'menu-action-sheet-divider' // 额外的样式 进行区分
        },

        {
          name: '按年级显示',
          value: 1,
          associateKey: 'showType',
          disabled: this.showType === 1
        },
        {
          name: '按班级显示',
          value: 2,
          associateKey: 'showType',
          disabled: this.showType === 2
        },
        {
          name: '显示全部',
          value: 3,
          associateKey: 'showType',
          disabled: this.showType === 3
        },
      ]
    },
    filterCandidates() {
      if (this.showType === 1) {
        const list = this.classList.map(clazz => ({
          id: clazz.id,
          name: clazz.name,
        }))
        list.unshift({
          name: '全部班级',
          id: 0,
        })
        return list
      } else if (this.showType === 2) {
        const list = this.gradeList.map(grade => ({
          id: grade.id,
          name: grade.name,
        }))
        list.unshift({
          name: '全部年级',
          id: 0,
        })
        return list
      } else {
        return []
      }
    },
    canSign() { // 可否进行签到签退
      return this.attendanceTypeCurrentTimeStatus === this.type
    },
  },
  methods: {
    jump(){
      this.$router.push({name:'LeaveRecord'})
    },
    // 切换查看进/离园
    switchType() {
      if (this.type === 1) {
        this.type = 2
      } else if (this.type === 2) {
        this.type = 1
      }
      this.getStudentList()
    },
    // 切换查看方式: 按年级, 按班级, 查看全部
    switchShowType(showType) {
      this.disableTabIndexWatcher = true
      setConfig(ConfigKey_attendanceUnSignedStatisticalShowType, showType);
      this.showType = showType
      this.tabIndex = 0
      if (this.showType === 1) {
        this.currentGradeId = this.gradeList[0].id
        this.currentClassId = 0
      } else if (this.showType === 2 && Array.isArray(this.classList) && this.classList.length > 0) {
        this.currentGradeId = 0
        this.currentClassId = this.classList[0].id
      } else {
        this.currentGradeId = 0
        this.currentClassId = 0
      }

      this.getStudentList()
      this.disableTabIndexWatcher = false
    },
    // 菜单选择事件
    onMenuActionSheetSelect(item) {
      console.log(item)
      this.isMenuActionSheetShow = false
      if (item.associateKey === 'type') {
        this.switchType(item.value)
      } else if (item.associateKey === 'showType') {
        this.switchShowType(item.value)
      }
    },
    //获取考勤类型与时间
    getAttendanceType() {
      return getAttendanceType(this.additionalParams)
        .then(response => {
          if (response.data.meta && response.data.meta.code === 0) {
            if (response.data.data.length > 0) {
              this.attendanceTypeList = response.data.data
              this.selectSuitAttendanceType()

            } else {
              Notify({
                message: '未设置考勤类型或获取考勤类型失败',
                background: '#ff4444',
                duration: 5000,
              })
            }
          }
        })
    },
    //获取班级列表
    getClassList() {
      const params = {
        withStudentNumber: 1,
        ...this.additionalParams
      }
      return getAllClass(false, params)
        .then(response => {
          if (response.data.meta && response.data.meta.code === 0) {
            if (response.data.data.length <= 0) {
              Notify({
                message: '获取班级失败，可能原因：当前机构未添加班级；当前教师未关联班级',
                background: '#ff4444',
                duration: 10000,
              })
              return
            }
            this.classList = response.data.data
              .filter(clazz => !isNumeric(clazz.studentNumber) || clazz.studentNumber > 0);
          }
        })
    },
    getGradeList() {
      return getAllGrade()
        .then(response => {
          if (response.data.meta && response.data.meta.code === 0) {
            if (response.data.data.length <= 0) {
              Notify({
                message: '获取年级失败',
                background: '#ff4444',
                duration: 10000,
              })
              return
            }
            this.gradeList = response.data.data
              .filter(grade => !isNumeric(grade.studentNumber) || grade.studentNumber > 0)
              .map(grade => {
                return {
                  id: grade.grade,
                  name: grade.gradeName,
                }
              })
          }
        })
    },
    //获取 未进园，离园 的学生列表
    getStudentList() {
      if (this.currentAttendanceId <= 0) {
        this.$toast('请先选择考勤类型')
        return
      }
      if (this.showType === 1) {
        if (this.currentGradeId <= 0) {
          this.$toast('请先选择年级')
          return
        }
      } else if (this.showType === 2) {
        if (this.currentClassId <= 0) {
          this.$toast('请先选择班级')
          return
        }
      }

      let classId
      let grade
      if (this.showType === 1) {
        classId = this.classList.map(clazz => clazz.id)
        grade = this.currentGradeId
      } else if (this.showType === 2) {
        classId = this.currentClassId
        grade = 0
      } else {
        classId = this.classList.map(clazz => clazz.id) // 不默认加班级ID限制, 可能会返回所有班级的学生, 包括非当前教师负责的班级的学生
        grade = 0
      }

      this.$loading(undefined, undefined, true)
      unsignedStudent(this.currentAttendanceId, classId, grade, this.type, this.additionalParams)
        .then(response => {
          if (response.data.meta && response.data.meta.code === 0) {
            this.attendanceTypeCurrentTimeStatus = response.data.data.attendanceTypeCurrentTimeStatus
            this.emptyStudentListReason = response.data.data.emptyStudentListReason

            const gradeList = [undefined, '一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初中']
            const classMap = {}
            this.classList.forEach(clazz => classMap[clazz.id] = clazz.name)

            this.unsignList = response.data.data.students.map(student => {
              student.gradeName = gradeList[student.grade] ? gradeList[student.grade] : ''
              student.className = classMap[student.classId] ? classMap[student.classId] : ''
              return student
            });
          } else {
            this.unsignList = []
          }

          this.LeaveList= [];
          for (let item of response.data.data.students){
            if(item.isLeave === true){
              this.LeaveList.push(item.isLeave)
            }
          }

        })

        .finally(() => this.$loadingHide())

    },

    //切换考勤类型 获取数据
    onAttendanceTypeChange(item) {
      this.currentAttendanceId = item.id;
      this.getStudentList()
    },
    onFilterActionSelect(id) {
      if (this.showType === 1) {
        this.currentClassId = id
      } else if (this.showType === 2) {
        this.currentGradeId = id
      }
    },

    // 修改学生备注 或 选择年级 更新列表
    updateRemark(item) {
      const id = item.id
      const remark = item.remark
      const student = this.unsignList.find(student => student.id === id)
      if (student) {
        student.remark = remark
      }
    },
    onStudentSigned(id) {
      this.unsignList = this.unsignList.filter(student => student.id !== id)
    },
    selectSuitAttendanceType() {
      const attendance = this.attendanceTypeList.find(attendance => attendance.status !== 0)
      if (attendance) {
        this.currentAttendanceId = attendance.id
        if (attendance.status === 2) {
          this.type = 2
        }
      } else {
        this.currentAttendanceId = this.attendanceTypeList[0].id;
      }
    },
  },
  created() {
    const templateId = getParamFromUrlAndRoute('template_id', this.$router)
    if (templateId && parseInt(templateId) > 0) {
      this.isFromTemplate = true
      this.templateId = parseInt(templateId)
      this.additionalParams = {
        from: 'template',
        template_id: this.templateId
      }
    }

    this.$loading()
    Promise.all([
      this.getAttendanceType(),
      this.getClassList(),
      this.getGradeList(),
    ])
      .then(() => {
        if (this.showType === 1) {
          this.currentGradeId = this.gradeList[0].id
        } else if (this.showType === 2) {
          this.currentClassId = this.classList[0].id
        }
      })
      .then(this.getStudentList)
      .finally(() => {
        this.$loadingHide()
      })
  },
}
</script>

<style scoped lang="less">
.menu-action-sheet-divider {
  border-bottom: 10px solid #f8f8f8;
}

#statistical {
  font-size: 0;

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

  .trust-box {
    padding-top: 0.17rem;
    height: 0.72rem;
    box-sizing: border-box;
    overflow: hidden;
  }

  .stat-list {
    padding: 0.05rem 0.16rem 0;
    background-color: #fff;
    box-sizing: border-box;
  }
}
.leave{
  text-align: center;
  line-height: 0.46rem;
  font-size: 0.14rem;
  background: #3770FB;
  position: fixed;
  color: white;
  width: 100%;
  bottom: 0;
}
</style>

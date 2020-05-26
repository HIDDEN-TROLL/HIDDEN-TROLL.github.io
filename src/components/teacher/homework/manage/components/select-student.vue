<template>
  <div class="teacher_homework_manage_select_student">

    <more-tabs class="scrollable" v-model="tabIndex" :list="classNameList" />

    <student-paginate
      v-for="(studentList, index) in studentList2dArray"
      :key="index"
      :index="index"
      v-show="tabIndex === index"
      :show="tabIndex === index"
      :student-list="studentList" />

    <p class="bottom">
      <span class="toggle_notice_parent" @click="toggleSendNotice">
        <span class="label">是否通知家长到园接送孩子？</span>
        <span class="label">{{ selectedStudentSendNotice ? '是' : '否' }}</span>
        <van-switch
          size="20px"
          active-color="#07c160"
          inactive-color="white"
          :disabled="selectedStudentWorkInfo.isDisableSwitchSendNotice"
          :value="selectedStudentSendNotice" />
      </span>
    </p>
  </div>
</template>
<script>
import moreTabs from '@/components/common/more-tabs.vue'
import studentPaginate from './student-paginate.vue'
import { mapMutations, mapState, mapGetters } from 'vuex'
import { Switch } from 'vant'

export default {
  name: 'teacher_homework_manage_select_student',
  data() {
    return {
      tabIndex: 0,
    }
  },
  components: {
    moreTabs,
    studentPaginate,
    vanSwitch: Switch,
  },
  computed: {
    ...mapState('homework', [
      'classNameList',
      'studentList2dArray',
      'selectedStudentSendNotice',
      'selectedStudent',
    ]),
    ...mapGetters('homework', [
      'selectedStudentWorkInfo',
    ]),
  },
  methods: {
    ...mapMutations('homework', [
      'toggleSelectedStudentSendNotice',
    ]),
    toggleSendNotice() {
      if (!this.selectedStudent) {
        this.$toast('请先选择学生')
        return
      }
      if (this.selectedStudent.workInfo.isDisableSwitchSendNotice) {
        this.$toast('该学生的通知已发送，无法再进行切换')
        return
      }
      this.toggleSelectedStudentSendNotice()
    },
  }
}
</script>
<style scoped lang="less">
.teacher_homework_manage_select_student {
  min-height: 10vh;
  background-color: #fff;
  flex-shrink: 0;
  border-bottom: 0.02rem solid #eee;

  .bottom {
    margin-bottom: .1rem;

    .toggle_notice_parent {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: #666666;
      font-size: .16rem;

      .label {
        margin: 0 .1rem;
      }
    }
  }
}
</style>

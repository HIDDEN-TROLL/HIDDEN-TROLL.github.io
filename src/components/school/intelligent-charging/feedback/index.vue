<template>
  <div class="charge-feedback">
    <header class="header">
      <van-nav-bar
        title="对哪位学生存在异议"
        left-text="返回"
        left-arrow
        @click-left="$router.back()" />

      <p class="top-info">共选中{{ $store.getters['charge/feedbackSelectStudentCount'] }}位学生</p>
    </header>

    <section v-if="isBillDataAvailable" class="body">
      <student-list :bill-data="billData" />
    </section>
    <p v-else class="body center">无数据</p>

    <div class="footer">
      <p class="tip">最晚提交异议时间：{{ feedbackDeadlineDateString }}</p>

      <van-row class="action" type="flex" justify="center" align="center">
        <van-col span="24">
          <van-button class="button" plain @click="next">下一步</van-button>
        </van-col>
      </van-row>

    </div>

  </div>

</template>

<script>
import { NavBar, Row, Col, Button } from 'vant'
import { date } from '@/utils'
import studentList from './components/student-list'

export default {
  name: 'charge-feedback',
  components: {
    vanNavBar: NavBar,
    vanRow: Row,
    vanCol: Col,
    vanButton: Button,
    studentList,
  },
  data() {
    return {

    }
  },
  computed: {
    billData() {
      return this.$store.state.charge ? this.$store.state.charge.billData : undefined
    },
    isBillDataAvailable() {
      return this.billData !== undefined && this.billData.id > 0
    },
    feedbackDeadlineDateString() {
      if (!this.isBillDataAvailable) {
        return ''
      }
      return date('Y年m月d日H:i', this.billData.feedbackDeadline)
    },
    selectedStudent() {
      return this.$store.state.charge.feedbackSelectedStudents
    },
  },
  methods: {
    next() {
      if (!Array.isArray(this.selectedStudent) || this.selectedStudent.length === 0) {
        this.$toast('请先选择有异议的学生')
        return
      }
      this.$router.push({ name: 'ChargeFeedbackSubmit' })
    }
  },
  created() {
    if (!this.isBillDataAvailable) {
      this.$router.replace({ name: 'Charge' })
      return
    }

    const submitFeedbackStatus = this.billData.submitFeedbackStatus
    if (submitFeedbackStatus !== 0) {
      if (submitFeedbackStatus === 1) {
        this.$toast('已经提交过反馈, 并处于审核状态中, 暂时不能再次提交反馈')
      } else if (submitFeedbackStatus === 2) {
        this.$toast('时间已超过提交反馈截止日期, 无法提交反馈')
      } else if (submitFeedbackStatus === 3) {
        this.$toast('账单已付费, 无法提交反馈')
      }
      this.$router.back()
    }
  },
}
</script>

<style scoped lang="less">
.charge-feedback {
  background-color: #F3F7F8;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-size: .16rem;

  .red {
    color: #f66;
  }

  .header {
    background-color: #fff;
    margin-bottom: 10px;
    flex-shrink: 0;

    .datepicker {
      border-bottom: 1px solid #F3F7F8;
    }

    .top-info {
      font-size: 0.14rem;
      color: #333;
      text-align: center;
      height: 0.4rem;
      line-height: 0.4rem;
    }
  }

  .body {
    flex-grow: 1;
    overflow: scroll;
    display: flex;
    background-color: #fff;

    &.center {
      justify-content: center;
      align-items: center;
    }
  }

  .footer {
    background-color: #fff;
    flex-shrink: 0;

    .tip {
      font-size: 0.14rem;
      color: #999;
      line-height: .3rem;
      text-align: center;

      &.red {
        color: #f66;
      }
    }

    .action {
      height: .4rem;
      line-height: .4rem;
      background: #3770fb;
      color: #fff;

      .right-border {
        height: .25rem;
        line-height: .25rem;
        border-right: 1px solid #fff;
      }

      .button {
        width: 100%;
        text-align: center;
        display: inline-block;

        color: #fff;
        background: #3770fb;
        height: .4rem;
        line-height: .4rem;
        border: 0;

        &.red {
          background: #f66;
          color: #fff;
          height: .4rem;
        }
      }
    }
  }
}
</style>

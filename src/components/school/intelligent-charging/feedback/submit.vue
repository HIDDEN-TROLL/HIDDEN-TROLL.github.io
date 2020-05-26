<template>
  <div class="charge-feedback-submit">
    <header class="header">
      <van-nav-bar
        title="对哪位学生存在异议"
        left-text="重选"
        left-arrow
        @click-left="$router.back()" />

      <p class="top-info">请认真填写理由和原因，内容越具体，越容易通过审议</p>
    </header>

    <section v-if="isBillDataAvailable && Array.isArray(selectedStudent) && selectedStudent.length > 0" class="body">
      <p class="info">共{{ selectedStudent.length }}位学生</p>

      <div class="content">
        <div
          v-for="(student, index) in list"
          :key="index">
          <van-row class="student-info">
            <van-col span="6">{{ student.name }}</van-col>
            <van-col span="4">{{ student.className }}</van-col>
          </van-row>

          <van-field
            class="field"
            v-model="student.content"
            type="textarea"
            placeholder="请输入理由或原因..."
            rows="3"
            autosize="autosize" />
        </div>
      </div>
    </section>
    <p v-else class="body center">无数据</p>

    <div class="footer">
      <p class="tip">最晚提交异议时间：{{ feedbackDeadlineDateString }}</p>

      <van-row class="action" type="flex" justify="center" align="center">
        <van-col span="24">
          <van-button class="button" @click="submit">提交异议</van-button>
        </van-col>
      </van-row>

    </div>

  </div>

</template>

<script>
import { NavBar, Row, Col, Button, Field } from 'vant'
import { date } from '@/utils'
import { postFeedback } from '@/api/school/charge'

export default {
  name: 'charge-feedback-submit',
  components: {
    vanNavBar: NavBar,
    vanRow: Row,
    vanCol: Col,
    vanButton: Button,
    vanField: Field,
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    billData() {
      return this.$store.state.charge ? this.$store.state.charge.billData : undefined
    },
    isBillDataAvailable() {
      return this.billData !== undefined && this.billData.id > 0
    },
    selectedStudent() {
      return this.$store.state.charge.feedbackSelectedStudents
    },
    feedbackDeadlineDateString() {
      if (!this.isBillDataAvailable) {
        return ''
      }
      return date('Y年m月d日H:i', this.billData.feedbackDeadline)
    },

  },
  methods: {
    submit() {
      if (!Array.isArray(this.selectedStudent) || this.selectedStudent.length === 0) {
        this.$toast('请先选择有异议的学生')
        this.$router.back()
        return
      }
      if (!this.list.every(student => student.content.length > 0)) {
        this.$toast('请输入理由或原因')
        return
      }

      this.$loading()
      const content = this.list.map(item => {
        return {
          id: item.id,
          content: item.content
        }
      })
      postFeedback(this.billData.id, content)
        .then(response => {
          if (response.data.meta.success) {
            this.$toast('提交成功')
            this.$router.go(-2)
          }
        })
        .finally(() => { this.$loadingHide() })
    }
  },
  created() {
    if (!this.isBillDataAvailable) {
      this.$router.replace({ name: 'Charge' })
      return
    }

    if (!Array.isArray(this.selectedStudent) || this.selectedStudent.length === 0) {
      this.$toast('请先选择有异议的学生')
      this.$router.back()
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

    this.list = this.selectedStudent.map(student => {
      return Object.assign({ content:'' }, student)
    })
  },
}
</script>

<style scoped lang="less">
.charge-feedback-submit {
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
      color: #84C225;
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
    flex-direction: column;

    &.center {
      justify-content: center;
      align-items: center;
    }

    .info {
      font-size: 0.14rem;
      color: #666;
      line-height: 0.38rem;
      text-align: center;
    }

    .content {
      padding: 0 0.16rem;
      color: #999;
      line-height: 0.28rem;

      .center {
        text-align: center;
      }

      .field {
        padding: 10px 0;
      }
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

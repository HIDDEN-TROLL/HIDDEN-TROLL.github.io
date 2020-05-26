<template>
  <van-dialog
    v-model="show"
    :title="title"
    show-cancel-button
    :before-close="beforeClose">

    <section class="content">
      <van-loading v-if="loadingTeacherCumulativeEnergyScore" class="loading"/>
      <template v-else>
        <p class="info">
          今日已获得能量分
          <strong class="number">{{ teacherEnergyScoreToday }}</strong>
          分
        </p>

        <p class="info">
          本月累计共
          <strong class="number">{{ teacherEnergyScoreCurrentMonth }}</strong>
          分
        </p>
      </template>

      <p class="grade" @click="checkRemainEnergyScore">
        <span>打分</span>
        <van-stepper :value="score" @input="onScoreChange" class="stepper" :disabled="isRemainEnergyScoreEmpty"
                     integer
                     :min="remainEnergyScore > 0 ? 1 : 0" :max="remainEnergyScore" />
      </p>
      <p class="tip">
        若按以上打分，今日将剩余能量分
        <strong class="number">{{ remainEnergyScoreAfterSubmit }}</strong>
        分
      </p>

      <van-field
        class="comment"
        v-model="comment"
        type="textarea"
        placeholder="评分理由（选填）"
        rows="3"
        :disabled="isRemainEnergyScoreEmpty"
        autosize="autosize"/>

    </section>

  </van-dialog>
</template>

<script>
import { getCumulativeEnergyScore } from '@/api/school/teacher-ranking-list'
import { Loading, Stepper, Field } from 'vant'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'grade-dialog',
  components: {
    vanLoading: Loading,
    vanStepper: Stepper,
    vanField: Field,
  },
  data() {
    return {
      show: false,
      teacherId: 0,
      teacherName: '',

      loadingTeacherCumulativeEnergyScore: true,
      teacherEnergyScoreCurrentMonth: 0,
      teacherEnergyScoreToday: 0,

      score: 1,
      comment: '',
    }
  },
  computed: {
    ...mapGetters('teacherRankingList', [
      'remainEnergyScore',
    ]),
    title() {
      return this.teacherName ? `给${this.teacherName}老师评分` : '评分'
    },
    remainEnergyScoreAfterSubmit() {
      if (this.remainEnergyScore > 0) {
        return Math.max(this.remainEnergyScore - this.score, 0)
      }
      return 0
    },
    isRemainEnergyScoreEmpty() {
      return this.remainEnergyScore <= 0
    }
  },

  methods: {
    ...mapActions('teacherRankingList', [
      'postScore',
    ]),
    onScoreChange(score) {
      if (score > this.remainEnergyScore) {
        score = this.remainEnergyScore
      } else if ((score + '').includes('.')) {
        const pieces = (score + '').split('.')
        score = pieces[0]
        score = Number.isInteger(Number.parseInt(score)) ? Number.parseInt(score) : 1
      }
      this.score = score
    },
    start(teacher) {
      const teacherId = teacher.teacherId
      const teacherName = teacher.name

      if (this.teacherId !== teacherId) {
        this.fetchTeacherCumulativeEnergyScore(teacherId)
      }
      this.teacherId = teacherId
      this.teacherName = teacherName
      this.show = true
      if (this.isRemainEnergyScoreEmpty) {
        this.score = 0
        this.$toast('今日剩余能量分为0，将无法进行评分')
      }
    },
    fetchTeacherCumulativeEnergyScore(teacherId) {
      this.loadingTeacherCumulativeEnergyScore = true
      getCumulativeEnergyScore(teacherId)
        .then(response => {
          if (response.data.meta.success) {
            this.teacherEnergyScoreCurrentMonth = response.data.data.energyScoreCurrentMonth
            this.teacherEnergyScoreToday = response.data.data.energyScoreToday
          } else {
            throw new Error()
          }
        })
        .catch(() => {
          this.teacherEnergyScoreCurrentMonth = '获取失败'
          this.teacherEnergyScoreToday = '获取失败'
        })
        .finally(() => {
          this.loadingTeacherCumulativeEnergyScore = false
        })
    },
    beforeClose(action, done) {
      if (action === 'cancel') {
        return done()
      }

      if (this.remainEnergyScore <= 0 || (this.remainEnergyScore - this.score < 0)) {
        this.$toast('您今日剩余的能量分不足，无法进行评分')
        return done(false)
      }

      if (this.score < 1) {
        this.$toast('打分分数不能少于1分')
        return done(false)
      }

      this.$loading('评分中...')
      this.postScore({
        teacherId: this.teacherId,
        score: this.score,
        comment: this.comment,
      })
        .then(result => {
          if (result) {
            this.show = false
            this.teacherId = 0
            this.teacherName = ''
            this.score = 1
            this.comment = ''
            done()
          } else {
            done(false)
          }
        })
        .catch(() => {
          done(false)
        })
        .finally(() => {
          this.$loadingHide()
        })
    },
    checkRemainEnergyScore() {
      if (this.isRemainEnergyScoreEmpty) {
        this.$toast('今日剩余能量分为0，无法进行评分')
      }
    },
  },
}
</script>

<style scoped lang="less">
.content {
  padding: .2rem;
  font-size: 0.16rem;
  color: #333;
  max-height: 60vh;
  overflow: scroll;

  .loading {
    margin: .2rem auto;
  }

  .info {

  }

  .grade {
    display: flex;
    align-items: center;
    margin-top: .2rem;

    span {
      margin-right: .2rem;
    }

    .stepper {
      display: inline-block;
    }
  }

  .tip {
    font-size: .14rem;
    color: #666;
    margin-bottom: .2rem;
  }

  .comment {
    padding: 0;
  }

  .number {
    color: #84C225;
    font-weight: 400;
  }
}

</style>

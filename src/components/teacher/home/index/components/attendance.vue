<template>
  <ul class="attendance">
    <li class="attendance_type" v-for="type in extra" :key="type.id" @click="jump(type)">
      <p class="name">{{ type.name }}</p>
      <div class="wrap clickable">
        <div class="info">
          <span class="student_number">
            <span>未签到</span>
            <br>
            <span class="number">{{ type.notEntryStudentNumber }}</span>
          </span>
          <span class="student_number">
            <span>未签离</span>
            <br>
            <span class="number">{{ type.notExitStudentNumber }}</span>
          </span>
        </div>
        <div class="progress_bar">
          <div class="finished" :style="computeProgressStyle(type)"></div>
        </div>
        <p class="status">{{ type.status === 0 ? '' : '去完成>' }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Attendance',
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: () => [],
      type: Array,
    },
  },
  methods: {
    computeProgressStyle(type) {
      if (type.studentNumber <= 0) {
        return {
          width: '0%'
        }
      }
      const studentNumber = Math.max(type.studentNumber, 1)
      const notSignedStudentNumber = type.status === 2 ? type.notExitStudentNumber : type.notEntryStudentNumber
      const finishedPercentage = 100 - Math.floor(notSignedStudentNumber / studentNumber * 100)
      return {
        width: finishedPercentage + '%'
      }
    },
    jump(type) {
      if (type.status !== 0) {
        this.$router.push({ name: 'UnsignedStatistical' })
      }
    }
  },
}
</script>

<style scoped lang="less">
.attendance {
  margin-bottom: .15rem;
  display: flex;
  flex-wrap: nowrap;
  overflow: scroll;

  .clickable:active {
    background: #eee;
  }
  .attendance_type {
    min-width: 40%;
    margin-right: .12rem;
    display: inline-flex;
    flex-direction: column;

    &:first-child {
      margin-left: .25rem;
    }
    &:last-child {
      padding-right: .25rem;
    }

    .name {
      font-size:0.16rem;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:0.2rem;
      margin: .1rem 0;
      text-align: center;
      flex-shrink: 0;
    }
    .wrap {
      flex-grow: 1;
      box-shadow:0 0.01rem 0.02rem 0 rgba(0,0,0,0.08);
      border-radius:0.03rem;
      border:0.01rem solid rgba(237,237,237,1);
      text-align: center;
      .info {
        margin: .08rem 0;
        white-space: nowrap;
        .student_number {
          width: 50%;
          display: inline-block;
          text-align: center;
          font-size:0.14rem;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:0.2rem;

          &:first-child {
            border-right: .01rem dashed #f1f1f1;
          }
          .number {
            font-size:0.12rem;
            color:rgba(132,194,37,1);
            line-height:0.17rem;
          }
        }
      }
      .progress_bar {
        width:80%;
        margin: .08rem auto;
        height:0.1rem;
        background:rgba(239,239,239,1);
        border-radius:0.02rem;
        .finished {
          height:100%;
          background:rgba(132,194,37,1);
          border-radius:0.02rem;
        }
      }
      .status {
        margin: .08rem 0;
        font-size:0.12rem;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.14rem;
      }
    }
  }
}
</style>

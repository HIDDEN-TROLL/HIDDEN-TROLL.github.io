<template>
  <section class="widget">
    <p class="title">{{ title }}</p>

    <ul class="attendance no-scrollbar">
      <li class="attendance_type" v-for="type in extra" :key="type.id">
        <p class="name">{{ type.name }}</p>
        <div class="wrap clickable" @click="$router.push({ name: 'UnsignedStatistical' })">
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
          <p class="status">查看详情</p>
        </div>
        <p class="bottom">
          <span>共{{ type.studentNumber}}名学生</span>
          <span v-if="type.status !== 2">
            <span class="number">{{ type.notEntryStudentNumber }}</span>人未签到
          </span>
          <span v-else>
            <span class="number">{{ type.notExitStudentNumber }}</span>人未签离
          </span>
        </p>

        <p v-show="isExpand && !loading && getTeacherDetail(type.id).length === 0" class="no_teacher_data">无进度数据</p>
        <div v-show="isExpand" v-for="(teacher, index) in getTeacherDetail(type.id)" :key="index" class="detail">
          <p class="teacher_name">{{ teacher.name }}</p>
          <p class="info">
            <span>共{{ teacher.totalStudentNumber }}名学生</span>
            <span v-if="type.status !== 2">
              <span class="number">{{ teacher.notEntryStudentNumber }}</span>人未签到
            </span>
            <span v-else>
              <span class="number">{{ teacher.notExitStudentNumber }}</span>人未签离
            </span>
          </p>
        </div>

      </li>
    </ul>

    <p class="trigger clickable" @click="isExpand = !isExpand">
      <span>{{ isExpand ? '合起' : '展开' }}教师进度</span>
      <van-icon name="play" :class="{ rotate90: isExpand }" />
      <van-loading v-show="loading" size=".2rem"/>
    </p>
  </section>
</template>

<script>
import { Icon, Loading } from 'vant'
import { getAttendanceWidgetDetail } from '@/api/school/home'

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
  components: {
    vanIcon: Icon,
    vanLoading: Loading,
  },
  data() {
    return {
      isExpand: false,
      loading: false,
      detail: [],
    }
  },
  watch: {
    isExpand() {
      if (this.isExpand === true && this.detail.length === 0) {
        this.loading = true
        getAttendanceWidgetDetail()
          .then(response => {
            if (response.data.meta.success) {
              this.detail = response.data.data
            }
          })
          .finally(() => {
            this.loading = false
          })
      }
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
    getTeacherDetail(id) {
      const detail = this.detail.find(item => item.id === id)
      return detail ? detail.teachers : []
    },
  },
}
</script>

<style scoped lang="less">
.widget {
  border-bottom: .1rem solid #F3F7F8;

  .clickable:active {
    background: #eee;
  }

  & > .title {
    margin-top: .15rem;
    margin-left: .15rem;
    font-weight: bold;
    color: #333;
    line-height: 0.22rem;
    position: relative;
    padding: 0 .12rem;
    margin-bottom: .04rem;
    font-size:0.16rem;
    display: flex;
    justify-content: space-between;
    &:before {
      content: '';
      width: 0.02rem;
      height: 0.16rem;
      background-color: #3770FB;
      border-radius: 10px;
      position: absolute;
      left: 0;
      margin-top: 0.03rem;
    }
  }

  .attendance {
    margin-bottom: .15rem;
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;

    .attendance_type {
      min-width: 40%;
      margin-left: .12rem;
      padding-right: .12rem;
      display: inline-flex;
      flex-direction: column;

      &:not(:last-child) {
        border-right: .01rem solid #eee;
      }
      &:first-child {
        margin-left: .25rem;
      }
      &:last-child {
        padding-right: .25rem;
      }

      .name {
        font-size:0.14rem;
        font-weight:bold;
        color:rgba(51,51,51,1);
        line-height:0.2rem;
        margin: .1rem 0;
        text-align: center;
        flex-shrink: 0;
      }
      .wrap {
        /*flex-grow: 1;*/
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
      .bottom {
        display: flex;
        justify-content: space-between;
        font-size:0.12rem;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.17rem;
        padding: 0 .01rem;
        margin: .08rem 0;
        .number {
          color: #3770FB;
        }
      }

      .no_teacher_data {
        text-align: center;
        font-size: 0.12rem;
        font-weight: 400;
        color: #999999;
        line-height: 0.17rem;
        margin: .2rem 0;
      }
      .detail {
        font-weight:400;
        margin: .08rem 0;
        .teacher_name {
          font-size:0.14rem;
          color:rgba(102,102,102,1);
          line-height:0.2rem;
        }
        .info {
          font-size:0.12rem;
          color:rgba(153,153,153,1);
          line-height:0.17rem;
          display: flex;
          justify-content: space-between;
          padding: 0 .01rem;
        }
        .number {
          color: #3770FB;
        }
      }
    }
  }

  .trigger {
    text-align: center;
    font-size:0.12rem;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:0.17rem;
    padding: 0.1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .rotate90 {
      transform: rotate(-90deg);
    }
  }
}

</style>

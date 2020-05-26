<template>
  <div class="evaluation_select_student" :class="{ fullscreen: isFullscreenSelectStudent }">

    <loading v-if="loading" class="loading" size="40px"/>

    <template v-else>
      <more-tabs class="scrollable" v-model="tabIndex" :list="classNameList" :badge-list="tabBadgeList"/>

      <p class="top">
        <span class="toggle" @click="toggleFullscreenSelectStudent">
          <van-switch
            size="20px"
            active-color="#07c160"
            inactive-color="white"
            :value="isFullscreenSelectStudent" />
          <span class="label">{{ isFullscreenSelectStudent ? '切换半屏' : '切换全屏' }}</span>
        </span>
        <span class="toggle" @click="toggleShowGradeName">
          <van-switch
            size="20px"
            active-color="#07c160"
            inactive-color="white"
            :value="isShowGradeName" />
          <span class="label">{{ isShowGradeName ? '隐藏年级' : '显示年级' }}</span>
        </span>
      </p>

      <p v-if="isEmpty(currentClassStudentList)" class="no_data">该班级没有学生</p>

      <section class="student-list">
        <span
          v-for="item in currentClassStudentList"
          :key="item.studentId"
          class="wrap">
          <button
            class="student"
            :class="{ selected: selectedStudentIdList.includes(item.studentId) }"
            @click="selectStudentEvent(item)">
            <span class="ellipsis">{{ item.studentName }}</span>
            <span v-show="isShowGradeName" class="ellipsis">{{ item.gradeName }}</span>
            <span v-show="currentCommentType === 0 && item.rewardNum > 0" class="badge reward" :class="{ small: item.rewardNum > 99 }">{{ item.rewardNum > 99 ? '99+' : `+${item.rewardNum}` }}</span>
            <span v-show="currentCommentType === 1 && item.deductNum > 0" class="badge deduct" :class="{ small: item.deductNum > 99 }">{{ item.deductNum > 99 ? '99-' : `-${item.deductNum}` }}</span>
          </button>
        </span>
      </section>
      <!--<student-paginate-->
        <!--v-for="(studentList, index) in studentList2dArray"-->
        <!--:key="index"-->
        <!--:index="index"-->
        <!--v-show="tabIndex === index"-->
        <!--:show="tabIndex === index"-->
        <!--:student-list="studentList" />-->
    </template>

  </div>
</template>
<script>
import { Loading, Switch } from 'vant'
import moreTabs from '@/components/common/more-tabs.vue'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { isEmpty } from '@/utils'

const tabBadgeDotConfig = {
  style: {
    'width': '8px',
    'height': '8px',
    'display': 'block',
    'background': '#999',
    'position': 'absolute',
    'right': '-5px',
    'top': '8px',
    'border-radius': '50%',
    'border': '1px solid #666',
  },
  text: '',
}

export default {
  name: 'evaluation_select_student',
  data() {
    return {
      loading: true,

      tabIndex: 0,
      tabBadgeList: [],
    }
  },
  components: {
    Loading,
    vanSwitch: Switch,
    moreTabs,
  },
  computed: {
    ...mapState('evaluation', [
      'classIdList',
      'classNameList',
      'studentList2dArray',

      'isShowGradeName',
      'isFullscreenSelectStudent',
      'currentCommentType',
    ]),
    ...mapGetters('evaluation', [
      'selectedStudentNumbers',
      'selectedClassIdList',

      'selectedStudentIdList',
    ]),

    currentClassStudentList() {
      return Array.isArray(this.studentList2dArray[this.tabIndex]) ? this.studentList2dArray[this.tabIndex] : []
    },
  },
  watch: {
    selectedStudentNumbers() {
      this.tabBadgeList = this.classIdList.map(clsId => {
        return this.selectedClassIdList.includes(clsId) ? tabBadgeDotConfig : undefined
      })
    },
  },
  created() {
    this.loading = true
    this.fetchStudentList(undefined)
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    ...mapMutations('evaluation', [
      'toggleShowGradeName',
      'toggleFullscreenSelectStudent',
      'selectStudent',
      'unselectStudent',
    ]),
    ...mapActions('evaluation', [
      'fetchStudentList',
    ]),

    selectStudentEvent(student) {
      const studentId = parseInt(student.studentId)
      if (isEmpty(studentId)) {
        this.$toast('发生异常, 学生ID为空')
        return
      }
      if (!this.selectedStudentIdList.includes(studentId)) {
        this.selectStudent([this.tabIndex, studentId])
      } else {
        this.unselectStudent(studentId)
      }
    },
  }
}
</script>
<style scoped lang="less">
.evaluation_select_student {
  min-height: 10vh;
  /*max-height: 30vh;*/
  background-color: #fff;
  margin-bottom: .12rem;
  flex-shrink: 0;

  &.fullscreen {
    flex-grow: 1;
    margin-bottom: 0;

    .student-list {
      max-height: unset;
    }
  }

  .loading {
    padding: .4rem 0;
    margin: 0 auto;
  }

  .top {
    display: flex;
    justify-content: space-between;
    margin: .08rem 0;
    flex-shrink: 0;
    font-size: .14rem;

    .toggle {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: #666666;
      margin: 0 .1rem;

      .label {
        margin-left: .1rem;
      }
    }
  }

  .no_data {
    padding: .4rem 0;
    text-align: center;
    font-size: .16rem;
  }

  .student-list {
    display: flex;
    flex-wrap: wrap;
    max-height: 30vh;
    overflow: scroll;
    padding-top: 0.1rem;

    background:
      linear-gradient(white 30%, rgba(255,255,255,0)),
      linear-gradient(rgba(255,255,255,0), white 70%) 0 100%,
      radial-gradient(50% 0, farthest-side, rgba(0,0,0,.2), rgba(0,0,0,0)),
      radial-gradient(50% 100%,farthest-side, rgba(0,0,0,.2), rgba(0,0,0,0)) 0 100%;
    background:
      linear-gradient(white 30%, rgba(255,255,255,0)),
      linear-gradient(rgba(255,255,255,0), white 70%) 0 100%,
      radial-gradient(farthest-side at 50% 0, rgba(0,0,0,.2), rgba(0,0,0,0)),
      radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,.2), rgba(0,0,0,0)) 0 100%;
    background-repeat: no-repeat;
    background-color: white;
    background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;
    background-attachment: local, local, scroll, scroll;

    .wrap {
      width: 33.3%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }

    .student {
      width: 100%;
      margin: .08rem;

      font-size: .16rem;
      border-radius: 4px;
      text-align: center;
      position: relative;
      color: #3770fb;
      border: 1px solid #3770fb;
      background-color: #fff;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      min-height: .3rem;

      & > span {
        display: block;
      }

      & > .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 22vw;
      }

      &.selected {
        color: #fff;
        background-color: #3770fb;
      }

      .badge {
        background: #d80000;
        color: #fff;
        position: absolute;
        border-radius: 50%;
        top: -0.12rem;
        right: -0.08rem;
        min-width: .25rem;
        min-height: .25rem;
        line-height: .25rem;
        font-size: .14rem;

        &.small {
          font-size: .12rem;
        }
        &.reward {
          /*background: #3770fb;*/
        }
      }
    }
  }

}
</style>

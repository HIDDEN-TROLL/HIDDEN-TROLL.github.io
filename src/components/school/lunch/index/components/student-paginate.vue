<template>
  <div class="lunch_student_paginate">
    <p class="top">
      <span class="toggle_show_grade_name" @click="toggleShowGradeName">
        <van-switch
          size="20px"
          active-color="#07c160"
          inactive-color="white"
          :value="isShowGradeName" />
        <span class="label">{{ isShowGradeName ? '隐藏年级' : '显示年级' }}</span>
      </span>
    </p>

    <p v-if="isEmpty(studentList)" class="no_data" >该班级没有学生</p>

    <div class="pages"
      ref="pages"
      :style="{ width: `${pageCount + 1}00vw`, transform: `translate(-${currPage-1}00vw)` }"
      @click="selectStudentEvent">
      <div class="page" v-for="(page, index1) in renderArray" :key="index1">
        <span class="item" v-for="(item, index2) in page" :key="index2">
          <button
            class="button"
            :class="{ selected: selectedStudentId === item.studentId }"
            :data-student_id="item.studentId">
            <span>{{ item.studentName }}</span>
            <span v-show="isShowGradeName">{{ item.gradeName }}</span>
            <span v-if="item.isSave" class="badge"></span>
          </button>
        </span>
      </div>
    </div>

    <div v-if="pageCount > 1" class="indicators">
      <i v-for="pageIndex in pageCount" :key="pageIndex" class="indicator" :class="{ active: pageIndex === currPage}" ></i>
    </div>
  </div>
</template>
<script>
import { isEmpty } from '@/utils'
import { addTouchDirectionEvent, removeTouchDirectionEvent } from '@/utils/touch-event'
import { Switch } from 'vant'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'lunch_student_paginate',
  props: {
    index: {
      type: Number,
      default: 0,
    },
    show: {
      type: Boolean,
      default: false,
    },
    studentList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isInit: false,
      currPage: 1,
      pageCount: 1,
      itemPrePage: 9,
      renderArray: [],

      touchEventHandle: undefined,
    }
  },
  components: {
    vanSwitch: Switch,
  },
  computed: {
    ...mapState('lunch', [
      'isShowGradeName',
      'selectedStudent',
    ]),
    selectedStudentId() {
      if (this.selectedStudent) {
        return this.selectedStudent.studentId
      }
      return 0
    },

  },
  watch: {
    show() {
      this.init()
    },
    studentList() {
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapMutations('lunch', [
      'toggleShowGradeName',
      'selectStudent',
    ]),
    init() {
      if (!this.show || this.isInit) {
        return
      }
      this.isInit = true

      this.currPage = 1
      this.pageCount = 1
      this.renderArray = []
      this.initData(this.studentList)
    },
    initData(studentList) {
      if (this.renderArray.length > 0) {
        return
      }
      let renderArray = []
      let itemPrePage = this.itemPrePage
      let pageCount = Math.ceil(studentList.length / itemPrePage)
      for (let i = 0; i < pageCount; i++) {
        renderArray.push(studentList.slice(i * itemPrePage, (i + 1) * itemPrePage))
      }

      this.pageCount = renderArray.length
      this.renderArray = renderArray
      this.initTouchEvent()
    },
    initTouchEvent() {
      if (this.pageCount <= 1) {
        return
      }
      let el = this.$refs['pages']
      if (this.touchEventHandle !== undefined) {
        removeTouchDirectionEvent(el, this.touchEventHandle)
      }
      this.touchEventHandle = addTouchDirectionEvent(el, {
        left: this.nextPage,
        right: this.prevPage,
      })
    },
    prevPage() {
      if (this.currPage > 1) {
        this.currPage -= 1
      } else {
        this.currPage = 1
      }
    },
    nextPage() {
      if (this.currPage < this.pageCount) {
        this.currPage += 1
      } else {
        this.currPage = this.pageCount
      }
    },
    selectStudentEvent(event) {
      let target = event.target
      if (target.nodeName.toLowerCase() !== 'button') {
        if (target.parentNode.nodeName.toLowerCase() === 'button') {
          target = target.parentNode
        } else {
          return
        }
      }

      const studentId = parseInt(target.dataset['student_id'])
      if (isEmpty(studentId)) {
        this.$toast('发生异常, 学生ID为空')
        return
      }
      this.selectStudent([this.index, studentId])
    }
  },
}
</script>
<style scoped lang="less">
.lunch_student_paginate {
  /*height: 100%;*/
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-size: .16rem;

  .top {
    text-align: right;
    margin: .08rem 0;
    flex-shrink: 0;

    .toggle_show_grade_name {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: #666666;

      .label {
        margin: 0 .1rem;
      }
    }
  }

  .no_data {
    padding: .4rem 0;
    text-align: center;
    font-size: .16rem;
  }

  .pages {
    transition: .6s;
    min-width: 100vw;
    flex-grow: 1;

    .page {
      width: 100vw;
      height: 100%;
      display: inline-flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;

      .item {
        width: 33.3%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        max-height: 1rem;
        height: .7rem;

        .button {
          width: 100%;
          margin: .08rem;
        }
      }
    }
  }

  .indicators {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    height: .2rem;

    .indicator {
      border-radius: 100%;
      opacity: 0.3;
      width: 6px;
      height: 6px;
      background-color: #d8d8d8;
      transition: opacity 0.2s;

      &:not(:last-child) {
        margin-right: 6px;
      }

      &.active {
        opacity: 1;
        background-color: #3770fb;
      }
    }
  }
}

.button {
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
  padding: .02rem 0;

  & > span {
    display: block;
  }

  &.selected {
    color: #fff;
    background-color: #3770fb;
  }

  .badge {
    background: #d80000;
    position: absolute;
    border-radius: 50%;
    top: -0.02rem;
    right: -0.02rem;
    min-width: 0.12rem;
    min-height: 0.12rem;
  }
}
</style>

<template>
  <section class="teacher_achievement_history">

    <van-nav-bar
      class="header"
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"/>

    <div class="content">

      <div class="control">
        <p class="score_type_filter">
          <span class="clickable" @click="isScoreTypeActionSheetShow = true">
            {{ currentScoreTypeText }}<van-icon class="icon" name="exchange"/>
          </span>
        </p>
        <p class="date_filter">
          <datepicker :value="date" textFormat="Y年m月" @change="onDateChange"/>
        </p>
        <p class="score">
          目前总绩效分：{{ totalScore }}分
        </p>
      </div>

      <van-list
        v-model="loading"
        class="list"
        :finished="finished"
        finished-text="没有更多了"
        @load="fetchNextPage">

        <div v-for="item in history" :key="item.time" class="list_item">
          <p class="title">{{ item.typeText }}</p>
          <div class="body">
            <div class="left">
              <p class="date">
                <span>{{ item.dateText }}</span>
                <span>{{ item.weekText }}</span>
                <span>{{ item.timeText }}</span>
              </p>
              <p class="text">{{ item.desc ? item.desc : '无内容' }}</p>
            </div>
            <div class="right score">
              {{ item.score >= 0 ? '+' + item.score : item.score }}
            </div>
          </div>
        </div>
      </van-list>

    </div>


    <van-action-sheet
      class="action_sheet"
      v-model="isScoreTypeActionSheetShow"
      :actions="actionSheetActions"
      get-container="#app"
      cancel-text="取消"
      @select="onActionSheetSelect"/>

  </section>
</template>

<script>
import { NavBar, Icon, Actionsheet, List } from 'vant'
import datepicker from '@/components/common/datepicker'
import { date as PHPFunctionDate } from '@/utils'
import { getAchievementHistory } from '@/api/teacher/achievement'
import axios from 'axios'

let fetchRequestCancelTokenSource = null

export default {
  name: 'TeacherAchievementHistory',
  components: {
    vanNavBar: NavBar,
    vanActionSheet: Actionsheet,
    vanList: List,
    vanIcon: Icon,
    datepicker,
  },
  data() {
    return {
      scoreTypeOptions: [
        {
          name: '全部得分类型', value: 0,
        },
        {
          name: '岗位得分', value: 1,
        },
        {
          name: '能量得分', value: 2,
        },
        {
          name: '评教得分', value: 3,
        },
      ],
      isScoreTypeActionSheetShow: false,
      currentScoreType: 0,

      date: new Date(),

      totalScore: 0,

      loading: false,
      finished: false,
      history: [],
      currentPage: 0,
    }
  },
  computed: {
    actionSheetActions() {
      return this.scoreTypeOptions.map((item) => {
        item.className = item.value === this.currentScoreType ? 'active' : 'non-active'
        return item
      })
    },
    currentScoreTypeText() {
      const option = this.scoreTypeOptions.find(option => option.value === this.currentScoreType)
      return option ? option.name : ''
    },
  },
  methods: {
    onDateChange(date) {
      this.date = date
      this.fetchFirstPage()
    },
    onActionSheetSelect(option) {
      this.isScoreTypeActionSheetShow = false
      this.currentScoreType = option.value
      this.fetchFirstPage()
    },
    fetchFirstPage() {
      this.currentPage = 0
      this.history = []
      if (fetchRequestCancelTokenSource !== null) {
        fetchRequestCancelTokenSource.cancel('cancel')
      }
      this.fetchNextPage()
    },
    fetchNextPage() {
      // 如果上一个接口正在加载中
      if (fetchRequestCancelTokenSource !== null) {
        return
      }

      fetchRequestCancelTokenSource = axios.CancelToken.source()

      this.loading = true
      this.finished = false
      getAchievementHistory(fetchRequestCancelTokenSource, {
        type: this.currentScoreType,
        date: PHPFunctionDate('Y-m', this.date),
        page: ++this.currentPage,
      })
        .then(response => {
          if (response.data.meta.success) {
            const data = response.data.data
            this.totalScore = data.totalScore
            this.history.push(...this.processData(data.history))
            this.currentPage = data.paginate.currentPage
            this.finished = data.paginate.currentPage >= data.paginate.totalPage
          }
        })
        .then(() => {
          this.loading = false
        })
        .catch(e => {
          if (!e || e.message !== 'cancel') {
            this.loading = false
            console.error(e)
            this.$toast('发生错误')
          }
        })
        .finally(() => {
          fetchRequestCancelTokenSource = null
        })
    },
    processData(history) {
      const weekTexts = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      const typeTexts = ['其他', '岗位分', '能量分', '评教分']

      return history.map(item => {
        const date = new Date(item.time * 1000)
        item.dateText = PHPFunctionDate('m月d日', date)
        item.weekText = weekTexts[date.getDay()]
        item.timeText = PHPFunctionDate('H:i', date)

        item.typeText = typeTexts[item.type] ? typeTexts[item.type] : typeTexts[0]
        return item
      })
    },
  },
}
</script>

<style scoped lang="less">
.teacher_achievement_history {
  font-size: .16rem;
  background-color: #fff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .header {
    flex-shrink: 0;
  }

  .content {
    flex-grow: 1;
    overflow: scroll;
    display: flex;
    flex-direction: column;

    .control {
      font-size: 0.14rem;
      font-weight: 400;
      line-height: 0.2rem;
      border-bottom: .1rem solid #F3F7F8;
      padding-top: .13rem;
      padding-bottom: .06rem;
      padding-left: .2rem;

      .score_type_filter {
        margin: .1rem 0;
        color: rgba(51, 51, 51, 1);

        .clickable {
          &:active {
            background-color: #eee;
          }

          .icon {
            color: #BAB9B9;
            margin-left: .05rem;
            transform: rotate(90deg);
          }
        }
      }

      .date_filter, .score {
        margin: .1rem 0;
        color: rgba(102, 102, 102, 1);
      }

      .date_filter {
        /deep/ .date {
          height: auto;
          text-align: left;
          line-height: 1;
          background: transparent;

          .left, .right {
            display: none;
          }

          .center {
            margin: 0;

            .icon {
              color: #BAB9B9;
              margin-left: .05rem;
            }
          }
        }

      }
    }

    .list {
      .list_item {
        margin: 0 .16rem;
        border-bottom: .02rem solid #eee;

        .title {
          color: #333;
          position: relative;
          padding-left: .12rem;
          padding-top: .08rem;
          font-size: .14rem;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 0.2rem;

          &:before {
            content: '';
            width: 0.02rem;
            height: 0.16rem;
            background-color: #3770FB;
            border-radius: 10px;
            position: absolute;
            left: 0;
            margin-top: .03rem;
          }
        }

        .body {
          padding: .12rem .15rem .15rem .1rem;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;

          .left {
            flex-grow: 1;

            .date {
              font-size: 0.12rem;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              line-height: 0.17rem;
              margin-bottom: .06rem;

              span {
                margin-right: .1rem;
              }
            }

            .text {
              font-size: 0.14rem;
              color: rgba(51, 51, 51, 1);
              line-height: 0.17rem;
              word-wrap: break-word;
              word-break: break-all;
            }
          }

          .right {
            flex-shrink: 0;
          }

          .score {
            font-size: 0.2rem;
            font-weight: 400;
            color: rgba(216, 0, 0, 1);
            line-height: 0.28rem;
          }
        }
      }
    }
  }
}

.action_sheet {
  .active {
    color: #fff;
    background: #3770fb;
  }
}
</style>

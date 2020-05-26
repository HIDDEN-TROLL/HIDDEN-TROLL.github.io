<template>
  <div class="parent_score_task">
    <van-nav-bar
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="$router.back()" />

    <van-loading v-if="loading" class="loading" size="40px" />

    <div v-else class="content">
      <div class="base_info">
        <p>我的家长积分</p>
        <p class="score">{{ totalScore }}</p>
        <p>
          今日已获得
          <span class="score">{{ todayScore }}</span>
          分
        </p>
      </div>

      <div class="task_list">
        <div v-for="(taskGroup, index) in taskList" :key="index" class="task_group">
          <p class="title">{{ taskGroup.title }}</p>
          <div v-for="(task, index2) in taskGroup.list" :key="index2" class="task">
            <div class="left">
              <p v-show="!isEmpty(task.title)" class="title">
                <span class="title">{{ task.title }}</span>
                <span v-if="!task.isFinished && !isEmpty(task.action)" class="action" @click="handleAction(task)">
                  {{ task.actionText }}<van-icon class="icon" name="arrow" />
                </span>
              </p>
              <p class="desc">{{ task.desc }}</p>
            </div>
            <div class="right">
              <span class="worth">+{{ task.worth }}</span>
              <span v-if="task.isFinished" class="status finished">已完成</span>
              <span v-else class="status unfinished">未完成</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { NavBar, Loading, Icon } from 'vant';
import { getParentScoreTask } from '@/api/parent/home'
import { handleRouteTarget } from '@/utils'

export default {
  name: 'parent_score_task',
  components: {
    vanNavBar: NavBar,
    vanLoading: Loading,
    vanIcon: Icon,
  },
  data() {
    return {
      loading: true,
      totalScore: 0,
      todayScore: 0,
      taskList: [],
    }
  },
  async created() {
    this.loading = true
    const response = await getParentScoreTask()
    if (response.data.meta.success) {
      this.totalScore = response.data.data.totalScore
      this.todayScore = response.data.data.todayScore
      this.taskList = response.data.data.list
    }
    this.loading = false
  },
  methods: {
    handleAction(task) {
      handleRouteTarget(this.$router, task.action, false)
    },
  }
}
</script>

<style scoped lang="less">
.parent_score_task {
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #fff;

  .loading {
    margin: .2rem auto;
  }

  .content {
    flex-grow: 1;
    overflow: scroll;

    .base_info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-bottom: 0.1rem solid #F3F7F8;
      padding: .2rem 0;

      .score {
        color:#D80000;
      }
      p {
        font-size:0.14rem;
        font-weight:400;
        color:#666;
        line-height:0.2rem;

        &:not(:last-of-type) {
          margin-bottom: .1rem;
        }
        &.score {
          font-size:0.26rem;
          font-weight:500;
          line-height:0.37rem;
        }
      }
    }

    .task_list {
      padding: .2rem .16rem;

      .task_group {
        & > .title {
          padding-left: 0.07rem;
          font-weight: 600;
          color: #333;
          line-height: 0.2rem;
          position: relative;
          font-size:0.14rem;

          &:before {
            content: '';
            width: 0.02rem;
            height: 0.14rem;
            background-color: #3770FB;
            border-radius: 10px;
            position: absolute;
            left: 0;
            margin-top: 0.03rem;
          }
        }
        & > .task {
          display: flex;
          align-items: center;
          margin-left: .09rem;
          padding: .12rem 0;

          &:not(:last-of-type) {
            border-bottom: 0.02rem dashed #eee;
          }

          .left{
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-grow: 1;
            & > .title {
              font-size:0.14rem;
              .title {
                font-size:0.14rem;
                color:#333;
                line-height:0.17rem;
              }
              .action {
                font-size:0.12rem;
                font-weight:400;
                color:#999;
                line-height:0.17rem;
                margin-left: .2rem;
                .icon {
                  line-height: 0.17rem;
                  vertical-align: text-top;
                }
              }
            }
            & > .desc {
              font-size:0.12rem;
              font-weight:400;
              color:#666;
              line-height:0.17rem;
            }
          }
          .right{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex-shrink: 1;
            .worth {
              font-size:0.2rem;
              font-weight:400;
              color:#D80000;
              line-height:0.28rem;
            }
            .status {
              padding: .02rem .08rem;
              border-radius:0.03rem;
              color: #fff;
              font-size:0.12rem;
              &.finished {
                background:#D80000;
              }
              &.unfinished {
                background:#999;
              }
            }
          }
        }
      }
    }
  }
}
</style>

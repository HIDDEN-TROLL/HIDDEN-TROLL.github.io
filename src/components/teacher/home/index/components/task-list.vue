<template>
  <ul class="task_list">
    <li class="task" :class="{ no_title: !task.title }" v-for="(task, index) in extra" :key="index">
      <p v-if="task.title" class="title">
        <span>{{ task.title }}</span>
        <span v-if="task.action || task.actionText" class="clickable action" @click="handleJump(task)">{{ task.actionText ? task.actionText : (task.isFinished ? '已完成 &gt;' : '去完成 &gt;') }}</span>
      </p>
      <div class="content">
        <div v-if="task.progress" class="left">
          <p v-if="task.progress.info" v-html="getTaskProgressInfoHtml(task)" class="info"></p>
          <div class="progress_bar">
            <div class="finished" :style="computeProgressStyle(task)"></div>
          </div>
          <p class="progress_info">
            <span>应完成{{ task.progress.totalProgress }}人</span>
            <span>实际完成{{ task.progress.finishedProgress >= 0 ? task.progress.finishedProgress : 0 }}人</span>
            <span>{{ task.progress.totalProgress - (task.progress.finishedProgress >= 0 ? task.progress.finishedProgress : 0) }}人未完成</span>
          </p>
        </div>
        <div class="right">
          <p v-html="getTaskDescHtml(task)" :class="{ full: !task.progress }" class="desc"></p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { handleRouteTarget } from '@/utils'

export default {
  name: 'TaskList',
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
    computeProgressStyle(task) {
      const finishedProgress = task.progress.finishedProgressOfCurrentTeacher >= 0 ? task.progress.finishedProgressOfCurrentTeacher : task.progress.finishedProgress
      const totalProgress = Math.max(task.progress.totalProgress, 1)
      const finishedPercentage = Math.floor(finishedProgress / totalProgress * 100)
      return {
        width: finishedPercentage + '%'
      }
    },
    handleJump(task) {
      // 对作业流程的任务进行特殊处理
      if (task.action === 'HomeworkProcess' && typeof task.actionText === 'string' && task.actionText.includes('去开始')) {
        this.$dialog.confirm({
          title: '提示',
          message: '开始后无法中途停止和退出',
        }).then(() => {
            handleRouteTarget(this.$router, task.action)
          })
        return
      }

      if (task.action) {
        handleRouteTarget(this.$router, task.action)
      }
    },
    getTaskProgressInfoHtml(task) {
      if (!task.progress || !task.progress.info) {
        return ''
      }

      if (task.score > 0 && !task.disableHtml) {
        let temp = `+${task.score}分`
        let html = `<span style="color: #d80000">${temp}</span>`
        let text = task.progress.info
        if (text.includes(temp)){
          return text.replace(temp, html)
        }
      }

      return task.progress.info
    },
    getTaskDescHtml(task) {
      if (!task.progress && task.score > 0 && !task.disableHtml) {
        let temp = `+${task.score}分`
        let html = `<span style="color: #d80000">${temp}</span>`
        let text = task.desc
        if (text.includes(temp)){
          return text.replace(temp, html)
        }
      }
      return task.desc
    },
  },
}
</script>

<style scoped lang="less">
.task_list {

  .clickable:active {
    background: #eee;
  }

  .task {
    padding: .12rem .15rem;
    border-bottom: .1rem solid #F3F7F8;

    &.no_title {
      margin-top: .12rem;
      padding-left: .25rem;
      .content {
        margin-left: 0;
        .right {
          flex-direction: row;
          .score {
            margin-bottom: 0;
            margin-right: .1rem;
          }
        }
      }
    }

    .title {
      font-weight: 500;
      color: #333;
      line-height: 0.2rem;
      position: relative;
      padding: 0 .12rem;
      margin-bottom: .04rem;
      font-size: .14rem;
      display: flex;
      justify-content: space-between;
      span:first-child:before {
        content: '';
        width: 0.02rem;
        height: 0.14rem;
        background-color: #3770FB;
        border-radius: 10px;
        position: absolute;
        left: 0;
        margin-top: 0.03rem;
      }
      .action {
        font-size:0.14rem;
        font-weight:400;
        color:#84c225;
        line-height:0.17rem;
      }
    }

    .content {
      margin-left: .15rem;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

      .left {
        flex-grow: 1;
        font-size:0.12rem;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.17rem;
        .info {
          margin: .08rem 0;
          color: #3770FB;
        }
        .progress_bar {
          width:80%;
          margin: .08rem 0;
          height:0.1rem;
          background:rgba(239,239,239,1);
          border-radius:0.02rem;
          .finished {
            height:100%;
            background:#3770FB;
            border-radius:0.02rem;
          }
        }
        .progress_info {
          width: 80%;
          margin: .08rem 0;
          display: flex;
          justify-content: space-between;
        }
      }
      .right {
        flex-shrink: 0;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .desc {
          margin: .08rem 0;
          font-size:0.12rem;
          max-width: 20vw;

          &.full {
            max-width: none;
          }
        }
      }
    }


  }
}
</style>

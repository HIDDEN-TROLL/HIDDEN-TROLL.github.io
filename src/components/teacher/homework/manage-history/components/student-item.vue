<template>
  <div class="homework_history_student_item" :class="{ expand: isExpand }">

    <div class="base_info" @click="isExpand = !isExpand">
      <div class="left">
        <span class="student_name">{{ data.stuName }}</span>
        <span class="grade_name">{{ data.gradeName }}</span>
      </div>

      <span class="center">{{ data.workInfo.isSendNotice ? '通知接送' : '未通知接送' }}</span>

      <span class="right">
        查看详情
        <van-icon class="icon" name="play"/>
      </span>
    </div>

    <div class="detail_info" v-show="isExpand">

      <div v-for="(key, index) in subjects" :key="index" class="subject">
        <p class="title">
          <span class="subject_name">{{ subjectNames[index] }}</span>
          <span v-if="workInfo[key].isFulfil" class="status finished">完成</span>
          <span v-else class="status unfinished">未完成</span>
        </p>
        <div v-if="!isEmpty(workInfo[key].imageUrl)" class="image_list" @click="handlePreviewImage">
          <img
            v-for="(url, index) in workInfo[key].imageUrl"
            :key="index"
            :src="url"
            :data-subject_key="key"
            :data-image_index="index"
            class="image"
            alt="image"/>
        </div>
        <p v-if="!isEmpty(workInfo[key].content)" class="subject_content">
          <span class="label">作业详情内容：</span>
          <span class="text">{{ workInfo[key].content }}</span>
        </p>
      </div>

      <p class="discipline">
        <span class="left">作业表现</span>
        <span class="comment">{{ workInfo.workBehavior.comment }}</span>
        <span class="number">
          <icon class="icon" name="icon-honghua" color="#d80000" />
          {{ workInfo.workBehavior.number }}分
        </span>
      </p>


      <p v-if="!isEmpty(workInfo.voiceUrl)" class="voice">
        <span class="left">语音评价</span>
        <voice-record :value="workInfo.voiceUrl" only-play/>
      </p>
    </div>

  </div>
</template>
<script>
import { previewImage } from '@/utils'
import { Icon } from 'vant'
import icon from '@/components/common/icon.vue'
import voiceRecord from '@/components/common/voice-record'

export default {
  name: 'TeacherHomeworkManageHistoryStudentItem',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    icon,
    voiceRecord,
    vanIcon: Icon,
  },
  data() {
    return {
      isExpand: false,
      subjects: ['language', 'math', 'english'],
      subjectNames: ['语文', '数学', '英语'],
    }
  },
  computed: {
    workInfo() {
      return this.data ? this.data.workInfo : {}
    },
  },
  watch: {},
  methods: {
    handlePreviewImage(event) {
      let target = event.target
      if (!target.nodeName || target.nodeName.toLowerCase() !== 'img') {
        return
      }

      const subject_key = target.dataset['subject_key']
      const image_index = parseInt(target.dataset['image_index'])
      previewImage(this.workInfo[subject_key].imageUrl, Number.isInteger(image_index) ? image_index : 0)
    },
  },
}
</script>
<style scoped lang="less">
.homework_history_student_item {
  margin: 0 .1rem;
  font-size: .16rem;

  &:not(:last-child) {
    border-bottom: 0.01rem solid #ccc;
  }

  span {
    font-size: 0.16rem;
    font-weight: 400;
    color: #666;
    line-height: 0.24rem;
  }

  &.expand {
    .base_info {
      border-bottom: 0.01rem dashed #eee;

      .right {
        .icon {
          transform: rotate(90deg);
        }
      }
    }
  }

  .base_info {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .1rem 0;

    &:active {
      background-color: #eee;
    }

    .left, .center, .right {
      width: 33.3%;
      display: inline-block;
      text-align: center;
    }

    .left {
      display: inline-flex;
      flex-direction: column;

      .student_name {
        color: #666;
      }

      .grade_name {
        color: #999;
      }
    }

    .right {
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
  }

  .detail_info {
    margin: .2rem;

    .subject {
      padding-bottom: .2rem;

      &:not(:first-child) {
        padding-top: .2rem;
      }
      &:not(:last-of-type) {
        border-bottom: 0.01rem dashed #eee;
      }

      .title {
        .subject_name {
          color: #333;
        }
        .status {
          font-size: 0.14rem;
          line-height: 0.2rem;
          margin-left: .2rem;
          &.finished {
            color: #84C225;
          }
          &.unfinished {
            color: #d80000;
          }
        }
      }
      .image_list {
        overflow-x: scroll;
        display: flex;
        flex-wrap: nowrap;
        background: linear-gradient(90deg, white 0%, rgba(255, 255, 255, 0)), linear-gradient(-90deg, white 0%, rgba(255, 255, 255, 0)) 100% 0, radial-gradient(farthest-side at 0% 50%, rgba(0, 0, 0, .4), rgba(0, 0, 0, 0)), radial-gradient(farthest-side at 100% 50%, rgba(0, 0, 0, .4), rgba(0, 0, 0, 0)) 100% 0%;
        background-repeat: no-repeat;
        background-size: 100px 100%, 100px 100%, 14px 100%, 14px 100%;
        background-attachment: local, local, scroll, scroll;
        padding-top: .2rem;

        .image {
          width: .5rem;
          height: .5rem;
          flex-shrink: 0;
          object-fit: cover;

          &:not(:last-child) {
            margin-right: .15rem;
          }
        }
      }
      .subject_content {
        padding-top: 0.2rem;
        font-size: .14rem;
        word-wrap:break-word;
        word-break:break-all;
        .label {
          color: #999;
        }
        .text {
          white-space: pre-line;
        }
      }
    }

    .discipline {
      margin: .1rem 0;

      span:not(:last-child) {
        margin-right: .2rem;
      }

      .left {
        height: 0.24rem;
        font-size: 0.16rem;
        font-weight: 400;
        color: #333;
        line-height: 0.24rem;
      }

      .comment {
        height: 0.24rem;
        font-size: 0.16rem;
        font-weight: 400;
        color: #666;
        line-height: 0.24rem;
      }

      .number {
        height: 0.24rem;
        font-size: 0.16rem;
        font-weight: 400;
        color: #D80000;
        line-height: 0.24rem;
      }
    }
  }



}
</style>

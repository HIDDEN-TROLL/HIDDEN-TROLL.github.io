<template>
  <div class="parent_homework_history_student_item">
    <p class="part_title">
      <span>{{ action_time }}</span>
      <span v-if="!isEmpty(data.operator)">发布人：{{ data.operator }}</span>
    </p>

    <div v-for="(subject_name, subject_key) in subjects" :key="subject_key" class="subject">
      <p class="title">
        <span class="subject_name">{{ subject_name }}</span>
        <span v-if="data[subject_key] && data[subject_key].isFinished" class="status finished">完成</span>
        <span v-else class="status unfinished">未完成</span>
      </p>
      <div v-if="data[subject_key] && !isEmpty(data[subject_key].imageList)" class="image_list" @click="handlePreviewImage">
        <img
          v-for="(url, index) in data[subject_key].imageList"
          :key="index"
          :src="url"
          :data-subject_key="subject_key"
          :data-image_index="index"
          class="image"
          alt="image" />
      </div>
      <p v-if="!isEmpty(data[subject_key].content)" class="subject_content">
        <span class="label">作业详情内容：</span>
        <span class="text">{{ data[subject_key].content }}</span>
      </p>
    </div>

    <p class="discipline">
      <span class="left">作业表现</span>
      <span class="comment">{{ data.workBehavior.comment }}</span>
      <span class="number">
        <icon class="icon" name="icon-honghua" color="#d80000" />
        {{ data.workBehavior.number }}分
      </span>
    </p>

    <p v-if="!isEmpty(data.info)" class="info">{{ data.info }}</p>

    <p v-if="!isEmpty(data.voiceUrl)" class="voice">
      <span class="left">语音评价</span>
      <voice-record :value="data.voiceUrl" only-play/>
    </p>

  </div>
</template>
<script>
import { previewImage } from '@/utils'
import icon from '@/components/common/icon.vue'
import voiceRecord from '@/components/common/voice-record'
import { isEmpty, formatTime } from '@/utils'

export default {
  name: 'ParentHomeworkHistoryDetailStudentItem',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    icon,
    voiceRecord,
  },
  data() {
    return {
      isExpand: false,
      subjects: {
        'language': '语文',
        'math': '数学',
        'english': '英语'
      },
    }
  },
  computed: {
    action_time() {
      return isEmpty(this.data.time) ? '' : formatTime(this.data.time, '{y}-{m}-{d} {h}:{i}:{s}')
    }
  },
  methods: {
    handlePreviewImage(event) {
      let target = event.target
      if (!target.nodeName || target.nodeName.toLowerCase() !== 'img') {
        return
      }

      const subject_key = target.dataset['subject_key']
      const image_index = parseInt(target.dataset['image_index'])
      previewImage(this.data[subject_key].imageList, Number.isInteger(image_index) ? image_index : 0)
    },
  },
}
</script>
<style scoped lang="less">
.parent_homework_history_student_item {
  // margin: 0 .2rem;
  font-size: .16rem;
  // border-bottom: 0.01rem solid #eee;
  padding: .1rem .2rem;
  margin-bottom: .2rem;
  background-color: #fff;

  span {
    font-size: 0.16rem;
    font-weight: 400;
    color: #333;
    line-height: 0.24rem;
  }

  .part_title {
    display: flex;
    justify-content: space-between;
    span {
      font-size: .14rem;
    }
  }

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
    padding: .1rem 0;
    border-top: 0.01rem dashed #eee;

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

  .info {
    padding: 0.1rem 0;
    word-wrap: break-word;
    word-break: break-all;
    border-top: 0.01rem dashed #eee;
  }

  .voice {
    padding: 0.1rem 0;
    border-top: 0.01rem dashed #eee;
  }
}
</style>

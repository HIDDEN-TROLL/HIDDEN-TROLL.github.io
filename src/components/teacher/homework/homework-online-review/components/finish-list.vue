<template>
  <div class="homework-review-finish-list">

    <list
      class="content"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">

      <div
        v-for="(item, index) in list"
        :key="index"
        class="item">

        <p class="p1">
          <span>
            <span class="student_info">{{ item.stuName }}</span>
            <span class="student_info">{{ item.gradeName }}</span>
            <span class="student_info">{{ item.className }}</span>
          </span>
          <span>{{ item.subjectName }}</span>
        </p>
        <ul class="p2">
          <li v-for="(image, index) in item.image" :key="index" class="image-item">
            <img @click="previewImage(item.image, index)" :src="image" />
          </li>
        </ul>
        <p class="p1">
          <span>{{ item.date }} {{ item.time }}</span>
        </p>
        <p class="p3">
          <span>{{ item.user }}老师点评：</span>
          <span>
          评分：{{ item.workBehavior.comment }}
          {{ item.workBehavior.number >= 0 ? `+${item.workBehavior.number}` : item.workBehavior.number }}
          <icon class="icon" name="icon-honghua"/>
        </span>
        </p>

        <voice-record v-if="item.voice" :value="item.voice" ref="voice-record" only-play @change="updateVoice" text="播放语音" />

        <ul class="p4" v-if="Array.isArray(item.reviewImage) && item.reviewImage.length > 0">
          <li v-for="(image, index) in item.reviewImage" :key="index" class="image-item">
            <img @click="previewImage(item.reviewImage, index)" :src="image" />
          </li>
        </ul>
        <p class="p5" v-html="item.review"></p>

      </div>
    </list>

  </div>
</template>

<script>
import { getOnlineHomeworkReviewFinishList } from '@/api/teacher/homework'
import icon from '@/components/common/icon'
import { List, ImagePreview } from 'vant'
import { downloadImageByServerId, formatDate, previewImage } from '@/utils'
import voiceRecord from '@/components/common/voice-record'
import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'TeacherHomeworkOnlineReviewFinishList',
  components: {
    icon,
    List,
    voiceRecord,
  },
  props: {
    filter: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      requestParams: {
        nextId: 0,
      },
      list: [],
    }
  },
  watch: {
    filter() {
      this.list = []
      this.finished = false
      this.onLoad()
    }
  },
  methods: {
    ...mapState('homework', [
      'isDataReady',
      'isShowHomeworkContentTextarea',
      'selectedStudent',
      'discipline',
      'subjects',
    ]),
    ...mapGetters('homework', [
      'selectedStudentWorkInfo',
    ]),
    ...mapMutations('homework', [
      'toggleShowHomeworkContentTextarea',
      'updateSubjectFinishedStatus',
      'updateSubjectUploadedImageList',
      'updateSubjectContent',
      'selectDiscipline',
      'updateVoice',
    ]),
    // 刷新获取刚点评的学生信息
    reLoadingFun(){
      this.list = []
      this.loading = true
      this.finished = false
      this.onLoad()
    },
    onLoad() {
      this.applyFilter()
      if (this.list.length > 0) {
        const ids = this.list.map(item => item.workId)
        this.requestParams.nextId = Math.min.apply(Math, ids)
      } else {
        this.requestParams.nextId = 0
      }
      this.loading = true
      getOnlineHomeworkReviewFinishList(this.requestParams)
        .then(response => {
          this.loading = false
          if (response.data.meta.success) {
            const list = response.data.data
            if (Array.isArray(list) && list.length > 0) {
              this.handleServerId(list)
              this.list = this.list.concat(list)
            } else {
              this.finished = true
            }
          }
        })
        .catch(() => {
          this.finished = true
        })
        .finally(() => {
          this.loading = false
        })
    },
    previewImage(images, index) {
      previewImage(images, index)
      // ImagePreview({
      //   images: images,
      //   startPosition: index ? index : 0,
      //   lazyLoad: false
      // });
    },
    applyFilter() {
      console.log('filter')
      if (!this.filter) {
        this.requestParams.clsId = undefined
        this.requestParams.grade = undefined
        this.requestParams.subject = undefined
        this.requestParams.startDate = undefined
        this.requestParams.endDate = undefined
      }
      if (this.filter && this.filter['class']) {
        this.requestParams.clsId = this.filter['class'].value > 0 ? this.filter['class'].value : undefined
      }
      if (this.filter && this.filter['grade']) {
        this.requestParams.grade = this.filter['grade'].value > 0 ? this.filter['grade'].value : undefined
      }
      if (this.filter && this.filter['subject']) {
        this.requestParams.subject = this.filter['subject'].value > 0 ? this.filter['subject'].value : undefined
      }
      if (this.filter && this.filter['date']) {
        const date = this.filter['date'].date ? formatDate(this.filter['date'].date) : undefined
        this.requestParams.startDate = date
        this.requestParams.endDate = date
      }
    },
    handleServerId(list) {
      let serverIds = []

      list.forEach(item => {
        item.image.forEach(image => {
          if (typeof image === 'string' && !image.startsWith('http') && image.length === 64) {
            serverIds.push(image)
          }
        })
        if (Array.isArray(item.reviewImage)) {
          item.reviewImage.forEach(image => {
            if (typeof image === 'string' && !image.startsWith('http') && image.length === 64) {
              serverIds.push(image)
            }
          })
        }
      })

      downloadImageByServerId(serverIds)
        .then(map => {
          list.forEach(item => {
            item.image = item.image.map(image => {
              return map[image] ? map[image] : image
            })
            if (Array.isArray(item.reviewImage)) {
              item.reviewImage = item.reviewImage.map(image => {
                return map[image] ? map[image] : image
              })
            }
          })
        })
    },
  }
}
</script>

<style scoped lang="less">
.homework-review-finish-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: .14rem;
  font-weight: 400;

  & > .p1 {
    color: #666;
    text-align: center;
    display: flex;
    justify-content: space-between;
    height: 44px;
    line-height: 42px;
    margin: 0 15px;

    .left {
      .icon {
        margin-right: .05rem;
        color: #D80000;
      }
    }
    .right {
      border: 0;
    }
  }

  .divider {
    margin: 5px 15px;
  }
  .content {
    /*flex-grow: 1;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    margin: 0 .2rem;

    .item{
      padding: 15px 0;
      border-top: 1px solid #e2e2e2;
      width: 100%;
    }
    .p1 {
      color: #666;
      display: flex;
      justify-content: space-between;
      .student_info {
        margin-right: .1rem;
      }
    }
    .p2, .p4 {
      margin: 0.1rem 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .image-item {
        margin: 0.1rem;
        position: relative;
        flex-shrink: 0;
        width: .8rem;
        height: .8rem;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .p3 {
      color: #666;
      display: flex;
      justify-content: space-between;
      .icon {
        margin-right: .05rem;
        color: #D80000;
      }
    }
    .p5 {
      word-wrap: break-word;
      word-break: break-all;
      white-space: pre;
    }
    .p1, .p3 {
      margin: 5px 0;
    }
  }
}
</style>

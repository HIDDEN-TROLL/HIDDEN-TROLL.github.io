<template>
  <div class="homework-upload-history">

    <p class="p1 van-hairline--bottom">
      <span class="left">
        <span>获得总分：</span>
        <icon class="icon" name="icon-honghua"/>
        <span>{{ totalScore }}朵</span>
      </span>

      <van-button class="right" plain type="info" @click="$refs['date-filter'].show()">筛选日期{{ filterDateString }}</van-button>
    </p>

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
          <span>{{ item.date }} {{ item.time }}</span>
          <span>{{ item.subjectName }}</span>
        </p>
        <ul class="p2">
          <li v-for="(image, index) in item.image" :key="index" class="image-item">
            <img @click="previewImage(item.image, index)" :src="image" />
          </li>
        </ul>
        <template v-if="item.isreview">

          <voice-record v-if="item.voice" :value="item.voice" ref="voice-record" only-play @change="updateVoice" text="长按语音评价" />

          <p class="p3">
            <span>{{ item.user }}老师点评：</span>
            <span>
            评分：{{ item.workBehavior.comment }}
            {{ item.workBehavior.number >= 0 ? `+${item.workBehavior.number}` : item.workBehavior.number }}
            <icon class="icon" name="icon-honghua"/>
          </span>
          </p>
          <ul class="p4" v-if="Array.isArray(item.reviewImage) && item.reviewImage.length > 0">
            <li v-for="(image, index) in item.reviewImage" :key="index" class="image-item">
              <img @click="previewImage(item.reviewImage, index)" :src="image" />
            </li>
          </ul>
          <p class="p5" v-html="item.review"></p>
        </template>

      </div>
    </list>

    <date-range-filter-dialog :optionType="1" ref="date-filter" @change="onDateFilterConfirm" />
  </div>
</template>

<script>
import { getHomeworkOnlineReviewHistory } from '@/api/parent/homework'
import icon from '@/components/common/icon'
import dateRangeFilterDialog from '@/components/common/date-range-filter-dialog'
import { Button, List } from 'vant'
import { downloadImageByServerId, formatDate, getParamFromUrlAndRoute, previewImage } from '@/utils'
import voiceRecord from '@/components/common/voice-record'
import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'ParentHomeworkOnlineReviewHistory',
  components: {
    icon,
    vanButton: Button,
    List,
    dateRangeFilterDialog,
    voiceRecord,
  },
  data() {
    return {
      isFromTemplate: false,
      templateId: 0,
      totalScore: 0,
      filterDateString: '',
      loading: false,
      finished: false,
      requestParams: {
        nextId: 0,
      },
      list: [],
    }
  },
  created() {
    this.templateId = getParamFromUrlAndRoute('template_id', this.$router)
    this.isFromTemplate = this.templateId > 0
    if (this.isFromTemplate) {
      this.requestParams.from = 'template'
      this.requestParams.template_id = this.templateId
    }
  },
  methods: {
    ...mapMutations('homework', [
      'toggleShowHomeworkContentTextarea',
      'updateSubjectFinishedStatus',
      'updateSubjectUploadedImageList',
      'updateSubjectContent',
      'selectDiscipline',
      'updateVoice',
    ]),
    ...mapGetters('homework', [
      'selectedStudentWorkInfo',
    ]),
    onLoad() {
      if (this.list.length > 0) {
        const ids = this.list.map(item => item.workId)
        this.requestParams.nextId = Math.min.apply(Math, ids)
      } else {
        this.requestParams.nextId = 0
      }
      this.loading = true
      getHomeworkOnlineReviewHistory(this.requestParams)
        .then(response => {
          if (response.data.meta.success) {
            this.totalScore = response.data.data.totalScore
            const list = response.data.data.list
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
    onDateFilterConfirm(data) {
      this.requestParams.startDate = data.startDate instanceof Date ? formatDate(data.startDate) : undefined
      this.requestParams.endDate = data.endDate instanceof Date ? formatDate(data.endDate) : undefined
      this.filterDateString = data.name === '全部' ? '' : `(${data.name})`

      this.list = []
      this.finished = false
      this.onLoad()
    },
    previewImage(images, index) {
      previewImage(images, index)
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
.homework-upload-history {
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
    min-height: 44px;
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

<template>
  <div class="homework-review-pending-list">

    <list
      class="content"
      v-model="loading"
      :finished="finished"
      :finished-text="finishedText"
      @load="onLoad">

      <div
        v-for="(item, index) in filteredList"
        :key="index"
        class="item"
        :id="'box'+index">

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
        <p class="p3">
          <span>{{ item.date }} {{ item.time }}</span>
          <van-button class="button" plain type="info" @click="startReview(item.stuName,item.workId,index)">点评</van-button>
        </p>

      </div>
    </list>

    <van-dialog
      class="dialog"
      v-model="show"
      :title="StuName"
      show-cancel-button
      :before-close="beforeReviewDialogClose"
    >
      <div style="    border-bottom: solid 1px #CCCCCC;margin: 0.15rem 0;padding: 0 0.15rem 0.15rem 0.15rem;;">
        <van-row style="line-height: 0.3rem">
          <van-col span="4">
            <div style="float: left">表现</div>
          </van-col>
          <van-col span="16">
            <van-tabs type="card" style="width:2rem" v-model="typec"  >
              <div v-for="(item,index) in discipline" :key="index" >
                <van-tab :title="item.name"></van-tab>
              </div>
            </van-tabs>
          </van-col>
          <van-col span="4">
            <div v-if="comNumber>0">+{{comNumber}}朵</div>
            <div v-else>{{comNumber}}朵</div>
          </van-col>
        </van-row>
      </div>
      <div class="textbox">
        <div style="margin:  0 0.1rem;">
          <voice-record v-model="voiceUrl" ref="voice-record" :use-popup="false" @change="updateVoice" text="长按语音评价" />
        </div>
        <image-uploader
          v-model="comImageList"
          ref="image-uploader"
          class="uploader"
          itemWidth=".5rem" />
        <div class="c">
          <textarea placeholder="请输入点评评语" v-model="com" @blur="adjustIOS"></textarea>
        </div>
      </div>
    </van-dialog>

  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import { getOnlineHomeworkReviewPendingList, submitOnlineHomeworkReview } from '@/api/teacher/homework'
import { Button, List, Row, Col, Tab, Tabs } from 'vant'
import {
  blurAdjustIOSTextField,
  downloadImageByServerId,
  formatDate,
  getParamFromUrlAndRoute,
  previewImage, uploadVoice,
} from '@/utils'
import imageUploader from '@/components/common/wechat-image-uploader-without-oss'
import voiceRecord from '@/components/common/voice-record'

export default {
  name: 'TeacherHomeworkOnlineReviewPendingList',
  components: {
    vanTab: Tab,
    vanTabs: Tabs,
    vanRow: Row,
    vanCol: Col,
    vanButton: Button,
    voiceRecord,
    List,
    imageUploader,

  },
  props: {
    filter: {
      type: Object,
      default: null
    },
    discipline: {
      type: Array
    }
  },
  data() {
    return {
      // 评分默认选择
      com:'',
      typec:1,
      comNumber:0,
      comId:0,
      comImageList: [],
      StuName:'',
      workId:'',
      StyleIndex:'',

      show: false,
      loading: false,
      finished: false,
      list: [],

      isFromTemplate: false,
      templateId: 0,
      voiceUrl:''
    }
  },
  watch: {
    typec() {
      this.comNumber = this.discipline[this.typec].number
      this.comId = this.discipline[this.typec].id
    }
  },
  computed: {
    finishedText() {
      if (this.list.length > 0 && this.filteredList.length === 0 && (this.filter['class'].value > 0
        || this.filter['grade'].value > 0
        || this.filter['subject'].value > 0
        || this.filter['date'].value > 0)) {
        return '没有符合当前筛选条件的作业'
      }
      return '没有更多了'
    },
    filteredList() {
      if (!this.filter) {
        return this.list
      }
      return this.list.filter(item => {
        if (this.filter['class'] && this.filter['class'].value > 0 && item.classId != this.filter['class'].value) {
          return false
        }
        if (this.filter['grade'] && this.filter['grade'].value > 0 && item.grade != this.filter['grade'].value) {
          return false
        }
        if (this.filter['subject'] && this.filter['subject'].value > 0 && item.subject != this.filter['subject'].value) {
          return false
        }
        if (this.filter['date'] && this.filter['date'].value > 0) {
          const date = this.filter['date'].date
          if (date instanceof Date && item.date !== formatDate(date)) {
            return false
          }
        }
        return true
      })
    },
  },
  created() {
    this.templateId = getParamFromUrlAndRoute('template_id', this.$router)
    this.isFromTemplate = this.templateId > 0
  },
  methods: {
    adjustIOS() {
      blurAdjustIOSTextField()
    },
    ...mapState('homework', [
      'isDataReady',
      'isShowHomeworkContentTextarea',
      'selectedStudent',
      // 'discipline',
      'subjects',
    ]),
    ...mapGetters('homework', [
      'selectedStudentWorkInfo',
    ]),
    checkIsVoiceRecording() {
      return this.$refs['voice-record'] && this.$refs['voice-record'].isRecording
    },
    ...mapMutations('homework', [
      'toggleShowHomeworkContentTextarea',
      'updateSubjectFinishedStatus',
      'updateSubjectUploadedImageList',
      'updateSubjectContent',
      'selectDiscipline',
      'updateVoice',
    ]),
    beforeReviewDialogClose(action, done) {
      if (action === 'cancel') {
        done()
        return
      }

      console.log(this.com,this.comId,this.workId)

      if (this.com.trim().length === 0 && this.comImageList.length === 0) {
        this.$toast('至少输入点评内容或者上传图片才可以提交')
        done(false)
        return
      }
      const isUploading = this.$refs['image-uploader'].isUploading
      if (isUploading) {
        this.$toast('图片正在上传中, 请稍等...')
        done(false)
        return
      }

      this.$refs['image-uploader']
        .startUpload()
        .then(async () => {
          const data = {}
          data.workId = this.workId
          data.content = this.com
          data.discipline = this.comId
          data.images = this.comImageList.map(image => image.serverId)
          if(this.voiceUrl){
            data.voice = await uploadVoice(this.voiceUrl)
          }

          this.$loading()
          submitOnlineHomeworkReview(this.workId,data)
            .then(response => {
              if (response.data.meta.success) {
                this.com = ''
                this.comImageList = []
                this.voiceUrl = ''
                this.$toast('提交成功！')
                this.list = this.list.filter(item => item.workId != this.workId)
                done()
              }
            })
            .finally(() => {
              this.$loadingHide()
            })
        })
    },
    onLoad() {
      let nextId = 0
      if (this.list.length > 0) {
        const ids = this.list.map(item => item.workId)
        nextId = Math.min.apply(Math, ids)
      }
      this.loading = true
      const params = {
        nextId
      }
      if (this.isFromTemplate) {
        params.from = 'template'
        params.template_id = this.templateId
      }
      getOnlineHomeworkReviewPendingList(params)
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
    },
    startReview(name,id,index) {
      this.show = true
      this.StuName = name
      this.workId = id
      this.StyleIndex = index
      this.comId = this.discipline[1].id
      this.typec = 1
    },
    handleServerId(list) {
      let serverIds = []

      list.forEach(item => {
        item.image.forEach(image => {
          if (typeof image === 'string' && !image.startsWith('http') && image.length === 64) {
            serverIds.push(image)
          }
        })
      })

      downloadImageByServerId(serverIds)
        .then(map => {
          list.forEach(item => {
            item.image = item.image.map(image => {
              return map[image] ? map[image] : image
            })
          })
        })
    },
  }
}
</script>

<style scoped lang="less">
.homework-review-pending-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: .14rem;
  font-weight: 400;

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin: 0 .2rem;

    .item {
      padding: 15px 0;
      border-top: 1px solid #e2e2e2;
    }
    .p1 {
      color: #666;
      display: flex;
      justify-content: space-between;
      .student_info {
        margin-right: .1rem;
      }
    }
    .p2 {
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
      line-height: 2;
      .icon {
        margin-right: .05rem;
        color: #D80000;
      }
      .button {
        height: auto;
        line-height: 1;
        padding: 0 30px;
      }
    }
    .p1, .p3 {
      margin: 5px 0;
    }
  }
}
.dialog {
  /deep/ .van-dialog__content {
    max-height: 80vh;
    overflow: scroll;
  }
}
.textbox{
  margin: 0 .1rem;
  border-radius: 8px;
}
.textbox .c{
  margin: 0 .1rem;
}
.textbox textarea{
  width: 100%;
  height: 1.5rem;
  border-radius: 8px;
}
</style>

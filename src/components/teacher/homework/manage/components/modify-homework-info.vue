<template>
  <div class="modify_homework_info">

    <p v-if="selectedStudent === null" class="not_selected_student">请先选择学生</p>

    <div v-if="isDataReady && selectedStudent !== null" class="content">

      <h1 class="title">
        <span>作业点评</span>
        <a class="toggle_show_homework_content_textarea clickable" href="javascript:;" @click="toggleShowHomeworkContentTextarea">{{ isShowHomeworkContentTextarea ? '隐藏作业详情框' : '显示作业详情框' }}</a>
      </h1>

      <table class="table">
        <thead>
          <tr>
            <th>科目</th>
            <th>情况</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(key, index) in subjects">
            <tr :key="index" class="border_top">
              <td>{{ selectedStudent.workInfo[key].title }}</td>
              <td>
                <van-radio-group v-model="selectedStudent.workInfo[key].isFulfil" @change="updateSubjectFinishedStatus([key, $event])">
                  <van-radio class="radio" :name="1">已完成</van-radio>
                  <van-radio class="radio" :name="0">未完成</van-radio>
                </van-radio-group>
              </td>
              <td>
                <button class="upload clickable" @click="triggerUploadImage(key)">上传照片</button>
              </td>
            </tr>
            <tr v-show="isShowHomeworkContentTextarea || !isEmpty(selectedStudent.workInfo[key].imageUrl)" :key="`${index}_expand`">
              <td colspan="3">
                <image-uploader
                  v-show="!isEmpty(selectedStudent.workInfo[key].imageUrl)"
                  class="uploader"
                  :ref="`image-uploader-${key}`"
                  :value="selectedStudent.workInfo[key].imageUrl"
                  @change="updateSubjectUploadedImageList([key, $event])"
                  item-width=".6rem"
                  upload-immediately
                  hide-upload-trigger
                />

                <!--<p class="content_textarea_label">详细评论：</p>-->
                <!--class="content_textarea"-->
                <van-field
                  v-show="isShowHomeworkContentTextarea"
                  ref="content-textarea"
                  v-model="selectedStudent.workInfo[key].content"
                  type="textarea"
                  placeholder="请输入作业详情内容"
                  clickable
                  :autosize="{ maxHeight: 100, minHeight: 40 }" />
              </td>
            </tr>
          </template>

        </tbody>
      </table>

      <div class="discipline">
        <span class="name">作业表现</span>

        <span class="items">
          <span
            v-for="(item, index) in discipline"
            :key="index"
            @click="selectDiscipline(item.id)"
            class="item"
            :class="{ selected: selectedStudent.workInfo.discipline === item.id }"
          >{{ item.name }}</span>
        </span>

        <span class="safflower">
          <icon class="icon" name="icon-honghua" color="#d80000" />
          <span>{{ safflowerText }}</span>
        </span>
      </div>

      <voice-record :value="selectedStudent.workInfo.voiceUrl" ref="voice-record" @change="updateVoice" text="长按语音评价" />
    </div>

  </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import { RadioGroup, Radio, Field } from 'vant'
import imageUploader from '@/components/common/image-uploader'
import voiceRecord from '@/components/common/voice-record'
import icon from '@/components/common/icon.vue'

export default {
  name: 'modify_homework_info',
  components: {
    vanRadioGroup: RadioGroup,
    vanRadio: Radio,
    vanField: Field,
    imageUploader,
    voiceRecord,
    icon,
  },
  watch: {
    isShowHomeworkContentTextarea() {
      if (this.isShowHomeworkContentTextarea && Array.isArray(this.$refs['content-textarea'])) {
        this.$refs['content-textarea'].forEach(field => field.adjustSize && field.$nextTick(field.adjustSize))
      }
    }
  },
  computed: {
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
    safflowerText() {
      const currentId = parseInt(this.selectedStudentWorkInfo.discipline)
      const discipline = this.discipline.find(item => item.id === currentId)
      if (discipline) {
        return discipline.number >= 0 ? `+${discipline.number}朵` : `${discipline.number}朵`
      }
      if (currentId === 0) {
        return '+0朵'
      }
      return '获取错误'
    },
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
    triggerUploadImage(key) {
      let uploader = this.$refs[`image-uploader-${key}`]
      if (Array.isArray(uploader)) {
        uploader = uploader[0]
      }
      if (uploader) {
        uploader.trigger()
      }
    },
    checkIsUploading() {
      return this.subjects.some(key => {
        let uploader = this.$refs[`image-uploader-${key}`]
        if (Array.isArray(uploader)) {
          uploader = uploader[0]
        }
        return uploader && uploader.isUploading
      })
    },
    checkIsVoiceRecording() {
      return this.$refs['voice-record'] && this.$refs['voice-record'].isRecording
    },
  },
}
</script>
<style scoped lang="less">
.modify_homework_info {
  flex-grow: 1;
  padding: 0 0.2rem;

  .clickable:active {
    background: #eee;
  }

  .not_selected_student {
    font-size: .16rem;
    text-align: center;
    padding: .2rem 0;
    background-color: #fff;
    height: 100%;
  }

  .content {
    font-size: .16rem;

    & > .title {
      font-weight: 600;
      color: #333;
      line-height: 0.24rem;
      position: relative;
      padding: .12rem;
      font-size: .16rem;
      display: flex;
      justify-content: space-between;

      &:before {
        content: '';
        width: 0.02rem;
        height: 0.20rem;
        background-color: #3770FB;
        border-radius: 10px;
        position: absolute;
        left: 0;
        margin-top: 0.02rem;
      }

      .toggle_show_homework_content_textarea {
        font-size: 0.14rem;
        font-weight: 400;
        color: #84c225;
      }
    }

    .table {
      width: 100%;
      border-collapse: collapse;

      thead {
        th:first-child, th:last-child {
          width: 25%;
        }

      }

      tr.border_top {
        border-top: 0.01rem solid #eee;
      }

      th {
        text-align: center;
        height:0.24rem;
        font-size:0.14rem;
        font-weight:400;
        color: #333;
        line-height:0.24rem;
      }
      td {
        text-align: center;
        height:0.24rem;
        font-size:0.14rem;
        font-weight:400;
        color: #666;
        line-height:0.24rem;
        padding: .05rem 0;

        .radio {
          display: inline-block;

          &:first-child {
            margin-right: .1rem;
          }
        }

        .upload {
          font-size: 0.14rem;
          font-weight: 400;
          color: #84c225;
          background: transparent;
          border: 0;
          padding: 0;
          margin: 0;
        }
        .uploader {
          margin: 0;
        }

        .content_textarea_label {
          text-align: left;
          padding-top: 10px;
          padding-left: 15px;
          padding-right: 15px;
        }
        .content_textarea {
          padding-top: 0;
        }
      }
    }

    .discipline {
      padding: .12rem 0;
      font-size: .14rem;

      .name {
        font-weight:400;
        color:#333;
        line-height:0.24rem;
        margin-right: .2rem;
      }

      .items {
        margin-right: .2rem;
        .item {
          font-size: 0.14rem;
          border: 0.01rem solid #e7e7e7;
          display: inline-block;
          text-align: center;
          padding: 0.08rem .12rem;

          &:not(:last-child) {
            border-right: 0;
          }

          &.selected {
            background-color:#3770FB;
            border-color:#3770FB;
            color: #fff;
          }
        }
      }


      .safflower {
        color: #D80000;
      }
    }
  }
}
</style>

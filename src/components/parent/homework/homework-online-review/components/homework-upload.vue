<template>
  <div class="homework-upload">
    <p class="tip">请点击加号按钮，上传孩子完成的作业图片</p>

    <div class="content">

      <div
        v-for="(subject, index) in subjects"
        :key="index"
        class="subject">

        <div class="title">{{ subject.title }}</div>
        <image-uploader
          v-model="subject.imageList"
          ref="image-uploader"
          class="uploader"
          itemWidth=".5rem" />

      </div>

      <button class="footer" @click="onSubmit">提交给老师</button>

    </div>


  </div>
</template>

<script>
import imageUploader from '@/components/common/wechat-image-uploader-without-oss'
// import { getShortTermSignedOssUrl } from '@/api/common'
import { submitHomeworkOnlineReviewImages } from '@/api/parent/homework'
import { getParamFromUrlAndRoute } from '@/utils'

// const draftLocalStorageKey = 'ParentHomeworkOnlineReviewHomeworkUploadDraft'

export default {
  name: 'ParentHomeworkOnlineReviewHomeworkUpload',
  components: {
    imageUploader
  },
  data() {
    return {
      isFromTemplate: false,
      templateId: 0,
      subjects: [
        {
          title: '语文',
          imageList: [],
        },
        {
          title: '数学',
          imageList: [],
        },
        {
          title: '英语',
          imageList: [],
        },
      ],
    }
  },
  created() {
    this.templateId = getParamFromUrlAndRoute('template_id', this.$router)
    this.isFromTemplate = this.templateId > 0
  },
  methods: {
    // loadDraft() {
    //   let draft = localStorage[draftLocalStorageKey]
    //   if (!draft || typeof draft !== 'string') {
    //     return
    //   }
    //   draft = JSON.parse(draft) // [['image/xxx.jpg'], ['image/xxx.jpg'], []]
    //   if (!Array.isArray(draft) || draft.length !== 3) {
    //     return
    //   }
    //   const ossKeys = draft.flat()
    //   if (ossKeys === 0) {
    //     return
    //   }
    //
    //   this.$loading('读取草稿箱中...')
    //   getShortTermSignedOssUrl(ossKeys)
    //     .then(response => {
    //       if (response.data.meta.success) {
    //         draft.forEach((subjectOssKeys, subjectIndex) => {
    //           subjectOssKeys.forEach(subjectOssKey => {
    //             const target = response.data.data.find(item => item.objectKey === subjectOssKey)
    //             if (target.url && target.objectKey) {
    //               this.subjects[subjectIndex].imageList.push({
    //                 content: target.url,
    //                 ossKey: target.objectKey,
    //               })
    //             }
    //           })
    //         })
    //       }
    //     })
    //     .finally(() => {
    //       this.$loadingHide()
    //     })
    // },
    // saveDraft() {
    //   const draft = this.subjects.map(subject => subject.imageList.map(image => image.ossKey))
    //   console.log('saveDraft', draft)
    //   localStorage[draftLocalStorageKey] = JSON.stringify(draft)
    // },
    // clearDraft() {
    //   delete localStorage.ParentHomeworkOnlineReviewHomeworkUploadDraft
    // },
    // onImageUploaderChange() {
    //   setTimeout(() => {
    //     this.saveDraft()
    //   })
    // },
    checkBeforeSubmit() {
      const is = this.subjects.every(subject => subject.imageList.length === 0)
      if (is) {
        return '至少要上传一个科目的图片才可以提交'
      }
      return true
    },
    genSubmitData() {
      let promise = Promise.resolve()

      this.$refs['image-uploader']
        .forEach(uploader => {
          promise = promise.then(uploader.startUpload)
        })

      const genData = () => new Promise((resolve) => {
        const keys = ['language', 'math', 'english']
        const data = {}
        this.subjects.forEach((subject, index) => {
          const key = keys[index]
          const images = subject.imageList.map(image => image.serverId)
          if (images.length > 0) {
            data[key] = images
          }
        })
        const result = {
          images: data
        }
        if (this.isFromTemplate) {
          result.from = 'template'
          result.template_id = this.templateId
        }
        resolve(result)
      })
      return promise.then(genData)
    },
    async onSubmit() {
      const isUploading = this.$refs['image-uploader'].some(uploader => uploader.isUploading)
      if (isUploading) {
        this.$toast('图片正在上传中, 请稍等...')
        return false
      }

      const checkResult = await this.checkBeforeSubmit()
      if (checkResult !== true) {
        this.$toast(checkResult)
        return false
      }

      this.$dialog.confirm({
        title: '提示',
        message: '将提交作业图片给老师点评'
      })
        .then(this.genSubmitData)
        .then(data => {
          console.log(data)
          this.$loading('上传中...')
          submitHomeworkOnlineReviewImages(data)
            .then(response => {
              if (response.data.meta.success) {
                this.$toast('保存成功')
                this.subjects.forEach(subject => subject.imageList = [])
                // this.clearDraft()
              } else {
                this.$toast('保存失败')
              }
            })
            .finally(() => {
              this.$loadingHide()
            })
        })
        .catch(function () {
          console.error(arguments)
        })
    },
  }
}
</script>

<style scoped lang="less">
.homework-upload {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .tip {
    font-size: .14rem;
    font-weight: 400;
    color: #666;
    line-height: 0.24rem;
    text-align: center;
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .subject {
      border-top: 0.01rem solid #eee;
      padding: .2rem;
      background-color: #fff;
      font-size: .16rem;
      flex-shrink: 0;

      .title {
        font-weight: 400;
        color: #666;
        line-height: 0.24rem;
      }
    }
    .subject:last-of-type {
      flex-grow: 1;
    }

    .footer {
      flex-shrink: 0;
      width: 100%;
      height: 0.47rem;
      line-height: 0.47rem;
      background: #3770FB;
      font-size: .16rem;
      color: #fff;
      border: 0;
      padding: 0;
      margin: 0;
    }
  }
}
</style>

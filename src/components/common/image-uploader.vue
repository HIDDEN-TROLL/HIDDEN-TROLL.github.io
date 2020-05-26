<template>
  <ul class="image-uploader" :class="{ scrollable }">
    <li v-for="(image, index) in imageList" :key="index" :style="liStyle">
      <van-icon name="cross" class="del_button" @click="del(index)"/>
      <img @click="preview(index)" :src="image.content" alt="已上传的图片" />
    </li>
    <li v-for="(image, index) in uploadingImageList" :key="`uploading${index}`" :style="liStyle" class="uploading">
      <img :src="image.content" alt="图片上传中" />
      <van-loading class="loading" color="white"/>
    </li>

    <van-uploader
      v-show="!hideUploadTrigger && (max <= 0 || imageList.length < max) && !isUploading"
      class="plus"
      ref="uploader"
      :accept="accept"
      :style="liStyle"
      :after-read="selected"
      :multiple="this.max !== 1">
      <van-icon name="plus"/>
    </van-uploader>
  </ul>
</template>
<script>
import { isEmpty, previewImage } from '@/utils'
import { Icon, Uploader, Loading } from 'vant'
import { getUploadOssUrl } from '@/api/common'

function getFileType(file) {
  const map = {
    'image/jpeg': 1,
    'image/jpg': 1,
    'image/png': 2,
  }
  return map[file.type] ? map[file.type] : 1
}

// base64 转 二进制
function transBase64ToBlob(dataURI) {
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
  let byteString = atob(dataURI.split(',')[1]); //base64 解码
  let arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
  let intArray = new Uint8Array(arrayBuffer); //创建视图

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: mimeString });
}

function initImages(image) {
  if (isEmpty(image)) {
    return []
  }
  if (!Array.isArray(image)) {
    image = [image]
  }
  return image.map(item => {
    item.ossKey = ''
    item.uploaded = false
    return item
  })
}

const DEFAULT = {
  content : '', // 图片的base64编码 或 图片的HTTP URL
  file: null,
  ossKey: '', // 上传成功后的ossKey 或 图片的HTTP URL
  uploaded: true
}
const DEFAULT_FIELDS = ['content', 'file', 'ossKey', 'uploaded']

function isMatchItem(item) {
  if (typeof item === 'object') {
    const keys = Object.keys(item)
    return DEFAULT_FIELDS.every(field => keys.includes(field))
  }
  return false
}

export default {
  name: 'image-uploader',
  components: {
    vanIcon: Icon,
    vanUploader: Uploader,
    vanLoading: Loading,
  },
  props: {
    value: {
      type: Array,
    },
    itemWidth: {
      type: String,
      default: '0.8rem',
    },
    max: {
      type: Number,
      default: 9,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    uploadImmediately: { // 是否选择图片后, 立即上传到OSS上; 为false时, 需要手动调用 startUpload 方法上传并获取key
      type: Boolean,
      default: false,
    },
    itemStyle: {
      type: Object,
    },
    accept: {
      type: String,
      default: 'image/*', // 只支持jpg和png
    },
    hideUploadTrigger: { // 是否隐藏点击上传按钮
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.parseValue(this.value)
  },
  watch: {
    value() {
      this.parseValue(this.value)
    },
  },
  data() {
    return {
      imageList: [ // 已上传的
        // {
        //   content: 'base64',
        //   file: File,
        //   ossKey: '',
        //   uploaded: false,
        // }
      ],
      uploadingImageList: [ // 上传中

      ],
      ossUrlListMap: {},

      uploadSuccessNumbers: 0,

      isUploading: false,
      loadingInstance: undefined,
    }
  },
  computed: {
    liStyle() {
      const style = {
        width: this.itemWidth,
        height: this.itemWidth,
      }
      if (typeof this.itemStyle === 'object') {
        Object.assign(style, this.itemStyle)
      }
      return style
    }
  },
  methods: {
    parseValue(value) {
      if (!Array.isArray(value) || isEmpty(value)) {
        this.imageList = []
        return
      }

      const isAllMatch = value.every(item => typeof item === 'object' && isMatchItem(item))
      if (isAllMatch) {
        this.imageList = value
        return
      }

      this.imageList = value.map(item => {
        if (typeof item === 'string') {
          return Object.assign({}, DEFAULT, {
            content: item,
            ossKey: item,
          })
        } else if (typeof item === 'object') {
          if (isMatchItem(item)) {
            return item
          } else {
            return Object.assign({}, DEFAULT, item)
          }
        } else {
          return Object.assign({}, DEFAULT)
        }
      })
      this.$emit('change', this.imageList)
      this.$emit('input', this.imageList)
    },
    trigger() {
      if (this.$refs['uploader']) {
        this.$refs['uploader'].$el.getElementsByTagName('input')[0].click()
      }
    },
    selected(image) {
    console.log(image)
      image = initImages(image)
      const filteredImages = image.filter(image => getFileType(image.file) !== undefined)
      if (image.length !== filteredImages.length) {
        this.$toast(`有${image.length - filteredImages.length}张图片因为图片格式不支持被过滤掉`)
      }
      this.uploadingImageList = this.uploadingImageList.concat(filteredImages)

      if (this.max > 0 && (this.imageList.length + this.uploadingImageList.length) > this.max) {
        this.$toast(`最多只可以上传${this.max}张图片`)
        this.uploadingImageList = this.uploadingImageList.slice(0, Math.max(this.max - this.imageList.length, 0))
      }

      this.handleUploadingImageList()
        .then(() => {
          this.$emit('change', this.imageList)
          this.$emit('input', this.imageList)
        })
    },
    handleUploadingImageList() {
      if (!this.uploadImmediately) {
        this.imageList.concat(this.uploadingImageList)
        return Promise.resolve()
      }

      this.$emit('before-upload', [this.imageList, this.uploadingImageList])
      return this.startUpload()
    },

    del(index) {
      if (index >= 0 && index < this.imageList.length && this.imageList[index]) {
        this.imageList.splice(index, 1)
        this.$emit('change', this.imageList)
        this.$emit('input', this.imageList)
      }
    },
    clear() {
      this.imageList = []
      this.uploadingImageList = []
    },
    preview(index) {
      previewImage(this.imageList.map(image => image.content), index)
    },

    getUploadedImageCount() {
      return this.imageList.length
    },
    // 获取用于上传图片的oss url
    handlePrepareOssUrl(imageList) {
      const map = {}
      imageList.forEach(image => {
        const fileType = getFileType(image.file)
        map[fileType] = map[fileType] ? map[fileType] + 1 : 1
      })

      this.ossUrlListMap = {}
      const promiseList = []
      for (let fileType in map) {
        if (map.hasOwnProperty(fileType)) {
          let promise
          if (fileType === undefined || fileType === 'undefined') {
            promise = Promise.reject()
          } else {
            promise = getUploadOssUrl(fileType, undefined, map[fileType])
              .then(response => {
                this.ossUrlListMap[fileType] = response.data.meta.success ? response.data.data : []
              })
          }
          promiseList.push(promise)
        }
      }

      return Promise.all(promiseList)
    },
    startUpload() {
      if (this.isUploading === true) {
        return Promise.reject('图片正在上传中')
      }
      const prepareUploadImageList = this.uploadImmediately ? this.uploadingImageList : this.imageList.filter(item => !item.uploaded)
      const prepareUploadImageCount = prepareUploadImageList.length
      if (prepareUploadImageCount === 0) {
        return Promise.resolve(this.imageList)
      }

      this.uploadSuccessNumbers = 0
      this.isUploading = true
      this.handleLoading('获取中...')

      let p = this.handlePrepareOssUrl(prepareUploadImageList)

      prepareUploadImageList.forEach((item, index) => {
        p = p.then(() => {
          this.handleLoading(`正在上传第${index + 1}张图片`)
          return this.uploadImage(item)
        })
      })

      return p.then(() => this.imageList)
        .finally(() => {
          console.log('上传过程结束')
          this.isUploading = false
          this.handleLoadingHide()
          if (this.uploadSuccessNumbers !== prepareUploadImageCount) {
            this.$toast(`有${prepareUploadImageCount - this.uploadSuccessNumbers}张图片上传失败`)
          }
        })
    },
    uploadImage(image) {
      console.log('uploadImage')
      const fileType = getFileType(image.file)
      let ossItem
      if (Array.isArray(this.ossUrlListMap[fileType])) {
        ossItem = this.ossUrlListMap[fileType].shift()
      }
      if (!ossItem) {
        return Promise.resolve()
      }

      const ossKey = ossItem.key
      const ossUrl = ossItem.url
      const ossType = ossItem.type
      const body = transBase64ToBlob(image.content)

      return this.axios.put(ossUrl, body, {
        headers: { 'Content-Type': ossType },
      })
        .then(response => {
          if (response.status === 200) {
            image.ossKey = ossKey
            image.uploaded = true
            this.imageList.push(image)
            this.uploadSuccessNumbers += 1

            if (this.uploadImmediately) {
              const index = this.uploadingImageList.indexOf(image)
              if (index > -1) {
                this.uploadingImageList.splice(index, 1)
              }
            }
          }
        })
        .catch((e) => {
          console.error('上传图片出错', e)
        })
    },

    handleLoading(message) {
      console.log(message)
      if (this.uploadImmediately) {
        return
      }
      if (this.loadingInstance === undefined) {
        this.loadingInstance = this.$loading(message, 0)
      } else {
        this.loadingInstance.message = message
      }
    },
    handleLoadingHide() {
      if (this.loadingInstance !== undefined) {
        this.loadingInstance.clear()
      }
      this.loadingInstance = undefined
    },
  },
}
</script>
<style scoped lang="less">
.image-uploader {
  margin: 0.2rem 0;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &.scrollable {
    overflow-x: scroll;
    min-width: 100%;
    flex-wrap: nowrap;
  }

  .plus {
    border: 1px dashed #999;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    font-size: 200%;
    background: #fff;
  }

  li {
    margin: 0.1rem;
    position: relative;
    flex-shrink: 0;

    .del_button {
      position: absolute;
      top: -0.05rem;
      right: -0.05rem;
      width: .2rem;
      height: .2rem;
      border-radius: 50%;
      color: #fff;
      background: #ff4444;
      line-height: .2rem;
      text-align: center;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .uploading {
    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 5px;
    }
  }
}
</style>

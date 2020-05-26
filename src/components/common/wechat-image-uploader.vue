<template>
  <ul class="image-uploader" :class="{ scrollable }">
    <li v-for="(image, index) in imageList" :key="index" :style="liStyle"
        :class="{ uploading: image.status === 'uploading' }">
      <van-icon name="cross" class="del_button" @click="del(index)"/>
      <img :src="image.content" alt="已上传的图片" @click="preview(index)"/>
      <van-loading v-if="image.status === 'uploading'" class="loading" color="white"/>
    </li>

    <li
      v-show="!hideUploadTrigger && (max <= 0 || imageList.length < max) && !isUploading"
      class="plus"
      :class="triggerClass"
      ref="uploader"
      :style="liStyle"
      @click="startChooseImage">
      <van-icon name="plus"/>
    </li>
  </ul>
</template>
<script>
import { isEmpty, previewImage } from '@/utils'
import { Icon, Loading } from 'vant'
import { getUploadOssUrl } from '@/api/common'
import wx from 'weixin-js-sdk'

// base64 转 二进制
function convertBase64ToBlob(dataURI) {
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
  let byteString = atob(dataURI.split(',')[1]); //base64 解码
  let arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
  let intArray = new Uint8Array(arrayBuffer); //创建视图

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: mimeString });
}

const DEFAULT = {
  content: '', // 图片的base64编码 或 图片的HTTP URL
  ossKey: '', // 上传成功后的ossKey 或 图片的HTTP URL
  localId: '',
  status: 'ready', //  ready uploading success fail
}
const DEFAULT_FIELDS = ['content', 'ossKey', 'localId', 'status']

function isMatchItem(item) {
  if (typeof item === 'object') {
    const keys = Object.keys(item)
    return DEFAULT_FIELDS.every(field => keys.includes(field))
  }
  return false
}

export default {
  name: 'wechat-image-uploader',
  components: {
    vanIcon: Icon,
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
    triggerClass: {
      type: String,
    },


    hideUploadTrigger: { // 是否隐藏点击上传按钮
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.$store.dispatch('initJSSDK')
    this.parseValue(this.value)
  },
  watch: {
    value() {
      this.parseValue(this.value)
    },
  },
  data() {
    return {
      imageList: [],
      ossList: [],

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
    },
  },
  methods: {
    startChooseImage() {
      if (this.max > 0 && this.max - this.imageList.length <= 0) {
        this.$toast(`最多只可以上传${this.max}张图片`)
        return
      }

      wx.chooseImage({
        count: this.max - this.imageList.length,
        success: result => {
          console.log('wx.chooseImage', result)

          let p = Promise.resolve()
          const localIds = result.localIds
          localIds.forEach(localId => {
            p = p.then(() => new Promise(resolve => {
              wx.getLocalImgData({
                localId,
                success: res => {
                  console.log('wx.getLocalImgData', res)
                  if (!res.localData.startsWith('data:')) {
                    res.localData = 'data:image;base64,' + res.localData;
                  }
                  res.localData = res.localData.replace(/\n/g, '')
                  this.addList(localId, res.localData)
                  resolve()
                },
              })
            }))
          })
          p.then(() => {
            this.emitData()
            if (this.uploadImmediately) {
              return this.startUpload(true)
            } else {
              return Promise.resolve(this.imageList)
            }
          })
            .then(result => {
              console.log('上传结果', result)
            })
        },
      })
    },
    addList(localId, localData) {
      console.log('addList', localId, localData.slice(0, 20))
      if (!Array.isArray(this.imageList)) {
        this.imageList = []
      }

      this.imageList.push(Object.assign({}, DEFAULT, {
        content: localData,
        localId: localId,
      }))
    },
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
            localId: item,
            status: 'success',
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
      this.startChooseImage()
    },
    del(index) {
      if (index >= 0 && index < this.imageList.length && this.imageList[index]) {
        this.imageList.splice(index, 1)
        this.emitData()
      }
    },
    emitData() {
      this.$emit('change', this.imageList)
      this.$emit('input', this.imageList)
    },
    clear() {
      this.imageList = []
    },
    preview(index) {
      previewImage(this.imageList.map(image => image.localId), index)
    },

    getUploadedImageCount() {
      return this.imageList.filter(image => image.status === 'success').length
    },
    // 获取用于上传图片的oss url
    handlePrepareOssUrl(imageList) {
      return getUploadOssUrl(1, undefined, imageList.length)
        .then(response => {
          this.ossList = response.data.meta.success ? response.data.data : []
        })
    },
    startUpload(silent = false) {
      if (this.isUploading === true) {
        return Promise.reject('图片正在上传中')
      }
      const prepareUploadImageList = this.imageList.filter(item => item.status !== 'success')
      const prepareUploadImageCount = prepareUploadImageList.length
      if (prepareUploadImageCount === 0) {
        return Promise.resolve(this.imageList)
      }

      this.uploadSuccessNumbers = 0
      this.isUploading = true
      if (!silent) {
        this.handleLoading('获取中...')
      }

      let p = this.handlePrepareOssUrl(prepareUploadImageList)

      prepareUploadImageList.forEach((image, index) => {
        p = p.then(() => {
          if (!silent) {
            this.handleLoading(`正在上传第${index + 1}张图片`)
          }
          return this.uploadImage(image)
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
          this.emitData()
        })
    },
    uploadImage(image) {
      console.log('uploadImage', image)
      let ossItem = this.ossList.shift()
      if (!ossItem) {
        return Promise.resolve()
      }

      const ossKey = ossItem.key
      const ossUrl = ossItem.url
      const ossType = ossItem.type
      const imageBody = convertBase64ToBlob(image.content)
      image.status = 'uploading'
      return this.axios.put(ossUrl, imageBody, {
        headers: { 'Content-Type': ossType },
      })
        .then(response => {
          if (response.status === 200) {
            image.ossKey = ossKey
            image.status = 'success'
            this.uploadSuccessNumbers += 1
          }
        })
        .catch((e) => {
          image.status = 'fail'
          console.error('上传图片出错', e)
        })
    },

    handleLoading(message) {
      if (this.uploadImmediately) {
        return
      }
      if (this.loadingInstance === undefined) {
        this.loadingInstance = this.$loading(message, 0)
      } else {
        this.loadingInstance.message = message
      }
      console.log(message)
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
  font-size: .16rem;

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
    box-sizing: border-box;
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

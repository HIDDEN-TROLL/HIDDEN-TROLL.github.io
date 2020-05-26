<template>
  <ul class="image-uploader" :class="{ scrollable }">
    <li v-for="(image, index) in imageList" :key="index" :style="liStyle"
        :class="{ uploading: image.status === 'uploading' }">
      <van-icon name="cross" class="del_button" @click="del(index)"/>
      <img :src="image.imgSrc ? image.imgSrc : image.localId" alt="已上传的图片" @click="preview(index)"/>
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
import { isEmpty, previewImage, saveImageLocalIdServerIdCache, isIOS, isWechatImageLocalId, getWechatLocalImgData } from '@/utils'
import { Icon, Loading } from 'vant'
import wx from 'weixin-js-sdk'

const DEFAULT = {
  serverId: null, // serverId === mediaId
  localId: null,
  imgSrc: null,
  status: 'ready', //  ready uploading success fail
}
const DEFAULT_FIELDS = ['serverId', 'localId', 'imgSrc', 'status']

function isMatchItem(item) {
  if (typeof item === 'object') {
    const keys = Object.keys(item)
    return DEFAULT_FIELDS.every(field => keys.includes(field))
  }
  return false
}

export default {
  name: 'wechat-image-uploader-without-oss',
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
    uploadImmediately: { // 是否选择图片后, 立即上传到微信服务器上; 为false时, 需要手动调用 startUpload 方法上传并获取key
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
    imageList() {
      if (isIOS()) {
        this.imageList.forEach(async image => {
          if (!image.imgSrc && isWechatImageLocalId(image.localId)) {
            image.imgSrc = await getWechatLocalImgData(image.localId)
          }
        })
      }
    }
  },
  data() {
    return {
      imageList: [],

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
      console.log('startChooseImage')
      if (this.max > 0 && this.max - this.imageList.length <= 0) {
        this.$toast(`最多只可以上传${this.max}张图片`)
        return
      }
      if (!Array.isArray(this.imageList)) {
        this.imageList = []
      }

      wx.chooseImage({
        count: this.max - this.imageList.length,
        success: result => {
          console.log('wx.chooseImage', result)

          result.localIds.forEach(localId => {
            this.imageList.push(Object.assign({}, DEFAULT, { localId }))
          })

          this.emitData()
          let promise
          if (this.uploadImmediately) {
            promise = this.startUpload(true)
          } else {
            promise = Promise.resolve(this.imageList)
          }
          promise.then(result => console.log('微信图片上传结果', result))
        },
      })
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
            serverId: item,
            localId: item,
            imgSrc: item,
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

    // 获取已上传的图片数量
    getUploadedImageNumber() {
      return this.imageList.reduce((number, image) => image.status === 'success' ? number + 1 : number, 0)
    },
    // 获取未上传的图片数量
    getNoUploadedImageNumber() {
      return this.imageList.reduce((number, image) => image.status !== 'success' ? number + 1 : number, 0)
    },

    startUpload(silent = false) {
      if (this.isUploading === true) {
        return Promise.reject('图片正在上传中')
      }

      const noUploadedNumber = this.getNoUploadedImageNumber()
      if (noUploadedNumber === 0) {
        return Promise.resolve(this.imageList)
      }

      this.isUploading = true
      console.log('微信图片开始上传', '未上传的图片数量', noUploadedNumber)
      let promise = Promise.resolve()
      this.imageList.forEach((image, index) => {
        promise = promise.then(() => {
          if (!silent) {
            this.handleLoading(`正在上传第${index + 1}张图片`)
          }
          return this.uploadImage(image, index)
        })
      })

      return promise.then(() => {
        console.log('微信图片上传过程结束')
        this.isUploading = false
        this.handleLoadingHide()

        const noUploadedNumber = this.getNoUploadedImageNumber()
        if (noUploadedNumber > 0) {
          this.handleFailToast(`有${noUploadedNumber}张图片上传失败`)
        }

        this.emitData()
        saveImageLocalIdServerIdCache(this.imageList)

        return this.imageList
      })
        .catch((e) => {
          console.log('微信图片上传过程异常结束', e)
          this.isUploading = false
          this.handleLoadingHide()

          if (typeof e === 'string') {
            this.handleFailToast(e)
          } else {
            const errorMessage = e && e.message ? `(${e.message})` : ''
            this.handleFailToast('上传图片发生异常，请尝试重新提交' + errorMessage)
          }

          return Promise.reject(e)
        })
    },
    uploadImage(image, imageIndex) {
      console.log('uploadImage', '图片下标', imageIndex, image)

      if (image.status === 'success') {
        return Promise.resolve()
      }

      image.status = 'uploading'

      return new Promise((resolve, reject) => {
        let isTimeout = false
        const timeout = setTimeout(() => {
          const message = '上传图片超时，请尝试重新上传'
          isTimeout = true
          image.status = 'fail'
          reject(message)
        }, 60000)

        wx.uploadImage({
          localId: image.localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 0, // 默认为1，显示进度提示
          success: function (res) {
            image.serverId = res.serverId; // 返回图片的服务器端ID
            image.status = 'success'
            if (!isTimeout) {
              clearTimeout(timeout)
              resolve()
            }
          },
          fail: function () {
            console.log('wx.uploadImage fail', arguments)
            image.status = 'fail'
            if (!isTimeout) {
              clearTimeout(timeout)
              reject(`上传第${imageIndex + 1}张图片失败`)
            }
          }
        })
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
    handleFailToast(message) {
      this.$toast({
        type: 'fail',
        duration: 8000,
        position: 'middle',
        message,
      })
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

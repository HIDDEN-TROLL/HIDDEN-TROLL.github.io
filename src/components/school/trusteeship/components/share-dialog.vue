<template>
  <van-dialog

    class="dialog"
    v-model="show"
    :show-confirm-button="false"
    close-on-click-overlay>
    <div ref="content" v-show="!isInit" class="content" @click="html2canvas">
      <img class="banner" :src="banner" alt="" />
      <p class="summary">{{ $store.getters['trusteeship/websiteSummary'] }}</p>
      <div class="bottom">
        <p class="tip">长按将图片分享给朋友</p>
        <img class="qrcode" :src="qrcode" alt="" />
      </div>
    </div>
    <img v-show="isInit" class="image" :src="dataUrl" alt="" />

  </van-dialog>

</template>

<script>
import html2canvas from 'html2canvas'
import { getShareData } from '@/api/school/trusteeship'

export default {
  name: 'website-share-dialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isInit: false,
      banner: '',
      qrcode: '',
      dataUrl: '',
    }
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  watch: {
    value() {
      this.init()
    },
  },
  methods: {
    reset() {
      this.isInit = false
    },
    init() {
      if (this.isInit) {
        return
      }

      this.$loading('获取数据中...')
      getShareData(this.$store.state.trusteeship.currentSchoolId)
        .then(response => {
          if (response.data.meta.success) {
            this.banner = response.data.data.propagandaImgurl
            this.qrcode = response.data.data.qrCode
          }
        })
        .then(() => {
          this.$nextTick(this.html2canvas)
        })
        .finally(() => {
          this.$loadingHide()
        })
    },
    html2canvas() {
      html2canvas(this.$refs['content'], {
        // width: this.$el.clientWidth,
        // height: this.$el.clientHeight,
      })
        .then(canvas => {
          this.dataUrl = canvas.toDataURL('image/png')
          this.isInit = true
          console.log(this.dataUrl)
        })
    },

  },
}
</script>

<style scoped lang="less">
.dialog {
  max-height: 80vh;
  overflow: scroll;
}
.content {
  padding: 0.2rem;

  .banner {
    width: 100%;
    max-height: 1.5rem;
  }

  .summary {
    margin: .2rem 0;
    font-family: initial;
    font-size: .16rem;
  }

  .bottom {
    display: flex;
    align-items: center;

    .tip {
      flex-grow: 1;
      word-break: break-all;
    }

    .qrcode {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }
  }
}
.image {
  width: 100%;
  height: 100%;
}
</style>

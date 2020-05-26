<template>
  <div class="WebcamLive">

    <nav-bar
      class="header"
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="$router.back()" />

    <more-tabs class="class-tabs" v-model="currentLiveIndex" :list="liveNameList" size="small" :show-dropdown="false" />

    <p v-if="isEmpty(liveList)" class="tip">暂时没有监控列表</p>
    <div v-else class="content">
      <van-loading v-show="loading" class="loading" />
      <p v-show="currentLiveItem && currentLiveItem.message" class="tip">{{ currentLiveItem.message }}</p>
      <video-player
        v-show="currentLiveItem && currentLiveItem.url"
        :options="playerOptions"
        class="video video-player vjs-custom-skin vjs-big-play-centered"
        ref="video"
      />
    </div>

  </div>
</template>

<script>
import { NavBar, Loading } from 'vant'
import { getWebcamLiveList, getLiveUrl } from '@/api/school/webcam-live'
import moreTabs from '@/components/common/more-tabs'
import videoPlayer from '@/components/common/video-player'
import { isEmpty } from '@/utils'

import 'videojs-contrib-hls'

export default {
  name: 'WebcamLive',
  components: {
    NavBar,
    vanLoading: Loading,
    moreTabs,
    videoPlayer,
  },
  data() {
    return {
      loading: false,
      currentLiveIndex: 0,
      liveList: [],
      playerOptions: {
        width: window.innerWidth,
        height: window.innerHeight - 0.4 * window.rem - 46,
        muted: false,
        language: 'zh-CN',
        sources: [],
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          volumeBar: false,
        },
        html5: {
          hls: {
            withCredentials: false,
          }
        },
        liveui: true,
        autoplay: false,
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
      },

    }
  },
  mounted() {
    this.$loading()
    getWebcamLiveList()
      .then(response => {
        if (response.data.meta.success) {
          this.liveList = response.data.data
          this.checkAndStartLive()
        }
      })
      .finally(() => {
        this.$loadingHide()
      })
  },
  computed: {
    liveNameList() {
      return this.liveList.map(live => live.name)
    },
    playerWidth() {
      return window.innerWidth
    },
    playerHeight() {
      return window.innerHeight - 0.4 * window.rem - 46
    },
    currentLiveItem() {
      return this.liveList[this.currentLiveIndex] ? this.liveList[this.currentLiveIndex] : {}
    },
  },
  watch: {
    currentLiveIndex() {
      this.checkAndStartLive()
    }
  },
  methods: {
    startLive() {
      if (isEmpty(this.currentLiveItem) || isEmpty(this.currentLiveItem.url)) {
        return
      }
      const url = this.currentLiveItem.url
      this.playerOptions.sources = [{
        type: 'application/x-mpegURL',
        src: url,
        withCredentials: false,
        handleManifestRedirects: true,
      }]
    },
    getUrl(index) {
      this.loading = true
      const cameraId = this.liveList[index].cameraId
      return getLiveUrl(cameraId)
        .then(response => {
          if (response.data.meta.success) {
            Object.entries(response.data.data)
              .forEach(([key, value]) => {
                this.liveList[index][key] = value
              })
          }
        })
        .finally(() => this.loading = false)
    },
    checkAndStartLive() {
      if (isEmpty(this.liveList[this.currentLiveIndex])) {
        return
      }
      if (!isEmpty(this.liveList[this.currentLiveIndex].url)) {
        this.startLive()
        return
      }

      this.getUrl(this.currentLiveIndex)
        .then(this.startLive)
    },
  },
}
</script>

<style src="@/../node_modules/video.js/dist/video-js.css"></style>
<style>
.WebcamLive {
  font-size: .16rem;
}
.loading {
  margin: .4rem auto;
}
.tip {
  text-align: center;
  word-wrap: break-word;
  word-break: break-all;
  margin: .4rem .2rem;
}
.content {
  max-width: 100vw;
  max-height: 100vh;
}
</style>

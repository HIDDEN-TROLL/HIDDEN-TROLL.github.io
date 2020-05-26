<template>
  <div class="voice-record">
    <div v-show="!onlyPlay && !voiceLocalId" class="record" :class="{ recording: isRecording }" @touchstart="startRecord" @touchend="stopRecord">
      <div class="icon voice" :class="{ animated: isRecording }">
        <div class="l1"></div>
        <div class="l2"></div>
        <div class="l3"></div>
      </div>
      <span class="text">{{ text }}</span>
    </div>
    <div v-show="voiceLocalId" class="play" @click="togglePlay">
      <div class="icon voice" :class="{ animated: isPlaying }">
        <div class="l1"></div>
        <div class="l2"></div>
        <div class="l3"></div>
      </div>
      <span class="text">{{ isPlaying ? playingText : '点击播放' }}</span>
    </div>
    <span v-show="!onlyPlay && voiceLocalId" class="delete" @click="deleteVoice">
      <van-icon class="icon" name="close"/>
    </span>

    <audio ref="audioElement" :src="voiceLocalId" @ended="onAudioElementEnded" @timeupdate="onAudioElementTimeUpdate"></audio>

    <van-popup v-if="usePopup" :value="isRecording" @close="stopRecord">
      <p class="popup-text">正在录音...</p>
    </van-popup>
  </div>
</template>

<script>
import { Icon } from 'vant'
import wx from 'weixin-js-sdk'
import { isEmpty } from '@/utils'
import { Popup } from 'vant'

export default {
  name: 'voice-record',
  props: {
    text: {
      type: String,
      default: '长按开始录音',
    },
    value: {
      type: String,
      default: null,
    },
    onlyPlay: {
      type: Boolean,
      default: false,
    },
    usePopup: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    vanIcon: Icon,
    vanPopup: Popup,
  },
  data() {
    return {
      voiceLocalId: null,
      voiceServerId: null,
      isPlaying: false,
      playingText: '正在播放...',

      recordStartAt: 0,
      recordTimer: 0,
      isRecording: false,

      audioElement: this.$refs['audioElement']
    }
  },
  created() {
    this.$store.dispatch('initJSSDK')
    if (!isEmpty(this.value)) {
      this.voiceLocalId = this.value
    }
  },
  mounted() {
    this.audioElement = this.$refs['audioElement']
  },
  watch: {
    value() {
      if (isEmpty(this.value)) {
        this.voiceLocalId = null
        this.voiceServerId = null
      } else {
        this.voiceLocalId = this.value
        this.voiceServerId = null
      }
    },
    voiceLocalId(newValue, oldValue) {
      if (newValue !== oldValue) {
        console.log('watch voiceLocalId emit')
        this.$emit('input', this.voiceLocalId)
        this.$emit('change', this.voiceLocalId)
      }
    },
  },
  methods: {
    startRecord(event) {
      console.log('methods startRecord start')
      event.preventDefault()
      if (this.isRecording === true) {
        // this.$toast('已经在录音了')
        return
      }
      this.recordStartAt = new Date().getTime()
      console.log(this.recordStartAt)
      this.recordTimer = setTimeout(() => {
        console.log('wx.startRecord')
        wx.startRecord({
          success: () => {
            console.log('wx.startRecord success')
            this.isRecording = true
          },
          cancel: () => {
            alert('用户拒绝授权录音')
          },
        })
        wx.onVoiceRecordEnd({
          complete: (res) => {
            this.voiceLocalId = res.localId
            this.isRecording = false
          },
        })
      }, 500)
      console.log('methods startRecord end')
    },
    stopRecord(event) {
      console.log('methods stopRecord start')
      if (event) {
        event.preventDefault()
      }
      const recordStopAt = new Date().getTime()
      console.log('methods stopRecord timestamp', recordStopAt, this.recordStartAt, recordStopAt - this.recordStartAt)
      if (!this.isRecording || (recordStopAt - this.recordStartAt) < 500) {
        console.log('methods stopRecord clearTimeout')
        clearTimeout(this.recordTimer)
      } else {
        console.log('wx.stopRecord')
        wx.stopRecord({
          success: (res) => {
            console.log('wx.stopRecord success')
            this.voiceLocalId = res.localId
            this.isRecording = false
          },
          fail: (res) => {
            console.log('wx.stopRecord fail', res)
          },
        })
      }
      console.log('methods stopRecord end')
    },

    togglePlay() {
      if (this.voiceLocalId === null) {
        return
      }

      if (this.voiceLocalId.startsWith('http')) {
        if (!this.isPlaying) {
          this.isPlaying = true
          this.$refs['audioElement'].play()
        } else {
          this.isPlaying = false
          this.$refs['audioElement'].pause()
        }
        return
      }

      if (!this.isPlaying) {
        console.log('wx.playVoice')
        this.isPlaying = true
        wx.playVoice({
          localId: this.voiceLocalId,
        })
        wx.onVoicePlayEnd({
          success: () => {
            console.log('wx.onVoicePlayEnd')
            this.isPlaying = false
          },
          error: (e) => {
            console.log(e, arguments)
            this.$toast('播放语音出错')
            this.isPlaying = false
          },
        })
      } else {
        console.log('wx.stopVoice')
        this.isPlaying = false
        wx.stopVoice({
          localId: this.voiceLocalId,
        })
      }
    },
    deleteVoice() {
      this.isPlaying = false
      this.voiceLocalId = null
      this.voiceServerId = null
    },
    onAudioElementTimeUpdate() {
      const second = Math.round(this.audioElement.duration - this.audioElement.currentTime)
      this.playingText = second + 's'
    },
    onAudioElementEnded() {
      this.isPlaying = false
    },

    // upload() {
    //   this.isPlaying = false
    //   this.$loading('正在上传语音...')
    //
    //   return new Promise((resolve, reject) => {
    //     if (this.voiceServerId !== null) {
    //       resolve(this.voiceServerId)
    //       return
    //     }
    //
    //     wx.uploadVoice({
    //       localId: this.voiceLocalId,
    //       isShowProgressTips: 1, // 默认为1，显示进度提示
    //       success: (res) => {
    //         console.log('wx.uploadVoice')
    //         this.voiceServerId = res.serverId; // 返回音频的服务器端ID
    //         resolve(this.voiceServerId)
    //         this.$loadingHide()
    //       },
    //       error: (e) => {
    //         console.log(e, arguments)
    //         this.$toast('上传语音出错')
    //         reject()
    //         this.$loadingHide()
    //       },
    //     })
    //   })
    // },
  },
}
</script>

<style scoped lang="less">
@keyframes icon-voice-play
{
  0% { opacity: 0; }
  /*5% { opacity: 1; }*/
  /*6% { opacity: 0; }*/
  /*100% { opacity: 0; }*/
}
.icon.voice {
  @size: 0.3rem;
  @size2: @size/2/6;
  @size3: @size/2/6;
  width: @size;
  height: @size;
  position: relative;
  box-sizing: border-box;
  user-select: none;

  &.animated {
    .l1, .l2 {
      animation: icon-voice-play 1s infinite;
    }
    .l2 {
      animation-delay: 800ms;
    }
  }

  .l1, .l2, .l3 {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;
    border-radius: 50%;
    border-style: solid;
    border-color: transparent;
  }

  .l1 {
    border-width: @size2;
  }
  .l2 {
    border-width: @size2 * 3;
  }
  .l3 {
    border-width: @size2 * 5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .l1:after,
  .l2:after,
  .l3:after {
    content: '';
    height: 100%;
    width: 100%;
    border-radius: 50%;
    border-width: @size3;
    border-style: solid;
    border-left-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-right-color: currentColor;
    display: block;
    box-sizing: border-box;
  }
}
.voice-record {
  width: 100%;
  height: .35rem;
  user-select: none;
  margin: .1rem 0;
  display: flex;
  align-items: center;

  .record, .play {
    background-color: #CEE7A8;
    width: 1.5rem;
    font-size: .14rem;
    height: 100%;
    line-height: .35rem;
    position: relative;
    z-index: 2;
    border-radius: .04rem;

    display: inline-flex;
    align-items: center;

    &:before {
      content: '';
      position: absolute;
      top: 0.12rem;
      right: 100%;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0.05rem;
      border-color: transparent #CEE7A8 transparent transparent;
      z-index: 1;
    }

    &.recording, &:active {
      opacity: .5;
    }

    .text {
      margin-left: .1rem;
    }

  }

  .delete {
    display: inline-block;
    padding: 0 .1rem;
  }

  .popup-text {
    padding: .1rem .2rem;
  }
}

</style>

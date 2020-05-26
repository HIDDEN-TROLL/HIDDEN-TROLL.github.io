<template>
  <div id="player-component" v-if="state">
    <!--简易视频播放-->
    <div class="player">
      <video :src="videoUrl" controls :poster="poster">
        您的浏览器不支持视频播放
      </video>
      <!--<video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @statechanged="playerStateChanged($event)"
                    @ready="playerReadied"
                    @ended="onPlayerEnded($event)"
                    @loadeddata="onPlayerLoadeddata($event)"
                    @waiting="onPlayerWaiting($event)"
                    @playing="onPlayerPlaying($event)"
                    @timeupdate="onPlayerTimeupdate($event)"
                    @canplay="onPlayerCanplay($event)"
                    @canplaythrough="onPlayerCanplaythrough($event)"
      >
      </video-player>-->
      <span class="close-play" @click="hidePlayer"><van-icon name="cross" /></span>
      <!--<span class="start-play" v-show="playerShow" @click="onPlayerPlay"><van-icon name="play-circle-o" /></span>
      <span class="end-play" v-show="endShow"><van-icon name="ause-circle-o" /></span>-->
    </div>
  </div>
</template>

<script>
  import { Icon } from 'vant';
  /*import { videoPlayer } from 'vue-video-player'
  import '../../../node_modules/video.js/dist/video-js.css'
  import '../../../node_modules/vue-video-player/src/custom-theme.css'*/
  /*import videojs from 'video.js'*/
  export default {
    name: "player",
    components:{
      [Icon.name]:Icon
    },
    props: {
      videoUrl: String,
      state: Boolean,
      poster:String
    },
    data () {
      return {
        playerShow:false,
        endShow:false,
        /*playerOptions: {
          /!*height: '360',*!/
          controls:true,
          autoplay: false,
          muted: true,
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",
            // mp4
            src: this.videoUrl,
            // webm
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          width: document.documentElement.clientWidth,
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        }*/
      }
    },
    /*watch: {
//更改视频源 videoUrl从弹出框组件传值
      videoUrl: function (val) {
        if (val !== '') {
          this.$refs.videoPlayer.player.src(val)
        }
      },
//弹出框关闭后暂停 否则一直在播放 state从弹出框组件传值

      state: function (val) {
        if (val) {
          this.$refs.videoPlayer.player.pause()
        }
      }
    },*/
    methods: {
      /*onPlayerPlay (player) {
        //console.log(player)
        if (player.paused){
          player.play();
          this.playerShow = false;
          this.endShow = false;
        }
      },
      onPlayerPause (player) {
        player.pause()
      },
      playerStateChanged (player) {
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      playerReadied(player) {
        // seek to 10s
       // console.log('example player 1 readied', player);
        player.currentTime()
        // console.log('example 01: the player is readied', player)
      },*/
      hidePlayer(){
        this.$emit('hidePlay',false)
      }
    },
    /*computed: {
      player () {
        return this.$refs.videoPlayer.player
      }

    },
    mounted(){
      this.playerOptions.autoplay = true;
      this.player.muted(false)
      /!*setTimeout(() => {
        //console.log('dynamic change options', this.player);

      }, 5000)*!/
    }*/
  }
</script>

<style lang="less">
  #player-component {
    width: 100%;
    position: fixed;
     background-color: #efefef;
    top: 0;
    left: 0;
     min-height: 100%;
     z-index: 1000;
    .player{
      width: 100%;
      height: 80%;
      font-size: 0.14rem;
      /*.video-player>div{
        padding: 0;
      }
      .vjs-big-play-button{
        display: none;
      }
      .vjs-control-bar{
        display: none;
      }
      .vjs-modal-dialog-content{
        display: none;
      }
      .vjs-close-button{
        display: none;
      }*/
    }
    video{
      width: 100%;
      max-height: 80%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    video::-webkit-media-controls {
      overflow: hidden !important;
    }
    video::-webkit-media-controls-enclosure {
      width: calc(100% + 0.3rem);
      margin-left: auto;
    }
    .close-play{
      position: absolute;
      font-size: 0.2rem;
      color: #000;
      top: 0.15rem;
      left: 0.15rem;
    }
    .start-play,.end-play{
      font-size: 0.24rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 0.24rem;
      height: 0.24rem;
    }
   }
</style>
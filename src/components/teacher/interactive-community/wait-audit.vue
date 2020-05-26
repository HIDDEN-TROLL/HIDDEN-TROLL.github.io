<template>
  <div id="wait-audit">
    <!--等待审核-->
    <div class="go-back">
      <van-nav-bar
        title="等待审核中"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content" v-if="list.length > 0">
      <div class="audit-list">
        <div class="list" v-for="(item,index) in list" :key="index">
          <div class="top-box">
            <span class="submit-time">提交时间：{{item.date}}</span>
            <span class="content-type">{{item.type}}</span>
          </div>
          <div class="list-main">
            <p class="text">{{item.content}}</p>
            <div class="img-content" v-if="item.imgUrl.length > 0">
              <div class="file-box" v-for="(subitem,subindex) in item.imgUrl" :key="subindex">
                <img :src="subitem" alt="" @click="preview(item.imgUrl,subindex)">
              </div>
            </div>
            <div class="video-content" v-if="item.video&&JSON.stringify(item.video)!=='{}' && !(Array.isArray(item.video))">
              <div class="file-box" @click="playerVideo(item.video.url, item.video.image)">
                <video :src="item.video.url" :poster="item.video.image" class="set-viode-poster"> 您的浏览器不支持 video 标签。</video>
                <span class="close-play"><van-icon name="play-circle-o"/></span>
              </div>
            </div>
          </div>
          <div class="footer-box">
            <van-row>
              <van-col span="12">
                <router-link :to="{name:'TeacherCommunityModifyCommunity',params:{id:item.communityId}}">
                  <div>修改</div>
                </router-link>
              </van-col>
              <van-col span="12">
                <div @click="undoDynamic(item.communityId)">撤回审核申请</div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
    <!--视频播放-->
    <Player v-on:hidePlay="hidePlay" :state="palyerShow" :video-url="videoUrl" :poster="poster" v-if="palyerShow"></Player>
  </div>
</template>

<script>
import { NavBar, Icon, Row, Col, ImagePreview, Toast } from 'vant';
import Player from '../../common/player'
import { dynamicAudit } from '@/api/teacher/community'
import { undoInfo } from '@/api/school/community'

export default {
  name: "wait-audit",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]: Toast,
    Player: Player,
  },
  data() {
    return {
      list: [],
      palyerShow: false,//弹框视频播放
      videoUrl: "",//视频播放地址
      poster:"",
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    auditList() {
      this.$loading()
      dynamicAudit()
        .then(res => {
          this.$loadingHide()
          //console.log(res)
          if (res.status === 200) {
            this.list = res.data.data;
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    //图片预览
    preview(imgArr, index) {
      ImagePreview({
        images: imgArr,
        startPosition: index ? index : 0,
        lazyLoad: false,
      });
    },
    //关闭视频
    hidePlay(bl) {
      this.palyerShow = bl
    },
    //播放视频
    playerVideo(url, pos) {
      this.videoUrl = url;
      this.poster = pos;
      let timer = setTimeout(() => {
        this.palyerShow = true;
        clearTimeout(timer)
      }, 500)
    },
    //撤回审核申请
    undoDynamic(id) {
      this.$dialog.confirm({
        title: '提示',
        message: '确定撤销当前动态？',
      }).then(() => {
        // on confirm
        this.undoInterface(id)
      }).catch(() => {
        // on cancel
      });
    },
    undoInterface(id) {
      this.$loading()
      undoInfo(id)
        .then(res => {
        this.$loadingHide()
        if (res.data.meta && res.data.meta.code === 0) {
          Toast.success("撤销成功");
          this.auditList()
        } else {
          Toast.fail("撤销失败！")
        }
      }).catch(() => {
        throw new Error("异常！")
      })
    },
  },
  created() {
    this.auditList()
  },
}
</script>

<style scoped lang="less">
#wait-audit {
  font-size: 0;
  background-color: #fff;

  .go-back {
    .van-nav-bar {
      background-color: #3770FB;

      .van-icon {
        font-size: 0.22rem;
        color: #fff;
      }

      .van-nav-bar__text {
        font-size: 0.16rem;
        line-height: 0.22rem;
        color: #fff;
        font-weight: 400;
      }

      .van-nav-bar__title {
        color: #fff;
        font-weight: 400;
      }
    }
  }

  .content {
    width: 100%;
    background-color: #f3f7f8;

    .audit-list {
      .list {
        background-color: #fff;
        margin-bottom: 0.1rem;
        padding: 0 0.16rem 0.1rem;

        .top-box {
          overflow: hidden;
          line-height: 0.44rem;
          border-bottom: 0.02rem solid #eee;

          .submit-time {
            float: left;
            font-size: 0.14rem;
            color: #666;
          }

          .content-type {
            float: right;
            font-size: 0.14rem;
            color: #333;
          }
        }

        .list-main {
          padding-top: 0.13rem;

          .text {
            font-size: 0.14rem;
            color: #666;
            line-height: 0.2rem;
          }

          .img-content, .video-content {
            overflow: hidden;

            .file-box {
              float: left;
              width: 0.9rem;
              height: 0.9rem;
              margin-top: 0.1rem;
              margin-right: 0.1rem;

              img, video {
                float: left;
                width: 100%;
                height: 100%;
              }
              video{
                object-fit: fill
              }
            }
          }

          .video-content {
            .file-box{
              position: relative;
              .close-play {
                font-size: 0.2rem;
                color: #fff;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 0.18rem;
                height: 0.18rem;
              }
            }

          }

        }

        .footer-box {
          width: 100%;
          height: 0.4rem;
          padding: 0.08rem 0;
          margin-top: 0.14rem;
          background-color: #53ACF8;
          box-sizing: border-box;

          .van-col {
            flex: 1;
            font-size: 0.14rem;
            color: #fff;
            line-height: 0.24rem;
            text-align: center;
            border-left: 0.01rem solid #fff;
          }

          .van-col:first-child {
            border-left-width: 0;
          }
        }
      }
    }
  }
}
</style>

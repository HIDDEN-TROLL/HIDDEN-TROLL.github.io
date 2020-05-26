<template>
  <div id="audit">
    <!--等待审核-->
    <div class="go-back">
      <van-nav-bar
        title="待审核"
        :left-text="!isFromTemplate ? '返回' : ''"
        :left-arrow="!isFromTemplate"
        @click-left="$router.back()"
      />
    </div>
    <div class="content" v-if="list.length>0">
      <div class="audit-list">
        <div class="list" v-for="(item,index) in list" :key="index">
          <div class="top-box">
            <span class="submit-time">提交时间：{{item.date}}</span>
            <span class="content-type">{{item.type}}</span>
          </div>
          <div class="list-main">
            <div class="awator">
              <img :src="item.avatar" alt="">
            </div>
            <div class="rg-con">
              <h4>{{item.name}}</h4>
              <p class="text">{{item.content}}</p>
              <div class="img-content" v-if="item.imgUrl.length>0">
                <div class="file-box" v-for="(subval, subindex) in item.imgUrl" :key="subindex">
                  <img :src="subval" alt="" @click="preview(item.imgUrl, subindex)">
                </div>
              </div>
              <div class="video-content" v-if="item.video&&JSON.stringify(item.video)!=='{}' && !(Array.isArray(item.video))">
                <div class="file-box" @click="playerVideo(item.video.url, item.video.image)">
                  <video :src="item.video.url" :poster="item.video.image">您的浏览器不支持 video 标签。</video>
                  <span class="play-video"><van-icon name="play-circle-o"/></span>
                </div>
              </div>
              <div class="view-scoped">
                <span class="title">可见范围：</span>
                <div class="li-con" v-if="item.range.length>0">
                  <p class="text">{{scopedClassList(item.range)}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-box">
            <van-row>
              <van-col span="12">
                <div @click="auditConfirm(item.communityId,1)">通过</div>
              </van-col>
              <van-col span="12">
                <div @click="auditReject(item.communityId,2)">驳回</div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
    <Player v-on:hidePlay="hidePlay" :state="palyerShow" :video-url="videoUrl" :poster="poster" v-if="palyerShow"></Player>
  </div>
</template>

<script>
import { NavBar, Icon, Row, Col, ImagePreview, Toast } from 'vant';
import Player from '../../common/player'
import { auditList, submitResult } from '@/api/school/community'
import { getParamFromUrlAndRoute } from '@/utils'

export default {
  name: "audit",
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
      list: [],//保存列表数据
      palyerShow: false,//视频弹出框显示
      videoUrl: '',//视频地址
      poster:"",

      isFromTemplate: false,
      templateId: 0,
    }
  },
  methods: {
    //获取列表数据
    selectAuditList() {
      this.$loading();
      auditList(this.templateId)
        .then(res => {
          this.$loadingHide();
          //console.log(res);
          if (res.status === 200) {
            if (res.data.data.length > 0) {
              this.list = res.data.data
            }
          }
        }).catch(() => {
        throw new Error("异常!")
      })
    },
    //审核通过
    auditConfirm(id, type) {
      // 每天10点-12点 16点-18点期间禁止发送审核社区
      // if ([10, 11, 16, 17].includes(new Date().getHours())) {
      //   this.$toast('由于当前发送社区人数较多，现发送会影起延迟或发送失败，请稍等30分钟后再发送或审核')
      //   return
      // }

      this.$dialog.confirm({
        title: '提示',
        message: '确定提交？',
      }).then(() => {
        // on confirm
        this.interface(id, type)
      }).catch(() => {
        // on cancel
      });
    },
    //审核驳回
    auditReject(id, type) {
      this.$dialog.confirm({
        title: '提示',
        message: '确定驳回？',
      }).then(() => {
        // on confirm
        this.interface(id, type)
      }).catch(() => {
        // on cancel
      });
    },
    interface(id, type) {

      submitResult(id, { status: type })
        .then(res => {

          //console.log(res);
          if (res.status === 200) {
            if (res.data.data) {
              if (res.data.meta.code === 0) {
                if (type === 1){
                  Toast.success("审核通过成功");
                }
                else{
                  Toast.success("审核驳回成功")
                }
                 this.list = this.list.filter(item=>item.communityId !== id)
                //console.log(this.list)
              } else {
                Toast.fail(res.data.data.message)
              }
            } else {
              if (type === 1)
                Toast.fail("审核通过失败，可能是由于该条动态已被修改或者撤销");
              else
                Toast.fail("审核驳回失败，可能是由于该条动态已被修改或者撤销")
            }
            //this.selectAuditList();
          }
        }).catch(() => {
        throw new Error("异常!")
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
  },
  created() {
    const templateId = getParamFromUrlAndRoute('template_id', this.$router)
    if (templateId) {
      this.isFromTemplate = true
      this.templateId = templateId
    }

    this.selectAuditList();
  },
  computed: {
    scopedClassList() {
      return (listArr) => {
        let jArr = listArr.join(', ');
        return jArr
      }
    },
  },

}
</script>

<style scoped lang="less">
#audit {
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
          overflow: hidden;

          .awator {
            float: left;
            width: 0.42rem;
            height: 0.42rem;
            margin-right: 0.1rem;

            img {
              width: 100%;
              height: 100%;
              float: left;
            }
          }

          .rg-con {
            float: left;
            width: 2.9rem;

            h4 {
              font-size: 0.16rem;
              color: #333;
              line-height: 0.2rem;
              margin-bottom: 0.04rem;
            }

            .text {
              font-size: 0.14rem;
              color: #666;
              line-height: 0.2rem;
            }

            .img-content, .video-content {
              overflow: hidden;
              margin-right: -0.09rem;
              .file-box {
                position: relative;
                float: left;
                width: 0.9rem;
                height: 0.9rem;
                margin-top: 0.1rem;
                margin-right: 0.09rem;

                img, video {
                  float: left;
                  width: 100%;
                  height: 100%;
                }
                video{
                  object-fit: fill
                }

                .play-video {
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

            .view-scoped {
              margin-top: 0.1rem;

              .title {
                float: left;
                font-size: 0.12rem;
                color: #999;
                line-height: 0.18rem;
              }

              .li-con {
                float: left;
                max-width: 2.2rem;
                font-size: 0.12rem;
                color: #999;
                line-height: 0.18rem;
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

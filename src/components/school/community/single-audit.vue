<template>
  <div id="single-audit">
    <!--校长单条审核-->
    <div class="go-back">
      <van-nav-bar
        title="待审核"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="content" v-if="list.length>0 && list[0].status === 1">
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
              <div class="video-content" v-if="item.video">
                <div class="file-box" @click="playerVideo(item.video)">
                  <video :src="item.video">您的浏览器不支持 video 标签。</video>
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
            <van-row v-if="item.checkStatus===0">
              <van-col span="12">
                <div @click="auditConfirm(item.communityId,1)">通过</div>
              </van-col>
              <van-col span="12">
                <div @click="auditReject(item.communityId,2)">驳回</div>
              </van-col>
            </van-row>
            <div class="throgh" style="font-size: 0.14rem;color: #333;text-align: right">
              {{item.checkStatus===1?'已审核通过':item.checkStatus===2?'未审核通过':''}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="prompt" v-if="list.length>0 && list[0].status === 1">该社区动态已被 {{list[0].name}} 撤回无需审核</div>
    <Player v-on:hidePlay="hidePlay" :state="palyerShow" :video-url="videoUrl" v-if="palyerShow"></Player>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import { NavBar, Icon, Row, Col, ImagePreview, Toast } from 'vant';
import Player from '../../common/player'
import FooterBtn from '../../common/footer-operate-btn'
import { singleAudit, submitResult } from '@/api/school/community'

export default {
  name: "single-audit",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]: Toast,
    Player: Player,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      list: [],//保存列表数据
      palyerShow: false,//视频弹出框显示
      videoUrl: '',//视频地址
      btnText: [{
        type: 1,
        title: '查看全部等待审核的社区动态',
      }],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    //获取列表数据
    selectAuditList() {

      singleAudit(this.$route.params.id)
        .then(res => {

          //console.log(res);
          this.list = [];
          if (res.status === 200) {
            if (res.data.data.length > 0) {
              this.list.push(res.data.data)
            }
          }
        }).catch(() => {
        throw new Error("异常!")
      })
    },
    //审核通过
    auditConfirm(id, type) {
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
            if (res.data.meta && res.data.meta.code === 0) {
              if (res.data.data.code === 0) {
                if (type === 1)
                  Toast.success("审核通过成功");
                else
                  Toast.success("审核驳回成功")
              } else {
                Toast.fail(res.data.data.message)
              }
            } else {
              if (type === 1)
                Toast.fail("审核通过失败，可能是由于该条动态已被修改或者撤销");
              else
                Toast.fail("审核驳回失败，可能是由于该条动态已被修改或者撤销")
            }
            this.selectAuditList();
          }
        }).catch(() => {
        throw new Error("异常!")
      })
    },
    operateBtn() {
      this.$router.push({ name: 'Audit' })
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
    playerVideo(url) {
      this.videoUrl = url;
      let timer = setTimeout(() => {
        this.palyerShow = true;
        clearTimeout(timer)
      }, 500)
    },
  },
  created() {
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
#single-audit {
  font-size: 0;
  background-color: #fff;
  position: relative;

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

              .file-box {
                position: relative;
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

                .play-video {
                  font-size: 0.16rem;
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

  .prompt {
    width: 80%;
    font-size: 0.16rem;
    color: #333;
    font-weight: 500;
    text-align: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>

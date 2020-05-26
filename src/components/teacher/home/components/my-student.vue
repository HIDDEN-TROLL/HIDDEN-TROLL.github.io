<template>
  <div class="content">
    <div class="list flower-content">
      <IconTitle icon-class="icon-wodexuesheng #3770fb" :content="title"></IconTitle>
      <div class="flower-main">
        <div class="reward-flower">
          <div class="flower">
            <span v-for="(item, index) in bindHighLight" :key="index">
              <i class="icons iconfont icon-xuesheng highlight"></i>
            </span>
            <span v-for="(item, index) in bindLowLight" :key="index+200">
              <i class="icons iconfont icon-xuesheng lowlight"></i>
            </span>
            <span v-for="(item, index) in bindPadding" :key="index+300" class="transparent">
              <i class="icons iconfont icon-xuesheng lowlight"></i>
            </span>
          </div>
          <span class="flower-text">共{{extra.studentCount}}人</span>
        </div>
        <div class="punishment-flower">
          <div class="flower">
            <span v-for="(item, index) in unbindHighLight" :key="index+400">
              <i class="icons iconfont icon-xuesheng highlight"></i>
            </span>
            <span v-for="(item, index) in unbindLowLight" :key="index+500">
              <i class="icons iconfont icon-xuesheng lowlight"></i>
            </span>
            <span v-for="(item, index) in unbindPadding" :key="index+600" class="transparent">
              <i class="icons iconfont icon-xuesheng lowlight"></i>
            </span>
          </div>
          <span class="flower-text">未绑定{{extra.unbindStudentCount}}人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconTitle from '@/components/common/icon-title';

export default {
  name: 'MyStudent',
  components: {
    IconTitle,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: () => {
      },
      type: Object,
    },
  },
  data() {
    return {
      bindHighLight: 0,
      bindLowLight: 0,
      bindPadding: 0,
      unbindHighLight: 0,
      unbindLowLight: 0,
      unbindPadding: 0,
    }
  },
  mounted() {
    this.bindHighLight = Math.floor(this.extra.studentCount / 10)
    this.bindLowLight = this.extra.studentCount % 10
    this.unbindHighLight = Math.floor(this.extra.unbindStudentCount / 10)
    this.unbindLowLight = this.extra.unbindStudentCount % 10
    const max = Math.max(this.bindHighLight + this.bindLowLight, this.unbindHighLight + this.unbindLowLight)
    this.bindPadding = max - (this.bindHighLight + this.bindLowLight);
    this.unbindPadding = max - (this.unbindHighLight + this.unbindLowLight);
  }
}
</script>

<style scoped lang="less">
.content {
  font-size: 0;
  background-color: #f3f7f8;
  text-align: left;
  padding-bottom: .1rem;
  margin: 0.32rem 0 0 0;

  .title {
    font-size: 0.14rem;
    line-height: 0.28rem;
    margin: 0 0.45rem 0;
    text-align: center;
    border-radius: 1rem;
    color: #fff;
    background-color: #3770fb;
    box-sizing: border-box;
  }

  .list {
    padding: 0.16rem 0.15rem;
    background-color: #fff;
    margin-bottom: 0.1rem;
    box-sizing: border-box;

    #icon-title {
      display: block;
      margin-bottom: 0.15rem;
      text-align: left;

      .theme {
        line-height: 0.22rem;

        .icons {
          font-size: 0.16rem;
          position: relative;
          top: 0.02rem;
        }

        .text {
          font-size: 0.16rem;
          font-weight: 500;
          margin-left: 0.08rem;
          color: #333;
        }
      }
    }
  }

  .list:last-child {
    margin-bottom: 0;
  }

  .homework-content {
    .teacher-check {
      margin-top: 0.33rem;
      overflow: hidden;
      line-height: 0.2rem;

      .left {
        float: left;
        font-size: 0.14rem;
      }

      .check-text {
        color: #666;
        margin-left: 0.04rem;
      }

      .right {
        float: right;
        font-size: 0.14rem;
        color: #999;
      }
    }
  }

  .flower-content {
    .flower-main {
      overflow: hidden;

      .reward-flower {
        float: left;
        width: 50%;
        box-sizing: border-box;

        .flower {
          word-wrap: break-word;
          width: 100%;
          margin-bottom: 0.15rem;
          border-right: 0.01rem solid #f1f1f1;
          padding-right: .24rem;
          box-sizing: border-box;

          span {
            font-size: 0.16rem;
            margin-left: 0.02rem;

            .highlight {
              font-size: 0.16rem;
              color: #d80000;
            }

            .lowlight {
              font-size: 0.16rem;
              color: #ff8700;
            }
          }
        }

        .flower-text {
          font-size: 0.14rem;
          color: #666;
          line-height: 0.2rem;
          padding-left: 0.02rem;
        }
      }

      .punishment-flower {
        float: left;
        width: 50%;
        box-sizing: border-box;

        .flower {
          word-wrap: break-word;
          width: 100%;
          margin-bottom: 0.15rem;
          padding-left: 0.28rem;
          box-sizing: border-box;

          span {
            font-size: 0.16rem;
            margin-left: 0.02rem;

            .highlight {
              font-size: 0.16rem;
              color: #5f5f5f;
            }

            .lowlight {
              font-size: 0.16rem;
              color: #adadad;
            }
          }
        }

        .flower-text {
          font-size: 0.14rem;
          color: #666;
          line-height: 0.2rem;
          padding-left: 0.28rem;
        }
      }
    }
  }
}

.icon-list {
  display: block;
  text-align: left;
  .icon-f {
    font-size: 0.16rem;
    color: #f00;
  }
}
.transparent {
  opacity: 0;
}
</style>

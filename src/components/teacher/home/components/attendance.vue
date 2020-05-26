<template>
  <div class="content">
    <div class="list">
      <IconTitle icon-class="icon-kaoqin1 #3770fb" :content="title"></IconTitle>
      <div class="detail">
        <div style="height: 0.62rem;overflow: hidden;font-size: 0;width: 3.6rem">
          <div class="attendance">
            <ul class="list-content">
              <li v-for="(item,index) in extra" class="item" :key="index">
                <p
                  class="title"
                >{{ item[0] }}</p>
                <span class="sign" :class="item[1] ? 'signed' : ''">{{ item[1] }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconTitle from '@/components/common/icon-title';

export default {
  name: 'Attendance',
  components: {
    IconTitle,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: () => [],
      type: Array,
    },
  },
}
</script>

<style scoped lang="less">
.content {
  font-size: 0;
  background-color: #f3f7f8;
  text-align: left;
  padding-bottom: .1rem;
  /*margin: 0.32rem 0 0 0;*/

  &>.title {
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
.attendance {
  font-size: 0;
  height: 0.8rem;
  overflow-x: scroll;
  .list-content {
    width: auto;
    overflow-x: scroll;
    white-space: nowrap;
    .item {
      display: inline-block;
      height: 0.62rem;
      border: 0.01rem solid #ededed;
      padding: 0.08rem;
      margin-right: 0.07rem;
      text-align: center;
      border-radius: 0.03rem;
      box-sizing: border-box;
      min-width: .8rem;
      .title {
        text-align: center;
        font-size: 0.14rem;
        line-height: 0.2rem;
        margin-bottom: 0.1rem;
        color: #666;
      }
      .sign {
        color: #999;
        font-size: 0.12rem;
        line-height: 0.17rem;
      }
      .sign.signed {
        color: #84c225;
      }
    }
  }
}
</style>

<template>
  <div>
    <button class="trigger" @click="isShow = true">
      <span>异议</span>
      <br>
      <span>结果</span>
    </button>

    <van-dialog
      v-model="isShow"
      class="feedback-objection-dialog">

      <loading v-show="loading" class="loading" />
      <div v-if="content !== undefined" class="feedback-objection">
        <!--驳回的异议-->
        <div class="objection-title">{{ replyStatus }}</div>
        <div class="objection-time">{{ replyTime }}</div>
        <div class="objection-info">
          <div class="objection-content">
            {{ replyContent }}
          </div>
          <div class="objection-img van-clearfix">
            <img v-for="(url, index) in replyImages" :key="index" :src="url" alt="" @click="preview(index)">
          </div>
        </div>
      </div>

    </van-dialog>
  </div>

</template>

<script>
import { Loading } from 'vant'
import { getLatestFeedback } from '@/api/school/charge'
import { date, previewImage } from '@/utils'

export default {
  name: 'feedback-objection-dialog',
  components: {
    Loading
  },
  props: {
    billId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isShow: false,
      loading: false,
      content: undefined,
    }
  },
  methods: {
    fetchContent() {
      if (!this.billId) {
        this.$toast('参数错误')
        this.isShow = false
        return
      }

      this.loading = true
      getLatestFeedback(this.billId)
        .then(response => {
          if (response.data.meta.success) {
            this.content = response.data.data
          } else {
            this.isShow = false
          }
        })
        .catch(() => {
          this.isShow = false
        })
        .finally(() => { this.loading = false })
    },
    preview(index) {
      previewImage(this.replyImages, index)
    }
  },
  watch: {
    isShow() {
      if (this.isShow && !this.content) {
        this.fetchContent()
      }
    }
  },
  computed: {
    replyStatus() {
      if (this.content) {
        if (this.content.status === 0) {
          return '未审核'
        } else if (this.content.status === 1) {
          return '审核通过'
        } else if (this.content.status === 2) {
          return '审核不通过'
        }
      }
      return ''
    },
    replyTime() {
      if (this.content && this.content.replyTime) {
        return '回复时间：' + date('Y年m月d日 H:i', this.content.replyTime)
      } else {
        return ''
      }
    },
    replyContent() {
      if (this.content && this.content.replyContent) {
        return this.content.replyContent.text
      } else {
        return ''
      }
    },
    replyImages() {
      if (this.content && this.content.replyContent) {
        return this.content.replyContent.images
      } else {
        return []
      }
    },

  }
};
</script>

<style scoped lang="less">
.feedback-objection-dialog {
  font-size: .16rem;
  background-color: #fff;
  padding: 0 .1rem;

  .loading {
    margin: .5rem auto;
    display: flex;
    justify-content: center;
  }
}

.feedback-objection {
  padding: 0.16rem;
  font-size: 0.14rem;
  overflow-y: scroll;
  max-height: 70vh;
  display: flex;
  flex-direction: column;

  .objection-title {
    text-align: left;
    font-size: 0.16rem;
    color: #666;
  }

  .objection-time {
    color: #999;
    font-size: 0.14rem;
    line-height: 0.48rem;
    border-bottom: 1px solid #EEE;
  }

  .objection-info {
    padding-top: 0.1rem;
    flex-grow: 1;
    overflow-y: scroll;

    .objection-content {
      color: #666;
      line-height: 0.3rem;
    }

    .objection-img {
      padding: 0.25rem 0;


      img {
        width: .8rem;
        height: .8rem;
        margin-right: .1rem;
        margin-bottom: .1rem;
        float: left;
      }

    }
  }

  .bottom-tip {
    font-size: 0.12rem;
    color: #999;
  }

}
.trigger {
  position: absolute;
  width: .6rem;
  height: .6rem;
  border: 0;
  border-radius: 50%;
  right: .1rem;
  bottom: .5rem;
  font-size: .14rem;
  background: #3770fb;
  color: #fff;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.2);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
}
.trigger:active {
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.12), 1px 3px 4px rgba(0, 0, 0, 0.2);
}
</style>

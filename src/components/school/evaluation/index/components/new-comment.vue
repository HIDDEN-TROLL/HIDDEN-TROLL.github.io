<template>
  <van-dialog
    v-model="isShow"
    title="新增评语"
    show-cancel-button
    confirm-button-text="新增并选中"
    :before-close="beforeClose">
    <van-field v-model="commentContent" type="text" maxlength="15" placeholder="请输入评语内容"/>
    <div class="add-info">
      <div class="list">
        <span class="c-title">评语范围：</span>
        <span class="c-val">{{ commentTypeText }}</span>
      </div>
      <div class="list">
        <span class="c-title">评语类型：</span>
        <span class="c-val">{{ commentCategoryName }}</span>
      </div>
    </div>
    <van-field
      v-model="commentWorth"
      type="number"
      maxlength="2"
      :label="`${commentTypeText}分值：`"
      placeholder="请输入分值"
      error-message="不可超过99朵"/>
  </van-dialog>
</template>
<script>
import { Field } from 'vant'
import { mapState, mapActions } from 'vuex'
import { isEmpty } from '@/utils'

export default {
  name: 'evaluation_new_comment',
  components: {
    vanField: Field,
  },
  data() {
    return {
      isShow: false,
      commentContent: '',
      commentType: 0,
      commentTypeText: '奖励',
      commentCategoryId: 0,
      commentCategoryName: '',
      commentWorth: 1,
    }
  },
  computed: {
    ...mapState('evaluation', [
      'commentList',
    ]),
  },
  methods: {
    ...mapActions('evaluation', [
      'postNewComment',
    ]),
    show(commentType, commentCategoryId) {
      this.isShow = true

      this.commentType = commentType
      this.commentTypeText = commentType === 0 ? '奖励' : '扣除'
      this.commentCategoryId = commentCategoryId

      const commentTypeKey = commentType === 0 ? 'rewardComment' : 'deductComment'
      const category = this.commentList[commentTypeKey].find(category => category.categoryId === commentCategoryId)
      this.commentCategoryName = category ? category.categoryName : ''

      this.commentContent = ''
      this.commentWorth = 1
    },
    beforeClose(action, done) {
      if (action === 'cancel') {
        return done()
      }

      if (isEmpty(this.commentContent)) {
        this.$toast('请输出评语内容')
        return done(false)
      }
      if (!Number.isInteger(parseInt(this.commentWorth))) {
        this.$toast('请输出正确的评语分值')
        return done(false)
      }
      if (this.commentWorth < 1 || this.commentWorth > 99) {
        this.$toast('正确的评语分值区间为 1-99')
        return done(false)
      }

      this.commentWorth = parseInt(this.commentWorth)

      this.$loading('增加中...')
      this.postNewComment({
        categoryId: this.commentCategoryId,
        type: this.commentType + 1,
        text: this.commentContent,
        worth: this.commentWorth,
      })
        .then(response => {
          if (response.data.meta.success) {
            this.$toast('新增成功')
            done()
          }
        })
        .catch(() => {
          done(false)
        })
        .finally(() => {
          this.$loadingHide()
        })
    },

  },
}
</script>
<style scoped lang="less">
.add-info {
  .list {
    font-size: 0.14rem;
    color: #666;
    line-height: 0.18rem;
    padding: 0.1rem 0.15rem;

    .c-title {
      color: #999;
    }
  }
}
</style>

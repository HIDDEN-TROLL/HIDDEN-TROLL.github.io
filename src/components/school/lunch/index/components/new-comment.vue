<template>
  <van-dialog
    v-model="isShow"
    :title="title"
    show-cancel-button
    confirm-button-text="确定"
    :before-close="beforeClose">

    <van-field v-model="commentContent" type="text" maxlength="15" placeholder="请输入状态"/>

  </van-dialog>
</template>
<script>
import { Field } from 'vant'
import { mapActions } from 'vuex'
import { isEmpty } from '@/utils'

export default {
  name: 'lunch_new_comment',
  components: {
    vanField: Field,
  },
  data() {
    return {
      isShow: false,
      title: '新增状态',
      commentContent: '',
      commentType: 1, // 	类型1午休状态2用餐状态
    }
  },
  methods: {
    ...mapActions('lunch', [
      'postNewComment',
    ]),
    show(commentType) {
      this.isShow = true
      this.commentType = commentType
      this.commentContent = ''
      if (commentType === 1) {
        this.title = '新增「午休状态」'
      } else if (commentType === 2) {
        this.title = '新增「用餐情况」'
      } else {
        this.title = '新增状态'
      }
    },
    beforeClose(action, done) {
      if (action === 'cancel') {
        return done()
      }

      if (isEmpty(this.commentContent)) {
        this.$toast('请输出状态内容')
        return done(false)
      }

      this.$loading('增加中...')
      this.postNewComment({
        type: this.commentType,
        comment: this.commentContent,
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
    }
  },
}
</script>

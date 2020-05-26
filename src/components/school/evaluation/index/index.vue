<template>
  <div class="evaluation" :class="{ fullscreen: isFullscreenSelectStudent }">

    <nav-bar
      class="header"
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      right-text="更多"
      @click-left="$router.back()"
      @click-right="isActionSheetShow = true">
      <icon name="ellipsis" slot="right" size="22px" />
    </nav-bar>

    <div class="content">
      <select-student />
      <select-comment class="fullscreen-hide" />

      <div class="image_uploader fullscreen-hide">
        <div class="title">可上传照片（选填）</div>
        <image-uploader
          class="uploader"
          ref="image-uploader"
          v-model="imageList"
          itemWidth=".5rem"
          upload-immediately/>
      </div>
    </div>

    <button class="footer submit fullscreen-hide" @click="onSubmit">提交保存</button>

    <Actionsheet
      class="action-sheet"
      v-model="isActionSheetShow"
      :actions="actionSheetActions"
      get-container="#app"
      cancel-text="取消"
      @select="onActionSheetSelect"/>
  </div>
</template>

<script>
import { NavBar, Actionsheet, Icon } from 'vant';
import selectStudent from './components/select-student.vue'
import selectComment from './components/select-comment.vue'
import imageUploader from '@/components/common/image-uploader.vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import storeModuleRegister from '@/utils/store-module-register'
import storeModule from '@/store/modules/school/evaluation'

export default {
  name: 'EvaluationHabitIndex',
  components: {
    NavBar,
    Actionsheet,
    Icon,
    selectStudent,
    selectComment,
    imageUploader,
  },
  beforeCreate() {
    storeModuleRegister(storeModule)
  },
  data() {
    return {
      isActionSheetShow: false,
      actionSheetActions: [
        {
          index: 0,
          name: '历史记录',
          target: 'SafflowerFlowerArchives',
        },
        {
          index: 1,
          name: '评语管理',
          target: 'EvaluationCommentManage',
        },
        {
          index: 2,
          name: '评语类型管理',
          target: 'EvaluationCommentTypes',
        },
      ],
    }
  },
  computed: {
    ...mapState('evaluation' ,[
      'selectedCommentType',
      'selectedStudentList',
      'selectedCommentList',

      'isFullscreenSelectStudent',
    ]),
    ...mapGetters('evaluation' ,[
      'selectedStudentNumbers',
    ]),
    imageList: {
      get() {
        return this.$store.state.evaluation.imageList
      },
      set(images) {
        this.$store.commit('evaluation/setUploadedImageList', images)
      },
    },
  },
  methods: {
    ...mapActions('evaluation', [
      'checkBeforeSubmit',
      'submit',
    ]),
    onActionSheetSelect(item) {
      this.isActionSheetShow = false
      this.$router.push({ name: item.target })
    },
    async onSubmit() {
      if (this.$refs['image-uploader'].isUploading) {
        this.$toast('图片正在上传中, 请稍等...')
        return false
      }

      const checkResult = await this.checkBeforeSubmit()
      if (checkResult !== true) {
        this.$toast(checkResult)
        return false
      }

      const actionText = this.selectedCommentType === 0 ? '奖励' : '扣除'
      const selectedStudentClassNumbers = new Set(this.selectedStudentList.map(student => student.classId)).size
      const selectedCommentWorth = this.selectedCommentList.reduce((last, category) => {
        return last + category.comments.reduce((sum, comment) => sum + parseInt(comment.commentWorth), 0)
      }, 0)

      this.$dialog.confirm({
        title: '提示',
        message: `将${actionText}${this.selectedStudentNumbers}个学生${selectedCommentWorth}朵红花` + (selectedStudentClassNumbers > 1 ? `, 跨越${selectedStudentClassNumbers}个班级` : '')
      })
        .then(() => {
          this.$loading('保存中...')
          this.submit()
            .then(submitResult => {
              if (submitResult === true) {
                this.$toast('保存成功')
              } else {
                this.$toast('保存失败')
              }
            })
            .finally(() => {
              this.$loadingHide()
            })
        })
        .catch(() => {})
    },
  },
  mounted() {
    if (this.$store.state.user.roleType === 42) {
      this.actionSheetActions.push({
        index: 3,
        name: '红花清零',
        target: 'SafflowerFlowerReset',
      })
    }
  }
};
</script>

<style scoped lang="less">
.evaluation {
  font-size: 0;
  background-color: #f3f7f8;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  &.fullscreen {
    .fullscreen-hide {
      display: none;
    }
  }

  .header, .footer {
    flex-shrink: 0;
  }

  .content {
    flex-grow: 1;
    overflow: scroll;
    display: flex;
    flex-direction: column;

    .image_uploader {
      border-top: 0.01rem solid #eee;
      padding: .2rem;
      background-color: #fff;
      font-size: .16rem;

      .title {
        font-weight: 400;
        color: #666;
        line-height: 0.24rem;
      }
    }
  }


  .submit {
    width: 100%;
    height: 0.47rem;
    line-height: 0.47rem;
    background: #3770FB;
    font-size: .16rem;
    color: #fff;
    border: 0;
    padding: 0;
    margin: 0;
  }
}
</style>

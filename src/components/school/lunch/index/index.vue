<template>
  <div class="lunch">

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

    <template v-if="isDataReady">

      <div class="content">
        <select-student/>
        <select-comment/>

        <div class="image_uploader">
          <div class="title">可上传照片（选填）</div>
          <image-uploader
            class="uploader"
            ref="image-uploader"
            v-model="imageList"
            itemWidth=".5rem"
            upload-immediately/>
        </div>
      </div>

      <button class="footer submit" @click="onSubmit">提交保存</button>

    </template>

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
import { NavBar, Actionsheet, Icon } from 'vant'
import selectStudent from './components/select-student.vue'
import selectComment from './components/select-comment.vue'
import imageUploader from '@/components/common/image-uploader.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import storeModuleRegister from '@/utils/store-module-register'
import storeModule from '@/store/modules/school/lunch'

export default {
  name: 'lunch',
  components: {
    NavBar,
    Actionsheet,
    Icon,
    selectStudent,
    selectComment,
    imageUploader,
  },
  data() {
    return {
      isActionSheetShow: false,
      actionSheetActions: [
        {
          index: 0,
          name: '状态管理',
          target: 'LunchStatusManage',
        },
        {
          index: 1,
          name: '历史记录',
          target: 'LunchHistory',
        },
      ],
    }
  },
  mounted() {
    this.$loading()
    this.fetchData()
      .finally(() => {
        this.$loadingHide()
      })
  },
  beforeCreate() {
    storeModuleRegister(storeModule)
  },
  computed: {
    ...mapState('lunch', [
      'isDataReady',
    ]),
    ...mapGetters('lunch', [
      'selectedStudentImageList',
    ]),
    imageList: {
      get() {
        return this.selectedStudentImageList
      },
      set(images) {
        this.$store.commit('lunch/setUploadedImageList', images)
      },
    },
  },
  methods: {
    ...mapActions('lunch', [
      'fetchData',
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
    },
  },
}
</script>

<style scoped lang="less">
.lunch {
  font-size: 0;
  background-color: #f3f7f8;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

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

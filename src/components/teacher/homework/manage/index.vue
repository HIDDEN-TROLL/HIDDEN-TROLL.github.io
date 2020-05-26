<template>
  <div class="homework_manage">

    <nav-bar
      class="header"
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="$router.back()">
      <div class="nav-bar-right-slot" slot="right">
        <router-link class="link" :to="{ name: 'TeacherHomeworkQuickNotice' }">一键<br>通知</router-link>
        <router-link class="link" :to="{ name: 'TeacherHomeworkManageHistory' }">历史<br>记录</router-link>
      </div>
    </nav-bar>

    <template v-if="isDataReady">

      <div class="content">
        <select-student/>
        <modify-homework-info ref="modify-homework-info" />

      </div>

      <button class="footer submit" @click="onSubmit">提交保存</button>

    </template>

  </div>
</template>

<script>
import { NavBar } from 'vant'
import selectStudent from './components/select-student.vue'
import modifyHomeworkInfo from './components/modify-homework-info.vue'
import { mapActions, mapState } from 'vuex'
import storeModuleRegister from '@/utils/store-module-register'
import storeModule from '@/store/modules/teacher/homework'

export default {
  name: 'TeacherHomeworkManage',
  components: {
    NavBar,
    selectStudent,
    modifyHomeworkInfo,
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
    ...mapState('homework', [
      'isDataReady'
    ]),
  },
  methods: {
    ...mapActions('homework', [
      'fetchData',
      'checkBeforeSubmit',
      'submit',
    ]),
    async onSubmit() {
      if (this.$refs['modify-homework-info'].checkIsUploading()) {
        this.$toast('图片正在上传中，请稍等...')
        return false
      }
      if (this.$refs['modify-homework-info'].checkIsVoiceRecording()) {
        this.$toast('正在录音中，请先停止录音后再提交')
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
};
</script>

<style scoped lang="less">
.homework_manage {
  font-size: 0;
  background-color: #fff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .header, .footer {
    flex-shrink: 0;
  }

  .header {
    .nav-bar-right-slot {
      .link {
        margin-right: 0.1rem;
        color: #fff;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        line-height: 1;
        height: 46px;
      }
      .link:last-child {
        margin-right: 0;
      }
    }
  }

  .content {
    flex-grow: 1;
    overflow: scroll;
    display: flex;
    flex-direction: column;

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

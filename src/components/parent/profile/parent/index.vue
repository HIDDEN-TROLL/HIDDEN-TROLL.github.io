<template>
  <section class="parent_profile">

    <van-nav-bar
      class="header"
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      :border="false" />


    <section class="content">

      <div class="part1">
        <img :src="profile.image" alt="头像" class="image" @click="triggerUploadImage"/>
        <span class="tip" :class="{ show: imageUploaderTipShow }">点击头像可修改</span>
      </div>

      <van-cell is-link @click="modifyRelation" title="与孩子的关系" :value="relationText"/>
      <van-cell is-link @click="modifyPhone" title="我的手机号码" :value="profile.phone ? profile.phone : '未设置'"/>

    </section>

    <image-uploader ref="image-uploader" v-show="false" :max="1" upload-immediately @change="imageUploaded" />

    <van-action-sheet
      class="action_sheet"
      v-model="actionSheet.show"
      :actions="actionSheet.actions"
      get-container="#app"
      cancel-text="取消"
      @select="onActionSheetSelect"/>

    <dialog-input
      v-model="dialog.show"
      :title="dialog.title"
      :text="dialog.text"
      :placeholder="dialog.placeholder"
      :validate="dialog.validate"
      :beforeClose="dialog.beforeClose"
    />

  </section>
</template>

<script>
import { NavBar, Cell, Actionsheet } from 'vant'
import { getParentProfile, updateParentProfile } from '@/api/parent/profile'
import imageUploader from '@/components/common/image-uploader'
import dialogInput from '@/components/common/dialog-input'

export default {
  name: 'ParentProfile',
  components: {
    vanNavBar: NavBar,
    vanCell: Cell,
    vanActionSheet: Actionsheet,
    imageUploader,
    dialogInput,
  },
  data() {
    return {
      profile: {
        image: '',
        name: '',
        phone: '',
        relation: 0,
      },

      imageUploaderTipShow: false,
      actionSheet: {
        show: false,
        title: '',
        actions: [],
        callback: null,
      },
      dialog: {
        show: false,
        title: '',
        text: '',
        placeholder: '',
        validate: null,
        beforeClose: null,
      },
    }
  },
  created() {
    this.$loading(undefined,undefined,true)
    getParentProfile()
      .then(response => {
        if (response.data.meta.success) {
          this.profile = response.data.data
        }
      })
      .finally(() => {
        this.$loadingHide()
        this.showImageUploaderTip()
      })
  },
  computed: {
    relationText() {
      // 1 父 2 母 3 爷爷 4 奶奶 5 外公 6外婆 7 其它
      const relationTextList = ['未设置', '爸爸', '妈妈', '爷爷', '奶奶', '外公', '外婆', '其他']
      return relationTextList[this.profile.relation] ? relationTextList[this.profile.relation] : relationTextList[0]
    },
  },
  methods: {
    showImageUploaderTip() {
      this.$nextTick(() => {
        this.imageUploaderTipShow = true
        setTimeout(() => {
          this.imageUploaderTipShow = false
        }, 10000)
      })
    },
    triggerUploadImage() {
      let uploader = this.$refs[`image-uploader`]
      if (Array.isArray(uploader)) {
        uploader = uploader[0]
      }
      if (uploader) {
        uploader.clear()
        uploader.trigger()
      }
    },
    imageUploaded(imageList) {
      const image = imageList[imageList.length-1]
      if (image) {
        this.profile.image = image.content
        this.submit('image', image.ossKey)
      }
    },

    onActionSheetSelect(option) {
      this.actionSheet.show = false
      if (this.actionSheet.callback instanceof Function) {
        this.actionSheet.callback(option)
      }
    },


    modifyPhone() {
      this.dialog.show = true
      this.dialog.title = '输入手机号码'
      this.dialog.text = this.profile.phone
      this.dialog.placeholder = '手机号码'
      this.dialog.validate = text => {
        if (!(/^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(text))) {
          this.$toast('请输入正确的手机号码')
          return false
        }
        return true
      }
      this.dialog.beforeClose = (action, done, text) => {
        if (action === 'confirm') {
          if (this.profile.phone !== text) {
            this.profile.phone = text
            this.submit('phone')
          }
        }
        done()
      }
    },
    modifyRelation() {
      const relationTextList = ['爸爸', '妈妈', '爷爷', '奶奶', '外公', '外婆', '其他']
      this.actionSheet.show = true
      this.actionSheet.title = '选择关系'
      this.actionSheet.actions = relationTextList.map((text, index) => {
        const value = index + 1
        return {
          name: text,
          value,
          className: this.profile.relation === value ? 'active' : '',
        }
      })
      this.actionSheet.callback = (option) => {
        this.profile.relation = option.value
        this.submit('relation')
      }
    },

    submit(key, value = undefined) {
      updateParentProfile({
        [key]: value ? value : this.profile[key]
      })
        .then(response => {
          if (response.data.meta.success) {
            this.$toast('更新成功')
          }
        })
    },
  },
}
</script>

<style scoped lang="less">
.parent_profile {
  font-size: .16rem;
  background-color: #fff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .header {
    flex-shrink: 0;
  }

  .content {
    flex-grow: 1;
    overflow: scroll;
    display: flex;
    flex-direction: column;

    .part1 {
      background-color: #3770fb;
      overflow: hidden;
      position: relative;

      .image {
        width: 1rem;
        height: 1rem;
        margin: .1rem auto;
        display: block;
        border-radius: 50%;
      }

      .tip {
        font-size: .14rem;
        font-weight: 400;
        color: #fff;
        background-color: rgb(132, 194, 37);
        border-radius: .2rem;
        position: absolute;
        right: -100%;
        top: 0;
        padding: .05rem .1rem;
        transition: right 1s;
        &.show {
          transition: right 1s;
          right: .1rem;
        }
      }
    }

  }

  .bottom {
    flex-shrink: 0;
    text-align: center;
    color: #fff;
    height: 0.4rem;
    font-size: 0.16rem;
    font-weight: 400;
    line-height: 0.4rem;
    background-color: #3770fb;

    &:active {
      background-color: #3770fbee;
    }
  }
}

.action_sheet {
  .active {
    color: #fff;
    background: #3770fb;
  }
}
</style>

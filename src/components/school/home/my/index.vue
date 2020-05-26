<template>
  <div class="content">
    <van-loading v-show="loading" class="loading"/>

    <div class="bar_mas">
      <div>
        <van-nav-bar
          right-text="切换账号"
          @click-right="$router.push({ name: 'SwitchAccount' })"/>
      </div>
      <div class="info">
        <img class="mas_head_img" :src="accountInfo.image" alt="" @click="triggerUploadImage"/>
        <div class="mas_name_div">
          <p class="mas_name" @click="modifyName">
            {{accountInfo.name}}
            <br>
          </p>
          <p class="mas_name_b">
            {{accountInfo.schoolName}}
          </p>
          <p></p>
        </div>
        <div class="bind_button" @click="bindNewAccount">
          <p>绑定新账号</p>
        </div>
      </div>

    </div>
    <van-cell v-show="isShowAccountInfoCell" title="账号：" :value="accountInfo.account" size="large"/>
    <van-cell v-show="isShowAccountInfoCell" title="身份：" :value="accountInfo.roleTypeText" size="large"/>
    <div class="b_list">
      <van-cell v-for="(item,index) in links" :key="index" :title="item.name" is-link
                @click="go(item.target)">
        <icon slot="icon" :name="item.icon" style="margin-right: .1rem;" />
      </van-cell>
    </div>

    <div v-if="isShowStopService" class="stop_service">
      <p class="stop_service_text">{{ data.other.stopService.text }}</p>
      <van-button type="info" @click="$router.push({ name:'Charge' })">{{ data.other.stopService.btnText }}</van-button>
    </div>

    <image-uploader ref="image-uploader" v-show="false" :max="1" upload-immediately @change="imageUploaded" />

    <dialog-input
      v-model="dialog.show"
      :title="dialog.title"
      :text="dialog.text"
      :placeholder="dialog.placeholder"
      :validate="dialog.validate"
      :beforeClose="dialog.beforeClose"
    />
  </div>

</template>

<script>
import { Cell, NavBar, Loading, Button } from 'vant'
import { handleRouteTarget, isEmpty } from '@/utils'
import icon from '@/components/common/icon'
import { getMyPageData, updateProfile } from '@/api/school/home'
import imageUploader from '@/components/common/image-uploader'
import dialogInput from '@/components/common/dialog-input'
import { mapActions } from 'vuex'

export default {
  name: 'SchoolHomeMy',
  components: {
    vanNavBar: NavBar,
    vanCell: Cell,
    vanLoading: Loading,
    vanButton: Button,
    icon,
    imageUploader,
    dialogInput,
  },
  data() {
    return {
      loading: false,
      data: {},
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
  computed: {
    accountInfo() {
      return this.data && this.data.accountInfo ? this.data.accountInfo : {}
    },
    links() {
      return this.data && this.data.links ? this.data.links : []
    },
    isShowStopService() {
      return this.data && this.data.other && this.data.other.stopService
    },
    isShowAccountInfoCell() {
      return !this.isShowStopService || !this.data.other.stopService.isHideAccountInfo
    },
  },
  methods: {
    ...mapActions('schoolHome', [
      'fetchHomeData',
      'getPageExtraData',
    ]),
    go(target) {
      if (target === 'versionInfo') {
        this.$toast(new Date(BUILD_TIME).toLocaleString())
        return;
      }
      handleRouteTarget(this.$router, target)
    },
    bindNewAccount() {
      location.href = this.data.other.bindNewAccountUrl
    },

    modifyName() {
      this.dialog.show = true
      this.dialog.title = '输入姓名'
      this.dialog.text = this.accountInfo.name
      this.dialog.placeholder = '姓名'
      this.dialog.validate = text => {
        if (text.length === 0) {
          this.$toast('姓名不可为空')
          return false
        }
        if (text.length > 16) {
          this.$toast('姓名最长不可操作16个字符')
          return false
        }

        return true
      }
      this.dialog.beforeClose = (action, done, text) => {
        if (action === 'confirm') {
          if (this.accountInfo.name !== text) {
            this.accountInfo.name = text
            this.submitProfile('name', this.accountInfo.name)
          }
        }
        done()
      }
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
        if (!isEmpty(this.accountInfo)) {
          this.data.accountInfo.image = image.content
        }
        this.submitProfile('image', image.ossKey)
      }
    },
    submitProfile(key, value = undefined) {
      updateProfile({
        [key]: value
      })
        .then(response => {
          if (response.data.meta.success) {
            this.$toast('更新成功')
          }
        })
    },
  },
  async created() {
    await this.fetchHomeData()

    const data = await this.getPageExtraData('SchoolHomeMy')
    if (data !== null) {
      this.data = data
      return
    }

    this.loading = true
    getMyPageData()
      .then(response => {
        if (response.data.meta.success) {
          this.data = response.data.data
        }
      })
      .finally(() => {
        this.loading = false
      })
  },
}
</script>

<style scoped lang="less">
.content {
  background-color: #ffffff;
  padding-bottom: 50px;
}

.bar_mas {
  width: 100%;
  min-height: 1.8rem;
  background: linear-gradient(
    180deg,
    rgba(55, 112, 251, 1) 0%,
    rgba(104, 169, 253, 1) 100%
  );

  .info {
    margin-top: .35rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    /*头像及信息样式*/
    .mas_name_div {
      padding: 0 .2rem;
      flex-grow: 1;
      overflow: hidden;
    }

    .mas_name_div p {
    }

    .mas_name {
      font-size: 0.16rem;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 0.22rem;

      overflow: hidden;
      text-overflow: ellipsis;
      flex-grow: 1;
      white-space: nowrap;
    }

    .mas_name_b {
      margin: 0.1rem 0 0 0;
      min-height: 0.2rem;
      font-size: 0.14rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.2rem;

      overflow: hidden;
      text-overflow: ellipsis;
      flex-grow: 1;
      white-space: nowrap;

      &:focus {
        white-space: normal;
      }
    }

    .mas_head_img {
      border-radius: 100%;
      margin-left: .15rem;
      width: 0.6rem;
      height: 0.6rem;
      flex-shrink: 0;
      object-fit: cover;
    }

    .bind_button {
      margin-right: .15rem;
      float: left;
      border: solid 0.01rem white;
      width: 0.9rem;
      height: 0.2rem;
      border-radius: 0.05rem;
      flex-shrink: 0;
    }

    .bind_button p {
      text-align: center;
      height: 0.2rem;
      font-size: 0.14rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.2rem;
    }
  }
}

.van-cell:not(:last-child)::after {
  right: 0.15rem;
}

/*导航栏样式*/
.van-icon-arrow-left:before {
  color: #ffffff;
}

.van-nav-bar__text {
  color: #ffffff;
}

.van-hairline--bottom::after {
  border: none;
}

.van-nav-bar {
  background-color: rgba(255, 255, 255, 0);
}



.bindnew {
  border: solid;
}

.van-button--plain {
  background-color: rgba(255, 255, 255, 0);
}

.van-button--primary {
  border-radius: 0.05rem;
  border: solid 0.01rem white;
}

.van-button--plain.van-button--primary {
  color: white;
}



.b_list {
  margin: 0.1rem 0 0 0;
}

.loading {
  margin: 10px auto;
}
.stop_service {
  text-align: center;
}
.stop_service_text {
  text-align: center;
  color: #f66;
  font-size: 0.26rem;
  white-space: pre-wrap;
  line-height: 1.5;
}

</style>

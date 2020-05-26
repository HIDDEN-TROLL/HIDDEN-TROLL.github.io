<template>
  <section class="child_profile">

    <van-nav-bar
      class="header"
      :title="$route.meta.title"
      left-text="取消"
      left-arrow
      @click-left="$router.back()"
      :border="false"/>


    <section class="content">
      <div class="part1">
        <img :src="profile.image" alt="头像" class="image" @click="triggerUploadImage"/>
        <span class="tip" :class="{ show: imageUploaderTipShow }">点击头像可修改</span>
      </div>

      <van-cell is-link @click="modifyName" title="孩子姓名" :value="profile.name ? profile.name : '未设置'"/>
      <van-cell is-link @click="modifyPublicSchool" title="在读学校"
                :value="profile.publicSchoolName ? profile.publicSchoolName : '未设置'"/>
      <van-cell is-link @click="modifyGrade" title="在读年级" :value="profile.gradeName"/>
      <van-cell is-link @click="modifyGender" title="性别" :value="profile.genderText"/>
      <van-cell is-link @click="modifyBirthday" title="生日"
                :value="profile.birthday ? profile.birthday : '未设置'"/>
      <van-cell is-link @click="modifyArea" title="地区" :value="profile.areaText ? profile.areaText : '未设置'"/>
      <van-cell is-link @click="modifyAddress" title="住址" :value="profile.address ? profile.address : '未设置'"/>

    </section>

    <p class="bottom" @click="submit">保存</p>

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

    <van-popup v-if="datePicker.rendered" v-model="datePicker.show" position="bottom">
      <van-datetime-picker
        :value="birthday"
        type="date"
        title="选择生日"
        :min-date="new Date(1990,0,1)"
        :max-date="new Date()"
        @confirm="birthday = $event, datePicker.show = false"
        @cancel="datePicker.show = false"
      />
    </van-popup>

    <area-picker v-if="areaPicker.rendered" v-model="areaPicker.show" :area-id="areaPicker.areaId" @confirm="areaPickerConfirm" />

  </section>
</template>

<script>
import { NavBar, Cell, Actionsheet, DatetimePicker, Popup } from 'vant'
import { updateChildProfile } from '@/api/parent/profile'
import imageUploader from '@/components/common/image-uploader'
import dialogInput from '@/components/common/dialog-input'
import areaPicker from '@/components/common/area-picker'
import { isEmpty, date as PHPFunctionDate } from '@/utils'

export default {
  name: 'ChildAccountInfo',
  components: {
    vanNavBar: NavBar,
    vanCell: Cell,
    vanActionSheet: Actionsheet,
    vanDatetimePicker: DatetimePicker,
    vanPopup: Popup,
    imageUploader,
    dialogInput,
    areaPicker ,
  },
  data() {
    return {
      profile: {},
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
      datePicker: {
        rendered: false,
        show: false,
      },
      areaPicker: {
        rendered: false,
        show: false,
        areaId: 0,
      }
    }
  },
  computed: {
    birthday: {
      get() {
        if (isEmpty(this.profile.birthday)) {
          return new Date(2000,0,1)
        }
        const date = new Date(this.profile.birthday)
        return isNaN(date.getTime()) ? new Date(2000,0,1) : date
      },
      set(date) {
        this.profile.birthday = PHPFunctionDate('Y-m-d', date)
      },
    },
  },
  created() {
    if (!this.$route.params.profile) {
      this.$toast('缺少数据')
      this.$router.back()
      return
    }
    this.profile = this.$route.params.profile

    this.$nextTick(() => {
      this.imageUploaderTipShow = true
      setTimeout(() => {
        this.imageUploaderTipShow = false
      }, 10000)
    })
  },
  methods: {
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
        this.profile.imageOssKey = image.ossKey
      }
    },

    onActionSheetSelect(option) {
      this.actionSheet.show = false
      if (this.actionSheet.callback instanceof Function) {
        this.actionSheet.callback(option)
      }
    },


    modifyName() {
      this.dialog.show = true
      this.dialog.title = '输入孩子姓名'
      this.dialog.text = this.profile.name
      this.dialog.placeholder = '姓名'
      this.dialog.validate = text => {
        if (isEmpty(text)) {
          this.$toast('姓名不可为空')
          return false
        }
        if (text.length > 4) {
          this.$toast('姓名最多4个字')
          return false
        }
        return true
      }
      this.dialog.beforeClose = (action, done, text) => {
        if (action === 'confirm') {
          this.profile.name = text
        }
        done()
      }
    },
    modifyPublicSchool() {
      this.dialog.show = true
      this.dialog.title = '输入孩子所读学校名'
      this.dialog.text = this.profile.publicSchoolName
      this.dialog.placeholder = '学校名'
      this.dialog.validate = null
      this.dialog.beforeClose = (action, done, text) => {
        if (action === 'confirm') {
          this.profile.publicSchoolName = text
        }
        done()
      }
    },
    modifyGrade() {
      const grades = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初中']
      this.actionSheet.show = true
      this.actionSheet.title = '选择年级'
      this.actionSheet.actions = grades.map((gradeName, index) => {
        const value = index + 1
        return {
          name: gradeName,
          value,
          className: this.profile.grade === value ? 'active' : '',
        }
      })
      this.actionSheet.callback = (option) => {
        this.profile.grade = option.value
        this.profile.gradeName = option.name
      }
    },
    modifyGender() {
      this.actionSheet.show = true
      this.actionSheet.title = '选择性别'
      this.actionSheet.actions = [
        {
          name: '男',
          value: 1,
          className: this.profile.gender === 1 ? 'active' : '',
        },
        {
          name: '女',
          value: 2,
          className: this.profile.gender === 2 ? 'active' : '',
        },
      ]
      this.actionSheet.callback = (option) => {
        this.profile.gender = option.value
        this.profile.genderText = option.name
      }
    },
    modifyBirthday() {
      this.datePicker.rendered = true
      this.datePicker.show = true
    },
    modifyArea() {
      this.areaPicker.rendered = true
      this.areaPicker.show = true
      this.areaPicker.areaId = this.profile.areaId > 0 ? this.profile.areaId : 0
    },
    areaPickerConfirm(area) {
      const areaLabel = [area.province.label, area.city.label, area.county.label]
      const areaValue = [area.province.value, area.city.value, area.county.value]
      this.profile.areaText = areaLabel.filter(L => !!L).join('/')

      this.profile.areaId = areaValue.reverse().find(V => V > 0)
    },
    modifyAddress() {
      this.dialog.show = true
      this.dialog.title = '输入详细地址'
      this.dialog.text = this.profile.address
      this.dialog.placeholder = '地址'
      this.dialog.validate = null
      this.dialog.beforeClose = (action, done, text) => {
        if (action === 'confirm') {
          this.profile.address = text
        }
        done()
      }
    },

    submit() {
      this.$loading('保存中...', undefined, true)
      const keys = [
        'address',
        'areaId',
        'birthday',
        'grade',
        'gender',
        'imageOssKey',
        'name',
        'publicSchoolName',
      ]
      const data = {}
      keys.forEach(key => data[key] = this.profile[key])
      updateChildProfile(data)
        .then(response => {
          if (response.data.meta.success) {
            this.$toast('保存成功')
            this.$router.back()
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
.child_profile {
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
        margin: .2rem auto;
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

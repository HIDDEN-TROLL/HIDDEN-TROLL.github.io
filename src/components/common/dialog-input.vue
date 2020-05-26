<template>
  <van-dialog
    v-model="isShow"
    :title="title"
    show-cancel-button
    :before-close="beforeCloseFn">
    <van-field v-model="fieldText" :placeholder="placeholder"/>
  </van-dialog>
</template>

<script>
import { Field } from 'vant'

export default {
  name: 'dialog-input',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },

    validate: {
      type: Function,
      default: null,
    },
    beforeClose: {
      type: Function,
      default: null,
    },

    confirm: {
      type: Event,
    },
    cancel: {
      type: Event,
    },
  },
  components: {
    vanField: Field,
  },
  data() {
    return {
      isShow: false,
      fieldText: '',
    }
  },
  watch: {
    value() {
      if (this.isShow !== this.value) {
        this.isShow = this.value
      }
      this.$nextTick(() => {
        if (this.value) {
          this.fieldText = this.text
        }
      })
    },
    isShow() {
      if (this.isShow !== this.value) {
        this.$emit('input', this.isShow)
      }
    },
    text() {
      if (this.fieldText !== this.text) {
        this.fieldText = this.text
      }
    },
  },
  methods: {
    beforeCloseFn(action, done) {
      if (action === 'confirm' && !this.startValidate()) {
        return done(false)
      }

      new Promise((resolve, reject) => {
        if (this.beforeClose instanceof Function) {
          const callback = (pass = true) => {
            pass ? resolve() : reject()
          }
          this.beforeClose(action, callback, this.fieldText)
        } else {
          resolve()
        }
      })
        .then(() => {
          this.$emit(action)
          done()
        })
        .catch(() => {
          done(false)
        })
    },
    startValidate() {
      let isValidatePass = true

      if (!(this.validate instanceof Function)) {
        return isValidatePass
      }

      try {
        const validateResult = this.validate(this.fieldText)
        if (typeof validateResult === 'string') {
          this.$toast(validateResult)
          isValidatePass = false
        } else if (typeof validateResult === 'boolean') {
          isValidatePass = validateResult
        }
      } catch (e) {
        this.$toast(e.message)
        isValidatePass = false
      }
      return isValidatePass
    },
  },
}
</script>

<style scoped lang="less">

</style>

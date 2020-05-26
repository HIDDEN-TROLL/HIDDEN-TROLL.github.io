<template>
  <van-action-sheet v-model="isShow" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="onCancel"/>
</template>

<script>
import { Actionsheet } from 'vant'
import Vue from 'vue'

let instance

export default {
  start(actions) {
    if (!instance) {
      instance = new (Vue.extend(this))({
        el: document.createElement('div')
      })
      document.body.appendChild(instance.$el)
    }

    return instance.start(actions)
  },

  name: 'action-sheet',
  components: {
    vanActionSheet: Actionsheet,
  },
  data() {
    return {
      isShow: false,
      actions: [],
      resolve: null,
      reject: null,
    }
  },
  methods: {
    start(actions) {
      this.isShow = true
      this.actions = actions
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    onSelect(action) {
      this.isShow = false
      if (this.resolve) {
        this.resolve(action)
        this.resolve = null
      }
    },
    onCancel() {
      this.isShow = false
      if (this.reject) {
        this.reject()
        this.reject = null
      }
    },
  },
}
</script>

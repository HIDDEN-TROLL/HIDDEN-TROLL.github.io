<template>
  <div class="normal_input">
    <input v-model="currentValue" :placeholder="placeholder" :type="type" class="textarea" ref="textarea" />
    <div v-if="enableSlot || showCounter" class="right" @click="focus">
      <slot name="right"></slot>
      <div class="counter" v-show="showCounter && max">
        {{count}}/{{max}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'text-input',
  props: {
    showCounter: {
      type: Boolean,
      default: false
    },
    max: {
      type: [Number, String],
      default: 0
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    enableSlot: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      currentValue: '',
      count: 0,
    }
  },
  watch: {
    count() {
      let len = 0
      if (this.currentValue) {
        len = this.currentValue.replace(/\n/g, 'aa').length
      }
      return len > this.max ? this.max : len
    },
    value(value) {
      this.currentValue = value
    },
    currentValue(newVal) {
      if (this.max && newVal && newVal.length > this.max) {
        this.currentValue = newVal.slice(0, this.max)
      }
      this.count = newVal.length
      this.$emit('input', this.currentValue)
      this.$emit('change', this.currentValue)
    },

  },
  methods: {
    focus() {
      this.$refs.textarea.focus()
    },
  }
}
</script>
<style scoped lang="less">
.normal_input {
  border: 1px solid #999;
  display: flex;

}
.textarea {
  width: 100%;
  border: 0;
  padding: 2px;
}
.right {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  .counter {
    text-align: right;
    color: #999;
    font-size: 80%;
  }
}
</style>

<template>
  <i :class="iconClass" :style="iconStyle"></i>
</template>

<script>
const classMap = {
  'fa-': 'fa',
  'icon-': 'iconfont',
}

export default {
  name: 'Icon',
  props: {
    name: {
      required: true,
      type: String
    },
    color: {
      required: false,
      type: String
    },
  },
  computed: {
    iconClass() {
      for (let key in classMap) {
        if (this.name.includes(key)) {
          return [classMap[key], this.name.split(' ')[0]]
        }
      }

      return {}
    },
    iconStyle() {
      let color = this.color ? this.color : this.name.split(' ')[1]
      return color ? { color } : {}
    }
  },
}
</script>

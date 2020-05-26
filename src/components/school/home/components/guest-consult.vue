<template>
  <CellGroup>
    <Cell class="cell" is-link :title="title" :value="`您有${extra}条未回复的咨询`"/>
  </CellGroup>
</template>

<script>
import { Cell, CellGroup } from 'vant';
export default {
  name: 'GuestConsult',
  components: {
    Cell,
    CellGroup,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: 0,
      type: Number,
    },
  },
}
</script>
<style scoped>
.cell {
  text-align: left;
}
</style>

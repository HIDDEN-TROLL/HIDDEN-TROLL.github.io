<template>
  <CellGroup>
    <Cell class="cell" is-link :title="title" :value="`共${extra}人`"/>
  </CellGroup>
</template>

<script>
import { Cell, CellGroup } from 'vant';
export default {
  name: 'GuestConsultThisWeek',
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

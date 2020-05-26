<template>
  <CellGroup>
    <Cell class="cell" is-link :title="title" value="TODO"/>
  </CellGroup>
</template>

<script>
import { Cell, CellGroup } from 'vant';
export default {
  name: 'LatestCommunity',
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
      default: () => {},
      type: Object,
    },
  },
}
</script>
<style scoped>
.cell {
  text-align: left;
}
</style>

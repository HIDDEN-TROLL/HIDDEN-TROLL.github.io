<template>
  <router-view v-if="isRouterFresh"></router-view>
</template>
<script>
export default {
  name: 'EmptyRouterView',
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterFresh:true
    }
  },
  methods:{
    reload(){
      this.isRouterFresh = false;
      this.$nextTick(()=>{
        this.isRouterFresh = true;
      })
    }
  }
}
</script>

<template>
  <div style="overflow: hidden;font-size: 0;height: 1.1rem">
    <div id="diet">
      <ul class="list-content">
        <li v-for="(list,index) in dietList" class="item" :key="index">
          <div class="diet-image">
            <img class="" :src="list.src">
          </div>
          <span class="title">{{list.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "diet",
    props:{
      dietList:{
        type:Array
      }
    },
    data(){
      return {
        
      }
    }
  }
</script>

<style scoped lang="less">
 #diet{
   font-size: 0;
   height: 1.27rem;
   overflow-x:scroll;
   .list-content{
     width: 3.45rem;
     overflow: hidden;
     .item{
       float: left;
       margin-left: 0.07rem;
       text-align: center;
       .diet-image{
         width: 1.1rem;
         height: 0.83rem;
         margin-bottom: 0.08rem;
         img{
           width: 100%;
           height: 100%;
         }
       }
       .title{
         font-size: 0.14rem;
         color: #666;
       }
     }
     .item:first-child{
       margin-left: 0;
     }
   }
 }
</style>
<template>
  <div style="height: 0.62rem;overflow: hidden;font-size: 0;width: 3.6rem">
    <div id="attendance">
      <ul class="list-content" :style="{width:w}">
        <li v-for="(list,index) in attendanceList" class="item" :key="index">
          <p class="title">{{list[0]}}</p>
          <span class="sign" >{{list[1]}}</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  export default {
    name: "attendance",
    props:{
      attendanceList:{
        type:Array
      }
    },
    data(){
      return {

      }
    },
    computed:{
      w(){
        let l = this.attendanceList.length;
        return `${l*0.87}rem`
      }
    }
  }
</script>

<style scoped lang="less">
  #attendance{
    font-size: 0;
    height: 0.8rem;
    overflow-x:scroll;
    .list-content{
      /*min-width:100% ;*/
      overflow:hidden ;
      .item{
        float: left;
        width: 0.8rem;
        height: 0.62rem;
        border: 0.01rem solid #ededed;
        padding: 0.08rem 0;
        margin-right: 0.07rem;
        text-align: center;
        border-radius: 0.03rem;
        box-sizing: border-box;
      .title{
        text-align: center;
        font-size: 0.14rem;
        line-height: 0.2rem;
        margin-bottom: 0.1rem;
        color: #666;
      }
      .sign{
        color: #999;
        font-size: 0.12rem;
        line-height: 0.17rem;
      }
      .sign.signed{
        color: #84C225;
      }
      }
    }
  }
</style>

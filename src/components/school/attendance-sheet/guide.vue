<template>
  <!--查看指南-->
  <div id="sheet-guide" v-if="guideShow">
    <div class="top">
      <span>班级栏可左右滑动</span>
    </div>
    <div class="screening">
      <span class="calender-box">日历功能筛选查看的月份</span>
      <span class="dt-typ">查看数据类型</span>
    </div>
    <div class="time-type" style="margin-top: 1rem">绿色时间表示：进园签到时间</div>
    <div class="time-type">橙色时间表示：离园签到时间</div>
    <div class="stu-name">
      <span class="desc">点击学生名称可查看详情</span>
    </div>
    <div class="instructions">
      <div class="flex-b">
        <span class="desc">时间栏可左右滑动查看更多日期或上下滑动查看更多学生</span>
      </div>

    </div>
    <div class="footer-close">
      <span class="btn" @click="closeGuide">点我关闭指南</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "guide",
    props:{
      guideShow:{
        type:Boolean
      }
    },
    methods:{
      closeGuide(){
        this.$emit("close",false)
      }
    },
    // computed:{
    //   ph(){
    //     return {
    //       width:`${document.body.clientWidth/100}rem`,
    //       height:`${document.body.clientHeight/100}rem`
    //     }
    //   }
    // }
  }
</script>

<style scoped lang="less">
  #sheet-guide{
    font-size: 0.14rem;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background-color: rgba(0,0,0,0.3);
    .top{
      text-align: center;
      padding-top: 0.5rem;

    }
    .screening{
      overflow: hidden;
      margin-top: 0.6rem;
      .calender-box{
        float: left;
        margin-left: 0.16rem;
      }
      .dt-typ{
        float: right;
        margin-right: 0.16rem;
      }
    }
    .time-type{
      text-align: center;
      margin-top: 0.3rem;
    }
    .stu-name{
      margin-top: 0.3rem;
      .desc{
        display: inline-block;
        width: 0.9rem;
        text-align: center;
      }
    }
    .instructions{
      margin-top: 0.3rem;
      .flex-b{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        text-align: center;
        .desc{
         /* flex: 1;*/
          width: 2rem;
        }
      }

    }
    .footer-close{
      margin-top: 1rem;
      text-align: center;
      .btn{
        font-size: 0.16rem;
        padding: 0.08rem 0.05rem;
        border: 1px solid #fff;
        border-radius: 0.06rem;
      }
    }
  }
</style>

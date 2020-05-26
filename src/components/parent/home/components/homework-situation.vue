<template>
  <div style="overflow: hidden;font-size: 0;height: 1.09rem;width: 3.6rem">
    <div id="homework">
      <ul class="list-content" :style="width">
        <li v-for="(list,index) in homeworkList" class="item" :key="index">
          <div class="diet-image">
            <img class :src="list.src">
          </div>
          <span class="title">{{list.title}}</span>
          <!--作业是否完成-->
          <span
            v-if="list.type"
            class="complete"
            :class="list.type == 1 ? 'yes' : 'no'"
          >{{list.type == 1 ? "已完成" : list.type == 2 ? "未完成" : ""}}</span>
          <!--错题数量-->
          <span v-if="list.num" class="complete yes">{{list.num}}题</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "homework",
  props: {
    homeworkList: {
      type: Array
    },
    width: {
      type: Object
    }
  }
};
</script>

<style scoped lang="less">
#homework {
  font-size: 0;
  height: 1.27rem;
  overflow-x: scroll;
  .list-content {
    /*width: 5.35rem;*/
    overflow: hidden;
    .item {
      float: left;
      width: 1.07rem;
      border-left: 0.01rem solid #f1f1f1;
      text-align: center;
      box-sizing: border-box;
      .diet-image {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0 auto 0.11rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title {
        display: block;
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #666;
        text-align: center;
        margin-bottom: 0.06rem;
      }
      .complete {
        display: inline-block;
        width: 0.6rem;
        height: 0.22rem;
        line-height: 0.22rem;
        font-size: 0.12rem;
        color: #fff;
        border-radius: 1rem;
        text-align: center;
      }
      .complete.yes {
        background-color: #53acf8;
      }
      .complete.no {
        background-color: #c2ddf4;
      }
    }
    .item:first-child {
      border-left-width: 0;
    }
  }
}
</style>
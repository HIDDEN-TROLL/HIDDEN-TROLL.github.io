<template>
  <ul class="student-list" v-if="studentList">
    <li class="item" v-for="(item,index) in studentList" :key="index">
      <div class="avatar">
        <img :src="item.image" alt />
      </div>
      <p class="name">{{item.name}}</p>
      <p class="grade-number">{{item.gradeName}}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "student--list",
  props: {
    studentList: {
      type: Array
    }
  }
};
</script>

<style scoped lang="less">
.student-list {
  margin-left: -0.05rem;
  overflow: hidden;
  .item {
    float: left;
    margin-left: 0.05rem;
    margin-bottom: 0.05rem;
    width: 0.81rem;
    height: 1.14rem;
    padding: 0.1rem 0 0.06rem 0;
    border-radius: 0.03rem;
    border: 0.01rem solid #dcdcdc;
    box-sizing: border-box;
    .avatar {
      width: 0.5rem;
      height: 0.5rem;
      text-align: center;
      margin: 0 auto 0.06rem;
      img {
        width: 100%;
        height: 100%;
        float: left;
        border-radius: 50%;
      }
    }
    .name {
      font-size: 0.14rem;
      color: #666;
      text-align: center;
      line-height: 0.2rem;
      margin-bottom: 0.02rem;
    }
    .grade-number {
      font-size: 0.12rem;
      color: #999;
      text-align: center;
    }
  }
}
</style>

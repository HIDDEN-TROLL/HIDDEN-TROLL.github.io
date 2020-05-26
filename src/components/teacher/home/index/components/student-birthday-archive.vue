<template>
  <section class="student_birthday_archive">
    <p class="title">{{ title }}</p>
    <div v-for="(item, index) in extra" :key="index" class="content">
      <p class="name">{{ item.name }}</p>
      <p class="content">
        <span>{{ item.content }}</span>
        <span class="score">+{{ item.worth }}</span>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StudentBirthdayArchive',
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: () => [],
      type: Array,
    },
  },
}
</script>

<style scoped lang="less">
.student_birthday_archive {
  margin: 0 .15rem;
  padding-top: .1rem;
  padding-bottom: .15rem;

  .title {
    font-weight: 500;
    color: #333;
    line-height: 0.2rem;
    position: relative;
    padding: 0 .12rem;
    margin-bottom: .04rem;
    font-size: .14rem;
    display: flex;
    justify-content: space-between;

    &:before {
      content: '';
      width: 0.02rem;
      height: 0.14rem;
      background-color: #3770FB;
      border-radius: 10px;
      position: absolute;
      left: 0;
      margin-top: 0.03rem;
    }
  }

  & > .content {
    font-size:0.12rem;
    color:rgba(102,102,102,1);
    line-height:0.17rem;
    padding-left: .1rem;
    padding-top: .1rem;
    padding-bottom: .15rem;
    &:not(:last-child) {
      border-bottom: .02rem dashed #eee;
    }
    .name {
      font-size:0.14rem;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:0.2rem;
    }
    .score {
      margin-left: .3rem;
      font-size:0.2rem;
      color:rgba(216,0,0,1);
      line-height:0.28rem;
    }
  }

}
</style>

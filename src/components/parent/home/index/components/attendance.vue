<template>
  <div v-if="!isEmpty(extra)" class="content">
    <p class="title">{{ title }}</p>
    <ul class="container">
      <li class="item" v-for="(attend, index) in extra" :key="index">
        <p class="name" v-if="attend.type === 'attend'">{{ attend.name }}</p>
        <div class="info" v-if="attend.type === 'attend'">
          <div class="entry">
            <span class="name">签到</span>
            <span class="time">{{ attend.entryTime }}</span>
          </div>
          <div class="exit">
            <span class="name">签离</span>
            <span class="time">{{ attend.exitTime }}</span>
          </div>
        </div>

        <p class="name" v-if="attend.type === 'training'">{{attend.name}}</p>
        <div class="info" v-if="attend.type === 'training'">
          <div class="entry" style="border: none;">
            <span class="name">签到</span>
            <span class="time">{{ attend.entryTime }}</span>
          </div>

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Attendance',
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
.content {
  background-color: #fff;
  border-bottom: .1rem solid #F3F7F8;
  padding: .15rem 0;

  .title {
    font-weight: 600;
    color: #333;
    line-height: 0.22rem;
    position: relative;
    padding: 0 .07rem;
    font-size: .16rem;
    margin-left: .16rem;

    &:before {
      content: '';
      width: 0.02rem;
      height: 0.16rem;
      background-color: #3770FB;
      border-radius: 10px;
      position: absolute;
      left: 0;
      margin-top: 0.03rem;
    }
  }

  .container {
    display: flex;
    flex-wrap: nowrap;
    margin-top: .23rem;
    overflow: scroll;
    font-size: .14rem;
    .item {
      margin-right: .13rem;

      &:first-of-type {
        padding-left: .25rem;
      }
      &:last-of-type {
        padding-right: .25rem;
      }

      & > .name {
        margin-bottom: .09rem;
        text-align: center;
        font-weight:500;
        color:#333;
        line-height:0.2rem;
      }

      & > .info {
        box-shadow: 0.01rem 0.02rem  rgba(0,0,0,0.08);
        border-radius:0.03rem;
        border:0.01rem solid rgba(237,237,237,1);
        padding: .1rem;
        display: flex;
        min-width: 35vw;
        margin-bottom: .1rem;
        .entry {
          border-right: .02rem dashed #f1f1f1;
        }
        .entry, .exit {
          width: 50%;
          flex-grow: 1;

          .name {
            margin-bottom: .08rem;
            font-weight:400;
            color:#666;
            line-height:0.2rem;
            display: block;
            text-align: center;
          }
          .time {
            font-size:0.12rem;
            font-weight:400;
            color:#84C225;
            line-height:0.17rem;
            display: block;
            text-align: center;
          }
        }
      }

    }
  }
}
</style>

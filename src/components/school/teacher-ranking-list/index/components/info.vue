<template>
  <div class="info">
    <p class="total_achievement">
      <span class="number">{{ data.totalAchievement }}</span>
      <br>
      <span class="desc">本月总成就值</span>
    </p>

    <div class="list_top">
      <div v-for="(teacher, index) in top3Teachers" :key="teacher.teacherId" :class="`top top${teacher.ranking} flex_order_${index}`">
        <span class="rank_title">{{ getRankTitle(teacher) }}</span>
        <img :src="teacher.image" alt="头像" class="image" :class="{ hide: isEmpty(teacher.image) }">
        <span class="name">{{ teacher.name }}</span>
        <span class="achievement">
          成就值：<span class="red">{{ teacher.score }}</span>
        </span>
        <div class="actions">
          <button class="action" @click="$emit('startGrade', teacher)">评分</button>
          <router-link class="action" :to="{ name: 'TeacherRankingListScoreDetails', params: { teacher } }">详情</router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TeacherAchievementInfo',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('teacherRankingList', [
      'data',
      'rankingList',
    ]),
    top3Teachers() {
      return this.rankingList.slice(0, 3)
    },
  },
  methods:{
    getRankTitle(teacher) {
      const list = ['其他', '第一名', '第二名', '第三名']
      return list[teacher.ranking] ? list[teacher.ranking] : list[0]
    },
  },
}
</script>

<style scoped lang="less">
.info {
  border-bottom: 0.1rem solid #F3F7F8;
  background-color: #fff;

  .total_achievement {
    margin-top: .2rem;
    margin-bottom: .15rem;
    width: 100%;
    font-size:0.14rem;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:0.2rem;
    text-align: center;

    .number {
      font-size:0.26rem;
      font-weight:500;
      color:rgba(216,0,0,1);
      line-height:0.37rem;
    }
  }
  .list_top {
    padding: .15rem 0;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;

    .top {
      width: 33%;
      flex-basis: 33%;
      flex-shrink: 0;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      &.flex_order_0 {
        order: 1;
      }
      &.flex_order_1 {
        order: 0;
      }
      &.flex_order_2 {
        order: 2;
      }


      &.top1 > .rank_title {
        color: #D80000;
      }
      &.top2 > .rank_title {
        color: #44D7B6;
      }
      &.top3 > .rank_title {
        color: #53ACF8;
      }

      .rank_title {
        font-size:0.14rem;
        font-weight:400;
        color:#000;
        line-height:0.2rem;
      }
      .image {
        width:0.4rem;
        height:0.4rem;
        background:rgba(216,216,216,1);
        border-radius: 50%;
        margin-top: .08rem;
        margin-bottom: .1rem;
        &.hide {
          visibility: hidden;
        }
      }
      .name, .achievement {
        margin-bottom: .05rem;
      }
      .name {
        font-size:0.14rem;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.2rem;
      }
      .achievement {
        font-size:0.14rem;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.2rem;
        .red {
          color: #D80000;
        }
      }
      .actions {
        .action {
          background: rgba(255, 255, 255, 1);
          border-radius: 0.03rem;
          border: 0.01rem solid rgba(132, 194, 37, 1);
          padding: 0 .1rem;
          margin: 0;
          font-size: 0.12rem;
          font-weight: 400;
          color: rgba(132, 194, 37, 1);
          line-height: 0.2rem;
          display: inline-block;
          &:active {
            background: rgba(132, 194, 37, 1);
            color: #fff;
          }
          &:not(:last-child) {
            margin-right: .05rem;
          }
        }
      }
    }
  }

}
</style>

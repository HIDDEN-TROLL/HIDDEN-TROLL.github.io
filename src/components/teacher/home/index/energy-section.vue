<template>
  <section class="energy_section">

    <van-loading v-show="loading" class="loading" />

    <section v-for="(item, index) in data" :key="index" class="category">
      <p class="title">{{ getName(item) }}打分（+{{ item.score }}分）</p>
      <p class="info">
        <span>今日为你打分{{ getName(item) }}：{{ item.numbers }}人</span>
        <span>获得分数：{{ item.score }}分</span>
      </p>
      <p v-for="(record, index2) in item.records" :key="index2" class="record">
        <span class="who">[{{ record.name }}]</span>
        <span class="content">{{ record.content }}</span>
      </p>
    </section>

  </section>
</template>

<script>
import { Loading } from 'vant'
import { getIndexEnergy } from '@/api/teacher/home'

export default {
  name: 'TeacherHomeEnergySection',
  components: {
    vanLoading :Loading,
  },
  data() {
    return {
      loading: true,
      data: [],
    }
  },
  created() {
    this.loading = true

    getIndexEnergy()
      .then(response => {
        if (response.data.meta.success) {
          this.data = response.data.data
        }
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    getName(item) {
      return item.type === 1 ? '教师' : '校长'
    },
  },
}
</script>

<style scoped lang="less">
.energy_section {
  .loading {
    margin: .15rem auto;
  }

  .category {
    padding: .15rem 0;
    margin: 0 .15rem;
    &:not(:last-child) {
      border-bottom: .02rem solid #eee;
    }
    .title {
      font-weight: 500;
      color: #333;
      line-height: 0.2rem;
      position: relative;
      padding: 0 .12rem;
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
    .info {
      font-size:0.12rem;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:0.17rem;
      margin-left: .1rem;
      margin-top: .1rem;
      margin-bottom: .1rem;
      span:nth-child(2) {
        margin-left: .4rem;
      }
    }
    .record {
      font-size:0.14rem;
      color:rgba(51,51,51,1);
      line-height:0.25rem;
      margin-left: .1rem;

      .who {
        margin-right: .1rem;
      }
      .content {
        word-wrap:break-word;
        word-break:break-all;
      }
    }
  }
}
</style>

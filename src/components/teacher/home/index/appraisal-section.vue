<template>
  <section class="appraisal_section">

    <van-loading v-show="loading" class="loading" />

    <section class="category">
      <p class="title">家长打分（+{{ data.score }}分）</p>
      <p class="info">
        <span>今日为你打分家长：{{ data.numbers }}人</span>
        <span>获得分数：{{ data.score }}分</span>
      </p>
      <p class="records">
        <span v-for="(record, index) in data.records" :key="index" >[{{ record.name }}] +{{ record.score }}</span>
      </p>
    </section>

  </section>
</template>

<script>
import { Loading } from 'vant'
import { getIndexAppraisal } from '@/api/teacher/home'

export default {
  name: 'TeacherHomeAppraisalSection',
  components: {
    vanLoading :Loading,
  },
  data() {
    return {
      loading: true,
      data: {},
    }
  },
  created() {
    this.loading = true

    getIndexAppraisal()
      .then(response => {
        if (response.data.meta.success) {
          this.data = response.data.data
        }
      })
      .finally(() => {
        this.loading = false
      })
  },
}
</script>

<style scoped lang="less">
.appraisal_section {
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
    .records {
      font-size:0.14rem;
      color:rgba(51,51,51,1);
      line-height:0.25rem;
      margin-left: .1rem;
      margin-top: .1rem;

      span {
        min-width: 50%;
        display: inline-block;
      }
    }
  }
}
</style>

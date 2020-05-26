<template>
  <div class="other_task">
    <van-nav-bar
      class="header"
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="$router.back()" />

    <van-loading v-show="loading" class="loading" />

    <div class="content" v-for="(item, index) in data" :key="index">
      <p class="title">{{ item.title }}</p>
      <p class="desc">{{ item.desc }}</p>
      <template v-if="item.subTask" >
        <div v-for="(subTask, index2) in item.subTask" :key="index2" class="sub_task">
          <p class="title">{{ subTask.title }}</p>
          <p class="desc">{{ subTask.desc }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { NavBar, Loading } from 'vant'
import { getIndexJobOtherTask } from '@/api/teacher/home'

export default {
  name: 'TeacherHomeIndexOtherTask',
  components: {
    vanNavBar: NavBar,
    vanLoading: Loading,
  },
  data() {
    return {
      loading: false,
      data: [],
    }
  },
  created() {
    this.loading = true

    getIndexJobOtherTask()
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
.other_task {
  font-size: .16rem;
  background-color: #fff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .header {
    flex-shrink: 0;
  }

  .loading {
    margin: .15rem auto;
  }

  .content {
    margin: 0 .15rem;
    padding: .1rem 0;

    &:not(:last-child) {
      border-bottom: .02rem solid #eee;
    }

    & > .title {
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

    .desc {
      margin-left: .08rem;
      font-size:0.12rem;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:0.17rem;
      white-space: pre;
    }

    .sub_task {
      margin-left: .08rem;
      padding-top: .1rem;
      padding-bottom: .1rem;
      &:not(:last-child) {
        border-bottom: .02rem dashed #eee;
      }
      .title {
        font-size:0.14rem;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:0.2rem;
      }
      .desc {
        margin-left: 0;
      }
    }
  }



}
</style>

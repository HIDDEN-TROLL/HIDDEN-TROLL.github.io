<template>
  <div class="lunch_history_student_item">
    <p class="student_info">
      <span class="name">{{ data.stuName }}</span>
      <span class="grade_name">{{ data.gradeName }}</span>
    </p>

    <div class="category">
      <p v-if="isEmpty(data.siestaDining)" class="no_data">暂无记录</p>

      <div
        v-for="(category_item, index) in data.siestaDining"
        :key="index"
        class="category_item">

        <p class="title">{{ category_item.title }}</p>
        <p class="status">
          <span class="left">状态</span>
          <span class="right">
            <span
              v-for="(status, index2) in category_item.status"
              :key="index2"
              class="item">{{ status }}</span>
          </span>
        </p>
        <p class="discipline">
          <span class="left">纪律</span>
          <span class="comment">{{ category_item.discipline.comment }}</span>
          <span class="number">{{ category_item.discipline.number }}</span>
        </p>

      </div>

    </div>

    <div v-if="!isEmpty(data.imgUrl)" class="image_list" @click="handlePreviewImage">
      <img
        v-for="(url, index) in data.imgUrl"
        :key="index"
        :src="url"
        :data-image_index="index"
        class="image"
        alt="image" />
    </div>

  </div>
</template>
<script>
import { previewImage } from '@/utils'

export default {
  name: 'lunch_history_student_item',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    handlePreviewImage(event) {
      let target = event.target
      if (!target.nodeName || target.nodeName.toLowerCase() !== 'img' || this.data.imgUrl.length <= 0) {
        return
      }

      const index = parseInt(target.dataset['image_index'])
      previewImage(this.data.imgUrl, Number.isInteger(index) ? index : 0)
    },
  },
}
</script>
<style scoped lang="less">
.lunch_history_student_item {
  padding: 0 .2rem;
  background-color: #fff;
  font-size: .16rem;

  &:not(:last-child) {
    margin-bottom: .12rem;
  }

  .student_info {
    padding-top: .2rem;
    padding-bottom: .1rem;
    border-bottom: 0.02rem dashed #eee;
    font-weight:400;
    line-height:0.24rem;

    .name {
      color: #333;
      margin: 0 .2rem;
    }

    .grade_name {
      color:#666;
    }
  }

  .category {
    padding-top: .1rem;
    padding-bottom: .2rem;
    overflow-x: scroll;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    box-sizing: border-box;

    .no_data {
      padding: .4rem 0;
      text-align: center;
      font-size: .16rem;
      flex-shrink: 0;
      width: 100%;
    }

    .category_item {
      flex-shrink: 0;
      width: 50%;
      padding: .12rem;
      box-sizing: border-box;

      &:not(:last-child) {
        border-right: 0.01rem solid #F1F1F1;
      }

      .title {
        height:0.24rem;
        font-size:0.16rem;
        font-weight:500;
        color:#333;
        line-height:0.24rem;
        margin-bottom: .12rem;
        text-align: center;
      }
      .status {
        display: flex;
        .left {
          height:0.24rem;
          font-size:0.16rem;
          font-weight:400;
          color:#333;
          line-height:0.24rem;
          flex-shrink: 0;
          margin-right: .1rem;
        }
        .right {
          flex-grow: 1;
          .item {
            height:0.24rem;
            font-size:0.16rem;
            font-weight:400;
            color:#666;
            line-height:0.24rem;
            word-break: break-word;

            &:not(:last-child):after {
              content: '、';
            }
          }
        }

      }
      .discipline {
        span:not(:last-child) {
          margin-right: .1rem;
        }
        .left {
          height:0.24rem;
          font-size:0.16rem;
          font-weight:400;
          color:#333;
          line-height:0.24rem;
        }
        .comment {
          height:0.24rem;
          font-size:0.16rem;
          font-weight:400;
          color:#666;
          line-height:0.24rem;
        }
        .number {
          height:0.24rem;
          font-size:0.16rem;
          font-weight:400;
          color:#D80000;
          line-height:0.24rem;
        }
      }
    }
  }

  .image_list {
    overflow-x: scroll;
    display: flex;
    flex-wrap: nowrap;
    background: linear-gradient(90deg, white 0%, rgba(255,255,255,0)), linear-gradient(-90deg, white 0%, rgba(255,255,255,0)) 100% 0, radial-gradient( farthest-side at 0% 50%, rgba(0,0,0,.4), rgba(0,0,0,0) ), radial-gradient( farthest-side at 100% 50%, rgba(0,0,0,.4), rgba(0,0,0,0) ) 100% 0%;
    background-repeat: no-repeat;
    background-color: #fff;
    background-size: 100px 100%, 100px 100%, 14px 100%, 14px 100%;
    background-attachment: local, local, scroll, scroll;

    border-top: 0.02rem dashed #eee;
    padding: .2rem 0;

    .image {
      width: .5rem;
      height: .5rem;
      flex-shrink: 0;

      &:not(:last-child) {
        margin-right: .12rem;
      }
    }
  }

}
</style>

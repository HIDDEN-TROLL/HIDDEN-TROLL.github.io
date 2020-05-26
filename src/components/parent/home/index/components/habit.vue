<template>
  <div v-if="!isEmpty(extra)" class="content">
    <p class="title">{{ title }}</p>
    <p v-if="isEmpty(extra.category)" class="no_data">无数据</p>
    <div class="category" v-else v-for="(category, index) in extra.category" :key="index">
      <p class="category_name">
        <span class="name">{{ category.name }}</span>
        <icon class="icon" name="icon-honghua"/>
        <span class="number">{{ category.worth >= 0 ? '+' : '' }}{{ category.worth }}</span>
      </p>
      <p v-for="(detail, index2) in category.details" :key="index2" class="detail">
        <span class="detail_content">{{ detail.content }}</span>
        <span class="number">{{ detail.worth >= 0 ? '+' : '' }}{{ detail.worth }}</span>
      </p>
    </div>

    <div v-if="Array.isArray(extra.other) && extra.other.length > 0" class="other">
      <p v-for="(comment, index) in extra.other" :key="index" >{{ comment }}</p>
    </div>

    <div v-if="!isEmpty(extra.images)" class="images">
      <img :src="image" alt="" class="image" v-for="(image, index3) in extra.images" :key="index3" @click="previewImage(category.images, index3)">
    </div>
  </div>
</template>

<script>
import icon from '@/components/common/icon'
import { previewImage } from '@/utils'

export default {
  name: 'Habit',
  components: {
    icon,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: () => [],
      type: Object,
    },
  },
  methods: {
    previewImage(images, index) {
      previewImage(images, index)
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

  .no_data {
    text-align: center;

  }

  .other {
    font-size:0.14rem;
    font-weight:400;
    line-height:0.2rem;
    margin: .1rem .16rem;
    padding: .07rem .07rem .17rem;
    color: #333;
    border-bottom: 0.02rem dashed #eee;
  }

  .category {
    font-size:0.14rem;
    font-weight:400;
    line-height:0.2rem;
    margin: .1rem .16rem;
    padding: .07rem;

    &:not(:last-child) {
      border-bottom: .02rem dashed #eee;
    }

    .category_name {
      color:rgba(51,51,51,1);
      margin-bottom: 0.08rem;
      .icon {
        margin-left: .13rem;
        margin-right: .05rem;
        color: #D80000;
      }
      .number {
        color: #D80000;
      }
    }
    .detail {
      font-size:0.12rem;
      color:rgba(102,102,102,1);
      line-height:0.17rem;
      .detail_content {}
      .number {
        font-size:0.14rem;
        color:rgba(216,0,0,1);
        line-height:0.2rem;
        margin-left: 0.09rem;
      }
    }

  }
  .images {
    display: flex;
    flex-wrap: nowrap;
    overflow: scroll;
    margin: .1rem 0;
    background: linear-gradient(90deg, white 0%, rgba(255,255,255,0)), linear-gradient(-90deg, white 0%, rgba(255,255,255,0)) 100% 0, radial-gradient( farthest-side at 0% 50%, rgba(0,0,0,.4), rgba(0,0,0,0) ), radial-gradient( farthest-side at 100% 50%, rgba(0,0,0,.4), rgba(0,0,0,0) ) 100% 0%;
    background-repeat: no-repeat;
    background-color: #fff;
    background-size: 100px 100%, 100px 100%, 14px 100%, 14px 100%;
    background-attachment: local, local, scroll, scroll;

    .image {
      max-width: .6rem;
      max-height: .6rem;
      margin-right: .15rem;

      &:first-child {
        margin-left: .2rem;
      }
      &:last-child {
        padding-right: .2rem;
      }
    }
  }
}
</style>

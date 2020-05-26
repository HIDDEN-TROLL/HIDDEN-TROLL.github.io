<template>
  <div class="evaluation_select_comment_area_category">

    <!--<h1 class="title">{{ title }}</h1>-->

    <div class="comment_list">
      <p v-if="isEmpty(commentList)" class="no_data" >暂无评语</p>

      <div v-for="(comment, index) in commentList" :key="index" class="comment_item" :class="{ selected: selectedCommentIdList.includes(comment.id) }" @click="toggleSelectComment([commentCategoryId, comment])">
        <div class="left">
          <icon class="icon" name="icon-honghua" color="#d80000" />
          <span>{{ commentType === 0 ? '+' : '-' }}</span>
          <span>{{ comment.worth }}</span>
        </div>
        <div class="right">
          {{ comment.content }}
        </div>
      </div>
    </div>

    <button class="new_comment" @click="$emit('new-comment', commentType, commentCategoryId)">
      <van-icon class="icon" name="add" />
      <span>新增评语</span>
    </button>

  </div>
</template>
<script>
import icon from '@/components/common/icon.vue'
import { Icon } from 'vant'
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'evaluation_select_comment_area_category',
  props: {
    title: {
      type: String,
      default: '',
    },
    commentType: {
      type: Number,
      default: 0,
    },
    commentCategoryId: {
      type: Number,
      default: 0,
    },
    commentList: {
      type: Array,
      default: () =>[],
    },
  },
  components: {
    icon,
    vanIcon: Icon,
  },
  computed: {
    ...mapGetters('evaluation', [
      'selectedCommentIdList'
    ]),
  },
  methods: {
    ...mapMutations('evaluation', [
      'toggleSelectComment'
    ]),
  }
}
</script>
<style scoped lang="less">
.evaluation_select_comment_area_category *{
  font-size: .16rem;
}

.evaluation_select_comment_area_category {
  padding: .2rem .2rem .0rem;
  background-color: #fff;

  /*.title {*/
    /*font-weight: 600;*/
    /*color: #333;*/
    /*line-height: 0.24rem;*/
    /*position: relative;*/
    /*padding: .2rem .12rem;*/

    /*&:before {*/
      /*content: '';*/
      /*width: 0.02rem;*/
      /*height: 0.20rem;*/
      /*background-color: #3770FB;*/
      /*border-radius: 10px;*/
      /*position: absolute;*/
      /*left: 0;*/
      /*margin-top: 0.02rem;*/
    /*}*/
  /*}*/

  .comment_list {
    .no_data {
      padding: .4rem 0;
      text-align: center;
      font-size: .16rem;
    }

    .comment_item {
      border-radius: 0.04rem;
      border: 0.01rem solid #999;
      display: flex;
      align-items: center;
      min-height: .31rem;
      position: relative;
      font-size: .14rem;
      margin-bottom: 0.08rem;

      &.selected {
        border-color: #3770fb;
        background-color: #3770fb;
        color: #fff;

        .left:after {
          background-color: #3770fb;
        }
      }

      .left {
        width: .8rem;
        flex-shrink: 0;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        &:after {
          content: '';
          width: 0.01rem;
          background-color: #999;
          position: absolute;
          top: 0;
          bottom: 0;
          left: .8rem;
        }

        .icon {
          font-size: .24rem;
          margin: 0 .05rem;
        }
        span {
          font-size: .14rem;
        }
      }
      .right {
        flex-grow: 1;
        font-size: .14rem;
        padding: 0.05rem 0.1rem;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }

  .new_comment {
    margin-left: 0.1rem;
    color: #999;
    background: transparent;
    border: 0;
    padding: 0;
    line-height: 0.44rem;
    font-size: 0.16rem;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      margin-right: .12rem;
      font-size: .21rem;
    }
  }
}
</style>

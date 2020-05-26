<template>
  <div class="lunch_select_comment">

    <p v-show="selectedStudent === null" class="not_selected_student">请先选择学生</p>

    <div v-if="isDataReady" v-show="selectedStudent !== null" class="select_comment_area">
      <select-comment-area-category
        class="select_comment_area_category"
        title="用餐情况 午餐"
        subtitle="午餐情况"
        category-key="lunch"
        :comment-list="diningCommentList"
        :discipline="diningDiscipline">

        <button class="button" @click="$refs['new-comment'].show(2)">
          <van-icon class="icon" name="add" />
          <span>快速新增状态</span>
        </button>

      </select-comment-area-category>

      <select-comment-area-category
              class="select_comment_area_category"
              title="午休情况"
              subtitle="午休状态"
              category-key="siesta"
              :comment-list="siestaCommentList"
              :discipline="siestaDiscipline" >

        <button class="button" @click="$refs['new-comment'].show(1)">
          <van-icon class="icon" name="add" />
          <span>快速新增状态</span>
        </button>

      </select-comment-area-category>

      <select-comment-area-category
              class="select_comment_area_category"
              title="用餐情况 晚餐"
              subtitle="晚餐情况"
              category-key="dinner"
              :comment-list="diningCommentList"
              :discipline="diningDiscipline" >

        <button class="button" @click="$refs['new-comment'].show(2)">
          <van-icon class="icon" name="add" />
          <span>快速新增状态</span>
        </button>

      </select-comment-area-category>
    </div>

    <new-comment ref="new-comment"/>

  </div>
</template>
<script>
import selectCommentAreaCategory from './select-comment-area-category'
import newComment from './new-comment'
import { mapState } from 'vuex'
import { Icon } from 'vant'

export default {
  name: 'lunch_select_comment',
  data() {
    return {}
  },
  components: {
    selectCommentAreaCategory,
    newComment,
    vanIcon: Icon,
  },
  computed: {
    ...mapState('lunch', [
      'isDataReady',
      'selectedStudent',

      'siestaCommentList',
      'diningCommentList',
      'siestaDiscipline',
      'diningDiscipline',
    ]),
  },
}
</script>
<style scoped lang="less">
.lunch_select_comment {
  flex-grow: 1;

  .not_selected_student {
    font-size: .16rem;
    text-align: center;
    padding: .2rem 0;
    background-color: #fff;
    height: 100%;
  }
}
</style>

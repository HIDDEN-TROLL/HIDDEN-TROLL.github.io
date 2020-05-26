<template>
  <div class="evaluation_select_comment">

    <div v-if="loading" class="loading_warp">
      <loading class="loading" size="40px"/>
    </div>


    <template v-else>

      <div class="tabs">
        <tabs
          :value="currentCommentType"
          type="card"
          color="#3770fb"
          title-active-color="#fff"
          title-inactive-color="#666"
          @change="setCurrentCommentType">
          <tab title="奖励小红花"/>
          <tab title="扣除小红花"/>
        </tabs>
      </div>

      <more-tabs class="scrollable comment-category" v-model="commentCategoryIndex" :list="commentCategoryNameList"
                 :badge-list="currentCommentType === tabBadgeListAvailableFor ? tabBadgeList : []" :show-dropdown="false"/>

      <div class="select_comment_area" v-for="(commentTypeKey, index) in commentTypes" :key="index">
        <select-comment-area-category
          class="select_comment_area_category"
          v-show="currentCommentType === index && commentCategoryIndex === index2"
          v-for="(commentCategory, index2) in commentList[commentTypeKey]"
          :key="index2"
          :title="commentCategory.categoryName"
          :commentType="index"
          :commentCategoryId="commentCategory.categoryId"
          :commentList="commentCategory.comment"
          @new-comment="$refs['new-comment'].show"
        />
      </div>

    </template>

    <new-comment ref="new-comment"/>
  </div>
</template>
<script>
import { Loading, Tabs, Tab } from 'vant'
import selectCommentAreaCategory from './select-comment-area-category'
import newComment from './new-comment'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import moreTabs from '@/components/common/more-tabs.vue'

const tabBadgeDotConfig = {
  style: {
    'width': '8px',
    'height': '8px',
    'display': 'block',
    'background': '#999',
    'position': 'absolute',
    'right': '-5px',
    'top': '8px',
    'border-radius': '50%',
    'border': '1px solid #666',
  },
  text: '',
}

export default {
  name: 'evaluation_select_comment',
  data() {
    return {
      loading: false,
      commentTypes: ['rewardComment', 'deductComment'],
      commentCategoryIndex: 0,
      tabBadgeList: [],
      tabBadgeListAvailableFor: 0,
    }
  },
  components: {
    selectCommentAreaCategory,
    newComment,
    Loading,
    Tabs,
    Tab,
    moreTabs,
  },
  computed: {
    ...mapState('evaluation', [
      'currentCommentType',
      'commentList',
      'commentCategoryList',
      'selectedCommentList',
      't',
    ]),
    ...mapGetters('evaluation', [
      'selectedCommentNumbers',
    ]),
    commentCategoryNameList() {
      return this.commentCategoryList.map(category => category.categoryName)
    },
  },
  watch: {
    t() {
      this.updateTabBadgeList()
    },
    selectedCommentNumbers() {
      this.updateTabBadgeList()
    },
  },
  created() {
    this.loading = true
    this.fetchCommentList(undefined)
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    ...mapActions('evaluation', [
      'fetchCommentList',
    ]),
    ...mapMutations('evaluation', [
      'toggleShowGradeName',
      'setCurrentCommentType',
      'selectStudent',
      'unselectStudent',
    ]),

    updateTabBadgeList() {
      const selectedCommentCategoryId = this.selectedCommentList.map(category => {
        return category.comments.length > 0 ? category.categoryId : 0
      })
      this.tabBadgeListAvailableFor = this.currentCommentType
      this.tabBadgeList = this.commentCategoryList.map(category => {
        return selectedCommentCategoryId.includes(category.categoryId) ? tabBadgeDotConfig : undefined
      })
    },
  },
}
</script>
<style scoped lang="less">
.evaluation_select_comment {
  flex-grow: 1;
  background-color: #fff;

  .loading_warp {
    background-color: #fff;
    padding: .4rem 0;

    .loading {
      margin: 0 auto;
    }
  }

  .tabs {
    padding-top: .2rem;
    background-color: #fff;
  }

  .select_comment_area {
    .no_data {
      padding: .4rem 0;
      text-align: center;
      font-size: .16rem;
      background-color: #fff;
    }

    .select_comment_area_category {
      margin-bottom: .12rem;
    }
  }
}

</style>

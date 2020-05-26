<template>
  <div class="select_comment_area_category">

    <div class="title">
      <span class="left">{{ title }}</span>

      <div class="right">
        <slot></slot>
      </div>
    </div>

    <div class="comments">
      <div class="comment">
        <span class="first">{{ subtitle }}</span>
        <span class="second">状态</span>
      </div>
      <div v-for="(comment, index) in commentList" :key="index" class="comment" @click="selectComment([categoryKey, comment.comment])">
        <span class="first">{{ comment.comment }}</span>
        <van-checkbox
          class="second"
          shape="square"
          icon-size=".2rem"
          checked-color="#1890ff"
          :value="currentSiestaDining.status && currentSiestaDining.status.includes(comment.comment)"></van-checkbox>
      </div>
    </div>

    <div class="discipline">
      <span class="name">纪律</span>

      <span class="items">
        <span
          v-for="(item, index) in discipline"
          :key="index"
          @click="selectDiscipline([categoryKey, item.id])"
          class="item"
          :class="{ selected: currentSiestaDining.discipline === item.id }"
        >{{ item.name }}</span>
      </span>

      <span class="safflower">
        <icon class="icon" name="icon-honghua" color="#d80000" />
        <span>{{ safflowerText }}</span>
      </span>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { Checkbox } from 'vant'
import icon from '@/components/common/icon.vue'

export default {
  name: 'lunch_select_comment_area_category',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    categoryKey: {
      type: String,
      default: '',
    },
    commentList: {
      type: Array,
      default:() => [],
    },
    discipline: {
      type: Array,
      default:() => [],
    },
  },
  components: {
    icon,
    vanCheckbox: Checkbox,
  },
  data() {
    return {
      currentSiestaDining: {},
    }
  },
  computed: {
    ...mapState('lunch', [
      'selectedStudent',
    ]),
    safflowerText() {
      if (!this.selectedStudent) {
        return ''
      }
      const currentId = parseInt(this.selectedStudent.siestaDining[this.categoryKey].discipline)
      const discipline = this.discipline.find(item => item.id === currentId)
      if (discipline) {
        return discipline.number >= 0 ? `+${discipline.number}朵` : `${discipline.number}朵`
      }
      return '获取错误'
    },
  },
  methods: {
    ...mapMutations('lunch', [
      'selectComment',
      'selectDiscipline',
    ]),
  },
  watch: {
    selectedStudent() {
      if (this.selectedStudent && this.selectedStudent.siestaDining[this.categoryKey]) {
        this.currentSiestaDining = this.selectedStudent.siestaDining[this.categoryKey]
      } else {
        this.currentSiestaDining = {}
      }
    }
  },
}
</script>
<style scoped lang="less">
.select_comment_area_category {
  padding: 0 .2rem;
  background-color: #fff;
  font-size: .16rem;
  margin-bottom: .12rem;

  .title {
    font-size: .16rem;
    font-weight: 600;
    color: #333;
    line-height: 0.24rem;
    position: relative;
    padding: .12rem 0;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;

    &:before {
      content: '';
      width: 0.02rem;
      height: 0.20rem;
      background-color: #3770FB;
      border-radius: 10px;
      position: absolute;
      left: 0;
    }

    .left {
      padding: 0 .12rem;
      flex-grow: 1;
    }

    .right {
      flex-shrink: 0;

      .button {
        border: 0;
        padding: 0;
        margin: 0;
        color: #999;
        background-color: transparent;
        font-weight: 400;
        font-size: .16rem;
        display: inline-flex;
        align-items: center;

        &:not(:last-child) {
          margin-right: .08rem;
        }

        .icon {
          margin-right: .04rem;
          font-size: 120%;
          color: #ccc;
        }
      }
    }
  }

  .comments {
    overflow-x: scroll;
    display: flex;
    flex-wrap: nowrap;
    background: linear-gradient(90deg, white 0%, rgba(255,255,255,0)), linear-gradient(-90deg, white 0%, rgba(255,255,255,0)) 100% 0, radial-gradient( farthest-side at 0% 50%, rgba(0,0,0,.2), rgba(0,0,0,0) ), radial-gradient( farthest-side at 100% 50%, rgba(0,0,0,.2), rgba(0,0,0,0) ) 100% 0%;
    background-repeat: no-repeat;
    background-color: #fff;
    background-size: 100px 100%, 100px 100%, 14px 100%, 14px 100%;
    background-attachment: local, local, scroll, scroll;

    .comment {
      margin: 0 .12rem;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;

      .first {
        margin: .12rem 0;
      }

      .second {
        margin-bottom: .12rem;
      }

      span {
        font-size:0.16rem;
        font-weight:400;
        line-height:0.24rem;
        color:#999;
        &:first-child {
          color: #666;
        }
      }
    }
    .comment:last-of-type {
      padding-right: .2rem;
    }
  }

  .discipline {
    padding: .2rem 0 .2rem .12rem;

    .name {
      font-size:0.16rem;
      font-weight:400;
      color:#333;
      line-height:0.24rem;
      margin-right: .2rem;
    }

    .items {
      margin-right: .2rem;
      .item {
        font-size: 0.14rem;
        border: 0.01rem solid #e7e7e7;
        display: inline-block;
        text-align: center;
        padding: 0.08rem .12rem;

        &:not(:last-child) {
          border-right: 0;
        }

        &.selected {
          background-color:#3770FB;
          border-color:#3770FB;
          color: #fff;
        }
      }
    }


    .safflower {
      color: #D80000;
    }
  }
}
</style>

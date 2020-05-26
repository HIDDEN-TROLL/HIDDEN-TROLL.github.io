<template>
  <div class="more-tabs" :style="{ opacity: isEmpty(list) ? 0 : 1 }" :class="size">
    <tabs
      class="tabs"
      v-model="index2"
      :ellipsis="false"
      title-active-color="#69f"
      title-inactive-color="#666"
      color="#69f">
      <tab
        v-for="(name, index) in list"
        :key="index"
        :title="name"
        class="tab">
        <div slot="title">
          <span>{{ name }}</span>

          <template v-if="badgeList[index] !== undefined">

            <span v-if="typeof badgeList[index] === 'string'" class="badge">{{ badgeList[index] }}</span>
            <span v-else class="badge" :style="badgeList[index].style">{{ badgeList[index].text }}</span>

          </template>
        </div>
      </tab>
    </tabs>
    <icon v-if="showDropdown" class="dropdown-opener" name="arrow-down" @click="isActionSheetShow = true"/>
    <Actionsheet
      v-if="showDropdown"
      class="action-sheet"
      v-model="isActionSheetShow"
      :actions="actionSheetActions"
      :get-container="container"
      cancel-text="取消"
      @select="onActionSheetSelect"/>
  </div>
</template>

<script>
import { Icon, Tab, Tabs, Actionsheet } from 'vant'

export default {
  name: 'more-tabs',
  components: {
    Tab,
    Tabs,
    Icon,
    Actionsheet,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
      require: true,
    },
    badgeList: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Number,
      default: 0,
      require: true,
    },

    size: {
      type: String,
    },
    showDropdown: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      index2: 0,
      isActionSheetShow: false,
      container: () => document.getElementById('app'),
    }
  },
  mounted() {
    this.index2 = this.value
  },
  watch: {
    value() {
      this.index2 = this.value
    },
    index2() {
      this.onIndexChange()
    },
    isActionSheetShow() {
      this.$emit('onActionSheetVisibleChange', this.isActionSheetShow)
    },
  },
  computed: {
    actionSheetActions() {
      return this.list.map((name, index) => {
        return {
          index,
          name,
          className: index === this.index2 ? 'active' : 'non-active',
        }
      })
    },
  },
  methods: {
    onActionSheetSelect(item) {
      const index = item.index
      this.isActionSheetShow = false
      this.index2 = index
      this.onIndexChange()
    },
    onIndexChange() {
      this.$emit('input', this.index2)
      this.$emit('change', this.index2)
    },
  },
}
</script>

<style scoped lang="less">
.more-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  font-size: .16rem;

  .tabs {
    flex-grow: 1;
  }

  .dropdown-opener {
    width: 44px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #eee;
    font-size: 130%;
    height: 44px;
    margin-left: 4px;
  }
}
.action-sheet {

  .active {
    color: #fff;
    background: #3770fb;
  }
}

.custom-tab-height(@tabs-card-height, @tabs-line-height) {

  .dropdown-opener {
    width: @tabs-card-height;
    height: @tabs-card-height;
  }

  /deep/ .van-tab {
    line-height: @tabs-line-height;
  }

  /deep/ .van-tabs {

    &__nav {

      &--card {
        height: @tabs-card-height;

        .van-tab {
          line-height: @tabs-card-height - 2px;
        }
      }
    }

    &--line {
      padding-top: @tabs-line-height;

      .van-tabs__wrap {
        height: @tabs-line-height;
      }
    }

    &--card {
      padding-top: @tabs-card-height;

      > .van-tabs__wrap {
        height: @tabs-card-height;
      }
    }
  }
}

.more-tabs {

  &.small {
    font-size: .14rem;
    .custom-tab-height(.4rem, .4rem)
  }

  &.big {
    font-size: .16rem;
    .custom-tab-height(.5rem, .5rem)
  }
}


</style>

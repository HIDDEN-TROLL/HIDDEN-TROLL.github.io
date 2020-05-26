<template>
  <div v-if="!isEmpty(extra)" class="content">
    <div class="list">
      <IconTitle icon-class="icon-yinshi #3770fb" :content="title" />
      <div class="detail">
        <div style="overflow: hidden;width: 3.6rem">
          <div class="diet">
            <ul class="list-content">
              <li v-for="(item,index) in extra" class="item" :key="index">
                <img class="image" :src="item.image" alt="" />
                <span class="title">{{ item.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconTitle from '@/components/common/icon-title'

export default {
  name: 'Diet',
  components: {
    IconTitle,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: () => [],
      type: Array,
    },
  },
}
</script>

<style scoped lang="less">
.content {
  font-size: 0;
  background-color: #f3f7f8;
  text-align: left;
  padding-bottom: .1rem;

  .list {
    padding: 0.16rem 0.15rem;
    background-color: #fff;
    box-sizing: border-box;

    #icon-title {
      display: block;
      margin-bottom: 0.15rem;
      text-align: left;

      .theme {
        line-height: 0.22rem;

        .icons {
          font-size: 0.16rem;
          position: relative;
          top: 0.02rem;
        }

        .text {
          font-size: 0.16rem;
          font-weight: 500;
          margin-left: 0.08rem;
          color: #333;
        }
      }
    }
  }
}

.diet {
  font-size: 0;
  overflow-x: scroll;
  .list-content {
    width: auto;
    overflow-x: scroll;
    white-space: nowrap;
    .item {
      padding: 0.08rem;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      min-width: 0.8rem;
      display: inline-flex;
      flex-direction: column;
      .image {
        width: 1rem;
        height: .8rem;
      }
      .title {
        text-align: center;
        font-size: 0.14rem;
        line-height: 0.2rem;
        margin: 0.1rem 0;
        color: #666;
      }
    }
  }
}
</style>

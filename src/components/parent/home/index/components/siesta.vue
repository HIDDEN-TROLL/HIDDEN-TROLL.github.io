<template>
  <div v-if="!isEmpty(extra)" class="content">
    <p class="title">
      <span>{{ title }}</span>
    </p>
    <table>
      <thead>
        <tr>
          <th>类型</th>
          <th>午休</th>
          <th>午餐</th>
          <th>晚餐</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>状态</td>
          <td v-for="(category, index) in data" :key="index" class="status">{{ category.statusText }}</td>
        </tr>
        <tr>
          <td>纪律</td>
          <td v-for="(category, index) in data" :key="index">
            <icon v-if="category.iconName" class="icon" :name="category.iconName" />
          </td>
        </tr>
        <tr>
          <td>得分</td>
          <td v-for="(category, index) in data" :key="index">
            <span v-if="category.score >= 0" class="score reward">{{ category.score }}</span>
            <span v-else class="score deduct">{{ category.score }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import { Icon } from 'vant'
import icon from '@/components/common/icon'
      // <router-link class="right" :to="{ name: 'Lunch' }">
      //   查看更多<van-icon class="icon" name="arrow" />
      // </router-link>
export default {
  name: 'Siesta',
  components: {
    // vanIcon: Icon,
    icon,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: null,
      type: Object,
    },
  },
  computed: {
    data() {
      if (this.extra === null) {
        return []
      }

      const iconNameList = [
        undefined,
        'icon-bukaixin #4d4d4d',
        'icon-xiaolian #f7b500',
        'icon-xiaolian #f7b500',
        'icon-xiaolian #d80000'
      ]
      return [
        this.extra['siesta'],
        this.extra['lunch'],
        this.extra['dinner'],
      ].map((category) => {
        category.statusText = category.status ? category.status.join('、') : ''
        if (category.discipline) {
          category.iconName = iconNameList[category.discipline.id] ? iconNameList[category.discipline.id] : undefined
          category.score = category.discipline.number
        } else {
          category.iconName = undefined
          category.score = ''
        }
        return category
      })
    }
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

    .right {
      float: right;
      font-size: 0.14rem;
      font-weight: 400;
      color: rgba(153,153,153,1);
      line-height: 0.17rem;

      .icon {
        vertical-align: top;
        line-height: 0.17rem;
      }

      &:active {
        background-color: #eee;
      }
    }
  }

  table {
    margin-top: .23rem;
    padding-left: .17rem;
    padding-right: .17rem;
    width: 100%;
    border-spacing: 0;

    th, td {
      border-left: 0.01rem solid #DCDCDC;
      border-top: 0.01rem solid #DCDCDC;
      width: 25%;
      height: .3rem;
      text-align: center;
      padding: .05rem;
      font-size:0.14rem;
      font-weight:400;
      color:#333;
      line-height:0.17rem;

      &.status, .deduct {
        color: #666;
      }
      .reward {
        color: #D80000;
      }
      .icon {
        font-size: .25rem;
      }
    }
    tr {
      th:last-of-type,
      td:last-of-type{
        border-right: .01rem solid #DCDCDC;
        /*border-bottom: .01rem solid #DCDCDC;*/
      }
    }
    tr:last-of-type {
      td {
        border-bottom: .01rem solid #DCDCDC;
      }
    }
  }
}
</style>

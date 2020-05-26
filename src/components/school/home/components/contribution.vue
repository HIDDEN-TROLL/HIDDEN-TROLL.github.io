<template>
  <div class="mask">
    <div class="mask_top">
      <p>
        <router-link :to="{ name:'TODO' }">查看贡献值详情&gt;&gt;</router-link>
      </p>
    </div>

    <div v-for="(item,index) in topmask" :key="index">
      <div class="mask_b">
        <div class="mask_b_f">
          <div class="img_title">
            <icon :name="item.titileimg" />
          </div>
          <div class="mask_b_title">{{item.mastitile}}</div>
          <div class="mask_b_date">{{item.masnumber}}</div>
          <div class="mask_b_ud">
            <icon :name="item.ud_img" />
          </div>
          <div class="mask_b_ms">{{item.bottomTip}}</div>
        </div>
      </div>
      <div class="hr_s_div">
        <hr class="hr_s">
      </div>
    </div>
  </div>
</template>

<script>
import icon from '@/components/common/icon'

export default {
  name: 'Contribution',
  components: {
    icon,
  },
  props: {
    extra: {
      default: () => {},
      type: Object
    }
  },
  data() {
    return {
      topmask: []
    }
  },
  mounted() {
    this.topmask = [
      {
        mastitile: '本月总贡献',
        masnumber: this.extra.total,
        titileimg: 'icon-xing #d80000',
        ud_img: 'icon-jiantou-chaoguocopy #d80000',
        bottomTip: '超过' + this.extra.totalMoreThanPercentage + '%的机构'
      },
      {
        mastitile: '月平均值',
        masnumber: this.extra.avg,
        titileimg: 'icon-jiantou-paiming #4d80fb',
        ud_img: 'icon-jiantou-lahoucopy #589100',
        bottomTip: '超过' + this.extra.avgMoreThanPercentage + '%的机构'
      },
      {
        mastitile: '上月第一名',
        masnumber: this.extra.lastMonthFirstPlace==null?'--':this.extra.lastMonthFirstPlace.name,
        titileimg: 'icon-jiangbei #84c225',
        ud_img: 'icon-jiangbei #84c225',
        bottomTip: this.extra.lastMonthFirstPlace==null ? '' : '获贡献值' + this.extra.lastMonthFirstPlace.total
      }
    ]
  }
}
</script>

<style scoped lang="less">
.mask {
  width: 3.43rem;
  height: 2.02rem;
  border: solid white 0.01rem;
  background-color: white;
  margin: 0 0.16rem 0 0.16rem;
  box-shadow: 0rem 0.02rem 0.04rem 0rem rgba(0, 0, 0, 0.09);
  border-radius: 0.07rem;
}
.mask_top {
  margin-top: 0.14rem;
}
.mask p {
  height: 0.2rem;
  font-size: 0.14rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(132, 194, 37, 1);
  line-height: 0.2rem;
}
.mask_top_q {
  border-radius: 100%;
  width: 0.16rem;
  height: 0.16rem;
  border: solid 0.01rem green;
  font-size: 0.12rem;
  float: left;
  color: green;
}
.img_title {
  width: 0.16rem;
  height: 0.16rem;
  font-size: 0.12rem;
  float: left;
}
.mask_b_f {
  float: left;
  margin: 0.13rem 0 0 0.15rem;
}
.mask_b_f img {
  width: 0.16rem;
  height: 0.16rem;
}
.mask_b_title {
  width: 0.9rem;
  height: 0.2rem;
  font-size: 0.14rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 0.2rem;
}
.mask_b_date {
  margin: 0.1rem auto;
  height: 0.22rem;
  font-size: 0.16rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  line-height: 0.22rem;
}
.mask_b_ud {
  margin: 0 auto;
  width: 0.16rem;
  height: 0.16rem;
}
.mask_b_ms {
  margin: 0.1rem auto;
  width: 0.71rem;
  height: 0.34rem;
  font-size: 0.12rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 0.17rem;
}

.hr_s_div {
  float: left;
  margin: 0.2rem 0 0 0;
}
.hr_s {
  float: left;
  margin-left: 0.08rem;
  border: none;
  width: 0.01rem;
  height: 1.27rem;
  background: rgba(241, 241, 241, 1);
}
</style>

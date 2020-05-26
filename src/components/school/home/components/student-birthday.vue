<template>
  <div class="content">
    <div class="list bri_bg">
      <IconTitle icon-class="icon-shengri #3770fb" :content="title"></IconTitle>
      <div class="bri_cake" style="margin-top: .2rem;">
        <div class="bri_cake_mar">
          <div class="bri_cake_pic"></div>
          <div class="bri_per" v-if="extra!=null">共{{extra}}人</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconTitle from '@/components/common/icon-title';

export default {
  name: 'StudentBirthday',
  components: {
    IconTitle,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: 0,
      type: Number,
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
    padding: .16rem .15rem;
    background-color: #fff;
    /*margin-bottom: .1rem;*/
  }
  .bri_cake_mar {
    width: 0.5rem;
    margin: 0 auto;
  }

  .bri_bg {
    height: 1.65rem;
    background: url("../../../../assets/img/teachers/index/bg.png") no-repeat center;
    /*margin: 0 0 0.1rem 0;*/
    background-size: cover;
  }

  .bri_cake_pic {
    width: 0.5rem;
    height: 0.5rem;
    background: url("../../../../assets/img/teachers/index/生日礼物.png") no-repeat
    /*center;*/
  }

  .bri_per {
    text-align: center;
    width: 0.5rem;
    height: 0.2rem;
    font-size: 0.14rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 0.2rem;
  }
}

</style>

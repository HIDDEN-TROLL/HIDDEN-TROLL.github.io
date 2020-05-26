<template>
  <section class="charge_info">
    <p class="line">
      <span class="title">{{ title }}</span>
      <span v-if="extra.fee >= 0" class="fee">{{ extra.fee }}元</span>
      <span v-if="extra.balance >= 0" class="balance">剩余{{ extra.balance }}元</span>
      <span class="action">
        <button class="button" @click="$router.push({ name:'Charge' })">查看</button>
      </span>
    </p>

    <p class="line">
      <span v-if="extra.info" class="info">{{ extra.info }}</span>
    </p>
    <p class="line">
      <span v-if="extra.warning" class="warning">{{ extra.warning }}</span>
    </p>

  </section>
</template>

<script>
export default {
  name: 'ChargeInfo',
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: () => {},
      type: Object,
    },
  },
}
</script>

<style scoped lang="less">
.charge_info {
  padding: .1rem .15rem;
  border-bottom: .1rem solid #F3F7F8;

  .line {
    font-size:0.14rem;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:0.2rem;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    overflow: scroll;
    margin: .05rem 0;

    .title {
      font-weight: bold;
    }
    .fee {
      margin-left: .1rem;
    }
    .balance {
      margin-left: .1rem;
      color:rgba(132,194,37,1);
    }
    .action {
      flex-grow: 1;
      text-align: right;

      .button {
        background:rgba(255,255,255,1);
        border-radius:0.03rem;
        border:0.01rem solid rgba(132,194,37,1);
        color: rgba(132,194,37,1);
        font-size:0.12rem;
        line-height:0.17rem;
        &:active {
          color: #fff;
          background: rgba(132,194,37,1);
        }
        &.hide {
          display: none;
        }
      }
    }
    .info {
      color:#333;
      word-wrap:break-word;
      word-break:break-all;
    }
    .warning {
      color:rgba(216,0,0,1);
      word-wrap:break-word;
      word-break:break-all;
    }
  }
}
</style>

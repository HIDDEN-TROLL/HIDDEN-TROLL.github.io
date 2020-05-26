<template>
  <van-dialog
    :value="value"
    @confirm="$emit('input', false)"
    @cancel="$emit('input', false)"
    class="charge-rule-dialog">

      <div class="rule-content">
        <div class="rule_info">
          <div class="situation_first">
            <div class="situation_tit clearfix">
              <h4>情况一</h4>
              <p>学生开通人数&lt;<span class="minimum_student_count">{{ minimumStudentCount }}</span>人</p>
            </div>
            <div class="situation_content">
              <p class="alignCenter">
                未满
                <span class="minimum_student_count">{{ minimumStudentCount }}</span>
                人按
                <span class="minimum_student_count">{{ minimumStudentCount }}</span>
                人计费
              </p>
              <p class="alignCenter">
                <span class="minimum_student_count">{{ minimumStudentCount }}</span>
                人 *
                <span class="price_pre_student">{{ pricePreStudent }}</span>
                元/位 =
                <span class="minimum_cost">{{ minimumCost }}</span>
                元
              </p>
            </div>
          </div>
          <div class="situation_second">
            <div class="situation_tit clearfix">
              <h4>情况二</h4>
              <p>学生开通人数≥<span class="minimum_student_count">{{ minimumStudentCount }}</span>人</p>
            </div>
            <div class="situation_content">
              <h5 class="alignCenter">根据实际人数收费</h5>
              <div class="bingding">
                <h6>当月绑定</h6>
                <p>A、当月10号前绑定，按1个月<span class="price_pre_student">{{ pricePreStudent }}</span>元计费</p>
                <p>B、当月10号(含)-20号(含)绑定，按半个月<span class="price_pre_student_half">{{ halfOfPricePreStudent }}</span>元计费</p>
                <p>C、当月20号后绑定，不计费</p>
              </div>
              <div>
                <h6>当月删除：</h6>
                <p>A、当月10号前删除，不计费</p>
                <p>B、当月10号(含)-20号(含)删除，按半个月<span class="price_pre_student_half">{{ halfOfPricePreStudent }}</span>元计费</p>
                <p>C、当月20号后删除，按1个月<span class="price_pre_student">{{ pricePreStudent }}</span>元计费</p>
              </div>
            </div>
          </div>
        </div>
        <div class="rule_edg" style="pointer-events: auto;">
          <h3>举例说明</h3>
          <div class="edg_content">
            <p>假设收费当月为1月，且开通人数≥<span class="minimum_student_count">{{ minimumStudentCount }}</span>人</p>
            <div>
              <h6>关于绑定：</h6>
              <p> A、小师同学于18年01月09日绑定，收费当月未删除，收取<span class="price_pre_student">{{ pricePreStudent }}</span>元</p>
              <p> B.1、小师明同学于18年01月10日绑定，收费当月未删除，收取<span class="price_pre_student_half">{{ halfOfPricePreStudent }}</span>元</p>
              <p> B.2、小师同学于18年01月20日绑定，收费当月未删除，收取<span class="price_pre_student_half">{{ halfOfPricePreStudent }}</span>元</p>
              <p> C、小师同学于18年01月21日绑定，收费当月未删除，不收费</p>
            </div>
            <div>
              <h6>关于删除：</h6>
              <p> A、小师同学于17年绑定，18年01月09日删除，不收费</p>
              <p> B.1、小师同学于17年绑定，18年01月10日删除，收取<span class="price_pre_student_half">{{ halfOfPricePreStudent }}</span>元</p>
              <p> B.2、小师同学于17年绑定，18年01月20日删除，收取<span class="price_pre_student_half">{{ halfOfPricePreStudent }}</span>元</p>
              <p> C、小师同学于17年绑定，18年01月21日删除，收取<span class="price_pre_student">{{ pricePreStudent }}</span>元</p>
            </div>
            <div>
              <h6>当月绑定+删除：</h6>
              <p> A.1、小师同学于18年01月05日绑定，18年01月13日删除，不收费</p>
              <p> B.2、小师同学于18年01月05日绑定，18年01月14日删除，收<span class="price_pre_student_half">{{ halfOfPricePreStudent }}</span>元</p>
              <p> B.3、小师同学于18年01月05日绑定，18年01月24日删除，收<span class="price_pre_student_half">{{ halfOfPricePreStudent }}</span>元</p>
              <p> B.4、小师同学于18年01月05日绑定，18年01月25日删除，收<span class="price_pre_student">{{ pricePreStudent }}</span>元</p>
            </div>
          </div>
        </div>
        <div class="rule_remark" style="pointer-events: auto;">
          <div class="situation_tit clearfix">
            <h4>其他备注</h4>
            <p>关于异议与付费时间</p>
          </div>
          <div>
            <p>A、若未按时付费，将暂停系统服务</p>
            <p>B、提出异议后，我司人员将在两天内完成受理并审核，最晚付费时间将同步延后一天</p>
            <p>C、若我司人员审核超时，将根据超时时间，自动延长相应的最晚付费时间</p>
          </div>
        </div>
        <div class="rule_footer" style="pointer-events: auto;">
          <p>感谢您对{{ $companyName(1) }}的支持和信任！</p>
          <p>以上最终解释权归{{ $companyName(1) }}所有</p>
        </div>
    </div>

  </van-dialog>
</template>

<script>
export default {
  name: 'charge-rule-dialog',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    billData: {
      type: Object,
    },
  },
  computed: {
    pricePreStudent() {
      return this.billData && this.billData.rule && typeof this.billData.rule.pricePreStudent === 'number' ? this.billData.rule.pricePreStudent : 8 // 学生单价默认8元
    },
    halfOfPricePreStudent() {
      return this.pricePreStudent / 2
    },
    minimumStudentCount() {
      return this.billData && this.billData.rule && typeof this.billData.rule.minimumStudentCount === 'number' ? this.billData.rule.minimumStudentCount : 50 // 低消人数默认50人
    },
    minimumCost() {
      return this.pricePreStudent * this.minimumStudentCount
    },
  },
};
</script>
<style scoped lang="less">
.charge-rule-dialog {
  font-size: .16rem;
  background-color: #fff;
  padding: 0 .1rem;
}
.rule-content {
  overflow-y: scroll;
  max-height: 70vh;

  .rule_info,
  .edg_content,
  .rule_remark,
  .rule_footer{
    width:96%;
    margin:0 auto;
    color:#333;
  }
  .rule_info .situation_tit h4,
  .rule_remark .situation_tit h4{
    width:23%;
    height:.28rem;
    line-height:.28rem;
    text-align:center;
    background-color:#6699FF;
    color:#fff;
    float:left
  }
  .rule_info .situation_tit p,
  .rule_remark .situation_tit p{
    width:74%;
    height:.28rem;
    line-height:.28rem;
    float:left;
    color:#6699FF;
    border-bottom:1px solid #6699FF;
    text-indent: .1rem;
    box-sizing:border-box;
    -webkit-box-sizing:border-box; /* Safari */
    -ms-box-sizing:border-box; /* Safari */
  }
  .situation_content .alignCenter{
    text-align:center;
  }
  .situation_first{
    padding-top:.1rem;
  }
  .situation_first .situation_content,
  .situation_content h5,
  .rule_remark div:nth-child(2){
    margin:.3rem 0;
  }
  .situation_second{
    margin-bottom:.3rem;
  }
  .situation_content .bingding{
    margin-bottom:.2rem;
  }
  .rule_edg h3{
    width:60%;
    height:.28rem;
    line-height:.28rem;
    color:#6699FF;
    font-weight:bold;
    text-align:center;
    border-bottom:1px solid #6699ff;
    margin:0 auto .35rem auto;
  }
  .edg_content p:first-child{
    margin:.2rem auto .4rem auto;
  }
  .edg_content div:nth-child(2),
  .edg_content div:nth-child(3),
  .edg_content div:nth-child(4){
    margin-bottom:.2rem;
  }
  .rule_remark div:nth-child(2){
    margin-bottom:.75rem;
  }
  .rule_footer p:first-child{
    text-align:center;
    padding-top:.6rem;
    margin-bottom:.15rem;
    border-top:1px solid #ccc;
    font-weight:bold
  }
  .rule_footer p:last-child{
    text-align:center;
    margin-top:.4rem;
    padding-bottom:.4rem;
  }
}

</style>

<template>
  <div id="safflower-mechanism">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar title="红花机制" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="feature-toggle">
      <div class="set-solid">
        <van-switch v-model="checked" active-color="#84C225" size="0.2rem" @input="onInput"/>
        <span>红花奖励功能已打开</span>
      </div>
    </div>
    <div class="reward-set">
      <van-radio-group v-model="radio">
        <div class="set-solid">
          <van-radio name="1" v-model="checked">
            本次考试成绩比上次进步时，获得红花奖励
            <img
              slot="icon"
              slot-scope="props"
              :src="props.checked ? icon.active : icon.normal"
            >
          </van-radio>
          <div class="safflower-bonus">
            红花数：3朵
            <van-icon name="arrow-down"/>
          </div>
        </div>
        <van-radio name="2" v-model="checked">
          本次成绩达到一定分值时，获得红花奖励
          <img
            slot="icon"
            slot-scope="props"
            :src="props.checked ? icon.active : icon.normal"
          >
        </van-radio>
        <div class="set-dashed">
          <van-row>
            <van-col span="12">
              一年级：100分
              <van-icon name="arrow-down"/>
            </van-col>
            <van-col span="12">
              二年级：100分
              <van-icon name="arrow-down"/>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="12">
              三年级：100分
              <van-icon name="arrow-down"/>
            </van-col>
            <van-col span="12">
              四年级：100分
              <van-icon name="arrow-down"/>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="12">
              五年级：100分
              <van-icon name="arrow-down"/>
            </van-col>
            <van-col span="12">
              六年级：100分
              <van-icon name="arrow-down"/>
            </van-col>
          </van-row>
        </div>
        <div class="safflower-bonus">
          可获得红花数：3朵
          <van-icon name="arrow-down"/>
        </div>
      </van-radio-group>
    </div>
    <div class="footer-btn">
      <van-row type="flex" justify="center">
        <van-col span="24">
          <span @click="test" style="display: inline-block;width:100%">保存该设置</span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { NavBar, Icon, Row, Col, Switch, RadioGroup, Radio } from "vant";
export default {
  name: "safflower-mechanism",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Row.name]: Row,
    [Col.name]: Col,
    [Switch.name]: Switch,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
  },
  data() {
    return {
      checked: true,
      icon: {
        normal: "../../assets/img/school/checkbox-normal.png",
        active: "../../assets/img/school/checkbox-checked.png"
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    onInput(checked) {
      this.checked = checked;
    }
  },
  created() {
    //alert(this.$route.params.id)
  }
};
</script>

<style scoped lang="less">
#safflower-mechanism {
  font-size: 0;
  background-color: #fff;
  .go-back {
    .van-nav-bar {
      background-color: #3770fb;
      .van-icon {
        font-size: 0.22rem;
        color: #fff;
      }
      .van-nav-bar__text {
        font-size: 0.16rem;
        line-height: 0.22rem;
        color: #fff;
        font-weight: 400;
      }
      .van-nav-bar__title {
        color: #fff;
        font-weight: 400;
      }
    }
  }
  .feature-toggle {
    padding: 0 0.16rem;
    height: 0.48rem;
    line-height: 0.48rem;
    font-size: 0.14rem;
    color: #666;
    .set-solid {
      border-bottom: 1px solid #eee;
      .van-switch {
        top: 0.06rem;
      }
      span {
        padding-left: 0.1rem;
      }
    }
  }
  .reward-set {
    padding: 0 0.16rem;
    height: 0.48rem;
    line-height: 0.48rem;
    font-size: 0.14rem;
    color: #666;
    .set-solid {
      border-bottom: 1px solid #eee;
      .safflower-bonus {
        padding: 0 0.3rem;
        line-height: 0.14rem;
        padding-bottom: 0.18rem;
      }
    }
    .set-dashed {
        padding-left: 0.3rem;
      .van-row {
        line-height: 0.48rem;

        border-bottom: 1px dashed #eee;
      }
      .van-row:first-child {
        line-height: 0.14rem;
        padding-bottom: 0.18rem;
      }
    }
     .safflower-bonus {
        padding-left: 0.3rem;
      }
  }
  .footer-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.4rem;
    padding: 0.08rem 0;
    background-color: #3770fb;
    box-sizing: border-box;
    .van-col {
      font-size: 0.14rem;
      color: #fff;
      line-height: 0.24rem;
      text-align: center;
      border-right: 0.01rem solid #fff;
    }
    .van-col:last-child {
      border-right-width: 0;
    }
  }
}
</style>

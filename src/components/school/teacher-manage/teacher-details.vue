<template>
  <div class="class-director-details">
    <div class="content">
      <div class="bar_mas">
        <div>
          <van-nav-bar left-text="返回" title="教师个人信息" left-arrow @click-left="onClickLeft"/>
        </div>
        <img class="mas_head_img" src="../../../assets/img/teachers/Mine/head.jpg">
        <div class="mas_name_div">
          <p class="mas_name">周小黄</p>
        </div>
        <div class="bind_button">
          <p>绑定账号</p>
        </div>
      </div>
      <van-cell title="账号：" value="13926122403" size="large"/>
      <van-cell title="身份：" value="教师" size="large"/>
      <van-cell title="主班级：" value="第2班" size="large"/>
      <van-cell title="副班级：" value="第1班，第3班，第5班" size="large"/>
    </div>
     <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
import { Cell, CellGroup } from "vant";
import FooterBtn from "../../common/footer-operate-btn";
import { Panel } from "vant";
import { NavBar } from "vant";
import { Button } from "vant";
import { Icon } from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Panel.name]: Panel,
    [Button.name]: Button,
    [Icon.name]: Icon,
    FooterBtn: FooterBtn
  },
  name: "class-director-details",
  data() {
    return {
      msg: "我的",
      btnText: [
        {
          type: 1,
          title: "确定"
        }
      ]
    };
  },

  methods: {
    onClickLeft() {
      // Toast("返回");
    },
    onClickRight() {
      // Toast("按钮");
    }
  }
};
</script>

<style scoped lang="less">
.class-director-details {
  .content {
    background-color: #f3f7f8;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .bar_mas {
    width: 100%;
    height: 1.8rem;
    background: linear-gradient(
      180deg,
      rgba(55, 112, 251, 1) 0%,
      rgba(104, 169, 253, 1) 100%
    );
  }
  .van-cell:not(:last-child)::after {
    right: 0.15rem;
  }

  /*导航栏样式*/
  .van-icon-arrow-left:before {
    color: #ffffff;
  }
  .van-nav-bar__text {
    color: #ffffff;
  }
  .van-hairline--bottom::after {
    border: none;
  }
  .van-nav-bar {
    background-color: rgba(255, 255, 255, 0);
  }

  /*头像及信息样式*/
  .mas_name_div {
    margin-top: 0.6rem;
    padding-left: 0.6rem;
    float: left;
  }
  .mas_name_div p {
  }
  .mas_name {
    font-size: 0.16rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 0.22rem;
  }

  .mas_name_b {
    margin: 0.1rem 0 0 0;
    height: 0.2rem;
    font-size: 0.14rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 0.2rem;
  }
  .mas_head_img {
    border-radius: 100%;
    margin: 0.4rem 0 0 0.15rem;
    border-radius: 100%;
    width: 0.6rem;
    height: 0.6rem;
    float: left;
  }

  .bindnew {
    border: solid;
  }
  .van-button--plain {
    background-color: rgba(255, 255, 255, 0);
  }
  .van-button--primary {
    border-radius: 0.05rem;
    border: solid 0.01rem white;
  }
  .van-button--plain.van-button--primary {
    color: white;
  }

  .bind_button {
    margin: 0.6rem 0.16rem 0 0.65rem;
    float: left;
    border: solid 0.01rem white;
    width: 0.9rem;
    height: 0.2rem;
    border-radius: 0.05rem;
  }
  .bind_button p {
    text-align: center;
    height: 0.2rem;
    font-size: 0.14rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 0.2rem;
  }
}
</style>

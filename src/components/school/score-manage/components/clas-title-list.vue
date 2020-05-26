<template>
  <div class="cl-list">
    <div class="list">
      <van-tabs v-model="active" title-active-color="#3770FB" color="#3770FB">
        <van-tab v-for="(item,index) in clsStu " :key="index">
          <div slot="title" @click="banji(item.id)" v-text="item.name"></div>
        </van-tab>
        <!-- <van-tab title="第1班"></van-tab>
                <van-tab title="第2班"></van-tab>
                <van-tab title="第3班"></van-tab>
                <van-tab title="第4班"></van-tab>
                <van-tab title="第5班"></van-tab>
                <van-tab title="第6班"></van-tab>
                <van-tab title="第7班"></van-tab>
                <van-tab title="第8班"></van-tab>
                <van-tab title="第9班"></van-tab>
                <van-tab title="第10班"></van-tab> -->
      </van-tabs>
    </div>
    <div class="c-dowm" @click="downMenuShow">
      <span class="fonticon">
        <van-icon name="arrow-down" />
      </span>
    </div>

    <DownMenu :actions="clsStuTk" v-on:getIndex="getChange"></DownMenu>
  </div>
</template>

<script>
import { Icon, Tab, Tabs } from "vant";
import DownMenu from "../../../common/grade-List";
import { mapState } from "vuex";
export default {
  name: "clas-title-list",
  props: {
    // list: {
    //   //下拉菜单列表
    //   type: Array
    // },
    // clsStu: {
    //   //父组建传过来的
    //   type: Array
    // }
  },
  components: {
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    DownMenu: DownMenu
  },
  data() {
    return {
      active: 0,
      clsStuTk: [],
      clsStu:JSON.parse(sessionStorage.getItem('classList'))
    };
  },
  methods: {
    // 点击班级下拉框
    downMenuShow() {
      this.clsStuTk = this.clsStu;
      //console.log("是干嘛的");
      this.$store.commit("getShow");
    },
    getChange(item) {
      this.banji(item.id)
      //console.log("aaaaaaaaaaa");
      //   this.active = data.index;
    },
    // 点击班级
    banji(id) {
      this.$emit("classGrade", { id: id });
    },
    chec() {
     // console.log(8888);
    }
  },
  computed: {
    ...mapState(["isShow"])
  }
};
</script>

<style scoped lang="less">
.cl-list {
  width: 100%;
  overflow: hidden;
  .list {
    float: left;
    width: 3rem;
    overflow: hidden;
    line-height: 0.2rem;
  }
  .c-dowm {
    position: relative;
    float: left;
    width: 0.4rem;
    height: 0.44rem;
    border-bottom: 0.01rem solid #eee;
    box-sizing: border-box;
    .fonticon {
      position: absolute;
      top: 0.11rem;
      height: 0.2rem;
      padding-left: 0.16rem;
      font-size: 0.16rem;
      color: #999;
      border-left: 0.01rem solid #eeeeee;
    }
  }
}
</style>

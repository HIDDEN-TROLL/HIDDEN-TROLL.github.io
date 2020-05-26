<template>
  <div id="unit-management">
    <nav-bar :title="'单元管理'" :leftText="'返回'" :rightText="''" :id="''"></nav-bar>
    <div class="anniu">
      <!-- <span class="xiu_gai">点击单元可进行修改或删除</span> -->
      <ul class="danyuan_ul">
        <li v-for="(item,index) in data" :key="index" v-text="item.name" @click="clickUnit(item)"></li>
      </ul>
    </div>
    <div class="bott_yi">
      <van-button size="large" @click="showAddUnit">新增单元</van-button>
    </div>
    <van-dialog v-model="show" :title="popouTitel" @confirm="addUnit()"  :before-close="beforeClose"  show-cancel-button>
      <div class="delBtn" v-if="showDelBtn">
        <van-button type="warning" size="mini" @click="delUnit">删除</van-button>
      </div>
      <div class="unitInput">
        <van-field v-model="value" placeholder="请输入单元名称"/>
      </div>
    </van-dialog>
  </div>
</template>】
<script>
import navBar from "../../common/nav-bar";

import { Button, Dialog, Field, Toast, Notify } from "vant";
import { getUnit } from "@/api/school/score-manage";
import { postUnit } from "@/api/school/score-manage";
import { mdfUnit } from "@/api/school/score-manage";
import { deleteUnit } from "@/api/school/score-manage";

export default {
  components: {
    navBar,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Field.name]: Field,
    [Toast.name]: Toast,
    [Notify.name]: Notify
  },
  data() {
    return {
      value: "", //输入的单元名称
      unitName: "", //单元名称
      unitId: "", //修改时选择的单元ID
      show: false, //新增dan
      showDelBtn: false,
      popouTitel: "新增单元",
      data: [] //单元列表
    };
  },
  created() {
    this.startUnit();
  },
  methods: {
    //   初始进来
    startUnit() {
      this.$loading(undefined, undefined, true);
      return getUnit().then(res => {
        if (res.data.meta.success) {
          this.data = res.data.data;
        } else {
          Notify("单元列表获取失败");
        }
        this.$loadingHide();
      });
    },
    //点击单元
    clickUnit(item) {
      this.popouTitel = "修改单元";
      this.value = item.name; //回显名称
      this.show = true; //显示弹窗
      this.showDelBtn = true; //显示删除按钮
      this.unitId = item.unitId;
    },

    //新增单元
    showAddUnit() {
      this.popouTitel = "新增单元";
      this.value = ""; //置空单元名称
      this.showDelBtn = false; //隐藏删除按钮
      this.show = true;
      this.unitId = ""; //置空id（区分新增和修改判断用）
    },
     //新增单元弹窗校验
    beforeClose(action, done) {
      console.log(done)
      if (action === "confirm") {
        if (this.value === "") {
          Toast("请输入单元名称");
          done(false);
        }else {
          done();
        }
      }else {
        done();
       
      }
    },
    addUnit() {
       if (this.value === "") {
        this.show = true;
        Toast("请输入单元名称");
      } else {
      if (this.unitId) {
        //如果有ID则修改
        return mdfUnit({ name: this.value, unitId: this.unitId }).then(res => {
          if (res.data.meta.success) {
            this.data = [];
            Toast.success("修改单元成功");
            let _this = this;
            setTimeout(function() {
              Toast.clear();
              _this.startUnit();
            }, 1000);
          } else {
            Toast.fail("修改单元失败");
          }
        });
      } else {
        //否则新增
        return postUnit({ name: this.value }).then(res => {
          if (res.data.meta.success) {
            this.data = [];
            Toast.success("新增单元成功");
            let _this = this;
            setTimeout(function() {
              Toast.clear();
              _this.startUnit();
            }, 1000);
          } else {
            Toast.fail("新增单元失败");
          }
        });
      }
      }
    },
    delUnit() {
      return deleteUnit({ name: this.value, unitId: this.unitId }).then(res => {
        if (res.data.meta.success) {
          this.data = [];
          Toast.success("删除单元成功");
          let _this = this;
          setTimeout(function() {
            Toast.clear();
            _this.startUnit();
          }, 1000);
          this.show = false; //(关闭编辑框)
        } else {
          Toast.fail("删除单元失败");
        }
      });
    }
  }
};
</script>
<style  lang="less">
@import "performance";
</style>


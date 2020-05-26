<template>
  <div class="workbenck" id="funlist">
    <div class="list" v-for="(item,index) in funList" :key="index">
      <div class="left">
        <span>{{item.name}}</span>
      </div>
      <div class="right">
        <a class="item" v-for="(item2,index2) in item.items" :key="index2" @click="go(item2.target)">
          <icon class="item_image" :name="item2.icon" />
          <span class="item_name">{{item2.name}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { handleRouteTarget } from '@/utils'
import icon from '@/components/common/icon'

export default {
  name: "funlist",
  components: {
    icon,
  },
   props: {
    funList:{
      type:Array
    }

  },
  methods: {
    go(target) {
      handleRouteTarget(this.$router, target)
    }
  }
};
</script>

<style scoped>
#funlist {
  padding-bottom: 50px;
  background: #fff;
}
.list{
    background: #fff;
  display: flex;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
}
.left {
  width: 0.8rem;
  font-size: 0.14rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 0.2rem;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  border-right: 1px solid  #eeeeee;
  flex-shrink: 0;
}
.right {
  display: inline-flex;
  flex-wrap: wrap;
  flex-grow: 1;
}
.item {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  height: .8rem;
  width: 33%;
  align-items: center;
  text-align: center;
}
.item_image {
  margin: 0 auto 0.06rem;
  font-size: .25rem;
}
.item_name {
  font-size: 0.14rem;
  /*white-space: nowrap;*/
}

.search_fun {
  width: 100%;
  background-color: white;
  height: 0.8rem;
  float: left;
}
.search_title {
  /*!*margin: 0.4rem 0.25rem 0.4rem 0.25rem;*/
  float: left;
  width: 0.8rem;
  height: 0.2rem;
  font-size: 0.14rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 0.2rem;
}
.search_title_name {
  width: 0.3rem;
  margin: 0.3rem 0.25rem 0.3rem 0.25rem;
}
.search_title_r {
  margin: 0.1rem 0 0.1rem 0;
  height: 77%;
  float: left;
  border-left: 1px solid  #eeeeee;
}
.search_title_r_fun {
  margin-left: 0.2rem;
  float: left;
}
.search_title_r_fun_s {
  font-size: 0.14rem;
}
.search_title_r_fun_img {
  width: 0.24rem;
  margin: 0 auto;
  line-height: 0;
}
.search_title_r_fun_img img {
  width: 0.24rem;
  height: 0.24rem;
  margin-bottom: 0.06rem;
}
.search_title_r_b:last-child {
  width: 90%;
  margin: 0.78rem auto;
  border-bottom: 1px solid #eeeeee;
}
.search_title_r_b{
  border: 0;
}
.van-cell {
  padding: 0.08rem 0rem 0.08rem 0.2rem;
}
.van-cell__left-icon {
  margin-right: 17px;
}
</style>

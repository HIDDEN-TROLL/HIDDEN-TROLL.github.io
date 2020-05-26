<template>
  <div class="food">
    <div class="title"><span>食谱饮食</span></div>
    <div class="foodlist_mar">
      <div>
        <van-tabs color="#3770fb">
          <van-tab v-for="(diet, index) in recipe" :key="index" :title="diet.week">

            <div class="father">
              <div class="son" v-for="(item, index) in diet.food" :key="index">
                <img :src="item.imgUrl" alt="" />
                <div class="foodname"><span>{{item.name}}</span></div>
              </div>
            </div>

          </van-tab>
        </van-tabs>
      </div>
    </div>

  </div>
</template>

<script>
import { Tab, Tabs } from 'vant';

export default {
  name: 'food-list',
  props: {
    data: {
      type: Array
    }
  },
  components: {
    vanTab: Tab,
    vanTabs: Tabs,
  },
  computed: {
    recipe() {
      if (Array.isArray(this.data)) {
        return this.data
      } else {
        return []
      }
    },
  },
}
</script>

<style scoped>
* {
  font-size: 0.14rem;
}

.title {
  border-left: solid #3770FB;
  font-size: 0.16rem;
}

.title span {
  margin-left: 0.1rem;
}


img {
  border-radius: 0.03rem;
  width: 0.86rem;
  height: 0.66rem;
}

.father {
  padding: 0.2rem 0.15rem;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  white-space: nowrap;
}

.son {
  text-align: center;
  margin-right: 0.1rem;
  width: 0.86rem;
  height: 0.66rem;
  position: relative;
  display: inline-block;
}

.foodname {
  margin-top: 0.05rem;
}

</style>

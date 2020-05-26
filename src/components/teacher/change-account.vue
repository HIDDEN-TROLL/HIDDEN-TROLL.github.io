<template>
  <div>
    <van-nav-bar
      title="账号切换"
      left-text="返回"
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <div class="list_div" v-for="(item,index) in userlist" :key="index" @click="changelight(index)">
      <div class="head">
        <img :src=item.head_img>
      </div>
      <div class="place">
        <span class="name">{{item.name}}</span>
        <span class="school">{{item.school}}</span>
      </div>
      <div class="unlick" :class="{onlick:licklight == index }">
        ✔
      </div>
    </div>

  </div>
</template>

<script>
import { NavBar } from 'vant';

export default {
  name: "",
  data() {
    return {
      userlist: [
        {
          name: '周嗜食',
          school: '新师路托管园-东下校区',
          head_img: require('@/assets/img/teachers/Mine/head.jpg'),
        },
        {
          name: '王东林',
          school: '新师路托管园-北下校区',
          head_img: require('@/assets/img/teachers/Mine/head.jpg'),
        },
        {
          name: '许琳琳',
          school: '新师路托管园-南下校区',
          head_img: require('@/assets/img/teachers/Mine/head.jpg'),
        },
      ],
      licklight: -1,
    }
  },
  components: {
    [NavBar.name]: NavBar,
    //someComponent
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onClickRight() {
      this.$router.back()
    },
    changelight(index) {
      this.licklight = index;
    },
  },
}
</script>

<style scoped>

.van-nav-bar .van-icon, .van-nav-bar__text {
  color: white;
}

.van-nav-bar {
  background-color: #3770FB;
}

.van-nav-bar__title {
  color: white;
}

.list_div {
  margin: 0 0.15rem;
  border-bottom: 1px solid #EEEEEE;
  font-size: 0.14rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 0.55rem
}

.head img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.head {
  margin: 0.1rem 0.15rem 0.1rem 0;
  float: left;
  width: 0.32rem;
  height: 0.32rem;
}

.place {
  margin-right: 0.5rem;
  float: left;
}

.name {
  margin-right: 0.26rem;
}

.unlick {
  color: white;
}

.onlick {
  color: #84C225;
}


</style>

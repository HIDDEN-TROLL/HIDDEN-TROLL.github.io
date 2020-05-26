<template>
  <section class="child_profile">

    <van-nav-bar
      class="header"
      :title="$route.meta.title"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      :border="false" />


    <section class="content">
      <div class="part1">
        <img :src="profile.image" alt="头像" class="image" :class="{ hide: isEmpty(profile.image) }" />
        <van-row gutter="20" class="base_info">
          <van-col span="8" class="text">性别：{{ profile.genderText }}</van-col>
          <van-col span="8" class="text strong">{{ profile.name }}</van-col>
          <van-col span="8" class="text">{{ profile.cardNo }}</van-col>
        </van-row>
        <van-row gutter="20" class="base_info">
          <van-col span="12" class="text">{{ profile.attendanceName }}</van-col>
          <van-col span="12" class="text">{{ profile.className }}</van-col>
        </van-row>

      </div>

      <van-cell title="在读学校" :value="profile.publicSchoolName ? profile.publicSchoolName : '未设置'" />
      <van-cell title="在读年级" :value="profile.gradeName" />
      <van-cell title="生日" :value="profile.birthday ? profile.birthday : '未设置'" />
      <van-cell title="住址" :value="profile.address ? profile.address : '未设置'" />

      <p class="modify">
        <van-button type="info" size="small" :to="{ name:'ModifyChildProfile', params: { profile } }">修改资料</van-button>
      </p>
    </section>



  </section>
</template>

<script>
import { NavBar, Row, Col, Cell, Button } from 'vant'
import { getChildProfile } from '@/api/parent/profile'

export default {
  name: 'ChildProfile',
  components: {
    vanNavBar: NavBar,
    vanRow: Row,
    vanCol: Col,
    vanCell: Cell,
    vanButton: Button,
  },
  data() {
    return {
      profile: {},
    }
  },
  created() {
    this.$loading()
    getChildProfile()
      .then(response => {
        if (response.data.meta.success) {
          this.profile = response.data.data
        }
      })
      .finally(() => {
        this.$loadingHide()
      })
  },
}
</script>

<style scoped lang="less">
.child_profile {
  font-size: .16rem;
  background-color: #fff;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .header {
    flex-shrink: 0;
  }

  .content {
    flex-grow: 1;
    overflow: scroll;
    display: flex;
    flex-direction: column;

    .part1 {
      background-color: #3770fb;
      overflow: hidden;

      .image {
        width: 1rem;
        height: 1rem;
        margin: 0 auto;
        display: block;
        border-radius: 50%;
        &.hide {
          visibility: hidden;
        }
      }
      .base_info {
        margin-top: .1rem;
        margin-bottom: .1rem;

        .text {
          color: #fff;
          text-align: center;
          height:0.24rem;
          font-size:0.14rem;
          font-weight:400;
          line-height:0.24rem;
        }
        .strong {
          font-weight:600;
        }
      }
    }

    .modify {
      padding: .1rem 0;
      text-align: center;
    }
  }

}
</style>

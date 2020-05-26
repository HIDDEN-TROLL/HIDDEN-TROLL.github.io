<template>
  <div class="trusteeship">
    <van-nav-bar
      class="header"
      :left-text="isGuest ? '' : '返回'"
      :left-arrow="!isGuest"
      @click-left="$router.back()">
      <template slot="title">
        <span class="title" @click="switchSchoolShow = isSwitchSchoolEnable">
          {{ schoolName }}
          <van-icon v-show="isSwitchSchoolEnable" name="arrow-down"/>
        </span>
      </template>
    </van-nav-bar>

    <no-data v-if="isEmpty(websiteData)" class="no-data"/>
    <div v-else class="content">

      <van-swipe
        v-if="Array.isArray(websiteData.imgUrl) && websiteData.imgUrl.length > 0"
        :autoplay="3000"
        class="component_banner">
        <van-swipe-item v-for="(image, index) in websiteData.imgUrl" :key="index">
          <img :src="image" alt=""/>
        </van-swipe-item>
      </van-swipe>

      <div class="component_summary">
        <p class="title">
          <span>机构简介</span>
        </p>
        <div class="summary">{{ websiteData.summary }}</div>
      </div>

      <div class="component_team">
        <p class="title">
          <span>教师团队</span>
        </p>
        <div
          class="team"
          v-for="(teacher, index) in websiteData.teacherList"
          :key="index">
          <div class="team_div">
            <img class="headimg" :src="teacher.avatar" alt=""/>
            <div class="info">
              <div>{{ teacher.teacherName }}</div>
              <div class="explain">{{ teacher.introduction }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="component_foodlist">
        <Foodlist :data="websiteData.recipe"/>
      </div>

      <div class="component_address">
        {{ websiteData.address }}
      </div>

      <!--
      v-if="isGuest"
      -->
      <div class="component_contact">
        <p class="title">
          <span>联系人</span>
        </p>
        <img class="qrcode" :src="websiteData.qrCode" alt="联系方式">
      </div>
    </div>

    <van-row v-if="!isGuest" v-show="!isPreview" class="footer" type="flex" justify="center" align="center">
      <van-col span="12" class="right-border">
        <router-link class="button" :to="{ name: 'TrusteeshipEditPage', query: { id: $store.state.trusteeship.currentSchoolId, new: 0 } }">修改</router-link>
      </van-col>
      <van-col span="12">
        <span class="button" @click="shareDialogShow = true">分享</span>
      </van-col>
    </van-row>


    <van-actionsheet
      v-if="!isGuest"
      v-model="switchSchoolShow"
      :actions="schoolList"
      @select="onSwitchSchool"
      cancel-text="关闭"
    />

    <share-dialog v-if="!isGuest" v-model="shareDialogShow" ref="shareDialog" />
  </div>
</template>

<script>
import Foodlist from './components/food-list'
import ShareDialog from './components/share-dialog'
import { NavBar, Swipe, SwipeItem, Row, Col, Icon, Actionsheet } from 'vant';
import noData from '@/components/common/no-data'
import { getSchoolWebsite, getSchoolList } from '@/api/school/trusteeship'
import { isEmpty, param2Obj } from '@/utils'

export default {
  name: 'share-website',
  components: {
    Foodlist: Foodlist,
    ShareDialog,
    vanNavBar: NavBar,
    vanSwipe: Swipe,
    vanSwipeItem: SwipeItem,
    vanRow: Row,
    vanCol: Col,
    vanIcon: Icon,
    vanActionsheet: Actionsheet,
    noData,
  },
  data() {
    return {
      isPreview: false,
      isGuest: false,
      switchSchoolShow: false,
      shareDialogShow: false,
      schoolList: [],
    }
  },
  computed: {
    schoolName() {
      return this.$store.getters['trusteeship/schoolName']
    },
    websiteData() {
      return this.isPreview ? this.$store.getters['trusteeship/getPreviewWebsiteData'] : this.$store.state.trusteeship.websiteData
    },
    isSwitchSchoolEnable() {
      return Array.isArray(this.schoolList) && this.schoolList.length > 1
    },
  },
  methods: {
    fetchData(schoolId = 0) {
      if (!schoolId && this.$route.query.id) {
        schoolId = this.$route.query.id
      }
      this.$store.commit('trusteeship/setCurrentSchoolId', schoolId)

      this.$loading()
      getSchoolWebsite(schoolId)
        .then(response => {
          if (!response.data.meta.success) {
            return
          }
          if (isEmpty(response.data.data)) {
            this.$store.commit('trusteeship/setWebsiteData', undefined)
            this.$router.replace({ name: 'TrusteeshipEditPage', query: { id: this.$store.state.trusteeship.currentSchoolId, new: 1 } })
          } else {
            this.$store.commit('trusteeship/setWebsiteData', response.data.data)
            this.$store.commit('trusteeship/setCurrentSchoolId', response.data.data.schoolId)
            return this.isGuest ? undefined : getSchoolList()
          }
        })
        .then(response => {
          if (response && response.data.meta.success) {
            this.schoolList = response.data.data.map(school => {
              return {
                name: school.schName,
                id: school.schId,
                disabled: school.schId == this.websiteData.schoolId,
              }
            })
          }
        })
        .finally(() => {
          this.$loadingHide()
        })
    },
    onSwitchSchool(item) {
      // this.$router.replace({ name: 'TrusteeshipShareOfficial', query: { id: item.id } })
      this.$refs['shareDialog'].reset()
      this.fetchData(item.id)
      this.switchSchoolShow = false
    },
  },
  created() {
    const params = param2Obj(location.href)
    this.isGuest = !!params['guest']

    this.isPreview = !!this.$route.params.preview
    if (!this.isPreview) {
      this.fetchData(params['id'] ? params['id'] : 0)
    }

    // 声明进入微官网主页
    this.$store.commit('trusteeship/updateStatus', this.isPreview ? 3 : 1)
  },
}
</script>


<style scoped lang="less">
.trusteeship {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #F3F7F8;
  word-break: break-all;

  .header {
    flex-shrink: 0;
  }

  .no-data {
    flex-grow: 1;
  }
  .content {
    flex-grow: 1;
    overflow: scroll;

    .component_banner {
      max-height: 1.5rem;
      background: #fff;
      /*padding: .1rem;*/
      margin-bottom: .1rem;

      img {
        width: 100%;
        height: 100%;
        max-height: 1.5rem;
      }
    }

    .component_summary {
      background-color: white;
      padding: .15rem;
      margin-bottom: .1rem;

      .summary {
        margin-top: 0.1rem;
        font-size: 0.14rem;
        color: rgba(102, 102, 102, 1);
        line-height: 0.2rem;
      }
    }

    .component_team {
      background-color: white;
      padding: 0.15rem;
      margin-bottom: 0.1rem;

      .team {
        border-top: 1px solid #EEEEEE;
        font-size: 0.14rem;
      }

      .team:nth-child(2) {
        border-top: none;
      }


      /*头像及说明*/

      .team_div {
        margin: 0.15rem 0;
        display: flex;

        .headimg {
          margin-right: 0.15rem;
          width: 0.72rem;
          height: 0.72rem;
          flex-shrink: 0;
        }

        .info {
          flex-grow: 1;

          .explain {
            color: #999999;
          }
        }
      }
    }

    .component_foodlist {
      margin-bottom: 0.1rem;
      padding: 0.15rem;
      background-color: white;
    }

    .component_address {
      margin-bottom: 0.1rem;
      background-color: white;
      text-align: center;
      font-size: 0.14rem;
      padding: .1rem;
    }

    .component_contact {
      background-color: white;
      padding: 0.15rem;
      margin-bottom: 0.1rem;

      .qrcode {
        max-width: 70%;
        /*max-height: 1rem;*/
        margin: .1rem auto;
        display: block;
        font-size: .16rem;
      }
    }

  }

  .footer {
    flex-shrink: 0;
    height: .4rem;
    line-height: .4rem;
    font-size: .14rem;
    background: #3770fb;
    color: #fff;

    .right-border {
      height: .25rem;
      line-height: .25rem;
      border-right: 1px solid #fff;
    }

    .button {
      width: 100%;
      text-align: center;
      display: inline-block;
    }
  }

}


.title {
  border-left: solid #3770FB;
  font-size: 0.16rem;
}

.title span {
  margin-left: 0.1rem;
}


.morenews {
  margin-bottom: 0.15rem;
  color: #84C225;
}

.morenews_mid {
  margin: 0 0.1rem;
}

.button {
  margin: 0 auto;
  width: 2.5rem;
  height: 0.3rem;
  background-color: #3770FB;
  border-radius: 0.03rem;
  color: white;
  text-align: center;
  line-height: 0.3rem;
}

.change {
  background-color: #3770FB;
  color: white;
  padding: 0.05rem 5em;
  border-radius: 0.03rem;
}

.share {
  background-color: #66CC99;
  color: white;
  padding: 0.05rem 5em;
  border-radius: 0.03rem;
}


.van-dialog {
  border-radius: 15px;
}
</style>

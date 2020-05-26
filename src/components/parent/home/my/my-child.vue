<template>
  <div>
    <van-loading v-show="loading" class="loading" size="40px" />

    <div v-if="data !== null" class="my_child">

      <div class="base_info">
        <img class="image" :src="data.accountInfo.image" alt="" />
        <div class="info">
          <p>
            <span class="student_name">{{ data.accountInfo.name }}</span>
            <span class="grade_name">{{ data.accountInfo.gradeName }}</span>
          </p>
          <p class="school_name">{{ data.accountInfo.schoolName }}</p>
          <p class="class_name">{{ data.accountInfo.className }}</p>
        </div>
        <div class="actions">
          <button class="action" @click="invitationFamily">邀请家人</button>
          <button class="action" @click="bindAnotherChild">添加孩子</button>
        </div>
      </div>

      <div v-for="(linkGroup, index) in data.links" :key="index" class="link_group">
        <button v-for="(link, index2) in linkGroup" :key="index2" class="link" @click="handleLink(link)">
          <icon class="left-icon" :name="link.icon" />
          <span class="text">{{ link.name }}</span>
          <van-icon class="right-icon" name="arrow" />
        </button>
      </div>

    </div>

    <van-dialog v-model="invitationFamilyData.show">
      <van-loading v-show="invitationFamilyData.loading" class="loading" size="40px" />
      <img class="bindQrCode" :src="invitationFamilyData.image" alt="" />
    </van-dialog>
  </div>
</template>

<script>
import { Loading, Icon } from 'vant'
import icon from '@/components/common/icon'
import { getChildInfo, getStudentBindQrcode } from '@/api/parent/home'
import { handleRouteTarget, isEmpty } from '@/utils'

export default {
  name: 'my_child',
  components: {
    vanLoading: Loading,
    vanIcon: Icon,
    icon,
  },
  data() {
    return {
      loading: true,
      data: null,

      invitationFamilyData: {
        show: false,
        loading: true,
        image: '',
      }
    }
  },
  async created() {
    this.loading = true
    const response = await getChildInfo()
    if (response.data.meta.success) {
      this.data = response.data.data
    }
    this.loading = false
  },
  methods: {
    async invitationFamily() {
      this.invitationFamilyData.show = true
      if (!isEmpty(this.invitationFamilyData.image)) {
        return
      }

      this.invitationFamilyData.loading = true
      getStudentBindQrcode()
        .then(response => {
          if (response.data.meta.success) {
            this.invitationFamilyData.image = response.data.data.image
          }
        })
        .finally(() => {
          this.invitationFamilyData.loading = false
        })
    },
    bindAnotherChild() {
      location.href = this.data.other.bindAnotherChildUrl
    },
    handleLink(link) {
      if (link.target === 'versionInfo') {
        this.$toast(new Date(BUILD_TIME).toLocaleString())
        return;
      }
      handleRouteTarget(this.$router, link.target, false)
    },

  }

}
</script>

<style scoped lang="less">
.loading {
  margin: .12rem auto;
}
.bindQrCode {
  margin: 0 auto;
  display: block;
  max-width: 80vw;
  max-height: 70vh;
}

.my_child {
  font-size: .16rem;
  display: flex;
  flex-direction: column;

  .base_info {
    display: flex;
    padding: .16rem .17rem;
    border-bottom: 0.1rem solid #F3F7F8;

    .image {
      width: .63rem;
      height: .63rem;
      border-radius: 50%;
      margin-right: .1rem;
      flex-shrink: 0;
      object-fit: cover;
    }
    .info {
      padding: 0 .02rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .student_name {
        font-size:0.16rem;
        font-weight:500;
        color:#666;
        line-height:0.22rem;
      }
      .grade_name {
        margin-left: .13rem;
        font-size:0.14rem;
        font-weight:400;
        color:#999;
        line-height:0.2rem;
      }
      .school_name {
        margin-top: .07rem;
        word-wrap: break-word;
        word-break: break-all;
      }
      .school_name, .class_name {
        font-size:0.14rem;
        font-weight:400;
        color:#999;
        line-height:0.2rem;
      }
    }
    .actions {
      display: flex;
      flex-direction: column;
      /*justify-content: center;*/
      align-items: center;
      flex-shrink: 0;
      .action {
        border-radius:0.05rem;
        border:0.01rem solid rgba(153,153,153,1);
        padding: .03rem .13rem;
        margin: 0;
        color: #999;
        background-color: transparent;
        font-size:0.14rem;

        &:active {
          background-color: #eee;
        }

        &:not(:last-of-type) {
          margin-bottom: .1rem;
        }
      }
    }
  }

  .link_group {
    padding: 0 .17rem;

    &:not(:last-of-type) {
      border-bottom: 0.1rem solid #F3F7F8;
    }

    .link {
      width: 100%;
      padding: .14rem 0;
      border: 0;
      background: transparent;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      font-size: 0.14rem;
      color: #666;

      &:not(:last-of-type) {
        border-bottom: .02rem solid #eee;
      }
      &:active {
        background-color: #eee;
      }
      .left-icon {
        margin-left: .18rem;
        margin-right: .13rem;
        font-size: .18rem;
      }
      .text {
        flex-grow: 1;
        text-align: left;
      }
      .right-icon {
        margin-right: 0.03rem;
        color: #999;
        font-size: .16rem;
      }
    }
  }


}
</style>


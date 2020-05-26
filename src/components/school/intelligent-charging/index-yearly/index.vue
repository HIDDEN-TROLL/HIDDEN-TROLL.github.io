<template>
  <div class="charge-list">
    <header class="header">
      <van-nav-bar
        :title="$route.meta.title"
        :left-text="!isFromTemplate ? '返回' : ''"
        :left-arrow="!isFromTemplate"
        @click-left="$router.back()"/>
    </header>

    <section v-if="data" class="body">
      <p
        v-for="(p, index) in data.text"
        :key="index"
        class="p">{{ p }}</p>

      <van-button
        v-for="(button, index) in data.buttons"
        :key="index"
        class="button"
        :type="button.type ? button.type : 'primary'"
        :to="button.to">{{ button.text }}</van-button>
    </section>

  </div>

</template>

<script>
import { NavBar, Button } from 'vant'
import { getParamFromUrlAndRoute } from '@/utils'
import { getChargeContentYearly } from '@/api/school/charge'

export default {
  name: 'charge-list-yearly',
  components: {
    vanNavBar: NavBar,
    vanButton: Button,
  },
  data() {
    return {
      isFromTemplate: false,
      data: null,
    }
  },
  methods: {
    fetchData(templateId = null) {
      const data = {}
      if (templateId) {
        data.from = 'template'
        data.template_id = templateId
      }

      this.$loading()
      getChargeContentYearly(data)
        .then(response => {
          if (response.data.meta.success) {
            this.data = response.data.data
          }
        })
        .finally(() => {
          this.$loadingHide()
        })
    },
  },
  created() {
    const templateId = getParamFromUrlAndRoute('template_id', this.$router)
    if (templateId) {
      this.isFromTemplate = true
    }
    this.fetchData(templateId)
  },
};
</script>

<style scoped lang="less">
.charge-list {
  background-color: #F3F7F8;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-size: .16rem;

  .header {
    background-color: #fff;
    flex-shrink: 0;
  }

  .body {
    flex-grow: 1;
    overflow: scroll;
    display: flex;
    background-color: #fff;
    flex-direction: column;
    justify-content: center;
    width: 100%; /*TODO*/
    padding: 10px;

    .p {
      text-align: center;
      white-space: pre;
    }
    .button {
      width: 80%;
      margin: 10px auto 0;
    }
  }

}
</style>

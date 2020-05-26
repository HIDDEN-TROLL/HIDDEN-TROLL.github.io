<template>
  <div class="bgc">
    <van-nav-bar
      class="header"
      title="选择地点"
      left-text="返回"
      left-arrow
      right-text="返回"
      right-arrow

      @click-left="$router.back()"
      @click-right="test"/>

    <iframe class="iframe" width="100%" height="100%" frameborder=0 :src="frameSrc"></iframe>
  </div>
</template>

<script>
import { NavBar } from 'vant';

export default {
  name: 'edit-page-location',
  data() {
    return {
    }
  },
  components: {
    vanNavBar: NavBar,
  },
  computed: {
    coord() {
      let latitude = this.$store.state.trusteeship.editPageData.address.latitude
      let longitude = this.$store.state.trusteeship.editPageData.address.longitude
      if (latitude && longitude) {
        return `${latitude},${longitude}`
      }
      return undefined
    },
    frameSrc() {
      let data = {
        type: 1,
        coordtype: 5,
        key: 'GXGBZ-DGG63-5IQ3I-3GB2Z-MXUV5-GEFHD',
        referer: '新师路-服务号',
      }

      if (this.coord) {
        data.coord = this.coord
      }

      let params = Object.keys(data).map(key => {
          if (data[key] === undefined) return ''
          return key + '=' + data[key]
        }).join('&')

      return location.protocol + '//apis.map.qq.com/tools/locpicker?' + params
    }
  },
  methods:{
    test() {
      location.href = this.frameSrc
    },
    onMessage(ev) {
      console.log(ev)
      if (ev && ev.data && ev.data.module === 'locationPicker') {
        this.confirm(ev.data)
          .then(isConfirm => {
            if (isConfirm) {
              this.commitData(ev.data)
            }
          })
      }
    },
    confirm(data) {
      let { poiaddress, poiname } = data
      return this.$dialog.confirm({
        title: '温馨提示',
        message: `确认选择地点: ${poiname} \n ${poiaddress}`,
        confirmButtonText: '确认',
        overlay: true,
      })
    },
    commitData(data) {
      const addressText = data.poiaddress + data.poiname
      this.$store.commit('trusteeship/setEditPageData_addressText', addressText)
      this.$store.commit('trusteeship/setEditPageData_addressLocation', [data.latlng.lat, data.latlng.lng])
      this.$router.back()
    }
  },
  created() {
    if (this.$store.state.trusteeship.status === 0) {
      this.$router.replace({ name: 'TrusteeshipShareOfficial' })
      return
    }
    if (this.$route.params.latitude && this.$route.params.longitude) {
      this.coord = `${this.$route.params.latitude},${this.$route.params.longitude}`
    }

    window.addEventListener('message', this.onMessage)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.onMessage)
  }
}
</script>

<style scoped lang="less">
.bgc{
  background-color: #F3F7F8;
  display: flex;
  height: 100vh;
  flex-direction: column;

  .header {
    flex-shrink: 0;
  }

  .iframe {
    flex-grow: 1;
  }
}
*{
  font-size: 0.14rem;
}
</style>

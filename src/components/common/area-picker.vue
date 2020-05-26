<template>
  <van-popup :value="value" position="bottom" :lazy-render="false" :close-on-click-overlay="false">

    <van-picker
      ref="picker"
      class="picker"
      show-toolbar
      value-key="label"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange">

      <span slot="title" class="title">
        {{ title }}
        <van-loading v-show="loading" size="20px" color="#1989fa"/>
      </span>

    </van-picker>

  </van-popup>
</template>

<script>
import { Popup, Picker, Loading } from 'vant'
import areaStore from '@/store/modules/common/area'
import storeModuleRegister from '@/utils/store-module-register'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'area_picker',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    confirm: {
      type: Event,
    },
    cancel: {
      type: Event,
    },
    areaId: {
      type: [Number, String],
      default: 0,
    },
  },
  components: {
    vanPopup: Popup,
    vanPicker: Picker,
    vanLoading: Loading,
  },
  data() {
    return {
      selected: [],
      selectedPath: {
        province: {
          label: '无',
          value: 0,
          index: 0,
        },
        city: {
          label: '无',
          value: 0,
          index: 0,
        },
        county: {
          label: '无',
          value: 0,
          index: 0,
        },
      },

      provinceColumns: { values: [] },
      cityColumns: { values: [] },
      countyColumns: { values: [] },

      pickerInst: null,

      disableWatcher: false,
    }
  },
  beforeCreate() {
    storeModuleRegister(areaStore)
  },
  mounted() {
    this.pickerInst = this.$refs['picker']

    this.LoadNextLevel(0)
      .then(() => {
        this.provinceColumns = this.getProvinceColumns()
      })
      .then(() => {
        if (this.areaId > 0) {
          this.jumpToAreaId(this.areaId)
        } else {
          this.selectedPath.province.label = this.provinceColumns.values[0].label
          this.selectedPath.province.value = this.provinceColumns.values[0].value
          this.selectedPath.province.index = 0
        }
      })
  },
  computed: {
    ...mapState('area', {
      areaList: 'list',
      loading: 'loading',
    }),

    columns() {
      return [
        this.provinceColumns,
        this.cityColumns,
        this.countyColumns,
      ]
    },
  },
  watch: {
    areaId() {
      if (this.areaId > 0) {
        this.jumpToAreaId(this.areaId)
      }
    },
    'selectedPath.province.value': function () {
      if (this.disableWatcher) {
        return
      }
      // console.log('selectedPath.province')
      this.LoadNextLevel([this.selectedPath.province.value])
        .then(() => {
          this.cityColumns = this.getCityColumns()
          // console.info('selectedPath.province', this.disableWatcher)
          if (!this.disableWatcher) {
            this.selectedPath.city.label = this.cityColumns.values[0].label
            this.selectedPath.city.value = this.cityColumns.values[0].value
            this.selectedPath.city.index = 0
            this.pickerInst.setColumnIndex(1, 0)
            this.$nextTick(() => {
              this.pickerInst.setColumnIndex(0, this.selectedPath.province.index)
            })
          }
        })
    },
    'selectedPath.city.value': function () {
      if (this.disableWatcher) {
        // console.log('selectedPath.city 跳过')
        return
      }
      // console.log('selectedPath.city')
      this.LoadNextLevel([this.selectedPath.province.value, this.selectedPath.city.value])
        .then(() => {
          this.countyColumns = this.getCountyColumns()
          // console.info('selectedPath.city', this.disableWatcher)
          if (!this.disableWatcher) {
            this.selectedPath.county.label = this.countyColumns.values[0].label
            this.selectedPath.county.value = this.countyColumns.values[0].value
            this.selectedPath.county.index = 0
            this.pickerInst.setColumnIndex(2, 0)
            this.$nextTick(() => {
              this.pickerInst.setColumnIndex(1, this.selectedPath.city.index)
            })
          }
        })
    },
  },
  methods: {
    ...mapActions('area', [
      'LoadNextLevel',
      'GetAreaIdPath',
    ]),

    async jumpToAreaId(areaId) {
      this.disableWatcher = true
      const idPath = await this.GetAreaIdPath(areaId)

      try {
        const targetProvinceIndex = this.provinceColumns.values.findIndex(item => item.value === idPath[0])
        const targetProvince = this.provinceColumns.values[targetProvinceIndex]
        this.selectedPath.province.label = targetProvince.label
        this.selectedPath.province.value = targetProvince.value
        this.selectedPath.province.index = targetProvinceIndex

        this.cityColumns = this.getCityColumns()
        if (this.cityColumns.values.length === 0) {
          await this.LoadNextLevel([targetProvince.value])
          this.cityColumns = this.getCityColumns()
        }
        const targetCityIndex = !idPath[1] ? 0 : this.cityColumns.values.findIndex(item => item.value === idPath[1])
        const targetCity = this.cityColumns.values[targetCityIndex]
        this.selectedPath.city.label = targetCity.label
        this.selectedPath.city.value = targetCity.value
        this.selectedPath.city.index = targetCityIndex

        this.countyColumns = this.getCountyColumns()
        if (this.countyColumns.values.length === 0) {
          await this.LoadNextLevel([targetProvince.value, targetCity.value])
          this.countyColumns = this.getCountyColumns()
        }
        const targetCountyIndex = !idPath[2] ? 0 : this.countyColumns.values.findIndex(item => item.value === idPath[2])
        // console.log(targetCountyIndex, JSON.stringify(this.countyColumns))
        const targetCounty = this.countyColumns.values[targetCountyIndex]
        this.selectedPath.county.label = targetCounty.label
        this.selectedPath.county.value = targetCounty.value
        this.selectedPath.county.index = targetCountyIndex
      } catch (e) {
        console.error(e)
      }

      this.$nextTick(() => {
        this.pickerInst.setColumnIndex(0, this.selectedPath.province.index)
        this.pickerInst.setColumnIndex(1, this.selectedPath.city.index)
        this.pickerInst.setColumnIndex(2, this.selectedPath.county.index)

        this.disableWatcher = false
      })
    },

    // 获取省份列表
    getProvinceColumns() {
      return {
        className: 'test',
        values: this.areaList.map(item => {
          const newItem = Object.assign({}, item)
          delete newItem['children']
          return newItem
        }),
      }
    },

    // 获取城市列表
    getCityColumns() {
      // console.log('computed cityColumns')
      let values = []
      if (this.areaList && this.selectedPath.province.value) {
        const value = this.selectedPath.province.value
        const province = this.areaList.find(province => province.value === value)
        if (province && Array.isArray(province.children)) {
          values = province.children
        }
      }
      return { values }
    },

    // 获取市区列表
    getCountyColumns() {
      // console.log('computed countyColumns')
      let values = []
      if (this.areaList && this.selectedPath.city.value) {
        const value = this.selectedPath.city.value
        const city = this.cityColumns.values.find(city => city.value === value)
        if (city && Array.isArray(city.children)) {
          values = city.children
        }
      }
      return { values }
    },

    onConfirm() {
      this.$emit('confirm', this.selectedPath)
      this.$emit('input', false)
      this.$emit('change', false)
    },
    onCancel() {
      this.$emit('cancel', this.selectedPath)
      this.$emit('input', false)
      this.$emit('change', false)
    },
    onChange(pickerInst, selected, columnIndex) {
      console.info('onChange', selected, columnIndex)
      this.selected = selected

      const keys = ['province', 'city', 'county']
      const targetKey = keys[columnIndex]
      const targetPath = this.selectedPath[targetKey]
      const targetColumns = this[targetKey + 'Columns']

      targetPath.label = selected[columnIndex].label
      targetPath.value = selected[columnIndex].value
      targetPath.index = targetColumns.values.findIndex(item => item.value === targetPath.value)

      if (targetPath.index < 0) {
        console.error(targetPath.index)
      }
    },

  },
}
</script>

<style scoped lang="less">
.title {
  font-size: 16px;

  .van-loading {
    display: inline-block;
  }
}
</style>

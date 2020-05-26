<template>
  <van-picker
    ref="picker"
    class="picker"
    show-toolbar
    :columns="columns"
    value-key="label"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
  >

  </van-picker>
</template>

<script>
import { Picker } from 'vant'
import { Populationreport } from '@/api/new-concept/new-concept';

export default {
  name: 't',
  components: {
    vanPicker: Picker,
  },
  data() {
    return {

      testData: [],
      selectedPath: {
        agent: {
          label: '无',
          value: 0,
          index: 0,
        },
        area: {
          label: '无',
          value: 0,
          index: 0,
        },
        brand: {
          label: '无',
          value: 0,
          index: 0,
        },
        school: {
          label: '无',
          value: 0,
          index: 0,
        },

      },

      agentColumns: { values: [] },
      areaColumns: { values: [] },
      brandColumns: { values: [] },
      schoolColumns: { values: [] },

      pickerInst: null,
    }
  },
  computed: {
    columns() {
      return [
        this.agentColumns,
        this.areaColumns,
        this.brandColumns,
        this.schoolColumns,
      ]
    },
  },
  watch: {
    'selectedPath.agent.label': function () {
      this.brandColumns = { values: [] }
      this.schoolColumns = { values: [] }
      this.areaColumns = this.getAreaColumns()

      if (this.areaColumns.values.length === 0) {
        this.reset(this.selectedPath.area)
        return
      }
      this.selectedPath.area.label = this.areaColumns.values[0].label
      this.selectedPath.area.value = this.areaColumns.values[0].value
      this.selectedPath.area.index = 0
      this.pickerInst.setColumnIndex(1, 0)
      this.$nextTick(() => {
        this.pickerInst.setColumnIndex(0, this.selectedPath.agent.index)
      })
    },
    'selectedPath.area.label': function () {
      this.schoolColumns = { values: [] }
      this.brandColumns = this.getBrandColumns()

      if (this.brandColumns.values.length === 0) {
        this.reset(this.selectedPath.brand)
        return
      }
      console.error('selectedPath.area.label')
      this.selectedPath.brand.label = this.brandColumns.values[0].label
      this.selectedPath.brand.value = this.brandColumns.values[0].value
      this.selectedPath.brand.index = 0
      this.pickerInst.setColumnIndex(2, 0)
      this.$nextTick(() => {
        this.pickerInst.setColumnIndex(1, this.selectedPath.area.index)
      })
    },
    'selectedPath.brand.label': function () {
      console.error('selectedPath.brand.label')
      this.schoolColumns = this.getSchoolColumns()

      if (this.schoolColumns.values.length === 0) {
        this.reset(this.selectedPath.brand)
        return
      }
      this.selectedPath.school.label = this.schoolColumns.values[0].label
      this.selectedPath.school.value = this.schoolColumns.values[0].value
      this.selectedPath.school.index = 0
      this.pickerInst.setColumnIndex(3, 0)
      this.$nextTick(() => {
        this.pickerInst.setColumnIndex(2, this.selectedPath.brand.index)
      })
    },

  },
  mounted() {
    this.GetPopulationreport()
  console.log(this.testData)
    },
  methods: {
    GetPopulationreport(){
      this.$loading();
      Populationreport().then(res => {
        this.$loadingHide();
        if (res.status === 200) {
          this.testData = res.data.data;
          this.pickerInst = this.$refs['picker']
          this.agentColumns = this.getAgentColumns()
          this.selectedPath.agent.label = this.agentColumns.values[0].label
          this.selectedPath.agent.value = this.agentColumns.values[0].value
          this.selectedPath.agent.index = 0
        }
      }).catch(() => {
        throw new Error("异常!")
      })
    },
    reset(data) {
      data.label = ''
      data.value = 0
      data.index = 0
    },
    getAgentColumns() {
      return {
        values: this.testData.map((agent, i) => ({
          label: agent.agentName,
          value: i + 1,
          index: i,
        }))
      }
    },
    getAreaColumns() {
      let values = []
      if (this.selectedPath.agent.label) {
        const label = this.selectedPath.agent.label
        const agent = this.testData.find(agent => agent.agentName === label)
        if (agent && Array.isArray(agent.area)) {
          values = agent.area.map((area, i) => Object.assign({
            label: area.areaName,
            value: i + 1,
            index: i,
          }, area))
        }
      }
      return { values }
    },
    getBrandColumns() {
      let values = []
      if (this.selectedPath.area.label) {
        const label = this.selectedPath.area.label
        const area = this.areaColumns.values.find(area => area.areaName === label)
        if (area && Array.isArray(area.brand)) {
          values = area.brand.map((brand, i) => Object.assign({
            label: brand.brandName,
            value: i + 1,
            index: i,
          }, brand))
        }
      }
      return { values }
    },
    getSchoolColumns() {
      let values = []
      if (this.selectedPath.brand.label) {
        const label = this.selectedPath.brand.label
        const brand = this.brandColumns.values.find(brand => brand.brandName === label)
        if (brand && Array.isArray(brand.school)) {
          values = brand.school.map((school, i) => Object.assign({
            label: school.schoolName,
            value: i + 1,
            index: i,
          }, school))
        }
      }
      return { values }
    },

    onConfirm(val) {
      console.log(val)
      this.$emit('func',val[0].label, val[1].areaName,val[2].brandName,val[3].schoolName)
      // console.log(val[0].label +'-'+ val[1].areaName+'-'+val[2].brandName+'-'+val[3].schoolName)
    },
    onCancel() {
    },
    onChange(pickerInst, selected, columnIndex) {
      console.info('onChange', selected, columnIndex)
      // this.selected = selected
      const keys = ['agent', 'area', 'brand', 'school']
      for (let columnIndex in selected) {
        if (!selected.hasOwnProperty(columnIndex)) {
          continue
        }
        const targetKey = keys[columnIndex]
        const targetPath = this.selectedPath[targetKey]
        const targetColumns = this[targetKey + 'Columns']

        if (selected[columnIndex]) {
          targetPath.label = selected[columnIndex].label
          targetPath.value = selected[columnIndex].value
          targetPath.index = targetColumns.values.findIndex(item => item.value === targetPath.value)
        } else {
          targetPath.label = ''
          targetPath.value = 0
          targetPath.index = 0
        }

      }
    },
  },
}
</script>

<style scoped lang="less">

</style>


<template>
    <van-picker
            ref="picker"
            class="picker"
            show-toolbar
            :columns="columns"
            title="请选择地区/品牌/校区"
            value-key="label"
            @confirm="onConfirm"
            @cancel="onCancel"
            @change="onChange"
    >

    </van-picker>
</template>

<script>
    import { Picker } from 'vant'
    import { AgentFeeReport } from '@/api/agent/agent';


    export default {
        name: 't',
        components: {
            vanPicker: Picker,
        },
        data() {
            return {

                testData: [
                ],
                selectedPath: {
                    agent: {
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
                    // DEname: {
                    //   label: '无',
                    //   value: 0,
                    //   index: 0,
                    // },

                },

                agentColumns: { values: [] },
                brandColumns: { values: [] },
                schoolColumns: { values: [] },
                // DEnameColumns: { values: [] },

                pickerInst: null,
            }
        },
        computed: {
            columns() {
                return [
                    this.agentColumns,
                    this.brandColumns,
                    this.schoolColumns,
                    // this.DEnameColumns,
                ]
            },
        },
        watch: {
            'selectedPath.agent.label': function () {
                this.schoolColumns = { values: [] }
                this.DEnameColumns = { values: [] }
                this.brandColumns = this.getbrandColumns()

                if (this.brandColumns.values.length === 0) {
                    this.reset(this.selectedPath.brand)
                    return
                }
                this.selectedPath.brand.label = this.brandColumns.values[0].label
                this.selectedPath.brand.value = this.brandColumns.values[0].value
                this.selectedPath.brand.index = 0
                this.pickerInst.setColumnIndex(1, 0)
                this.$nextTick(() => {
                    this.pickerInst.setColumnIndex(0, this.selectedPath.agent.index)
                })
            },
            'selectedPath.brand.label': function () {
                this.DEnameColumns = { values: [] }
                this.schoolColumns = this.getBRColumns()

                if (this.schoolColumns.values.length === 0) {
                    this.reset(this.selectedPath.school)
                    return
                }
                console.error('selectedPath.brand.label')
                this.selectedPath.school.label = this.schoolColumns.values[0].label
                this.selectedPath.school.value = this.schoolColumns.values[0].value
                this.selectedPath.school.index = 0
                this.pickerInst.setColumnIndex(2, 0)
                this.$nextTick(() => {
                    this.pickerInst.setColumnIndex(1, this.selectedPath.brand.index)
                })
            },
            'selectedPath.school.label': function () {
                console.error('selectedPath.school.label')
                this.DEnameColumns = this.getDEColumns()

                if (this.DEnameColumns.values.length === 0) {
                    this.reset(this.selectedPath.school)
                    return
                }
                this.selectedPath.DEname.label = this.DEnameColumns.values[0].label
                this.selectedPath.DEname.value = this.DEnameColumns.values[0].value
                this.selectedPath.DEname.index = 0
                this.pickerInst.setColumnIndex(3, 0)
                this.$nextTick(() => {
                    this.pickerInst.setColumnIndex(2, this.selectedPath.school.index)
                })
            },

        },
        mounted() {
            this.GetPopulationreport()


        },
        methods: {
            GetPopulationreport(){
                AgentFeeReport().then(res => {
                    this.testData = res.data.data;

                    this.pickerInst = this.$refs['picker']
                    this.agentColumns = this.getAgentColumns()
                    this.selectedPath.agent.label = this.agentColumns.values[0].label
                    this.selectedPath.agent.value = this.agentColumns.values[0].value
                    this.selectedPath.agent.index = 0
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
                        label: agent.areaName,
                        value: i + 1,
                        index: i,
                    }))
                }
            },
            getbrandColumns() {
                let values = []
                if (this.selectedPath.agent.label) {
                    const label = this.selectedPath.agent.label
                    const agent = this.testData.find(agent => agent.areaName === label)
                    if (agent && Array.isArray(agent.brand)) {
                        values = agent.brand.map((brand, i) => Object.assign({
                            label: brand.brandName,
                            value: i + 1,
                            index: i,
                        }, brand))
                    }
                }
                return { values }
            },
            getBRColumns() {
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
            getDEColumns() {
                let values = []
                if (this.selectedPath.school.label) {
                    const label = this.selectedPath.school.label
                    const school = this.schoolColumns.values.find(school => school.schoolName === label)
                    if (school && Array.isArray(school.DEname)) {
                        values = school.DEname.map((DEname, i) => Object.assign({
                            label: DEname.namefourth,
                            value: i + 1,
                            index: i,
                        }, DEname))
                    }
                }
                return { values }
            },

            onConfirm(val) {
                this.$emit('func',val[0].label, val[1].brandName,val[2].schoolName)
                // console.log(val[0].label +'-'+ val[1].brandName+'-'+val[2].schoolName)
            },
            onCancel() {
            },
            onChange(pickerInst, selected, columnIndex) {
                console.info('onChange', selected, columnIndex)
                // this.selected = selected
                const keys = ['agent', 'brand', 'school', 'DEname']
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


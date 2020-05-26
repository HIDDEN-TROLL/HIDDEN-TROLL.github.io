<template>
    <div>
        <div>
            <van-nav-bar
                    title="今日运营统计"
                    left-text="搜索机构"
                    right-text="其他日期"
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
            />
        </div>

        <div style="border-bottom: 10px solid #f3f7f8;padding: 0.1rem;">
            <a  v-for="(item,index) in group" :key="index">
                <span :class=" item.id === groupId ? 'C_class' : 'U_class' " style="margin-right: 0.15rem" @click="changeSchool(item.id)">{{item.name}}</span>
            </a>
        </div>

        <div class="pages-tables " id="pages-tables" >
            <div class="waterMask" id="watermark"></div>
            <div class="rolling-table meal-table" ref="tableBox" style="height: 77vh;">

                <table class="table" id="table" cellpadding="0" cellspacing="0" ref="rollingTable">
                        <tr v-for="(x,i) in xList" :key="i">
                            <th class="rows " :class="{'cross': index == 0 && i == 0}" v-for="(l,index) in x" :key="index" :colspan="l.colspan" :rowspan="l.rowspan">{{l.name}}</th>
                        </tr>
                            <tr v-for="(l,i) in yList" :key="i + 'a'">
                                <template v-for="(x, xKey) in xField">
                                    <td v-for="(ll,yKey) in l" :key="yKey" v-if="x === yKey" :class="{'cols': yKey == xField[0]}">
                                        <!--{{ yList[i][yKey]}}-->
                                        <a v-if="yList[i][yKey].constructor === Array">
                                            {{yList[i][yKey][0]}}<br>
                                            {{yList[i][yKey][1]}}
                                        </a>
                                        <a v-else>{{ yList[i][yKey]}}</a>
                                    </td>
                                </template>
                            </tr>
                        <tr></tr>
                </table>
            </div>
        </div>

        <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn" v-if="btnType === 1"></FooterBtn>
        <FooterBtn :event-arr="btnTextSe" v-on:commenEvent="operateBtn" v-if="btnType === 2" style="    background-color: #b5b5b5;"></FooterBtn>

        <van-actionsheet
                v-model="Cdate"
                :actions="actions"
                @select="onSelect"
        />

        <van-dialog
                v-model="Search"
                title="输入搜索机构名称"
                show-cancel-button
                @confirm="SearchFun"
        >
            <div style="text-align: center;margin: 0.15rem;">
                <input type="text" id="SearchName" >
            </div>
        </van-dialog>
    </div>
</template>
<script>
    import { NavBar, Icon, Tab, Tabs, Row, Col, DatetimePicker, Popup, Actionsheet,List,Dialog,Toast  } from "vant";
    import { createIScroller } from "../../utils/operate-box";
    import FooterBtn from "../common/footer-operate-btn";
    import { operatelist,GroupManagement } from '@/api/operate/operate';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Icon.name]: Icon,
            [Toast.name]: Toast,
            [Tab.name]: Tab,
            [Dialog .name]: Dialog ,
            [Tabs.name]: Tabs,
            [Row.name]: Row,
            [Col.name]: Col,
            [List.name]: List,
            [Popup.name]: Popup,
            [Actionsheet.name]: Actionsheet,
            [DatetimePicker.name]: DatetimePicker,
            FooterBtn:FooterBtn
        },
        data() {
            return {
                btnType:1,
                //底部按钮
                btnText: [
                    {
                        type: 1,
                        title: "点击此处加载更多"
                    },
                ], btnTextSe: [
                    {
                        type: 2,
                        title: "已加载全部"
                    },
                ],
                loading:false,
                finished:false,
                schools:[],
                addschools:[],
                group:[],
                max:'',
                maxHeight:'100%',
                scroll: {
                    scroller: null
                },
                xList: [
                    [
                        {
                            field_name: "custom_field",
                            name: "机构",
                            colspan: 1, //指定单元格 横向 跨越的 列数
                            rowspan: 1, //指定单元格 纵向 跨越的 行数
                        },
                        {
                            field_name: "custom_field",
                            name: "学生",
                            colspan: 1,
                            rowspan: 1,
                        },
                        {
                            field_name: "custom_field",
                            name: "教师",
                            colspan: 1,
                            rowspan: 1,
                        },
                        {
                            field_name: "custom_field",
                            name: "校长",
                            colspan: 1,
                            rowspan: 1,
                        },  {
                            field_name: "custom_field",
                            name: "登录",
                            colspan: 1, //指定单元格 横向 跨越的 列数
                            rowspan: 1, //指定单元格 纵向 跨越的 行数
                        },
                        {
                            field_name: "custom_field",
                            name: "考勤",
                            colspan: 1,
                            rowspan: 1,
                        },  {
                            field_name: "custom_field",
                            name: "午休",
                            colspan: 1,
                            rowspan: 1,
                        },  {
                            field_name: "custom_field",
                            name: "用餐",
                            colspan: 1,
                            rowspan: 1,
                        }, {
                            field_name: "custom_field",
                            name: "作业",
                            colspan: 1,
                            rowspan: 1,
                        }, {
                            field_name: "custom_field",
                            name: "习惯点评",
                            colspan: 1,
                            rowspan: 1,
                        },{
                            field_name: "custom_field",
                            name: "成绩",
                            colspan: 1,
                            rowspan: 1,
                        },{
                            field_name: "custom_field",
                            name: "家长互动社区",
                            colspan: 1,
                            rowspan: 1,
                        },{
                            field_name: "custom_field",
                            name: "周报推送",
                            colspan: 1,
                            rowspan: 1,
                        },{
                            field_name: "custom_field",
                            name: "线上作业",
                            colspan: 1,
                            rowspan: 1,
                        },
                    ],
                ],
                xField: ['statis_date', 'area_name', "area_name1", "area_name2", "area_name3", "area_name4","area_name5","area_name6","area_name7","area_name8","area_name9","area_name10","area_name11","area_name12","area_name13", ],
                yList: [
                    // {
                    //     area_name: "新增数据",
                    //     area_name1: "新增数据1",
                    //     area_name2: "新增数据2",
                    //     area_name3: "新增数据3",
                    //     area_name4: "新增数据4",
                    //     area_name5: "新增数据5",
                    //     area_name6: "新增数据6",
                    //     statis_date: 201807,
                    // },
                ],
                query:'',
                groupId:1,
                nextId:'',
                filterType:1,


                // 日期选择
                Cdate:false,
                Search:false,
                actions: [
                    {
                        name: '今日',
                        type:1
                    },
                    {
                        name: '昨日',
                        type:2

                    }, {
                        name: '本周',
                        type:3

                    }, {
                        name: '上周',
                        type:4
                    },
                    {
                        name: '本月',
                        type:5

                    },{
                        name: '上月',
                        type:6

                    }
                ],
                stopC : false
            }
        },
        mounted() {
            this.maxHeight = window.screen.height
            this.scroll.scroller = createIScroller(".meal-table");
            this.testlist()
            this.groupList()
        },
        methods:{
            //底部按钮
            operateBtn(type) {
                if (type === 1) {
                    this.testlist()
                } else if (type === 2) {
                    Toast.fail('没有更多信息')
                }
            },
            // 切换分组
            changeSchool(id){
                if(this.stopC === false){
                    this.nextId = ''
                    this.query = ''
                    this.groupId = id
                    this.yList = []
                    this.addschools = []
                    this.testlist()
                }
            },
            // 查找机构
            SearchFun(){
                this.query = document.getElementById('SearchName').value
                this.search = false
                this.nextId = ''
                this.yList = []
                this.addschools = []
                this.testlist()
            },
            // 切换日期
            onSelect(item) {
                this.Cdate = false;
                this.filterType = item.type
                this.nextId = ''
                this.yList = []
                this.addschools = []
                this.testlist()
            },
            onClickLeft(){
                this.Search = true
            },
            onClickRight(){
                this.Cdate = true
            },
            // 获取机构信息列表
            testlist() {
                if(this.stopC === false){
                    this.$loading()
                    this.stopC = true
                    setTimeout(() => {
                        const data = {}
                        data.query = this.query
                        data.groupId = this.groupId
                        data.nextId = this.nextId
                        data.filterType = this.filterType
                        operatelist(data)
                            .then(res => {
                                //班级列表数据处理
                                if (res.status === 200) {
                                    this.$loadingHide()
                                        if(res.data.data.schools.length > 0){
                                            this.addschools = res.data.data.schools
                                            this.AddschoolsList()

                                            // 获取机构列表接口的最大id

                                            let max = this.addschools[0].schoolId
                                            for(let i= 0;i<this.addschools.length;i++){
                                                max = this.addschools[i].schoolId > max ? this.addschools[i].schoolId : max
                                            }
                                            this.nextId = max
                                            this.stopC = false
                                            if (this.addschools.length >= 10  ) {
                                                console.log(this.nextId)
                                                this.btnType = 1
                                            }else {
                                                this.btnType = 2
                                            }
                                        }else{
                                            Toast.fail('无此机构信息')
                                             this.query = ''
                                            this.stopC = false
                                            this.testlist()
                                        }
                                }
                            }).catch(()=>{
                            throw new Error("异常！")
                        })
                    }, 500);

                }
            },
            // 获取分组列表
            groupList() {
                GroupManagement()
                    .then(res => {
                        //班级列表数据处理
                        if (res.data.meta.success) {
                            this.group = res.data.data.list
                        }
                    })
            },
            // 机构表格内容
            AddschoolsList(){
                for (let b = 0; b < this.addschools.length; b++) {
                    let lsObj = {}
                    for (let x = 0; x < this.addschools[b].lists.length ; x++) {//生成表格内容
                        if(x === 0){
                                lsObj['statis_date'] = this.addschools[b].lists[x].value
                        }else if(x === 1 ){
                            lsObj['area_name'] = this.addschools[b].lists[x].value
                        }else if(x > 1 ){
                            lsObj['area_name' + x] = this.addschools[b].lists[x].value
                        }
                    }
                    this.yList.push(lsObj)
                }
            },
        }
    }

</script>
<style lang="less" scoped>
    *{
        font-size: 0.14rem;
    }
    .pages-tables {
        -webkit-overflow-scrolling: touch; // ios滑动顺畅
        position: relative;
        margin: 0.1rem;
    }
    .rolling-table {
        height: 3rem;
        font-size: 0.14rem;

        color: #86939a;
        background-color: #fff;
        width: 100%;
        -webkit-overflow-scrolling: touch;
        position: relative;
        top: 0;
        overflow: hidden;
    }
    .rows {
        position: relative;
        z-index: 3;
    }
    .cross {
        position: relative;
        z-index: 99;
    }
    table td {
        border: 0px solid #000;
        font-size: 0.14rem;

        background: #fff;
    }
    ::-webkit-scrollbar {
        display: none;
    }
    .table {
        //   border-collapse: collapse; //去掉重复的border
        color: #86939e;
        font-size: 0.14rem;

        border: 0px solid #000;
        min-height: 100%;
        text-align: center;
        .cols{
            /*border-right: 0.02rem solid #eee;*/
            padding: 0;
            background-color: #f3f4f6;
            color: #43484d;
            border-right: 0.01rem solid #a1a1a1;
            border-bottom: 0.01rem solid #a1a1a1;
        }
        td {
            border-bottom: 0.02rem solid #eee;
            border-right: 0.02rem solid #eee;
            white-space: nowrap;
            height: 0.3rem;
            line-height: 0.35rem;
            padding: 0 0.2rem;
        }
        th {
            color: #43484d;
            white-space: nowrap;
            height: 0.2rem;
            line-height: 0.35rem;
            padding: 0.1rem 0;
            background-color: #f3f4f6;
            font-weight: normal;
            padding-bottom: 0;
            padding-top: 0;
            border: 0.01rem solid #a1a1a1;
        }
    }
    tr{
        position: relative;
        background-color: #fff;
        &:nth-of-type(odd){
            td{
                // background-color: pink;
            }
        }
    }
    /deep/.van-list__finished-text{
        display: none;
    }
    .C_class{
        border-bottom: solid blue;
        padding-bottom: 0.1rem;
        color: blue;
    }
    .U_class{
        border-bottom: solid white;
        padding-bottom: 0.1rem ;
    }

</style>
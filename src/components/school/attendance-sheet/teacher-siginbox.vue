<template>
    <div class="pages-tables" id="pages-tables">
        <div class="waterMask" id="watermark">
            <b>学生</b>
            <em>日期</em>
        </div>
        <div class="rolling-table meal-table" ref="tableBox" >
            <table class="table" id="table" cellpadding="0" cellspacing="0" ref="rollingTable">
                <tr v-for="(x,i) in xList" :key="i">
                    <th
                            class="rows"
                            :class="{'cross': index == 0 && i == 0}"
                            v-for="(l,index) in x"
                            :key="index"
                            :colspan="l.colspan"
                            :rowspan="l.rowspan"
                    >
                        <div class="tb-th">
                            <p>{{l.name}}</p>
                            <p>{{l.week}}</p>
                        </div>
                    </th>
                </tr>
                <tr v-for="(l,i) in yList" :key="i + 'a'"> <!-- 这里遍历外层数组，获取yList项-->
                    <template v-for="(x) in xField"> <!-- 这里遍历属性名，获取yList每一项属性名-->
                        <!-- 这里遍历属yList每一项添加首列控制类，v-if控制列表显示内容-->
                        <td
                                v-for="(ll,yKey) in l" :key="yKey"
                                v-if="x === yKey"
                                :class="{'cols': yKey == xField[0]}"
                        >
                            <template v-if="yKey==='statis_date'">
                                <router-link :to="{name:'AttendanceSheetTeacherDetail',query:{id:yList[i][yKey].id,name:yList[i][yKey].sName}}">
                                    <div style="width:0.68rem">
                                        {{ yList[i][yKey].sName}}<br>
<!--                                        {{ yList[i][yKey].sNameTimes}}<br> -->
                                        <template v-if="typeObj.showGarde">{{ yList[i][yKey].sGarde}}</template>
                                    </div>
                                </router-link>
                            </template>
                            <template v-else>
                              <span style="display:inline-block;padding: 0px 5px;" >
<!--                              <span style="display:inline-block;padding: 0px 5px;" v-if="typeObj.type==1 || typeObj.type==0">-->
<!--                              <span style="display:inline-block;padding: 0px 5px;" v-if="typeObj.type===yList[i][yKey].attendanceTypeId">-->
                              <template v-for="(item) in yList[i][yKey].time"  ><!-- 根据查询类型控制是否显示内容-->
                                  <template v-for="(item2) in item.time"  ><!-- 根据查询类型控制是否显示内容-->
                                        <template v-if="(item.attendanceTypeId === typeObj.type) && typeObj.type != null">
                                            {{item2}}<br>
                                        </template>
                                        <template v-else-if=" typeObj.type === null">
                                            {{item2}}<br>
                                        </template>
                                  </template>
<!--                                  -->
<!--                                <template>-->
<!--                                    {{item}} <br>-->
<!--                                </template>-->
                              </template>
                              </span>
                            </template>
                        </td>
                    </template>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    import { createIScroller} from "../../../utils/iscrollTable";
    //import { addWaterMarker } from "libs/common/common";
    export default {

        props:{
            xList:{
                type:Array
            },
            xField:{
                type:Array
            },
            yList:{
                type:Array
            },
            typeObj:{
                type:Object
            }
        },
        data() {
            return {

                scroll: {
                    scroller: null
                }
            };
        },
        mounted() {
            this.maxHeight = window.screen.height;
            this.scroll.scroller = createIScroller(".meal-table");
            // addWaterMarker(document.getElementById('watermark'))
        }
    };
</script>
<style lang="less" scoped>
    .pages-tables {
        -webkit-overflow-scrolling: touch; // ios滑动顺畅
        position: relative;
        border: 1px solid #eee;
        border-top:0;
        /*height: 100%;*/
        overflow: hidden;
    }
    #watermark {
        position: absolute;
        font-size: 0.12rem;
        width: 0.69rem;
        height: 0.53rem;
        background-color: #fff;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        z-index: 99;
        // .out {
        // 	border-top: 0.5rem #eee solid; /*上边框宽度等于表格第一行行高*/
        //   border-left: 1.1rem #fff solid; /*左边框宽度等于表格第一行第一格宽度*/
        //   color:white;
        // }
        b {
            font-style: normal;
            display: block;
            position: absolute;
            top: 0.3rem;
            left: 0.07rem;
            font-size: 0.12rem;
            color: #666;
            font-weight: 400;
            z-index: 1;
        }

        em {
            width: 0.25rem;
            font-style: normal;
            display: block;
            position: absolute;
            top: 0.05rem;
            left: 0.4rem;
            font-size: 0.12rem;
            color: #666;
            font-weight: 400;
        }
    }
    #watermark::before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 0.52rem solid #ccc;
        border-right: 0.68rem solid transparent;
        content: "";
    }
    #watermark::after {
        position: absolute;
        left: 0;right: 0;
        top: 1px;bottom: 0;
        border-bottom: 0.52rem solid #fff;
        border-right: 0.68rem solid transparent;
        content: "";

    }
    .rolling-table {
        max-height: 4rem;
        font-size: 0.12rem;
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
    table td {
        border: 0px solid #000;
        font-size: 0.12rem;
        background: #fff;

    }
    ::-webkit-scrollbar {
        display: none;
    }
    .table {
        //border-collapse: collapse; //去掉重复的border
        color: #999;
        font-size: 0.12rem;
        /*min-height: 100%;*/
        text-align: center;
        .tb-th {
            height: 0.53rem;
            border: 1px solid #eee;
            /* border-right: 0;*/
            border-top:0;
            border-left: 0;
            position: relative;
            width: 0.68rem;
            p {
                line-height: 0.24rem;
            }
        }

        td {
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
            white-space: nowrap;
            height: 0.69rem;
            line-height: 0.26rem;
            .cross {
                position: relative;
                z-index: 5;
                border-right: 1px solid #eee;
            }
        }
        td:last-child {
            border-right: 0;
        }
        th {
            color: #666;
            white-space: nowrap;
            height: 0.24rem;
            line-height: 0.24rem;
            background-color: #fff;
            font-weight: normal;
            position: relative;
            border-left: 0;
            border-top:0;
            width: 0.68rem;
            // .cross {
            //     border-bottom: 0;
            // }
        }
    }
    tr {
        position: relative;
        background-color: #fff;
        &:nth-of-type(odd) {
            td {
                // background-color: #eee;
            }
        }
        .cols {
            border:1px solid #EEE;
            border-top:0;
            border-left:0;
        }
    }
</style>
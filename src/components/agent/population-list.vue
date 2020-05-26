<template>
    <div>
        <div class="top_search">
            <div class="left">
                <div class="date_top_list">
                    <van-cell title="地区" is-link arrow-direction="down"  @click="showcho"/>
                </div>
                <div class="search_div">
                   <div><input type="text" class="search" placeholder="请输入地区名称"  v-model='search ' ></div>
                    <div> <i class="van-icon van-icon-search"><!----></i></div>
                </div>
            </div>
            <img :src="settingpic" @click="HideBox">
        </div>

        <div>
            <div style="float:left; width: 3.55rem;border: solid 0.01rem #dcdcdc;overflow-x: scroll;margin: 0.1rem 0 0.1rem 0.1rem;padding: 0.01rem">

                <div class="testsilder" style="width: 5.4rem">

                    <div>
                        <div  class="box toptitle"  :class={DL:DQ} >
                            <span>地区</span>
                        </div>
                        <div  class="box toptitle"  :class={DL:PP}>
                            <span>品牌</span>
                        </div>
                        <div  class="box toptitle"  :class={DL:XQ}>
                            <span>校区</span>
                        </div>

                        <div  class="personbox" :class={DL:XZ}>
                            <div  class="one">    <span>校长</span></div>
                            <div>
                                <div class="bind">绑定</div>
                                <div class="unbind">未绑</div>
                            </div>
                        </div>
                        <div  class="personbox"  :class={DL:JS}>
                            <div  class="one">    <span> 教师</span></div>
                            <div>
                                <div class="bind">绑定</div>
                                <div class="unbind">未绑</div>
                            </div>
                        </div>
                        <div  class="personbox" :class={DL:XS}>
                            <div class="one" >    <span>学生</span></div>
                            <div>
                                <div class="bind">绑定</div>
                                <div class="unbind">未绑</div>
                            </div>
                        </div>
                        <div class="firstsign">
                            <span>首次启用</span>
                        </div>
                    </div>

                    <div v-if="searchData.length>0">
                            <div v-for="(itemse,index) in searchData" :key="index" style="float: left;width: 100%">
                                <div  class="placebox firaddress" :class={DL:DQ}>
                                    {{itemse.areaName}}
                                </div>

                                <div class=" " style="float:left;">

                                    <div v-for="(itemth,index) in itemse.brand" :key="index">
                                        <div class="brandbox address brand" :class={DL:PP}>
                                            <span>{{itemth.brandName}}</span>
                                        </div>
                                        <div style="float:left;">

                                            <div v-for="(itemfo,index) in itemth.school" :key="index">

                                                <div class="schoolname" :class={DL:XQ}> {{itemfo.schoolName}}</div>
                                                <div style="float:left;">
                                                    <div  class="numberbox" :class={DL:XZ}>{{itemfo.principal.hasBinding}}</div>
                                                    <div  class="numberbox" :class={DL:XZ}>{{itemfo.principal.notBinding}}</div>
                                                    <div  class="numberbox" :class={DL:JS}>{{itemfo.teacher.hasBinding}}</div>
                                                    <div  class="numberbox" :class={DL:JS}>{{itemfo.teacher.notBinding}}</div>
                                                    <div  class="numberbox" :class={DL:XS}>{{itemfo.student.hasBinding}}</div>
                                                    <div  class="numberbox" :class={DL:XS}>{{itemfo.student.notBinding}}</div>
                                                    <div  class="timebox">{{itemfo.startUseDate}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                    </div><div v-else style="width:3.7rem;line-height: 1rem;">查无此地区数据</div>
                </div>
            </div>
        </div>


        <van-popup v-model="showMonth" position="bottom" :overlay="true">
            <div style="font-size: 0.15rem;border-bottom: solid 1px #dcdcdc;line-height: 0.5rem;color: #1989fa;font-weight: 700" @click="GetAgentnumberPeopleReport()">点击此处返回今日所有数据</div>
            <PopulationPick  @func="Showdate" ></PopulationPick>
        </van-popup>

        <van-popup v-model="HideBoxTitle" position="bottom" :overlay="true">
            <div style="text-align: left;padding: 0.1rem;font-size: 0.14rem;float: left;" @click="onCancel">返回</div>
            <div style="text-align: left;padding: 0.1rem;font-size: 0.14rem;text-align: center;text-align: center;color: #1989fa;">选择要隐藏的表头</div>
            <van-checkbox v-model="DQ" class="hidebtn">地区</van-checkbox>
            <van-checkbox v-model="PP" class="hidebtn">品牌</van-checkbox>
            <van-checkbox v-model="XQ" class="hidebtn">校区</van-checkbox>
            <van-checkbox v-model="XZ" class="hidebtn">校长</van-checkbox>
            <van-checkbox v-model="JS" class="hidebtn">教师</van-checkbox>
            <van-checkbox v-model="XS" class="hidebtn">学生</van-checkbox>
        </van-popup>

    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { NavBar } from 'vant';
    import { Search } from 'vant';
    import { Popup } from 'vant';
    import { Cell, CellGroup,icon } from 'vant';
    import { Picker } from 'vant';
    import { Checkbox, CheckboxGroup } from 'vant';
    import PopulationPick from './components/population-picker'
    import { AgentnumberPeopleReport } from '@/api/agent/agent';
    //import someComponent from './someComponent'
    export default {
        name: "",

        computed: {
            searchData: function() {
                var search = this.search;
                if (search) {
                    return this.populationmes.filter(function(product) {
                        return Object.keys(product).some(function(key) {
                            return String(product[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                return this.populationmes;
            },
        },
        data(){
            return {
                populationmes:[],

                columnss:[],
                showMonth: false,
                search:'',
                searchse:'',
                settingpic: require("../../assets/img/newconcept/settingse.png"),

                HideBoxTitle: false,
                DQ:false,
                PP:false,
                XQ:false,
                XZ:false,
                JS:false,
                XS:false,
            }
        },
        components: {
            [NavBar.name]:NavBar,
            [Search.name]:Search,
            [icon.name]:icon,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            PopulationPick:PopulationPick

            //someComponent
        },
        mounted(){
            this.GetAgentnumberPeopleReport()
        },
        methods:{
            Showdate(area,brand,school){
                const data = {}
                if (area) {
                    data.area = area
                }
                if (brand) {
                    data.brand = brand
                }
                if (school) {
                    data.school = school
                }
                console.log(data)
                AgentnumberPeopleReport(data).then(res => {
                    this.populationmes = res.data.data;
                }).catch(() => {
                    throw new Error("代理角色搜索参数异常!")
                })
                this.showMonth = false
            },
            HideBox(){
                this.HideBoxTitle= true
            },
            GetAgentnumberPeopleReport(){
                this.$loading();

                AgentnumberPeopleReport().then(res => {
                    this.$loadingHide();
                    if (res.status === 200) {
                        this.populationmes = res.data.data;
                    }
                }).catch(() => {
                    throw new Error("获取代理表格数据异常!")
                })
                this.showMonth = false
            },
            showcho(){
                var address= [];
                for (let ad of this.populationmes){
                    address.push(ad.areaName)
                }
                this.columnss = address
                this.showMonth = true

           },
            onConfirm() {
                this.showMonth = false;

            },
            onCancel() {
                this.HideBoxTitle= false
                this.showMonth = false;
            }
        }
    }
</script>

<style scoped>
    *{
        word-wrap:break-word
    }
    .lation_mes table,td,th{
        border-collapse: collapse;
        font-size:0.12rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.17rem;
        border: solid 1px #DCDCDC;
    }
/*代理商------------------------------------------------------------------*/
    .left{
        font-size:0.14rem;
        float: left;
        width: 3.12rem;
        height: 0.24rem;
        border: solid #BCBCBC 0.01rem;
        border-radius: 0.04rem;
    }
    .top_search{
        float: left;
        margin:0.15rem ;
    }
    .top_search img{
        width:0.24rem;
        height:0.24rem;
        margin-left: 0.07rem;
        float: left;
    }
    .search_div{
        width:75%;
       margin-left:0.05rem;
        float: left;
        border-left: solid 1px #CCCCCC;
    }
    .search{
        float: left;
        width:90%;
        margin-left:0.05rem;
        border:none;
        line-height: 0.2rem;
        height:0.2rem
    }
    .lation_mes{
        float: left;
        margin-top: 0.3rem;
    }
    .date_top_list{
        width:0.7rem;
        float: left;
    }
    .van-cell__title{
        flex:none;
        color:#666666;
        text-align: center;
    }
    .van-cell  {
        line-height: 0.24rem;
        font-size: 0.14rem;
        margin-left:0.05rem;
        width:100%;
        padding: 0 ;
        height: 0.2rem;
    }
    .van-icon {
        font-size: 0.16rem;
        line-height: 0.24rem;
    }
    div{
        font-size: 0.12rem;
        text-align: center;
    }
    .box{
        width: 0.4rem;
        float: left;
        border: solid #dcdcdc;
        border-width: 0 0.01rem 0.01rem 0;
    }
    .brandbox{
        width: 0.4rem;
        float: left;
        border: solid #dcdcdc;
        border-width: 0 0.01rem 0.01rem 0;
    }
    .placebox{
        width: 0.4rem;
        float: left;
        border: solid #dcdcdc;
        border-width: 0 0.01rem 0.01rem 0;
    }
    .toptitle{
        line-height: 0.9rem;
        height: 1rem;
        width: 0.4rem;
        border: solid 1px #dcdcdc;
        margin: 0.01rem;
    }
    .schoolname{
        width: 0.4rem;
        text-align: center;
        height: 1rem;
        float: left;
        margin: 0.01rem;
        border: solid 1px #dcdcdc;
    }
    .numberbox{
        line-height: 0.4rem;
        width: 0.4rem;
        height: 1rem;
        float: left;
        margin: 0.01rem;
        border: solid 1px #dcdcdc;
    }
    .timebox{
        line-height: 1rem;
        width: 1.35rem;
        height: 1rem;
        float: left;
        border: solid 1px #dcdcdc;
        margin: 0.01rem;
    }
    .personbox{
        width: 0.84rem;
        float: left;
        margin: 0.01rem;
        border: solid 1px #dcdcdc;
    }
    .personbox .one{
        line-height: 0.55rem;
        border: solid #dcdcdc;
        border-width: 0 0 0.01rem  0;
    }
    .firstsign{
        width: 1.35rem;
        line-height: 1rem;
        height: 1rem;
        float: left;
        border: solid 1px #dcdcdc;
        margin: 0.01rem;
    }
    .bind{
        line-height: 0.45rem;
        width: 0.4rem;
        float: left;
        border-right: solid 1px #dcdcdc;
        margin-right: 0.016rem;
    }
    .unbind{
        border-left: solid 1px #dcdcdc;
        float: left;
        line-height: 0.45rem;
        width: 0.4rem;
    }
    .address{
        /*height: 0.4rem;*/
    }
    .brand{
        border: solid 1px #dcdcdc;
        height: 1rem;
        width: 0.4rem;
        margin: 0.01rem;
    }
    .firaddress{
        border: solid 1px  #dcdcdc;
        height: 1rem;
        width: 0.4rem;
        margin: 0.01rem;
    }
    .hidebtn{
        margin: 0.1rem 0;
    }
    .DL{
        display: none;
    }

</style>

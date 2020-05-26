<template>

    <div class="body">
        <van-nav-bar
                title="个人详情"
                :left-text="isFromTemplate ? '' : '返回'"
                :left-arrow="!isFromTemplate"
                right-text="筛选日期"
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />

        <div class="top_mes">
            <van-row>
                <van-col span="5" style="text-align: left">{{test.stuName}}</van-col>
                <van-col span="14" style="text-align: center">{{changeStart}}至{{changeEnd}}</van-col>
                <van-col span="5" style="text-align: right;color: red;font-weight: 700">发烧{{test.feverNumber}}次</van-col>
            </van-row>
        </div>

        <div class="ac_line"></div>

        <div>
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <div  v-for="(item,index) in test.list" :key="index" >
                    <div :class="item.type === 1 ? 'mes_listse' : 'mes_list'">
                        <van-row>
                            <van-col span="6"><a style="font-weight: 700;">{{item.date}}</a></van-col>
                            <van-col span="4">{{item.time}}</van-col>
                            <van-col span="4">
                                <a v-if="item.temperature >= 38" style="color: #FF6666;font-weight: 700">{{item.temperature}}℃</a>
                                <a v-else>{{item.temperature}}℃</a>
                            </van-col>
                            <van-col span="4" >
                                <a v-if="item.temperatureStatus === 2" style="color: #FF6666;font-weight: 700">发烧</a>
                                <a v-if="item.temperatureStatus === 0">正常</a>
                                <a v-if="item.temperatureStatus === 1">低温</a>
                            </van-col>
                            <van-col span="6">
                                <div v-if="item.type === 1">
                                    由教师点评
                                </div>
                                <div class="img_box" v-else  @click="showImg(item.image)">
                                    <img :src="item.image">
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                </div>
            </van-list>

        </div>

        <ChangeDate ref="child" :option-type="2" :default-selected="1" @change="changeFun($event)"> </ChangeDate>

    </div>
</template>

<script>
    import { NavBar,Switch,Tab,Tabs,Row, Col,Dialog,Button,Toast,Icon,Cell,DatetimePicker,Popup, List,ImagePreview  } from 'vant';
    import { StuPerTemperature } from '@/api/temperature-gun/app';
    import { formatDate } from '@/utils'
    import ChangeDate from '../../../common/date-range-filter-dialog.vue';
    import { getParamFromUrlAndRoute } from '@/utils'

    export default {
        name: "automatic-mode",
        data() {
            return {
                // 筛选日期参数
                year:new Date().getFullYear(),
                month: new Date().getMonth()+1 ,
                days:new Date().getDate(),

                stuId:this.$route.query.stuId,
                nextId:0,

                test:[],

                loading: false,
                finished: false,

                // 时间选择参数
                changeName:'今日',
                changeStart:null,
                changeEnd:null,
                isFromTemplate: false,
                templateId: 0,
            };
        },
        components: {
            [Toast.name]: Toast,
            [Cell.name]: Cell,
            [Popup.name]: Popup,
            [NavBar.name]: NavBar,
            [Button.name]: Button ,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Switch.name]: Switch,
            [DatetimePicker.name]: DatetimePicker,
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon ,
            [Dialog.name]: Dialog ,
            [List.name]: List ,
            [ImagePreview.name]: ImagePreview ,
            ChangeDate: ChangeDate,
        },
        methods:{
            // 查看图片
            showImg(img){
                ImagePreview([
                    img
                ]);
            },
            // 筛选时间
            changeFun(data){
                this.changeName = data.name
                this.changeStart = formatDate(new Date(data.startDate))
                this.changeEnd = formatDate(new Date(data.endDate))
                this.nextId = 0
                this.StuPerTemperatureFun()
            },
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    if (this.test.list.length > 0) {
                        const ids = this.test.list.map(item => item.id)
                        this.nextId = Math.min.apply(Math, ids)
                    } else {
                        this.nextId = 0
                    }
                    console.log(this.nextId)
                    const data = {}
                    data.startDate = this.changeStart
                    data.endDate =  this.changeEnd
                    data.nextId = this.nextId
                    if(this.stuId){
                        data.stuId = this.stuId
                    }
                  if (this.isFromTemplate && this.templateId > 0) {
                    data.from = 'template'
                    data.template_id = this.templateId
                  }
                    StuPerTemperature(data)
                        .then(res => {
                            if (res.data.meta.success) {

                                const list = res.data.data.list
                                if (Array.isArray(list) && list.length > 0) {
                                    this.test.list = this.test.list.concat(list)
                                } else {
                                    this.finished = true
                                }

                                console.log(this.test)

                            }
                        }).catch(() => {
                        throw new Error("获取历史体温异常！")
                        this.finished = true
                    }) .finally(() => {
                        this.loading = false
                    })
                }, 1500);
            },
            // 获取历史体温
            StuPerTemperatureFun() {
                const data = {}
                data.startDate = this.changeStart
                data.endDate =  this.changeEnd
                data.nextId = this.nextId
                if(this.stuId){
                    data.stuId = this.stuId
                }
                StuPerTemperature(data)
                    .then(res => {
                        if (res.data.meta && res.data.meta.code === 0) {
                            this.test = res.data.data
                        }
                    }).catch(() => {
                    throw new Error("获取个人详情异常！")
                })
            },
            onClickLeft(){
                this.$router.back()
            },
            onClickRight(){
                this.$refs.child.show();
            },

        },
        mounted(){
          const templateId = getParamFromUrlAndRoute('template_id', this.$router)
          if (templateId) {
            this.isFromTemplate = true
            this.templateId = templateId
          }
            this.changeStart = this.year+"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))+"-"+this.days
            this.changeEnd = this.year+"-"+((this.month) < 10 ? '0' + (this.month) : (this.month))+"-"+this.days
            this.StuPerTemperatureFun()
        }

    }
</script>

<style scoped>
    *{
        word-wrap:break-word
    }
    .body{
        font-size:0.14rem
    }
    .ac_line{
        height: 0.1rem;
        background: #F3F7F8;
        /*float: left;*/
        /*width: 100%;*/
    }
    .top_mes{
        line-height: 0.4rem;
        padding: 0 0.15rem;
        border-bottom: solid 1px #CCCCCC;
    }
    .mes_list{
        text-align: center;
        padding: 0.1rem ;
        border-bottom: solid 1px #CCCCCC;
        line-height: 0.8rem;
    }
    .mes_listse{
        text-align: center;
        padding: 0.1rem ;
        border-bottom: solid 1px #CCCCCC;
        line-height: 0.3rem;
    }
    .img_box{
        width: 0.8rem;
        height: 0.8rem;
        margin: 0 auto;
    } .img_box img{
          width: 100%;
          height: 100%
      }
    .timebox{
        margin: 0.2rem 0;
        line-height: 0.4rem;
        text-align: center;
    }


</style>

<template>
  <div id="archives-detail">
    <!-- 档案详情-->
    <div class="go-back">
      <van-nav-bar title="档案详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="content">
      <van-tabs type="card" title-active-color="#fff" color="#3770FB" title-inactive-color="#3770FB">
        <van-tab title="成长分析">
          <div class="growth-analysis"  >
            <div class="basic-info">
              <div class="student-info" v-if="JSON.stringify(basic)!=='{}'">
                <div class="img-info">
                  <div class="awator">
                    <img :src="basic.avater" alt="" class="">
                  </div>
                  <span class="name">{{basic.studentName}}</span>
                </div>
                <div class="total">
                  <span class="flower">总红花数 <span class="cr">{{basic.saffflowerNum}}</span> 朵</span>
                  <span class="more-than">超上一名需要{{basic.removingNum}}红花</span>
                </div>
                <div class="total">
                  <span class="flower">可兑奖红花 <span class="cr">{{basic.safflowerCashNum}}</span> 朵</span>
                  <span class="more-than">已兑换{{basic.convertNum}}次奖品</span>
                </div>
                <div class="rank">
                  <router-link :to="{name:'SafflowerRanking'}">
                    <span class="view-btn">查看排行榜</span>
                  </router-link>
                </div>
              </div>
              <div class="info-chart">
                <div class="echart-sheet" id="echart-sheet" :style="{width: '2rem', height: '2rem'}" ref="radars"></div>
                <p>{{assessment}}</p>
              </div>
            </div>
            <div class="mounth-flower">
              <div class="month-tab">
                <div class="prev-month month" v-if="active !== month.length-1" @click="prev">
                  <van-icon name="arrow-left" />
                </div>
                <div class="month-content month">

                      <span v-for="(items,indexs) in month" :key="indexs">
                        <template v-if="active===indexs">
                          {{items.mSty}}
                        </template>
                      </span>


                </div>
                <div class="next-month month" v-if="active !== 0" @click="next">
                  <van-icon name="arrow" />
                </div>
              </div>
              <div class="line-ecahert">
                <div class="title">
                  <span class="reward"><i class="box-icon"></i>奖励</span>
                  <span class="punishment"><i class="box-icon"></i>扣除</span>
                </div>
<!--                <div class="hide-scroll" :style="{height:'2rem',overflow:'hidden'}">-->
<!--                  <div class="hiden-box" :style="{width: '3.43rem',overflowX:'scroll',height:'2.15rem'}">-->
<!--                    <div class="echart-line" id="echart-line" :style="{height: '2rem',boxSizing:'border-box'}"></div>-->
                    <div id="light" style="width: 3.5rem;height:2rem;margin: 0 auto;"></div>

<!--                  </div>-->
<!--                </div>-->
                <div class="summary">
                  <span class="name">本月：</span>
                  <span class="reward">奖励 <span class="num">{{awardNum}}</span> 朵</span>
                  <span class="deduct">扣除 <span class="num">{{deductNum}}</span> 朵</span>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="评分详情">
          <div class="wait-reply" >
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
              <div  v-for="(item,index) in detailList" :key="index" >

              <div v-if="item.isTraining === false">
                <div class="top-box" style="font-size: 0.14rem;line-height: 0.4rem;font-weight: 700">
                  <div class="left-info">
                    <span class="time" v-if="item.status===0" style="text-decoration:line-through">{{item.date}}</span>
                    <span class="time" v-else>{{item.date}}</span>
                  </div>
                </div>

                <div class="reply-list">


                  <template v-if="!isEmpty(item.safflowerNum)">
                    <div v-if="item.type===1" class="Upnumber">
                      <i class="icon iconfont icon-honghua"></i>&nbsp;
                      <span v-if="item.status===0" style="text-decoration:line-through">奖励{{item.safflowerNum}}朵</span>
                      <span v-else >奖励{{item.safflowerNum}}朵</span>
                    </div>
                    <div v-else class="Upnumber" style="    color: #D80000; ">
                      <i class="icon iconfont icon-honghua"></i>&nbsp;
                      <span v-if="item.status===0"  style="text-decoration:line-through">减少{{item.safflowerNum}}朵</span>
                      <span v-else>减少{{item.safflowerNum}}朵</span>
                    </div>
                  </template>


                  <div class="section-box">
                    <span class="comm-person" v-if="item.schoolmaster===1"></span>
                    <span class="text-shcool" v-if="item.schoolmaster===1">校长亲评</span>
                    <div class="summary">
                      <span class="flower-total-w" v-if="item.type === '1'">
                        <i class="font-io"><van-icon name="setting" /></i>
                        <span v-if="item.status===0" style="text-decoration:line-through">奖励 {{item.safflowerNum}} 朵</span>
                        <span v-else >奖励 {{item.safflowerNum}} 朵</span>
                      </span>
                      <span class="flower-total-d" v-if="item.type === '2'">
                        <i class="font-io"><van-icon name="warning-o" /></i>
                        <span v-if="item.status===0" style="text-decoration:line-through">扣除 {{item.safflowerNum}} 朵</span>
                        <span v-else >扣除 {{item.safflowerNum}} 朵</span>
                      </span>
                    </div>
                    <div class="score-detail" v-if="item.comment&&item.comment.length>0">
                      <div class="items" v-for="(val, idx) in item.comment" :key="idx">

                          <span v-if="typeof val === 'string'" style="display: block">
                              <span v-if="item.status===0" style="text-decoration:line-through" class="text">{{idx+1}}. {{val}}</span>
                              <span v-else  class="text">{{idx+1}}. {{val}}</span>
                          </span>

                        <div class="cmst" v-else >
                          <div class="title"><span>
                            <span v-if="item.status===0" style="text-decoration:line-through">  [{{val.name}}]</span>
                            <span v-else >   [{{val.name}}]</span>
                          </span></div>
                          <div class="cms-dea">
                            <span v-for="(values, indexNum) in val.number" :key="indexNum" style="display: block">
                              <span class="text">
                                 <span v-if="item.status===0" style="text-decoration:line-through"> {{values.content}}</span>
                                 <span v-else > {{values.content}}</span>
                               </span>
                              <span class="score-w" v-if="item.type === 1">
                                <span v-if="item.status===0"  style="text-decoration:line-through">+{{values.worth}}</span>
                                <span v-else> +{{values.worth}}</span>
                               </span>
                              <span class="score-d" v-if="item.type === 2">
                                 <span v-if="item.status===0" style="text-decoration:line-through"> -{{values.worth}}</span>
                                <span v-else >  -{{values.worth}}</span>
                               </span>
                            </span>
                          </div>

                        </div>

                      </div>
                    </div>
                    <div class="img-list">
                      <div class="exchange_text" v-if="item.type===3">
                        <span v-if="item.status===0" style="text-decoration:line-through">  使用小红花兑换奖品“{{item.mallName}}”</span>
                        <span v-else >  使用小红花兑换奖品“{{item.mallName}}”</span>
                      </div>
                      <div class="img-tab" v-for="(val,idx) in item.imgurl" :key="idx" @click="preview(item.imgurl, idx)">
                        <img :src="val" alt="">
                      </div>
                    </div>
                    <div class="operate-obj" >
                      <span class="time">
                                <span v-if="item.status===0" style="text-decoration:line-through"> {{item.date}}</span>
                                <span v-else > {{item.date}}</span>
                      </span>
                      <span class="name">
                                <span v-if="item.status===0" style="text-decoration:line-through"> {{item.ismyself===1?'由我奖励':item.rewarderName}}</span>
                                <span v-else > {{item.ismyself===1?'由我奖励':item.rewarderName}}</span>
                        </span>
                    </div>
                  </div>
                  <div class="comment-area">
                    <div class="comment-list" v-if="JSON.stringify(item.review)!=='{}'">
                      <div class="comment-box" >
                        <span class="name">{{item.review.reviewName}}评论：</span>
                        <span class="comment-content">{{item.review.content}}</span>
                      </div>
                      <div class="time-box">
                        <span class="time">{{item.review.date}}</span>
                      </div>
                    </div>
                    <div class="comment-list" v-if="JSON.stringify(item.replyReview)!=='{}'">
                      <div class="comment-box" >
                        <span class="name">{{item.replyReview.replyName}}回复：</span>
                        <span class="comment-content">{{item.replyReview.content}}</span>
                      </div>
                      <div class="time-box">
                        <span class="time">{{item.replyReview.date}}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div v-if="item.isTraining === true">
                <div class="top-box" style="font-size: 0.14rem;line-height: 0.4rem;font-weight: 700">

                  <div class="left-info">
                    <span class="time" v-if="item.status===0" style="text-decoration:line-through">{{item.date}}</span>
                    <span class="time" v-else>{{item.date}}</span>
                  </div>
                </div>

                <div class="reply-list">


                  <template v-if="!isEmpty(item.safflowerNum)">
                    <div v-if="item.type===1" class="Upnumber">
                      <i class="icon iconfont icon-honghua"></i>&nbsp;
                      <span v-if="item.status===0" style="text-decoration:line-through">奖励{{item.safflowerNum}}朵</span>
                      <span v-else >奖励{{item.safflowerNum}}朵</span>
                    </div>
                    <div v-else class="Upnumber" style="    color: #D80000; ">
                      <i class="icon iconfont icon-honghua"></i>&nbsp;
                      <span v-if="item.status===0"  style="text-decoration:line-through">减少{{item.safflowerNum}}朵</span>
                      <span v-else>减少{{item.safflowerNum}}朵</span>
                    </div>
                  </template>


                  <div class="section-box">
                    <span class="comm-person" v-if="item.schoolmaster===1"></span>
                    <span class="text-shcool" v-if="item.schoolmaster===1">培训班</span>
                    <div class="summary">
                      <span class="flower-total-w" v-if="item.type === '1'">
                        <i class="font-io"><van-icon name="setting" /></i>
                        <span v-if="item.status===0" style="text-decoration:line-through">奖励 {{item.safflowerNum}} 朵</span>
                        <span v-else >奖励{{item.safflowerNum}}朵</span>
                      </span>
                      <span class="flower-total-d" v-if="item.type === '2'">
                        <i class="font-io"><van-icon name="warning-o" /></i>
                        <span v-if="item.status===0" style="text-decoration:line-through">扣除 {{item.safflowerNum}} 朵</span>
                        <span v-else >扣除 {{item.safflowerNum}} 朵</span>
                      </span>
                    </div>

                    <div style="font-size: 0.14rem;color: #999;">
                      <div>
                        表现：{{item.discipline}}
                      </div>

                      <div v-if="item.comment.categorys.category">
                        {{item.comment.categorys.category}}：{{item.comment.categorys.list[0]}}
                      </div>

                      <div>
                        点评：{{item.comment.content}}
                      </div>
                    </div>

                    <div class="operate-obj" >
                      <span class="time">
                                <span v-if="item.status===0" style="text-decoration:line-through"> {{item.date}}</span>
                                <span v-else > {{item.date}}</span>
                      </span>
                      <span class="name">
                                <span v-if="item.status===0" style="text-decoration:line-through"> {{item.ismyself===1?'由我奖励':item.rewarderName}}</span>
                                <span v-else > {{item.ismyself===1?'由我奖励':item.rewarderName}}</span>
                        </span>
                    </div>
                  </div>

                </div>
              </div>

              </div>
            </van-list>

          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import { NavBar, Icon, Tab, Tabs,Field,Actionsheet,Toast,List,ImagePreview } from "vant";
  /*import SchooleRoleApi from '../api/school-role-api'*/
  import echarts from 'echarts'
  import { studentGrowthAnay, monthEchartsAnay, waitReplyList } from '@/api/school/safflower'
  export default {
    name: "archives-detail",
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [Field .name]:Field,
      [Actionsheet.name]:Actionsheet,
      [Toast.name]:Toast,
      [List.name]:List,
    },
    data(){
      return{
        loading:false,
        finished:false,
        stuId:this.$route.query.id,
        basic:{},
        awardNum:0,//月份奖励红花数量
        deductNum:0,//月份扣除红花数量
        month:[],
        active:0,
        page:1,
        detailList:[],
        assessment:'',
        histogramWidth:{},
        dates:'',
        awd:'',
        dwd:''
      }
    },
    methods:{
      onClickLeft() {
        this.$router.back(-1);
      },
      prev(){
        if (this.active !== this.month.length - 1) {
          this.active = this.active + 1;
          this.monthChartData(this.month[this.active].ySty)
        }
      },
      next(){
        if (this.active !== 0) {
          this.active = this.active - 1;
          this.monthChartData(this.month[this.active].ySty)
        }
      },
      studentGrowth(){
        this.$loading();
        studentGrowthAnay(this.stuId)
                .then(res=>{
                  this.$loadingHide();
                  if (res.status === 200) {
                    let d = res.data.data;
                    this.basic = d;
                    let ay = d.radarChart;
                    let indicator = [];
                    let value = [];
                    for (let i = 0; i < ay.name.length; i++) {
                      indicator.push({
                        /*text:`${ay.name[i]}${ay.percentage[i]}`,
                        max:100,*/
                        value:parseFloat(ay.percentage[i].slice(0,-1)),
                        name:ay.name[i]
                      });
                      value.push(ay.name[i])
                    }
                    this.drawEchart(indicator, value);
                    this.assessment = ay.assessment;
                    this.deductNum = d.monthChart.deduct_num;
                    this.awardNum = d.monthChart.award_num;
                    let date = [];
                    let aNum = [];
                    let dNum = [];
                    date=d.monthChart.award.date;
                    aNum=d.monthChart.award.num;
                    dNum=d.monthChart.deduct.num;
                    this.drawLine(date,aNum,dNum);
                  }
                }).catch(()=>{
          throw new Error('页面数据获取异常！')
        })
      },
      drawEchart(indicator, value){
        let echartSheet = this.echarts.init(
                document.getElementById("echart-sheet")
        );

        let radarMaxValue = indicator.reduce((last, item) => {
          return last > item.value ? last : item.value
        }, 1)
        console.log(indicator, value, radarMaxValue)
        let radarIndicator = indicator.map(item => ({
          name: `${item.name}\n${item.value}%`,
          max: radarMaxValue
        }))
        let radarData = indicator.map(item => item.value)
        echartSheet.setOption({
          /*tooltip: {
            trigger: "axis"
          },
          radar: [
            {
              indicator: indicator,
              radius: 50,
              center: ["50%", "70%"],
              nameGap:1,
              name:{
                formatter: (text) => {
                  text = text.replace(/\S{3}/g, function(match) {
                    //console.log(match)
                    return match + '\n'
                  })
                  return text
                },
              },
              //shape:'circle',
             // splitNumber:10
              splitArea : {
                show : true,
                areaStyle : {
                  color: ['#3770FB', '#7BA2FF','#99c736', '#75813b', '#7AA1FF',]
                  // 图表背景网格的颜色
                }
              },
            }
          ],
          series: [
            {
              type: "radar",
              radarIndex: 0,
              data: [{
                value: value,
                name: '学生成长分析',
                itemStyle: {
                  normal: {
                    color: '#E5CB9C',
                    lineStyle: {
                      color: '#E5CB9C',
                    },
                  },
                },
              }]
            }
          ]*/
          calculable: false,
          title: {
            show:false,
            text: '习惯分析',
            x: 'center',
            textStyle: {
              "color": "#dedede"
            },
          },
          legend: {
            show:false,
            right: 0,
            top: 10,
            orient: 'vertical',
            data: value,
            textStyle: { //图例文字的样式
              color: '#8ECBFF',
              fontSize: 13
            }
          },
          color:["#F4AA61","#4EC7B8","#90C9F6","#CACACB"],
          radar: {
            radius: '50%',
            center: ["50%", "50%"],
            nameGap:4,
            // splitNumber:10
            // splitArea : {
            //   show : true,
            //   areaStyle : {
            //     color: ['#3770FB', '#7BA2FF','#99c736', '#75813b', '#7AA1FF',]
            //     // 图表背景网格的颜色
            //   }
            // },
            name: {
              position: 'inner',
              textStyle: {
                color: '#666',
                // backgroundColor: '#999',
                // borderRadius: 3,
                // padding: [3, 5]
              },
              formatter: (text) => {
                // text = text.replace(/\S{4}/g, function(match) {
                //   return match + '\n'
                // })
                return text
              },
            },
            indicator: radarIndicator,
          },
          series: [
            {
              type: 'radar',
              data: [
                {
                  value: radarData
                }
              ],
            }
          ],
          series1: [{
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            minAngle: 10,  // 设置每块扇形的最小占比
            labelLine:{
              normal:{
                smooth: 0.2,
                length:10,
                length2:10
              }
            },
            label: { //饼图图形上的文本标签
              normal: {
                position: 'inner',
                show: true,
                textStyle: {
                  fontWeight: 700,
                  fontSize: 13 //文字的字体大小
                },
                formatter: function(val){   //让series 中的文字进行换行
                  return val.name.substr(0,3)+'\n'+val.name.substr(3)+val.percent+'%';
                },
              }
            },
            data: indicator,

          }]
        });
      },
      drawLine(date,aNum,dNum){
        // if (this.dates !== date.toString() || this.awd !== aNum.toString() || this.dwd !== dNum.toString()){
        //   let echartLine = this.echarts.init(
        //           document.getElementById("light")
        //   )
          var Lflower = echarts.init(document.getElementById('light'));

          var optionse ={

            grid: {
              top:'18%',
              bottom:'18%',
              right: '15%',  //距离右侧边距
            },
            title: {
              text: '',
            },
            tooltip: {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              textStyle:{
                fontSize:12,
                color:'#fff'
              },
              data:['']
            },
            //                    取消Y轴刻度值
            xAxis: {
              name:'日期',
              splitLine:{
                show:false
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#BFBFBF',//左边线的颜色
                  width:'1'//坐标线的宽度
                }
              },
              axisLabel:{
                formatter: function(params) {
                  var newParamsName = '';// 最终拼接成的字符串
                  var paramsNameNumber = params.length;// 实际标签的个数
                  var provideNumber = 2;// 每行能显示的字的个数
                  // var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                  if (paramsNameNumber > provideNumber) {

                    for (var p = 0; p <2; p++) {
                      var tempStr = '';// 表示每一次截取的字符串
                      var start = p * (provideNumber );// 开始截取的位置
                      var end = start + provideNumber;// 结束截取的位置
                      // 此处特殊处理最后一行的索引值
                      if (p == 2 - 1 ) {
                        // 最后一次不换行
                        tempStr = params.substring(start, paramsNameNumber);
                      } else {
                        // 每一次拼接字符串并换行
                        tempStr = params.substring(start, end) + '\n';
                      }
                      newParamsName += tempStr;// 最终拼成的字符串
                    }
                  } else {
                    // 将旧标签的值赋给新标签
                    newParamsName = params;
                  }
                  //将最终的字符串返回
                  return newParamsName
                },
                textStyle:{
                  fontSize:12 // 让字体变小
                }
              },
              data:date
            },
            yAxis: {
              name:'朵数',
              splitLine :{
                lineStyle:{
                  type:'dashed'
                }
              },
              axisLabel: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#BFBFBF',//左边线的颜色
                  width:'1'//坐标线的宽度
                }
              },
            },
            series: [
              {
                name: '奖励朵数',
                type: 'bar',
                barGap: 0,
                barCategoryGap:'30%',
                data: aNum,
                color: ['#0099FF'],
                // data: likevalue,
                itemStyle : {
                  normal: {
                    show: true,
                    position: 'outside',
                    textStyle: {
                      color: '#bb0004'
                    },
                    label: {
                      show: true, //开启显示
                      position: 'top', //在上方显示
                      textStyle: { //数值样式
                        color: '#0099FF',
                        fontSize: 12
                      }
                    }
                  }
                },
                // barWidth :18
              }
              , {
                name: '扣除朵数',
                color:['#FF6666'],
                barCategoryGap:'30%',
                type: 'bar',
                data: dNum,
                // data: likevalue,
                itemStyle : {
                  normal : {
                    label: {
                      show: true, //开启显示
                      position: 'top', //在上方显示
                      textStyle: { //数值样式
                        color: '#FF6666',
                        fontSize: 12
                      }
                    }
                  },
                },
                // barWidth : 18
              }
            ],
            dataZoom: [//给x轴设置滚动条
              //下面这个属性是里面拖到
              {
                type: 'inside',
                show: true,
                xAxisIndex: [0],
                startValue:0,
                endValue:6
              },
            ],
                  };

          Lflower.setOption(optionse);
      },
      monthfun(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let arr = [];
        for (let i = year; i >= 2015; i--) {
          if (i === year) {
            for (let v = month; v >= 1; v--) {
              arr.push({
                mSty:`${year}年${v}月`,
                ySty:`${year}-${v}`
              })
            }
          }else {
            for (let v = 12; v >= 1; v--) {
              arr.push({
                mSty:`${i}年${v}月`,
                ySty:`${i}-${v}`
              })
            }
          }
        }
        // console.log(arr)
        this.month=arr
      },
      //月份图表分析
      monthChartData(date){
        monthEchartsAnay(this.stuId,date)
                .then(res=>{
                  if (res.status === 200) {
                    let d = res.data.data;
                    this.deductNum = d.deduct_num;
                    this.awardNum = d.award_num;
                    let date = [];
                    let aNum = [];
                    let dNum = [];
                    date=d.award.date;
                    aNum=d.award.num;
                    dNum=d.deduct.num;
                    this.drawLine(date,aNum,dNum);
                  }
                }).catch(()=>{
          throw new Error("柱形图数据获取异常！")
        })
      },
      onLoad(){
        waitReplyList(this.stuId,this.page)
                .then(res=>{
                  if (res.status === 200) {
                    let d = res.data.data;
                    // for (let item of d){
                    //
                    // }
                    this.detailList.push.apply(this.detailList, d);
                    this.loading = false;

                    if (d.length >= 10) {

                      this.finished = false;
                      this.page = this.page + 1;
                    }else {
                      //this.loading = false;
                      this.finished = true;
                    }

                  }
                }).catch(()=>{
          throw new Error("异常！")
        })
      },
      //图片预览
      preview(imgArr, index) {
        ImagePreview({
          images: imgArr,
          startPosition: index ? index : 0,
          lazyLoad: false
        });
      },
    },
    created() {
      this.studentGrowth();
      this.monthfun();
    }
  }
</script>

<style scoped lang="less">
  #archives-detail{
    font-size: 0;
    background-color: #fff;
    /*position: relative;*/
    .go-back {
      .van-nav-bar {
        background-color: #3770fb;
        .van-icon {
          font-size: 0.22rem;
          color: #fff;
        }
        .van-nav-bar__text {
          font-size: 0.16rem;
          line-height: 0.22rem;
          color: #fff;
          font-weight: 400;
        }
        .van-nav-bar__title {
          color: #fff;
          font-weight: 400;
        }
      }
    }
    .content{
      padding: 0.14rem 0.16rem ;
      /deep/ .van-tabs__nav.van-tabs__nav--card{
        margin: 0;
      }
      .growth-analysis{
        .basic-info{
          width: 100%;
          padding: 0.16rem 0;
          margin-bottom: 0.1rem;
          overflow: hidden;
          .student-info{
            float: left;
            width: 1.41rem;
            padding-left: 0.15rem;
            border-right: 1px solid #eee;
            box-sizing: border-box;
            .img-info{
              padding: 0.04rem 0;
              box-sizing: border-box;
              overflow: hidden;
              .awator{
                width: 0.3rem;
                height: 0.3rem;
                border-radius: 50%;
                float: left;
                overflow: hidden;
                img{
                  width: 100%;
                  height: 100%;
                  float: left;
                }
              }
              .name{
                float: left;
                font-size: 0.14rem;
                color: #666;
                margin-left: 0.08rem;
                line-height: 0.3rem;
              }
            }
            .total{
              margin-top: 0.16rem;
              .flower{
                display: block;
                font-size: 0.14rem;
                color: #666;
                line-height: 0.2rem;
                .cr{
                  color: #84C225;
                }
              }
              .more-than{
                font-size: 0.12rem;
                color: #999;
                line-height: 0.18rem;
              }
            }
            .rank{
              margin-top: 0.16rem;
              padding-bottom: 0.08rem;
              .view-btn{
                display: inline-block;
                width: 1rem;
                font-size: 0.12rem;
                color: #3770fb;
                height: 0.24rem;
                line-height: 0.22rem;
                text-align: center;
                border: 1px solid #3770FB;
                border-radius: 0.05rem;
                box-sizing: border-box;
              }
            }
          }
          .info-chart {
            float: left;
            width: 2rem;
            font-size: 0.12rem;
            /*height: 1.88rem;*/
            color: #999;
            p {
              line-height: 0.48rem;
              color: #666;
              font-size: 0.16rem;
              text-align: center;
            }
          }
        }
        .mounth-flower{
          .line-ecahert{
            width: 100%;
            font-size: 0.12rem;
            overflow: hidden;
            .title{
              text-align: center;
              line-height: 0.3rem;
              font-size: 0.12rem;
              .reward{
                margin-right: 0.2rem;
                .box-icon{
                  background-color: #3770FB;
                }
              }
              .punishment{
                .box-icon{
                  background-color: #D80000;
                }
              }
              .box-icon{
                font-style: normal;
                display: inline-block;
                width: 0.1rem;
                height: 0.1rem;
                margin-right: 0.05rem;
              }
            }
            .summary{
              font-size: 0.14rem;
              color: #666;
              .name{
                margin-right: 0.15rem;
              }
              .reward{
                .num{
                  color: #3770FB;
                }
              }
              .deduct{
                margin-left: 0.3rem;
                .num{
                  color: #D80000;
                }
              }
            }
          }
          .month-tab{
            line-height: 0.48rem;
            border-bottom: 1px solid #eee;
            text-align: center;
            .month{
              display: inline-block;
              font-size: 0.14rem;
              color: #666;
            }
            .month-content{
              width: 1rem;
              margin-right: 0.35rem;
              margin-left: 0.35rem;
            }
          }
        }
      }
      .wait-reply{
        width: 100%;
        padding: 0 0  0.16rem 0;
        margin-top: 0.16rem;
        box-sizing: border-box;
        .reply-list{
          width: 100%;
          margin-bottom: 0.1rem;
          background-color: #efefef;
          padding: 0.16rem;
          position: relative;
          box-sizing: border-box;
          .top-box{
            overflow: hidden;
            line-height: 0.2rem;
            margin-bottom: 0.1rem;
            /*margin-top: 0.16rem;*/
            .left-info{
              float: left;
              font-size: 0.14rem;
              color: #666;
              font-weight: 500;
              .name{
                margin-right: 0.16rem;
              }
            }
            .right-info{
              float: right;
              font-size: 0.14rem;
              color: #999;
            }
          }
          .section-box{
            .comm-person{
              /*float: right;*/
              position: absolute;
              top: 0;
              right: 0;
              width: 0;
              height: 0;
              border-color: #3770fb transparent;
              border-width: 0.58rem 0 0 0.58rem;
              border-style: solid;
            }
            .text-shcool{
              position: absolute;
              top: 0;
              right: 0;
              display: inline-block;
              color: #fff;
              font-size: 0.12rem;
              width: 0.26rem;
            }
            .summary{
              font-size: 0.14rem;
              line-height: 0.2rem;
              margin-bottom: 0.1rem;
              overflow: hidden;
              .flower-total-d,.flower-total-w{
                float: left;
                .font-io{
                  font-size: 0.16rem;
                  margin-right: 0.12rem;
                  position: relative;
                  top: 0.03rem;
                }
              }
              .flower-total-d{
                color: #D80000;
              }
              .flower-total-w{
                color: #3770fb;
              }
            }
            .score-detail{
              margin-bottom: 0.1rem;
              .items{
                font-size: 0.14rem;
                line-height: 0.2rem;
                color: #999;
                .cmst{
                  overflow: hidden;
                  .title{
                    float: left;
                    margin-right: 0.2rem;
                  }
                  .cms-dea{
                    float: left;
                    .text{
                      margin-right: 0.1rem;
                    }
                  }
                }
                .score-d{
                  color: #D80000;
                  /* margin-right: 0.08rem;*/
                }
                .score-w{
                  color: #3770fb;
                  /*margin-right: 0.08rem;*/
                }
              }
            }
            .img-list{
              width: 100%;
              overflow: hidden;
              /*margin-left: 0.18rem;*/
              margin-bottom: 0.1rem;
              .img-tab{
                float: left;
                width: 0.7rem;
                height: 0.7rem;
                margin-left: 0.12rem;
                margin-bottom: 0.12rem;
                img{
                  float: left;
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .operate-obj{
              font-size: 0.12rem;
              color: #666;
              line-height: 0.18rem;
              margin-top: 0.1rem;
              .time{
                margin-right: 0.1rem;
              }
            }
          }
          .comment-area{
            .comment-list{
              padding: 0.05rem 0;
              .comment-box{
                font-size: 0.14rem;
                line-height: 0.2rem;
                .name{
                  color: #3770fb;
                }
                .comment-content{
                  color: #999;
                }
              }
              .time-box{
                font-size: 0.12rem;
                color: #999;
                line-height: 0.18rem;
                text-align: right;
              }
            }
          }
          .reply-btn{
            display: flex;
            font-size: 0.14rem;
            height: 0.4rem;
            padding: 0.08rem 0;
            text-align: center;
            color: #fff;
            background-color: #53ACF8;
            box-sizing: border-box;
            .btn{
              flex: 1;
            }
            .simple-reply{
              border-right: 1px solid #fff;
            }
          }
        }
      }
    }
  }
  .exchange_text{
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: #999;
    margin-bottom: 0.12rem;
  }
  .Upnumber{
    color: #3770fb;
    font-size: 0.14rem;
    line-height: 0.2rem;
  }
</style>

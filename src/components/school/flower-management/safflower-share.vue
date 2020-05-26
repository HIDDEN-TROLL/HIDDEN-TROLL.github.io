<template>
  <div id="safflower-share">
    <!--考勤关联学生-->
    <div class="go-back">
      <van-nav-bar title="我的成长值" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="share-content" ref="imageTofile">
      <div class="user-info">
        <van-row>
          <van-col span="4">
            <div class="user-info-img">
              <img src="../../../assets/img/parents/index/banner2.png" alt>
            </div>
          </van-col>
          <van-col span="4">{{name}}</van-col>
          <van-col span="16">
            共获得红花奖励
            <span>{{flowerTotal}}</span>朵
          </van-col>
        </van-row>
      </div>
      <div class="echarts-content">
        <div class="echart-sheet" id="echart-sheet" :style="{width: '3.43rem', height: '2.8rem'}"></div>
        <p>{{assessment}}</p>
      </div>
      <div class="echarts-bar-simple">
        <!--<div class="echarts-simple-title">近七天红花获奖情况</div>-->
        <div class="share-flower-type">
          <van-radio-group v-model="radiod" @change="share(1)">
            <div class="radio-box">
              <van-radio name="1" clickable >分享近7天</van-radio>
            </div>
            <div class="radio-box">
              <van-radio name="2" clickable >分享本月</van-radio>
            </div>
            <div class="radio-box">
              <van-radio name="3" clickable >分享上月</van-radio>
            </div>
          </van-radio-group>
        </div>
        <div class="hide-scroll" :style="{height:'2.3rem',overflow:'hidden'}">
          <div class="hiden-box" :style="{width: '3.43rem',overflowX:'scroll',height:'2.45rem'}">
            <div class="echarts-simple" id="echarts-simple" :style="{ height: '2.3rem'}"></div>
          </div>
        </div>
      </div>
      <div class="today-score">
        <!--<div class="today-score-title">今日的评分和评语</div>-->
        <div class="share-flower-type">
          <van-radio-group v-model="comRadio" @change="share(2)">
            <van-radio name="1">分享今日</van-radio>
            <van-radio name="2">分享近7天</van-radio>
          </van-radio-group>
        </div>
        <div class="today-score-content">
          <div v-for="(item,index) in safflowerRecord" :key="index">
            <div class="safflower-sum">
              <img src="../../../assets/img/schoolRole/safflower@2x.png" alt> 奖励{{item.worth}}朵
            </div>
            <ul>
              <li>
                <span v-for="(val,idx) in item.comment" :key="idx"><span>+{{val.worth}}</span> {{val.content}}（{{val.category}}）</span>
                <van-row gutter="1">
                  <van-col span="8" v-for="(val,idx) in item.imgurl" :key="idx" @click="preview(item.imgurl, idx)">
                    <img :src="val" alt>
                  </van-col>
                </van-row>
              </li>
            </ul>
            <div class="school-status">
              <span>{{item.date}} {{item.time}}</span>
              <span>{{item.rewarder}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="school-about" v-if="JSON.stringify(website)!=='{}'">
        <van-row>
          <van-col span="8">
            <img :src="website.propagandaImgurl" alt>
          </van-col>
          <van-col span="16">
            <div>
              <h2>{{website.schoolName}}</h2>
              <p>{{website.propaganda}}</p>
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="8">
            <img :src="website.websiteQr" alt>
          </van-col>
          <van-col span="16">
            <div>
              <h2>扫二维码查看美育家教园官网</h2>
              <h2>技术支持：新师路教育科技</h2>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="footer-btn">
      <van-button type="primary" block size="small" @click="toImage">分享</van-button>
    </div>
    <!--<img :src="canvasImg" alt="">-->
    <!--<div class="canvas-page" style="display: none">
      <div class="user-info">
        <van-row>
          <van-col span="4">
            <div class="user-info-img">
              <img src="../../../assets/img/parents/index/banner2.png" alt>
            </div>
          </van-col>
          <van-col span="4">周小东</van-col>
          <van-col span="16">
            共获得红花奖励
            <span>199</span>朵
          </van-col>
        </van-row>
      </div>
      <div class="echarts-content">
        <div class="echart-sheet" id="canvas-echart-sheet" :style="{width: '3.43rem', height: '2.8rem'}"></div>
        <p>天赋异禀天资卓越</p>
      </div>
      <div class="echarts-bar-simple">
        <div class="echarts-simple-title">近七天红花获奖情况</div>
        <div class="echarts-simple" id="canvas-echarts-simple" :style="{width: '3.43rem', height: '2.3rem'}"></div>
      </div>
      <div class="today-score">
        <div class="today-score-title">今日的评分和评语</div>
        <div class="today-score-content">
          <div class="safflower-sum">
            <img src="../../../assets/img/schoolRole/safflower@2x.png" alt> 奖励16朵
          </div>
          <ul>
            <li>
              <span>+11</span> 这个画得非常棒啊（审美）
              <van-row gutter="1">
                <van-col span="8">
                  <img src="../../../assets/img/schoolRole/attendance_statistics_banner@2x.png" alt>
                </van-col>
                <van-col span="8">
                  <img src="../../../assets/img/schoolRole/attendance_statistics_banner@2x.png" alt>
                </van-col>
                <van-col span="8">
                  <img src="../../../assets/img/schoolRole/attendance_statistics_banner@2x.png" alt>
                </van-col>
              </van-row>
            </li>
            <li>
              <span>+5</span> 今天帮老师扫地（德育）
            </li>
            <li>
              <span>+7</span> 体育运动身体棒棒的（体育）
            </li>
          </ul>
          <div class="school-status">
            <span>2019.3.9 15:00</span>
            <span>美育家教园-东厦校区</span>
          </div>
        </div>
      </div>
      <div class="school-about">
        <van-row>
          <van-col span="8">
            <img src="../../../assets/img/schoolRole/attendance_statistics_banner@2x.png" alt>
          </van-col>
          <van-col span="16">
            <div>
              <h2>美育家教园-东厦校区</h2>
              <p>美育家教简介：公司拥有来自教育一线十多年的校长、教育技术研发近十年。</p>
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="8">
            <img src="../../../assets/img/schoolRole/attendance_statistics_banner@2x.png" alt>
          </van-col>
          <van-col span="16">
            <div>
              <h2>扫二维码查看美育家教园官网</h2>
              <h2>技术支持：新师路教育科技</h2>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>-->
  </div>
</template>

<script>
import { NavBar, Icon, Button, Row, Col,RadioGroup, Radio,ImagePreview,Toast } from "vant";
import { studentsShareD, operateShareD, wxJssdk } from '@/api/school/safflower'
import html2canvas from 'html2canvas'
import wx from 'weixin-js-sdk'
export default {
  name: "safflower-share",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio,
    [Toast.name]:Toast,
    html2canvas:html2canvas
  },
  data() {
    return {
      radiod:'1',//分享柱状图
      comRadio:'1',//分享评语
      flowerTotal:'',//总红花数
      name:'',//名字
      assessment:'',
      safflowerRecord:[],//评语
      website:{},
      canvasImg:'',
      signature:{}//保存分享朋友圈的微信签名信息
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    drawEchart(indicator, value){
      let echartSheet = this.echarts.init(
        document.getElementById("echart-sheet")
      );

      echartSheet.setOption({
        tooltip: {
          trigger: "axis"
        },
        radar: [
          {
            indicator: indicator,
            radius: 80,
            center: ["50%", "50%"],
            nameGap:15,
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
        ]
      });
    },
    drawLine(xData, vData) {
      // 基于准备好的dom，初始化echarts实例
      let echartsSimple = this.echarts.init(
        document.getElementById("echarts-simple")
      );
      // 绘制图表
      echartsSimple.setOption({
        tooltip : {
          trigger: 'none'
        },
        grid:{
          left: '20',
          right:'40',
          // top:'4%',
        },
        calculable : true,
        xAxis: {
          show:true,                  //---是否显示
          position:'bottom',          //---x轴位置
          offset:0,                   //---x轴相对于默认位置的偏移
          type:'category',            //---轴类型，默认'category'
          name:'日期',              //---轴名称
          nameLocation:'end',         //---轴名称相对位置
          nameTextStyle:{             //---坐标轴名称样式
            color:"#999",
            padding:[5,0,0,-5], //---坐标轴名称相对位置
          },
          nameGap:15,                 //---坐标轴名称与轴线之间的距离
          //nameRotate:270,           //---坐标轴名字旋转

          axisLine:{                  //---坐标轴 轴线
            show:true,                  //---是否显示

            //------------------- 箭头 -------------------------
            symbol:['none'],   //---是否显示轴线箭头

            //------------------- 线 -------------------------
            lineStyle:{
              color:'#999',
              width:1,
              type:'solid',
            },
          },
          axisTick:{                  //---坐标轴 刻度
            show:true,                  //---是否显示
            inside:true,                //---是否朝内
            lengt:3,                    //---长度
            lineStyle:{
              //color:'red',          //---默认取轴线的颜色
              width:1,
              type:'solid',
            },
          },
          axisLabel:{                 //---坐标轴 标签
            show:true,                  //---是否显示
            inside:false,               //---是否朝内
            rotate:0,                   //---旋转角度
            margin: 5,                  //---刻度标签与轴线之间的距离
            //color:'red',              //---默认取轴线的颜色
          },
          splitLine:{                 //---grid 区域中的分隔线
            show:false,                 //---是否显示，'category'类目轴不显示，此时我的X轴为类目轴，splitLine属性是无意义的
            lineStyle:{
              //color:'red',
              //width:1,
              //type:'solid',
            },
          },
          splitArea:{                 //--网格区域
            show:false,                 //---是否显示，默认false
          },
          data: xData,//内容
        },

        //----------------------  y轴  ------------------------
        yAxis: {
          show:true,                  //---是否显示
          position:'left',            //---y轴位置
          offset:0,                   //---y轴相对于默认位置的偏移
          type:'value',           //---轴类型，默认'category'
          name:'朵数',              //---轴名称
          nameLocation:'end',         //---轴名称相对位置value
          nameTextStyle:{             //---坐标轴名称样式
            color:"#999",
            padding:[5,0,0,5],  //---坐标轴名称相对位置
          },
          nameGap:15,                 //---坐标轴名称与轴线之间的距离
          //nameRotate:270,           //---坐标轴名字旋转

          axisLine:{                  //---坐标轴 轴线
            show:true,                  //---是否显示

            //------------------- 箭头 -------------------------
            symbol:['none'],   //---是否显示轴线箭头

            //------------------- 线 -------------------------
            lineStyle:{
              color:'#999',
              width:1,
              type:'solid',
            },
          },
          axisTick:{                  //---坐标轴 刻度
            show:false,                  //---是否显示
            inside:true,                //---是否朝内
            lengt:3,                    //---长度
            lineStyle:{
              //color:'red',          //---默认取轴线的颜色
              width:1,
              type:'solid',
            },
          },
          axisLabel:{                 //---坐标轴 标签
            show:false,                  //---是否显示
            inside:false,               //---是否朝内
            rotate:0,                   //---旋转角度
            margin: 8,                  //---刻度标签与轴线之间的距离
            //color:'red',              //---默认取轴线的颜色
          },
          splitLine:{                 //---grid 区域中的分隔线
            show:false,                  //---是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
            lineStyle:{
              color:'#666',
              width:1,
              type:'solid',          //---类型
            },
          },
          splitArea:{                 //--网格区域
            show:false,                 //---是否显示，默认false
          }
        },
        series: [
          {
            name: "日期",
            type: "bar",
            itemStyle:{                 //---图形形状
              normal: {
                color:'#D80000',
                label: {
                  show: true,		//开启显示
                  position: 'top',	//在上方显示
                  textStyle: {	    //数值样式
                    color: '#D80000',
                    fontSize: 12
                  }
                }
              }
            },
            data: vData
          }
        ]
      });
      const autoWeight = xData.length * 0.5 < 3.43 ? 3.43 : xData.length * 0.5;
      echartsSimple.getDom().style.width = autoWeight +'rem';
      echartsSimple.getDom().childNodes[0].style.width = autoWeight +'rem';
      echartsSimple.getDom().childNodes[0].childNodes[0].setAttribute("width",autoWeight);
      echartsSimple.getDom().childNodes[0].childNodes[0].style.width = autoWeight +'rem' ;
      echartsSimple.getDom().style.height = '2.3rem';
      echartsSimple.getDom().childNodes[0].style.height = '2.3rem';
      echartsSimple.getDom().childNodes[0].childNodes[0].setAttribute("height",'2.3rem');
      echartsSimple.getDom().childNodes[0].childNodes[0].style.height = '2.3rem';
      echartsSimple.resize();

    },
    selectShare(){
      this.$loading();
      studentsShareD()
        .then(res=>{
          this.$loadingHide();
          if (res.status === 200){
            let d = res.data.data;
            this.name = d.studentInfo.studentName;
            this.flowerTotal = d.studentInfo.safflowerNum;
            let radar = d.studentInfo.radarChart;
            this.assessment = radar.assessment;
            let indicator = [];
            let value = [];
            for (let i = 0; i < radar.name.length; i++) {
              indicator.push({
                text:`${radar.name[i]}${radar.percentage[i]}`,
                max:100
              });
              value.push(parseFloat(radar.percentage[i].slice(0,-1)))
            }
            this.drawEchart(indicator, value);
            //barSafflowerChart
            let date = (d.barSafflowerChart.date).map(item=>{
              return item+''
            });
            let aNum = d.barSafflowerChart.num;
            //console.log(date);
            this.drawLine(date, aNum);
            //评分评语
            this.safflowerRecord = d.safflowerRecord;
            // 微官网宣传
            if (d.website){
              if (Array.isArray(d.website)){
                this.website = Object.assign({},d.website)
              }else {
                this.website = d.website;
              }
            }

          }
      }).catch(()=>{
        throw new Error("异常！")
      })
    },
    /**
     * 分享数据
     * @param type 1 分享红花柱状图 2 分享评语
     */
    share(type){
      /*console.log(type);
      console.log(this.radiod+'...........'+ typeof this.radiod)*/
      let data = {};
      if (type === 1){
        if (this.radiod === '1'){
          data = {
            type:'chare',
            safflowerChare:'7'
          }
        }
        else if (this.radiod === '2'){
          data = {
            type:'chare',
            safflowerChare:'month'
          }
        }
        else if (this.radiod === '3'){
          data = {
            type:'chare',
            safflowerChare:'lastMonth'
          }
        }
      }else if (type === 2){
        if (this.comRadio === '1'){
          data = {
            type:'recode',
            safflowerRecode:'day'
          }
        }
        else if (this.comRadio === '2'){
          data = {
            type:'recode',
            safflowerRecode:'7'
          }
        }
      }
      operateShareD(data)
        .then(res=>{
          if (res.status === 200){
            let d = res.data.data;
            if (type === 1){
              let date = (d.chare.date).map(item=>{
                return item+''
              });
              let aNum = d.chare.num;
              //console.log(date);
              this.drawLine(date, aNum)
            }else if (type === 2){
              this.safflowerRecord = d.recode
            }
            // 微官网宣传
            //this.website = d.website;
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
    // 页面元素转图片
    toImage () {
      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      html2canvas(this.$refs.imageTofile, {
        backgroundColor: null
      }).then((canvas) => {
        let url = canvas.toDataURL('image/png');
        this.canvasImg = url;
        this.getSignature();
      })
    },
    //获取wx签名
    getSignature(){
      wxJssdk()
        .then(res=>{
        //console.log(res);
        if (res.status === 200){
          this.signature = res.data.data;
          this.wxConfig(this.canvasImg)
        }
      }).catch(()=>{
        throw new Error("异常！")
      })
    },
    //分享朋友圈
    wxConfig(url){
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: this.signature.appId, // 必填，公众号的唯一标识
        timestamp:this.signature.timestamp , // 必填，生成签名的时间戳
        nonceStr: this.signature.nonceStr, // 必填，生成签名的随机串
        signature: this.signature.signature,// 必填，签名
        jsApiList: ['updateTimelineShareData'] // 必填，需要使用的JS接口列表
      });
      wx.updateTimelineShareData({
        title: '1111', // 分享标题
        link: 'app.api.top910.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: url, // 分享图标
        success: function () {
          // 设置成功
          Toast("成功")
        },
        cancel () {
          // 用户取消分享后执行的回调函数
        }
      });
      wx.error((res)=>{
        console.log(res)
      })
    },
  },
  created() {
    //alert(this.$route.params.id)
    this.selectShare();

  }
};
</script>

<style scoped lang="less">
#safflower-share {
  font-size: 0;
  background-color: #fff;
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
  .user-info {
    padding: 0.18rem 0.16rem;
    height: 0.78rem;
    line-height: 0.51rem;
    font-size: 0.16rem;
    text-align: center;
    border-bottom: 10px solid #ededed;
    .van-row {
      .van-col {
        .user-info-img {
          width: 0.51rem;
          height: 0.51rem;
          img {
            width: 0.51rem;
            height: 0.51rem;
            border-radius: 50%;
          }
        }
      }
      span {
        color: #84c225;
      }
    }
  }
  .echarts-content {
    font-size: 0.12rem;
    height: 3.4rem;
    color: #999;
    padding: 0 0.16rem;
    border-bottom: 10px solid #ededed;
    .echarts-sheet {
    }
    p {
      line-height: 0.48rem;
      color: #666;
      font-size: 0.16rem;
      text-align: center;
    }
  }
  .echarts-bar-simple {
    padding: 0.16rem 0.16rem 0;
    height: 2.7rem;
    font-size: 0.12rem;
    color: #999;
    border-bottom: 10px solid #ededed;
    .share-flower-type{
      .van-radio-group{
        display: flex;
        .radio-box{
          flex: 1;
          text-align: center;
        }
      }
    }
    .echarts-simple-title {
      padding-top: 0.08rem;
      line-height: 0.48rem;
      font-size: 0.16rem;
      text-align: center;
      color: #666;
      border-bottom: 1px solid #ededed;
    }
  }
  .today-score {
    font-size: 0.14rem;
    color: #999;
    padding: 0.16rem 0.16rem 0;
    padding-top: 0.1rem;
    border-bottom: 10px solid #ededed;
    .share-flower-type{
      .van-radio-group{
        display: flex;
        .van-radio{
          flex: 1;
          text-align: center;
        }
      }
    }
    .today-score-title {
      font-size: 0.16rem;
      color: #666;
      text-align: center;
      border-bottom: 1px solid #ededed;
      line-height: 0.48rem;
    }
    .today-score-content {
      padding-top: 0.1rem;
      .safflower-sum {
        line-height: 0.38rem;
        padding-left: 0.08rem;
        color: #d80000;
        img {
          width: 0.16rem;
          height: 0.16rem;
          line-height: 0.38rem;
          position: relative;
          top: 0.02rem;
        }
      }
      ul {
        padding: 0.08rem;
        li {
          line-height: 0.38rem;
          span {
            color: #d80000;
          }
          .van-row {
            padding: 0 0.2rem;
            .van-col {
              text-align: center;
              img {
                width: 0.72rem;
                height: 0.72rem;
              }
            }
          }
        }
      }
    }
    .school-status {
      border-top: 1px solid #ededed;
      line-height: 0.48rem;
      color: #666;
      text-align: center;
    }
  }
  .school-about {
    padding: 0.2rem 0.16rem;
    font-size: 0.14rem;
    .van-row {
      padding-top: 0.1rem;
      border-bottom: 1px solid #ededed;
      padding-bottom: 0.16rem;
      .van-col {
        img {
          width: 0.72rem;
          height: 0.72rem;
        }
      }
      .van-col {
        h2 {
          font-size: 0.14rem;
          color: #666;
          font-weight: normal;
        }
        p {
          font-size: 0.14rem;
          color: #999;
        }
      }
    }
    .van-row:last-child {
      border-bottom: 0;
      padding-top: 0.2rem;
      .van-col:last-child {
        padding: 0.2rem 0;
      }
    }
  }
}
</style>

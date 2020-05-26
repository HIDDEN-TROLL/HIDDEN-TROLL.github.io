<template>
    <div style="background-color: #F3F7F8;" id="student-homework-detail">
        <van-nav-bar
            :title="name"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="parents_unread">
            <van-row type="flex" justify="space-between">
                <van-col span="6" v-for="(item,index) in tasklist.readList" :key="index">{{item.relName}}{{item.isRead===0?'未阅':'已阅'}}</van-col>
            </van-row>
        </div>

        <div class="body"  >
            <div class="class_mes" v-for="(item, index) in tasklist.workList" :key="index" >
                <div class="subjects">
                    <div class="sub_date">
                        <span class="sub_title">{{item.subject.join('')}}</span>  <span class="time_list">{{item.date}}</span>
                    </div>
                    <div class="comment">
                        <div  v-for="(val, ind) in item.comment" :key="ind">
                            <span>{{val}}</span>
                        </div>
                    </div>
                </div>
                <div class="hr_b"></div>
                <div class="task">
                    <div >
                        <span >{{item.content}}</span><br>
                    </div>
                </div>
                <div class="parents_v_img_div">
                    <img class="parents_v_img "  :src="val"  v-for="(val, ind) in item.imgUrl"  :key="ind">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import { NavBar,Row, Col } from 'vant';
  import { detailInfo } from '@/api/teacher/homework'
  export default {
    name: "",
    components: {
      [NavBar.name]:NavBar,
      [Row.name]:Row,
      [Col.name]:Col,
    },
    data() {
      return {
        msg: "Hello Vue.js",
        tasklist:{
          workList:[],
          readList:[]
        },
        name:'',
      }
    },
    methods:{
      onClickLeft(){
        let date = new Date();
        let d = date.getFullYear() +"-"+ (date.getMonth()+1) +"-"+ date.getDate();
        if (this.$route.params.date && d === this.$route.params.date){
          this.$router.back(-1)
        }else {
          this.$router.push({
            name:'TeacherHomeworkHistory',
            params:{date:this.$route.params.date}
          })
        }

      },
      selectDetail(){
          this.$loading(undefined, undefined, true)
        detailInfo(this.$route.params.stuId,this.$route.params.date).then(res=>{
          //console.log(res);
            this.$loadingHide()
          if (res.status === 200){
            if (res.data.data){
              if (res.data.data.workList.length > 0){
                //let sub = [];
                for (let i of res.data.data.workList){
                  i.subject = i.subject.map(item=>{
                    return `#${item}`
                  });
                  /*   console.log(i.content)
                     i.www = i.content.split('/n')*/
                  /* let pos = i.content.indexOf("\n");
                   console.log(pos)*/
                }
              }
            }
            //console.log(res.data.data);
            this.tasklist = res.data.data;
          }
        }).catch(()=>{
          throw new Error("异常！")
        })
      }
    },
    created(){
      this.selectDetail();
      this.name = this.$route.params.name;
    }

  }
</script>

<style scoped lang="less">

    .van-nav-bar .van-icon ,.van-nav-bar__text{
        color: white;
    }
    .van-nav-bar{
        background-color:#3770FB ;
    }
    .van-nav-bar__title{
        color: white;
    }

    .parents_unread{
        text-align: center;
        line-height: 0.45rem;
        height: 0.45rem;
        background-color: white;
        font-size:0.14rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(216,0,0,1);
        /*line-height:0.2rem;*/
    }
    .body{
        margin-top: 0.1rem;
        background-color: white;
        font-family:PingFangSC-Regular;
        font-size: 0.14rem;
        /*margin: 0 0.2rem ;*/
    }
    .class_mes_div{
        margin-top: 0.1rem;
        width: 100%;
        background-color: white;
    }
    .class_mes{
        margin:0 0.2rem;
        /*width: 94%;*/
        background-color: white;
    }
    .hr_b{
        width: 100%;
        border-bottom: solid 1px #EEEEEE;
    }
    .subjects{

    }
    .comment{
        margin: 0.15rem 0;
    }
    .parents_v_img_div{
        margin-top: 0.15rem;
    }
    .parents_v_img{
        margin: 0 0.1rem 0.1rem 0;
        width: 0.9rem;
        height: 0.9rem;
    }


    /*文字样式*/
    .d_p_title{
        line-height: 0.55rem;
        /*margin: 0.2rem 0;*/
    }
    .d_p_title button{
        background-color: white;
        border: solid 1px #3770fb;
        width: 0.15rem;
        height: 0.14rem;
        position: relative;
        right: 0.28rem;
        color: white;
        border-radius: 100%;
    }
    .today{
        font-family:MicrosoftYaHei;
        color:rgba(55,112,251,1);
        line-height:19px;
    }
    .person{
        color:rgba(102,102,102,1);
        line-height:19px;
    }
    .sub_title{
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:20px;
    }
    .time_list{
        float: right;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.2rem;
    }
    .comment span{
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.2rem;
    }
    .task{
        margin-top: 0.15rem;
    }
    .task span{
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:0.2rem;
    }
    .sub_date{
        padding-top: 0.1rem;
    }
</style>


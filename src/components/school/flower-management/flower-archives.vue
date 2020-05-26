<template>
  <div id="flower-archives">
    <!--红花档案-->
    <div class="go-back">
      <van-nav-bar title="红花档案" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="archive-content">
<!--      <van-tabs type="card" title-active-color="#fff" color="#3770FB" title-inactive-color="#3770FB">-->
<!--        <van-tab title="待我回复">-->
<!--          <div class="wait-reply" v-if="replyList.length>0">-->
<!--            <div class="reply-list" v-for="(item,index) in replyList" :key="index">-->
<!--              <div class="top-box">-->
<!--                <div class="left-info">-->
<!--                  <span class="name">{{item.stuName}}</span>-->
<!--                  <span class="cls">{{item.gradeName}}</span>-->
<!--                </div>-->
<!--                <div class="right-info">-->
<!--                  <span class="time">{{item.date}}</span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="section-box">-->
<!--                <div class="summary">-->
<!--                  <span class="flower-total">-->
<!--                    <i class="font-io"><van-icon name="setting" /></i>-->
<!--                    {{item.type==1?'奖励':'扣除'}}{{item.safflowerNum}}朵-->
<!--                  </span>-->
<!--                  &lt;!&ndash;<span class="comm-person">22222</span>&ndash;&gt;-->
<!--                </div>-->
<!--                &lt;!&ndash;<div class="score-detail" v-for="(list, idx) in item.comment" :key="idx">&ndash;&gt;-->
<!--                &lt;!&ndash;<p class="items">&ndash;&gt;-->
<!--                &lt;!&ndash;<span class="score">{{item.type==1?'+':'-'}}{{list.worth}}</span>&ndash;&gt;-->
<!--                &lt;!&ndash;<span class="text">{{list.text}}({{list.category}})</span>&ndash;&gt;-->
<!--                &lt;!&ndash;</p>&ndash;&gt;-->
<!--                &lt;!&ndash;</div>&ndash;&gt;-->
<!--                <div class="detail" v-for="(item2,index2) in item.comment" :key="index2" >-->
<!--                  <div >-->
<!--                    <div class="com_left">[{{item2.name}}]：</div>-->
<!--                    <div v-for="(item3,index3) in item2.number" :key="index3" class="com_right">-->
<!--                      <span>{{item3.content}}</span>-->
<!--                      <span style="color: red;margin-left: 0.1rem" v-if="item.type==2">-{{item3.worth}}</span>-->
<!--                      <span style="color: #1890FF;margin-left: 0.1rem" v-if="item.type==1">+{{item3.worth}}</span>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="img-list">-->
<!--                  <div class="img-tab" v-for="(list,idx) in item.imgurl" :key="idx" @click="preview(item.imgurl, idx)">-->
<!--                    <img :src="list" alt="">-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="comment-area">-->
<!--                <div class="comment-list" v-if="item.review">-->
<!--                  <div class="comment-box" >-->
<!--                    <span class="name">{{item.review.reviewName}}：</span>-->
<!--                    <span class="comment-content">{{item.review.content}}</span>-->
<!--                  </div>-->
<!--                  &lt;!&ndash;<div class="time-box">-->
<!--                    <span class="time">2345667</span>-->
<!--                  </div>&ndash;&gt;-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="reply-btn">-->
<!--                <span  class="btn simple-reply" @click="simpleReply(item.review.reviewId)">简单回复已阅</span>-->
<!--                <span class="btn detail-reply" @click="detailReply(item.review.reviewId)">详细回复评论</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="prompt" v-if="replyList.length === 0">暂无数据</div>-->
<!--        </van-tab>-->
<!--        <van-tab title="全部档案">-->
          <ClassList :class-list="classList" v-on:classGrade="getChangeIndex"></ClassList>
          <div class="student-archives" v-if="studentList.length>0">
            <p class="text">请选择要查阅的学生</p>
            <div class="liet">
              <van-row gutter="8">
                <van-col span="8"  v-for="(list,idx) in currentStudent" :key="idx">
                  <span class="student-name" @click="archivesDetail(list.stuId)">{{list.stuName}}</span>
                </van-col>
              </van-row>
            </div>
          </div>
          <div class="prompt" v-if="currentStudent.length===0">暂无学生</div>
<!--        </van-tab>-->
<!--      </van-tabs>-->
    </div>
<!--    <van-dialog-->
<!--            v-model="show"-->
<!--            title="详细回复评论"-->
<!--            show-cancel-button-->
<!--            confirm-button-text="确定回复"-->
<!--            :before-close="confirmReply"-->
<!--    >-->
<!--      <van-field-->
<!--              v-model="message"-->
<!--              type="textarea"-->
<!--              placeholder="请输入要回复的内容"-->
<!--              rows="2"-->
<!--              autosize-->
<!--      />-->
<!--    </van-dialog>-->
  </div>
</template>

<script>
  import { NavBar, Icon, Tab, Tabs,Field,Actionsheet,Toast,ImagePreview,Row, Col } from "vant";
  /*import SchooleRoleApi from '../api/school-role-api'*/
  import ClassList from '../components/class-list';
  import { flowerArchives, simpleReply } from '@/api/school/safflower'

  export default {
    name: "flower-archives",
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [Field .name]:Field,
      [Actionsheet.name]:Actionsheet,
      [Toast.name]:Toast,
      [Row.name]:Row,
      [Col.name]:Col,
      ClassList:ClassList,
    },
    data(){
      return{
        show:false,
        message:'',
        classList:[],//班级列表
        studentList:[],//学生列表 与 班级列表一一对应
        replyList:[],//待我回复
        currentStudent:[],
        active:0,
        recivewId:'',
      }
    },
    methods:{
      onClickLeft() {
        this.$router.back(-1);
      },
      //跳转学生档案详情
      archivesDetail(id){
        this.$router.push({name:'SafflowerArchivesDetail',query:{id:id}})
      },
      getChangeIndex(obj){
        this.active = obj.active;
        this.currentStudent = this.studentList[obj.active]
      },
      selectFlowerArchives(){
        this.$loading();
        flowerArchives().
        then(res=>{
          this.$loadingHide();
          if (res.status === 200){
            let d = res.data.data;
            this.replyList = d.waitList;
            if (d.clsStu){
              for (let item in d.clsStu){
                this.classList.push({
                  id:d.clsStu[item].clsId,
                  name:d.clsStu[item].clsName
                });
                this.studentList.push(d.clsStu[item].stuList);
              }
              this.currentStudent = this.studentList[this.active]
            }
          }else {
            Toast.fail("数据请求异常！")
          }
        }).catch(()=>{
          throw new Error("异常！")
        })
      },
      //简单回复
      simpleReply(id){
        this.$dialog.confirm({
          title: '提示',
          message: '确认进行简单回复'
        }).then(() => {
          // on confirm
          simpleReply(id,{content:'已阅读，感谢您的评论'}).then(res=>{
            if (res.status === 200) {
              Toast.success("回复成功");
              let timer = setTimeout(()=>{
                this.selectFlowerArchives();
                clearTimeout(timer)
              },2800)
            }
          }).catch(()=>{
            throw new Error("异常！")
          })
        }).catch(() => {
          // on cancel
        });
      },
      //详细回复
      detailReply(id){
        this.recivewId = id;
        this.show = true
      },
      confirmReply(action, done){
        if (action === 'confirm') {
          simpleReply(this.recivewId,{content:this.message}).then(res=>{
            if (res.status === 200) {
              Toast.success("回复成功");
              let timer = setTimeout(()=>{
                this.selectFlowerArchives();
                clearTimeout(timer)
              },2900)
            }
          }).catch(()=>{
            throw new Error("异常！")
          });
          done()
        }else {
          done()
        }
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
    created(){
      this.selectFlowerArchives()
    }
  }
</script>

<style scoped lang="less">
  #flower-archives{
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
    .archive-content{
      /*width: 100%;*/
      background-color: #fff;
      padding: 0 0.16rem;
      /deep/ .van-tabs__nav.van-tabs__nav--card{
        margin: 0;
      }
      .wait-reply{
        width: 100%;
        /*padding: 0 0.16rem 0.16rem;*/
        box-sizing: border-box;
        .reply-list{
          width: 100%;
          margin-bottom: 0.1rem;
          .top-box{
            overflow: hidden;
            line-height: 0.2rem;
            margin-bottom: 0.1rem;
            margin-top: 0.16rem;
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
            .summary{
              font-size: 0.14rem;
              line-height: 0.2rem;
              margin-bottom: 0.1rem;
              overflow: hidden;
              .flower-total{
                color: #D80000;
                float: left;
                .font-io{
                  font-size: 0.16rem;
                  margin-right: 0.12rem;
                  position: relative;
                  top: 0.03rem;
                }
              }
              .comm-person{
                float: right;
                color: #333;
              }
            }
            .score-detail{
              margin-bottom: 0.1rem;
              .items{
                font-size: 0.14rem;
                line-height: 0.2rem;
                color: #999;
                .score{
                  color: #D80000;
                  margin-right: 0.08rem;
                }
              }
            }
            .detail {
              font-size: 0.14rem;
              .com_left{
                float: left;
              }
              .com_right{
                margin-left: 0.8rem;
              }
            }
            .img-list{
              width: 100%;
              overflow: hidden;
              margin-left: 0.18rem;
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
    .student-archives{
      width: 100%;
      padding-top: .15rem;
      /*padding: 0.15rem;*/
      box-sizing: border-box;
      .text{
        font-size: 0.14rem;
        color: #333;
        line-height: 0.2rem;
        text-align: center;
        margin-bottom: 0.1rem;
      }
      .liet{
        width: 100%;
        /*margin-left: -0.08rem;*/
        /deep/.van-row{
          /*width: 100%;
          margin: 0;*/
        }
        .student-name{
          float: left;
          font-size: 0.16rem;
          width:100%;
          height: 0.26rem;
          line-height: 0.26rem;
          border-radius: 0.03rem;
          text-align: center;
          overflow: hidden;
          /* margin-left: 0.08rem;*/
          margin-bottom: 0.08rem;

          background: rgba(255,255,255,1);
          border-radius: 0.03rem;
          border: 0.01rem solid rgba(153,153,153,1);
          color: #999999;
        }
      }
    }
    .prompt{
      width: 100%;
      font-size: 0.16rem;
      color: #333;
      font-weight: 500;
      margin-top: 2rem;
      text-align: center;
    }
  }
</style>

<template>
  <div id="comment-library">
<!--    模板库-->
    <div class="go-back">
      <van-nav-bar title="模板库" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="content">
      <van-tabs type="card" title-active-color="#fff" color="#3770FB" title-inactive-color="#3770FB">
        <van-tab title="奖励">
          <div class="reward-box" v-if="rewardArr.length>0">
            <div class="library-ist" v-for="(item,index) in rewardArr" :key="index">
              <div class="serial-number">
                <span v-text="index < 9 ? '0'+(index+1) : (index+1)"></span>
              </div>
              <div class="detail">
                <div class="info">
                  <div class="grade pace">
                    <span class="title">推荐班级：</span>
                    <span class="answer">{{item.recommendGrade}}</span>
                  </div>
                  <div class="cover-type pace">
                    <span class="title">覆盖类型：</span>
                    <span class="answer">{{item.type}}</span>
                  </div>
                  <div class="num pace">
                    <div class="comment-num">
                      <span class="title">评语数量：</span>
                      <span class="answer">{{item.number}}</span>
                    </div>
                    <div class="import-num">
                      <span class="title">导入次数：</span>
                      <span class="answer">{{item.importNumber}}</span>
                    </div>
                  </div>
                </div>
                <div class="btn">
                  <button type="button" class="temp-detal-btn" @click="viewLibraryDetail(index, 1)">模板详情</button>
                  <button type="button" class="imp-temp" @click="imTmp(index, 1)">导入该模板</button>
                </div>
              </div>
            </div>
          </div>
          <div class="prompt" v-if="rewardArr.length===0">暂无模板</div>
        </van-tab>
        <van-tab title="扣除">
          <div class="deduct-box" v-if="deductArr.length>0">
            <div class="library-ist" v-for="(item,index) in deductArr">
              <div class="serial-number">
                <span>{{index<9?'0'+(index+1) : (index+1)}}</span>
              </div>
              <div class="detail">
                <div class="info">
                  <div class="grade pace">
                    <span class="title">推荐班级：</span>
                    <span class="answer">{{item.recommendGrade}}</span>
                  </div>
                  <div class="cover-type pace">
                    <span class="title">覆盖类型：</span>
                    <span class="answer">{item.type}}</span>
                  </div>
                  <div class="num pace">
                    <div class="comment-num">
                      <span class="title">评语数量：</span>
                      <span class="answer">{{item.number}}</span>
                    </div>
                    <div class="import-num">
                      <span class="title">导入次数：</span>
                      <span class="answer">{{item.importNumber}}</span>
                    </div>
                  </div>
                </div>
                <div class="btn">
                  <button type="button" class="temp-detal-btn" @click="viewLibraryDetail(index, 2)">模板详情</button>
                  <button type="button" class="imp-temp" @click="imTmp(index, 2)">导入该模板</button>
                </div>
              </div>
            </div>
          </div>
          <div class="prompt" v-if="deductArr.length===0">暂无模板</div>
        </van-tab>
      </van-tabs>
    </div>
    <!--模板详情-->
    <van-dialog
        v-model="detailShow"
        title="模板详情"
        show-cancel-button
        confirm-button-text="导入该模板"
        :before-close="importTemp"
    >
      <div class="library-detail" v-if="detail.length>0">
        <div class="detail-list" v-for="(item,index) in detail" :key="index">
          <span class="title"><i class="cycle"></i> {{item.category}}</span>
          <p class="article" v-for="(val,idx) in item.list" :key="idx"><span class="worth">{{rewardType==1?'+'+val.worth : '-'+val.worth}}</span> {{val.content}}</p>
        </div>
      </div>
    </van-dialog>
    <!--导入模板-->
    <van-dialog
        v-model="importTempShow"
        title="导入模板"
        show-cancel-button
        confirm-button-text="确定导入"
        :before-close="confirmImpo"

    >
      <div class="comment-scope">
        <span class="title">评语范围：</span>
        <span class="answer">{{tempObj.type===1?'奖励':'扣除'}}</span>
      </div>
      <div class="class-scope">
        <van-field
            v-model="classval"
            label="评语范围："
            placeholder="请选择班级"
            readonly
            right-icon="arrow-down"
            @click-right-icon="chooseClass"
            :error-message="'推荐'+tempObj.className"
        />
      </div>
      <div class="cover-type">
        <span class="title">覆盖范围：</span>
        <span class="answer">{{tempObj.commentTe}}</span>
      </div>
      <div class="comment-num">
        <span class="title">评语数量：</span>
        <span class="answer">{{tempObj.num}}</span>
      </div>
    </van-dialog>
    <!--班级选择弹出层-->
    <van-actionsheet
        v-model="classShow"
        :actions="classListData"
        @select="onSelect"
    />
  </div>
</template>

<script>
  import { NavBar, Icon, Button, Row, Col,Tab, Tabs,Field,Actionsheet,Toast } from "vant";
  import { getAllClass } from '@/api/common'
  import { importComment, selectCommentLibrary } from '@/api/school/safflower'
  export default {
    name: "comment-library",
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Button.name]: Button,
      [Row.name]: Row,
      [Col.name]: Col,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [Field .name]:Field,
      [Actionsheet.name]:Actionsheet,
      [Toast.name]:Toast,
    },
    data(){
      return{
        rewardArr:[],//保存奖励模板
        deductArr:[],//保存扣除模板
        detailShow:false,//详情弹出层
        detail:[],//保存模板详情数据
        rewardType:1,//默认奖励
        importTempShow:false,//导入模板
        classval:'',//导入模板时选择的班级
        classListData:[],
        classShow:false,//班级弹出层
        idxs:0,
        tempObj:{
          type:1,
          classI:null,
          commentTe:'',
          num:0,
          className:'',
          templateId:null,
        }
      }
    },
    methods:{
      onClickLeft() {
        this.$router.back(-1);
      },
      selectLibraryList(){
        this.$loading();
        selectCommentLibrary()
          .then(res=>{
          this.$loadingHide();
          if (res.status === 200){
            if (res.data.data){
              this.rewardArr = res.data.data.reward;
              this.deductArr = res.data.data.deduct;
            }
          }
        }).catch(()=>{
          throw new Error("异常！")
        })
      },
      //查看模板详情 type 1 奖励 2 扣除
      viewLibraryDetail(index, type){
        this.detailShow = true;
        this.rewardType = type;
        this.idxs = index;
        if (type === 1){
          this.detail = this.rewardArr[index].comment
        }else if (type === 2){
          this.detail = this.deductArr[index].comment
        }
      },
      //导入模板
      importTemp(action, done){
        if (action === 'confirm'){
          done();
          this.importTempShow = true;
          if (this.rewardType === 1){
            this.tempObj.type = 1;
            this.tempObj.className = this.rewardArr[this.idxs].recommendGrade;
            this.tempObj.commentTe = this.rewardArr[this.idxs].type;
            this.tempObj.num=this.rewardArr[this.idxs].number;
            this.tempObj.templateId = this.rewardArr[this.idxs].templateId
          }else {
            this.tempObj.type = 2;
            this.tempObj.className = this.deductArr[this.idxs].recommendGrade;
            this.tempObj.commentTe = this.deductArr[this.idxs].type;
            this.tempObj.num=this.deductArr[this.idxs].number;
            this.tempObj.templateId = this.deductArr[this.idxs].templateId
          }
        }else {
          done();
        }
      },
      /*直接导入模板*/
      imTmp(index, type){
        this.rewardType = type;
        this.idxs = index;
        this.importTempShow = true;
        if (this.rewardType === 1){
          this.tempObj.type = 1;
          this.tempObj.className = this.rewardArr[this.idxs].recommendGrade;
          this.tempObj.commentTe = this.rewardArr[this.idxs].type;
          this.tempObj.num=this.rewardArr[this.idxs].number;
          this.tempObj.templateId = this.rewardArr[this.idxs].templateId
        }else {
          this.tempObj.type = 2;
          this.tempObj.className = this.deductArr[this.idxs].recommendGrade;
          this.tempObj.commentTe = this.deductArr[this.idxs].type;
          this.tempObj.num=this.deductArr[this.idxs].number;
          this.tempObj.templateId = this.deductArr[this.idxs].templateId
        }
      },
      //获取所有班级
      selectClassList(){
        // this.$route.params.type 1 为教师 2 为 校长
        let num = this.$route.params.type === 1 ? 0 : 1;
        //
        getAllClass(num)
          .then(res=>{
          if (res.status === 200){
            this.classListData = res.data.data;
          }
        }).catch(()=>{
          throw new Error("异常！")
        })
      },
      onSelect(item){
        this.classShow = false;
        this.classval = item.name;
        this.tempObj.classI = item.id
        //console.log(item)
      },
      chooseClass(){
        this.classShow = true;
      },
      confirmImpo(action, done){
        if (action === 'confirm'){
          done();
          importComment(this.tempObj.templateId, {clsId:this.tempObj.classI})
            .then(res=>{
            if (res.status === 200){
              //Toast.success("导入成功")
              this.selectLibraryList();
            }
          }).catch(()=>{
            throw new Error("异常！")
          })
        }else {
          done()
        }
      }

    },
    created(){
      this.selectClassList();
      this.selectLibraryList();
    }
  }
</script>

<style scoped lang="less">
  #comment-library{
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
    .content{
      padding: 0.13rem 0;
      .van-tabs--card>.van-tabs__wrap{
        margin-bottom: 0.13rem;
      }
      .prompt{
        width: 100%;
        font-size: 0.16rem;
        color: #333333;
        font-weight: 500;
        text-align: center;
        margin-top: 2rem;
      }
      .reward-box,.deduct-box{
        background-color: #F3F7F8;
        .library-ist{
          padding: 0.18rem 0.16rem 0.25rem;
          background-color: #fff;
          box-sizing: border-box;
          margin-bottom: 0.1rem;
          overflow: hidden;
          .serial-number{
            float: left;
            width: 0.48rem;
            font-size: 0.14rem;
            padding-left: 0.09rem;
            color: #666;
            box-sizing: border-box;
          }
          .detail{
            float: left;
            width: 2.95rem;
            .info{
              border-bottom: 0.01rem solid #eee;
              .pace{
                font-size: 0.14rem;
                padding-bottom: 0.15rem;
                line-height: 0.2rem;
                .title{
                  color: #666;
                }
                .answer{
                  color: #999;
                }
              }
              .num{
                overflow: hidden;
                .comment-num{
                  float: left;
                }
                .import-num{
                  float: left;
                  margin-left: 0.8rem;
                }
              }
            }
            .btn{
              margin-top: 0.13rem;
              button{
                width: 1.3rem;
                height: 0.24rem;
                border: 0.01rem solid;
                border-radius: 0.05rem;
                font-size: 0.12rem;
                outline: none;
                background-color: #fff;
              }
              .temp-detal-btn{
                border-color: #3770fb;
                color: #3770fb;
              }
              .imp-temp{
                border-color: #84C225;
                color: #84C225;
                margin-left: 0.22rem;
              }
            }
          }
        }
      }
    }
    .library-detail{
      padding: 0 0.16rem;
      .detail-list{
        .title{
          font-size: 0.14rem;
          color: #333;
          .cycle{
            display: inline-block;
            width: 0.02rem;
            height: 0.02rem;
            font-size: 0.12rem;
            border: 0.02rem solid #333;
            border-radius: 50%;
            position: relative;
            top: -0.01rem;
            left: -0.04rem;
            background-color: #333;
          }
        }
        .article{
          line-height: 0.2rem;
          font-size: 0.12rem;
          color: #666;
          padding-left: 0.08rem;
          .worth{
            margin-right: 0.1rem;
          }
        }
      }
    }
    .comment-scope,.cover-type,.comment-num{
      font-size: 0.14rem;
      padding-left: 0.16rem;
      margin-top: 0.1rem;
      .title{
        color: #999;
        margin-right: 0.2rem;
      }
      .answer{
        color: #666;
      }
    }
  }
</style>

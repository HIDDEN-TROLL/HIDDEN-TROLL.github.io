<template>
    <div id="comments">
        <van-nav-bar
            title="管理评语"
            left-text="返回"
            right-text=""
            left-arrow
            @click-left="onClickLeft"
            @click-right="onClickRight"
        />

        <div class="van-tabs_div">
            <van-tabs type="card" @click="tabsComments">
                <van-tab title="鼓励式">
                    <div class="commentlist_d" :style="{width:w,transform:`translateX(${translateX}rem)`}">
                        <div class="comment-box" v-for="(item,index) in commentArr.imbolden" :key="index" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
                            <div  class="comment" v-for="(items, indexes) in item" :key='indexes' @click="modifyComments(items.commentId, items.comment)">
                                <span>{{items.comment}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="S_left_b ">
                        <div class="S_left">
                            <span>&lt; 向左滑动</span><span class="S_left_m_t">{{rpage}}/{{rcount}}</span><span>向右滑动 &gt;</span>
                        </div>
                        <div class="S_left S_left_se">
                            <span>点击评语可删除或修改</span>
                        </div>
                    </div>
                </van-tab>
                <van-tab title="批评式">
                    <div class="commentlist_d" :style="{width:cw,transform:`translateX(${ctranslateX}rem)`}">
                        <div class="comment-box" v-for="(item,index) in commentArr.criticism" :key="index" @touchstart="touchstart" @touchmove="touchmove" @touchend="ctouchend">
                            <div  class="comment"  v-for="(items, indexes) in item" :key='indexes' @click="modifyComments(items.commentId, items.comment)">
                                <span>{{items.comment}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="S_left_b ">
                        <div class="S_left">
                            <span>&lt; 向左滑动</span><span class="S_left_m_t">{{cpage}}/{{ccount}}</span><span>向右滑动 &gt;</span>
                        </div>
                        <div class="S_left S_left_se">
                            <span>点击评语可删除或修改</span>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <!--新增 评语-->
        <van-dialog
            v-model="addCommentModel"
            title="添加评语"
            show-cancel-button
            confirm-button-text="新增"
            :before-close="addComments"
        >

            <van-field v-model="addCommentContent" placeholder="请输入评语" maxlength="15" >
                <span slot="button">{{addCommentContent.length}}/15</span>
            </van-field>
            <div class="comment-type">
                <span class="title">评语类型：</span>
                <van-radio-group v-model="stringcommentsType">
                    <van-radio name="1">鼓励式</van-radio>
                    <van-radio name="2">批评式</van-radio>
                </van-radio-group>
            </div>
        </van-dialog>
        <!--修改评语-->
        <van-dialog
            v-model="modifyCommentModel"
            show-cancel-button
            confirm-button-text="修改评语"
            :before-close="confirmmodifyComments"
        >

            <div class="top-box">
                <span class="title">修改评语</span>
                <span class="delComment" @click="delComments">删除评语</span>
            </div>
            <van-field v-model="modifyCommentContent" placeholder="请输入评语" maxlength="15" >
                <span slot="button">{{modifyCommentContent.length}}/15</span>
            </van-field>
            <div class="comment-type">
                <span class="title">评语类型：</span>
                <van-radio-group v-model="stringcommentsType">
                    <van-radio name="1">鼓励式</van-radio>
                    <van-radio name="2">批评式</van-radio>
                </van-radio-group>
            </div>
        </van-dialog>
        <FooterBtn :event-arr="arr" v-on:commenEvent="parent"></FooterBtn>
    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
  import { NavBar,Button,Field,RadioGroup, Radio,Toast } from 'vant';
  import { Tab, Tabs } from 'vant';
  import FooterBtn from '../../common/footer-operate-btn'
  import { commentsList, addCommentsConfirm, modifyCommentsSub, deleteCommentsSub } from '@/api/teacher/homework'
  export default {
    name: "",
    components: {
      [Button.name]:Button,
      [NavBar.name]:NavBar,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [Field.name]:Field,
      [RadioGroup.name]:RadioGroup,
      [Radio.name]:Radio,
      [Toast.name]:Toast,
      FooterBtn:FooterBtn
    },
    data(){
      return {
        msg: "Hello Vue.js",
        arr:[{title:'新增评语',type:1}],
        commentArr:{
          criticism:[],
          imbolden:[]
        },//保存评语
        addCommentModel:false,//新增评语model
        modifyCommentModel:false,//修改评语model
        commentsType:0,//保存评语类型 0 鼓励 1 批评
        stringcommentsType:'1',
        addCommentContent:'',//新增评语内容
        modifyCommentContent:'',//修改评语内容
        modifyCommentId:null,//修改评语内容
        pageSize:7,//每页显示数据
        translateX:0,
        ctranslateX:0,
        startX: 0, //开始触摸x的位置
        endX: 0, //结束触摸的位置
        disX: 0, //移动距离
        lastX: 0, //结束X坐标
        rpage:1,
        rcount:1,
        cpage:1,
        ccount:1,
      }
    },
    methods:{
      onClickLeft(){
        this.$router.back(-1)
      },
      onClickRight(){

      },
      parent(){
        this.commentsType === 0 ? this.stringcommentsType='1' : this.stringcommentsType='2';
        this.addCommentModel = true;
      },
      //左右滑动
      touchstart(ev){
        this.startX = 0;
        ev = ev || event;
        if (ev.touches.length === 1) {
          this.startX = ev.touches[0].clientX;
        }
      },
      touchmove(ev){
        this.endX = 0;
        this.disX = 0;
        ev = ev || event;
        if (ev.touches.length === 1) {
          this.endX = ev.changedTouches[0].clientX;
          this.disX = this.endX - this.startX;
        }

      },
      touchend(ev){
        ev = ev || event;
        if (ev.changedTouches.length === 1) {
          //左滑动
          if (this.disX < 0 && Math.abs(this.disX) > 30) {
            //如果可滑动
            if (this.rpage < this.rcount){
              this.rpage = this.rpage + 1;
              this.translateX = this.translateX - 3.75;
            }

          }else if (this.disX > 0 && Math.abs(this.disX) > 30) {//右滑动
            //如果可滑动
            if (this.rpage > 1){
              this.rpage = this.rpage - 1;
              this.translateX = this.translateX + 3.75
            }
          }
        }
      },
      //批评 滑动
      ctouchend(ev){
        ev = ev || event;
        if (ev.changedTouches.length === 1) {
          //左滑动
          if (this.disX < 0 && Math.abs(this.disX) > 30) {
            //如果可滑动
            if (this.cpage < this.ccount){
              this.cpage = this.cpage + 1;
              this.ctranslateX = this.ctranslateX - 3.75;
            }

          }else if (this.disX > 0 && Math.abs(this.disX) > 30) {//右滑动
            //如果可滑动
            if (this.cpage > 1){
              this.cpage = this.cpage - 1;
              this.ctranslateX = this.ctranslateX + 3.75
            }
          }
        }
      },

      //获取评语列表
      selectComment(){
          this.$loading(undefined, undefined, true)
        commentsList().then(res=>{
            this.$loadingHide()
          if (res.status === 200){
            if (res.data.data){
              if (res.data.data.imbolden){
                let rd = [];
                let di = res.data.data.imbolden;
                if (di.length > this.pageSize){
                  for (let i=0; i<di.length; i+=this.pageSize){
                    rd.push(di.slice(i,i+this.pageSize))
                  }
                }else {
                  rd.push(di)
                }
                this.commentArr['imbolden']=rd;
                this.rcount = rd.length;
              }
              if (res.data.data.criticism){
                let rc = [];
                let dc = res.data.data.criticism;
                if (dc.length > this.pageSize){
                  for (let i=0; i<dc.length; i+=this.pageSize){
                    rc.push(dc.slice(i,i+this.pageSize))
                  }
                }else {
                  rc.push(dc)
                }
                this.commentArr['criticism'] = rc;
                this.ccount = rc.length;
              }
            }
          }
        }).catch(()=>{
          throw new Error("异常！")
        })
      },
      //切换评语
      tabsComments(index){
        if (this.commentsType !== index){
          if (index === 0){
            this.cpage = 1;
            this.ctranslateX = 0
          }else {
            this.rpage = 1;
            this.translateX = 0;
          }
        }
        this.commentsType = index;
        index === 0 ? this.stringcommentsType='1' : this.stringcommentsType='2'
      },
      //新增评语
      addComments(action, done){
        if (action === 'confirm'){
          if (this.addCommentContent){
            addCommentsConfirm({type:parseInt(this.stringcommentsType),comment:this.addCommentContent}).then(res=>{
              if (res.status === 200){
                if (res.data.data.code === 0){
                  this.addCommentContent = '';
                  let timer = setTimeout(()=>{
                      Toast.clear();
                      clearTimeout(timer);
                      this.selectComment();
                  },2900)
                  Toast.success('新增成功！')
                }
                done()
              }else {
                done(false);
                Toast.fail('新增失败！')
              }
            }).catch(()=>{
              done(false);
              throw new Error("异常！")
            })
          }else {
            done(false);
            Toast('请输入评语内容！')
          }

        }else {
          this.addCommentContent = '';
          done()
        }

      },
      //修改 评语
      modifyComments(id, content){
        this.modifyCommentId = id;
        this.modifyCommentContent = content;
        this.modifyCommentModel = true;
      },
      //确定修改评语
      confirmmodifyComments(action, done){
        if (action === 'confirm'){
          if (this.modifyCommentContent){
            modifyCommentsSub(this.modifyCommentId,{type:parseInt(this.stringcommentsType),comment:this.modifyCommentContent}).then(res=>{
              if (res.status === 200){
                if (res.data.data.code === 0){
                  this.modifyCommentContent = '';
                    let timer = setTimeout(()=>{
                        Toast.clear();
                        clearTimeout(timer);
                        this.selectComment();
                    },2900)
                  Toast.success('修改成功！')
                }
                done()
              }else {
                done(false);
                Toast.fail('修改失败！')
              }
            }).catch(()=>{
              done(false);
              throw new Error("异常！")
            })
          }else {
            done(false);
            Toast('请输入评语内容！')
          }

        }else {
          this.addCommentContent = '';
          done()
        }
      },
      //删除评语
      delComments(){
        this.$dialog.confirm({
          title: '删除评语',
          message: '确定删除当前评语？'
        }).then(() => {
          // on confirm
          deleteCommentsSub(this.modifyCommentId,{type:parseInt(this.stringcommentsType),comment:this.modifyCommentContent}).then(res=>{
            if (res.status === 200){
              if (res.data.data.code === 0){
                this.modifyCommentContent = '';
                this.modifyCommentModel = false;
                  let timer = setTimeout(()=>{
                      Toast.clear();
                      clearTimeout(timer);
                      this.selectComment();
                  },2900)
                Toast.success('删除成功！')
              }
            }else {
              Toast.fail('删除失败！')
            }
          }).catch(()=>{
            throw new Error("异常！")
          });
        }).catch(() => {
          // on cancel
        });
      }
    },
    created(){
      this.selectComment();
    },
    computed:{
      w(){
        return this.rcount*3.75+'rem'
      },
      cw(){
        return this.ccount*3.75+'rem'
      }
    }
  }
</script>

<style scoped lang="less">
    #comments{
        font-size: 0.12rem;
        .van-nav-bar .van-icon ,.van-nav-bar__text{
            color: white;
        }
        .van-nav-bar{
            background-color:#3770FB ;
        }
        .van-nav-bar__title{
            color: white;
        }
        .van-tabs{
            margin-top:0.15rem;
        }
        .van-tabs_div /deep/ .van-tabs__nav--card .van-tab.van-tab--active {
            background-color: #3770fb;
            color: white;
        }
        .van-tabs_div /deep/ .van-tabs__nav--card {
            border: 1px solid #3770fb;
        }
        .van-tabs_div /deep/ .van-tabs__nav--card .van-tab{
            color: #3770fb;
        }
        .van-tabs_div /deep/ .van-tabs__nav--card .van-tab{
            border-right:none;
        }
        .van-tab__pane{
            overflow: hidden;
        }
        .commentlist_d{
            margin-top:0.3rem;
            height: 3.5rem;
            overflow: hidden;
            transition: all 2s;
            .comment-box{
                float: left;
                width: 3.75rem;
                height: 3.5rem;
                overflow: hidden;
                /*overflow: hidden;*/
                .comment{
                    width: 100%;
                    float: left;
                    padding: 0.1rem 0;
                    text-align: center;
                    height: 0.5rem;
                    box-sizing: border-box;
                    span{
                        display: inline-block;
                        font-size: 0.14rem;
                        width:2.5rem;
                        height: 0.3rem;
                        line-height:0.3rem;
                        /*margin:0.05rem 0.2rem;*/
                        background-color: #3770FB;
                        color:rgba(255,255,255,1);
                        border-radius:3px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
        .b_button span{
            line-height: 0.4rem;
        }

        .S_left{
            text-align: center;
            height:0.17rem;
            font-size:0.12rem;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:0.17rem;
        }
        .S_left_m_t{
            margin:  0 0.1rem;
        }
        .S_left_se{
            margin-top: 0.15rem;
        }
        .S_left_b{
            position: fixed;
            bottom: 0.55rem;
            left: 0.5rem;
            right: 0.5rem;
        }
        .top-box{
            padding-top: 0.25rem;
            padding-bottom: 0.1rem;
            text-align: center;
            overflow: hidden;
            position: relative;
            .title{
                font-size: 0.16rem;
                line-height: 0.26rem;
            }
            .delComment{
                position: absolute;
                top: 0.25rem;
                right: 0.16rem;
                font-size: 0.14rem;
                color: #fff;
                background-color: #d80000;
                padding:0.02rem 0.1rem;
                border-radius: 0.1rem;
            }
        }
        .comment-type{
            font-size: 0.14rem;
            padding:0.16rem;
            box-sizing: border-box;
            overflow: hidden;
            .title{
                float: left;
            }
            .van-radio-group{
                float: left;
                .van-radio{
                    float: left;
                    margin-left: 0.1rem;
                }
            }
        }
    }


</style>
<template>
  <div id="community-index-school">
    <!--校长角色首页-->
    <div class="go-back">
      <van-nav-bar
              title="互动社区"
              :left-text="!isFromTemplate ? '返回' : ''"
              :left-arrow="!isFromTemplate"
              @click-left="onClickLeft"
              @click-right="onClickRight"
      >
        <van-icon name="bars" slot="right"/>
      </van-nav-bar>
      <div class="downmenu" v-show="manageshow">
        <i></i>
        <router-link :to="{name:'CommunityAddManagement'}"><span class="add">新增动态</span></router-link>
        <router-link :to="{name:'CommunityTypeManagement'}"><span class="type-manage">类型管理</span></router-link>
        <router-link :to="{name:'CommunityPermissionsManagement'}"><span class="permiss-manage">权限管理</span></router-link>
      </div>
    </div>
    <!--banner-->
    <div v-if="Array.isArray(banner) && banner.length > 0" class="banner">
      <van-swipe :autoplay="5000" :show-indicators="false" :height="200">
        <van-swipe-item v-for="(url, index) in banner" :key="index">
          <img class="banner-image" :src="url" alt="banner" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="content">
      <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
      >
        <div v-if="communityList.length>0">
          <div class="community-list" v-for="(item, index) in communityList" :key="index" >
            {{item.year}}
            <div v-for="(items,indexes) in item.communitys" :key="indexes" style="margin-top: 0.1rem;overflow: hidden" :class="'0'+index+indexes" :id="'0'+index+indexes">
              <router-link :to="{name:'CommunityMyCommunity',params:{ utype: items.utype, uid: items.uid }}">
                <div class="avatar" >
                  <img :src="items.avatar" alt="">
                </div>
              </router-link>
              <div class="detail">
                <div class="top-t">
                  <router-link :to="{name:'CommunityMyCommunity',params:{ utype: items.utype, uid: items.uid }}">
                    <span class="title">{{items.name}}</span>
                  </router-link>

                  <span class="type">{{items.type}}</span>
                </div>

                <div class="desc">
                  <div class="text" :class="setClass?'active':''">
                    <div class="ct" ref="element">{{items.content}}</div>
                  </div>
                  <span class="all" v-if="show" @click="showAllText">{{showText}}</span>
                </div>
                <div class="list" v-if="items.imgUrl.length>0">
                  <div class="items" v-for="(list,ind) in items.imgUrl" :key="ind">
                    <img :src="list" alt="" @click="preview(items.imgUrl, ind)">
                  </div>
                </div>
                <div class="video" v-if="items.video&&JSON.stringify(items.video)!=='{}' && !(Array.isArray(items.video))">
                  <div class="items" @click="playerVideo(items.video.url, items.video.image)">
                    <video :src="items.video.url" :poster="items.video.image">您的浏览器不支持 video 标签。</video>
                    <span class="play-video"><van-icon name="play-circle-o"/></span>
                  </div>
                </div>
                <div class="dips">
                  <div class="read-info">
                    <router-link :to="{name:'CommunityReadDetail',params:{id:items.communityId,read:items.readNum,unRead:items.unReadNum}}">
                      <span class="no-read">{{items.unReadNum}}人未阅读</span>/
                      <span class="read">{{items.readNum}}人已阅读</span>
                    </router-link>
                    <span style="font-size: 0.12rem;float: right;color: #997864" @click="DeletedDialog(items.communityId,'0'+index+indexes,index,indexes)"  v-if="items.isDelete===1">删除动态</span>
                  </div>
                  <div class="time">
                    <span>{{items.date}} {{items.time}}</span>
                  </div>
                  <div class="view-scoped">
                    <div class="cl-list">
                      <span class="title">可见范围：</span>
                      <div class="li-con" v-if="items.range.length>0">
                        <p class="text">{{scopedClassList(items.range)}}</p>
                      </div>
                      <span class="operate" @click="toggle(items.likeShow,indexes,index)"><van-icon
                              name="ellipsis"/></span>
                      <transition name="show">
                        <div class="show" v-show="items.likeShow">
                          <span @click="likes(indexes,index,items.communityId)"><van-icon name="like-o"/> {{items.isLike ? '取消':'赞'}}</span>
                          <span v-if="commentsType>0" @click="commentsOpt(indexes,index,items.communityId)" style="margin-left: 0.5rem">
                            <label for="ipt-comm">评论</label>
                          </span>
                          <span class="triangle"></span>
                        </div>
                      </transition>
                    </div>
                  </div>
                </div>
                <div class="give-like">
                  <div class="like-box">
                    <span class="iocn"><van-icon name="like-o"/></span>
                    <span class="person" v-for="(list, ind) in items.like" :key="ind">{{list.name}} {{items.like.length===ind+1 ? "":","}} </span>
                  </div>
                  <div class="comments">
                    <template v-for="(subItem, subIndex) in items.comments">
                      <div class="list" :key="subIndex" v-if="!subItem.upUserId">
                        <span class="clk-com" @click="commentsOpt(indexes,index,items.communityId,subItem.commentId)"><label for="ipt-comm"></label></span>
                        <span class="name">{{subItem.name}}：</span>
                        <span class="com-content">{{subItem.content}}</span>
                      </div>
                      <div class="list" :key="subIndex" v-if="subItem.upUserId">
                        <span class="clk-com" @click="commentsOpt(indexes,index,items.communityId,subItem.commentId)"><label for="ipt-comm"></label></span>
                        <span class="name">{{subItem.name}}</span>
                        回复
                        <span class="name-f">{{subItem.upName}}：</span>
                        <span class="com-content">{{subItem.content}}</span>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </van-list>
    </div>
    <div class="bg" :style="bgheight" v-show="bgshow" @click="operateBg"></div>

    <!--审核按钮-->
    <div class="audit" v-if="auditNumber>0 && control">
      <router-link :to="{name:'CommunityAudit'}">
        <span class="btn">审核管理 <strong>{{auditNumber}}</strong></span>
      </router-link>
    </div>
    <Player v-on:hidePlay="hidePlay" :state="palyerShow" :video-url="videoUrl" :poster="poster" v-if="palyerShow"></Player>

    <!--评论输入框-->
    <div class="comment-ipt" :style="{bottom:iptBotm}"  v-show="focusState">
      <van-field id="ipt-comm"
                 v-model="message"
                 type="textarea"
                 rows="1"
                 @blur="hidebox"
                 v-focus="focusState"
                 autosize
      />
      <van-button slot="button" size="small" type="primary" class="sendComments" @click="sendComments()">发送</van-button>
    </div>

    <van-dialog
            v-model="DeletedDia"
            title="请确认操作"
            show-cancel-button
            @confirm="DeletedMes()"
    >
      <div style="text-align: center;color: #7d7e80;padding:0.15rem ; font-size: 0.14rem">确认删除此动态？</div>
    </van-dialog>

  </div>
</template>

<script>
  import { NavBar, Icon, Field, List, ImagePreview,Button, SwipeItem, Swipe,Toast } from 'vant';
  import Player from '../../common/player'
  import { getCommunityIndexData, likes, commentDynamic,deletecommunity } from '@/api/school/community'
  import { getParamFromUrlAndRoute, isEmpty } from '@/utils'

  export default {
    name: "community-index",
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Field.name]: Field,
      [List.name]: List,
      [Button.name]:Button,
      [Toast.name]: Toast,
      Player: Player,
      vanSwipeItem: SwipeItem,
      vanSwipe: Swipe,
    },
    data() {
      return {
        banner: [],
        loading: false,
        finished: false,
        message:'',//评论内容
        /* transShow:false,//显示点赞*/
        setClass: false,
        show: false,//是否显示全文按钮
        showText: '全文',
        manageshow: false,//显示功能管理
        bgshow: false,//显示背景
        page: 1,//当前页
        type: 0,//类型
        commentsType: 1,//社区评论是否开启 0 关闭
        auditNumber: 0,//等待审核动态条数
        communityList: [],//列表数据
        palyerShow: false,//弹框视频播放
        videoUrl: "",//视频播放地址
        poster:"",
        iptBotm:'-1rem',
        control:true,//解决管理按钮被 软键盘网上顶的问题
        screenHeight: document.documentElement.clientHeight,
        originHeight: document.documentElement.clientHeight,
        focusState:false,//获取焦点状态
        commentsid:'',//当前评论id
        parCommentsid:'',//回复评论id
        parentIndex:null,//记录评论的是那个时间段的 动态 todo 评论成功不刷新页面
        childrenIndex:null,//记录评论的当前时间段下的哪条数据 todo 评论成功不刷新页面
        sendOperate:false,//点击发送操作

        isFromTemplate: false,
        templateId: 0,

        DeletedDia:false,
        communityId:'',
        stop:true,
        hideclass:''
      }
    },
    methods: {
      DeletedDialog(id,hideclass){
        if(this.stop===true){
          this.DeletedDia = true
          this.communityId = id
          this.hideclass = hideclass
        }
      },
      DeletedMes() {
        if(this.stop===true){
          this.stop = false
          this.$loading();
          deletecommunity(this.communityId)
                  .then(res => {
                    if (res.status === 200  && res.data.meta.code === 0) {
                      this.$loadingHide();
                      Toast.success("删除成功！")
                      document.getElementById(this.hideclass).style.display = 'none'
                      let timer = setTimeout(()=>{
                        this.stop=true
                      },2800)
                    }else{
                      Toast.success("删除失败！")
                    }
                  }).catch(() => {
            throw new Error("异常！")
          })
        }
      },
      onClickLeft() {
        this.$router.back(-1)
      },
      enterMyCommunity(utype, uid) {
        this.$router.push({ name: 'CommunityMyCommunity', params: { utype: utype, uid: uid } })
      },
      showAllText() {
        if (this.setClass) {
          this.setClass = false;
          this.showText = '全文'
        } else {
          this.setClass = true;
          this.showText = '收起'
        }
      },
      onClickRight() {
        //this.$router.push({name: 'AddCommunity'})
        this.manageshow = true;
        this.bgshow = true;
      },
      operateBg() {
        this.manageshow = false;
        this.bgshow = false;
      },
      //点赞
      likes(idx, index, id) {
        this.communityList[index].communitys[idx].likeShow = false;
        likes(id)
                .then(res => {
                  if (res.status === 200) {
                    if (res.data.data.like === 1) {//点赞
                      this.communityList[index].communitys[idx].isLike = 1;
                      this.communityList[index].communitys[idx].like.push({
                        id: res.data.data.id,
                        name: res.data.data.realname,
                      })
                    } else if (res.data.data.like === 0) {//取消
                      this.communityList[index].communitys[idx].isLike = 0;
                      //let index = this.communityList[index].communitys[idx].like.indexOf()
                      for (let i = 0; i < this.communityList[index].communitys[idx].like.length; i++) {
                        if (this.communityList[index].communitys[idx].like[i].id == res.data.data.id) {
                          this.communityList[index].communitys[idx].like.splice(i, 1)
                        }
                      }
                    }

                  }
                }).catch(() => {
          throw new Error("异常！")
        })
      },
      toggle(show, idx, index) {
        if (show) {
          this.communityList[index].communitys[idx].likeShow = false
        } else {
          for (let val of this.communityList) {
            for (let key of val.communitys) {
              key["likeShow"] = false;
            }
          }
          this.communityList[index].communitys[idx].likeShow = true
        }
      },
      //获取校长端社区首页列表
      selectList() {

        getCommunityIndexData(this.page, this.type, this.templateId)
                .then(res => {

                  //console.log(res);
                  if (res.status === 200) {
                    if (isEmpty(this.banner) && !isEmpty(res.data.data.images)) {
                      this.banner = res.data.data.images;
                    }
                    if (res.data.data.communityList.length > 0) {
                      if (this.page === 1) {
                        this.auditNumber = res.data.data.checkCount;
                      }
                      let number = 0;//记录返回的数据条数
                      this.page = this.page + 1;
                      for (let item of res.data.data.communityList) {
                        //加个属性
                        for (let i of item.communitys) {
                          i["likeShow"] = false;
                        }
                        if (this.communityList.length > 0) {
                          let bs = false;
                          for (let v of this.communityList){
                            if (item.year === v.year) {
                              bs = true;
                              v.communitys.push.apply(v.communitys, item.communitys)
                            }
                          }
                          if (!bs) {
                            this.communityList.push(item);
                          }
                        }else {
                          this.communityList.push(item);
                        }

                        number = number + item.communitys.length;

                      }
                      this.loading = false;
                      if (number < 10) {
                        this.finished = true;
                      }
                    } else {
                      this.loading = false;
                      this.finished = true;
                    }

                    //有待审核数据时提示
                    if (this.auditNumber > 0 && this.page === 2) {
                      this.$dialog.confirm({
                        title: '提示',
                        message: '您有待审核的动态，是否需要去审核？',
                      }).then(() => {
                        // on confirm
                        this.$router.push({ name: 'CommunityAudit' })
                      }).catch(() => {
                        // on cancel
                      });
                    }
                  }
                }).catch(() => {
          throw new Error("异常！")
        })
      },
      onLoad() {
        this.selectList();
      },
      //图片预览
      preview(imgArr, index) {
        ImagePreview({
          images: imgArr,
          startPosition: index ? index : 0,
          lazyLoad: false,
        });
      },
      //关闭视频
      hidePlay(bl) {
        this.palyerShow = bl
      },
      //播放视频
      playerVideo(url, pos) {
        this.videoUrl = url;
        this.poster = pos;
        let timer = setTimeout(() => {
          this.palyerShow = true;
          clearTimeout(timer)
        }, 500)
      },
      //评论
      commentsOpt(idx, index, id, pId){
        this.message = '';
        this.commentsid = id;
        this.parentIndex = index;
        this.childrenIndex = idx;
        //this.opacity = 1;
        this.communityList[index].communitys[idx].likeShow = false;
        // aginfocus
        this.focusState = true;
        if (pId){
          this.parCommentsid = pId;
        }else {
          this.parCommentsid="";
          //this.focusState = true;
        }
        let timer = {
          id:null,
          run:function (callback,time) {
            this.id = window.setInterval(callback,time);
          },
          clean:function () {
            let that = this;
            this.id = window.clearInterval(that.id);
          }
        };
        let keyboardHeight = 0,screenHeight = window.innerHeight;
        if(!keyboardHeight){
          timer.run(function () {
            if (screenHeight !== window.innerHeight) {
              keyboardHeight = screenHeight-window.innerHeight;
              timer.clean()
            }
          }, 50)
        }

        this.iptBotm = `${(keyboardHeight/100)}rem`

        /*console.log(window.innerHeight)
        console.log(document.body.clientTop)
        console.log(document.body.clientHeight)*/
      },
      sendComments(){
        this.sendOperate = true;
        commentDynamic(this.commentsid,this.parCommentsid,{content:this.message})
                .then(res=>{
                  if (res.status === 200){
                    this.focusState = false;
                    this.sendOperate = false;
                    let d = res.data.data;
                    if (this.parCommentsid){
                      this.communityList[this.parentIndex].communitys[this.childrenIndex].comments.push({
                        commentId:d.commentId,
                        name:d.realname,
                        content:this.message,
                        upName:d.parentsRealname,
                        upUserId:d.parentsUid,
                        userId:d.uid
                      });
                    }else {
                      this.communityList[this.parentIndex].communitys[this.childrenIndex].comments.push({
                        commentId:d.commentId,
                        name:d.realname,
                        content:this.message,
                        userId:d.uid
                      });
                    }
                    this.message = '';
                    // console.log(res)
                  }
                })
      },
      hidebox(){
        let timer = setTimeout(()=>{
          if (!this.sendOperate){
            clearTimeout(timer)
            this.focusState = false
          }
        },100);
      },
      tHeight (val) {
        if(this.originHeight > val + 100) {        //加100为了兼容华为的返回键
          this.control = false;
        }else{
          this.control = true;
        }
      },
    },
    updated() {
      if (this.$refs.element) {
        let heightStyle = this.$refs.element.clientHeight;
        //let boxHeight = this.$refs.boxheight.clientHeight;
        //console.log(this.$refs);
        if (heightStyle > 60) {
          this.show = true
        } else {
          this.show = false
        }
      }
    },
    mounted() {
      let self = this;
      window.onresize = function() {
        return (function(){
          self.screenHeight = document.documentElement.clientHeight;
        })()
      }

      const templateId = getParamFromUrlAndRoute('template_id', this.$router)
      if (templateId) {
        this.isFromTemplate = true
        this.templateId = templateId
      }
    },
    watch:{
      screenHeight :'tHeight'
    },
    directives: {
      focus: {
        update: function (el, {value}) {
          if (value) {
            el.focus()
          }
        }
      }
    },
    computed: {
      bgheight: {
        get() {
          let height = document.documentElement.clientHeight;
          return { height: `${height}px` }
        },
      },
      scopedClassList() {
        return (listArr) => {
          let jArr = listArr.join(', ');
          return jArr
        }
      },
    },
  }
</script>

<style scoped lang="less">
  #community-index-school {
    font-size: 0.12rem;
    width: 100%;

    .bg {
      background-color: #ddd;
      opacity: .4;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 10;
    }

    .go-back {
      position: relative;

      .van-nav-bar {
        background-color: #3770FB;

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

      .downmenu {
        position: absolute;
        top: 0.42rem;
        right: 0.1rem;
        z-index: 11;
        width: 1rem;
        background-color: #fff;
        padding: 0 0.1rem;
        border-radius: 0.03rem;
        box-sizing: border-box;

        span {
          display: block;
          font-size: 0.16rem;
          color: #666;
          border-bottom: 0.01rem solid #ddd;
          padding: 0.08rem 0;
          text-align: center;
        }

        span:last-child {
          border-bottom-width: 0;
        }

        i {
          position: absolute;
          top: -0.09rem;
          right: 0.1rem;
          border: 0.05rem solid transparent;
          border-bottom-color: #fff;
        }
      }
    }

    .banner {
      width: 100%;
      max-height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        max-height: 200px;
        object-fit: cover;
      }
    }

    .content {
      width: 100%;
      padding: 0.2rem 0.16rem 0;
      box-sizing: border-box;
      background-color: #fff;
      /*position: relative;*/

      .community-list {
        overflow: hidden;
        border-bottom: 0.02rem solid #eee;
        padding-bottom: 0.14rem;

        .avatar {
          float: left;
          margin-right: 0.1rem;
          width: 0.42rem;
          height: 0.42rem;
          border-radius: 0.05rem;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            float: left;
            object-fit: cover;
          }
        }

        .detail {
          float: left;
          width: 2.89rem;

          .top-t {
            overflow: hidden;
            line-height: 0.22rem;
            margin-bottom: 0.04rem;

            .title {
              float: left;
              font-size: 0.16rem;
              color: #333;
            }

            .type {
              float: right;
              font-size: 0.14rem;
              color: #666;
            }
          }

          .desc {
            width: 100%;
            margin-bottom: 0.1rem;

            .text {
              font-size: 0.14rem;
              color: #666;
              line-height: 0.2rem;
              /*max-height: 0.6rem;*/
              overflow: hidden;
            }

            .text.active {
              max-height: initial;
              overflow: auto;
            }

            .all {
              font-size: 0.14rem;
              color: #7588B1;
              line-height: 0.2rem;
            }
          }

          .list {
            /*width: 100%;*/
            margin-left: -0.1rem;
            overflow: hidden;

            .items {
              float: left;
              width: 0.9rem;
              height: 0.9rem;
              margin: 0 0 0.1rem 0.09rem;

              img {
                width: 100%;
                height: 100%;
                float: left;
                object-fit: cover;
              }
            }
          }

          .video {
            width: 100%;
            /*margin-left: -0.1rem;*/
            overflow: hidden;

            .items {
              position: relative;
              float: left;
              width: 0.9rem;
              height: 0.9rem;
              margin: 0 0.1rem 0.1rem 0;

              video {
                width: 100%;
                height: 100%;
                float: left;
                object-fit: fill;
              }

              .play-video {
                font-size: 0.2rem;
                color: #fff;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 0.18rem;
                height: 0.18rem;
              }
            }
          }

          .dips {
            width: 100%;
            /*margin-bottom: 0.1rem;*/
            /*overflow: hidden;*/

            .read-info {
              font-size: 0.12rem;
              color: #999;
              line-height: 0.18rem;
              margin-bottom: 0.03rem;

              .no-read {
                font-size: 0.12rem;
                color: #d00000;
              }

              .read {
                font-size: 0.12rem;
                color: #3770fb;
              }
            }

            .time {
              font-size: 0.12rem;
              color: #999;
              line-height: 0.18rem;
              margin-bottom: 0.03rem;
            }

            .view-scoped {
              width: 100%;
              position: relative;

              .cl-list:after {
                content: '';
                display: block;
                clear: both;
              }

              .cl-list {
                .title {
                  float: left;
                  font-size: 0.12rem;
                  color: #999;
                  line-height: 0.18rem;
                }

                .li-con {
                  float: left;
                  max-width: 1.9rem;
                  font-size: 0.12rem;
                  color: #999;
                  line-height: 0.18rem;
                }

                .operate {
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  height: 0.14rem;
                  font-size: 0.14rem;
                  color: #53ACF8;
                  padding: 0 0.08rem;
                  border-radius: 0.05rem;
                  background-color: #e7e7e7;
                  overflow: hidden;

                  i {
                    float: left;
                    width: 100%;
                    text-align: center;
                  }
                }

                .show {
                  position: absolute;
                  bottom: -0.1rem;
                  right: 0.4rem;
                  padding: 0.1rem 0.1rem;
                  background-color: #000;
                  font-size: 0.12rem;
                  color: #fff;
                  border-radius: 0.05rem;
                  box-sizing: border-box;
                  /*width: 0;*/

                  .triangle {
                    border: 0.07rem solid transparent;
                    border-left-color: #000;
                    position: absolute;
                    right: -0.12rem;
                    top: 0.1rem;
                  }
                }

                .show.show-enter-active, .show.show-leave-active {
                  transition: all 1s;
                }

                .show.show-enter {
                  opacity: 0;
                }

                .show.show-leave-to {
                  opacity: 0;
                }

                .show.show-enter-to {
                  opacity: 1;
                }

                .show.show-leave {
                  opacity: 1;
                }
              }
            }
          }

          .give-like {
            width: 100%;
            font-size: 0.12rem;
            color: #7588B1;
            line-height: 0.17rem;
            padding: 0.06rem 0.12rem;
            box-sizing: border-box;

            .iocn {
              margin-right: 0.09rem;
            }
          }

          .comments {
            border-top: 0.01rem solid #ddd;
            padding-top: 0.05rem;
            .list {
              font-size: 0.12rem;
              color: #999;
              line-height: 0.18rem;
              position: relative;
              .clk-com{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
                label{
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                }
              }
              .name, .name-f {
                color: #53ACF8;
              }
            }
          }
        }
      }
    }

    .audit {
      width: 0.5rem;
      height: 0.5rem;
      position: fixed;
      bottom: 0.15rem;
      right: 0.26rem;
      border-radius: 50%;
      background-color: #3770FB;
      padding: 0.06rem 0.08rem;
      text-align: center;
      box-sizing: border-box;
      z-index: 11;

      .btn {
        position: relative;
        font-size: 0.14rem;
        color: #fff;

        strong {
          position: absolute;
          top: -0.15rem;
          left: 0.2rem;
          font-size: 0.12rem;
          color: #fff;
          padding: 0.01rem 0.03rem;
          border-radius: 0.1rem;
          background-color: #D80000;
        }
      }
    }
    .comment-ipt{
      position: fixed;
      width: 100%;
      left: 0;
      bottom: -1rem;
      overflow: hidden;
      border: 1px solid #ddd;
      background-color: #fff;
      /deep/.van-cell.van-field{
        float: left;
        width: 80%;

      }
      button{
        // float: right;
        min-width: 0.5rem;
        margin-left: 0.1rem;
        position: absolute;
        top: 50%;
        right: 0.1rem;
        transform: translateY(-50%);
      }
    }
  }
</style>

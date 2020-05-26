<template>
  <div id="community">
    <div class="go-back">
      <van-nav-bar
        title="互动社区"
        :left-text="!isFromTemplate ? '返回' : ''"
        :left-arrow="!isFromTemplate"
        @click-left="onClickLeft"
      />
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"

    >
      <div v-if="Array.isArray(banner) && banner.length > 0" class="banner">
        <van-swipe :autoplay="5000" :show-indicators="false" :height="200">
          <van-swipe-item v-for="(url, index) in banner" :key="index">
            <img class="banner-image" :src="url" alt="banner" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!--家长端社区-->
      <div class="content" v-if="communityList.length>0">
        <div v-for="(item, index) in communityList" :key="index">
          <div class="community-list" v-for="(val, ix) in item.communitys" :key="ix">
            <div class="avatar" @click="enterMyCommunity(val.utype,val.uid)">
              <img :src="val.avatar" alt="">
            </div>
            <div class="detail">
              <div class="top-t">
                <span class="title" @click="enterMyCommunity(val.utype,val.uid)">{{val.name}}</span>
                <span class="type">{{val.type}}</span>
              </div>
              <!--<span class="title">111111</span>-->
              <div class="desc">
                <div class="text" :class="setClass?'active':''">
                  <div class="ct" ref="element">
                    {{val.content}}
                  </div>
                </div>
                <span class="all" v-if="show" @click="showAllText">{{showText}}</span>
              </div>
              <div class="list" v-if="val.imgUrl">
                <div class="items" v-for="(img,imgIndex) in val.imgUrl" :key="imgIndex">
                  <img :src="img" alt="" @click="preview(val.imgUrl, imgIndex)">
                </div>
              </div>
              <div class="video" v-if="val.video&&JSON.stringify(val.video)!=='{}' && !(Array.isArray(val.video))">
                <div class="items" @click="playerVideo(val.video.url, val.video.image)">
                  <video :src="val.video.url" :poster="val.video.image">您的浏览器不支持 video 标签。</video>
                  <span class="play-video"><van-icon name="play-circle-o"/></span>
                </div>
              </div>
              <div class="dips">
                <span class="time">{{val.date}} {{val.time}}</span>
                <!--<span class="comments">评论</span>-->
                <span class="operate" @click="toggle(val.likeShow,ix,index)"><van-icon
                    name="ellipsis"/></span>
               <!-- <span class="praise" @click="likes(ix,index,val.communityId)"><van-icon name="like-o"/> <strong>{{val.isLike?'取消':'赞'}}</strong></span>-->
                <transition name="show">
                  <div class="show" v-show="val.likeShow">
                    <span @click="likes(ix,index,val.communityId)"><van-icon name="like-o"/> {{val.isLike?'取消':'赞'}}</span>
                    <span v-if="commentSwitch>0" style="margin-left: 0.5rem" @click="commentsOpt(ix,index,val.communityId)"><label
                        for="ipt-comm">评论</label></span>
                    <span class="triangle"></span>
                  </div>
                </transition>
              </div>
              <div class="give-like">
                <div class="like-box">
                  <span class="iocn"><van-icon name="like-o"/></span>
                  <span class="person" v-for="(list, ind) in val.like" :key="ind">{{list.name}} {{val.like.length===ind+1 ? "":","}}</span>
                </div>
                <div class="comments">
                  <template v-for="(subItem, subIndex) in val.comments">
                    <div class="list" :key="subIndex" v-if="!subItem.upUserId">
                      <span class="clk-com" @click="commentsOpt(ix,index,val.communityId,subItem.commentId)"><label for="ipt-comm"></label></span>
                      <span class="name">{{subItem.name}}：</span>
                      <span class="com-content">{{subItem.content}}</span>
                    </div>
                    <div class="list" :key="subIndex" v-if="subItem.upUserId">
                      <span class="clk-com" @click="commentsOpt(ix,index,val.communityId,subItem.commentId)"><label for="ipt-comm"></label></span>
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
    <Player v-on:hidePlay="hidePlay" :state="palyerShow" :video-url="videoUrl" :poster="poster" v-if="palyerShow"></Player>
  </div>
</template>

<script>
import { NavBar, Icon, List, ImagePreview,Button, Field, Toast, SwipeItem, Swipe } from 'vant';
import Player from '../../common/player'
import { likes, commentDynamic } from '../../../api/school/community'
import { selectCommunityList } from '@/api/parent/community'
import { getParamFromUrlAndRoute, isEmpty } from '@/utils'

export default {
  name: "community",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [List.name]: List,
    [Button.name]:Button,
    [Field.name]:Field,
    [Toast.name]:Toast,
    Player: Player,
    vanSwipeItem: SwipeItem,
    vanSwipe: Swipe,
  },
  data() {
    return {
      message:'',
      loading: false,
      finished: false,
      show: false,
      setClass: false,
      showText: '全文',
      page: 1,//当前页
      type: 0,//查询类型 0 查询所有
      commentSwitch: 1,//评论是否开启 0 关闭 1 开启 todo 现在 关闭
      palyerShow: false,//弹框视频播放
      videoUrl: "",//视频播放地址
      poster:"",
      communityList: [],//列表数据
      iptBotm:'-1rem',
      focusState:false,//获取焦点状态
      commentsid:'',//当前评论id
      parCommentsid:'',//回复评论id
      parentIndex:null,//记录评论的是那个时间段的 动态 todo 评论成功不刷新页面
      childrenIndex:null,//记录评论的当前时间段下的哪条数据 todo 评论成功不刷新页面
      sendOperate:false,//点击发送操作
      banner: [],

      isFromTemplate: false,
      templateId: 0,
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    showAllText() {
      //console.log(111);
      if (this.setClass) {
        this.setClass = false;
        this.showText = '全文'
      } else {
        this.setClass = true;
        this.showText = '收起'
      }
    },
    enterMyCommunity(utype, uid) {
      this.$router.push({ name: 'CommunityMyCommunity', params: { utype: utype, uid: uid } })
    },
    onLoad() {
      this.selectList();
    },
    selectList() {
      selectCommunityList(this.page, this.type, this.templateId)
        .then(res => {

          if (res.status === 200) {
            if (isEmpty(this.banner) && !isEmpty(res.data.data.images)) {
              this.banner = res.data.data.images
            }
            console.log(res);
            //this.commentSwitch = res.data.config.commentSwitch;
            if (res.data.data.communityList.length > 0) {
              this.page = this.page + 1;
              for (let item of res.data.data.communityList) {
                //加个属性
                for (let i of item.communitys) {
                  i["likeShow"] = false;
                }
                this.communityList.push(item);
              }
              this.loading = false;
              if (res.data.data.communityList.length === 0) {
                this.finished = true;
              }
            } else {
              this.loading = false;
              this.finished = true;
            }
          }
        }).catch(() => {
        throw new Error("异常！")
      })
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
                id: res.data.data.uid,
                name: res.data.data.realname,
              })
            } else if (res.data.data.like === 0) {//取消
              this.communityList[index].communitys[idx].isLike = 0;
              //let index = this.communityList[index].communitys[idx].like.indexOf()
              for (let i = 0; i < this.communityList[index].communitys[idx].like.length; i++) {
                if (this.communityList[index].communitys[idx].like[i].id === res.data.data.uid) {
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
      if (this.message){
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
      } else {
        Toast("请输入评论内容")
      }

    },
    hidebox(){
      let timer = setTimeout(()=>{
        if (!this.sendOperate){
          clearTimeout(timer)
          this.focusState = false
        }
      },100);
    },

  },
  mounted() {
    const templateId = getParamFromUrlAndRoute('template_id', this.$router)
    if (templateId) {
      this.isFromTemplate = true
      this.templateId = templateId
    }
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
  updated() {
    //获取元素内联样式值
    if (this.$refs.element) {
      let heightStyle = this.$refs.element.clientHeight;
      //console.log(this.$refs);
      if (heightStyle > 60) {
        this.show = true
      } else {
        this.show = false
      }
    }
  },
}
</script>

<style scoped lang="less">
#community {
  font-size: 0;
  width: 100%;

  .go-back {
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
  }

  .content {
    > div {
      width: 100%;
      padding: 0 0.16rem 0;
      box-sizing: border-box;
      background-color: #fff;
    }

    .community-list {
      overflow: hidden;
      border-bottom: 0.02rem solid #eee;
      padding-top: 0.14rem;
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
            color: #999;
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
          width: 100%;
          margin-left: -0.1rem;
          overflow: hidden;

          .items {
            float: left;
            width: 0.9rem;
            height: 0.9rem;
            margin: 0 0 0.1rem 0.1rem;

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
          /*width: 100%;*/
          /*margin-bottom: 0.1rem;*/
          /*overflow: hidden;*/
          &:after{
            content: '';
            display: block;
            clear: both;
          }
          position: relative;

          .time {
            float: left;
            font-size: 0.12rem;
            color: #999;
          }

          .comments {
            float: right;
            font-size: 0.12rem;
            color: #999;
            margin-left: 0.1rem;
          }

         /* .praise {
            float: right;
            font-size: 0.12rem;
            color: #3770FB;

            strong {
              color: #999;
              font-weight: 400;
              margin-left: 0.08rem;
            }

            i {
              position: relative;
              top: 0.02rem;
            }
          }*/
          .operate {
            /*position: absolute;
            right: 0;
            bottom: 0;*/
            float: right;
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

        .give-like {
          width: 100%;
          font-size: 0.12rem;
          color: #7588B1;
          line-height: 0.17rem;
          padding: 0.06rem 0.12rem;
          box-sizing: border-box;

          .iocn {
            margin-right: 0.04rem;
          }

          .person {
            margin-left: 0.05rem;
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
</style>

<template>
  <div id="add-community-school">
    <!--校长端 新增社区-->
    <div class="go-back">
      <van-nav-bar
              title="新增"
              left-text="返回"
              left-arrow
              @click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <div class="top-box">
        <p class="title">发布内容</p>
        <van-field
                v-model="message"
                type="textarea"
                placeholder="请输入内容"
                rows="3"
                autosize
        />
      </div>
      <div class="content-type" v-if="typeArr.length>0">
        <p class="title">类型</p>
        <div class="type-list">
          <van-row gutter="20">
            <van-col span="8" v-for="(item,index) in typeArr" :key="index">
              <span class="btn-group" :class="item.active?'active':''"  @click="infoType(index)">{{item.name}}</span>
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="upload-img">
        <p class="title">图片</p>
        <div class="img-box">
          <div class="img-list">
            <wechatImageUploader
                    class="uploader"
                    ref="image-uploader"
                    v-model="imageList"
                    item-width=".5rem"
                    trigger-class="image-uploader-trigger"
                    upload-immediately />
            <!--<draggable v-model="imgArr" @update="datadragEnd" :options = "{animation:500}">-->
            <!--<transition-group>-->
            <!--<div class="img" v-for="(item,index) in imgArr" :key="index" >-->
            <!--<span class="close" @touchstart.prevent="delImg(item.src)" @touchend="cleartime"><van-icon name="close" /></span>-->
            <!--<img :src="item.src" alt="" v-if="item.type==='image'" @click="preview(index)">-->
            <!--</div>-->
            <!--</transition-group>-->
            <!--</draggable>-->
            <!--<div class="upload" :class="imgArr.length>0?'curr':''" v-if="imgArr.length<9">-->
            <!--<van-uploader :after-read="onRead" accept="image/png,image/jpeg" multiple>-->
            <!--<van-icon name="plus" />-->
            <!--</van-uploader>-->
            <!--</div>-->
          </div>

        </div>
      </div>
      <div class="upload-video">
        <p class="title" style="float:left;">视频</p>
        <button class="uploadBtn" @click="showWebrtc = true" style="font-size: 0.12rem" v-if="videoArr.length===0" >录制上传</button>
        <div class="video-box">
          <div class="video-list" v-if="videoArr.length>0" >
            <div class="video" v-for="(item,index) in videoArr" :key="index" @click="showPlay">
              <span class="close" @touchstart.prevent="delVedio" @touchend="cleartime"><van-icon name="close" /></span>
              <video :src="item.src" v-if="item.type==='video'">
                您的浏览器不支持 video 标签。
              </video>
              <span class="close-play"><van-icon name="play-circle-o" /></span>
            </div>
          </div>
          <div class="upload" :class="videoArr.length>0?'curr':''" v-if="videoArr.length===0">
            <van-uploader :after-read="onReadVideo" multiple accept="video/mp4">
              <van-icon name="plus" />
            </van-uploader>
          </div>
        </div>
        <div style="height: 0.1rem"></div>
        <div>
          <van-progress :percentage="progress" />
        </div>
      </div>
      <div class="scoped-set" v-if="classArr.length>0">
        <p class="title">可见的范围</p>
        <div class="class-list">
          <van-row gutter="20">
            <van-col span="8" v-for="(item,index) in classArr" :key="index">
              <span class="btn-group" :class="item.active?'active':''"  @click="btnfun(item.active,index)">{{item.name}}</span>
            </van-col>
          </van-row>
          <!--<span v-for="(item,index) in classArr" :key="index">
              <span class="btn-group" :class="item.active?'active':''"  @click="btnfun(item.active,index)">{{item.name}}</span>
          </span>-->
        </div>
      </div>
    </div>
    <webrtc v-if="showWebrtc === true"
            style="
                position: fixed;
                z-index: 999;
                top: 0;
                width: 100vw;
                text-align: center;"
            :showWebrtc="showWebrtc"
            @close="close()"
            @uploadwebrtc="uploadwebrtc"
    ></webrtc>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
    <Player v-on:hidePlay="hidePlay" :state="palyerShow" :video-url="videoArr[0].src" v-if="palyerShow"></Player>
  </div>

</template>

<script>
  import { NavBar,Field,Uploader,Icon,Toast,ImagePreview,Row, Col,Progress } from 'vant';
  import FooterBtn from '../../common/footer-operate-btn'
  import Player from '../../common/player'
  import wechatImageUploader from '@/components/common/wechat-image-uploader'
  import draggable from 'vuedraggable'
  import webrtc from '../../common/webrtc-recording'
  import { addCommunityInfo, basicInfoConfig } from '@/api/school/community'
  import { getUploadOssUrl } from '@/api/common'
  export default {
    name: "add-community",
    components:{
      [NavBar.name]:NavBar,
      [Field.name]:Field,
      [Uploader.name]:Uploader,
      [Icon.name]:Icon,
      [Toast.name]:Toast,
      [Row.name]:Row,
      [Col.name]:Col,
      [Progress.name]:Progress,
      FooterBtn:FooterBtn,
      Player:Player,
      draggable:draggable,
      wechatImageUploader,
      webrtc: webrtc,
    },
    data(){
      return{
        palyerShow:false,
        message:"",
        typeArr:[],
        typing:'',//选中的类型id
        classArr:[
          {
            id:1,
            name:"全选",
            active:false
          }
        ],
        classing:[],//选中的班级id
        chooseBtn:false,
        btnText:[
          {
            type:1,
            title:'发布动态'
          }
        ],
        imageList: [],
        imgArr:[],//保存本地上传的图片
        videoArr:[],//保存本地上传的视频
        upImg:[],//保存上传成功的图片地址
        upKey:[],//保存上传成功的图片对应的key
        vedioKey:'',//保存上传成功的视频key
        loop:null,

        progress:0,
        stop:0,

        // 录像界面参数
        showWebrtc:false,
        webrtcUrl:null,
        WebRtcBase64:null

      }
    },
    methods:{
      close(msg){
        this.showWebrtc = msg
      },
      // webrtc录制视频上传
      uploadwebrtc(msg){
        if(msg){
          this.WebRtcBase64 = new FileReader();
          this.WebRtcBase64.readAsDataURL(msg);
          this.uploadWebRtcFile(11,msg)
          console.log("上传参数",msg, this.WebRtcBase64)
        }
      },
      uploadWebRtcFile(fileType, fileUrl) {
        this.$loading()
        getUploadOssUrl(fileType, undefined, 1)
                .then(res => {
                  // console.log(event)
                  if (res.data.meta && res.data.meta.code === 0) {
                    this.axios.put(res.data.data[0].url, fileUrl , {
                      headers: { 'Content-Type': res.data.data[0].type },
                      // withCredentials:true,
                      onUploadProgress: progressEvent => {
                        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0);
                        // console.log(complete)  //complete是一个变化的值，最大100上传完成
                        this.progress = complete  //赋值，进度条变化，通过值或者其他事件还可以用showp使得进度条是否隐藏
                      }
                    }).then(response => {

                      // console.log(this.turnBase64(fileUrl))
                      this.$loadingHide();
                      if (response.status === 200) {
                        Toast.success({
                          forbidClick: true, // 禁用背景点击
                          loadingType: "success",
                          position:'middle',
                          message: "上传成功"
                        });
                        if (fileType === 11) {
                          this.vedioKey = res.data.data[0].key;
                          this.videoArr.push({
                            src: this.WebRtcBase64.result,
                            type: 'video',
                          });
                        } else {
                          this.upImg.push(fileUrl);
                          this.upKey.push(res.data.data[0].key);
                          this.imgArr.push({
                            src: fileUrl,
                            type: 'image',
                          });
                        }
                      } else {
                        Toast.fail('上传失败')
                      }
                    })
                  }
                }).catch(() => {
          throw new Error("异常2！")
        })
      },

      onClickLeft(){
        this.$router.back(-1)
      },
      //隐藏播放界面
      hidePlay(bl){
        //console.log(bl)
        this.palyerShow = bl;
      },
      //显示播放界面
      showPlay(){
        let timer = setTimeout(()=>{
          this.palyerShow = true;
          clearTimeout(timer)
        },500)
      },
      //提交
      operateBtn(){
        // 每天10点-12点 16点-18点期间禁止发送审核社区
        // if ([10, 11, 16, 17].includes(new Date().getHours())) {
        //   this.$toast('由于当前发送社区人数较多，现发送会影起延迟或发送失败，请稍等30分钟后再发送或审核')
        //   return
        // }

        if (!this.message){
          Toast.fail("请输入内容")
        }else if (!this.typing){
          Toast.fail("请选择类型")
        }else if (this.classing.length===0){
          Toast.fail("请选择可见范围")
        }else {
          this.$dialog.confirm({
            title: '提示',
            message: '确定提交？'
          }).then(() => {
            // on confirm
            this.submitInfo();
          }).catch(() => {
            // on cancel
          });
        }
      },
      //获取基本信息
      infoData(){
        this.$loading();
        basicInfoConfig()
                .then(res=>{
                  // console.log(res);

                  if (res.status === 200) {
                    for (let item of res.data.data.clsList) {
                      this.classArr.push({
                        id:item.id,
                        name:item.name,
                        active:false
                      })
                    }
                    for (let item of res.data.data.type) {
                      this.typeArr.push({
                        id:item.value,
                        name:item.name,
                        active:false
                      })
                    }
                  }
                }).catch(()=>{
          throw new Error("异常!")
        })
      },
      //上传图片
      onRead(file){
        //console.log(file);
        if (Array.isArray(file)){
          for (let item of file){
            if (item.file.type.split('/')[0] === 'image'){
              let yt = item.file.type.split('/')[1];
              let type = yt.toLowerCase()==='jpg'||yt.toLowerCase()==='jpeg' ? 1 : yt.toLowerCase()==='png'? 2 : '';
              this.uploadFile(type, item.content)
            }
          }
        }else {
          if (file.file.type.split('/')[0] === 'image'){
            let yt = file.file.type.split('/')[1];
            let type = yt.toLowerCase()==='jpg'||yt.toLowerCase()==='jpeg' ? 1 : yt.toLowerCase()==='png'? 2 : '';
            this.uploadFile(type, file.content)
          }
        }
      },
      //上传视频
      onReadVideo(file){
        if(this.stop === 0){
          if(file.file.size < 30720000) {
            if (Array.isArray(file)) {
              for (let item of file) {
                if (item.file.type.split('/')[0] === 'video') {
                  this.uploadFile(11, item.content)
                }
              }
            } else {
              if (file.file.type.split('/')[0] === 'video') {
                this.uploadFile(11, file.content)
              }
            }
            this.stop = 1
          }
          else{
            alert("视频文件过大")
          }
        }
        else if (this.stop === 1)
        {
          Toast.fail('已有视频上传中，请稍等~')
        }
      },
      //选择可见范围
      btnfun(item,index){
        // 如果点击的全选
        if (!item && index === 0){
          for(let i=0;i<this.classArr.length;i++){
            this.classArr[i].active = true;
            if (i !== 0) {
              this.classing.push(this.classArr[i].id)
            }
          }
        }else if (!item && index>0){
          let through = true;
          this.classArr[index].active = true;
          this.classing.push(this.classArr[index].id);
          for (let i=1;i<this.classArr.length;i++){
            if (!this.classArr[i].active){
              through = false;
            }
          }
          if (through){
            this.classArr[0].active = true;
          }
        }else if (item){
          this.classArr[index].active = false;
          this.classArr[0].active = false;
          let idx = this.classing.indexOf(this.classArr[index].id);
          this.classing.splice(idx,1)
        }
      },
      //选择类型
      infoType(index){
        if (this.typeArr[index].active) {
          this.typeArr[index].active = false;
          this.typing = ''
        }else {
          this.typeArr[index].active = true;
          this.typing = this.typeArr[index].id
        }
        for (let i=0;i< this.typeArr.length;i++){
          if (i !== index){
            this.typeArr[i].active = false;
          }
        }
      },
      // base64 转 二进制
      turnBase64(dataURI){
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
        let byteString = atob(dataURI.split(',')[1]); //base64 解码
        let arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
        let intArray = new Uint8Array(arrayBuffer); //创建视图

        for (let i = 0; i < byteString.length; i++) {
          intArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([intArray], {type: mimeString});
        // let arr = dataURI.split(','), mime = arr[0].match(/:(.*?);/)[1],
        //   bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        // while(n--){
        //   u8arr[n] = bstr.charCodeAt(n);
        // }
        // return new Blob([u8arr], {type:mime});
      },
      /**
       * 上传图片与视频
       * @param fileType 文件类型 1 jpg 2 png 11 mp4
       * @param fileUrl 图片的url
       */
      uploadFile(fileType, fileUrl){
        //console.log(this.turnBase64(this.imgArr[0].src));

        getUploadOssUrl(fileType, undefined, 1)
                .then(res=>{
                  //console.log(res);
                  if (res.data.meta && res.data.meta.code === 0){
                    this.axios.put(res.data.data[0].url,this.turnBase64(fileUrl),{headers:{'Content-Type':res.data.data[0].type},
                      onUploadProgress: progressEvent => {
                        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0);
                        console.log(complete)  //complete是一个变化的值，最大100上传完成
                        this.progress = complete  //赋值，进度条变化，通过值或者其他事件还可以用showp使得进度条是否隐藏
                      }
                    }).then(response=>{
                      //console.log(resp)

                      if (response.status === 200){
                        Toast.success({
                          forbidClick: true, // 禁用背景点击
                          loadingType: "success",
                          position:'middle',
                          message: "上传成功"
                        });
                        if (fileType === 11){
                          this.vedioKey = res.data.data[0].key;
                          this.videoArr.push({
                            src:fileUrl,
                            type:'video'
                          });
                        }else {
                          this.upImg.push(fileUrl);
                          this.upKey.push(res.data.data[0].key);
                          this.imgArr.push({
                            src:fileUrl,
                            type:'image'
                          });
                        }
                      }else {
                        Toast.fail('上传失败')
                      }

                    })
                  }
                }).catch(()=>{
          throw new Error("异常！")
        })
      },
      //删除图片
      delImg(fileUrl){
        clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
        this.Loop = setTimeout(function() {
          this.$dialog.confirm({
            title: '提示',
            message: '确定删除当前图片？'
          }).then(() => {
            // on confirm
            let index = this.upImg.indexOf(fileUrl);
            if (index>-1){
              this.upImg.splice(index,1);
              this.upKey.splice(index,1)
            }
            for (let i=0;i<this.imgArr.length;i++){
              if (this.imgArr[i].src === fileUrl){
                this.imgArr.splice(i,1)
              }
            }
          }).catch(() => {
            // on cancel
          });
        }.bind(this), 10);
      },
      //删除视频
      delVedio(){
        clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
        this.Loop = setTimeout(function() {
          this.$dialog.confirm({
            title: '提示',
            message: '确定删除当前视频？'
          }).then(() => {
            // on confirm
            this.videoArr.splice(0,1);
            this.vedioKey = '';
            this.progress = 0
            this.stop = 0
          }).catch(() => {
            // on cancel
          });
        }.bind(this), 10);
      },
      cleartime() {
        // 这个方法主要是用来将每次手指移出之后将计时器清零
        clearInterval(this.Loop);
      },
      //提交
      submitInfo(){
        if (this.$refs['image-uploader'].isUploading) {
          this.$toast('图片正在上传中, 请稍等...')
          return false
        }
        this.$loading()
        const ossKeys = this.imageList.map(image => image.ossKey)
        addCommunityInfo({content:this.message,imgUrl:ossKeys,clsId:this.classing,type:this.typing,videoUrl:this.vedioKey})
                .then(res=>{
                  this.$loadingHide()
                  if (res.status === 200){
                    let toast = Toast.success({
                      forbidClick: true, // 禁用背景点击
                      loadingType: "success",
                      position:'middle',
                      message: "发布成功"
                    });
                    const timer = setInterval(() => {
                      clearInterval(timer);
                      toast.clear();
                      this.$router.push({name:'Community'});
                    }, 2000);
                  }else {
                    Toast.fail("发布失败");
                  }
                }).catch(()=>{
          throw new Error("异常！")
        })
      },
      //图片 预览
      preview(index){
        let img = [];
        for (let item of this.imgArr) {
          img.push(item.src)
        }
        ImagePreview({
          images: img,
          startPosition: index ? index : 0,
          lazyLoad:false
        });
      },
      //拖动排序
      datadragEnd (evt) {
        evt.preventDefault();
        /*console.log('拖动前的索引 :' + evt.oldIndex)
        console.log('拖动后的索引 :' + evt.newIndex)*/
        //console.log(this.category);
        //console.log(this.imgArr)
      }
    },
    created(){
      // 每天10点-12点 16点-18点期间禁止发送审核社区
      // if ([10, 11, 16, 17].includes(new Date().getHours())) {
      //   this.$toast('由于当前发送社区人数较多，现发送会影起延迟或发送失败，请稍等30分钟后再发送或审核')
      //   this.$router.back()
      //   return
      // }

      this.infoData()
      //this.selectTypeDt()
    }
  }
</script>

<style scoped lang="less">
  #add-community-school{
    font-size: 0;
    background-color: #fff;
    .go-back{
      .van-nav-bar{
        background-color:#3770FB;
        .van-icon{
          font-size: 0.22rem;
          color: #fff;
        }
        .van-nav-bar__text{
          font-size: 0.16rem;
          line-height: 0.22rem;
          color: #fff;
          font-weight: 400;
        }
        .van-nav-bar__title{
          color: #fff;
          font-weight: 400;
        }
      }
    }
    .content{
      padding: 0 0.16rem 0.4rem;
      box-sizing: border-box;
      .title{
        font-size: 0.14rem;
        color: #666;
        line-height: 0.2rem;
        margin-bottom: 0.1rem;
      }
      .top-box{
        padding: 0.1rem 0 0.16rem;
        border-bottom: 0.02rem solid #eee;
        box-sizing: border-box;
      }
      .content-type,.scoped-set{
        padding: 0.16rem 0;
        border-bottom: 0.02rem solid #eee;
        box-sizing: border-box;
        .type-list,.class-list{
          /*margin-right: -0.2rem;*/
          .btn-group{
            display: inline-block;
            font-size: 0.14rem;
            color: #fff;
            width: 1rem;
            height: 0.26rem;
            line-height: 0.26rem;
            border-radius: 0.03rem;
            /*margin-right: 0.2rem;*/
            margin-bottom: 0.12rem;
            overflow: hidden;
            background-color: #D6D6D6;
            text-align: center;
          }
          .btn-group.active{
            background-color: #3770FB;
          }
        }
      }
      .upload-img,.upload-video{
        padding: 0.16rem 0;
        border-bottom: 0.02rem solid #eee;
        box-sizing: border-box;
        .img-box,.video-box{
          /*overflow: hidden;*/
          min-height: 0.6rem;
          content: "";
          display: table;
          clear: both;
          .img-list,.video-list{
            float: left;
            /*margin-left: -0.18rem;*/
            .img,.video{
              float: left;
              width: 0.6rem;
              height: 0.6rem;
              margin-right: 0.18rem;
              margin-bottom: 0.18rem;
              position: relative;
              .close{
                font-size: 0.2rem;
                color: #f00;
                width:0.2rem;
                height: 0.2rem;
                position: absolute;
                top: -0.06rem;
                right: -0.07rem;
                /*background-color: #eee;*/
                border-radius: 50%;
                z-index: 1;
                i{
                  float: right;
                }
              }
              img,video{
                float: left;
                width: 100%;
                height: 100%;
              }
              video{
                object-fit: fill
              }
              .close-play{
                font-size: 0.2rem;
                color: #fff;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 0.18rem;
                height: 0.18rem;
              }
            }
          }
          .img-list>div{
            float: left;
          }
          .upload{
            float: left;
            width: 0.3rem;
            height: 0.3rem;
            /*padding: 0.06rem;*/
            font-size: 0.2rem;
            margin-top: 0.15rem;
            margin-left: 0.1rem;
            color: #d6d6d6;
            border: 0.01rem solid #d6d6d6;
            box-sizing: border-box;
            position: relative;
            .van-uploader{
              position: absolute;
              top: 50%;
              left: 50%;
              width: 0.2rem;
              height: 0.22rem;
              transform: translate(-50%,-50%);
            }
          }
          .upload.curr{
            /*margin-left: 0.18rem;*/
          }
        }
      }
    }
  }
  .uploader /deep/ .image-uploader-trigger {
    width: 0.3rem!important;
    height: 0.3rem!important;
    font-size: 0.2rem;
    color: #d6d6d6;
    border: 0.01rem solid #d6d6d6;
    box-sizing: border-box;
    position: relative;
  }
  .uploadBtn{
    font-size: 0.12rem;
    color: white;
    float: right;
    background: #3770fb;
    border: none;
    padding: 0.02rem;
    border-radius: 4px;
    line-height: 0.2rem;
  }
  button {
    margin: 0 3px 10px 0;
    padding-left: 2px;
    padding-right: 2px;
    width: 99px;
  }

  button:last-of-type {
    margin: 0;
  }

  p.borderBelow {
    margin: 0 0 20px 0;
    padding: 0 0 20px 0;
  }

  video {
    vertical-align: top;
    --width: 25vw;
    width: var(--width);
    height: calc(var(--width) * 0.5625);
  }

  video:last-of-type {
    margin: 0 0 20px 0;
  }

  video#gumVideo {
    margin: 0 20px 20px 0;
  }
</style>

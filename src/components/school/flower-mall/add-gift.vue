<template>
  <div id="add-gift">
    <!--新增 奖品-->
    <div class="go-back">
      <van-nav-bar  title="上传新品" left-text="管理奖品" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content-form">
      <van-field v-model="gift.name" maxLength="10" placeholder="请输入奖品名称（10字以内）" />
      <van-field
          v-model="gift.description"
          type="textarea"
          placeholder="请输入奖品详细描述"
          rows="3"
          autosize
      />
      <van-field
          v-model="gift.stock"
          label="奖品库存："
          placeholder="请输入奖品个数"
          type="number"
      >
        <span slot="button" class="unit">个</span>
      </van-field>
      <van-field
          v-model="gift.worth"
          label="兑换所需红花数："
          placeholder="请输入红花数"
          type="number"
      >
        <span slot="button" class="unit">朵</span>
      </van-field>
      <div class="gift-img">
        <div class="up">
          <span class="label-img">奖品图片：</span>

          <wechatImageUploader
            class="uploader"
            ref="image-uploader"
            v-model="imageList"
            :max="1"
            item-width=".5rem"
            trigger-class="image-uploader-trigger"
            upload-immediately />


          <!--v-for="(item,index) in gift.imgUrl" :key="index" @touchstart="delImg(item)" @touchend="cleartime"-->
          <!--<div class="img" @touchstart="delImg()" @touchend="cleartime" v-if="upimgUrl">-->
            <!--<img :src="upimgUrl" alt="" @click="preview">-->
          <!--</div>-->
          <!--<div class="uploader">-->
            <!--<van-uploader :after-read="onRead" accept="image/*" multiple>-->
              <!--<van-icon name="plus" />-->
            <!--</van-uploader>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
  </div>
</template>

<script>
  import { NavBar, Icon,Field,Uploader,ImagePreview,Toast } from "vant";
  import FooterBtn from '../../common/footer-operate-btn'
  import { getUploadOssUrl } from '@/api/common'
  import { addGift } from '@/api/school/safflower'
  import wechatImageUploader from '@/components/common/wechat-image-uploader'
  import { isEmpty } from '@/utils'

  export default {
    name: "add-gift",
    components:{
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Field.name]:Field,
      [Uploader.name]:Uploader,
      [Toast.name]:Toast,
      FooterBtn:FooterBtn,
      wechatImageUploader,
    },
    data(){
      return{
        gift:{
          name:'',
          worth:'',
          stock:'',
          number:'',
          imgUrl:[],
          description:''
        },
        upimgUrl:'',
        loop:null,
        btnText:[
          {
            type:1,
            title:'确定添加'
          }
        ],
        imageList: [],
        loading: false,
      }
    },
    methods:{
      onClickLeft(){
        this.$router.push({name:'SafflowerPrizeManagement'})
      },
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
      /**
       * 上传图片
       * @param fileType 文件类型 1 jpg 2 png
       * @param fileUrl 图片的url
       */
      uploadFile(fileType, fileUrl){
        let toast = Toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '正在上传'
        })
        getUploadOssUrl(fileType, undefined, 1)
          .then(res=>{
            toast.clear();
            if (res.data.meta && res.data.meta.code === 0){
              this.axios.put(res.data.data[0].url,this.turnBase64(fileUrl),{headers:{'Content-Type':res.data.data[0].type}}).then(response=>{
                if (response.status === 200){
                  Toast.success('上传成功');
                  this.gift.imgUrl[0]=res.data.data[0].key;
                  this.upimgUrl = fileUrl
                }else {
                  Toast.fail('上传失败')
                }
              })
            }
        }).catch(()=>{
          throw new Error("异常！")
        })
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
      },
      //删除图片
      delImg(){
        clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
        this.Loop = setTimeout(function() {
          this.$dialog.confirm({
            title: '提示',
            message: '确定删除当前图片？'
          }).then(() => {
            // on confirm
            this.upimgUrl = '';
            this.gift.imgUrl = [];
          }).catch(() => {
            // on cancel
          });
        }.bind(this), 1000);
      },
      cleartime() {
        // 这个方法主要是用来将每次手指移出之后将计时器清零
        clearInterval(this.Loop);
      },
      //图片 预览
      preview(){
        let img = [this.upimgUrl];
        ImagePreview({
          images: img,
          startPosition: 0,
          lazyLoad:false
        });
      },
      operateBtn(){
        if (this.$refs['image-uploader'].isUploading) {
          this.$toast('图片正在上传中, 请稍等...')
          return false
        }
        if (this.loading) {
          this.$toast('正在处理中，请稍候')
          return false
        }
        const ossKeys = this.imageList.map(image => image.ossKey)

        if (!this.gift.name){
          Toast('请输入商品名称')
        } else if (!this.gift.description){
          Toast('请输入商品描述')
        } else if (!this.gift.stock){
          Toast('请输入库存')
        } else if (!this.gift.worth){
          Toast('请输入红花数')
        } else if (isEmpty(ossKeys)){
          Toast('请上传商品图片')
        }else {
          this.$dialog.confirm({
            title: '提示',
            message: '确定新增商品？'
          }).then(() => {
            // on confirm
            this.$loading('处理中...')
            this.loading = true
            addGift({
              name:this.gift.name,
              worth:parseInt(this.gift.worth),
              stock:parseInt(this.gift.stock),
              number:parseInt(this.gift.stock),
              imgUrl: ossKeys,
              description:this.gift.description
            }).then(res=>{
              if (res.status === 200){
                Toast.success("新增成功");
                this.$router.back();
              }else {
                Toast.fail("新增失败！")
              }
            }).catch(()=>{
              throw new Error("异常！")
            })
            .finally(() => {
              this.$loadingHide()
              this.loading = false
            })
          }).catch(() => {
            // on cancel
          });
        }
      }
    }
  }
</script>

<style scoped lang="less">
#add-gift{
  font-size: 0.12rem;
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
  .content-form{
    /deep/ .van-field__label{
      max-width: 1.2rem;
    }
    .gift-img{
      width: 100%;
      padding:0 0.15rem;
      box-sizing: border-box;
      .up{
        width: 100%;
        border-bottom:1px solid #eee;
        padding: 0.15rem 0;
        overflow: hidden;
        box-sizing: border-box;
        .label-img{
          float: left;
          font-size: 0.14rem;
          color: #333;
        }
        .img{
          float: left;
          width: 0.5rem;
          height: 0.5rem;
          overflow: hidden;
          margin-left: 0.1rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .uploader {
          margin: 0;
          display: inline-flex;
        }
        /*.uploader{*/
          /*float: left;*/
          /*position: relative;*/
          /*font-size: 0.2rem;*/
          /*width: 0.3rem;*/
          /*height: 0.3rem;*/
          /*color: #d6d6d6;*/
          /*border: 1px solid #d6d6d6;*/
          /*margin-top: 0.1rem;*/
          /*margin-left: 0.1rem;*/
          /*box-sizing: border-box;*/
          /*.van-uploader{*/
            /*position: absolute;*/
            /*top: 50%;*/
            /*left: 50%;*/
            /*width: 0.2rem;*/
            /*height: 0.22rem;*/
            /*transform: translate(-50%,-50%);*/
          /*}*/
        /*}*/
      }
    }
  }
}
</style>

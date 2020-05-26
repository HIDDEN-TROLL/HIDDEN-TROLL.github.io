<template>

      <div id="commentary-types">
        <!--考勤关联学生-->
        <div class="go-back">
          <van-nav-bar title="评语类型" left-text="返回" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="top-tip">
          <div>点击可修改六个大分类的名称</div>
          <div>长按拖动可排序</div>
        </div>
        <div class="btn-list">
          <draggable v-model="category" @update="datadragEnd" :options = "{animation:500}">
            <transition-group>
              <van-row v-for="(item,index) in category" :key="index">
                <van-col span="24" >
                  <van-button type="info" @click="selectName(item.categoryId,item.categoryName)">{{item.categoryName}}</van-button>
                </van-col>
              </van-row>
            </transition-group>
          </draggable>
        </div>
        <!--修改评语类型名称-->
        <van-dialog
            v-model="show"
            title="修改类型名称"
            show-cancel-button
            confirm-button-text="修改"
            :before-close="modifyCategoryName"
        >
          <van-field v-model="CategoryName" type="text" maxlength="8" placeholder="请输入评语名称" />
        </van-dialog>
      </div>


</template>

<script>
import { NavBar, Icon, Button, Row, Col,Field,Toast } from "vant";
import draggable from 'vuedraggable'
import { commentTypeSort, modifyCommentName, selectCategory } from '@/api/school/safflower'
export default {
  name: "commentary-types",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Field.name]:Field,
    [Toast.name]:Toast,
    draggable:draggable
  },
  data() {
    return {
      category:[],
      CategoryName:'',//需要修改的名称
      CategoryId:null,//修改的id
      show:false,//修改弹出层状态
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    selectName(id, name){
      this.CategoryName = name;
      this.CategoryId = id;
      this.show = true;
    },
    selectSafflowerCategory(){
      this.$loading();
      selectCategory()
        .then(res=>{
        this.$loadingHide();
        if (res.status === 200){
          this.category = res.data.data;
        }
      }).catch(()=>{
        throw new Error("异常！")
      })
    },
    //修改评语名称
    modifyCategoryName(action, done){
      if (action === 'confirm'){
        this.$loading();
        modifyCommentName(this.CategoryId, {text:this.CategoryName})
          .then(res=>{
          this.$loadingHide();
          if (res.status === 200){
            done();
            Toast.success("修改成功");
            let timer = setTimeout(()=>{
              this.selectSafflowerCategory();
              clearTimeout(timer)
            },2900);
          }else {
            Toast.fail("修改失败")
          }
        }).catch(()=>{
          throw new Error("异常！")
        })
      }else {
        done()
      }
    },
    /*getdata (evt) {
      console.log(evt.draggedContext)
    },*/
    //拖动排序
    datadragEnd (evt) {
      evt.preventDefault();
      /*console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)*/
      //console.log(this.category);
      let arrId = [];
      for (let item of this.category){
        arrId.push(item.categoryId)
      }

      console.log(this.category)

      this.$loading();
      commentTypeSort({categoryId:arrId})
        .then(res=>{
        this.$loadingHide();
        if (res.status === 200){
          this.selectSafflowerCategory();
        }
      }).catch(()=>{
        throw new Error("异常！")
      })
    }
  },
  created() {
    //alert(this.$route.params.id)
    this.selectSafflowerCategory();
  },
  mounted () {
    //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
};
</script>

<style scoped lang="less">
#commentary-types {
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
  .top-tip {
    font-size: 0.14rem;
    text-align: center;
    line-height: 0.28rem;
    color: #333;
    padding: 0.3rem 0 0.3rem 0;
  }
  .btn-list {
    text-align: center;
    .van-row {
        padding:0 0.63rem ;
         padding-bottom: 0.13rem;
      .van-button--info {
        /*width: 2.49rem;*/
        height: 0.3rem;
        line-height: 0.3rem;
        width: 100%;
        border-radius: 3px;
      }
    }
  }
}
</style>

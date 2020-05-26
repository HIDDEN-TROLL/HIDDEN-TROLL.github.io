<template>
  <div id="type-management">
    <!--类型管理-->
    <div class="go-back">
      <van-nav-bar
        title="类型管理"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <p class="prompt">选择类型可进行删除或修改</p>
    <div class="content" v-if="typeList.length>0">
      <span class="title" :class="item.curr?'active':''" v-for="(item,index) in typeList" :key="index"
            @click="chooseType(item.value, index, item.curr, item.name)">{{item.name}}</span>
    </div>
    <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
    <van-dialog
      v-model="show"
      title="新增类型"
      show-cancel-button
      @confirm="addConfirm"
    >
      <van-field v-model="value" placeholder="请输入类型名称"/>
    </van-dialog>
    <van-dialog
      v-model="modifyShow"
      title="修改类型"
      show-cancel-button
      @confirm="modifyType"
    >
      <van-field v-model="modifyValue" placeholder="请输入类型名称"/>
    </van-dialog>
  </div>
</template>

<script>
import { NavBar, Field, Toast } from 'vant';
import FooterBtn from '../../common/footer-operate-btn'
import { addType, deleteType, modifyType, selectTypeList } from '@/api/school/community'

export default {
  name: "type-management",
  components: {
    [Field.name]: Field,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    FooterBtn: FooterBtn,
  },
  data() {
    return {
      show: false,//显示新增弹框
      modifyShow: false,//显示修改弹框
      value: '',//保存新增类型名称
      btnText: [
        {
          type: 1,
          title: '新增类型',
        },
        {
          type: 2,
          title: '修改类型',
        },
        {
          type: 3,
          title: '删除类型',
        },
      ],
      typeList: [],//保存类型
      typeId: null,//保存当前选中的类型
      modifyValue: '',//修改类型时的 name
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    operateBtn(type) {
      if (type === 1) {
        this.show = true;
      } else if (type === 2) {
        if (this.typeId) {
          this.modifyShow = true;
        } else {
          Toast.fail("请选择要修改的类型")
        }
      } else if (type === 3) {
        if (this.typeId) {
          this.$dialog.confirm({
            title: '提示',
            message: '确定删除当前选中的类型？',
          }).then(() => {
            // on confirm
            this.deleteType()
          }).catch(() => {
            // on cancel
          });
        } else {
          Toast.fail("请选择要删除的类型")
        }
      }
    },
    addConfirm() {

      addType({ name: this.value })
        .then(res => {

          if (res.status === 200) {
            Toast.success("新增类型成功");
            this.value = '';
            let timer = setTimeout(() => {
              this.selectTypeList();
              clearTimeout(timer)
            }, 2900)
          } else {
            Toast.fail("新增类型失败")
          }
          //console.log(res)
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    selectTypeList() {

      selectTypeList()
        .then(res => {

          if (res.status === 200) {
            this.typeList = [];
            for (let val of res.data.data) {
              val["curr"] = false;
              this.typeList.push(val)
            }
          }

          //console.log(res)
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    chooseType(id, index, curr, name) {
      if (curr) {
        this.typeId = null;
        this.modifyValue = '';
        this.typeList[index].curr = false
      } else {
        this.typeId = id;
        this.modifyValue = name;
        for (let val of this.typeList) {
          val.curr = false
        }
        this.typeList[index].curr = true
      }
    },
    //删除类型
    deleteType() {

      deleteType(this.typeId)
        .then(res => {

        if (res.status === 200) {
          Toast.success("删除类型成功");
          this.typeId = null;
          let timer = setTimeout(() => {
            this.selectTypeList();
            clearTimeout(timer)
          }, 2900)
        } else {
          Toast.fail("删除类型失败")
        }
        //console.log(res)
      }).catch(() => {
        throw new Error("异常！")
      })
    },
    //修改类型
    modifyType() {

      modifyType(this.typeId, { name: this.modifyValue })
        .then(res => {

          if (res.status === 200) {
            Toast.success("修改类型成功");
            this.typeId = null;
            let timer = setTimeout(() => {
              this.selectTypeList();
              clearTimeout(timer)
            }, 2900)
          } else {
            Toast.fail("修改类型失败")
          }
          //console.log(res)
        }).catch(() => {
        throw new Error("异常！")
      })
    },
  },
  created() {
    this.selectTypeList()
  },
}
</script>

<style scoped lang="less">
#type-management {
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

  .prompt {
    font-size: 0.14rem;
    color: #666;
    margin-top: 0.2rem;
    text-align: center;
  }

  .content {
    width: 100%;
    padding-bottom: 0.4rem;

    .title {
      display: block;
      font-size: 0.14rem;
      color: #fff;
      width: 2.5rem;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      margin: 0.16rem auto 0;
      background-color: #ccc;
      border-radius: 0.05rem;
    }

    .title.active {
      background-color: #3770FB;
    }
  }
}
</style>

<template>

  <div id="initial-value">
    <!--  设置初始值-->
    <div class="go-back">
      <van-nav-bar title="初始值" left-text="返回" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="section">
      <van-field
        v-model="flower"
        label="红花数:"
        placeholder=" 请输入学生新增时可获的红花数"
        error-message="备注：不包含小数点，不超过200朵"
        maxlength="3"
        type="number"
        size="large"
      />
      <div class="btn">
        <span class="confirm" @click="confirmSet">确认设置</span>
      </div>
    </div>
    <div class="mrg"></div>
    <div class="prompt">
      <h3>功能说明</h3>
      <p>设置红花初始数量，在“学生管理”功能中新增学生，学生自动获得设置的初始红花数奖励，且家长接收提示如下</p>
      <p>欢迎“小明”同学加入“{{ $companyName(0) }}托管园-泰联校区”的大家庭，现获得100朵红花作为基础分奖励</p>
    </div>
  </div>
</template>

<script>
  import { NavBar, Icon,Field,Toast } from "vant";
  import { selectSafflowerInitial, setSafflowerInitial } from '@/api/school/safflower'
  export default {
    name: "flower-initial-value",
    components: {
      [NavBar.name]: NavBar,
      [Icon.name]: Icon,
      [Field .name]:Field,
      [Toast.name]:Toast,
    },
    data(){
      return{
        flower:'',
      }
    },
    methods:{
      onClickLeft() {
        this.$router.back(-1);
      },
      //获取红花初始值
      selectInital(){
        selectSafflowerInitial()
          .then(res=>{
            if (res.status === 200){
              this.flower = res.data.data.initialNum
            }else {
              Toast('获取红花初始值失败！')
            }
        }).catch(()=>{
          throw new Error(" 异常！")
        })
      },
      confirmSet(){
        if (parseInt(this.flower)>200) {
          Toast('请输入小于200的整数');
        } else {
          this.$dialog.confirm({
            title: '提示',
            message: '确认提交红花初始值设置？'
          }).then(() => {
            // on confirm
            setSafflowerInitial({initialNum:this.flower})
              .then(res=>{
                if (res.status === 200){
                  if (res.data.data.code === 0){
                    Toast('设置红花初始值成功！')
                  }else {
                    Toast('设置红花初始值失败！')
                  }
                }else {
                  Toast('设置红花初始值失败！')
                }
            }).catch(()=>{
              throw new Error(" 异常！")
            })

          }).catch(() => {
            // on cancel
          });
        }
      }
    },
    created(){
      this.selectInital();
    }
  }
</script>

<style scoped lang="less">
#initial-value{
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
  .section{
    padding: 0.16rem;
    box-sizing: border-box;
    .btn{
      margin-top: 0.2rem;
      text-align: center;
      .confirm{
        display: inline-block;
        width: 1rem;
        height: 0.24rem;
        font-size: 0.14rem;
        line-height: 0.24rem;
        color: #3770fb;
        border: 1px solid #3770fb;
        border-radius: 0.05rem;
        text-align: center;
      }
    }
  }
  .mrg{
    width: 100%;
    height: 0.1rem;
    background-color: #F3F7F8;
  }
  .prompt{
    padding: 0.16rem;
    box-sizing: border-box;
    h3{
      text-align: center;
      margin-bottom: 0.1rem;
    }
    p{
      font-size: 0.14rem;
      color: #666;
      line-height: 0.18rem;
      margin-bottom: 0.1rem;
    }
  }
}
</style>

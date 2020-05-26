<template>
    <div id="resultsPop-up">
        <div class="go-back">
            <nav-bar :title="'修改分数'" :leftText="'取消修改'" :rightText="''" :id="''"></nav-bar>
        </div>
        <div class="content">
            <div class="header">
                <div class="bod-s">
                    <span class="xiaodian">
                        <van-switch v-model="checked" size="0.2rem" inactive-color="#fff" active-color="#84C225" />
                        <span v-text="checked?'小数点功能已关闭已开启':'小数点功能已关闭'"></span>
                    </span>
                </div>
            </div>
            <div class="middle">
                <div>
                    <p class="p_flex">
                        <span class="studs_yi">
                            <i></i>常用</span>
                    </p>
                    <ul>
                        <li v-for="(item,index) in fenshuList" :key="index" :class="item.fenshu===studeF?'fenshu--active':''">
                            <p v-text="item.fenshu"></p>
                        </li>
                    </ul>
                </div>
            </div>
            <p class="huis"></p>
            <div class="ftooer">
                <p class="p_flex">
                    <span class="studs_yi">
                        <i></i>全部</span>
                </p>
                <van-row>
                    <van-col span="12" :class="['one_col',49<studeF?'col-active':'ol-m']">100至50</van-col>
                    <van-col span="12" :class="['two_col',!(49<studeF)?'col-active':'ol-m']">49至0</van-col>
                </van-row>
                <ul>
                    <li v-for="(item,index) in fenshu" :key="index" :class="item==studeF?'fenshu--active':''">
                        <p v-text="item" @click=fenshuC(item)></p>
                    </li>
                </ul>

            </div>

        </div>
    </div>
</template>
<script>
import navBar from "../../common/nav-bar";
import { Switch, Row, Col } from "vant";
export default {
  components: {
    [Switch.name]: Switch,
    [Col.name]: Col,
    [Row.name]: Row,
    navBar
  },
  data() {
    return {
      stude_fenshu_list:JSON.parse(sessionStorage.getItem("stude_fenshu_list")),
      id:this.$route.query.id,
      fenshu: [],
      studeF: "",
      checked: false,
      qureyID: this.$route.query.id,
      fenshuList: [
        { fenshu: "85", id: "85" },
        { fenshu: "86", id: "86" },
        { fenshu: "87", id: "87" },
        { fenshu: "88", id: "88" },
        { fenshu: "89", id: "89" },
        { fenshu: "90", id: "90" },
        { fenshu: "91", id: "91" },
        { fenshu: "92", id: "92" }
      ]
    };
  },
  created() {
    const y = "40";
    this.studeF = y;
    if (this.studeF > 49) {
      for (let i = 50; i < 101; i++) {
        this.fenshu.push(i);
      }
    } else {
      for (let i = 0; i < 50; i++) {
        this.fenshu.push(i);
      }
    }
    console.log(this.stude_fenshu_list)
    // console.log(this.$route.query.id);
  },
  methods: {
    fenshuC(item) {
        this.studeF=item
        console.log(this.qureyID)
        if(this.stude_fenshu_list.length===0){
            console.log(777)
            console.log(this.stude_fenshu_list,'this.stude_fenshu_list.length',this.stude_fenshu_list.length)
            this.stude_fenshu_list.push({id:this.qureyID,fenshu:item})
        }else{
            for(let i=0;i<this.stude_fenshu_list.length;i++){
                if(this.stude_fenshu_list[i].id==this.qureyID){
                    this.stude_fenshu_list[i].fenshu=item
                }else{
                    this.stude_fenshu_list.push({id:this.qureyID,fenshu:item})
                }
            }

        }
        this.$router.push({
        name: "ScoreManageResultsHome",
      });
        sessionStorage.setItem('stude_fenshu_list',JSON.stringify(this.stude_fenshu_list))
      console.log(this.stude_fenshu_list);
    }
  }
};
</script>
<style  scoped lang="less">
@import "performance";
</style>


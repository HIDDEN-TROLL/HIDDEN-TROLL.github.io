<template>
  <div id="safflower-score" @touchstart="touchStartY" @touchmove="touchMoveY" @touchend="touchEndY"
       :style="{minHeight:`${hieght}px`}">
    <!--考勤关联学生-->
    <div class="go-back" ref="nav">
      <van-nav-bar
        title="红花评分"
        left-text="返回"
        right-text="更多功能"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <div class="downmenu" v-show="manageshow">
        <i></i>
        <router-link :to="{name:'SafflowerFlowerPrizeArea'}"><span class="add">红花兑奖区</span></router-link>
        <router-link :to="{name:'SafflowerRanking'}"><span class="type-manage">红花排行榜</span></router-link>
        <router-link :to="{name:'SafflowerFlowerMall'}"><span class="permiss-manage">红花商城</span></router-link>
        <router-link :to="{name:'SafflowerEvaluationManagement',params:{type:1}}"><span class="">评语管理</span></router-link>
        <router-link :to="{name:'SafflowerFlowerInitialValue'}"><span class="">红花初始值</span></router-link>
        <router-link :to="{name:'SafflowerFlowerReset'}"><span class="">红花清零</span></router-link>
      </div>
    </div>
    <div class="tip-top" v-if="currentLen===0" ref="comments">请选择本次评分的学生</div>
    <div class="choose-info" v-show="currentLen>0">
      <van-row type="flex" justify="center">
        <van-col span="8">{{currentClaass}}</van-col>
        <van-col span="8">{{currentLen}}</van-col>
        <van-col span="8">{{commentsLen ? commentsLen+'条评语' : '未选择评语'}}</van-col>
      </van-row>
    </div>
    <div class="check-btn">
      <!--<van-button type="info">奖励红花</van-button>
      <van-button type="info">扣除红花</van-button>-->
      <van-tabs type="card" title-active-color="#fff" color="#3770FB" title-inactive-color="#3770FB"
                @click="tabsReward">
        <van-tab title="奖励红花"></van-tab>
        <van-tab title="扣除红花"></van-tab>
      </van-tabs>
    </div>

    <div class="class-info">
      <div class="stat-list">
        <ClassList :class-list="classList" v-on:classGrade="getChangeIndex"></ClassList>
      </div>
    </div>
    <div class="class-tabel">
      <div class="table-select">
        <van-row>
          <van-col span="8"><img src="../../../assets/img/schoolRole/visibility-hide.png" alt="" @click="gradeModel = !gradeModel"><span>{{gradeModel ? '显示年级' : '隐藏年级'}}</span>|
          </van-col>
          <van-col span="16">
            <van-button plain type="primary" @click="chooseingAll">一健选中本班级全部学</van-button>
          </van-col>
        </van-row>
      </div>
      <div class="student-btn" v-if="studentList.length>0">
        <div style="overflow: hidden;transition: all 2s;"
             :style="{width:getWidth,transform:`translateX(${translateX}rem)`}">
          <div style="width: 3.43rem" class="page-list" v-for="(item,index) in currClassStudentList" :key="index"
               @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
            <van-row gutter="8" class="" v-if="item.length>0">
              <van-col span="6" v-for="(val, idx) in item" :key="idx">
                <van-button plain type="primary" @click="chooseStudent(val.stuId)" :class="{active:val.curr,hg:!gradeModel}">
                  {{val.stuName}} <br/> <span v-if="gradeModel">{{val.gradeName}}</span>
                  <div class="saf-mark" v-if="(reward === 0 &&val.rewardNum)||(reward === 1 &&val.deductNum)">{{reward
                    === 0 ? '+':'-'}}{{reward === 0 ? val.rewardNum : val.deductNum}}
                  </div>
                </van-button>
              </van-col>
            </van-row>
          </div>
        </div>


      </div>
      <div class="pages" v-if="count>1">
        <span v-if="page<count">&lt; &lt; 向左滑动</span>
        <span>{{page}}</span>/<span>{{count}}</span>
        <span v-if="page>1">向右滑动 &gt; &gt;</span>
      </div>

    </div>
    <!--评语-->
    <div class="comments-box" :style="{height:`${commentHieght}px`,bottom:`${commentBottom}px`,zIndex:zIndex}">
      <p class="title">&darr; 向下滑动返回选择学生 &darr; </p>
      <div class="comments-content">
        <div class="comment-box">
          <div class="scroll-x">
            <ul class="comment-title-list" :style="commentTitle" v-if="commentmodel.commentT.length>0">
              <li class="comment-title" :class="{active:commentmodel.current===index || item.num}"
                  v-for="(item,index) in commentmodel.commentT" :key="index" @click="commentTypeTabs(index)">
                <span>{{item.categoryName}}</span>
                <span>({{item.num}})</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="comments-detail">
          <div class="comment-list" @touchstart="ctouchStartX" @touchmove="ctouchMoveX" @touchend="ctouchEndX"
               :style="{width:commentBoxWidth,transform:`translateX(${commentmodel.cTranslateX}rem)`}"
               v-if="commentmodel.commentCurrent.length>0">
            <!--<span v-if="commentmodel.commentCurrent.length===0">暂无评语请新增</span>-->
            <div class="tab-items" v-for="(item,index) in commentmodel.commentCurrent" :key="index">
              <span v-if="commentmodel.commentCurrent.length===0||commentmodel.commentCurrent[0].length===0"
                    style="display:block;margin-top: 0.5rem;text-align: center;font-size: 0.2rem">暂无评语请新增</span>
              <van-row gutter="13" v-if="item.length>0">
                <van-col span="24" v-for="(val, idx) in item" :key="idx">
                  <van-button type="default" @click="chooseComments(val.commentId)" :class="{active:val.cType}">
                    <div class="btn-l">{{reward===0?'+':'-'}}{{val.worth ? val.worth : 0}}</div>
                    <div class="btn-r">{{val.content}}</div>
                  </van-button>
                </van-col>
              </van-row>
            </div>
          </div>
          <div class="total-flower">
            <p>每个已选中的学生 {{reward===0?'奖励':'扣除'}} {{commentmodel.cTotalFlower}} 朵红花</p>
          </div>
          <div class="pages">
            <span v-show="commentmodel.cPage<commentmodel.cCountPage">&lt; &lt; 向左滑动</span>
            <span class="nums"><span>{{commentmodel.cPage}}</span>/<span>{{commentmodel.cCountPage}}</span></span>
            <span v-show="commentmodel.cPage>1">向右滑动 &gt; &gt;</span>
            <span class="add" @click="addComments"><van-icon name="add"/></span>
          </div>
          <div class="img-box">
            <div class="img-list">
              <div class="img" v-for="(item,index) in commentmodel.imgurl" :key="index" @touchstart="delImg(item)"
                   @touchend="cleartime">
                <img :src="item" alt="" @click="preview(index)">
              </div>
              <div class="upload" :class="{curr:commentmodel.imgurl.length>0}" v-if="commentmodel.imgurl.length<=9">
                <van-uploader :after-read="onRead" accept="image/*" multiple>
                  <van-icon name="plus"/>
                </van-uploader>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
    </div>
    <p class="prompt">&uarr; 向上滑动进入评分评语环节 &uarr;</p>
    <!--新增评语-->
    <van-dialog
      v-model="commentmodel.addCommentDialog"
      title="新增评语"
      show-cancel-button
      confirm-button-text="新增并选中"
      :before-close="submitAddComment"
    >
      <van-field v-model="commentmodel.addContent" type="text" maxlength="15" placeholder="请输入评语内容"/>
      <div class="add-info">
        <div class="list">
          <span class="c-title">评语范围：</span>
          <span class="c-val">{{reward===0?'奖励':reward===1?'扣除':''}}</span>
        </div>
        <div class="list">
          <span class="c-title">评语范围：</span>
          <span class="c-val">{{currentClaass}}</span>
        </div>
        <div class="list">
          <span class="c-title">评语类型：</span>
          <span class="c-val">{{commentmodel.commentT.length > 0 ? commentmodel.commentT[commentmodel.current].categoryName:''}}</span>
        </div>
      </div>
      <van-field
        v-model="commentmodel.addFlowerNum"
        type="number"
        maxlength="2"
        clearable
        label="奖励分值："
        placeholder="请输入数字"
        error-message="不可超过99朵"
      >
        <!--<span slot="button" >朵</span>-->
      </van-field>
    </van-dialog>
    <div class="bg" :style="bgheight" v-show="bgshow" @click="operateBg"></div>
  </div>
</template>

<script>
import { NavBar, Icon, Button, Row, Col, Tab, Tabs, Toast, Field, Uploader, ImagePreview } from "vant";
import ClassList from '../components/class-list';
import FooterBtn from '../../common/footer-operate-btn'
import { getUploadOssUrl } from '@/api/common'
import { addComment, getSafflowerScore, getSelectComment, submitSafflowerSwath } from '@/api/school/safflower'

export default {
  name: "safflower-score",
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Toast.name]: Toast,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    ClassList: ClassList,
    FooterBtn: FooterBtn,
  },
  inject: ["reload"],
  data() {
    return {
      showpage:true,//重载
      gradeModel:false,//是否显示年级
      hieght: document.documentElement.clientHeight,//屏幕高度
      classList: [],//保存班级列表  todo 班级列表 与 学生列表 是一一对应
      studentList: [],//保存学生列表
      page: 1,//当前班级学生页数
      count: 1,//当前班级学生总页数
      currClassStudentList: [],//数据处理当前班级的学生列表 一页显示16个学生
      limit: 16,//每页显示学生数量
      translateX: 0,//左右滑动
      translateY: 0,//上下滑动
      startX: 0, //开始触摸x的位置
      startY: 0, //开始触摸y的位置
      endX: 0, //结束触摸的位置
      endY: 0,//
      disX: 0, //移动距离
      disY: 0,//
      lastX: 0, //结束X坐标
      lastY: 0, //结束Y坐标
      active: 0,//切换班级
      reward: 0,//保存 奖励  与  扣除 切换
      //定义页面固定底部按钮
      btnText: [
        {
          type: 1,
          title: '提交奖励',
        },
      ],
      currentLen: 0,//保存选择的学生数量
      currentStudent: [],//保存选择的学生id
      commentsLen: 0,//保存选择的评语数量
      currentClaass: '',//保存当前选择的班级
      currentClaassId: null,//保存当前选择的班级id
      commentBox: false,//评分评语显示
      upSlide: false,//是否 可执行上滑动
      commentHieght: 0,//评语框高度
      commentBottom: 0,//距离底部的距离
      zIndex: 100,
      Loop: null,// 删除 图片
      manageshow: false,//更多功能
      bgshow: false,
      commentmodel: {
        addCommentDialog: false,//新增评语弹出框
        addContent: '',//新增评语内容
        addFlowerNum: 0,//新增花朵数量
        current: 0,//评语内容切换
        commentT: [],// 评语标题数组
        commentC: [],//评语 详情
        commentCurrent: [],//当前页面显示的 评语列表 （二维数组）
        pageLimit: 5,//每页显示的评语数量
        cStartX: 0,//评语 左右滑动开始位置
        cEndX: 0,//评语 左右滑动结束位置
        cDisx: 0,// 手滑动的距离
        cPage: 1,
        cCountPage: 1,
        cTotalFlower: 0,//选中的红花数量总和
        imgurl: [],//保存上传图片的URL
        imgKey: [],//保存需要传递给后台的 key
        cTranslateX: 0,//左右滑动距离
      },
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    onClickRight() {
      this.manageshow = true;
      this.bgshow = true;
    },
    operateBg() {
      this.manageshow = false;
      this.bgshow = false;
    },
    // 切换 奖励 与 扣除
    tabsReward(index) {
      if (this.reward !== index) {
        this.reward = index;
        //切换时 将 所有 已选择的 学生重置为 未选中
        if (this.studentList[this.active].length > 0) {
          for (let item of this.studentList[this.active]) {
            item.curr = false;
          }
          this.currentLen = 0;
          this.commentsLen = 0;
        }
      }
      if (this.reward === 1) {
        this.btnText[0].title = '提交扣除'
      } else {
        this.btnText[0].title = '提交奖励'
      }
      // //将所有 选择的 评语 清除
      this.commentmodel.commentT = [];
      this.commentmodel.cTotalFlower = 0;
      this.commentmodel.commentC = [];
      this.commentmodel.current = 0
    },
    //一键选中所有学生
    chooseingAll() {
      if (this.studentList[this.active].length > 0) {
        this.currentStudent = [];
        for (let item of this.studentList[this.active]) {
          item.curr = true;
          //stuId
          this.currentStudent.push(item.stuId)
        }
        this.currentLen = this.studentList[this.active].length
      }
    },
    //单个学生 选中 与取消
    chooseStudent(stuId) {
      this.currentLen = 0;
      this.currentStudent = [];
      for (let item of this.studentList[this.active]) {
        if (item.stuId === stuId) {
          if (item.curr) {
            item.curr = false;
          } else {
            item.curr = true
          }
        }
      }
      for (let item of this.studentList[this.active]) {
        if (item.curr) {
          this.currentLen = this.currentLen + 1;
          this.currentStudent.push(item.stuId)
        }
      }
    },
    // 切换班级重置
    getChangeIndex(obj) {
      if (obj.active !== this.active) {//如果操作的是同一个班级
        this.currentLen = 0;
        this.active = obj.active;
        this.page = 1;//切换时 当前页重置为1
        this.translateX = 0;
        //切换时 将 所有 已选择的 学生重置为 未选中
        if (this.studentList[this.active].length > 0) {
          for (let item of this.studentList[this.active]) {
            item.curr = false;
          }
        }
        this.currentClaass = this.classList[this.active].name;
        this.currentClaassId = this.classList[this.active].id;
        //
        this.currentShowDataArr(this.active);
        // //将所有 选择的 评语 清除
        this.commentmodel.commentT = [];
        this.commentmodel.cTotalFlower = 0;
        this.commentmodel.commentC = [];
        this.commentsLen = 0;
        this.commentmodel.current = 0
      }
    },
    //获取数据
    selectClassList() {

      getSafflowerScore()
        .then(res => {

          if (res.status === 200) {
            if (res.data.data.clsStu) {
              for (let item of res.data.data.clsStu) {
                this.classList.push({
                  id: item.clsId,
                  name: item.clsName,
                });
                for (let val of item.stuList) {
                  val["curr"] = false;
                }
                this.studentList.push(item.stuList)
              }
              this.currentShowDataArr(0);
              this.currentClaass = this.classList[0].name;
            }
          }
          //console.log(res)
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    //左右滑动
    touchstart(ev) {
      this.startX = 0;
      ev = ev || event;
      if (ev.touches.length === 1) {
        this.startX = ev.touches[0].clientX;
        //this.startY = ev.touches[0].clientY;
      }
      //console.log(ev)
    },
    touchmove(ev) {
      this.endX = 0;
      this.disX = 0;
      ev = ev || event;
      // console.log(ev);
      //保存最终的 x y
      if (ev.touches.length === 1) {
        this.endX = ev.changedTouches[0].clientX;
        //this.endY = ev.changedTouches[0].clientY;
        this.disX = this.endX - this.startX;
        //this.disY = this.endY - this.startY;
      }

    },
    touchend(ev) {
      ev = ev || event;
      //console.log(ev);
      if (ev.changedTouches.length === 1) {
        //左滑动
        if (this.disX < 0 && Math.abs(this.disX) > 30) {
          //如果可滑动
          if (this.page < this.count) {
            this.page = this.page + 1;
            this.translateX = this.translateX - 3.59;
          }

        } else if (this.disX > 0 && Math.abs(this.disX) > 30) {//右滑动
          //如果可滑动
          if (this.page > 1) {
            this.page = this.page - 1;
            this.translateX = this.translateX + 3.59
          }
        }
      }
    },
    //上下滑动
    touchStartY(ev) {
      this.startY = 0;
      //console.log(ev);
      ev = ev || event;
      if (ev.touches.length === 1) {
        //this.startX = ev.touches[0].clientX;
        this.startY = ev.touches[0].clientY;
      }
    },
    touchMoveY(ev) {
      this.endY = 0;
      this.disY = 0;
      ev = ev || event;
      //console.log(ev);
      //保存最终的 x y
      if (ev.touches.length === 1) {
        //this.endX = ev.changedTouches[0].clientX;
        this.endY = ev.changedTouches[0].clientY;
        //this.disX = this.endX - this.startX;
        this.disY = this.endY - this.startY;
      }
    },
    touchEndY(ev) {
      ev = ev || event;
      //console.log(ev);
      if (this.startY !== ev.changedTouches[0].clientY) {//判断是否是点击
        if (ev.changedTouches.length === 1) {
          //上滑动
          if (this.disY < 0 && Math.abs(this.disY) > 60) {
            //如果可滑动
            if (this.currentLen > 0) {
              //如果没有获取过
              if (this.commentmodel.commentT.length === 0) {
                this.selectCommentInfo();
              }
              //this.upSlide = true;
              this.commentBottom = 0;
              let timer = setTimeout(() => {
                this.zIndex = 102;
                clearTimeout(timer)
              }, 500);
            } else {
              Toast("请选择需要评分的学生")
            }

          } else if (this.disY > 0 && Math.abs(this.disY) > 60) {//下滑动
            //如果可滑动
            //this.upSlide = false;
            this.commentBottom = -this.commentHieght;
            let timer = setTimeout(() => {
              this.zIndex = 100;
              clearTimeout(timer)
            }, 900);
          }
        }
      }
    },

    //评语 左右滑动
    ctouchStartX(ev) {
      this.commentmodel.cStartX = 0;
      ev = ev || event;
      if (ev.touches.length === 1) {
        this.commentmodel.cStartX = ev.touches[0].clientX;
      }
    },
    ctouchMoveX(ev) {
      this.commentmodel.cEndX = 0;
      this.commentmodel.cDisx = 0;
      ev = ev || event;
      // console.log(ev);
      //保存最终的 x y
      if (ev.touches.length === 1) {
        this.commentmodel.cEndX = ev.changedTouches[0].clientX;
        this.commentmodel.cDisx = this.commentmodel.cEndX - this.commentmodel.cStartX;
      }
    },
    ctouchEndX(ev) {
      ev = ev || event;
      if (ev.changedTouches.length === 1) {
        //左滑动
        if (this.commentmodel.cDisx < 0 && Math.abs(this.commentmodel.cDisx) > 30) {
          //如果可滑动
          if (this.commentmodel.cPage < this.commentmodel.cCountPage) {
            this.commentmodel.cPage = this.commentmodel.cPage + 1;
            this.commentmodel.cTranslateX = this.commentmodel.cTranslateX - 3.43
          }
        } else if (this.commentmodel.cDisx > 0 && Math.abs(this.commentmodel.cDisx) > 30) {//右滑动
          //如果可滑动
          if (this.commentmodel.cPage > 1) {
            this.commentmodel.cPage = this.commentmodel.cPage - 1;
            this.commentmodel.cTranslateX = this.commentmodel.cTranslateX + 3.43
          }
        }
      }
    },
    //获取评语
    selectCommentInfo() {
      this.$loading();
      getSelectComment(this.classList[this.active].id)
        .then(res => {
        this.$loadingHide();
        //console.log(res);
        if (res.status === 200) {
          if (res.data.data && res.data.data.length > 0) {
            //保存类型
            this.commentmodel.commentT = [];
            for (let item of res.data.data) {
              let midd = {};
              this.commentmodel.commentT.push({
                categoryId: item.categoryId,
                categoryName: item.categoryName,
                num: 0,//表示选中的个数
              });
              //循环奖励
              for (let v of item.comments.reward) {
                v["cType"] = false;//选中状态
              }
              midd["reward"] = item.comments.reward;
              // 循环扣除
              for (let v of item.comments.deduct) {
                v["cType"] = false;//选中状态
              }
              midd["deduct"] = item.comments.deduct;
              this.commentmodel.commentC.push(midd);
            }
            this.commentShowCurrent()
          }
        }
      }).catch(() => {
        throw new Error("异常！")
      })
    },
    //新增评语 显示
    addComments() {
      this.commentmodel.addCommentDialog = true;
      this.commentmodel.addContent = '';
      this.commentmodel.addFlowerNum = 0;
    },
    //提交评语
    operateBtn() {
      if (this.commentmodel.cTotalFlower > 0) {
        this.$dialog.confirm({
          title: '提示',
          message: `共${this.currentLen}个学生，${this.commentsLen}条评语，每个学生${this.reward === 0 ? '奖励' : '扣除'}${this.commentmodel.cTotalFlower}朵红花 提交${this.reward === 0 ? '奖励' : '扣除'}后无法撤回，是否确认提交？`,
        }).then(() => {
          // on confirm
          this.submitComment()
        }).catch(() => {
          // on cancel
        });
      } else {
        Toast.fail("未选择评语")
      }

    },
    // 提交新增评语
    submitAddComment(action, done) {
      if (action === 'confirm') {
        if (!this.commentmodel.addContent) {
          Toast('请输入评语内容');
          done(false)
        } else if (!this.commentmodel.addFlowerNum) {
          Toast('请输入红花数量');
          done(false)
        } else {
          //
          addComment({
            categoryId: this.commentmodel.commentT[this.commentmodel.current].categoryId,
            clsId: [this.currentClaassId],
            type: this.reward === 0 ? 1 : this.reward === 1 ? 2 : '',
            text: this.commentmodel.addContent,
            worth: this.commentmodel.addFlowerNum,
          })
            .then(res => {
            //
            if (res.status === 200) {
              Toast.success("新增成功");
              let timer = setTimeout(() => {
                done();
                clearTimeout(timer)
              }, 2800);
              for (let i = 0; i < this.commentmodel.commentT.length; i++) {
                if (i === this.commentmodel.current) {
                  if (this.reward === 0) {
                    this.commentmodel.commentC[i].reward.push({
                      commentId: res.data.data.commentId,
                      content: res.data.data.text,
                      worth: res.data.data.worth,
                      cType: true,
                    })
                  } else if (this.reward === 1) {
                    this.commentmodel.commentC[i].deduct.push({
                      commentId: res.data.data.commentId,
                      content: res.data.data.text,
                      worth: res.data.data.worth,
                      cType: true,
                    })
                  }
                }
              }
              this.commentShowCurrent();
              this.commentmodel.commentT[this.commentmodel.current].num = this.commentmodel.commentT[this.commentmodel.current].num + 1;
              this.commentsLen = this.commentsLen + 1;
              this.commentmodel.cTotalFlower = this.commentmodel.cTotalFlower + parseInt(res.data.data.worth)
            } else {
              Toast.fail("新增失败");
              done(false)
            }
          }).catch(() => {
            throw new Error("异常！")
          })
        }
      }else {
        done()
      }

    },
    //评语切换
    commentTypeTabs(index) {
      if (this.commentmodel.current !== index) {
        this.commentmodel.current = index;
        this.commentShowCurrent();
        console.log(this.commentmodel.commentCurrent[0].length)
      }
    },
    //当前评语显示的数据
    commentShowCurrent() {
      this.commentmodel.cTranslateX = 0;
      this.commentmodel.cPage = 1;
      this.commentmodel.commentCurrent = [];
      let arr = this.commentmodel.commentC[this.commentmodel.current];
      let d;
      if (this.reward === 0)
        d = arr["reward"];
      else if (this.reward === 1)
        d = arr["deduct"];
      if (d.length > this.commentmodel.pageLimit) {
        this.commentmodel.cCountPage = Math.ceil(d.length / this.commentmodel.pageLimit);
        for (let i = 0; i < this.commentmodel.cCountPage; i++) {
          let middleArr = [];
          if (i === 0) {
            for (let n = 0; n < this.commentmodel.pageLimit; n++) {
              middleArr.push(d[n])
            }
          } else {
            for (let v = this.commentmodel.pageLimit * i; v < this.commentmodel.pageLimit * (i + 1); v++) {
              if (d.length > v) {
                middleArr.push(d[v])
              }
            }
          }
          this.commentmodel.commentCurrent.push(middleArr);
        }
      } else {
        this.commentmodel.cCountPage = 1;
        this.commentmodel.commentCurrent.push(d)
      }
    },
    // 选择评语  id  评语id
    chooseComments(id) {
      if (this.reward === 0) {
        for (let val of this.commentmodel.commentC[this.commentmodel.current].reward) {
          if (val.commentId === id) {
            if (val.cType) {
              val.cType = false;
              this.commentmodel.commentT[this.commentmodel.current].num = this.commentmodel.commentT[this.commentmodel.current].num - 1;
              this.commentsLen = this.commentsLen - 1;
            } else {
              val.cType = true;
              this.commentmodel.commentT[this.commentmodel.current].num = this.commentmodel.commentT[this.commentmodel.current].num + 1;
              this.commentsLen = this.commentsLen + 1;
            }
          }
        }
      } else if (this.reward === 1) {
        for (let val of this.commentmodel.commentC[this.commentmodel.current].deduct) {
          if (val.commentId === id) {
            if (val.cType) {
              val.cType = false;
              this.commentmodel.commentT[this.commentmodel.current].num = this.commentmodel.commentT[this.commentmodel.current].num - 1
              this.commentsLen = this.commentsLen - 1;
            } else {
              val.cType = true;
              this.commentmodel.commentT[this.commentmodel.current].num = this.commentmodel.commentT[this.commentmodel.current].num + 1;
              this.commentsLen = this.commentsLen + 1;
            }
          }
        }
      }
      this.commentmodel.cTotalFlower = 0;
      for (let item of this.commentmodel.commentC) {
        if (this.reward === 0) {
          for (let val of item.reward) {
            if (val.cType) {
              this.commentmodel.cTotalFlower = this.commentmodel.cTotalFlower + (val.worth ? parseInt(val.worth) : 0)
            }
          }
        } else if (this.reward === 1) {
          for (let val of item.deduct) {
            if (val.cType) {
              this.commentmodel.cTotalFlower = this.commentmodel.cTotalFlower + (val.worth ? parseInt(val.worth) : 0)
            }
          }
        }
      }
    },
    //计算 评语框 高度
    computeHeight() {
      let phoneH = document.documentElement.clientHeight;
      let navH = this.$refs.nav.offsetHeight;
      if (this.$refs.comments) {
        let comments = this.$refs.comments.offsetHeight;
        let translateY = Math.ceil(phoneH - navH - comments);
        //console.log(translateY);
        this.commentHieght = translateY;
        this.commentBottom = -translateY;
      }
    },
    //当前班级显示的学生
    currentShowDataArr(index) {
      if (this.studentList.length > 0) {
        this.currClassStudentList = [];
        let arr = this.studentList[index];
        //console.log(index);
        if (arr.length <= this.limit) {//每页显示 16 个学生
          //this.page = 1;
          this.count = 1;
          this.currClassStudentList.push(arr)
        } else if (arr.length > this.limit) {
          this.count = Math.ceil(arr.length / this.limit);
          //this.page = 1;
          for (let i = 0; i < this.count; i++) {
            let middleArr = [];
            if (i === 0) {
              for (let n = 0; n < this.limit; n++) {
                middleArr.push(arr[n])
              }
            } else {
              for (let v = this.limit * i; v < this.limit * (i + 1); v++) {
                if (arr.length > v) {
                  middleArr.push(arr[v])
                }
              }
            }
            this.currClassStudentList.push(middleArr);
          }
        }
      }
    },
    //提交选定好的评语
    submitComment() {
      // 循环查询 是否选择了 评语
      //this.commentmodel.commentT
      let dt = [];
      //是否允许提交
      let sub = false;
      for (let i = 0; i < this.commentmodel.commentT.length; i++) {
        if (this.commentmodel.commentT[i].num > 0) {//说明有选择评语
          //如果有评语 允许提交
          sub = true;
          // 循环 评语类型 对应的 评语列表
          let middleArr = [];
          if (this.reward === 0) {//如果是奖励
            for (let val of this.commentmodel.commentC[i].reward) {
              if (val.cType) {//是否被选中
                middleArr.push({
                  commentId: val.commentId,
                  commentWorth: parseInt(val.worth),
                  comment: val.content,
                })
              }
            }
          } else if (this.reward === 1) {//扣除
            for (let val of this.commentmodel.commentC[i].deduct) {
              if (val.cType) {//是否被选中
                middleArr.push({
                  commentId: val.commentId,
                  commentWorth: parseInt(val.worth),
                  comment: val.content,
                })
              }
            }
          }
          if (middleArr.length > 0) {
            dt.push(
              {
                categoryId: parseInt(this.commentmodel.commentT[i].categoryId),
                categoryName: this.commentmodel.commentT[i].categoryName,
                comments: middleArr,
              },
            )
          }
        }
      }
      if (sub) {
        let stu = this.currentStudent.map(item=>{
          return parseInt(item)
        });
        submitSafflowerSwath({
          stuIds: stu,
          categorys: dt,
          imgurl: this.commentmodel.imgKey,
          type: this.reward === 0 ? 1 : 2,
        })
          .then(res => {

          if (res.status === 200) {
            //如果提价成功 重载页面

            Toast.success("评分成功");
            /*let timer = setTimeout(()=>{
              clearTimeout(timer);
              this.showpage = false;
              this.$nextTick(()=>{
                this.showpage = true;
              })
            },2900)*/
            let timer = setTimeout(()=>{
              clearTimeout(timer);
              this.reload();
            },2900);

          }
        }).catch(() => {
          throw new Error("异常！")
        })
      } else {
        Toast.fail("未选择评语")
      }

    },
    cleartime() {
      // 这个方法主要是用来将每次手指移出之后将计时器清零
      clearInterval(this.Loop);
    },
    //上传图片
    onRead(file) {
      //console.log(file);
      if (Array.isArray(file)) {
        for (let item of file) {
          if (item.file.type.split('/')[0] === 'image') {
            let yt = item.file.type.split('/')[1];
            let type = yt.toLowerCase() === 'jpg' || yt.toLowerCase() === 'jpeg' ? 1 : yt.toLowerCase() === 'png' ? 2 : '';
            this.uploadFile(type, item.content)
          }
        }
      } else {
        if (file.file.type.split('/')[0] === 'image') {
          let yt = file.file.type.split('/')[1];
          let type = yt.toLowerCase() === 'jpg' || yt.toLowerCase() === 'jpeg' ? 1 : yt.toLowerCase() === 'png' ? 2 : '';
          this.uploadFile(type, file.content)
        }
      }
    },
    /**
     * 上传图片
     * @param fileType 文件类型 1 jpg 2 png
     * @param fileUrl 图片的url
     */
    uploadFile(fileType, fileUrl) {
      //console.log(this.turnBase64(this.imgArr[0].src));

      getUploadOssUrl(fileType, undefined, 1)
        .then(res => {
          //console.log(res);
          if (res.data.meta && res.data.meta.code === 0) {
            this.axios.put(res.data.data[0].url, this.turnBase64(fileUrl) , { headers: { 'Content-Type': res.data.data[0].type } }).then(response => {

              if (response.status === 200) {
                Toast.success('上传成功');
                this.commentmodel.imgurl.push(fileUrl);
                this.commentmodel.imgKey.push(res.data.data[0].key);
              } else {
                Toast.fail('上传失败')
              }
            })
          }
        }).catch(() => {
        throw new Error("异常！")
      })
    },
    // base64 转 二进制
    turnBase64(dataURI) {
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
      let byteString = atob(dataURI.split(',')[1]); //base64 解码
      let arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
      let intArray = new Uint8Array(arrayBuffer); //创建视图

      for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
      }
      return new Blob([intArray], { type: mimeString });
    },
    //图片 预览
    preview(index) {
      let img = this.commentmodel.imgurl;
      /*for (let item of this.imgurl) {
        img.push(item.src)
      }*/
      ImagePreview({
        images: img,
        startPosition: index ? index : 0,
        lazyLoad: false,
      });
    },
    //删除图片
    delImg(fileUrl) {
      clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
      this.Loop = setTimeout(function () {
        this.$dialog.confirm({
          title: '提示',
          message: '确定删除当前图片？',
        }).then(() => {
          // on confirm
          let index = this.commentmodel.imgurl.indexOf(fileUrl);
          if (index > -1) {
            this.commentmodel.imgurl.splice(index, 1);
            this.commentmodel.imgKey.splice(index, 1)
          }
        }).catch(() => {
          // on cancel
        });
      }.bind(this), 1000);
    },
  },
  created() {
    this.selectClassList();

  },
  mounted() {
    //this.commentsHeight()
    this.computeHeight()
  },
  computed: {
    getWidth: {
      get() {
        let len = this.count;
        return `${3.75 * len}rem`
      },
    },
    commentTitle: {
      get() {
        let len = this.commentmodel.commentT.length;
        if (len > 0) {
          let w = 0.56 * len;
          return { width: `${w}rem` }
        } else {
          return { width: 0 }
        }
      },
    },
    commentBoxWidth: {
      get() {
        let len = this.commentmodel.cCountPage;
        return `${3.75 * len}rem`
      },
    },
    bgheight: {
      get() {
        let height = document.documentElement.clientHeight;
        return { height: `${height}px` }
      },
    },
    /*commentsHeight(){
      return ()=>{
        let phoneH = document.documentElement.clientHeight;
        let navH = this.$refs.nav.offsetHeight;
        let comments = this.$refs.comments.offsetHeight;
        let translateY = Math.ceil(phoneH - navH - comments);
        return translateY
      };
    }*/
  },
};
</script>

<style scoped lang="less">
#safflower-score {
  font-size: 0;
  background-color: #fff;

  .bg {
    background-color: #ddd;
    opacity: .4;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10000;
  }

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

    .downmenu {
      position: absolute;
      top: 0.42rem;
      right: 0.1rem;
      z-index: 10001;
      width: 1rem;
      background-color: #fff;
      padding: 0 0.1rem;
      border-radius: 0.03rem;
      box-sizing: border-box;

      span {
        display: block;
        font-size: 0.12rem;
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

  .tip-top {
    font-size: 0.14rem;
    height: 0.48rem;
    line-height: 0.48rem;
    color: #84C225;
    text-align: center
  }

  .choose-info {
    font-size: 0.14rem;
    height: 0.48rem;
    line-height: 0.48rem;
    color: #84C225;
    text-align: center
  }

  .check-btn {
    /* padding: 0 0.15rem;*/
    /*     .van-button--info{
             margin-left: 0.02rem;
             width: 50%;
             border-radius: 3px 0 0 3px;
             color: #FFF;
             background-color: #3770FB;
         }
         .van-button--info +.van-button--info{
             margin-left: -0.04rem;
             background-color: #fff;
             color: #3770FB;
             border-radius:  0 3px 3px 0 ;
         }*/

  }

  .class-info {
    .stat-list {
      padding: 0.05rem 0.16rem 0;
      background-color: #fff;
      box-sizing: border-box;
    }

    .select-cell {
      height: 48px;
      justify-content: center;
      align-items: center;
    }

    .select-cell {
      color: #666;
      padding: 0 0.16rem;
      height: 0.48rem;
      font-size: 0.14rem;
      text-align: center;
      line-height: 0.48rem;
    }

  }

  .class-tabel {
    font-size: 0.14rem;
    color: #666;
    line-height: 0.48rem;
    padding: 0 0.16rem;

    .table-select {
      .van-row {
        border-bottom: 1px solid #EEE;

        .van-col {
          display: flex;
          align-items: center;

          img {
            width: 0.24rem;
            height: 0.24rem;
            text-align: center;
          }

          span {
            padding: 0 0.1rem;

          }

          .van-button--plain.van-button--primary {
            color: #3770FB;
          }

          .van-button--primary {
            border-color: #3770FB;
            border-radius: 3px;
            width: 100%;
          }

          .van-button {
            margin-top: 0.12rem;
            height: 0.26rem;
            line-height: 0.24rem;
          }
        }

        .van-col + .van-col {
          font-size: 0.12rem;
          color: #999;
          text-align: left;
        }
      }
    }

    .student-btn {
      width: 100%;
      overflow: hidden;

      .page-list {
        float: left;
        margin-right: 0.16rem;
        min-height: 2rem;
      }

      .van-button--plain.van-button--primary {
        color: #3770FB;
      }

      .van-button--primary {
        border-color: #3770FB;
        border-radius: 3px;
        width: 100%;
      }

      .van-button--plain.van-button--primary.active {
        background-color: #3770FB;
        color: #fff;
      }

      .van-button {
        margin-top: 0.12rem;
        min-height: 0.26rem;
        line-height: 0.18rem;
        position: relative;
        padding: 0.04rem 0;
        text-align: center;

        .saf-mark {
          width: 0.3rem;
          height: 0.18rem;
          line-height: 0.18rem;
          position: absolute;
          color: #FFF;
          background-color: #D80000;
          border-radius: 0.2rem;
          font-size: 0.12rem;
          text-align: center;
          top: -0.13rem;
          right: -0.01rem;
        }
      }
      .hg.van-button{
        height: 0.26rem;
      }
    }

    .pages {
      margin-top: 0.1rem;
      overflow: hidden;
      text-align: center;
      font-size: 0.12rem;
      line-height: 0.3rem;
      color: #999;

      .nums {
        margin: 0 0.3rem;
      }
    }


  }

  .prompt {
    font-size: 0.12rem;
    color: #999999;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    background-color: #fff;
    height: 0.4rem;
    line-height: 0.4rem;
    /*transform: translateX(-50%);*/
    z-index: 101;
  }

  .comments-box {
    width: 100%;
    position: fixed;
    left: 0;
    background-color: #fff;
    transition: all 2s;
    z-index: 100;

    .title {
      font-size: 0.12rem;
      color: #999999;
      line-height: 0.3rem;
      text-align: center;
      margin-bottom: 0.1rem;
    }

    .comments-content {
      width: 100%;
      padding: 0 0.16rem;
      overflow: hidden;
      box-sizing: border-box;

      .comment-box {
        width: 100%;
        overflow: hidden;
        height: 0.6rem;

        .scroll-x {
          overflow-x: scroll;
          height: 0.7rem;

          .comment-title-list {
            overflow: hidden;

            .comment-title {
              float: left;
              font-size: 0.12rem;
              color: #666;
              margin-right: 0.16rem;
              width: 0.4rem;
              height: 0.6rem;
              padding: 0.05rem;
              text-align: center;
              border: 0.01rem solid #ddd;
              border-radius: 0.05rem;
              box-sizing: border-box;

              span {
                display: block;
                width: 100%;
              }
            }

            .comment-title.active {
              border-color: #3770fb;
              color: #3770fb;
            }
          }
        }
      }

      .comments-detail {
        .comment-list {
          transition: all 2s;
          overflow: hidden;
          height: 2rem;

          .tab-items {
            float: left;
            width: 3.43rem;
            padding: 0 0.16rem;
            font-size: 0.14rem;
            box-sizing: border-box;

            .van-row {
              .van-col {
                padding-top: 0.13rem;

                .van-button--default {
                  text-align: center;
                  padding: 0;
                  width: 100%;
                  height: 0.26rem;
                  line-height: 0.26rem;
                  border-color: #999;
                  border-radius: 3px;
                  color: #666;

                  .btn-l {
                    display: inline-block;
                    width: 0.32rem;
                    height: 0.26rem;
                    float: left;
                    border-right: 1px solid #999;
                  }

                  .btn-r {
                    display: inline-block;
                    text-align: center;
                    height: 0.26rem;
                  }
                }

                .van-button--default.active {
                  background-color: #3770fb;
                  color: #fff;
                }
              }
            }
          }
        }

        .total-flower {
          position: absolute;
          left: 0;
          bottom: 0.4rem;
          width: 100%;
          /*transform: translateX(-50%);*/

          p {
            font-size: 0.14rem;
            color: #666;
            line-height: 0.32rem;
            text-align: center;
          }
        }

        .pages {
          margin-top: 0.1rem;
          overflow: hidden;
          text-align: center;
          font-size: 0.12rem;
          line-height: 0.3rem;
          color: #999;

          .nums {
            margin: 0 0.3rem;
          }

          .add {
            font-size: 0.14rem;
            color: #3770fb;
            float: right;
            margin-right: 0.16rem;
          }
        }

        .img-box {
          overflow: hidden;
          min-height: 0.6rem;

          .img-list {
            float: left;
            margin-left: -0.1rem;

            .img {
              display: inline-block;
              float: left;
              width: 0.6rem;
              height: 0.6rem;
              margin-left: 0.1rem;
              margin-bottom: 0.18rem;
              position: relative;

              img {
                float: left;
                width: 100%;
                height: 100%;
              }
            }

            .upload {
              display: inline-block;
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

              .van-uploader {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0.2rem;
                height: 0.22rem;
                transform: translate(-50%, -50%);
              }
            }

            .upload.curr {
              margin-left: 0.1rem;
            }
          }

        }
      }
    }
  }

  .add-info {
    .list {
      font-size: 0.14rem;
      color: #666;
      line-height: 0.18rem;
      padding: 0.1rem 0.15rem;

      .c-title {
        color: #999;
      }
    }

  }
}
</style>

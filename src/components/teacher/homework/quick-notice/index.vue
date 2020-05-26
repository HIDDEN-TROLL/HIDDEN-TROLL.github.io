<template>
  <div id="teacher-hw">
    <van-nav-bar
        title="一键通知"
        left-text="返回"
        left-arrow
        @click-left="$router.back()" />

    <div title="完成通知">
      <Classlist :class-list="classList" v-on:classGrade="getChangeIndex"></Classlist>
      <div class="bgc" v-if="homeWork.stuList">
        <!--<Classlist></Classlist>-->
        <div class="sendnotice">
          <img :src="settingpic" @click="isShowGradeName = !isShowGradeName"/>
          <span class="showclass" @click="isShowGradeName = !isShowGradeName"> {{ isShowGradeName ? '隐藏' : '显示' }}年级</span>
          <span class="showclassline"></span>
          <van-button type="default" @click="submitAllHomework()" >一键通知本班级全部学生</van-button>
        </div>
        <div class="acline"></div>
        <div class="unfinish_list">
          <div class="unfinish"><span>{{homeWork.undoneNum}}人未完成</span></div>
          <van-row type="flex" justify="space-between" class="name" v-for="item in homeWork.stuList.undone" :key="item.stuId">
            <van-col span="6"> <span class="span" span="6">{{item.stuName}}</span></van-col>
            <van-col span="6" :class="{ invisible: !isShowGradeName }"> <span class="span" span="6">{{item.gradeName}}</span></van-col>
            <van-col span="6" class="submit_homework_wrap"><van-button type="default" span="6" @click="submitHomework(item)" :class="{ play: item.countdown, finished: item.finishedHomework }">
              <span class="countdown"></span>
              <span v-if="item.finishedHomework" class="text">已完成作业</span>
              <span v-else-if="item.countdown" class="text">点击取消</span>
              <span v-else>确认完成作业</span>
            </van-button></van-col>
          </van-row>

        </div>
        <div class="acline"></div>
        <div class="finish_list">
          <div class="unfinish">
            <span class="finperson">{{homeWork.doneNum}}人已完成</span>
          </div>
          <van-row type="flex" justify="space-between" class="name" v-for="(item, index) in homeWork.stuList.done" :key="index">
            <van-col span="8"> <span class="span student_name">{{item.stuName}}</span></van-col>
            <van-col span="8" :class="{ invisible: !isShowGradeName }">  <span class="span">{{item.gradeName}}</span></van-col>
            <!--<van-col span="8"> <span class="span " :class="item.read===1?'read':'unread'">{{item.read===1?'已阅':'未阅'}}</span></van-col>-->
            <van-col span="8" > <span class="span ">{{item.time}}</span></van-col>
          </van-row>

          <!--<van-row type="flex" justify="space-between" class="name" v-for="(item,index) in read" :key="index">
            <van-col span="8"> <span class="span">{{item.name}}</span></van-col>
            <van-col span="8">  <span class="span">{{item.year}}</span></van-col>
            <van-col span="8"> <span class="span read">{{item.unread}}</span></van-col>
            <van-col span="8"> <span class="span span_time">{{item.time}}</span></van-col>
          </van-row>-->
        </div>
      </div>
    </div>

    <div class="homework-record" v-show="record" :style="Height">
      <div class="top-box">
        <span class="name">{{recordStudentName}}</span>
        <span class="close" @click="closeReord">
            <van-icon name="cross" />
          </span>
      </div>
      <div class="course">
        <template v-if="chinese!=='-1'">
          <van-radio-group v-model="chinese">
            <div slot="" class="title">#语文</div>
            <van-radio name="1" checked-color="#ff8700"><span :class="{active:chinese==='1'}">已完成</span></van-radio>
            <van-radio name="2" checked-color="#ff8700"><span :class="{active:chinese==='2'}">未完成</span></van-radio>
          </van-radio-group>
        </template>
        <template v-if="math!=='-1'">
          <van-radio-group v-model="math">
            <div slot="" class="title">#数学</div>
            <van-radio name="1" checked-color="#ff8700"><span :class="{active:math==='1'}">已完成</span></van-radio>
            <van-radio name="2" checked-color="#ff8700"><span :class="{active:math==='2'}">未完成</span></van-radio>
          </van-radio-group>
        </template>
        <template v-if="english!=='-1'">
          <van-radio-group v-model="english">
            <div slot="" class="title">#英语</div>
            <van-radio name="1" checked-color="#ff8700"><span :class="{active:english==='1'}">已完成</span></van-radio>
            <van-radio name="2" checked-color="#ff8700"><span :class="{active:english==='2'}">未完成</span></van-radio>
          </van-radio-group>
        </template>

      </div>
      <div class="comments">
        <p class="instructions" @click="chooseComment(1)" v-if="commentChooseConent.length === 0">请选择作业完成情况的评语 &gt;&gt;</p>
        <div class="comment-content">
          <div class="list">
            <p class="item" v-for="(item,index) in commentChooseConent" :key="index">{{item}}</p>
          </div>
          <p class="instructions" v-if="commentChooseConent.length > 0" @click="chooseComment(2)">评语 &gt;&gt;</p>
        </div>
      </div>
      <div class="homework-msg">
        <van-field
            v-model="message"
            type="textarea"
            placeholder="请输入要录入的作业内容..."
            rows="3"
            autosize
        />
      </div>
      <div class="homework-img">
        <div class="img-list">
          <div class="img" v-for="(item,index) in upImg" :key="index" @touchstart="delImg(item)" @touchend="cleartime">
            <img :src="item" alt="" @click="preview(index)">
          </div>
          <div class="upload" :class="{curr:upImg.length>0}">
            <van-uploader :after-read="onRead" accept="image/*" multiple>
              <van-icon name="plus" />
            </van-uploader>
          </div>
        </div>
      </div>
      <div class="foot-btn">
        <button type="button" @click="confirmRecord()">确定录入</button>
      </div>
    </div>
    <div class="homework-comments" v-show="comments" :style="Height">
      <van-tabs type="card" title-active-color="#fff" color="#3770FB" title-inactive-color="#3770FB" @click="tabsReward">
        <van-tab title="鼓励式">
          <div class="encourage" v-if="commentArr.imbolden && commentArr.imbolden.length>0">
            <div class="text" :class="{active:item.active}" v-for="(item,index) in commentArr.imbolden" :key="index" @click="commentsActive(item.active,index)">{{item.comment}}</div>
          </div>
          <p style="margin-top: 0.5rem;font-size: 0.16rem;color: #333;text-align: center" v-if="commentArr.imbolden && commentArr.imbolden.length===0">没有评语</p>
        </van-tab>
        <van-tab title="批评式">
          <div class="criticism" v-if="commentArr.criticism && commentArr.criticism.length>0">
            <div class="text" :class="{active:item.active}" v-for="(item,index) in commentArr.criticism" :key="index" @click="commentsActive(item.active,index)">{{item.comment}}</div>
          </div>
          <p style="margin-top: 0.5rem;font-size: 0.16rem;color: #333;text-align: center" v-if="commentArr.criticism && commentArr.criticism.length===0">没有评语</p>
        </van-tab>
      </van-tabs>
      <FooterBtn :event-arr="btnText" v-on:commenEvent="operateBtn"></FooterBtn>
    </div>
  </div>
</template>

<script>
  import Classlist from '../components/class-list';
  import { NavBar,Button,ImagePreview } from 'vant';
  import { Tab, Tabs,Row, Col,Toast,Icon,RadioGroup, Radio,Field,Uploader } from 'vant';
  import FooterBtn from '@/components/common/footer-operate-btn'
  import { homeworkNotice, submitNotice, commentsList, addCommentsConfirm, confirmRecordHomework } from '@/api/teacher/homework'
  import { getUploadOssUrl } from '@/api/common'
  import { date as PHPFunctionDate } from '@/utils'

  export default {
    name: "TeacherHomeworkQuickNotice",
    components: {
      [NavBar.name]:NavBar,
      [Tab.name]:Tab,
      [Tabs.name]:Tabs,
      [Button.name]:Button,
      [Row.name]:Row,
      [Col.name]:Col,
      [Toast.name]:Toast,
      [Icon.name]:Icon,
      [RadioGroup.name]:RadioGroup,
      [Radio.name]:Radio,
      [Field.name]:Field,
      [Uploader.name]:Uploader,
      Classlist:Classlist,
      FooterBtn:FooterBtn
    },
    data(){
      return {
        isShowGradeName: true,

        record:false,
        comments:false,
        addCommentModel:false,//新增评语
        currentDate:'',//当前日期
        classList:[],//保存班级列表
        classHomework:[],//保存班级学生作业情况
        homeWork:{},//保存当前页面显示的数据
        current:0,//当前班级的下标
        settingpic: require("@/assets/img/homework/setting.png"),
        chinese:'2',
        math:'2',
        english:'2',
        message:'',
        recordStudentName:'',//录入的学生姓名
        recordStudentId:-1,//录入的学生id
        upImg:[],//保存上传的图片的 base64 地址 前端展示
        upKey:[],//保存上传的图片的key(后台需要)
        Loop:null,
        btnText:[
          {
            type:1,
            title:'取消'
          },
          {
            type:2,
            title:'确认选中'
          },
          {
            type:3,
            title:'新增评语'
          }
        ],
        btnCommentsText:[
          {
            type:1,
            title:'评语管理'
          }
        ],
        commentArr:[],//保存评语
        commentType:0,//评语类型 0 鼓励 1 批评
        commentChooseArr:[],//保存选择的评语id 只能同时选中一种评语类型
        commentChooseConent:[],//保存选择的评语内容 只能同时选中一种评语类型
        addCommentContent:'',//新增评语内容
      }
    },
    methods:{
      selectHomeworkNotice(){
        this.$loading(undefined, undefined, true)
        homeworkNotice()
          .then(res=>{
            this.$loadingHide()
          //console.log(res);
            if (res.status === 200){
              if (res.data.data && res.data.data.clsStu.length){
                this.homeWork = {};
                this.classHomework = [];
                this.classList = [];
                let d = res.data.data.clsStu;
                for (let item of d){
                  this.classList.push({
                    name:item.clsName,
                    id:item.clsId
                  });
                  item.stuList.undone.forEach(student => {
                    student.countdown = false
                    student.sending = false
                    student.finishedHomework = false
                    student.countdownTimeoutId = 0
                  })
                  this.classHomework.push({
                    doneNum:item.doneNum,
                    readNum:item.readNum,
                    undoneNum:item.undoneNum,
                    stuList:item.stuList,
                    id:item.clsId
                  })
                }
                //console.log(this.classHomework)
                this.homeWork = this.classHomework[this.current]
              }
            }
            }).catch(()=>{
              throw new Error("异常！")
            })
      },
      getChangeIndex(obj){
        // console.log(obj);
        this.current = obj.active;
        this.homeWork = this.classHomework[this.current];
      },
      //提交作业通知
      submitHomework(student){
        if (student.finishedHomework) {
          this.$toast('该学生已完成作业')
          return
        }
        if (student.sending) {
          this.$toast('通知已经发送，无法取消')
          return
        }
        if (student.countdown) {
          student.countdown = false
          clearTimeout(student.countdownTimeoutId)
          return
        }
        student.countdown = true
        student.countdownTimeoutId = setTimeout(() => {
          student.sending = true

          const stuId = student.stuId
          //学生数组id
          submitNotice({
            stuIds:[parseInt(stuId)],
            type:1,
            clsId:this.homeWork.id
          })
            .then(res=>{
              //console.log(res);
              if (res.status === 200){
                if (res.data.meta && res.data.meta.code === 0){
                  student.finishedHomework = true
                  const index = this.homeWork.stuList.undone.findIndex(stu => stu === student || stu.stuId === stuId)
                  this.homeWork.stuList.undone.splice(index, 1)
                  student.time = PHPFunctionDate('H:i:s')
                  this.homeWork.stuList.done.push(student)

                  this.homeWork.doneNum += 1
                  this.homeWork.undoneNum = this.homeWork.undoneNum > 0 ? this.homeWork.undoneNum - 1 : 0
                }
              }
            }).catch(()=>{
              throw new Error("异常！")
            })
            .finally(() => {
              student.sending = false
            })
        }, 5000)

      },
      //一键提交作业
      submitAllHomework(){
        if (this.homeWork.stuList.undone.length>0){
          this.$dialog.confirm({
            title: '提示',
            message: `确定${this.classList[this.current].name}的学生均完成作业吗？`
          }).then(() => {
            // on confirm
            let sId = [];
            for (let item of this.homeWork.stuList.undone){
              sId.push(parseInt(item.stuId))
            }
            submitNotice({
              stuIds:sId,
              type:1,
              clsId:this.homeWork.id
            })
              .then(res=>{
                //console.log(res);
                if (res.status === 200){
                  this.selectHomeworkNotice();
                }
              }).catch(()=>{
                throw new Error("异常！")
              })
          }).catch(() => {
            // on cancel
          });
        }else {
          Toast('所有学生已完成作业')
        }
      },
      //录入作业 homework 表示完成的作业数组 如果没有 为undefined
      homeworkReord(id, name, homework){
        if (homework && Array.isArray(homework)){
          homework.indexOf('数学')>=0 ? this.math='-1' : '';
          homework.indexOf('语文')>=0 ? this.chinese='-1' : '';
          homework.indexOf('英语')>=0 ? this.english='-1' : '';
        }
        this.recordStudentName = name;
        this.recordStudentId = id;
        this.record = true;
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
      /**
       * 上传图片
       * @param fileType 文件类型 1 jpg 2 png
       * @param fileUrl 图片的url
       */
      uploadFile(fileType, fileUrl){
        getUploadOssUrl(fileType, undefined, 1)
          .then(res=>{
            //console.log(res);
            if (res.data.meta && res.data.meta.code === 0){
              this.axios.put(res.data.data[0].url,{body:this.turnBase64(fileUrl)},{headers:{'Content-Type':res.data.data[0].type}}).then(response=>{
                if (response.status === 200){
                  Toast.success('上传成功');
                  this.upImg.push(fileUrl);
                  this.upKey.push(res.data.data[0].key);
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
      preview(index){
        ImagePreview({
          images: this.upImg,
          startPosition: index ? index : 0,
          lazyLoad:false
        });
      },
      //获取评语 如果 add 为真 表示新增评语 将此评语选中
      selectComment(add){
        commentsList()
          .then(res=>{
            if (res.status === 200){
              if (res.data.data){
                if (res.data.data.imbolden && res.data.data.imbolden.length > 0){
                  if (add && this.commentType === 0){
                    this.commentChooseArr.push(res.data.data.imbolden[0].commentId);
                    this.commentChooseConent.push(res.data.data.imbolden[0].comment)
                  }
                  for (let item of res.data.data.imbolden){
                    if (this.commentType === 0 && this.commentChooseArr.indexOf(item.commentId)>=0){
                      item['active'] = true
                    }else {
                      item['active'] = false;
                    }
                  }
                }
                if (res.data.data.criticism && res.data.data.criticism.length > 0){
                  if (add && this.commentType === 1){
                    this.commentChooseArr.push(res.data.data.criticism[0].commentId);
                    this.commentChooseConent.push(res.data.data.criticism[0].comment)
                  }
                  for (let item of res.data.data.criticism){
                    if (this.commentType === 1 && this.commentChooseArr.indexOf(item.commentId)>=0){
                      item['active'] = true
                    }else {
                      item['active'] = false;
                    }
                  }
                }
                this.commentArr = res.data.data
              }
            }
          }).catch(()=>{
            throw new Error("异常！")
          })
      },
      //选择评语
      chooseComment(tpe){
        if (tpe === 1){
          this.commentChooseArr = [];
          this.commentChooseConent = [];
          this.comments = true;
        }else if(tpe === 2){
          this.comments = true;
        }
      },
      //选择评语
      commentsActive(active, index){
        if (active){
          if (this.commentType === 0){
            this.commentArr.imbolden[index].active = false;
            let dx =this.commentChooseArr.indexOf(this.commentArr.imbolden[index].commentId) ;
            this.commentChooseArr.splice(dx,1);
            this.commentChooseConent.splice(dx,1);
          }else if (this.commentType === 1){
            this.commentArr.criticism[index].active = false;
            let dx =this.commentChooseArr.indexOf(this.commentArr.criticism[index].commentId) ;
            this.commentChooseArr.splice(dx,1);
            this.commentChooseConent.splice(dx,1)
          }
        }else {
          if (this.commentType === 0){
            this.commentArr.imbolden[index].active = true;
            this.commentChooseArr.push(this.commentArr.imbolden[index].commentId);
            this.commentChooseConent.push(this.commentArr.imbolden[index].comment)
          }else if (this.commentType === 1){
            this.commentArr.criticism[index].active = true;
            this.commentChooseArr.push(this.commentArr.criticism[index].commentId);
            this.commentChooseConent.push(this.commentArr.criticism[index].comment)
          }
        }
      },
      //切换评语类型
      tabsReward(index){
        this.commentType = index;
        if (this.commentType === 0 && this.commentChooseArr.length>0 ){
          for (let item of this.commentArr.criticism){
            item['active'] = false;
          }
        }else if (this.commentType === 1){
          for (let item of this.commentArr.imbolden){
            item['active'] = false;
          }
        }
        this.commentChooseArr = [];
        this.commentChooseConent = [];
      },
      //取消，选中， 新增评语
      operateBtn(type){
        if (type === 1){
          if (this.commentType === 0 && this.commentChooseArr.length>0 ){
            for (let item of this.commentArr.imbolden){
              item['active'] = false;
            }
          }else if (this.commentType === 1){
            for (let item of this.commentArr.criticism){
              item['active'] = false;
            }
          }
          this.commentChooseArr = [];
          this.commentChooseConent = [];
          this.comments = false;
        }else if (type === 2){
          this.comments = false;
        }else if (type === 3){
          this.addCommentModel = true;
        }
      },
      //新增评语
      addComments(action, done){
        if (action === 'confirm'){
          if (this.addCommentContent){
            addCommentsConfirm({type:this.commentType+1,comment:this.addCommentContent})
              .then(res=>{
                if (res.status === 200){
                  if (res.data.data.code === 0){
                    this.addCommentContent = '';
                    this.selectComment(1);
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
      //确定录入作业
      confirmRecord(){
        let courseArr = [];
        if (this.chinese==='2'&&this.math==='2'&&this.english==='2'){
          Toast('请选择完成的科目')
        }else if (this.commentChooseArr.length===0){
          Toast('请选择评语')
        }
        else {
          if (this.chinese === '1'){
            courseArr.push(1)
          }
          if (this.math === '1'){
            courseArr.push(2)
          }
          if (this.english === '1'){
            courseArr.push(3)
          }
          confirmRecordHomework({
            stuIds:[parseInt(this.recordStudentId)],
            type:2,
            clsId:this.classList[this.current].id,
            subject:courseArr,
            commentsId:this.commentChooseArr,
            comments:this.commentChooseConent,
            content:this.message,
            imgUrl:this.upKey
          }).then(res=>{
            if (res.status === 200){
              //this.record = false;
              if (this.commentType === 0 && this.commentChooseArr.length>0 ){
                for (let item of this.commentArr.imbolden){
                  item['active'] = false;
                }
              }else if (this.commentType === 1){
                for (let item of this.commentArr.criticism){
                  item['active'] = false;
                }
              }
              this.upImg=[];
              this.upKey=[];
              this.commentChooseArr=[];
              this.commentChooseConent=[];
              this.chinese='2';
              this.math='2';
              this.english='2';
              this.message='';
              Toast('录入成功');
              let timer = setTimeout(()=>{
                this.record = false;
                clearTimeout(timer);
                this.selectHomeworkNotice();
              },2800);
            }else {
              Toast('录入失败')
            }
          }).catch(()=>{
            throw new Error("异常！")
          })
        }
      },
      // 关闭录入作业
      closeReord(){
        if (this.commentType === 0 && this.commentChooseArr.length>0 ){
          for (let item of this.commentArr.imbolden){
            item['active'] = false;
          }
        }else if (this.commentType === 1){
          for (let item of this.commentArr.criticism){
            item['active'] = false;
          }
        }
        this.upImg=[];
        this.upKey=[];
        this.commentChooseArr=[];
        this.commentChooseConent=[];
        this.chinese='2';
        this.math='2';
        this.english='2';
        this.message='';
        this.record = false;
      },
      // 详情
      studentDetail(id, name){
        this.$router.push({name:'TeacherHomeworkUnread',params:{
            stuId:id,
            date:this.currentDate,
            name:name
          }
        })
      },
      commentBtn(){
        //评语管理
        this.$router.push({name:'TeacherHomeworkComment'})
      }
    },
    created(){
      this.selectHomeworkNotice();
      this.selectComment();
      //获取当前日期
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth()+1< 10 ? `0${date.getMonth()+1}` : date.getMonth()+1;
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      this.currentDate = `${year}-${month}-${day}`;
    },
    computed:{
      Height(){
        return {minHeight:`${window.screen.height}px`}
      }
    }
  }
</script>

<style scoped lang="less">
  #teacher-hw{
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
      border-right: none;
    }

    .sendnotice .van-button{
      color:#3770FB;
      float: right;
      width: 2.4rem;
      line-height: 0.25rem;
      height:0.3rem;
      border:solid 1px #3770FB;
    }
    .sendnotice{
      margin:0.15rem 0.15rem;
      font-size:0.14rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:0.3rem;
    }
    .sendnotice img{
      width: 0.24rem;
      height: 0.24rem;
      float: left;
      margin-right: 0.05rem;
      margin-top:0.03rem;
    }
    .acline{
      width:100%;
      height:0.1rem;
      background-color:#F3F7F8;
    }
    .unfinish_list ,.finish_list{
      margin: 0  0.15rem;

    }
    .finish_list{
      padding-bottom: 0.4rem;
    }
    .unfinish_list .van-button{
      color:#3770FB;
      /*float: right;*/
      width: 1.2rem;
      padding: 0 0.1rem;
      line-height: 0.25rem;
      height:0.3rem;
      border:solid 1px #3770FB;
    }
    .unfinish{
      text-align: center;
      border-bottom: solid 1px #EEEEEE;
      height: 0.55rem;
      font-size:0.14rem;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(216,0,0,1);
      line-height:0.55rem;
    }
    .unfinish_t_m{
      margin:0 0.5rem;
    }
    .finperson{
      color:#84C225;
    }
    .hr_b{
      margin: 0.2rem 0;
      width: 98%;
      border: solid 1px #EEEEEE;
    }
    .name{
      border-bottom: dotted 1px #EEEEEE;
      height:0.5rem;
      font-size:0.14rem;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:0.5rem;
      white-space: nowrap;
    }
    .unread{
      color: #D80000;
    }
    .read{
      color: #84C225;
    }
    .span_time{
      text-align: right;
    }
    .showclassline{
      margin-left: 0.08rem;
      border-right: solid 1px #EEEEEE;
    }

    .van-col--6{
      width: 100%;
    }
    .van-col--8{
      width: 16%;
    }
    .homework-record{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      font-size: 0.12rem;
      background-color: #fff;
      .top-box{
        text-align: center;
        height: 0.4rem;
        background-color: #eee;
        border-bottom: 1px solid #ddd;
        box-sizing: border-box;
        .name{
          font-size: 0.14rem;
          line-height: 0.4rem;
          color: #333;
        }
        .close{
          float: right;
          font-size: 0.14rem;
          margin-right: 0.08rem;
          color: #f47a40;
          line-height: 0.4rem;
        }
      }
      .course{
        background-color: #fff;
        margin-bottom: 0.1rem;
        .van-radio-group{
          display: flex;
          padding: 0.08rem 0.16rem;
          border-bottom: 1px solid #ddd;
          .title{
            font-size: 0.14rem;
            flex:1;
            color: #ccc;
            line-height: 0.2rem;
          }
          .van-radio{
            flex: 1;
            /deep/ .van-radio__label{
              color: #ccc;
              font-size: 0.14rem;
              .active{
                color: #ff8700;
              }
            }
          }
        }
      }
      .comments{
        min-height: 0.4rem;
        padding: 0.16rem;
        margin-bottom: 0.1rem;
        .instructions{
          font-size: 0.14rem;
          color: #3770fb;
        }
        .comment-content{
          overflow: hidden;
          .list{
            float: left;
            .item{
              font-size: 0.14rem;
              color: #666;
              line-height: 0.2rem;
            }
          }
          .instructions{
            float: right;
          }
        }
      }
      .homework-img{
        overflow: hidden;
        padding: 0 0.16rem;
        min-height: 0.6rem;
        .img-list{
          float: left;
          /*margin-left: 0.18rem;*/
          .img{
            float: left;
            width: 0.6rem;
            height: 0.6rem;
            margin-left: 0.18rem;
            margin-bottom: 0.18rem;
            position: relative;
            img{
              float: left;
              width: 100%;
              height: 100%;
            }
          }
          .upload{
            float: left;
            width: 0.3rem;
            height: 0.3rem;
            /*padding: 0.06rem;*/
            font-size: 0.2rem;
            margin-top: 0.15rem;
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
            margin-left: 0.18rem;
          }
        }
      }
      .foot-btn{
        margin-top: 0.2rem;
        padding: 0 0.16rem;
        button{
          display: block;
          width: 100%;
          height: 0.4rem;
          font-size: 0.14rem;
          background-color: #ff8700;
          color: #fff;
          border: 0;
          border-radius: 0.2rem;
          outline: none;
        }
      }
    }
    .homework-comments{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 101;
      width: 100%;
      font-size: 0.12rem;
      background-color: #fff;
      .encourage,.criticism{
        width: 100%;
        padding: 0.16rem 0.16rem 0.4rem;
        box-sizing: border-box;
        .text{
          width: 100%;
          font-size: 0.14rem;
          color: #666;
          padding: 0.08rem;
          text-align: center;
          border: 1px solid #ddd;
          margin-top: 0.1rem;
          border-radius: 0.05rem;
          box-sizing: border-box;
        }
        .text.active{
          background-color: #3770fb;
          color: #fff;
        }
      }
    }
    .comment-type{
      padding: 0 0.16rem;
      font-size: 0.14rem;
      color: #333;
      .type{
        color: #d80000;
      }
    }
  }
.submit_homework_wrap {
  text-align: right;
  .van-button__text {
    word-break: keep-all;
  }

  .van-button.finished {
    color: #666 !important;
    border-color: #666 !important;
  }
  .van-button.play {
    color: #666 !important;
    border-color: #666 !important;
    .countdown {
      width: 100%;
      transition: width 5s linear;
    }
  }
  .countdown {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background: #99999988;
    width: 0;
  }
  .text {
    position: relative;
  }
}
.invisible {
  visibility: hidden;
}
</style>

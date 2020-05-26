<template>
    <div class="unsigned" v-if="unsignList">
        <div class="top-box">
            <span class="total commen">共{{unsignList.length}}人{{ type == 1 ? '未到' : '未离' }}</span>
            <span class="show-view commen" @click="downMenuGrade">显示范围：<span>{{gradeName}}</span><span class="icons" ><van-icon name="arrow-down" /></span></span>
        </div>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text=""
                @load="onLoad"
        >
            <ul class="list">
                <li v-show="isEmpty(unsignList)">
                  <p style="text-align: center;font-size: .16rem;margin: .2rem 0;color: #999;">所有学生均已签到</p>
                </li>
                <li class="items" v-for="(item,index) in unsignList" :key="index">
                    <div class="name tabs">
                        <div class="t-middel">
                            <span class="text">{{item.name}}</span>
                            <span class="num">{{item.cardNo}}</span>
                        </div>
                    </div>
                    <div class="grade tabs">
                        <span>{{item.gradeName}}</span>
                    </div>
                    <div class="note tabs">
                        <span v-if="item.remark" @click="edetorStudent(item)">{{item.remark}}</span>
                        <span v-if="!item.remark" style="text-align: center" @click="edetorStudent(item)"><van-icon name="edit" /></span>
                    </div>
                    <div class="btn tabs">
                        <button type="button" :class="{disable:!canSignIn || item.signing}" @click="signed(item)">{{ type == 1 ? '签到' : '签退' }}</button>
                    </div>
                </li>
            </ul>
        </van-list>


       <!-- <GradeList></GradeList>-->
        <van-dialog
                v-model="dialogShow"
                show-cancel-button
                :before-close="beforeClose"
        >
            <van-field
                    v-model="message"
                    label="备注"
                    type="textarea"
                    placeholder="请输入备注20字符以内"
                    maxlength="20"
                    rows="2"
                    autosize
            />
        </van-dialog>

        <!--年级列表-->
        <van-actionsheet
            v-model="show"
            cancel-text="取消"
            :actions="gradeList"
            @select="onSelect"
            @cancel="onCancel"
        />
    </div>
</template>

<script>
    import {Icon, List, Actionsheet,Field,Toast } from 'vant';
    /*import GradeList from '../../common/grade-List';*/
    import { signed } from '@/api/school/attendance'
    import { updateStudent, updateStudentRemark } from '@/api/school/student-manage'
    export default {
        name: "unsigned-list",
        props:{
          unsignList:{
              type:Array
          },
          canSignIn: {
            type:Boolean
          },
          type: {
            type: [Number, String]
          },
        },
        components:{
            [Icon.name]:Icon,
            [List.name]:List,
            [Actionsheet.name]:Actionsheet,
            [Field.name]:Field,
            [Toast.name]:Toast,
            /*GradeList:GradeList*/
        },
        data(){
            return{
              message:'',
              show:false,
              dialogShow:false,
              loading:false,
              finished:true,
              gradeName:'全部年级',
              exitid:null,//保存要填写备注的学生id
              gradeList:[
                {
                  name:'全部年级',
                  id:-1
                },
                {
                  name:'一年级',
                  id:1
                },
                {
                  name:'二年级',
                  id:2
                },
                {
                  name:'三年级',
                  id:3
                },
                {
                  name:'四年级',
                  id:4
                },
                {
                  name:'五年级',
                  id:5
                },
                {
                  name:'六年级',
                  id:6
                },
                {
                  name:'初中',
                  id:7
                }
              ]
            }
        },
        methods:{
          onLoad(){},
          downMenuGrade() {
            this.show = true;
          },
          onSelect(item){
            this.gradeName = item.name;
            this.show = false;
            this.$emit("selectGrade",{ id: item.id});
          },
          onCancel(){
            this.show = false;
          },
          beforeClose(action, done) {
            if (action === 'confirm') {
              if (this.message === null || this.message === undefined) {
                this.message = ''
              }
              updateStudentRemark(this.exitid, this.message)
                .then(res=>{
                  //console.log(res);
                  if (res.data.meta && res.data.meta.code === 0){
                    this.$emit("updateRemark", { id: this.exitid, remark:this.message})
                    done();
                  } else {
                    done(false)
                  }
                })
                .catch(()=>{
                  done(false)
                })
            } else {
              done();
            }
          },
            //填写 备注
            edetorStudent(student){
                this.dialogShow=true;
                this.exitid = student.id;
                this.message = student.remark == null || student.remark == undefined ? '' : student.remark
            },
            //签到
            signed(student){
              if (!this.canSignIn) {
                this.$toast('当前选择考勤类型在当前时间内不能进行签到，请选择正确的考勤类型')
                return
              }
              if (student.signing) {
                this.$toast(`${student.name}正在${this.type == 1 ? '签到' : '签退'}中，请勿重复点击`)
                return
              }
              const id = student.id

              student.signing = true
              this.$loading()
              signed({id: id})
                .then(res=>{
                    //console.log(res);
                    if (res.data.meta && res.data.meta.code === 0){
                        this.$emit("signed", id);
                    }
                }).catch(()=>{
                    this.$toast('签到失败')
                })
                .finally(() => {
                  student.signing = false
                  this.$loadingHide()
                })
            }
        },
    }
</script>

<style scoped lang="less">
    .unsigned{
        .top-box{
            padding: 0.16rem 0;
            overflow: hidden;
            border-bottom: 0.02rem solid #eee;
            box-sizing: border-box;
            .commen{
                font-size: 0.14rem;
                line-height: 0.2rem;
            }
            .total{
                float: left;
                color: #333;
            }
            .show-view{
                float: right;
                color: #666;
            }
        }
        .list{
            .items{
                border-bottom: 0.02rem solid #eee;
                height: 0.71rem;
                overflow: hidden;
                box-sizing: border-box;
                .tabs{
                    float: left;
                    height: 0.69rem;
                    padding: 0.1rem 0;
                    position: relative;
                    box-sizing: border-box;
                }
                .name{
                    width: 0.85rem;
                    .t-middel{
                        max-height: 0.51rem;
                        position: absolute;
                        top: 50%;
                        transform:translateY(-50%);
                        .text{
                            display: block;
                            font-size: 0.14rem;
                            color: #666;
                            line-height: 0.2rem;
                            margin-bottom: 0.02rem;
                        }
                        .num{
                            display: block;
                            font-size: 0.12rem;
                            color: #999;
                            line-height: 0.17rem;
                        }
                    }

                }
                .grade{
                    width: 0.7rem;
                    span{
                        font-size: 0.14rem;
                        color: #666;
                        line-height: 0.2rem;
                        max-height: 0.51rem;
                        position: absolute;
                        top: 50%;
                        transform:translateY(-50%);
                    }
                }
                .note{
                    width: 1.03rem;
                    color: #999;
                    line-height: 0.17rem;
                    margin-right: 0.26rem;
                    span{
                        position: absolute;
                        top: 50%;
                        transform:translateY(-50%);
                        font-size: 0.12rem;
                        display: inline-block;
                        width: 100%;
                        max-height: 0.51rem;
                        overflow: hidden;
                        word-break: break-all;
                        word-wrap:break-word;
                    }
                }
                .btn{
                    width: 0.58rem;
                    button{
                        width: 0.58rem;
                        height: 0.24rem;
                        font-size: 0.12rem;
                        color: #3770FB;
                        background-color: #fff;
                        outline: none;
                        border-radius: 0.05rem;
                        border: 0.01rem solid #3770FB;
                        position: absolute;
                        top: 50%;
                        transform:translateY(-50%);
                        &.disable {
                          color: #999;
                          border-color: #999;
                        }
                    }
                }
            }
        }
    }
</style>

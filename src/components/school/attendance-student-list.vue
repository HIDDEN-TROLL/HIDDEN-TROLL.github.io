<template>
    <ul class="student-list" v-if="studentList.length>0">
        <li class="items" v-for="(item,index) in studentList" :key="index">
            <div class="avatar">
                <img src="../../../assets/img/parents/index/banner2.png" alt="">
            </div>
            <div class="info">
                <span class="name">{{item.name}}</span>
                <span class="basic">第{{item.grade}}班 <span class="grade">{{item.gradeName}}</span></span>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "atendance-student-list",
        props:{
            studentList:{
                type:Array
            }
        }
    }
</script>

<style scoped lang="less">
    .student-list{
        overflow: hidden;
        .items{
            float: left;
            width: 1.65rem;
            height: 0.77rem;
            padding: 0.13rem 0.09rem 0.12rem;
            margin-left: 0.13rem;
            border: 0.01rem solid #DCDCDC;
            border-radius: 0.03rem;
            box-sizing: border-box;
            .avatar{
                float: left;
                width: 0.5rem;
                height: 0.5rem;
                margin-right: 0.12rem;
                img{
                    float: left;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .info{
                >span{
                    display: block;
                }
                .name{
                    font-size: 0.14rem;
                    color: #666;
                    line-height: 0.2rem;
                    margin-bottom: 0.08rem;
                }
                .basic{
                    font-size: 0.12rem;
                    color: #666;
                    line-height: 0.12rem;
                    .grade{
                        color: #999;
                        margin-left: 0.12rem;
                    }
                }
            }
        }
    }
</style>

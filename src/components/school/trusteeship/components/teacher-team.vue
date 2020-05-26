<template>
    <div>
        <div class="teacherteam">
            <div class="title"><span>教师团队</span></div>
            <div class="team" v-for="(item,index) in team" :key="index">
                   <div class="team_div">
                       <div class="headimg"><img :src=item.head ></div>
                       <div>
                           <div>{{item.name}}</div>
                           <div class="explain">{{item.explain}}</div>
                       </div>
                   </div>
            </div>
        </div>


    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                team:[
                    {
                    name:'陆校长',
                    explain:'路校长，西南师范大学教育系学前专业毕业，大专学历，市少年宫副主任，幼教高级教师，涪城区幼教学会理事……',
                    head:require("../../../../assets/img/trusteeship/head.jpg")
                    },
                    {
                        name:'王老师',
                        explain:'王老师，西南师范大学教育系学前专业毕业，大专学历，市少年宫副主任，幼教高级教师，涪城区幼教学会理事……',
                        head:require("../../../../assets/img/trusteeship/head.jpg")
                    },
                    {
                        name:'李老师',
                        explain:'李老师，西南师范大学教育系学前专业毕业，大专学历，市少年宫副主任，幼教高级教师，涪城区幼教学会理事……',
                        head:require("../../../../assets/img/trusteeship/head.jpg")
                    }
                    ]
                    }
        },
        components: {
            //someComponent
        }
    }
</script>

<style scoped>

    .title{
        border-left: solid #3770FB;
        font-size: 0.16rem;
    }
    .title span{
        margin-left: 0.1rem;
    }
    .team{
        border-top: 1px solid #EEEEEE;
        font-size: 0.14rem;
    }
    .team:nth-child(2){
        border-top:none;
    }


    /*头像及说明*/
    .headimg{
        margin-right: 0.15rem;
        float:left;
        width: 0.72rem;
        height: 0.72rem;
    }
    .headimg img{
        width: 100%;
        height: 100%;
    }
    .team_div{
        margin: 0.15rem 0;
    }
    .teacherteam{
        margin: 0.12rem 0.15rem;
    }
    .explain{
        color: #999999;
    }

</style>

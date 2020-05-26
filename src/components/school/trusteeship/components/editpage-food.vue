<template>
    <div>
<div>
        <div class="foodname_bor">
                <div class="title">食物名称 <input type="text" placeholder="请输入老师姓名"></div>
        </div>
        <div class="team_img">
            <div class="team_img_bor">
                <div class="choice_title">食物照片</div>
                <div class="team_add" style="float: left;">+</div>
                <div class="reduce"><img src="../../../../assets/img/trusteeship/add.png"></div>
            </div>
        </div>
</div>

        <div>
            <div class="foodname_bor">
                <div class="title">食物名称 <input type="text" placeholder="请输入老师姓名"></div>
            </div>
            <div class="team_img">
                <div class="team_img_bor">
                    <div class="choice_title">食物照片</div>
                    <div class="team_add" style="float: left;">+</div>
                    <div class="reduce"><img src="../../../../assets/img/trusteeship/reduce.png"></div>
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
                msg: "Hello Vue.js"
            }
        },
        component: {
            //someComponent
        }
    }
</script>

<style scoped>

    .title{
        font-weight: 700;
    }
    .team_add{
        margin-left: 0.2rem;
        color: #D6D6D6;
        line-height:0.3rem;
        font-size: 0.3rem;
        text-align: center;
        width: 0.3rem;
        height: 0.3rem;
        border: dashed 1px #D6D6D6;
    }
    .choice_title{
        float: left;
    }
    .reduce{
        margin: 0.65rem 0 0.2rem 0;
        width: 0.22rem;
        height: 0.22rem;
        border-radius: ;
    }
    .reduce img{
        width: 100%;
        height: 100%;
    }
    .team_img_bor{
        margin-top: 0.1rem;
        border-bottom: solid 1px #EEEEEE;
        float: left;
        width: 100%;
    }
    input{
        margin-left: 0.15rem;
        border: none;
    }
    .foodname_bor{
        line-height: 0.45rem;
        border-bottom: dashed 1px #EEEEEE;
    }
</style>

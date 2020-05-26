<template>
    <div style="margin:0.15rem;">
        <div style="text-align: center;margin-bottom: 0.15rem;">
                <div>报名咨询成功后</div><div>请前往机构现场咨询相关信息</div>
        </div>
        <div style="margin: 0.1rem 0;">
            <van-row type="flex" justify="space-between">
                <van-col span="6">家长姓名</van-col>
                <van-col span="13"><input type="text" style="border: solid 1px;width: 100%;" ></van-col>
            </van-row>
        </div>
        <div style="margin: 0.1rem 0;">
            <van-row type="flex" justify="space-between">
                <van-col span="6">手机号码</van-col>
                <van-col span="13"><input type="text"  style="border: solid 1px;width: 100%;"></van-col>
            </van-row>
        </div>

        <div style="margin: 0.1rem 0;">
            <van-row type="flex" justify="space-between">
                <van-col span="6">孩子姓名</van-col>
                <van-col span="13"><input type="text"  style="border: solid 1px;width: 100%;"></van-col>
            </van-row>
        </div>

        <div style="margin: 0.1rem 0;">
            <van-row type="flex" justify="space-between">
                <van-col span="6">在读年级</van-col>
                <van-col span="13">
                    <select style="width:100%;height: 0.26rem;border: solid 1px;background-color: white">
                        <option value =" ">一年级</option>
                        <option value =" ">二年级</option>
                        <option value =" ">三年级</option>
                        <option value =" ">一年级</option>
                    </select>
                </van-col>
            </van-row>
        </div>

        <div style="margin: 0.1rem 0;">
            <van-row type="flex" justify="space-between">
                <van-col span="6">与孩子关系</van-col>
                <van-col span="13">
                    <select style="width:100%;height: 0.26rem;border: solid 1px;background-color: white">
                        <option value =" ">一般</option>
                        <option value =" ">良好</option>
                        <option value =" ">亲密</option>
                        <option value =" ">仇视</option>
                    </select>
                </van-col>
            </van-row>
        </div>


    </div>
    <!--<someComponent></someComponent>-->
</template>

<script>
    import { Row, Col } from 'vant';
    //import someComponent from './someComponent'
    export default {
        name: "",
        data() {
            return {
                msg: "Hello Vue.js"
            }
        },
        components: {
            [Row.name]:Row,
            [Col.name]:Col
            //someComponent
        }
    }
</script>

<style scoped>
    *{
        font-size: 0.14rem;
    }

</style>

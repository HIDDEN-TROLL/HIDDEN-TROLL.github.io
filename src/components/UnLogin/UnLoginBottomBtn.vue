<template>
    <div id="row">
        <transition name="fade">
            <div v-if="show">
                <div class="banner_unlogin">

                    <div>
                        还未登录？给爷登了才能KK更多P
                    </div>

                    <van-button color="rgb(28, 28, 28)" @click="Login(2)">点击登录</van-button>

                    <div class="register"  @click="Login(1)">
                        没有账号？点击注册
                    </div>


                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import '../../assets/js/test-clear.js'
    import { Circle,Divider,Cell, CellGroup,Button,Col,Row   } from 'vant';
    export default {
        name: "automatic-mode",
        data() {
            return {
                show:false,

                currentRate: 0,
                gradientColor: {
                    '0%': '#3fecff',
                    '100%': '#6149f6',
                },
            };
        },
        components: {
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            [Button.name]: Button,
            [Circle.name]: Circle,
            [Divider.name]: Divider,
            [Col.name]: Col,
            [Row.name]: Row,
        },
        methods:{
            Login(type){
             this.$router.push({name:'VerificationPage',params:{T:type}})
            },
        },
        mounted(){
            this.show = true
        }
    }

</script>
<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .van-circle{
        position: fixed;
    }
    .banner_unlogin{
        position: fixed;
        width: 100%;
        bottom: 2rem;
        z-index: 999;
        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        background: white;
        font-size: 1rem;
        line-height: 2.5rem;
        -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.2), -10px 10px 10px 10px rgba(255, 255, 255, 0.5);
        box-shadow: 0px 0px 16px 0px rgba(0.5, 0.5, 0.5, 0.4), -10px 10px 10px 10px rgba(255, 255, 255, 0.5);
    }
    .register{
        color: #a457df;
        font-size: 0.8rem;
    }
</style>



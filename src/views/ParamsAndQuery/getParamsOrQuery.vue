<template>
    <div id="row">
        <van-nav-bar
                title="个人信息"
                left-text="更多资料"
                right-text="退出登录"
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
        <transition name="fade">
            <div v-if="show">
                <div style="margin-top: 3.8rem;">
                    <div class="head shake">
                        <van-circle v-model="currentRate" :rate="70" :speed="200" size="12rem" :color="gradientColor" />
                        <img class="card-img-top " :src="Person.avatar" alt="Card image cap"  style="border-radius: 90%"  >
                    </div>
                </div>
                <div style="margin: 20px;">
                    <van-divider
                     :style="{ color: '#969799', borderColor: 'rgb(4, 4, 4)', padding: '0 2rem' }"
                    >{{currentRate}}%信息完成度</van-divider>
                </div>
                <van-cell-group>
                    <van-cell title="昵称："   :value="Person.name" />
                    <van-cell title="职业："   :value="Person.job" />
                    <van-cell title="性别："   :value="Person.sex" />
                    <van-cell title="种族："   :value="Person.race" />
                    <van-cell title="简介"     :value="Person.Introduction" />
                    <van-cell title="注册时间:" :value="Person.time" />
                </van-cell-group>
            </div>
        </transition>
    </div>
</template>

<script>
    import { Circle,Divider,Cell, CellGroup,Tag,NavBar,Dialog } from 'vant';
    import { mapState } from 'vuex'

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
        computed: {
            // 获取vuex中的个人信息（PersonalInformation）
            ...mapState('UserFunction', {
                Person: 'PersonalInformation',
                token: 'token',
            }),
        },
        components: {
            [Dialog.name]: Dialog,
            [Tag.name]:Tag ,
            [NavBar.name]:NavBar  ,
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            [Circle.name]: Circle,
            [Divider.name]: Divider,
        },
        methods:{
            fadein(){
            },
            onClickRight(){
                Dialog.confirm({
                    title: '退出登录',
                    message: '确定退出登录？下次登录需手动输入用户名及密码',
                })
                    .then(() => {
                        // on confirm
                        this.$store.commit("UserFunction/OUT")
                        this.$router.push({name:'VerificationPage'})
                    })
                    .catch(() => {
                        // on cancel
                    });
            },
            onClickLeft(){
            },
        },
        mounted(){
            console.log(this.token,"操你妈tasdlfhalskhfl")
            // 检测是否登录
            if(this.token === null){
                let tokenList = localStorage.getItem('token')
                    if(!tokenList){
                        this.$router.replace({name:'VerificationPage'})
                    }
            }
            this.show = true
        }
    }

</script>
<style lang="less" scoped>
    .head{
        width: 12rem;
        height: 12rem;
        border-radius: 90%;
        /*border: solid 1px;*/
        background: white;
        margin: 0 auto;
    }
    .head img{
        width: 100%;
        height: 100%;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .van-circle{
        position: fixed;
    }
    .van-cell__title, .van-cell__value {
        text-align: left;
    }
    .van-cell__title {
        flex: 0.3;
    }
    .head /deep/.van-circle__layer {
        stroke-width: 3.1rem
    }
</style>



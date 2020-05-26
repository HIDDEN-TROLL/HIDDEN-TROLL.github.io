<template>
    <div id="row">
        <van-nav-bar
                :title="type === 1 ? '账号注册' : '账号登录'"
                left-text="返回"
                :right-text="type === 1 ? '切换登录' : '切换注册'"
                left-arrow
                @click-left="onClickLeft"
                @click-right="type === 1 ? type = 2 : type = 1"
        />
        <transition name="fade">
            <div v-if="show">
                <div style="margin-top: 3.8rem;">
                    <div v-if="type === 1">
                    <div class="head shake">
                        <van-uploader v-model="fileList" multiple :max-count="1" :after-read="uploadImg" :delete="DeleteImg" />
                    </div>
                    </div>
                </div>
                <div style="margin: 20px;">
                    <van-divider
                            :style="{ color: '#969799', borderColor: 'rgb(4, 4, 4)', padding: '0 2rem' }"
                    >请填入以下信息</van-divider>
                </div>
                <div v-if="type === 1">
                    <van-form @submit="onSubmit">
                        <van-field
                                v-model="mes.userName"
                                name="用户名"
                                label="用户名："
                                placeholder="用户名"
                                :rules="[{ required: true, message: '你用户名呢？' }]"
                        />
                        <van-field
                                v-model="mes.userPwd"
                                type="password"
                                name="密码"
                                label="密码"
                                placeholder="密码"
                                :rules="[{ required: true, message: '你密码呢？' }]"
                        />
                        <van-field
                                v-model="name"
                                name="老哥贵姓"
                                label="老哥贵姓："
                                placeholder="称呼"
                                :rules="[{ required: true, message: '\\( ｀д′) /////你名字呢？' }]"
                        />
                        <!--<van-field-->
                                <!--v-model="emailAddress"-->
                                <!--name="用户名"-->
                                <!--label="邮箱："-->
                                <!--placeholder="邮箱"-->
                                <!--:rules="[{ pattern, message: '(╯▔皿▔)////还有邮箱？' }]"-->
                        <!--/>-->
                        <van-field
                                v-model="mes.emailAddress"
                                name="asyncValidator"
                                placeholder="邮箱"
                                label="邮箱："
                                :rules="[{ validator: asyncValidator, message: '(╯▔皿▔)////给爷把邮箱输正确了' }]"
                        />

                        <van-field
                                v-model="mes.captcha"
                                center
                                clearable
                                label="邮箱验证码"
                                placeholder="请输入邮箱验证码"
                                :rules="[{ required: true, message: '(╬▔皿▔)////还有邮箱？' }]"
                        >
                            <template #button>
                                <van-button size="small" color="#5f5f5f" v-if="ShowCountDown === true" @click="SendVerification()">发送验证码</van-button>
                                <van-button size="small" color="#5f5f5f" disabled v-else >重新发送（{{CountDown}}）</van-button>
                            </template>
                        </van-field>
                    </van-form>
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit" @click="send()" v-if="complete === true">
                            提交
                        </van-button>
                        <van-button round block type="info" disabled  native-type="submit"  v-else>
                            提交
                        </van-button>
                    </div>
                </div>
                <div v-else>
                    <van-form @submit="onSubmit">
                        <van-field
                                v-model="Eusername"
                                name="Eusername"
                                label="用户名："
                                placeholder="用户名"
                                :rules="[{ required: true, message: '你用户名呢？' }]"
                        />
                        <van-field
                                v-model="Epassword"
                                type="password"
                                name="password"
                                label="密码"
                                placeholder="密码"
                                :rules="[{ required: true, message: '你密码呢？' }]"
                        />
                    </van-form>
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit" @click="send()">
                            提交
                        </van-button>
                    </div>
                    <div class="forget">忘记密码？</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { Circle,Divider,Cell, CellGroup,Tag,NavBar,Field,Uploader,Form,Button,Toast } from 'vant';
    import { mapState} from 'vuex'

    export default {
        name: "automatic-mode",
        data() {
            return {
                type:2,
                show:false,
                // 注册信息
                // 4个必须参数
                    mes:{
                        userName:'222',
                        userPwd:'',
                        emailAddress:'',
                        captcha:'',
                    },

                sex:'这是个阴阳人',
                job:'保安',
                race:'DOGshit',
                name:'',
                time:'注册时间',
                Introduction: '我日你滴嗎頁',
                avatar:require('../../assets/img/head.jpg'),

                // 登录账号密码
                Eusername:'',
                Epassword:'',

                // 头像链接
                fileList: [],

                data: [],

                // 测试token
                token:123,

                // 发送验证码
                complete:false,
                ShowCountDown:true,
                CountDown:60,
                pattern : /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,

                JumpType:this.$route.params.T
            };
        },

        components: {
            [Toast.name]: Toast,
            [Button.name]: Button,
            [Form.name]: Form,
            [Uploader.name]: Uploader,
            [Field.name]: Field,
            [Tag.name]: Tag,
            [NavBar.name]: NavBar,
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell,
            [Circle.name]: Circle,
            [Divider.name]: Divider,
        },
        watch:{
            // 深度监听方法格式
            mes: {
                handler(){
                    if(this.mes.userName && this.mes.userPwd && /\d{6}/.test(this.mes.emailAddress) && this.mes.captcha){
                        this.complete = true
                    }else{
                        this.complete = false
                    }
                },
                deep: true  // 深度监听mes数组下的对象
            }
        },
        methods:{
            onSubmit() {
            // onSubmit(values) {

            },
            onClickRight(){
            },
            onClickLeft(){
                // this.$router.replace({name:'Homepage'})
                this.$router.back()
            },
            // 验证昵称能否使用
            asyncValidator(val) {
                return new Promise((resolve) => {
                    Toast.loading('验证中...');
                    setTimeout(() => {
                        Toast.clear();
                        resolve(/\d{6}/.test(val));
                    }, 1000);
                });
            },
            // 注册上传头像
            uploadImg(file){
            // uploadImg(file,detail){
                this.avatar = file.content
            },
            // 注册上传头像
            DeleteImg(){
                this.avatar = null
            },
            // 發送驗證碼及倒計時
            SendVerification(){
                this.ShowCountDown = false
                this.VerificationCountDown()
            },
            VerificationCountDown(){
                let timer = setTimeout(()=>{
                    if( this.CountDown <= 60 && this.ShowCountDown === false){
                        this.CountDown -=1
                        this.VerificationCountDown()
                            if(this.CountDown === 0){
                                this.ShowCountDown = true
                                this.CountDown = 60
                                    clearTimeout(timer)
                            }
                    }
                },1000)
            },
            // 提交测试
            send(){
                const data = {}
                if(this.type === 1){
                    data.userName =this.userName
                    data.userPwd =this.userPwd
                    data.captcha =this.captcha
                    data.emailAddress =this.emailAddress

                    data.sex =this.sex
                    data.name =this.name
                    data.time =this.time
                    data.job =this.job
                    data.avatar =this.avatar
                    data.race =this.race
                    data.Introduction =this.Introduction

                    this.$store.commit("UserFunction/LOGIN",data)

                }else{
                    data.username =this.Eusername
                    data.password =this.Epassword

                }
                // 储存token
                this.$store.commit("UserFunction/setUserInfo",this.token)
                this.$router.push({name:'Person'})
            }
        },
        computed: {
            // 获取vuex中的个人信息（PersonalInformation）
            ...mapState('UserFunction', {
                PersonalInformation: 'PersonalInformation',
                gettoken: 'token',
            }),
        },
        mounted(){
            console.log(this.JumpType)
            if(this.JumpType){
                this.type = this.JumpType
            }
            // 检测token
            if(this.gettoken === null){
                let tokenList = localStorage.getItem('token')
                if(tokenList){
                    this.$router.replace({name:'Person'})
                }
            }else{
                this.$router.replace({name:'Person'})
            }
            this.show = true
        }
    }
</script>
<style lang="less" scoped>
    html {font-size: 625%; /*10 ÷ 16 × 100% = 62.5%*/}

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
    /deep/.van-field__label {
        text-align: left;
        margin-left: 1rem;
    }
    /deep/.van-uploader__preview-image {
         width: 12rem;
         height: 12rem;
         border-radius: 100%;
     }
    /deep/.van-uploader__upload{
        width: 12rem;
        height: 12rem;
        border-radius: 100%;
    }
    .head /deep/.van-uploader__upload-icon {
        font-size: 5rem;
    }
    .head /deep/.van-uploader__preview-delete {
        top: -0.04rem;
        right: -0.04rem;
        color: #969799;
        font-size: 2rem;
    }
    /deep/.van-button--info {
        background-color: #5f5f5f;
        border: 1px solid #5f5f5f;
    }
    .forget{
        font-size: 0.9rem;
        color: #5f5f5f;
        margin-top: 0.3rem;
    }

</style>

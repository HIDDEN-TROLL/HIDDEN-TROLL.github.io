
<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
    // import { Tabbar, TabbarItem } from 'vant';
    import { mapState } from 'vuex'

    import './assets/js/test-clear.js'
    export default {

        name: "automatic-mode",
        data() {
            return {
                active:0
            };
        },

        computed: {
            // 获取vuex中的个人信息（PersonalInformation）
            ...mapState('UserFunction', {
                token: 'token',
            }),
        },
    }
</script>

<style lang="less" scoped>
    html {font-size: 625%; /*10 ÷ 16 × 100% = 62.5%*/}
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-bottom: 4rem;*/
    }

    #nav {
        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: white;
            }
        }
    }
    a:hover {
        text-decoration: none;
    }
    /deep/.van-tabbar {
        border-bottom: solid 1px white;
        -webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.2), -10px 10px 10px 10px rgba(255, 255, 255, 0.5);
        box-shadow: 0px 0px 16px 0px rgba(0.5, 0.5, 0.5, 0.3), -10px 10px 10px 10px rgba(255, 255, 255, 0.5);
    }
    /deep/.van-nav-bar {
        background: #1c1c1c;
        color: white;
        /*-webkit-box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.2), -10px 10px 10px 10px rgba(255, 255, 255, 0.5);*/
        /*box-shadow: 0px 0px 16px 0px rgba(0.5, 0.5, 0.5, 0.3), -10px 10px 10px 10px rgba(255, 255, 255, 0.5);*/
        position: fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 9;
        -webkit-transform: translateZ(0);
        height: 2.8rem;
    }
    /deep/.van-nav-bar__text {
        color: white;
    }
    /deep/.van-nav-bar__title {
        color: white;
    }
    /deep/.van-nav-bar .van-icon{
        color: white;
    }
    /deep/.van-swipe__indicators {
        bottom: 0
    }
    /deep/.van-swipe__indicator {
         background-color: #767c85;
     }
</style>

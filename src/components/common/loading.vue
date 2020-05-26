<template>
    <div id="loading" v-show="LOADING">
        <div class="loading">
            <van-loading type="spinner"/>
        </div>
    </div>
</template>

<script>
    import {Loading} from 'vant'
    import {mapState} from 'vuex'
    export default {
        name: "loading",
        components: {
            [Loading.name]: Loading
        },
        computed: {
            ...mapState([
                'LOADING'
            ]),
            /*Loadings: {
                get() {
                    return this.$store.state.LOADED
                },
                set(v) {
                    this.$store.state.LOADED = v
                }
            }*/


        }
    }
</script>

<style scoped lang="less">
    #loading{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #666;
        opacity: .8;
        z-index: 1000000;
        .loading{
            width: 0.3rem;
            height: 0.3rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }

</style>
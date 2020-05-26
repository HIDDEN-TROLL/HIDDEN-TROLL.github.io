<template>
    <div id="row">
        <transition name="fade">
            <div v-if="show">
                <div style="margin-top: 1rem;">
                    <div class="head">
                        <van-circle v-model="currentRate" :rate="70" :speed="100" size="200px" :color="gradientColor" />
                        <img class="card-img-top" src="../../assets/img/head.jpg" alt="Card image cap"  style="border-radius: 90%">
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import '../../assets/js/test-clear.js'
    import { Circle,Divider,Cell, CellGroup  } from 'vant';
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
            [Circle.name]: Circle,
            [Divider.name]: Divider,
        },
        methods:{
            row(){
                var scrolltop=null;
                var e=e;
                scrolltop=document.documentElement.scrollTop;
                if(scrolltop > 150){
                    document.getElementById("row").style.display="block";
                }else{
                    document.getElementById("row").style.display="none";
                }
            },
            fadein(){
            },

        },
        mounted(){
            this.show = true
        }
    }

</script>
<style>
    .head{
        width: 200px;
        height: 200px;
        border-radius: 90%;
        /*border: solid 1px;*/
        background: white;
        margin: 0 auto;
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
</style>



<template>
    <div>
<!--        {{status}}-->
    </div>
</template>
<script>
    // 获取推送方式
    import { GetType } from '@/api/parent/briefing';

    export default {
        name: "jump",
        data(){
          return{
              status:'',
              time:''
          }
        },
        methods:{
            GetTypeFun(){
                this.$loading();
                GetType()
                    .then(res => {
                        this.$loadingHide();
                        if (res.status === 200) {
                            this.status = res.data.data.status;
                            if(this.status === 0){
                                this.$router.push({name:'AutoModeOne'})
                            }
                            if(this.status === 1){
                                this.$router.push({name:'ManualMode'})
                            }

                        }
                    }).catch(() => {
                    throw new Error("获取手动/自动类型异常!")
                })
            },
        },
        mounted() {
            this.GetTypeFun()
        }
    }
</script>

<style scoped>

</style>
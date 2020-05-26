<template>
    <div id="education">
        <div class="go-back">
            <van-nav-bar title="教育"/>
        </div>
      <!--<van-loading v-show="$store.getters['parentHome/isLoadingData']" class="loading"/>-->

      <div class="ls">
            <Education></Education>
        </div>
    </div>
</template>

<script>
    import { NavBar } from 'vant';
    import Education from './components/education'
    export default {
        name: "education",
        components:{
            [NavBar.name]: NavBar,
            Education:Education,
          // vanLoading: Loading,
        },
      created() {
        //this.$store.dispatch('parentHome/fetchEducationPageData')
      },
    }
</script>

<style scoped lang="less">
  #education{
      padding-bottom: 0.58rem;
      .go-back{
          .van-nav-bar{
              background-color:#3770FB;
              .van-icon{
                  font-size: 0.22rem;
                  color: #fff;
              }
              .van-nav-bar__text{
                  font-size: 0.16rem;
                  line-height: 0.22rem;
                  color: #fff;
                  font-weight: 400;
              }
              .van-nav-bar__title{
                  color: #fff;
                  font-weight: 400;
              }
          }
      }
      .ls{
          padding-top: 0.1rem;
      }
  }

  .loading {
    margin: 10px auto;
  }
</style>

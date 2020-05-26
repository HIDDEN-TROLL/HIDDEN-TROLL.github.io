<template>
  <div class="table">
    <div class="left">
      <span>日期</span>
      <span>状态</span>
    </div>
    <div class="right">
      <div v-for="(date, index) in data.date" :key="index">
        <span class="column">
          <span>{{ date.date }}</span>
          <br>
          <span>{{ date.week }}</span>
        </span>
          <span>
          {{ data.stuDetaile[date.date] && data.stuDetaile[date.date][property] ? data.stuDetaile[date.date][property] : '' }}
        </span>
      </div>
    </div>

    <!--<div class="table-list">-->
      <!--<div class="title-left">-->
        <!--<span class="title date-title">情况/日期</span>-->
        <!--<span class="title" v-for="(value,key) in data.comment[commentKey].comments" :key="key">{{value.comment}}</span>-->

      <!--</div>-->
      <!--<div class="content-right">-->
        <!--<div class="scroll-box">-->
          <!--<div class="w-box">-->

            <!--<div class="bottom-part">-->
              <!--<div class="date" v-for="(value,index) in data.date" :key="index">-->
                <!--<span class="week">{{value.week}}</span><br/>-->
                <!--<span class="time">{{value.date}}</span>-->
              <!--</div>-->
            <!--</div>-->

            <!--<div class="top-part">-->
              <!--<div class="hori" v-for="(value1,key1) in data.date" :key="key1">-->
                <!--<span class="linght" v-for="(value,index) in data.comment[commentKey].comments" :key="index">-->
                  <!--<span v-if="goods(value1.date,value.cid)">-->
                    <!--<span class="fa fa-check"></span>-->
                  <!--</span>-->
                <!--</span>-->
              <!--</div>-->
            <!--</div>-->

          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

  </div>
</template>

<script>
export default {
  name: 'c-table',
  props: {
    data: {
      type: Object,
    },
    property: {
      type: String,
    },
  },
}
</script>

<style scoped lang="less">
.table {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;

  .left {
    width: .8rem;
    flex-shrink: 0;
    display: inline-flex;
    flex-direction: column;
    border-right: 1px solid #ccc;

    & > span {
      width: .8rem;
      min-height: 0.5rem;
      font-size: .16rem;
      color: #666;
      display: inline-flex;
      justify-content: center;
      align-items: center;

      border-left: 1px solid #ccc;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;

      &:last-child {
        border-top: 0;
      }
    }
  }
  .right {
    flex-grow: 1;
    display: inline-flex;
    overflow-x: scroll;
    flex-wrap: nowrap;

    & > div {
      flex-shrink: 0;
      flex-grow: 0;
      display: inline-flex;
      flex-direction: column;
      border-right: 1px solid #ccc;

      & > span {
        min-width: 1rem; // TODO 改用width
        min-height: 0.5rem;
        font-size: .16rem;
        color: #666;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        padding: 0 .1rem;

        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;

        &:last-child {
          border-top: 0;
        }

        &.column {
          flex-direction: column;
          font-size: 0;
          span {
            font-size: .16rem;
          }
        }
      }
    }
  }
}


  /*.lunch-break {*/
    /*width: 100%;*/
    /*box-sizing: border-box;*/
    /*overflow: hidden;*/

    /*.table-list {*/
      /*width: 100%;*/
      /*display: flex;*/

      /*.title-left {*/
        /*width: 2.5rem;*/
        /*flex-shrink: 0;*/

        /*.title {*/
          /*display: block;*/
          /*width: 100%;*/
          /*color: #666;*/
          /*text-align: center;*/
          /*border: solid #dcdcdc;*/
          /*border-width: 0 0.01rem 0.01rem 0.01rem;*/
          /*-webkit-box-sizing: border-box;*/
          /*box-sizing: border-box;*/
          /*padding: 0 .2rem;*/
          /*height: 1.2rem;*/
          /*line-height: 1.2rem;*/
        /*}*/

        /*.title:first-child {*/
          /*border-top-width: 0.01rem;*/
        /*}*/
      /*}*/

      /*.content-right {*/
        /*flex-grow: 1;*/
        /*height: 100%;*/
        /*overflow: hidden;*/
        /*box-sizing: border-box;*/

        /*.scroll-box {*/
          /*width: 100%;*/
          /*overflow-x: scroll;*/

          /*.w-box {*/
            /*.top-part {*/
              /*width: 100%;*/
              /*box-sizing: border-box;*/
              /*display: flex;*/

              /*.hori {*/
                /*box-sizing: border-box;*/

                /*.linght {*/
                  /*width: 2rem;*/
                  /*height: 1.2rem;*/
                  /*display: block;*/
                  /*line-height: 1.2rem;*/
                  /*font-size: 0.16rem;*/
                  /*color: #84C225;*/
                  /*text-align: center;*/
                  /*border: solid #dcdcdc;*/
                  /*border-width: 0 0.01rem 0.01rem 0;*/
                  /*box-sizing: border-box;*/
                  /*!*position: relative;*!*/
                  /*!*right: 0.01rem;*!*/
                /*}*/

                /*.linght:first-child {*/
                  /*border-top: 0.01rem solid #dcdcdc;*/
                /*}*/
              /*}*/

            /*}*/

            /*.bottom-part {*/
              /*width: 100%;*/
              /*display: flex;*/
              /*!*overflow: hidden;*!*/

              /*.date {*/
                /*text-align: center;*/
                /*height: 1.2rem;*/
                /*padding: 0 .2rem;*/
                /*line-height: .6rem;*/
                /*border: solid #dcdcdc;*/
                /*border-width: 0.01rem 0.01rem 0 0;*/
                /*-webkit-box-sizing: border-box;*/
                /*box-sizing: border-box;*/
                /*flex-shrink: 0;*/
                /*width: 2rem;*/
                /*white-space: nowrap;*/

                /*span {*/
                  /*color: #666;*/
                /*}*/
              /*}*/
            /*}*/
          /*}*/
        /*}*/
      /*}*/
    /*}*/
  /*}*/
</style>

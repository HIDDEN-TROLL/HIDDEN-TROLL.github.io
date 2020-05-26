<template>
  <div v-if="!isEmpty(extra)" class="content">
    <p class="title">
      <span>{{ title }}</span>
      <span class="clickable" @click="$router.push({ name:'ParentHomeworkHistoryList' })">
        查看详情 <van-icon name="arrow" />
      </span>
    </p>
    <div class="subjects">
      <div v-for="(subject, index) in extra.subject" :key="index" class="subject">
        <p class="name">{{ subject.subjectName }}</p>
        <p v-if="subject.isFulfil" class="status finished">完成</p>
        <p v-else class="status unfinished">未完成</p>
      </div>
    </div>

    <p v-if="!isEmpty(extra.workBehavior.comment)" class="discipline">
      <span class="name">作业表现</span>
      <span class="comment">{{ extra.workBehavior.comment }}</span>
      <icon class="icon" name="icon-honghua"/>
      <span class="number">{{ extra.workBehavior.number }}</span>
    </p>

    <p v-if="!isEmpty(extra.voiceUrl)" class="voice">
      <span class="name">语音评价</span>
      <voice-record class="voice_record" :value="extra.voiceUrl" only-play/>
    </p>
  </div>
</template>

<script>
import icon from '@/components/common/icon'
import { Icon } from 'vant'
import voiceRecord from '@/components/common/voice-record'

export default {
  name: 'Homework',
  components: {
    icon,
    vanIcon: Icon,
    voiceRecord,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
    extra: {
      default: () => [],
      type: Object,
    },
  },
}
</script>

<style scoped lang="less">
.content {
  background-color: #fff;
  border-bottom: .1rem solid #F3F7F8;
  padding: .15rem 0;

  .clickable {
    display: inline-flex;
    align-items: center;
    font-size:0.12rem;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:0.17rem;

    &:active {
      background: #eee;
    }
  }

  .title {
    font-weight: 600;
    color: #333;
    line-height: 0.22rem;
    position: relative;
    padding: 0 .12rem;
    font-size: .16rem;
    margin-left: .16rem;
    display: flex;
    justify-content: space-between;

    &:before {
      content: '';
      width: 0.02rem;
      height: 0.16rem;
      background-color: #3770FB;
      border-radius: 10px;
      position: absolute;
      left: 0;
      margin-top: 0.03rem;
    }
  }

  .subjects {
    margin: .3rem 0;
    width: 100%;

    &:last-child {
      margin-bottom: 0;
    }

    .subject {
      display: inline-block;
      width: 33.3%;
      text-align: center;
      box-sizing: border-box;
      &:not(:last-of-type) {
        border-right: .01rem solid #eee;
      }
      .name {
        font-size:0.14rem;
        font-weight:400;
        color:#333;
        line-height:0.2rem;
        margin-bottom: .1rem;
      }
      .status {
        font-size:0.12rem;
        font-weight:400;
        line-height:0.17rem;
      }
      .finished {
        color:rgba(132,194,37,1);
      }
      .unfinished {
        color:rgba(216,0,0,1);
      }
    }
  }

  .discipline {
    margin-left: 0.24rem;
    font-size: 0.14rem;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 0.2rem;

    .comment {
      margin-left: .2rem;
      margin-right: .1rem;
    }
    .icon {
      color: #D80000;
    }
    .number {
      font-size:0.14rem;
      font-weight:400;
      color:rgba(216,0,0,1);
      line-height:0.2rem;
    }
  }

  .voice {
    margin-left: 0.16rem;
    font-size: 0.14rem;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 0.2rem;
    display: flex;
    align-items: center;

    .name {
      margin-right: .2rem;
    }
    .voice_record {
      width: auto;
      z-index: 1;
    }
  }
}
</style>

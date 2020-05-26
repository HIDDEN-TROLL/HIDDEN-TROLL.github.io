import { isEmpty, date as PHPFunctionDate } from '@/utils'
import { getTeacherRankingList, getAchievementRanking, postScore } from '@/api/school/teacher-ranking-list'
import axios from 'axios'

let fetchRankingListCancelTokenSource = null

export default {
  name: 'teacherRankingList',
  namespaced: true,

  state: {
    isDataReady: false,
    data: {},
    rankingList: [],
    currentRankType: 0,
    currentRankOption: null,

    rankTypeOptions: [
      {
        name: '总分排名', value: 0,
      },
      {
        name: '今日得分', value: 1,
      },
      {
        name: '岗位得分', value: 2,
      },
      {
        name: '能量得分', value: 3,
      },
      {
        name: '评教得分', value: 4,
      },
    ],
  },
  mutations: {
    setData(state, data) {
      if (isEmpty(data)) {
        return
      }

      state.data = data
      state.rankingList = data.rankingList
      delete data.rankingList
      state.isDataReady = true
    },
    setCurrentRankOption(state, data) {
      const { rankType } = data
      state.currentRankType = rankType
      state.currentRankOption = data
    },
    setRankingList(state, list) {
      state.rankingList = list
    },
    afterSubmitSuccess(state, { teacherId, score }) {
      // 更新剩余能量分
      state.data.remainEnergyScore = Math.max(state.data.remainEnergyScore - score, 0)

      // 判断是否需要更新被评分的教师的分数
      if (state.currentRankOption) {
        const rankType = state.currentRankOption.rankType
        // 排行榜不是总分排名, 今日得分, 能量得分 则不需要
        if (rankType !== 0 && rankType !== 1 && rankType !== 3) {
           return
        }

        // 日期没有包括今天, 则不需要
        if (rankType !== 1) {
          const endDate = new Date(state.currentRankOption.endDate.getTime())
          endDate.setHours(23)
          endDate.setMinutes(59)
          endDate.setSeconds(59)
          if (endDate.getTime() < new Date().getTime()) {
            return
          }
        }
      }

      // 更新被评分的教师的分数
      const teacher = state.rankingList.find(teacher => teacher.teacherId === teacherId)
      if (teacher) {
        teacher.score += score
      }

      // 增加分数后要重排排行榜
      state.rankingList.sort((a, b) => {
        return b.score - a.score
      })

      let prevOneScore = Number.MAX_VALUE;
      let ranking = 0;
      state.rankingList.forEach(teacher => {
        if (teacher.score < prevOneScore) {
          ranking += 1;
          prevOneScore = teacher.score;
        }
        teacher.ranking = ranking
      })
    },
  },
  actions: {
    async fetchData({ commit }) {
      const response = await getTeacherRankingList()
      if (response.data.meta.success) {
        commit('setData', response.data.data)
      }
    },
    async fetchRankingList({ commit }, data) {
      const { rankType, startDate, endDate } = data
      commit('setCurrentRankOption', data)

      if (fetchRankingListCancelTokenSource !== null) {
        fetchRankingListCancelTokenSource.cancel('cancel')
      }
      fetchRankingListCancelTokenSource = axios.CancelToken.source()

      const response = await getAchievementRanking(fetchRankingListCancelTokenSource, {
        type: rankType,
        startDate: PHPFunctionDate('Y-m-d', startDate),
        endDate: PHPFunctionDate('Y-m-d', endDate),
      })
      if (response.data.meta.success) {
        commit('setRankingList', response.data.data)
      }
      fetchRankingListCancelTokenSource = null
    },
    async postScore({ commit }, data) {
      const response = await postScore(data)
      if (response.data.meta.success) {
        commit('afterSubmitSuccess', data)
        return true
      }
      return false
    },
  },
  getters: {
    remainEnergyScore(state) {
      return state.data && state.data.remainEnergyScore > 0 ? state.data.remainEnergyScore : 0
    },
  },
}

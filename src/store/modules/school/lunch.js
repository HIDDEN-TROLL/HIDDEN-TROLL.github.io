import { isEmpty } from '@/utils'
import { getIsShowGradeName, setIsShowGradeName } from '@/utils/config'
import { getSiestaData, submit, createComment } from '@/api/school/lunch'

export default {
  name: 'lunch',
  namespaced: true,

  state: {
    isDataReady: false,

    classIdList: [], // 可能没用到
    classNameList: [],
    studentList2dArray: [], // 一个班级一个子元素, 第二维的数组是学生列表数组
    isShowGradeName: getIsShowGradeName(),

    selectedStudent: null,

    siestaCommentList: [],
    diningCommentList: [],
    siestaDiscipline: [],
    diningDiscipline: [],

    v: 1, // 遇到 getter 不更新的问题, 增加这个无意义数据, 用于促使 getter 更新
  },
  mutations: {
    setSiestaData(state, data) {
      if (isEmpty(data)) {
        return
      }

      const classIdList = []
      const classNameList = []
      const studentList2dArray = []

      data.clsStu.forEach(clazz => {
        clazz.clsId = parseInt(clazz.clsId)

        classIdList.push(clazz.clsId)
        classNameList.push(clazz.clsName)
        clazz.stuList.forEach(student => {
          student.studentId = parseInt(student.stuId)
          student.studentName = student.stuName
          student.classId = clazz.clsId
          student.isSave = !isEmpty(student.siestaDining)
        })
        studentList2dArray.push(clazz.stuList)
      })

      state.classIdList = classIdList
      state.classNameList = classNameList
      state.studentList2dArray = studentList2dArray
      state.selectedStudent = null

      state.siestaCommentList = data.siestaComment
      state.diningCommentList = data.diningComment
      state.siestaDiscipline = data.siestaDiscipline
      state.diningDiscipline = data.diningDiscipline

      state.isDataReady = true
    },

    toggleShowGradeName(state) {
      state.isShowGradeName = !state.isShowGradeName
      setIsShowGradeName(state.isShowGradeName)
    },

    // 学生
    selectStudent(state, [classIndex, studentId]) {
      if (isEmpty(state.studentList2dArray[classIndex])) {
        return
      }
      const student = state.studentList2dArray[classIndex].find(student => student.studentId === studentId)
      if (student) {
        if (isEmpty(student.siestaDining)) {
          student.siestaDining = {}
        }

        const mapping = ['siesta', 'lunch', 'dinner']
        for (const key of mapping) {
          if (isEmpty(student.siestaDining[key])) {
            student.siestaDining[key] = {
              status: [],
              discipline: 2,
            }
          }
        }
        if (student.siestaDining.imgUrl === undefined) {
          student.siestaDining.imgUrl = []
        }
        state.selectedStudent = student
      }
    },

    // 评语
    selectComment(state, [categoryKey, commentContent]){
      const siestaDining = state.selectedStudent.siestaDining
      if (siestaDining[categoryKey]) {
        if (siestaDining[categoryKey].status.includes(commentContent)) {
          const index = siestaDining[categoryKey].status.indexOf(commentContent)
          siestaDining[categoryKey].status.splice(index, 1)
        } else {
          siestaDining[categoryKey].status.push(commentContent)
        }
      }
      if (categoryKey === 'lunch' || categoryKey === 'dinner') {
        if (siestaDining[categoryKey].status.length > 2) { // 用餐状态情况最多选2项
          siestaDining[categoryKey].status.shift()
        }
      }
    },
    // 纪律
    selectDiscipline(state, [categoryKey, disciplineId]) {
      const siestaDining = state.selectedStudent.siestaDining
      if (siestaDining[categoryKey]) {
        siestaDining[categoryKey].discipline = disciplineId
      }
    },

    addNewCommentAndSelect(state, data) {
      const target = data.type === 1 ? state.siestaCommentList : state.diningCommentList
      target.push({
        cid: parseInt(data.cId),
        comment: data.comment,
      })
    },

    setUploadedImageList(state, imageList) {
      state.selectedStudent.siestaDining.imgUrl = imageList
      state.v++
    },

    // addDinnerField(state) {
    //   if (state.selectedStudent !== null && state.selectedStudent.siestaDining) {
    //     state.selectedStudent.siestaDining.isDinnerAvailable = true
    //     state.v++
    //   }
    // },
    // removeDinnerField(state) {
    //   if (state.selectedStudent !== null && state.selectedStudent.siestaDining) {
    //     state.selectedStudent.siestaDining.isDinnerAvailable = false
    //     state.v++
    //   }
    // },

    // 当保存成功后
    afterSubmitSuccess(state) {
      state.selectedStudent.isSave = true
      state.selectedStudent = null
    },
  },
  actions: {
    async fetchData({ commit }) {
      const response = await getSiestaData()
      if (response.data.meta.success) {
        commit('setSiestaData', response.data.data)
      }
      return response
    },
    async checkBeforeSubmit({ state }) {
      if (state.selectedStudent === null) {
        return '请先选择学生'
      }

      const siestaDining = state.selectedStudent.siestaDining
      const result = ['siesta', 'lunch', 'dinner'].some(key => siestaDining[key] && siestaDining[key].status.length > 0)
      if (!result) {
        return `午餐，午休和晚餐，需要至少选择一种状态才可以提交`
      }

      return true
    },
    async submit({ commit, state, getters, dispatch }) {
      const selectedStudent = state.selectedStudent
      const data = {
        stuId: selectedStudent.studentId,
        siestaComment: await dispatch('getCommentIds', 'siesta'),
        siestaDiscipline: selectedStudent.siestaDining.siesta.discipline,
        lunchComment: await dispatch('getCommentIds', 'lunch'),
        lunchDiscipline: selectedStudent.siestaDining.lunch.discipline,
        dinnerComment: await dispatch('getCommentIds', 'dinner'),
        dinnerDiscipline: selectedStudent.siestaDining.dinner.discipline,
        imgUrl: getters.selectedStudentImageList.map(image => image.ossKey),
      }
      const response = await submit(data)
      if (response.data.meta.success) {
        commit('afterSubmitSuccess')
        return true
      }

      return false
    },
    getCommentIds({ state }, categoryKey) {
      const selectedStudent = state.selectedStudent
      const status = selectedStudent.siestaDining[categoryKey].status
      const commentList = categoryKey === 'siesta' ? state.siestaCommentList : state.diningCommentList
      const result = status.map(state => {
        const comment = commentList.find(comment => comment.comment === state)
        return comment ? comment.cid : 0
      })
      return result.filter(id => id !== 0)
    },
    async postNewComment({ commit }, { type, comment}) {
      const response = await createComment(type, comment)
      if (response.data.meta.success) {
        commit('addNewCommentAndSelect', response.data.data)
      }
      return response
    },
  },
  getters: {
    // selectedStudentShowDinner(state) {
    //   return (state.v > 0 && state.selectedStudent !== null && state.selectedStudent.siestaDining && state.selectedStudent.siestaDining.isDinnerAvailable)
    // },
    selectedStudentImageList(state) {
      return (state.v > 0 && state.selectedStudent !== null && state.selectedStudent.siestaDining) ? state.selectedStudent.siestaDining.imgUrl : []
    },

  }
}


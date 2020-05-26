import { isEmpty } from '@/utils'
import { getIsShowGradeName, setIsShowGradeName } from '@/utils/config'
import { getSafflowerScore, getEvaluationComment, addComment, submitEvaluation } from '@/api/school/safflower'

export default {
  name: 'evaluation',
  namespaced: true,

  state: {
    classIdList: [],
    classNameList: [],
    studentList2dArray: [], // 一个班级一个子元素, 第二维的数组是学生列表数组
    isShowGradeName: getIsShowGradeName(),
    isFullscreenSelectStudent: false,
    commentList: [],
    commentCategoryList: [],


    selectedStudentList: [
      // {
      //   studentName: '',
      //   studentId: 0,
      //   classId: 0,
      //   gradeName:"一年级",
      // }
    ],
    currentCommentType: 0, // 当前切换的评语类型 0 奖励 1 扣除
    selectedCommentType: 0, // 当前选中的评语类型
    selectedCommentList: [],
    imageList: [],
    t: 0,
  },
  mutations: {
    resetAll(state) {
      state.selectedStudentList = []
      state.selectedCommentList = []
      state.imageList = []
    },
    setClassStudentList(state, classStudentList) {
      if (isEmpty(classStudentList)) {
        return
      }

      const classIdList = []
      const classNameList = []
      const studentList2dArray = []

      classStudentList.forEach(clazz => {
        clazz.clsId = parseInt(clazz.clsId)

        classIdList.push(clazz.clsId)
        classNameList.push(clazz.clsName)
        clazz.stuList.forEach(student => {
          student.studentId = parseInt(student.stuId)
          student.studentName = student.stuName
          student.classId = clazz.clsId
        })
        studentList2dArray.push(clazz.stuList)
      })

      state.classIdList = classIdList
      state.classNameList = classNameList
      state.studentList2dArray = studentList2dArray
    },
    setCommentList(state, commentList) {
      if (isEmpty(commentList)) {
        return
      }

      state.commentList = commentList
      if (Array.isArray(state.commentList['rewardComment'])) {
        state.commentCategoryList = state.commentList['rewardComment'].map(({categoryId, categoryName}) => ({categoryId, categoryName}))
      }
    },

    toggleShowGradeName(state) {
      state.isShowGradeName = !state.isShowGradeName
      setIsShowGradeName(state.isShowGradeName)
    },
    toggleFullscreenSelectStudent(state) {
      state.isFullscreenSelectStudent = !state.isFullscreenSelectStudent
    },

    // 学生
    selectStudent(state, [classIndex, studentId]) {
      if (isEmpty(state.studentList2dArray[classIndex])) {
        return
      }
      const isExists = state.selectedStudentList.some(student => student.studentId === studentId)
      if (isExists) {
        return
      }
      const student = state.studentList2dArray[classIndex].find(student => student.studentId === studentId)
      if (student) {
        state.selectedStudentList.push(student)
      }
    },
    unselectStudent(state, studentId) {
      const index = state.selectedStudentList.findIndex(student => student.studentId === studentId)
      if (index !== undefined && index >= 0) {
        state.selectedStudentList.splice(index, 1)
      }
    },

    setCurrentCommentType(state, type) {
      state.currentCommentType = type
    },
    toggleSelectComment(state, [categoryId, comment]) {
      if (state.currentCommentType !== state.selectedCommentType) {
        state.t ++
        state.selectedCommentList = []
      }
      state.selectedCommentType = state.currentCommentType

      const com = {
        commentId: comment.id,
        commentWorth: comment.worth,
        comment: comment.content,
      }
      const selectedCategory = state.selectedCommentList.find(category => category.categoryId === categoryId)
      if (!selectedCategory) {
        state.selectedCommentList.push({
          categoryId,
          comments: [com]
        })
      } else {
        const selectedCommentIndex = selectedCategory.comments.findIndex(comment => comment.commentId === com.commentId)
        if (selectedCommentIndex > -1) {
          selectedCategory.comments.splice(selectedCommentIndex, 1)
        } else {
          selectedCategory.comments.push(com)
        }
      }
    },
    newComment(state, [commentType, categoryId, comment]) {
      const commentList = state.commentList[commentType === 0 ? 'rewardComment' : 'deductComment']
      const category = commentList.find(category => category.categoryId === categoryId)
      if (category) {
        category.comment.push(comment)
      } else {
        alert('添加评语发生错误')
      }
    },

    setUploadedImageList(state, imageList) {
      state.imageList = imageList
    },
    increaseStudentSafflowerNumber(state) {
      const key = state.selectedCommentType === 0 ? 'rewardNum' : 'deductNum'
      const worth = state.selectedCommentList.reduce((last, category) => {
        return last + category.comments.reduce((sum, comment) => sum + comment.commentWorth, 0)
      }, 0)
      state.selectedStudentList.forEach(student => student[key] = parseInt(student[key]) + worth)
    },

  },
  actions: {
    async fetchStudentList({ commit }) {
      const response = await getSafflowerScore()
      if (response.data.meta.success && response.data.data.clsStu) {
        commit('setClassStudentList', response.data.data.clsStu)
      }
    },
    async fetchCommentList({ commit }) {
      const response = await getEvaluationComment()
      if (response.data.meta.success && response.data.data) {
        commit('setCommentList', response.data.data)
      }
    },
    async postNewComment({ commit }, data) {
      const response = await addComment(data)
      if (response.data.meta.success) {
        const categoryId = data.categoryId
        const comment = {
          id: parseInt(response.data.data.commentId),
          worth: data.worth,
          content: data.text,
        }
        commit('newComment', [data.type - 1, categoryId, comment])
        commit('toggleSelectComment', [categoryId, comment])
      }
      return response
    },
    async checkBeforeSubmit({ state }) {
      if (state.selectedStudentList.length === 0) {
        return '请选择要进行评分的学生'
      }

      const isSelectedComment = state.selectedCommentList.length > 0 && state.selectedCommentList.find(category => category.comments.length > 0)
      if (!isSelectedComment) {
        return '请选择评语'
      }

      return true
    },
    async submit({ commit, state, getters }) {
      const response = await submitEvaluation({
        stuIds: getters.selectedStudentIdList,
        categorys: state.selectedCommentList,
        imgurl: state.imageList.map(image => image.ossKey),
        type: state.selectedCommentType + 1
      })
      if (response.data.meta.success) {
        commit('increaseStudentSafflowerNumber')
        commit('resetAll')
        return true
      }

      return false
    },
  },
  getters: {
    selectedStudentNumbers(state) {
      return state.selectedStudentList.length
    },
    selectedCommentNumbers(state) {
      return state.selectedCommentList.reduce((last, commentCategory) => {
        return last + commentCategory.comments.length
      }, 0)
    },
    selectedStudentIdList(state) {
      return state.selectedStudentList.map(student => student.studentId)
    },
    selectedClassIdList(state) {
      return Array.from(new Set(state.selectedStudentList.map(student => student.classId)))
    },
    selectedCommentIdList(state) {
      return state.selectedCommentList.reduce((last, selectedCommentCategory) => {
        return last.concat(selectedCommentCategory.comments.map(comment => comment.commentId))
      }, [])
    },
  },

}

import { isEmpty } from '@/utils'

export default {
  namespaced: true,

  state: {
    action: 0, // 0 午休表现 1 用餐情况

    selectedStudentList: [ // 已选中的学生列表
      // {
      //   stuName: '',
      //   stuId: 0,
      //   classId: 0,
      //   gradeName:"一年级",
      //   isDining:1,
      //   isSiesta:1,
      // }
    ],
    selectedComment: [], // 已选中的评语, 总共两种评语, 第一个子元素为第一种评语, 第二个子元素为第二种评语

    // 评语
    commentData: [], // 二维数组, 第一个子元素是午休表现的评语数组

    // 选择学生组件, 每页学生个数全局参数
    studentPaginateItemPrePage: 0,
    // 选择评语组件, 每页评语行数全局参数
    commentPaginateLinePrePage: 0,

    classIdList: [], // 班级ID列表, 一维数组
    classNameList: [], // 班级名列表, 一维数组
    studentList2dArray: [], // 一个班级一个子元素, 第二维的数组是学生列表数组
    isShowGradeName: false,
  },
  mutations: {
    resetAll(state) {
      state.selectedStudentList = []
      state.selectedComment = []
    },
    setStudentData(state, data) {
      if (isEmpty(data)) {
        return
      }

      const classIdList = []
      const classNameList = []
      const studentList2dArray = []

      data.forEach(clazz => {
        clazz.clsId = parseInt(clazz.clsId)

        classIdList.push(clazz.clsId)
        classNameList.push(clazz.clsName)
        clazz.stuList.forEach(student => {
          student.stuId = parseInt(student.stuId)
          student.classId = clazz.clsId
        })
        studentList2dArray.push(clazz.stuList)
      })

      state.classIdList = classIdList
      state.classNameList = classNameList
      state.studentList2dArray = studentList2dArray
    },
    action(state, action) {
      state.action = action
      this.commit('lunch/resetAll')
    },

    // 当提交评语后, 修改相应学生的isSiesta, isDining值
    afterSubmitSuccess(state) {
      const key = state.action === 0 ? 'isSiesta' : 'isDining'
      state.selectedStudentList.forEach(student => student[key] = 1)
      this.commit('lunch/resetAll')
    },

    // 学生
    selectStudent(state, [classIndex, stuId]) {
      if (isEmpty(state.studentList2dArray[classIndex])) {
        return
      }
      const isExists = state.selectedStudentList.some(student => student.stuId === stuId)
      if (isExists) {
        return
      }
      const student = state.studentList2dArray[classIndex].find(student => student.stuId === stuId)
      if (student) {
        state.selectedStudentList.push(student)
      }
    },
    uncheckedStudent(state, stuId) {
      const index = state.selectedStudentList.findIndex(student => student.stuId === stuId)
      if (index !== undefined && index >= 0) {
        state.selectedStudentList.splice(index, 1)
      }
    },
    selectAllStudent(state, classIndex) {
      if (isEmpty(state.studentList2dArray[classIndex])) {
        return
      }
      const selectedStudentIdList = state.selectedStudentList.map(student => student.stuId)
      const result = [].concat(state.selectedStudentList)

      state.studentList2dArray[classIndex].forEach(student => {
        if (!selectedStudentIdList.includes(student.stuId)) {
          result.push(student)
        }
      })
      state.selectedStudentList = result
    },
    uncheckAllStudent(state, classIndex) {
      if (isEmpty(state.studentList2dArray[classIndex])) {
        return
      }
      const result = []
      const classStudents = state.studentList2dArray[classIndex]
      for (let i = 0; i < state.selectedStudentList.length; i++) {
        const currentLoopStudent = state.selectedStudentList[i]
        const isNeedDelete = classStudents.some(student => student.stuId === currentLoopStudent.stuId)
        if (!isNeedDelete) {
          result.push(currentLoopStudent)
        }
      }
      state.selectedStudentList = result
    },

    setStudentPaginateItemPrePage(state, itemPrePage) {
      state.studentPaginateItemPrePage = itemPrePage
    },

    // 评语
    selectComment(state, [commentGroupIndex, cid]){
      state.selectedComment.splice(commentGroupIndex, 1, cid)
    },
    setCommentPaginateLinePrePage(state, itemPrePage){
      state.commentPaginateLinePrePage = itemPrePage
    },
    setCommentData(state, [action, comments]) {
      comments.forEach(commentGroup => {
        commentGroup.comments.forEach(comment => comment.cid = parseInt(comment.cid))
      })
      state.commentData.splice(action, 1, comments)
    },
    setCommentNormalSelect(state, action) { // 默认选中第一个评语
      if (Array.isArray(state.selectedComment) && !isEmpty(state.selectedComment) && state.selectedComment.some(cid => cid !== 0)) {
        return
      }
      const comments = state.commentData[action]
      const selectedComment = []
      comments.forEach(commentGroup => {
        if (!isEmpty(commentGroup.comments)) {
          selectedComment.push(commentGroup.comments[0].cid)
        }
      })
      state.selectedComment = selectedComment
    },
    addNewCommentAndSelect(state, [action, comment]) {
      comment.cid = parseInt(comment.cId)

      const commentGroup = Array.isArray(state.commentData[action]) ? state.commentData[action] : {}
      const commentGroupIndex = comment.category%2 === 1 ? 0 : 1
      const comments = Array.isArray(commentGroup[commentGroupIndex].comments) ? commentGroup[commentGroupIndex].comments : []
      comments.push(comment)
      commentGroup[commentGroupIndex].comments = comments
      state.commentData[action] = commentGroup

      this.commit('lunch/selectComment', [commentGroupIndex, comment.cid])
    },
    toggleShowGrade(state) {
      state.isShowGradeName = !state.isShowGradeName
    }
  },
  getters: {
    // 当前选择的行为: 0 午休表现 1 用餐情况
    currentAction(state) {
      return state.action
    },
    // 已选中的班级ID列表
    selectedClassIdList(state) {
      return state.selectedStudentList.reduce((result, student) => {
        if (!result.includes(student.classId)) {
          result.push(student.classId)
        }
        return result
      }, [])
    },
    // // 已选中的评语
    selectedComment(state) {
      return state.selectedComment
    },
    // 已选中的学生的id列表
    selectedStudentIdList(state) {
      return state.selectedStudentList.map(student => student.stuId)
    },
    commentData_0(state) {
      return Array.isArray(state.commentData[0]) ? state.commentData[0] : []
    },
    commentData_1(state) {
      return Array.isArray(state.commentData[1]) ? state.commentData[1] : []
    },
  }
}

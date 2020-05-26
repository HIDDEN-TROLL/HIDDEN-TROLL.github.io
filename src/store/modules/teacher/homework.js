import { isEmpty, uploadVoice } from '@/utils'
import { getIsShowHomeworkContentTextArea, setIsShowHomeworkContentTextArea } from '@/utils/config'
import { getHomeworkNoticeData, postHomeworkNoticeData } from '@/api/teacher/homework'

export default {
  name: 'homework',
  namespaced: true,

  state: {
    isDataReady: false,

    classNameList: [],
    studentList2dArray: [], // 一个班级一个子元素, 第二维的数组是学生列表数组
    isShowGradeName: true,
    isShowHomeworkContentTextarea: getIsShowHomeworkContentTextArea(false),

    selectedStudent: null,
    selectedStudentSendNotice: false,

    discipline: [],
    subjects: ['language', 'math', 'english'],
  },
  mutations: {
    setData(state, data) {
      if (isEmpty(data)) {
        return
      }

      const classNameList = []
      const studentList2dArray = []

      data.clsStu.forEach(clazz => {
        clazz.clsId = parseInt(clazz.clsId)

        classNameList.push(clazz.clsName)
        clazz.stuList.forEach(student => {
          student.studentId = parseInt(student.stuId)
          student.studentName = student.stuName
          student.classId = clazz.clsId
        })
        studentList2dArray.push(clazz.stuList)
      })

      state.classNameList = classNameList
      state.studentList2dArray = studentList2dArray
      state.selectedStudent = null

      state.discipline = data.discipline

      state.isDataReady = true
    },

    toggleShowGradeName(state) {
      state.isShowGradeName = !state.isShowGradeName
    },
    toggleShowHomeworkContentTextarea(state) {
      state.isShowHomeworkContentTextarea = !state.isShowHomeworkContentTextarea
      setIsShowHomeworkContentTextArea(state.isShowHomeworkContentTextarea)
    },

    // 学生
    selectStudent(state, [classIndex, studentId]) {
      if (isEmpty(state.studentList2dArray[classIndex])) {
        return
      }
      const student = state.studentList2dArray[classIndex].find(student => student.studentId === studentId)
      if (student) {
        const mapping = {
          language: '语文',
          math: '数学',
          english: '英语',
        }
        for (let key in mapping) {
          student.workInfo[key].title = mapping[key]
        }

        state.selectedStudent = student
        state.selectedStudentSendNotice = !!student.workInfo.isSendNotice

        if (student.workInfo.isDisableSwitchSendNotice === undefined) {
          student.workInfo.isDisableSwitchSendNotice = !!(student.workInfo.isSubmit && student.workInfo.isSendNotice)
        }
      }
    },

    updateSubjectFinishedStatus(state, [key, status]) {
      if (state.selectedStudent) {
        state.selectedStudent.workInfo[key].isFulfil = status ? 1 : 0
      }
    },
    updateSubjectUploadedImageList(state, [key, imageList]) {
      if (state.selectedStudent) {
        state.selectedStudent.workInfo[key].imageUrl = imageList
      }
    },
    updateSubjectContent(state, [key, content]) {
      if (state.selectedStudent) {
        state.selectedStudent.workInfo[key].content = content
      }
    },

    selectDiscipline(state, disciplineId) {
      if (state.selectedStudent) {
        state.selectedStudent.workInfo.discipline = disciplineId
      }
    },
    updateVoice(state, voiceLocalId) {
      if (state.selectedStudent) {
        state.selectedStudent.workInfo.voiceUrl = voiceLocalId
      }
    },

    toggleSelectedStudentSendNotice(state) {
      if (state.selectedStudent && !state.selectedStudent.workInfo.isDisableSwitchSendNotice) {
        state.selectedStudent.workInfo.isSendNotice = state.selectedStudent.workInfo.isSendNotice ? 0 : 1
        state.selectedStudentSendNotice = !!state.selectedStudent.workInfo.isSendNotice
      }
    },

    // 当保存成功后
    afterSubmitSuccess(state, options) {
      state.selectedStudent.workInfo.isSubmit = 1
      state.selectedStudent.workInfo.isDisableSwitchSendNotice = !!(state.selectedStudent.workInfo.isSubmit && state.selectedStudent.workInfo.isSendNotice)

      // 如果需要, 则删除掉当前选择的学生的已输入的评论
      if (options.resetSelectedStudentContent) {
        for (let subjectKey of state.subjects) {
          if (state.selectedStudent.workInfo[subjectKey]) {
            state.selectedStudent.workInfo[subjectKey].content = ''
          }
        }
      }

      state.selectedStudent = null
      state.selectedStudentSendNotice = false
    },
  },
  actions: {
    async fetchData({ commit }) {
      const response = await getHomeworkNoticeData()
      if (response.data.meta.success) {
        commit('setData', response.data.data)
      }
    },
    async checkBeforeSubmit({ state }) {
      if (state.selectedStudent === null) {
        return '请先选择学生'
      }

      const workInfo = state.selectedStudent.workInfo

      if (!Number.isInteger(workInfo.discipline) || !workInfo.discipline) {
        return '请先选择作业表现'
      }

      return true
    },
    async submit({ commit, state }) {
      const isShowHomeworkContentTextarea = state.isShowHomeworkContentTextarea
      const selectedStudent = state.selectedStudent
      const workInfo = selectedStudent.workInfo
      const subject = []
      const imgUrl = {}
      const content = {}
      for (let index in state.subjects) {
        const subjectKey = state.subjects[index]

        if (workInfo[subjectKey].isFulfil) {
          subject.push(parseInt(index) + 1)
        }

        imgUrl[subjectKey] = workInfo[subjectKey].imageUrl.map(image => image.ossKey)

        // 如果不显示输入框, 则表示评论为空, 即使点提交前真的有输入评论
        content[subjectKey] = !isShowHomeworkContentTextarea ? '' : workInfo[subjectKey].content
      }

      const data = {
        stuId: selectedStudent.studentId,
        clsId: selectedStudent.classId,
        isNotice: workInfo.isSendNotice,
        subject,
        discipline: workInfo.discipline,
        imgUrl,
        content,
      }
      if (workInfo.voiceUrl) {
        if (workInfo.voiceUrl.startsWith('http')) {
          data.voiceUrl = workInfo.voiceUrl
        } else {
          data.voiceUrl = await uploadVoice(workInfo.voiceUrl)
        }
      }
      const response = await postHomeworkNoticeData(data)
      if (response.data.meta.success) {
        commit('afterSubmitSuccess', {
          resetSelectedStudentContent: !isShowHomeworkContentTextarea // 如果提交前没有显示输入框, 说明不需要提交评论, 则提交成功后顺便删除这个学生的评论
        })
        return true
      }
      return false
    },
  },
  getters: {
    selectedStudentWorkInfo(state) {
      return state.selectedStudent ? state.selectedStudent.workInfo : {}
    },
  },
}

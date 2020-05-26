import { date } from '@/utils'

function parseTime(time) {
  return time === 0 ? '无' : date('y/m/d', time)
}

export default {
  name: 'charge',
  namespaced: true,

  state: {
    billData: undefined,

    feedbackSelectedStudents: [],
  },
  mutations: {
    setBillData(state, billData) {
      if (Array.isArray(billData.classes)) {
        billData.classes.forEach(clazz => {
          let className = clazz.name
          clazz.students.forEach((student, index) => {
            student.index = index + 1
            student.bindTimeText = parseTime(student.bindTime)
            student.unbindTimeText = parseTime(student.unbindTime)
            student.className = className
          })
        })
      }
      state.billData = billData
    },
    feedbackSelectStudent(state, targetStudent) {
      const index = state.feedbackSelectedStudents.findIndex(student => student.id === targetStudent.id)
      if (index >= 0) {
        state.feedbackSelectedStudents.splice(index, 1)
      } else {
        state.feedbackSelectedStudents.push(targetStudent)
      }
    }
  },
  getters: {
    feedbackSelectStudentCount(state) {
      return state.feedbackSelectedStudents.length
    },
    feedbackSelectStudentIdList(state) {
      return state.feedbackSelectedStudents.map(student => student.id)
    },
  }
}

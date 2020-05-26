import { trim, isEmpty } from '@/utils'

function generateInitRecipeData() {
  return ['一', '二', '三', '四', '五', '六', '日'].map((word, index) => {
    return {
      week: '周' + word,
      weekIndex: index + 1,
      food: [
        {
          name: '',
          imgUrl: [],
        },
      ],
    }
  })
}

function generateBaseEditPageData() {
  return {
    imgUrl: [],
    summary: '',
    teacherList: [
      {
        teacherName: '',
        introduction: '',
        avatar: [],
      },
    ],
    recipe: generateInitRecipeData(),
    address: {
      text: '',
      longitude: 0,
      latitude: 0,
    },
    qrCode: [],
  }
}

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
  var dataURL = canvas.toDataURL("image/"+ext);
  return dataURL;
}

function imgUrlToBase64(url) {
  return new Promise((resolve) => {
    const image = new Image()
    image.src = url
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function(){
      const base64 = getBase64Image(image)
      resolve(base64);
    }
  })
}

function getURLBase64(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function() {
      if (this.status === 200) {
        var blob = this.response
        var fileReader = new FileReader()
        fileReader.onloadend = function(e) {
          var result = e.target.result
          resolve(result)
        }
        fileReader.readAsDataURL(blob)
      }
    }
    xhr.onerror = function() {
      reject()
    }
    xhr.send()
  })
}

export default {
  namespaced: true,

  state: {
    status: 0, // 1 微官网首页 2 修改页面 3 预览
    currentSchoolId: 0,
    websiteData: undefined,

    editPageData: generateBaseEditPageData(),
  },
  mutations: {
    updateStatus(state, status) {
      state.status = status
    },
    setCurrentSchoolId(state, schoolId) {
      state.currentSchoolId = schoolId
    },
    setWebsiteData(state, data) {
      state.websiteData = data
    },
    resetEditPageData(state) {
      console.log('resetEditPageData')
      state.editPageData = generateBaseEditPageData()
    },


    setEditPageData_imgUrl(state, data) {
      state.editPageData.imgUrl = data
    },
    setEditPageData_summary(state, data) {
      state.editPageData.summary = data
    },
    setEditPageData_teacherList(state, data) {
      state.editPageData.teacherList = data
    },
    setEditPageData_newTeacher(state) {
      const last = state.editPageData.teacherList[state.editPageData.teacherList.length - 1]
      if (trim(last.teacherName).length !== 0 || trim(last.introduction).length !== 0 || !isEmpty(last.avatar)) {
        state.editPageData.teacherList.push({
          teacherName: '',
          introduction: '',
          avatar: [],
        })
      }
    },
    setEditPageData_delTeacher(state, index) {
      if (state.editPageData.teacherList[index]) {
        if (state.editPageData.teacherList.length > 1) {
          state.editPageData.teacherList.splice(index, 1)
        } else {
          state.editPageData.teacherList.splice(index, 1, {
            teacherName: '',
            introduction: '',
            avatar: [],
          })
        }
      }
    },
    setEditPageData_setTeacherName(state, [index, data]) {
      if (state.editPageData.teacherList[index]) {
        state.editPageData.teacherList[index].teacherName = data
      }
    },
    setEditPageData_setTeacherIntroduction(state, [index, data]) {
      if (state.editPageData.teacherList[index]) {
        state.editPageData.teacherList[index].introduction = data
      }
    },
    setEditPageData_setTeacherAvatar(state, [index, data]) {
      if (state.editPageData.teacherList[index] && data) {
        state.editPageData.teacherList[index].avatar = data
      }
    },

    setEditPageData_recipe(state, data) {
      state.editPageData.recipe = data
    },
    setEditPageData_newFood(state, dayIndex) {
      const foodList = state.editPageData.recipe[dayIndex].food
      const last = foodList[foodList.length - 1]
      if (trim(last.name).length !== 0 || !isEmpty(last.imgUrl)) {
        foodList.push({
          name: '',
          imgUrl: [],
        })
      }
    },
    setEditPageData_delFood(state, [dayIndex, foodIndex]) {
      const foodList = state.editPageData.recipe[dayIndex].food
      if (foodList[foodIndex]) {
        if (foodList.length > 1) {
          foodList.splice(foodIndex, 1)
        } else {
          foodList.splice(foodIndex, 1, {
            name: '',
            imgUrl: [],
          })
        }
      }
    },
    setEditPageData_setFoodName(state, [dayIndex, foodIndex, data]) {
      const foodList = state.editPageData.recipe[dayIndex].food
      if (foodList[foodIndex]) {
        foodList[foodIndex].name = data
      }
    },
    setEditPageData_setFoodImg(state, [dayIndex, foodIndex, data]) {
      const foodList = state.editPageData.recipe[dayIndex].food
      if (foodList[foodIndex]) {
        foodList[foodIndex].imgUrl = data
      }
    },


    setEditPageData_addressText(state, text) {
      state.editPageData.address.text = text
    },
    setEditPageData_addressLocation(state, [latitude, longitude]) {
      state.editPageData.address.latitude = latitude
      state.editPageData.address.longitude = longitude
    },
    setEditPageData_qrCode(state, data) {
      state.editPageData.qrCode = data
    },

  },
  actions: {
    generateEditPageData({ state, commit }) {
      console.log('genEditPageData')
      if (state.websiteData === undefined) {
        return
      }
      console.log('genEditPageData')
      const websiteData = state.websiteData
      if (Array.isArray(websiteData.imgUrl)) {
        commit('setEditPageData_imgUrl', websiteData.imgUrl.map(url => {
          return {
            content: url,
            ossKey: url,
          }
        }))
      }

      commit('setEditPageData_summary', websiteData.summary)
      if (Array.isArray(websiteData.teacherList)) {
        commit('setEditPageData_teacherList', websiteData.teacherList.map(teacher => {
          return {
            teacherName: teacher.teacherName,
            introduction: teacher.introduction,
            avatar: isEmpty(teacher.avatar) ? [] : [{
              content: teacher.avatar,
              ossKey: teacher.avatar,
            }],
          }
        }))
      }
      if (Array.isArray(websiteData.recipe)) {
        const formattedRecipe = websiteData.recipe.map(day => {
          return {
            week: day.week,
            weekIndex: parseInt(day.weekCode),
            food: day.food.map(food => {
              return {
                name: food.name,
                imgUrl: isEmpty(food.imgUrl) ? [] : [{
                  content: food.imgUrl,
                  ossKey: food.imgUrl,
                }],
              }
            })
          }
        })
        const recipe = state.editPageData.recipe.map(day => {
          const weekIndex = day.weekIndex
          const formattedDay = formattedRecipe.find(formattedDay => formattedDay.weekIndex == weekIndex)
          return formattedDay === undefined ? day : formattedDay
        })
        commit('setEditPageData_recipe', recipe)
      }
      commit('setEditPageData_addressText', websiteData.address)
      commit('setEditPageData_addressLocation', [websiteData.latitude, websiteData.longitude])
      commit('setEditPageData_qrCode', isEmpty(websiteData.qrCode) ? [] : [{
        content: websiteData.qrCode,
        ossKey: websiteData.qrCode,
      }])
    },
    getWebsiteFirstBannerImageBase64({ getters }) {
      return getURLBase64(getters.websiteFirstBannerImage)
    },
  },
  getters: {
    schoolName(state) {
      return state.websiteData && state.websiteData.schoolName ? state.websiteData.schoolName : ''
    },
    websiteFirstBannerImage(state) {
      return state.websiteData && state.websiteData.imgUrl && state.websiteData.imgUrl[0] ? state.websiteData.imgUrl[0] : ''
    },
    websiteSummary(state) {
      return state.websiteData && state.websiteData.summary ? state.websiteData.summary : ''
    },

    getPreviewWebsiteData(state) {
      let teacherList = state.editPageData.teacherList.filter(teacher => {
        return !isEmpty(teacher.teacherName) || !isEmpty(teacher.introduction) || (teacher.avatar && teacher.avatar[0] && teacher.avatar[0].ossKey)
      }).map(teacher => {
        return {
          teacherName: teacher.teacherName,
          introduction: teacher.introduction,
          avatar: teacher.avatar && teacher.avatar[0] ? teacher.avatar[0].content : '',
        }
      })

      let recipe = state.editPageData.recipe.filter(day => {
        if (isEmpty(day.food)) {
          return false
        }
        return day.food.every(food => !isEmpty(food.name))
      }).map((day) => {
        return {
          week: day.week,
          food: day.food.map(food => {
            return {
              name: food.name,
              imgUrl: food.imgUrl && food.imgUrl[0] ? food.imgUrl[0].content : '',
            }
          }),
        }
      })

      return {
        imgUrl: state.editPageData.imgUrl.map(item => item.content),
        summary: state.editPageData.summary,
        address: state.editPageData.address.text,
        qrCode: state.editPageData.qrCode[0] ? state.editPageData.qrCode[0].content : '',
        teacherList,
        recipe,
      }
    },

  },
}

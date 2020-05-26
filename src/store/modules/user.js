import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
    PersonalInformation:{
        username:'',
        password:'',

        name: '9mei',
        sex: '雌',
        job: '管理員',
        race: 'GOD',
        Introduction: '我日你滴嗎頁',
        time:'2020-05-18',
        avatar:require('../../assets/img/9mei.jpg'),

        routerIndex:0
    },
    token:null
}
const mutations = {
    // 登录执行方法
    LOGIN(state,data){
        state.PersonalInformation = data
    },
    // 储存用户信息/token，緩存儲存token
    setUserInfo:(state,token)=>{
        state.token = token;
        localStorage.setItem('token', 'Bearer ' + token)
    },
    // 删除用户token，緩存刪除token
    OUT:(state)=>{
        state.token = null;
        localStorage.removeItem('token')
    }
}
const actions = {

}
const getters = {
}

export default {
    namespaced: true, // 增加命名空间
    state,
    mutations,
    actions,
    getters
}




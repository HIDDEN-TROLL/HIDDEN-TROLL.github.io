import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import MainApi from '../components/api/mainApi'
Vue.use(Vuex);

const state = {
    roleState: 0, //角色类型
    token: '', //保存token
    isShow: false,
    LOADING: false, //加载状态
    homeData: []
};
const getters = { //实时监听state值的变化(最新状态)
    roleChange() { //登录角色 类型
        return state.roleState
    },
    gettoken() {
        return state.token
    }
};
const mutations = {
    role(state, loginRole) { // loginRole  当前登录角色的类型
        state.roleState = loginRole
    },
    setToken(state, token) { //保存token
        state.token = token;
        localStorage.setItem('token', token)
    },
    delToken(state) { //移除token
        state.token = '';
        localStorage.removeItem('token')
    },
    getShow(state) {
        state.isShow = true
    },
    offShow(state) {
        state.isShow = false
    },
    //保存首页信息
    setHomeInfo(state, info) {
        state.homeData = info
    },
    showLoadings(state) {
        state.LOADING = true
      setTimeout(() => {
        state.LOADING = false
      }, 5000)
    },
    hideLoadings(state) {
        state.LOADING = false
    }

};
const actions = {
    //登录信息获取
    login({
        commit
    }, obj) {
        axios.get(`${MainApi.login}?username=${obj.username}&password=${obj.password}`).then((response) => {
            commit('setToken', response.headers.authorization); //保存token
            if (state.token) {
                // this.$router.push(this.$route.path)
                //this.dispatch('Home')
            }
        })
    },
    //首页信息获取
    Home({
        commit
    }, callback) {
        axios.get(MainApi.home).then(response => {
            if (response.data.meta.code === 0) {
                commit('setHomeInfo', response.data.data);
                callback(response.data.data);
            }
        })
    }
};
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;

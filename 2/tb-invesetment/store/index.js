import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
	islogin: false, //是否已经登录
	userinfo: null //
}

const mutations = {
	//
	setLogin: (state, data) => {
		state.islogin = data
	},
	setUserinfo: (state, data) => {
		state.userinfo = data
	}

}

const actions = {
	login({
		commit
	}, data) {
		commit("setLogin", data)
	},
	userinfo({
		commit
	}, data) {
		commit("setUserinfo", data)
	}
}

const store = () => new Vuex.Store({
	state,
	mutations,
	actions
})

export default store
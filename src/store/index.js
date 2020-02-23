import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

http.interceptors.response.use(null, error => {
  console.error(error)
})

export default new Vuex.Store({
  // remove strict mode for production
  strict: true,
  state: {},
  mutations: {},
  actions: {
    async authSignUp(context, user) {
      // interceptors will be called before
      await http.post('users', user)
      // if request fail, it will be throw to the caller
    }
  },
  modules: {}
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // remove strict mode for production
  strict: true,
  state: {},
  mutations: {},
  actions: {
    authSignUp() {
      fetch('users/')
        .then(response => {
          // return a promise
          return response.json()
        })
        .then(() => {
        })
    }
  },
  modules: {}
})

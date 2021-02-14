import { createStore } from 'vuex'

export default createStore({
  state: {
    year: (new Date()).getFullYear(),
    userId: localStorage.getItem('userId')
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

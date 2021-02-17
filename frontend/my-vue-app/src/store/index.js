import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    load: false,
    user: [{
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token')
    }]
  },
  mutations: {
  },
  actions: {
    // loginUser reçoit l'email et le password et l'envoie à api
    loginUser (state, dataLogin) {
      return new Promise((resolve, reject) => {
        axios.post('https://jsonplaceholder.typicode.com/posts', {
          dataLogin
        })
          // Si les données sont valides ont parse et on stocke les donnés dans le localstorage sinon on retourne une erreur
          .then(response => {
            const dataUser = JSON.parse(decodeURIComponent(response.data.dataLogin))
            localStorage.setItem('userId', dataUser.email)
            localStorage.setItem('token', dataUser.password)
            resolve()
          })
          .catch(error => { reject(error) })
      })
    },
    // signupUser reçoit l'email et le password et l'envoie à api
    signupUser (state, dataSignup) {
      return new Promise((resolve, reject) => {
        axios.post('https://jsonplaceholder.typicode.com/posts', {
          dataSignup
        })
          // Si les données sont valides ont parse et on stocke les donnés dans le localstorage sinon on retourne une erreur
          .then(response => {
            const dataUser = JSON.parse(decodeURIComponent(response.data.dataSignup))
            localStorage.setItem('userId', dataUser.email)
            localStorage.setItem('token', dataUser.password)
            resolve()
          })
          .catch(error => { reject(error) })
      })
    },
    // deleteUser reçoit reçoit la demande et envoie à api l'userId
    deleteUser (state) {
      const userId = JSON.stringify(this.state.user[0].userId)
      return new Promise((resolve, reject) => {
        axios.post('https://jsonplaceholder.typicode.com/posts', {
          userId
        })
          .then(() => { resolve() })
          .catch(error => { reject(error) })
      })
    }
  },
  modules: {
  }
})

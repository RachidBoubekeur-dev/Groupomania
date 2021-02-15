import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    year: (new Date()).getFullYear(),
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
          // Si les données sont valide on parse et on stocke les donnés dans le localstorage sinon ont retourne une erreur
          .then(response => {
            const dataUser = JSON.parse(decodeURIComponent(response.data.dataLogin))
            localStorage.setItem('userId', dataUser.email)
            localStorage.setItem('token', dataUser.password)
            resolve()
          })
          .catch(error => { reject(error) })
      })
    }
  },
  modules: {
  }
})

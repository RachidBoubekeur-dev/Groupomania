import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    load: false,
    user: [{
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token'),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email')
    }]
  },
  mutations: {
  },
  actions: {
    // loginUser reçoit l'email et le password et l'envoie à api
    loginUser (state, dataLogin) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/api/auth/login', {
          dataLogin
        })
          // Si les données sont valides on les stocke dans le localstorage sinon on retourne une erreur
          .then(response => {
            const dataUser = response.data
            localStorage.setItem('userId', dataUser.userId)
            localStorage.setItem('token', dataUser.token)
            localStorage.setItem('name', decodeURIComponent(dataUser.name))
            localStorage.setItem('email', decodeURIComponent(dataUser.email))
            resolve(response)
          })
          .catch(error => { reject(error) })
      })
    },
    // signupUser reçoit le nom d'utilisateur, l'email et le password et l'envoie à api
    signupUser (state, dataSignup) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/api/auth/signup', {
          dataSignup
        })
          // Si les données sont valides on retourne une response sinon on retourne une erreur
          .then(response => { resolve(response) })
          .catch(error => { reject(error) })
      })
    },
    // deleteUser reçoit reçoit la demande et envoie à api l'userId
    deleteUser (state) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: 'http://localhost:3000/api/auth/profil',
          data: {
            userId: this.state.user[0].userId
          },
          headers: {
            authorization: 'Bearer ' + this.state.user[0].token
          }
        })
          .then(response => {
            localStorage.clear()
            resolve(response)
          })
          .catch(error => { reject(error) })
      })
    },
    // shareArticle reçoit le titre et le lien de l'article et l'envoie à api
    shareArticle (state, dataArticle) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'http://localhost:3000/api/article/share',
          data: {
            dataArticle,
            userId: this.state.user[0].userId
          },
          headers: {
            authorization: 'Bearer ' + this.state.user[0].token
          }
        })
          // Si les données sont valides on retourne une response sinon on retourne une erreur
          .then(response => { resolve(response) })
          .catch(error => { reject(error) })
      })
    },
    // shareArticle reçoit le titre et le lien de l'article et l'envoie à api
    newArticle (state, dataArticle) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'http://localhost:3000/api/article/new',
          data: {
            dataArticle,
            userId: this.state.user[0].userId
          },
          headers: {
            authorization: 'Bearer ' + this.state.user[0].token
          }
        })
          // Si les données sont valides on retourne une response sinon on retourne une erreur
          .then(response => { resolve(response) })
          .catch(error => { reject(error) })
      })
    },
    // getArticle demande à l'api de lui retourner tous les articles
    getArticle (state) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/article/')
          // Si les données sont retouner on retourne une response sinon on retourne une erreur
          .then(response => { resolve(response) })
          .catch(error => { reject(error) })
      })
    },
    // getOneArticle demande à l'api de lui retourner l'article demander
    getOneArticle (state, id) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/api/article/' + id)
          // Si les données sont retouner on retourne une response sinon on retourne une erreur
          .then(response => { resolve(response) })
          .catch(error => { reject(error) })
      })
    },
    // deleteArticle demande à l'api de supprimer l'article demander
    updateArticle (state, dataArticle) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'put',
          url: 'http://localhost:3000/api/article/' + dataArticle.id,
          data: {
            dataArticle,
            userId: this.state.user[0].userId
          },
          headers: {
            authorization: 'Bearer ' + this.state.user[0].token
          }
        })
          // Si les données sont retouner on retourne une response sinon on retourne une erreur
          .then(response => { resolve(response) })
          .catch(error => { reject(error) })
      })
    },
    // deleteArticle demande à l'api de supprimer l'article demander
    deleteArticle (state, id) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: 'http://localhost:3000/api/article/' + id,
          data: {
            userId: this.state.user[0].userId
          },
          headers: {
            authorization: 'Bearer ' + this.state.user[0].token
          }
        })
          // Si les données sont retouner on retourne une response sinon on retourne une erreur
          .then(response => { resolve(response) })
          .catch(error => { reject(error) })
      })
    },
    // deleteArticleShare demande à l'api de supprimer l'article partager demander
    deleteArticleShare (state, id) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: 'http://localhost:3000/api/article/share/' + id,
          data: {
            userId: this.state.user[0].userId
          },
          headers: {
            authorization: 'Bearer ' + this.state.user[0].token
          }
        })
          // Si les données sont retouner on retourne une response sinon on retourne une erreur
          .then(response => { resolve(response) })
          .catch(error => { reject(error) })
      })
    }
  },
  modules: {
  }
})

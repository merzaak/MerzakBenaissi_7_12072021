//importations
import { createStore } from 'vuex'
import 'es6-promise/auto'

const axios = require('axios')


//configurer l'url de base de l'api
const instance = axios.create({
  baseURL: 'https://www.wawasensei.dev/api/demo-auth/'
})

//garder le user connecté après avoir rafraicher la page
let user = localStorage.getItem('user');
if (!user) {
 user = {
    userId: -1,
    token: '',
  }; 
} else {
  try {
    user = JSON.parse(user)
    instance.defaults.headers.common['Authorization'] = user.token
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

export default createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      email: '',
      firstName: '',
      lastName: '',
      photo: ''
    }
  },
  mutations: {
    setStatus(state, status) {
      state.status = status
    },

    logUser(state, user) {
      instance.defaults.headers.common['Authorization'] = user.token
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },

    userInfos(state, userInfos) {
      state.userInfos = userInfos
    },

     logOut(state) {
      state.user = {
        userId: -1,
        token: ''
      }
      localStorage.removeItem('user')
     }
  },
  actions: {
    //fonction pour créer un user
    createAccount({commit}, userinfos) {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        commit
        instance.post('/createAccount', userinfos)
        .then((response) => {
          commit('setStatus', 'create')
          resolve(response)
        })
        .catch((error) => {
          commit('setStatus', 'error_create')
          reject(error)
        })
      })
    },

    //fonction pour la connexion
    login({commit}, userinfos) {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('/login', userinfos)
        .then((response) => {
          commit('setStatus', '')
          commit('logUser', response.data)
          resolve(response)
        })
        .catch((error) => {
          commit('setStatus', 'error_login')
          reject(error)
        })
      })
    },

    //fonction pour récupérer les infos user
    getUserInfos({commit}) {
      instance.post('/infos')
        .then((response) => {
          commit('userInfos', response.data.infos)
        })
        .catch(() => {
        })
    }
  },
  modules: {
  }
})

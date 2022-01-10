import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false;

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    isLogged: false
  },
  mutations: {
    initialiseStore(state) {
      
      if (localStorage.getItem('isLogged')) {
        state.isLogged = true;
        state.user = JSON.parse(localStorage.getItem('user'));
        state.token = localStorage.getItem('token');
      }
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLogged', true);
    },
    setToken(state, token) {
      state.token = token;
      state.isLogged = true;
      localStorage.setItem('token', token);
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
    return state.isLogged;
    },
  },
});

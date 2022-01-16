import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false;

export default new Vuex.Store({
  state: {
    user: null,
    initials: 'O',
    token: null,
    isLogged: false
  },
  mutations: {
    initialiseStore(state) {
      
      if (localStorage.getItem('isLogged')) {
        state.isLogged = true;
        state.user = JSON.parse(localStorage.getItem('user'));
        state.initials = String(state.user.username).split("")[0];
        state.token = localStorage.getItem('token');
      } else {
        localStorage.setItem('user', JSON.stringify({"username":"Ospite", "name":"Ospite"}));
        localStorage.setItem('initials', 'O');
        localStorage.setItem('isLogged', false);
      }
    },
    setUser(state, user) {
      state.user = user;
      state.initials = String(state.user.username).split("")[0];
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('initials', String(state.user.username).split("")[0]);
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

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { router } from "./router";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: "",
    apiKey: "AIzaSyDVmc_N7cneCOmhDQbihFTK8EPaYK9XP98",
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
    logout(state) {
      state.token = "";
      router.replace("/auth");
    },
  },
  actions: {
    gitInit({ state }) {
      let local = localStorage.getItem("token");
      if (local) {
        state.token = local;
        router.replace("/");
      } else {
        router.replace("/auth");
      }
    },
    Login({ commit }, payload) {
      let loginUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
      if (payload.isUser) {
        loginUrl =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
      }
      axios
        .post(loginUrl + "AIzaSyDVmc_N7cneCOmhDQbihFTK8EPaYK9XP98", {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        })
        .then((response) => {
          commit("setToken", response.data.idToken);
          localStorage.setItem("token", response.data.idToken);
          router.replace('/')
        });
    },
    logout({ commit }) {
      commit("logout");
      localStorage.removeItem("token");
    },
  },
});

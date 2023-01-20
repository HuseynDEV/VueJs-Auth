import Vue from "vue";
import VueRouter from "vue-router";
import About from "./pages/About";
import HomePage from "./pages/Homepage";
import Auth from "./pages/auth/Auth";
import { store } from "./store";

Vue.use(VueRouter);
export const router = new VueRouter({
  routes: [
    { path: "/", component: HomePage, beforeEnter(to,from,next){
      if(store.state.token){
        next()
      }
      else{
        next('/auth')
      }
    } },
    { path: "/about", component: About, beforeEnter(to,from,next){
      if(store.state.token){
        next()
      }
      else{
        next('/auth')
      }
    } },
    { path: "/auth", component: Auth },
  ],
  mode: "history",
});

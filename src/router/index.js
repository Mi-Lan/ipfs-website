import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import SelfItems from "../components/StoreComponents/SelfItems";
import MainStore from "../components/StoreComponents/MainStore";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
    {
      path: '/SelfItems',
      name: 'SelfItems',
      component: SelfItems
    },
    {
      path: '/MainStore',
      name: 'MainStore',
      component: MainStore
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

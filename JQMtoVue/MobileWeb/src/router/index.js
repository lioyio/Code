import Vue from 'vue'
import Router from 'vue-router'
import page from '@/pages/page'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'page',
      component: page
    }
  ]
})

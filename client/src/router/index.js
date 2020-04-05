import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Books from '@/components/Books'
import BookInfo from '@/components/BookInfo'
import BookForm from '@/components/BookForm'
import Catalogs from '@/components/Catalogs'
import Readers from '@/components/Readers'
import ReaderCard from '@/components/ReaderCard'

import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/books',
      name: 'Books',
      component: Books,
    },
    {
      path: '/books/add',
      name: 'BookForm',
      component: BookForm
    },
    {
      path: '/books/:id',
      name: 'BookInfo',
      component: BookInfo,
      props: true
    },
    {
      path: '/catalogs',
      name: 'Catalogs',
      component: Catalogs
    },
    {
      path: '/readers',
      name: 'Readers',
      component: Readers
    },
    {
      path: '/readers/:id',
      name: 'ReaderCard',
      component: ReaderCard,
      props: true
    }
  ]
});
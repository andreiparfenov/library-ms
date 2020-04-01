import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Books from '@/components/Books'
import BookForm from '@/components/BookForm'
import Catalogs from '@/components/Catalogs'
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
      component: Books
    },
    {
      path: '/books/add',
      name: 'BookForm',
      component: BookForm
    },
    {
      path: '/catalogs',
      name: 'Catalogs',
      component: Catalogs
    }
  ]
});
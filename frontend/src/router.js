import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Room from './views/Room.vue';
import Admin from './views/Admin.vue';
import Booking from './views/Booking.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/room/:id',
      name: 'Room',
      component: Room,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/login',
      component: Login,
      name: 'Login',
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      component: Register,
      name: 'Register',
      meta: {
        guest: true
      }
    },
    {
      path: '/admin',
      component: Admin,
      name: 'Admin',
      meta: {
        requiresAuth: true,
        is_admin: true
      },
    },
    {
      path: '/booking',
      component: Booking,
      name: 'Booking',
      meta: {
        requiresAuth: true
      },
    }
  ]
});

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (localStorage.getItem('user') == null) {
      next({
        path: '/login',
        params: {
          nextUrl: to.fullPath
        }
      })
    } else {
      const user = JSON.parse(localStorage.getItem('user'))

      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.roles == 'ROLE_ADMIN') {
          next()
        } else {
          next({
            name: 'home'
          })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {

    if (localStorage.getItem('user') == null) {
      next()
    } else {
      next({
        name: 'home'
      })
    }
  } else {
    next()
  }
})

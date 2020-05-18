import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify'
import {
  Datetime
} from 'vue-datetime'
import App from './App.vue';
import {
  router
} from './router';
import store from './store';
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/src/stylus/app.styl'
import 'vue-datetime/dist/vue-datetime.css'
import "@/assets/css/style.css"
import DateFilter from "./filters/date"

Vue.config.productionTip = false;
Vue.component('datetime', Datetime);

Vue.filter('date', DateFilter)

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#ffaa2c',
    success: '#3cd1c2',
    info: '#9652ff',
    error: '#f83e70'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

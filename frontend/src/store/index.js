import Vue from 'vue';
import Vuex from 'vuex';

import {
  auth
} from './auth.module';
import {
  list
} from './room.module';
import {
  member
} from './user.module';
import {
  book
} from './booking.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    list,
    member,
    book
  }
});

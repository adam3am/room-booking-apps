import UserService from '../services/user.service';

const admin = JSON.parse(localStorage.getItem('admin'));
const initialState = admin ? {
  admin
} : {
  admin: null
};

export const member = {
  namespaced: true,
  state: initialState,
  actions: {
    list({
      commit
    }, admin) {
      return UserService.list(admin).then(
        admin => {
          commit('listSuccess', admin);
          return Promise.resolve(admin);
        },
        error => {
          commit('listFailure');
          return Promise.reject(error);
        }
      );
    },
    delete({
      commit
    }, admin) {
      return UserService.delete(admin).then(
        admin => {
          commit('deleteSuccess', admin);
          return Promise.resolve(admin);
        },
        error => {
          commit('deleteFailure');
          return Promise.reject(error);
        }
      );
    },
    update({
      commit
    }, admin) {
      return UserService.update(admin.id, admin.data).then(
        response => {
          commit('updateSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('updateFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    listSuccess(state, room) {
      state.room = room;
    },
    listFailure(state) {
      state.room = null;
    },
    deleteSuccess(state, room) {
      state.room = room;
    },
    deleteFailure(state) {
      state.room = null;
    },
    updateSuccess(state, room) {
      state.room = room;
    },
    updateFailure(state) {
      state.room = null;
    }
  }
};

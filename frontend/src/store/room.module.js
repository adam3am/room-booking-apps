import RoomService from '../services/room.service';

const room = JSON.parse(localStorage.getItem('room'));
const initialState = room ? {
  room
} : {
  room: null
};

export const list = {
  namespaced: true,
  state: initialState,
  actions: {
    getPublicContent({
      commit
    }, room) {
      return RoomService.getPublicContent(room).then(
        room => {
          commit('getPublicContentSuccess', room);
          return Promise.resolve(room);
        },
        error => {
          commit('getPublicContentFailure');
          return Promise.reject(error);
        }
      );
    },
    postPublicContent({
      commit
    }, room) {
      return RoomService.postPublicContent(room).then(
        room => {
          commit('postPublicContentSuccess', room);
          return Promise.resolve(room);
        },
        error => {
          commit('postPublicContentFailure');
          return Promise.reject(error);
        }
      );
    },
    putPublicContent({
      commit
    }, room) {
      return RoomService.putPublicContent(room.id, room.data).then(
        room => {
          commit('putPublicContentSuccess', room);
          return Promise.resolve(room);
        },
        error => {
          commit('putPublicContentFailure');
          return Promise.reject(error);
        }
      );
    },
    getPublicContentt({
      commit
    }, room) {
      return RoomService.getPublicContentt(room).then(
        room => {
          commit('getPublicContenttSuccess', room);
          return Promise.resolve(room);
        },
        error => {
          commit('getPublicContenttFailure');
          return Promise.reject(error);
        }
      );
    },
    delPublicContentt({
      commit
    }, room) {
      return RoomService.delPublicContentt(room).then(
        room => {
          commit('delPublicContenttSuccess', room);
          return Promise.resolve(room);
        },
        error => {
          commit('delPublicContenttFailure');
          return Promise.reject(error);
        }
      );
    },

  },
  mutations: {
    getPublicContentSuccess(state, room) {
      state.room = room;
    },
    getPublicContentFailure(state) {
      state.room = null;
    },
    postPublicContentSuccess(state, room) {
      state.room = room;
    },
    postPublicContentFailure(state) {
      state.room = null;
    },
    putPublicContentSuccess(state, room) {
      state.room = room;
    },
    putPublicContentFailure(state) {
      state.room = null;
    },
    getPublicContenttSuccess(state, room) {
      state.room = room;
    },
    getPublicContenttFailure(state) {
      state.room = null;
    },
    delPublicContenttSuccess(state, room) {
      state.room = room;
    },
    delPublicContenttFailure(state) {
      state.room = null;
    },
  }
};

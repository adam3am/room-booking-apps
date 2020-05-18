import BookingService from '../services/booking.service';

const booking = JSON.parse(localStorage.getItem('booking'));
const initialState = booking ? {
  booking
} : {
  booking: null
};

export const book = {
  namespaced: true,
  state: initialState,
  actions: {
    register({
      commit
    }, booking) {
      return BookingService.register(booking).then(
        response => {
          commit('bookingSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('bookingFailure');
          return Promise.reject(error);
        }
      );
    },
    list({
      commit
    }, booking) {
      return BookingService.list(booking).then(
        booking => {
          commit('listbookingSuccess');
          return Promise.resolve(booking);
        },
        error => {
          commit('listbookingFailure');
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    bookingSuccess(state, booking) {
      state.booking = booking;
    },
    bookingFailure(state) {
      state.booking = null;
    },
    listbookingSuccess(state, booking) {
      state.booking = booking;
    },
    listbookingFailure(state) {
      state.booking = null;
    }
  }
};

import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/booking/';

class BookingService {
  register(user) {
    return axios.post(API_URL, {
      userId: user.userId,
      roomId: user.roomId,
      booking_title: user.booking_title,
      booking_description: user.booking_description,
      date: user.date
    }, {
      headers: authHeader()
    });
  }

  list() {
    return axios.get(`${API_URL  }all`, {
      headers: authHeader()
    }).then(response => {

      if (response.data) {
        localStorage.setItem('booking', JSON.stringify(response.data));
      }

      return response.data;
    });
  }
}

export default new BookingService();

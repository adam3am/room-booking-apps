import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/test/user/';

class UserService {
  list() {
    return axios.get(`${API_URL  }all`, {
      headers: authHeader()
    }).then(response => {

      if (response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  update(id, data) {
    return axios.put(API_URL + id, {
      username: data.username,
      email: data.email
    }, {
      headers: authHeader()
    });
  }

  delete(id) {
    return axios.delete(API_URL + id, {
      headers: authHeader()
    }).then(response => {

      if (response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data));
      }

      return response.data;
    });
  }
}

export default new UserService();

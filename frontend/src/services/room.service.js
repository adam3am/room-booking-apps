import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/room/';

class RoomService {
  getPublicContent() {
    return axios.get(`${API_URL  }all`).then(response => {

      if (response.data) {
        localStorage.setItem('room', JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  postPublicContent(dessertss) {
    return axios.post(API_URL, {
      name: dessertss.name,
      description: dessertss.description,
      capacity: dessertss.capacity,
      assets: dessertss.assets,
      pictures: dessertss.pictures
    }, {
      headers: authHeader()
    });
  }

  putPublicContent(id, data) {
    return axios.put(API_URL + id, {
      name: data.name,
      description: data.description,
      capacity: data.capacity,
      assets: data.assets
    }, {
      headers: authHeader()
    });
  }

  getPublicContentt(id) {
    return axios.get(API_URL + id, {
      headers: authHeader()
    }).then(response => {

      if (response.data) {
        localStorage.setItem('room', JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  delPublicContentt(id) {
    return axios.delete(API_URL + id, {
      headers: authHeader()
    }).then(response => {

      if (response.data) {
        localStorage.setItem('room', JSON.stringify(response.data));
      }

      return response.data;
    });
  }
}

export default new RoomService();

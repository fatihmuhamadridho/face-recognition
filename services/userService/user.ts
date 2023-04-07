import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api'
});

export class UserService {
  static ApiEndpoint = {
    user: '/user'
  };

  static getUsers() {
    return apiClient.get(this.ApiEndpoint.user);
  }
}

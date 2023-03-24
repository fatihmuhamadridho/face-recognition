import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api'
});

export class AuthService {
  static ApiEndpoint = {
    login: '/auth/login'
  };

  static onLogin(credential: { email: string; password: string }) {
    return apiClient.post(this.ApiEndpoint.login, credential);
  }
}

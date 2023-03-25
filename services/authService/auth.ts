import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api'
});

export class AuthService {
  static ApiEndpoint = {
    auth: '/auth',
    login: '/auth/login'
  };

  static onLogin(credential: { email: string; password: string }) {
    return apiClient.post(this.ApiEndpoint.login, credential);
  }

  static onPrivilege(credential: string) {
    return apiClient.get(this.ApiEndpoint.auth + '/' + credential);
  }
}

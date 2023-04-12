import axios from 'axios';
import { IOnLogin } from './interface';

const apiClient = axios.create({
  baseURL: '/api'
});

export class AuthService {
  static ApiEndpoint = {
    auth: '/auth',
    login: '/auth/login'
  };

  static onLogin(credential: IOnLogin) {
    return apiClient.post(this.ApiEndpoint.login, credential);
  }

  static onPrivilege(credential: string) {
    return apiClient.get(this.ApiEndpoint.auth + '/' + credential);
  }
}

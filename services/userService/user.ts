import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api'
});

interface userProps {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  address: string;
  RoleId: number;
}

export class UserService {
  static ApiEndpoint = {
    user: '/user'
  };

  static getUsers() {
    return apiClient.get(this.ApiEndpoint.user);
  }

  static getDetailUser(id: number) {
    return apiClient.get(this.ApiEndpoint.user + `/${id}`)
  }

  static postUser(payload: userProps) {
    return apiClient.post(this.ApiEndpoint.user, payload);
  }

  static putUser(id: number, payload: userProps) {
    return apiClient.put(this.ApiEndpoint.user + `/${id}`, payload);
  }

  static deleteUser(id: number) {
    return apiClient.delete(this.ApiEndpoint.user + `/${id}`)
  }
}

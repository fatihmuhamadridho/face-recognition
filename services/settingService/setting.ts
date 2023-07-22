import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api'
});

export class SettingService {
  static ApiEndpoint = {
    setting: '/setting'
  };

  static getAllSettings() {
    return apiClient.get(this.ApiEndpoint.setting);
  }

  static getOneSetting(name: string) {
    return apiClient.get(this.ApiEndpoint.setting + `/${name}`);
  }

  static putSetting(payload: { name: string; latitude: string; longitude: string }) {
    return apiClient.put(this.ApiEndpoint.setting + `/${payload.name}`, payload);
  }
}

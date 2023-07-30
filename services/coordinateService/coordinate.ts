import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api'
});

export class CoordinateService {
  static ApiEndpoint = {
    coordinate: '/coordinate'
  };

  static getAllCoordinate() {
    return apiClient.get(this.ApiEndpoint.coordinate);
  }

  static putCoordinate(payload: { name: string; latitude: string; longitude: string }) {
    return apiClient.put(this.ApiEndpoint.coordinate + `/${payload.name}`, payload);
  }
}

import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api'
});

export class AttendanceService {
  static ApiEndpoint = {
    attendance: '/attendance'
  };

  static getAllAttendance() {
    return apiClient.get(this.ApiEndpoint.attendance);
  }

  static getOneAttendance(credential: string) {
    return apiClient.get(this.ApiEndpoint.attendance + '/' + credential);
  }

  static postAttendance(credential: string) {
    return apiClient.post(
      this.ApiEndpoint.attendance,
      {},
      { headers: { Authorization: 'Bearer ' + credential } }
    );
  }
}

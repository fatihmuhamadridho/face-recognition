import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api'
});

export class UploadService {
  static ApiEndpoint = {
    Upload: '/upload',
    CancelUpload: '/cancel-upload'
  };

  static postUpload() {
    return apiClient.post(this.ApiEndpoint.Upload);
  }

  static cancelUpload(payload: any[]) {
    return apiClient.put(this.ApiEndpoint.CancelUpload, { imageList: payload })
  }
}

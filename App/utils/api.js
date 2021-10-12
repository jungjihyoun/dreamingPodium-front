import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // 환경변수로 지정한 BASE_URL을 사용
});

const {get, post, put, delete: destroy} = apiClient;
export {get, post, put, destroy};

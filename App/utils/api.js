import axios from 'axios';
// import {REACT_APP_BACKEND_URL} from '@env';

export const baseURL = `${process.env.REACT_APP_BACKEND_URL}`;

const apiClient = axios.create({
  baseURL, // 환경변수로 지정한 BASE_URL을 사용
});

const {get, post, put, delete: destroy} = apiClient;
export {get, post, put, destroy};

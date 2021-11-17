import axios from 'axios';
import * as config from '../../config';

// import {REACT_APP_BACKEND_URL} from '@env';

const API = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;

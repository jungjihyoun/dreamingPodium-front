// 소셜 로그인, 로그아웃 API 관리
// user_id 와 APi_Token을 return 받습니다.

import API from './API';
import AsyncStorage from '@react-native-community/async-storage';

const postKakaoToken = async (accessToken, refreshToken, setLoggedIn) => {
  return await API.post('/kakao/form', {
    access_token: accessToken,
    refresh_token: refreshToken,
  })
    .then(function (response) {
      console.log('userId return from server KAKAO ====>', response.data);

      // Login Dispatch => 유저토큰과 서버토큰을 저장
      setLoggedIn({
        userToken: response.data['user_id'],
        serverToken: response.data['API_Token'],
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

const postAppleToken = async (appleAuthRequestResponse, setLoggedIn) => {
  return await API.post('/create_user', appleAuthRequestResponse)
    .then(function (response) {
      console.log('userId return from server APPLE ====>', response.data);
      setLoggedIn({
        userToken: response.data['user_id'],
        serverToken: response.data['API_Token'],
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default {
  postKakaoToken,
  postAppleToken,
};

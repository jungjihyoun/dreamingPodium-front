// 로그인, 로그아웃 API 관리
import API from './API';
import AsyncStorage from '@react-native-community/async-storage';

const postKakaoToken = async (accessToken, refreshToken, setLoggedIn) => {
  return await API.post('/kakao/form', {
    access_token: accessToken,
    refresh_token: refreshToken,
  })
    .then(function (response) {
      console.log('userId return from server KAKAO====>', response.data);

      setLoggedIn({userToken: response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
};

const postAppleToken = async (appleAuthRequestResponse, setLoggedIn) => {
  return await API.post('/create_user', appleAuthRequestResponse)
    .then(function (response) {
      console.log('userId return from server APPLE ====>', response.data);
      setLoggedIn({userToken: response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default {
  postKakaoToken,
  postAppleToken,
};

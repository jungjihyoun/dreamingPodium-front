// 로그인, 로그아웃 API 관리
import API from './API';
import AsyncStorage from '@react-native-community/async-storage';

const postKakaoToken = async (accessToken, refreshToken ) => {
  return await API.post('http://3.35.43.76:8000/kakao/form', {
    access_token: accessToken,
    refresh_token: refreshToken,
  })
    .then(function (response) {
      AsyncStorage.setItem('userToken', response.data['user_id']);
      AsyncStorage.getItem('userToken', (_err, result) => {
        console.log('UserToken for Login', result);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default {
  postKakaoToken,
};

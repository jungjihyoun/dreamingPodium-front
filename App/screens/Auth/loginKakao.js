//카카오 로그인 프로세스
import * as KakaoLogins from '@react-native-seoul/kakao-login';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

//When the error comes from KakaoTalk for invalid hash key
//Make sure the alias name for keystore files are correct
//androidreleasekey -> android/app/release.keystore
//androiddebugkey -> android/app/debug.keystore

const signInKakaoTalk = async setUserInfo => {
  const fcmToken = await AsyncStorage.getItem('deviceToken');

  KakaoLogins.login()
    .then(data => {
      const postData = data;

      axios
        .post('http://3.35.43.76:8000/kakao/form', {
          access_token: data.accessToken,
          refresh_token: data.refreshToken,
        })
        .then(function (response) {
          console.log('api 카카오 성공', response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // 항상 실행
        });
    })
    .then(data => {
      KakaoLogins.getProfile()
        .then(response => {
          console.log({response}, 'API KakaoTalk user profile');

          const {id, nickname, gender, birthday} = response;

          setUserInfo({
            username: nickname,
            gender: gender,
            birth: birthday,
            provider: 'kakao',
            serviceId: id,
            platform: Platform.OS.toUpperCase(), //푸시알림을 등록하기 위한 플랫폼
            deviceToken: fcmToken, //푸시알림을 등록하기 위한 디바이스 토큰
          });
        })
        .catch(err => {
          console.log({err});
          alert(err);
        });
    })
    .catch(err => {
      if (err.code === 'E_CANCELLED_OPERATION') {
        console.log('에러메시지', err.message);
        alert('로그인을 취소했습니다.');
      } else {
        console.log(
          {err},
          '카카오톡 로그인 프로세스를 취소하는 동안 오류가 발생했습니다.',
        );
      }
    });
};

const signOutKakaoTalk = async () => {
  // const fcmToken = await AsyncStorage.getItem('deviceToken');
  KakaoLogins.logout()
    .then(result => {
      console.log('kakao logout');
      console.log(result);
    })
    .catch(err => {
      console.log('kakao logout error');
      console.log(err);
      alert(err);
    });
};

export {signInKakaoTalk, signOutKakaoTalk};

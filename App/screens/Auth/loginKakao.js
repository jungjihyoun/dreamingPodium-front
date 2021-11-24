/* eslint-disable no-alert */
//카카오 로그인 프로세스
import * as KakaoLogins from '@react-native-seoul/kakao-login';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../../utils/API';
//When the error comes from KakaoTalk for invalid hash key
//Make sure the alias name for keystore files are correct
//androidreleasekey -> android/app/release.keystore
//androiddebugkey -> android/app/debug.keystore

const signInKakaoTalk = async (setUserInfo, setLoggedIn) => {
  const fcmToken = await AsyncStorage.getItem('deviceToken');

  KakaoLogins.login()
    .then(async data => {
      const postData = data;
      // Token return And Set AsyncStorage To login
      await API.post('http://3.35.43.76:8000/kakao/form', {
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      })
        .then(function (response) {
          setLoggedIn({userToken: response.data['user_id']});
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .then(data => {
      KakaoLogins.getProfile()
        .then(response => {
          const {id, nickname, gender, birthday} = response;

          setUserInfo({
            username: nickname,
            gender: gender,
            birth: birthday,
            provider: 'kakao',
            serviceId: id,
            platform: Platform.OS.toUpperCase(),
            deviceToken: fcmToken,
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
  await AsyncStorage.removeItem('userToken');

  KakaoLogins.logout()
    .then(result => {
      console.log('kakao logout', result);
    })
    .catch(err => {
      console.log('kakao logout error', err);
    });
};

export {signInKakaoTalk, signOutKakaoTalk};

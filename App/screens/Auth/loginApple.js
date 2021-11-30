// 애플 로그인 프로세스
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../../utils/auth';

import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';

const signInApple = async (setUserInfo, setLoggedIn) => {
  console.log('Beginning Apple Authentication');
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  );
  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    setUserInfo({
      // username: nickname,
      // gender: gender,
      // birth: birthday,
      provider: 'Apple',
      platform: Platform.OS.toUpperCase(), //푸시알림을 등록하기 위한 플랫폼
    });

    await API.postAppleToken(appleAuthRequestResponse, setLoggedIn);
  }
};
export {signInApple};

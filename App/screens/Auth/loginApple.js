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

  // get current authentication state for user
  // This method must be tested on a real device. On the iOS simulator it always throws an error.
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

    // user is authenticated
    console.log('credentialState', credentialState);
    console.log('appleAuthRequestResponse', appleAuthRequestResponse);

    await API.postAppleToken(appleAuthRequestResponse, setLoggedIn);

    // await API.post(
    //   'http://3.35.43.76:8000/create_user',
    //   appleAuthRequestResponse,
    // )
    //   .then(function (response) {
    //     console.log(response.data);
    //     setLoggedIn({userToken: response.data});
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }
};
export {signInApple};

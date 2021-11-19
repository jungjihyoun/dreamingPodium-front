// 애플 로그인 프로세스
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';

const signInApple = async setUserInfo => {
  console.log('Beginning Apple Authentication');
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  // get current authentication state for user
  // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  );

  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
    console.log(credentialState);
    console.log(appleAuthRequestResponse);
  }
};
export {signInApple};

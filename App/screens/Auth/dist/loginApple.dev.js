"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signInApple = void 0;

var _reactNative = require("react-native");

var _asyncStorage = _interopRequireDefault(require("@react-native-community/async-storage"));

var _reactNativeAppleAuthentication = require("@invertase/react-native-apple-authentication");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 애플 로그인 프로세스
var signInApple = function signInApple(setUserInfo, setLoggedIn) {
  var appleAuthRequestResponse, credentialState;
  return regeneratorRuntime.async(function signInApple$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('Beginning Apple Authentication');
          _context.next = 3;
          return regeneratorRuntime.awrap(_reactNativeAppleAuthentication.appleAuth.performRequest({
            requestedOperation: _reactNativeAppleAuthentication.appleAuth.Operation.LOGIN,
            requestedScopes: [_reactNativeAppleAuthentication.appleAuth.Scope.EMAIL, _reactNativeAppleAuthentication.appleAuth.Scope.FULL_NAME]
          }));

        case 3:
          appleAuthRequestResponse = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(_reactNativeAppleAuthentication.appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user));

        case 6:
          credentialState = _context.sent;

          // use credentialState response to ensure the user is authenticated
          if (credentialState === _reactNativeAppleAuthentication.appleAuth.State.AUTHORIZED) {
            setUserInfo({
              // username: nickname,
              // gender: gender,
              // birth: birthday,
              provider: 'Apple',
              platform: _reactNative.Platform.OS.toUpperCase() //푸시알림을 등록하기 위한 플랫폼

            }); // user is authenticated

            console.log(credentialState);
            console.log(appleAuthRequestResponse);
          }

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.signInApple = signInApple;
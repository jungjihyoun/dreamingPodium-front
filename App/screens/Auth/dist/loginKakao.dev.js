"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signOutKakaoTalk = exports.signInKakaoTalk = void 0;

var KakaoLogins = _interopRequireWildcard(require("@react-native-seoul/kakao-login"));

var _reactNative = require("react-native");

var _asyncStorage = _interopRequireDefault(require("@react-native-community/async-storage"));

var _API = _interopRequireDefault(require("../../utils/API"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable no-alert */
//카카오 로그인 프로세스
//When the error comes from KakaoTalk for invalid hash key
//Make sure the alias name for keystore files are correct
//androidreleasekey -> android/app/release.keystore
//androiddebugkey -> android/app/debug.keystore
var signInKakaoTalk = function signInKakaoTalk(setUserInfo, setLoggedIn) {
  var fcmToken;
  return regeneratorRuntime.async(function signInKakaoTalk$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_asyncStorage["default"].getItem('deviceToken'));

        case 2:
          fcmToken = _context2.sent;
          KakaoLogins.login().then(function _callee(data) {
            var postData;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    postData = data; // Token return And Set AsyncStorage To login

                    _context.next = 3;
                    return regeneratorRuntime.awrap(_API["default"].post('http://3.35.43.76:8000/kakao/form', {
                      access_token: data.accessToken,
                      refresh_token: data.refreshToken
                    }).then(function (response) {
                      setLoggedIn({
                        userToken: response.data['user_id']
                      });
                    })["catch"](function (error) {
                      console.log(error);
                    }));

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }).then(function (data) {
            KakaoLogins.getProfile().then(function (response) {
              var id = response.id,
                  nickname = response.nickname,
                  gender = response.gender,
                  birthday = response.birthday;
              setUserInfo({
                username: nickname,
                gender: gender,
                birth: birthday,
                provider: 'kakao',
                serviceId: id,
                platform: _reactNative.Platform.OS.toUpperCase(),
                deviceToken: fcmToken
              });
            })["catch"](function (err) {
              console.log({
                err: err
              });
              alert(err);
            });
          })["catch"](function (err) {
            if (err.code === 'E_CANCELLED_OPERATION') {
              console.log('에러메시지', err.message);
              alert('로그인을 취소했습니다.');
            } else {
              console.log({
                err: err
              }, '카카오톡 로그인 프로세스를 취소하는 동안 오류가 발생했습니다.');
            }
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.signInKakaoTalk = signInKakaoTalk;

var signOutKakaoTalk = function signOutKakaoTalk() {
  return regeneratorRuntime.async(function signOutKakaoTalk$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_asyncStorage["default"].removeItem('userToken'));

        case 2:
          KakaoLogins.logout().then(function (result) {
            console.log('kakao logout', result);
          })["catch"](function (err) {
            console.log('kakao logout error', err);
          });

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.signOutKakaoTalk = signOutKakaoTalk;
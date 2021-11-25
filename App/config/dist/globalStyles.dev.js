"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.width = exports.height = exports.images = exports.fontSizes = exports.storyBoardDimensions = exports.colors = exports.fonts = void 0;

var _reactNative = require("react-native");

var fonts = {
  gmarket: 'GmarketSansLight',
  spoqaRegular: 'SpoqaHanSansNeo-Regular',
  spoqaBold: 'SpoqaHanSansNeo-Bold',
  spoqaLight: 'SpoqaHanSansNeo-Light'
};
exports.fonts = fonts;
var colors = {
  primary: '#44BCCE',
  black: '#191919',
  white: '#ffffff',
  lightBlue: '#8ED7E1',
  lightGreen: '#6FF1CE',
  textGrey: '#5F6768',
  darkGrey: '#5F6768',
  lightGrey: '#9098B1',
  borderGrey: '#d2d2d2',
  whiteGrey: '#e0e0e0',
  //social button colors
  apple: '#040708',
  kakaoTalk: '#FBE950'
};
exports.colors = colors;
var storyBoardDimensions = {
  height: 835,
  width: 397
};
exports.storyBoardDimensions = storyBoardDimensions;
var fontSizes = {
  title: 18,
  subtitle: 12,
  minititle: 10,
  textInput: _reactNative.Dimensions.get('screen').height <= 650 ? 16 : 20
};
exports.fontSizes = fontSizes;
var images = {
  home: require('../assets/images/home.png'),
  dream: require('../assets/images/dream.png'),
  profile: require('../assets/images/profile.png'),
  profileImgGroup: require('../assets/images/user.png'),
  logo: require('../assets/images/dreamingLogo.png'),
  trainingPart: require('../assets/images/trainingPart.png'),
  conditioningPart: require('../assets/images/conditioningPart.png'),
  check: require('../assets/images/check.png'),
  dropButton: require('../assets/images/dropButton.png'),
  upButton: require('../assets/images/upButton.png'),
  kakao: require('../assets//images/kakaoLogin.png'),
  apple: require('../assets//images/appleLogin.png'),
  addButton: require('../assets/images/add_circle.png'),
  closeButton: require('../assets/images/close.png')
};
exports.images = images;
var height = (_reactNative.Dimensions.get('screen').height * (1 / storyBoardDimensions.height)).toFixed(2);
exports.height = height;
var width = (_reactNative.Dimensions.get('screen').width * (1 / storyBoardDimensions.width)).toFixed(2);
exports.width = width;
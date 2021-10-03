import {Dimensions} from 'react-native';

export const colors = {
  primary: '#44BCCE',
  black: '#191919',
  white: '#FFFFFF',
  red: '#FF3636',
  lightGrey: '#5F6768',
  darkGrey: '#9098B1',
  borderGrey: '#EBF0FF',

  //social button colors
  apple: '#040708',
  naver: '#1EC800',
  kakaoTalk: '#FFDE00',
  facebook: '#3B5998',
  google: '#4a83ff',
  email: '#36A6FF',
};

export const storyBoardDimensions = {
  height: 835,
  width: 397,
};

export const fontSizes = {
  title: 18,
  subtitle: 12,
  minititle: 10,
  textInput: Dimensions.get('screen').height <= 650 ? 16 : 20,
};

export const images = {
  home: require('../assets/images/home.png'),
  dream: require('../assets/images/dream.png'),
  profile: require('../assets/images/profile.png'),
  profileImgGroup: require('../assets/images/profileImgGroup.png'),
  logo: require('../assets/images/dreamingLogo.png'),
  trainingPart: require('../assets/images/trainingPart.png'),
  conditioningPart: require('../assets/images/conditioningPart.png'),
  check: require('../assets/images/check.png'),
  dropButton: require('../assets/images/dropButton.png'),
  upButton: require('../assets/images/upButton.png'),
  kakao: require('../assets//images/kakaoLogin.png'),
};

export const height = (
  Dimensions.get('screen').height *
  (1 / storyBoardDimensions.height)
).toFixed(2);

export const width = (
  Dimensions.get('screen').width *
  (1 / storyBoardDimensions.width)
).toFixed(2);

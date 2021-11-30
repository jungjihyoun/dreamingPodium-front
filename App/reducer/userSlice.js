import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';

import API from '../utils/profile';

export const fetchProfileData = createAsyncThunk(
  // record 불러오기
  'profile/get',
  async payload => {
    const response = await API.getProfile(payload.user_id);
    if (response.status !== 200) {
      throw Error(response.data);
    }
    return response.data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, //유저 정보가 모두 담기는 변수
    userToken: '', // TOKEN ID
    loggedIn: false,
    provider: '',
    serviceId: '',
    platform: '',
    deviceToken: '',
    serverToken: '',

    username: '',
    userImage: '',
    gender: null,
    birth: null,
    team: null,
    field: null,
  },

  // action 로직
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload.userToken;
      state.serverToken = action.payload.serverToken;
      state.loggedIn = true;
    },
    setLogin: (state, action) => {
      console.log(
        'token login redux 토큰 저장을 성공하였습니다.',
        action.payload.userToken,
        action.payload.serverToken,
      );
      AsyncStorage.setItem('userToken', action.payload.userToken);
      AsyncStorage.setItem('serverToken', action.payload.serverToken);

      state.loggedIn = true;
      state.userToken = action.payload.userToken;
      state.serverToken = action.payload.serverToken;
    },
    setLogout: state => {
      console.log('token logout redux');
      AsyncStorage.removeItem('userToken');
      state.loggedIn = false;
    },
    // 로그인 시 정보 받기
    setUser: (state, action) => {
      //유저 정보를 세팅한다.
      state.provider = action.payload.provider;
      state.serviceId = action.payload.serviceId;
      state.loggedIn = true;
      state.platform = action.payload.platform;
      // state.deviceToken = action.payload.deviceToken;
      state.user = action.payload;
      state.username = action.payload.username;
      state.gender = action.payload.gender;
      state.birth = action.payload.birth;
    },
    // setUserImage: (state, action) => {
    //   console.log('redux 이미지', state.payload);
    // },
    // profile 화면에서 정보 받기
    setProfile: (state, action) => {
      state.username = action.payload.username;
      state.gender = action.payload.gender;
      state.birth = action.payload.birth;
      state.field = action.payload.field;
      state.team = action.payload.team;
      state.userImage = action.payload.userImage;
      console.log('redux 프로필 세팅', state);
    },

    register: (state, action) => {
      //회원가입
      state.user.apart = action.payload;
    },
    setDepartment: (state, action) => {
      state.department = action.payload;
    },
    setField: (state, action) => {
      state.field = action.payload;
    },

    // clearReserve: state => {
    //   //최적화를 위함
    //   state.user.reserved = null;
    // },
  },
  extraReducers: {
    [fetchProfileData.pending](state, action) {
      // 요청
      console.log('profile pending', action.payload);
    },
    [fetchProfileData.fulfilled](state, action) {
      // 성공
      state.username = action.payload.name;
      state.gender = action.payload.gender;
      state.birth = action.payload.birthday;
      state.team = action.payload.team;
      state.field = action.payload.field;
      state.userImage = action.payload.profile_image;
      console.log('after fetch profile : ', state.userImage);
    },
    [fetchProfileData.rejected](state, action) {
      // 실패
      console.log('profile fail', action.payload);
    },
  },
});
export const {
  setLogin,
  setUser,
  setLogout,
  register,
  setDepartment,
  setField,
  setUserImage,
  setProfile,
  setUserToken,
} = userSlice.actions; //액션들을 익스포트

export const selectLogin = state => state.user.loggedIn;
// export const selectToken = state => state.user.token;
export const selectUser = state => state.user.user;
// export const setUserImage = state => state.user.

export default userSlice.reducer;

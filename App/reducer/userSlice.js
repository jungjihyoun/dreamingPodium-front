import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';

// export const getReserveData = createAsyncThunk(
//   'user/getReserveData',
//   async payload => {
//     const response = await parkingAPI.getUser(payload);
//     if (response.status != 200) throw Error(response.data);
//     return response.data.reserved;
//   },
// );

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, //유저 정보가 모두 담기는 변수
    loggedIn: false,
    provider: '',
    serviceId: '',
    platform: '',
    deviceToken: '',

    username: '',
    userImage: '',
    gender: null,
    birth: null,
    team: null,
    field: null,
  },

  // action 로직
  reducers: {
    login: (state, action) => {
      console.log('token login', action.payload.token);
      AsyncStorage.setItem('userToken', action.payload.token);
      state.loggedIn = true;
      state.token = action.payload.token;
    },
    logout: state => {
      console.log('token logout');
      AsyncStorage.removeItem('userToken');
      state.loggedIn = false;
    },
    // 로그인 시 정보 받기
    setUser: (state, action) => {
      //유저 정보를 세팅한다.
      // state.user = action.payload;
      // state.username = action.payload.username;
      state.provider = action.payload.provider;
      state.serviceId = action.payload.serviceId;
      state.loggedIn = true;
      state.platform = action.payload.platform;
      // state.deviceToken = action.payload.deviceToken;
      state.user = action.payload;
      state.username = action.payload.username;
      state.gender = action.payload.gender;
      state.birth = action.payload.birth;
      console.log('redux 로그인 세팅', state);
    },
    setUserImage: (state, action) => {
      console.log('redux 이미지', state.payload);
    },
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
});
export const {
  login,
  setUser,
  logout,
  register,
  setDepartment,
  setField,
  setUserImage,
  setProfile,
} = userSlice.actions; //액션들을 익스포트

export const selectLogin = state => state.user.loggedIn;
export const selectToken = state => state.user.token;
export const selectUser = state => state.user.user;
// export const setUserImage = state => state.user.

export default userSlice.reducer;

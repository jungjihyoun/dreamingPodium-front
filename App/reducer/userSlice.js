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

    userImage: '',
    loggedIn: false,
    username: null,
    provider: '',
    serviceId: '',
    platform: '',
    deviceToken: '',

    // 추가 정보
    gender: null,
    birthday: null,
    team: null,
    field: null,

    // ### 첫 접속 여부 판단 넣기
  },

  // action 로직
  reducers: {
    login: (state, action) => {
      //로그인
      console.log('token', action.payload.token);
      AsyncStorage.setItem('userToken', action.payload.token);
      state.loggedIn = true;
      state.token = action.payload.token;
    },
    logout: state => {
      //로그아웃
      AsyncStorage.removeItem('userToken');
      // state.reserving = null;
      // state.loggedIn = false;
    },
    setUser: (state, action) => {
      //유저 정보를 세팅한다.
      // state.user = action.payload;
      // state.username = action.payload.username;
      // state.provider = action.payload.provider;
      // state.serviceId = action.payload.serviceId;
      // state.platform = action.payload.platform;
      // state.deviceToken = action.payload.deviceToken;
      state.user = action.payload;
      state.username = action.payload.username;
      state.field = action.payload.team;
      state.team = action.payload.team;
      state.userImage = action.payload.userImage;
      console.log('유저세팅  !!!!', state.user);
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

    setUserImage: (state, action) => {
      state.userImage = action.payload.userImage;
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
} = userSlice.actions; //액션들을 익스포트

export const selectLogin = state => state.user.loggedIn;
export const selectToken = state => state.user.token;
export const selectUser = state => state.user.user;
// export const setUserImage = state => state.user.

export default userSlice.reducer;

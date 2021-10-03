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
    // routine: [],
    // gender: null,
    // birth: null,
    department: null,
    games: null,
  },

  // action 로직
  reducers: {
    login: (state, action) => {
      //로그인
      console.log('token', action.payload.token);
      AsyncStorage.setItem('userToken', action.payload.token); //로그인을 할 시에는 토큰을 로컬에 저장해준다. 만약 전역변수로만 관리한다? 앱을 껐다켰을 때 상태유지가 되지 않기 때문.
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
      state.user = action.payload;
      console.log('유저세팅', state.user);
    },
    register: (state, action) => {
      //회원가입
      state.user.apart = action.payload;
    },
    setDepartment: (state, action) => {
      console.log('department submit success', state, action);
      state.department = action.payload;
    },
    setGames: (state, action) => {
      console.log('games submit success', state, action);
      state.games = action.payload;
    },

    // clearReserve: state => {
    //   //최적화를 위함
    //   state.user.reserved = null;
    // },
  },
});
export const {login, setUser, logout, register, setDepartment, setGames} =
  userSlice.actions; //액션들을 익스포트

export const selectLogin = state => state.user.loggedIn;
export const selectToken = state => state.user.token;
export const selectUser = state => state.user.user;

export default userSlice.reducer;

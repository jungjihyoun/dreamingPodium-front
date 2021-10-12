import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'; //
import AsyncStorage from '@react-native-community/async-storage';
import {tempList} from './tempList';

// export const getWrittenNote = createAsyncThunk(
//   // 쓰여진 글을 요청하면 10일치 글이 불러진다.
//   'api 주소.. ',
//   async payload => {
//     const response = await axios
//     if (response.status != 200) throw Error(response.data);
//     return response.data;
//   },
// );

export const postingSlice = createSlice({
  posting: null,
  name: 'posting',
  initialState: tempList,

  // initialState: {
  //   todayDate: new Date().toLocaleDateString(),
  //   writtenNote: [
  //     {
  //       date: '',
  //       routine: [
  //         {
  //           routineName: '',
  //           routineIdx: '',
  //           rountineState: '',
  //         },
  //       ],
  //       noteContentGroup: [],
  //     },
  //   ],
  // },

  reducers: {
    submitPost: (state, action) => {
      // 작성 완료
      state.noteContent = action.payload.content;
    },
    clickCalendar: (state, action) => {
      state.todayDate = action.payload.date;
    },
  },
});

export const {submitPost, clickCalendar} = postingSlice.actions;

export const selectLogin = state => state.posting.loggedIn;
export const selectToken = state => state.posting.token;
export const selectWrittenNote = state => state.posting.writtenNote;
export const selectTodayDate = state => state.posting.todayDate;

export default postingSlice.reducer;

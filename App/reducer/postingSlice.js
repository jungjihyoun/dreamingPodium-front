import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'; //
import AsyncStorage from '@react-native-community/async-storage';
import {tempList} from './tempList';

import {_fetchNoteData} from '../utils/noteApi';
import {ActionSheetIOS} from 'react-native';

export const fetchNoteData = createAsyncThunk(
  // 쓰여진 글을 요청하면 10일치 글이 불러진다.
  'api 주소.. ',
  async payload => {
    const date = new Date().getDate();
    const response = await _fetchNoteData(date);
    if (response.status !== 200) {
      throw Error(response.data);
    }
    return response.data;
  },
);

export const postingSlice = createSlice({
  posting: null,
  name: 'posting',
  initialState: tempList,

  // initialState: {
  //   todayDate: new Date().toLocaleDateString(),
  //   writtenNote: [
  //     // {
  //     //   date: '',
  //     //   routine: [
  //     //     {
  //     //       routineName: '',
  //     //       routineIdx: '',
  //     //       rountineState: '',
  //     //     },
  //     //   ],
  //     //   noteContentGroup: [],
  //     // },
  //   ],
  // },

  reducers: {
    // 작성 제출
    submitPost: (state, action) => {
      state.noteContent = action.payload.content;
    },
    // 날짜 선택
    selectDate: (state, action) => {
      state.todayDate = action.payload.date;
    },
    // 루틴 체크
    checkRoutine: (state, action) => {
      const a = state.writtenNote.filter(data => {
        return data.date === state.todayDate;
      })[0];

      a.routine.map(data => {
        if (data.routineName === action.payload.routineName) {
          data.routineState = action.payload.routineState;
        }
      });
    },
  },
  extraReducers: {
    [fetchNoteData.pending](state, action) {
      // 요청
    },
    [fetchNoteData.fulfilled](state, action) {
      // 성공
      state.writtenNote.push(action.payload);
      console.log(state.writtenNote);
    },
    [fetchNoteData.rejected](state, action) {
      // 실패
    },
  },
});

export const {submitPost, selectDate, checkRoutine} = postingSlice.actions;

export const selectLogin = state => state.posting.loggedIn;
export const selectToken = state => state.posting.token;
export const selectWrittenNote = state => state.posting.writtenNote;
export const selectTodayDate = state => state.posting.todayDate;

export default postingSlice.reducer;

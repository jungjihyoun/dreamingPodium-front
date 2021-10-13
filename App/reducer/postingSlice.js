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
    submitNote: (state, action) => {
      // QTODO : 백엔드측과 데이터 구조 합의 . 빈값은 undefined 채우더라도
      //         무조건 해당 날짜의 date,routine,noteContentGroup은 오도록?
      const [noteContent] = state.writtenNote.filter(data => {
        return data.date === state.todayDate;
      });

      noteContent.noteContentGroup.map(data => {
        if (data.noteIdx === action.payload.noteIdx) {
          data.noteContent = action.payload.content;
          console.log(action.payload.content);
        }
      });
    },
    // 날짜 선택
    selectDate: (state, action) => {
      state.todayDate = action.payload.date;
    },
    // 루틴 체크
    checkRoutine: (state, action) => {
      const [checkRoutine] = state.writtenNote.filter(data => {
        return data.date === state.todayDate;
      });

      checkRoutine.routine.map(data => {
        if (data.routineName === action.payload.routineName) {
          data.routineState = action.payload.routineState;
          console.log('routine State check in redux action', data.routineState);
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

export const {submitNote, selectDate, checkRoutine} = postingSlice.actions;

export const selectLogin = state => state.posting.loggedIn;
export const selectToken = state => state.posting.token;
export const selectWrittenNote = state => state.posting.writtenNote;
export const selectTodayDate = state => state.posting.todayDate;

export default postingSlice.reducer;

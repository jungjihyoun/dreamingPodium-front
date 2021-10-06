import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'; //
// import AsyncStorage from '@react-native-community/async-storage';

// 자동 저장 함수
// 글 작성하고 뒤로가기 눌렀을 때 컴포넌트에 글 저장되게
// 유효성 검사 -> 한 글자 이상 작성해야 되게 ,,
// hasWriting

// # 날짜에 대한 글 저장 하는 것 구현

// #### 해당 날짜의 글을 불러오는 함수 . 파라미터로 노트식별아이디 , 날짜를 넘겨주어야 한다

// #### 사용자가 작성 완료를 눌렀을 경우 post 해주는 함수

// # 자동 저장 함수?

export const postingSlice = createSlice({
  posting: null,
  name: 'posting',

  initialState: {
    todayDate: new Date().toLocaleDateString(),
    writtenNote: [
      {
        date: '2021. 10. 6.',
        noteContentGroup: [
          {noteIdx: 'tr001', noteContent: '첫번째'},
          {noteIdx: 'tr002', noteContent: '두번째'},
          {noteIdx: 'tr003', noteContent: '세-'},
          {noteIdx: 'tr004', noteContent: 'ㄴㄴ'},
        ],
      },
      {
        date: '2021. 10. 2.',
        noteContentGroup: [
          {noteIdx: 'tr001', noteContent: 'efeee'},
          {noteIdx: 'tr002', noteContent: 'eee'},
          {noteIdx: 'tr003', noteContent: null},
          {noteIdx: 'tr004', noteContent: 'ㄴㄴ'},
        ],
      },
    ],
  },

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

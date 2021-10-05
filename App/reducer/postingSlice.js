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
  name: 'posting',

  // { 0901: [{noteId:'qwe, noteTitle:'tes},noteSubTitle:'tes', routine:true}] ,
  initialState: {
    notePlacehold: '',
    noteId: '',
    noteTitle: '',
    noteSubTitle: '',
    noteContent: '',
    status: 'success', //정보 불러오기 상태
  },

  reducers: {
    submitPost: (state, action) => {
      // 작성 완료
      state.noteContent = action.payload.content;
    },
  },
});

export const {submitPost} = postingSlice.actions; //액션들을 익스포트

export default postingSlice.reducer;

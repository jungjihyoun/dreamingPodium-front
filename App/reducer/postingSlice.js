import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'; //
import AsyncStorage from '@react-native-community/async-storage';
import {tempList} from './tempList';

import {_fetchNoteData} from '../utils/noteApi';
import {ActionSheetIOS} from 'react-native';
import axios from 'axios';

export const fetchNoteData = createAsyncThunk(
  // 쓰여진 글을 요청하면 10일치 글이 불러진다.
  'api/v1',
  async payload => {
    const response = await axios.get('http://3.35.43.76:8000/train/testTR');
    if (response.status !== 200) {
      throw Error(response.data);
    }
    return response.data;
  },
);

export const postingSlice = createSlice({
  posting: null,
  name: 'posting',
  initialState: {
    todayDate: new Date().toLocaleDateString(),
    writtenNote: {
      // 쓰인 날짜
      date: 'Mon Nov 16 2021',

      // [트레이닝 파트 글 목록]
      noteContentGroup: {
        training: {
          train_detail: {content: '노트내용'},
          routines: {routine_name1: false, routine_name2: false},
          success: {content: null, image: ''},
          failure: {content: null, image: ''},
        },
        feedback: {content: '피드백 내용'},
        conditioning: {
          mind: ['정신이 번쩍'],
          physical: [],
          injury: [],
        },
      },
    },
  },

  reducers: {
    // 작성 제출
    submitNote: (state, action) => {
      // QTODO : 백엔드측과 데이터 구조 합의 . 빈값은 undefined 채우더라도
      //         무조건 해당 날짜의 date,routine,noteContentGroup은 오도록?
      // const [noteContent] = state.writtenNote.filter(data => {
      //   return data.date === state.todayDate;
      // });
      console.log(action.payload.content);
      if (action.payload.noteIdx === 'feedback') {
        state.writtenNote.noteContentGroup.feedback.content =
          action.payload.content;
      } else {
        state.writtenNote.noteContentGroup.training[
          action.payload.noteIdx
        ].content = action.payload.content;
      }

      if (action.payload.image) {
        state.writtenNote.noteContentGroup.training[
          action.payload.noteIdx
        ].image = action.payload.image;
      }

      console.log(state.writtenNote.noteContentGroup);
    },

    // params / content
    submitCondition: (state, action) => {
      const [noteContent] = state.writtenNote.filter(data => {
        return data.date === state.todayDate;
      });

      noteContent.conditionGroup.map(data => {
        if (data.conditionIdx === action.payload.conditionIdx) {
          if (data.content.includes(action.payload.content)) {
            const index = data.content.indexOf(action.payload.content);
            data.content.splice(index, 1);
          } else {
            data.content.push(action.payload.content);
          }
        }
      });
    },

    submitInjury: (state, action) => {
      const [noteContent] = state.writtenNote.filter(data => {
        return data.date === state.todayDate;
      });

      noteContent.conditionGroup.map(data => {
        if (data.conditionIdx === action.payload.conditionIdx) {
          data.content.push(action.payload.content);
        }
      });
    },

    deleteInjury: (state, action) => {
      const [noteContent] = state.writtenNote.filter(data => {
        return data.date === state.todayDate;
      });

      let deleteIndex = '';
      noteContent.conditionGroup.map(data => {
        if (data.conditionIdx === 'injury') {
          data.content.map((element, index) => {
            if (
              element.injuryMemo === action.payload.injuryMemo &&
              element.interruptData === action.payload.interruptData &&
              element.painData === action.payload.painData
            ) {
              deleteIndex = index;
            }
          });
        }
        if (deleteIndex !== '') {
          data.content.splice(deleteIndex, 1);
        }
      });
    },

    // 날짜 선택
    selectDate: (state, action) => {
      state.todayDate = action.payload.date;
    },
    // 루틴 체크
    checkRoutine: (state, action) => {
      state.writtenNote.noteContentGroup.training.routines[
        action.payload.routineName
      ] =
        !state.writtenNote.noteContentGroup.training.routines[
          action.payload.routineName
        ];

      console.log(
        'testindign',
        state.writtenNote.noteContentGroup.training.routines[
          action.payload.routineName
        ],
      );
      // const [checkRoutine] = state.writtenNote.filter(data => {
      //   return data.date === state.todayDate;
      // });

      // checkRoutine.routine.map(data => {
      //   if (data.routineName === action.payload.routineName) {
      //     data.routineState = action.payload.routineState;
      //   }
      // });
    },
  },
  extraReducers: {
    [fetchNoteData.pending](state, action) {
      // 요청
      console.log('대기!', action.payload);
    },
    [fetchNoteData.fulfilled](state, action) {
      // 성공
      console.log('성공!!!!!!!!!', action.payload);
      // state.writtenNote.push(action.payload);
    },
    [fetchNoteData.rejected](state, action) {
      // 실패
      console.log('실패!', action.payload);
    },
  },
});

export const {
  submitNote,
  selectDate,
  checkRoutine,
  submitCondition,
  submitInjury,
  deleteInjury,
} = postingSlice.actions;

export const selectLogin = state => state.posting.loggedIn;
export const selectToken = state => state.posting.token;
export const selectWrittenNote = state => state.posting.writtenNote;
export const selectTodayDate = state => state.posting.todayDate;

export default postingSlice.reducer;

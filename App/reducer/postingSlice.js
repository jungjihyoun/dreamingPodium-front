import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'; //
import AsyncStorage from '@react-native-community/async-storage';

import {_fetchNoteData} from '../utils/note';
import {ActionSheetIOS} from 'react-native';

import dreamAPI from '../utils/note';

export const fetchNoteData = createAsyncThunk(
  // record 불러오기
  'record/get',
  async payload => {
    console.log('노트 불러오기', payload);
    const response = await dreamAPI.getRecord(payload.user_id, payload.date);
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
    todayDate: new Date().toDateString(),
    writtenNote: {
      // 쓰인 날짜
      date: '',
      // [트레이닝 파트 글 목록]
      noteContentGroup: {
        training: {
          train_detail: {content: null},
          feedback: {content: null},
          routines: {ㅇㅇㅇ: true, ㅂㅈㄷ: false},
          success: {content: null, image: []},
          failure: {content: null, image: []},
        },
        conditioning: {
          mind: [],
          physical: [],
          //  injury 는 통째로
          injury: [
            {
              injuryDirection: '오른쪽',
              injurySection: '무릎',
              injuryForm: '연골파열?',
              painData: 1,
              interruptData: 1,
              injuryMemo: '열받은 유',
            },
            {
              injuryDirection: '오른쪽',
              injurySection: '무릎',
              injuryForm: '연골파열?',
              painData: 6,
              interruptData: 1,
              injuryMemo:
                '열받은 유재석.zip 《런닝맨 / 예능맛ZIP / RunningMan 》아오 열받아 (쒸익) 😤#예능맛ZIP​​​ #런닝맨​​​#Runningman',
            },
          ],
        },
      },
    },
    // 목표 달성
    ObjectNote: {
      object: ['태권도 선수'],
      capability: ['테스트1', '테스트2'],
      effort: ['노력1', '노력2', '노력3'],
      routine: ['루틴1', '루틴2', '루틴3'],
    },
  },

  reducers: {
    // 작성 제출
    submitNote: (state, action) => {
      state.writtenNote.noteContentGroup.training[
        action.payload.noteIdx
      ].content = action.payload.content;

      if (action.payload.image) {
        state.writtenNote.noteContentGroup.training[
          action.payload.noteIdx
        ].image.push(...action.payload.image);

        console.log(
          '이미지 테스트중',
          state.writtenNote.noteContentGroup.training[action.payload.noteIdx]
            .image,
        );
      }
    },

    // 심리, 신체 컨디션 및 부상 추가
    submitCondition: (state, action) => {
      const conditionGroup =
        state.writtenNote.noteContentGroup.conditioning[
          action.payload.conditionIdx
        ];
      if (conditionGroup.includes(action.payload.content)) {
        const index = conditionGroup.indexOf(action.payload.content);
        conditionGroup.splice(index, 1);
      } else {
        conditionGroup.push(action.payload.content);
      }
    },

    deleteInjury: (state, action) => {
      let deleteIndex = '';

      const injuryGroup =
        state.writtenNote.noteContentGroup.conditioning.injury;

      injuryGroup.map((element, index) => {
        if (
          element.injuryMemo === action.payload.injuryMemo &&
          element.interruptData === action.payload.interruptData &&
          element.painData === action.payload.painData &&
          element.injuryDirection === action.payload.injuryDirection &&
          element.injurySection === action.payload.injurySection &&
          element.injuryForm === action.payload.injuryForm
        ) {
          deleteIndex = index;
        }

        if (deleteIndex !== '') {
          injuryGroup.splice(deleteIndex, 1);
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
    },

    // 목표달성 추가
    submitObject: (state, action) => {
      state.ObjectNote[action.payload.ObjectType].push(action.payload.content);
    },
    // 목표달성 삭제
    deleteObject: (state, action) => {
      state.ObjectNote[action.payload.ObjectType] = state.ObjectNote[
        action.payload.ObjectType
      ].filter(item => item !== action.payload.content);
    },
  },
  extraReducers: {
    [fetchNoteData.pending](state, action) {
      // 요청
      console.log('대기!', action.payload);
    },
    [fetchNoteData.fulfilled](state, action) {
      // 성공
      console.log('성공!', action.payload);
      state.writtenNote = action.payload;
      console.log('api 요청 후 데이터', state.writtenNote);
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
  submitObject,
  deleteObject,
} = postingSlice.actions;

export const selectLogin = state => state.posting.loggedIn;
export const selectToken = state => state.posting.token;
export const selectWrittenNote = state => state.posting.writtenNote;
export const selectTodayDate = state => state.posting.todayDate;
export const setObjectNote = state => state.posting.ObjectNote;

export default postingSlice.reducer;

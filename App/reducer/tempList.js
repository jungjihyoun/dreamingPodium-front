export const tempList = {
  todayDate: new Date().toDateString(),
  isActive: false,
  writtenNote: [
    {
      // 쓰인 날짜
      date: 'Mon Nov 16 2021',

      // [트레이닝 파트 글 목록]
      noteContentGroup: {
        training: {
          train_detail: '노트내용',
          routines: {routine_name1: 'done', routine_name2: 'done'},
          success: {content: '뭔가 잘한것', image: ''},
          failure: {content: '뭔가 못한것', image: ''},
        },
        feedback: '피드백 내용',
        conditioning: {
          mind: ['정신이 번쩍'],
          physical: [],
          injury: [],
        },
      },
    },
  ],
};

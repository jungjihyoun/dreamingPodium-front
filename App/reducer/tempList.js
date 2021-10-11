export const tempList = {
  todayDate: new Date().toLocaleDateString(),
  writtenNote: [
    {
      date: '2021. 10. 6.',
      routine: [
        {
          routineName: '발차기 하기',
          routineIdx: 'rt001',
          routineState: false,
        },
        {
          routineName: '어쩌고 저쩌고 하기',
          routineIdx: 'rt002',
          routineState: false,
        },
      ],
      noteContentGroup: [
        {noteIdx: 'tr001', noteContent: '첫번째'},
        {noteIdx: 'tr002', noteContent: '두번째'},
        {noteIdx: 'tr003', noteContent: '세-'},
        {noteIdx: 'tr004', noteContent: 'ㄴㄴ'},
      ],
    },
    {
      date: '2021. 10. 2.',
      routine: [
        {
          routineName: '발차기 하기',
          routineIdx: 'rt001',
          routineState: false,
        },
        {
          routineName: '어쩌고 저쩌고 하기',
          routineIdx: 'rt002',
          routineState: false,
        },
      ],
      noteContentGroup: [
        {noteIdx: 'tr001', noteContent: 'efeee'},
        {noteIdx: 'tr002', noteContent: 'eee'},
        {noteIdx: 'tr003', noteContent: null},
        {noteIdx: 'tr004', noteContent: 'ㄴㄴ'},
      ],
    },
    {
      date: '2021. 10. 11.',
      routine: [],
      noteContentGroup: [
        {noteIdx: 'tr001', noteContent: 'testets'},
        {noteIdx: 'tr002', noteContent: '정지현'},
        {noteIdx: 'tr003', noteContent: undefined},
        {noteIdx: 'tr004', noteContent: 'ㄴㄴ'},
      ],
    },
  ],
};

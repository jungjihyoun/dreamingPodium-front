import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import DreamCalendar from '../../components/DreamCalendar';
import DreamAccordion from '../../components/DreamAccordion';
import {height} from '../../config/globalStyles';

// TODO : 리스트 형태 받아와서 반복하여 생성 - state 관리

function TrainingNoteScreen(props) {
  // user input info 형태
  // noteTitle:
  // NoteSubtitle:
  // content:
  const noteInfo = [
    {
      noteTite: '훈련내용',
      noteSubtitle: '오늘 어떤 훈련을 했나요?',
      content:
        '회전발 2인 1조 기본발차기 한줄서서 돌려차기, 후리기 이어 차기 한줄서서 후리고 돌려차기, 이어차기(미트) 2. 기계체조-하우스벨트 제자리 선자하며',
    },
    {
      noteTite: '코치님 Says',
      noteSubtitle: '훈련 중 코치님이 어떤 말씀을 해주셨나요?',
      content: '피카츄',
    },
    {
      noteTite: '잘한 점',
      noteSubtitle: '오늘 훈련에서 잘한 점은 무엇인가요?',
      content:
        '길어지면 어떻게 될까요회전발 2인 1조 기본발차기 한줄서서 돌려차기, 후리기 이어 차기 한줄서서 후리고 돌려차기, 이어차기(미트) 2. 기계체조-하우스벨트 제자리 선자하며회전발 2인 1조 기본발차기 한줄서서 돌려차기, 후리기 이어 차기 한줄서서 후리고 돌려차기, 이어차기(미트) 2. 기계체조-하우스벨트 제자리 선자하며회전발 2인 1조 기본발차기 한줄서서 돌려차기, 후리기 이어 차기 한줄서서 후리고 돌려차기, 이어차기(미트) 2. 기계체조-하우스벨트 제자리 선자하며 어쩌구저쩌구',
    },
    {
      noteTite: '보완할 점',
      noteSubtitle: '오늘 어떤 훈련을 했나요?',
      content: '우우웅ㅇ',
    },
    {
      noteTite: '훈련내용33',
      noteSubtitle: '스스로 느낀 고쳐야 할 점은 무엇인가요?',
      content: '',
    },
  ];

  // const routineInfo = [{
  //   title:'루틴체크'
  //   subtitle:'운동 전 후 폼롤러 하기'
  // },{
  //   title:'루틴체크'
  //   subtitle:'물마시기'
  // }]

  return (
    <SafeAreaView>
      <DreamCalendar />
      <ScrollView>
        <View style={styles.alignList}>
          <DreamAccordion noteInfo={noteInfo} isRoutineComplete={false} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  alignList: {
    flex: 0,
    height: '100%',
    backgroundColor: '#f0f0f0',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default TrainingNoteScreen;

import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import DreamCalendar from '../../components/DreamCalendar';
import {DreamNoteCard} from '../../components/DreamNoteCard';
import {height} from '../../config/globalStyles';

// TODO : 리스트 형태 받아와서 반복하여 생성

function TrainingNoteScreen(props) {
  const noteTitle = ['훈련내용', '코치님 Says', '잘한 점', '보완할 점'];

  const NoteSubtitle = [
    '오늘 어떤 훈련을 했나요?',
    '훈련 중 코치님이 어떤 말씀을 해주셨나요?',
    '오늘 훈련에서 잘한 점은 무엇인가요?',
    '스스로 느낀 고쳐야 할 점은 무엇인가요?',
  ];

  return (
    <SafeAreaView>
      <DreamCalendar />

      <View style={styles.alignList}>
        <DreamNoteCard
          NoteTitle="루ㅡ틴"
          NoteSubtitle="테슷흐"
          isRoutineComplete={false}
        />
        <DreamNoteCard
          NoteTitle="루ㅡ틴22"
          NoteSubtitle="테슷흐22"
          isRoutineComplete={false}
        />

        {noteTitle.map((value, key) => {
          return (
            <DreamNoteCard
              key={key}
              NoteTitle={noteTitle[key]}
              NoteSubtitle={NoteSubtitle[key]}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  alignList: {
    flex: 0,
    height: '100%',
    backgroundColor: '#C4C4C436',

    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default TrainingNoteScreen;

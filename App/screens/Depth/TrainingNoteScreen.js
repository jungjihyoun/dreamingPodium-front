/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useReducer} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import DreamCalendar from '../../components/DreamCalendar';
import CollapsibleCard from '../../components/CollapsibleCard';
import {DreamRoutine} from '../../components/DreamRoutine';

// import {writtenNote} from '../../reducer/postingSlice';

import {noteTitleList} from '../../config/noteTitleList';
import {height} from '../../config/globalStyles';

// TODO : 리스트 형태 받아와서 반복하여 생성 - state 관리

function TrainingNoteScreen({navigation, route}) {
  // 컴포넌트가 생성될 때 디비에서 저장된 글을 불러오는 요청을 한 번 한다
  // 그 후 noteTitleList의 content에 넣어주고 새로운 배열을 DreamWirtingCard
  const writtenNote = useSelector(state => state.writtenNote);
  const AppDispatch = useDispatch();

  // const [notelist, setNotelist] = useState(noteTitleList);

  // const test = () => {
  //   const addContentNotelist = writtenNote.map((data, index, _source) => {
  //     if (data.noteIdx === route.params.noteIdx) {
  //       data.content = route.params.content;
  //     }
  //     return writtenNote[index];
  //   });
  //   // dispatch;
  // };

  return (
    <SafeAreaView style={{height: '100%'}}>
      <DreamCalendar />
      <ScrollView>
        <View style={styles.alignList}>
          <DreamRoutine routine="운동 후 폼롤러 하기" />
          {noteTitleList.map(data => {
            return (
              <CollapsibleCard
                noteIdx={data.noteIdx}
                title={data.noteTitle}
                subtitle={data.noteSubtitle}
                placeholder={data.notePlaceholder}
                content="TODO : content 추가합니다 "
                isRoutineComplete={false}
              />
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          // test();
        }}>
        <Text>test</Text>
      </TouchableOpacity>
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

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import DreamCalendar from '../../components/DreamCalendar';
import DreamWirtingCard from '../../components/DreamWirtingCard';
import {DreamRoutine} from '../../components/DreamRoutine';

import {noteTitleList} from '../../config/noteTitleList';
import {height} from '../../config/globalStyles';

// TODO : 리스트 형태 받아와서 반복하여 생성 - state 관리

function TrainingNoteScreen({navigation, route}) {
  // 컴포넌트가 생성될 때 디비에서 저장된 글을 불러오는 요청을 한 번 한다
  // 그 후 noteTitleList의 content에 넣어주고 새로운 배열을 DreamWirtingCard 컴포넌트로 넘겨줌
  const arr = ['테스트', null, null, null];

  const [notelist, setNotelist] = useState(noteTitleList);

  useEffect(() => {
    const addContentNotelist = noteTitleList.map((data, index, _source) => {
      data.content = arr[index];
      return noteTitleList[index];
    });
    setNotelist(addContentNotelist);
  }, []);

  const test = () => {
    const addContentNotelist = noteTitleList.map((data, index, _source) => {
      if (data.noteTitle === route.params.noteTitle) {
        data.content = route.params.content;
      }
      return noteTitleList[index];
    });
    setNotelist(addContentNotelist);
  };

  return (
    <SafeAreaView style={{height: '100%'}}>
      <DreamCalendar />
      <ScrollView>
        <View style={styles.alignList}>
          <DreamRoutine routine="운동 후 폼롤러 하기" />
          <DreamWirtingCard noteInfo={notelist} isRoutineComplete={false} />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          test();
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

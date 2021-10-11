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

import {writtenNote} from '../../reducer/postingSlice';

import {noteTitleList} from '../../config/noteTitleList';
import {height} from '../../config/globalStyles';

// TODO : 리스트 형태 받아와서 반복하여 생성 - state 관리

function TrainingNoteScreen({navigation, route}) {
  // 컴포넌트가 생성될 때 디비에서 저장된 글을 불러오는 요청을 한 번 한다
  // 그 후 noteTitleList의 content에 넣어주고 새로운 배열을 DreamWirtingCard
  const writtenNote = useSelector(state => state.posting.writtenNote);
  const todayDate = useSelector(state => state.posting.todayDate);

  const AppDispatch = useDispatch();

  const filterRoutineGroup = () => {
    var a = writtenNote.filter(data => {
      return data.date === todayDate;
    })[0];

    if (a !== undefined) {
      a = a.routine.filter(data => {
        return data.routineName;
      });
    }

    console.log('routine list: ', a);
    return a;
  };
  const routineName = filterRoutineGroup() ? filterRoutineGroup() : [];

  const handleRoutineState = routineIdx => {
    // dispatch routine state 변하게 하고 post 보내기
    var test = routineName.filter(data => {
      return data.routineIdx === routineIdx;
    });

    test = test[0].routineState;

    console.log('routine state test', test);
  };

  const filterContentGroup = noteIdx => {
    var a = writtenNote.filter(data => {
      return data.date === todayDate;
    })[0];

    if (a !== undefined) {
      a = a.noteContentGroup.filter(data => {
        return data.noteIdx === noteIdx;
      })[0].noteContent;
    }

    console.log('todayDate:', a);

    return a;
  };

  return (
    <SafeAreaView style={{height: '100%'}}>
      <DreamCalendar />
      <ScrollView>
        <View style={styles.alignList}>
          {routineName.map(data => {
            return (
              <DreamRoutine
                routine={data.routineName}
                onPress={handleRoutineState}
                routineIdx={data.routineIdx}
                routineState={data.routineState}
              />
            );
          })}

          {noteTitleList.map(data => {
            return (
              <CollapsibleCard
                key={data.noteIdx}
                noteIdx={data.noteIdx}
                title={data.noteTitle}
                subtitle={data.noteSubtitle}
                placeholder={data.notePlaceholder}
                content={filterContentGroup(data.noteIdx)}
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

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

// COMPONENT
import DreamCalendar from '../../components/DreamCalendar';
import CollapsibleCard from '../../components/CollapsibleCard';
import {DreamRoutine} from '../../components/DreamRoutine';

// REDUX
import {writtenNote, checkRoutine} from '../../reducer/postingSlice';

// CONFIG
import {noteTitleList} from '../../config/noteTitleList';
import {height} from '../../config/globalStyles';

function TrainingNoteScreen({navigation, route}) {
  const writtenNote = useSelector(state => state.posting.writtenNote);
  const todayDate = useSelector(state => state.posting.todayDate);
  const dispatch = useDispatch();

  //TODO : 루틴 불러오기 코드정리
  const filterRoutineGroup = () => {
    var [_routineGroup] = writtenNote.filter(data => {
      return data.date === todayDate;
    });

    if (_routineGroup !== undefined) {
      _routineGroup = _routineGroup.routine.filter(data => {
        return data.routineName;
      });
    }
    console.log('routine list: ', _routineGroup);
    return _routineGroup;
  };
  const routineName = filterRoutineGroup() ? filterRoutineGroup() : [];

  //TODO : 루틴 체크하기 코드정리 + post api 처리
  const handleRoutineState = routineIdx => {
    var [_pickedRoutine] = routineName.filter(data => {
      return data.routineIdx === routineIdx;
    });
    dispatch(
      checkRoutine({
        routineName: _pickedRoutine.routineName,
        routineState: !_pickedRoutine.routineState,
      }),
    );
    console.log('routine Success', _pickedRoutine.routineState);
  };

  //TODO : 작성된 글 불러오기 코드정리
  const filterContentGroup = noteIdx => {
    var [_contentGroup] = writtenNote.filter(data => {
      return data.date === todayDate;
    });

    if (_contentGroup !== undefined) {
      _contentGroup = _contentGroup.noteContentGroup.filter(data => {
        return data.noteIdx === noteIdx;
      })[0].noteContent;
    }

    return _contentGroup;
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
                routineState={!data.routineState}
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

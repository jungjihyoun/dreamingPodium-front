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
import DreamCollapsibleCard from '../../components/training/DreamCollapsibleCard';
import {DreamRoutine} from '../../components/training/DreamRoutine';

// REDUX
import {checkRoutine} from '../../reducer/postingSlice';

// CONFIG
import {noteTitleList} from '../../config/noteTitleList';
import {height, colors} from '../../config/globalStyles';

function TrainingNoteScreen({navigation, route}) {
  const writtenNote = useSelector(state => state.posting.writtenNote);
  const todayDate = useSelector(state => state.posting.todayDate);
  const dispatch = useDispatch();

  //TODO : 루틴 불러오기 코드정리
  const filterRoutineGroup = () => {
    const routineGroup = writtenNote.noteContentGroup.training.routines;
    return routineGroup;
  };
  const routineName = filterRoutineGroup() ? filterRoutineGroup() : [];
  // //TODO : 루틴 체크하기 코드정리 + post api 처리
  const handleRoutineState = params => {
    Object.keys(routineName).map(data => {
      if (data === params) {
        dispatch(
          checkRoutine({
            routineName: data,
          }),
        );
      }
    });
  };

  // //TODO : 작성된 글 불러오기 코드정리
  const filterContentGroup = noteIdx => {
    let trainingNote = writtenNote.noteContentGroup.training;
    trainingNote = {
      ...trainingNote,
      feedback: writtenNote.noteContentGroup.feedback,
    };
    // console.log(trainingNote[noteIdx].content);
    if (trainingNote[noteIdx]) {
      console.log('jdjdjdjdjd', trainingNote[noteIdx].content);
      return trainingNote[noteIdx].content;
    } else {
      return null;
    }
  };

  //TODO : 작성된 사진 불러오기 코드정리
  const filterPhotoGroup = noteIdx => {
    let trainingNote = writtenNote.noteContentGroup.training;
    trainingNote = {
      ...trainingNote,
      feedback: writtenNote.noteContentGroup.feedback,
    };

    if (trainingNote[noteIdx]) {
      console.log('image', trainingNote[noteIdx].image);
      return trainingNote[noteIdx].image;
    } else {
      return null;
    }

    // var [_photo] = writtenNote.filter(data => {
    //   return data.date === todayDate;
    // });

    // if (_photo !== undefined) {
    //   _photo = _photo.noteContentGroup.filter(data => {
    //     return data.noteIdx === noteIdx;
    //   })[0].notePhoto;
    // }

    // return _photo;
  };

  return (
    <SafeAreaView
      style={{
        height: '100%',
        backgroundColor: 'white',
      }}>
      <DreamCalendar />

      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            filterContentGroup();
          }}>
          <Text>dfdfd</Text>
        </TouchableOpacity>
        <View style={styles.alignList}>
          {Object.keys(routineName).map(function (routine, index) {
            return (
              <DreamRoutine
                routine={routine}
                routineState={routineName[routine]}
                onPress={handleRoutineState}
              />
            );
          })}

          {/* {Object.keys(filterContentGroup).map(function (routine, index) {
            return (
              <DreamRoutine
                routine={routine}
                routineState={routineName[routine]}
                onPress={handleRoutineState}
              />
            );
          })} */}

          {noteTitleList.map(data => {
            return (
              <DreamCollapsibleCard
                key={data.noteIdx}
                noteIdx={data.noteIdx}
                title={data.noteTitle}
                subtitle={data.noteSubtitle}
                placeholder={data.notePlaceholder}
                content={filterContentGroup(data.noteIdx)}
                image={filterPhotoGroup(data.noteIdx)}
                isRoutineComplete={false}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  alignList: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default TrainingNoteScreen;

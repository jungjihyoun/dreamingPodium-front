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
// REDUX
import {checkRoutine} from '../../reducer/postingSlice';

// CONFIG
import {noteTitleList} from '../../config/noteTitleList';
import {height} from '../../config/globalStyles';

function ConditioningNoteScreen({navigation, route}) {
  const writtenNote = useSelector(state => state.posting.writtenNote);
  const todayDate = useSelector(state => state.posting.todayDate);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{height: '100%'}}>
      <DreamCalendar />
      <ScrollView>
        <View>
          <Text>컨디션</Text>
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

export default ConditioningNoteScreen;

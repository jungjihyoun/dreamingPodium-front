/* eslint-disable react-native/no-inline-styles */
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
import {useNavigation} from '@react-navigation/native';

// COMPONENT
import DreamCalendar from '../../components/DreamCalendar';
import DreamConditionCard from '../../components/DreamConditionCard';
// REDUX
import {checkRoutine} from '../../reducer/postingSlice';

// CONFIG
import {noteTitleList} from '../../config/noteTitleList';
import {colors, images, width, height} from '../../config/globalStyles';

function ConditioningNoteScreen({route}) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{height: '100%'}}>
      <DreamCalendar />
      <ScrollView style={styles.boxContainer}>
        <DreamConditionCard
          title="컨디션"
          subtitle="심리적"
          idx="mind"
          onPress={() => navigation.push('ConditionWriteScreen')}
        />

        <DreamConditionCard
          subtitle="신체적"
          idx="physical"
          onPress={() => navigation.push('ConditionWriteScreen')}
        />
        <DreamConditionCard
          title="부상"
          style={{marginTop: 70}}
          idx="injury"
          onPress={() => navigation.push('ConditionWriteScreen')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    paddingHorizontal: 24,
    marginVertical: 20,
    width: width * 341,
    minHeight: height * 120,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
    color: colors.lightGrey,
  },
  savedTextArea: {
    marginVertical: 6,
    paddingLeft: 6,
    marginLeft: 10,
  },
  savedText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.primary,
  },
});

export default ConditioningNoteScreen;

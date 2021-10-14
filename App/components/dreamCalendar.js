/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import {AppRegistry, View, Text, StyleSheet} from 'react-native';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import {selectDate} from '../reducer/postingSlice';
import {useDispatch} from 'react-redux';

import CalendarStrip from 'react-native-calendar-strip';
import {colors} from '../config/globalStyles';

// TOPO : 최적화 시키기

const DreamCalendar = () => {
  const dispatch = useDispatch();

  const toggle = selectedDate => {
    dispatch(selectDate({date: selectedDate.toDate().toLocaleDateString()}));
  };

  return (
    <View style={styles.container}>
      <CalendarStrip
        selectedDate={dayjs(new Date().getDate())}
        onDateSelected={selectedDate => {
          toggle(selectedDate);
        }}
        scrollable
        style={{
          height: 120,
          paddingTop: 15,
          fontSize: 16,
        }}
        calendarHeaderStyle={styles.innerText}
        dateNumberStyle={styles.innerText}
        dateNameStyle={[styles.dayNameText, {marginBottom: 3}]}
        highlightDateNameStyle={[styles.dayNameText, {marginBottom: 3}]}
        highlightDateNumberStyle={[
          styles.innerText,
          {
            color: colors.white,
            fontSize: 16,
          },
        ]}
        highlightDateNumberContainerStyle={[
          styles.innerText,
          {
            backgroundColor: colors.primary,
            width: 25,
            height: 25,
            borderStyle: 'solid',
            borderRadius: 50,
            justifyContent: 'center',
          },
        ]}
        disabledDateNameStyle={[
          styles.innerText,
          {color: colors.lightGrey},
          {marginBottom: 10},
        ]}
        disabledDateNumberStyle={[styles.innerText, {color: colors.lightGrey}]}
        leftSelector={[]}
        rightSelector={[]}
        innerStyle={{flex: 1.5}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%'},
  innerText: {
    fontSize: 16,
    color: colors.lightGrey,
    fontWeight: 'bold',
  },
  dayNameText: {
    fontSize: 12,
    color: colors.lightGrey,
    fontWeight: 'bold',
  },
});

export default DreamCalendar;
AppRegistry.registerComponent('DreamCalendar', () => DreamCalendar);

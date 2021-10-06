/* eslint-disable react-hooks/exhaustive-deps */
import React, {Component, useEffect, useState} from 'react';
import {AppRegistry, View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import 'moment/locale/ko';

import CalendarStrip from 'react-native-calendar-strip';
import {colors} from '../config/globalStyles';

// TOPO : 최적화 시키기

const DreamCalendar = () => {
  const datesWhitelist = [
    {
      start: new Date().getDate(), // 오늘 날짜 이전까지만 활성화
      end: moment(),
    },
  ];

  return (
    <View style={styles.container}>
      <CalendarStrip
        onDateSelected={selectedDate => {
          alert(selectedDate.toDate().toLocaleDateString());
        }}
        selectedDate={moment()}
        scrollable
        style={{
          height: 120,
          paddingTop: 15,
          fontSize: 16,
        }}
        calendarHeaderStyle={styles.innerText}
        dateNumberStyle={styles.innerText}
        dateNameStyle={[styles.innerText, {marginBottom: 10}]}
        highlightDateNameStyle={[styles.innerText, {marginBottom: 10}]}
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
        datesWhitelist={datesWhitelist}
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
});

export default DreamCalendar;
AppRegistry.registerComponent('DreamCalendar', () => DreamCalendar);

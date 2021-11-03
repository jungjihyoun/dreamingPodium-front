/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

// COMPONENT
import DreamPicker from '../DreamPicker';

// CONFIG
import {colors, width, height} from '../../config/globalStyles';

const DreamInjurySelect = () => {
  const drawerUI = title => {
    let selectList = [];
    if (title === '부상방향') {
      selectList = ['왼쪽', '오른쪽'];
    } else if (title === '부상부위') {
      selectList = ['어깨', '허리', '골반', '엉덩이', '무릎', '발목'];
    } else {
      selectList = [
        '연골부상1',
        '연골부상2',
        '연골부상3',
        '연골부상4',
        '연골부상5',
        '연골부상6',
      ];
    }
    return (
      <View style={styles.drawerGroup}>
        <Text style={styles.drawerTitle}>{title}</Text>
        <View
          style={
            Platform.OS === 'ios' ? styles.drawerIos : styles.drawerAndroid
          }>
          <DreamPicker selectList={selectList} />
        </View>
      </View>
    );
  };

  // ############ UI ################
  return (
    <View style={{flex: 1}}>
      <View style={styles.drawerSection}>
        {drawerUI('부상방향')}
        {drawerUI('부상부위')}
        {drawerUI('부상형태')}
      </View>

      <View style={styles.sliderSection}>
        <View style={styles.sliderGroup}>
          <Text style={styles.drawerTitle}>통증정도</Text>
        </View>

        <View style={styles.sliderGroup}>
          <Text style={styles.drawerTitle}>운동방해정도</Text>
        </View>

        <View style={styles.sliderGroup}>
          <Text style={styles.drawerTitle}>메모</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerSection: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  drawerGroup: {flex: 1, flexDirection: 'row'},
  drawerTitle: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
    position: 'absolute',
    top: height * 35,
    left: width * 15,
  },
  drawerIos: {position: 'absolute'},
  drawerAndroid: {
    position: 'absolute',
    top: height * 70,
  },
  sliderSection: {
    flex: 2,
  },
  sliderGroup: {
    flex: 0.2,
  },
  sliderTitle: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default DreamInjurySelect;

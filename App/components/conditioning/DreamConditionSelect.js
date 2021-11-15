/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {colors, width, height} from '../../config/globalStyles';
import {
  mindSelectList,
  physicalList,
  conditionList,
} from '../../config/conditionSelectList';

// COMPONENT
import DreamSelectPane from './DreamSelectPane';

// REDUX
import {checkRoutine} from '../../reducer/postingSlice';
import {setModalVisible} from '../../reducer/modalSlice';

function DreamConditionSelect({title, idx, ...props}) {
  const dispatch = useDispatch();

  // const selectList = idx === 'mind' ? mindSelectList : physicalList;

  return (
    <View>
      <View style={styles.titleSection}>
        <Text style={styles.titleText}> {title} 상태 입력 </Text>
        <Text style={styles.subtitleText}> [중복 선택] </Text>
      </View>

      <Text style={styles.selectSection}>
        <View
          style={{
            width: width * 410,
            paddingRight: 10,
            paddingLeft: 10,
          }}>
          <Text>신체 컨디션</Text>
          <Text>
            {physicalList.map(val => {
              if (!val.selectId.includes('f')) {
                return (
                  <DreamSelectPane
                    color={colors.lightGreen}
                    idx="physical"
                    key={val.selectId}>
                    {val.selectTitle}
                  </DreamSelectPane>
                );
              } else {
                return (
                  <DreamSelectPane
                    color={colors.lightGreen}
                    idx="physical"
                    key={val.selectId}>
                    {val.selectTitle}
                  </DreamSelectPane>
                );
              }
            })}
          </Text>

          <Text>심리 컨디션</Text>
          <Text>
            {mindSelectList.map(val => {
              if (!val.selectId.includes('f')) {
                return (
                  <DreamSelectPane
                    color={colors.lightBlue}
                    idx="mind"
                    key={val.selectId}>
                    {val.selectTitle}
                  </DreamSelectPane>
                );
              } else {
                return (
                  <DreamSelectPane
                    color={colors.lightBlue}
                    idx="mind"
                    key={val.selectId}>
                    {val.selectTitle}
                  </DreamSelectPane>
                );
              }
            })}
          </Text>
        </View>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  selectSection: {
    flex: 5,
    flexDirection: 'row',
  },
});

export default DreamConditionSelect;

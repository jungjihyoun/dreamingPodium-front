/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {colors, width, height} from '../../config/globalStyles';

// REDUX
import {checkRoutine} from '../../reducer/postingSlice';
import {setModalVisible} from '../../reducer/modalSlice';

function DreamConditionSelect(props) {
  const dispatch = useDispatch();

  return (
    <>
      <Text> Condition Select </Text>
    </>
  );
}

const styles = StyleSheet.create({});

export default DreamConditionSelect;

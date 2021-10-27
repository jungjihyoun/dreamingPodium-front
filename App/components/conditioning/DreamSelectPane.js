/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {colors, width, height} from '../../config/globalStyles';
import {mindSelectList, physicalList} from '../../config/conditionSelectList';

// REDUX
import {checkRoutine} from '../../reducer/postingSlice';
import {setModalVisible} from '../../reducer/modalSlice';

function DreamSelectPane({title, ...props}) {
  // TODO :refactor

  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.paneSection}
      onPress={() => {
        setSelect(!select);
      }}>
      <Text
        style={
          select
            ? {
                ...styles.paneText,
                backgroundColor: colors.primary,
                color: 'white',
              }
            : styles.paneText
        }>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  paneSection: {},
  paneText: {
    fontSize: 16,
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: '#d2d2d2',
    borderRadius: 22,
    padding: 10,
    marginRight: 4,
    marginTop: 10,
    overflow: 'hidden',
  },
});

export default DreamSelectPane;
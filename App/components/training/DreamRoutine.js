/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
  Image,
} from 'react-native';
//custom imports
import {width, height, colors, images} from '../../config/globalStyles';

// TODO : 이미지를 벡터 아이콘으로 변경하기
export const DreamRoutine = ({
  style,
  onPress,
  routineIdx,
  routine,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(routineIdx)}
      style={styles.dreamNoteGroup}>
      <View style={styles.sectionContainer}>
        <View
          style={
            props.routineState
              ? [
                  styles.checkbox,
                  {backgroundColor: colors.primary, tintColor: colors.darkGrey},
                ]
              : [styles.checkbox]
          }>
          <Image
            style={
              props.routineState
                ? {tintColor: colors.white, width: 10, height: 10}
                : [styles.unchecking, {width: 10, height: 10}]
            }
            source={images.check}
          />
        </View>

        <View>
          <Text style={styles.titleText}>루틴 체크</Text>
          <Text style={styles.subtitleText}>{routine}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    minHeight: height * 71,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dreamNoteGroup: {
    paddingHorizontal: 16,
    paddingLeft: 19,
    marginTop: 21,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 341,
    backgroundColor: '#ffffff',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: colors.primary,
    width: 10,
    height: 10,
    padding: 11,
    marginRight: 23,
  },
  unchecking: {
    tintColor: colors.darkGrey,
    opacity: 0.5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.lightGrey,
    marginBottom: 3,
  },
  subtitleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ABBABC',
  },
});

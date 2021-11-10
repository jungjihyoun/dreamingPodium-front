import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import {width, height, colors, images} from '../../config/globalStyles';

const CollapsibleTitle = ({
  style,
  onPress,
  title,
  subtitle,
  content,
  noteIdx,
  placeholder,
  isActive,

  ...props
}) => {
  const todayDate = useSelector(state => state.posting.todayDate);

  const navigation = useNavigation();

  const titleArea = () => {
    // #### content가 없을 경우 글쓰기 스크린으로 이동 합니다 #####
    if (content === undefined) {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.push('WritingScreen', {
              title: title,
              placeholder: placeholder,
              noteIdx: noteIdx,
            });
          }}>
          <View style={styles.boxContainer}>
            <View style={styles.checkbox} />
            <View>
              <Text style={styles.titleText}>{title}</Text>
              <Text style={styles.subtitleText}>{subtitle}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    // #### Content가 있을 경우 작성한 글 확인. 아래로 펼쳐집니다.  ####
    return (
      <View
        style={
          isActive
            ? [
                styles.boxContainerActive,
                {borderTopLeftRadius: 10, borderTopRightRadius: 10},
              ]
            : styles.boxContainer || content
            ? [styles.boxContainerActive, {borderRadius: 13}]
            : styles.boxContainer
        }>
        <View
          style={
            isActive || content
              ? [styles.checkbox, {borderColor: colors.white}]
              : styles.checkbox
          }
        />
        <View>
          <Text
            style={
              content
                ? [styles.titleText, {color: colors.white}]
                : styles.titleText
            }>
            {title}
          </Text>

          <Text
            style={
              content
                ? [styles.subtitleText, {color: colors.white}]
                : styles.subtitleText
            }>
            {subtitle}
          </Text>
        </View>
      </View>
    );
  };

  return <>{titleArea()}</>;
};

const styles = StyleSheet.create({
  boxContainer: {
    paddingHorizontal: 16,
    paddingLeft: 19,
    marginTop: 21,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 341,
    height: height * 78,
    borderStyle: 'solid',
    borderRadius: 10,
  },
  boxContainerActive: {
    paddingLeft: 19,
    marginTop: 21,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 341,
    height: height * 65,
    backgroundColor: colors.primary,
  },

  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.darkGrey,
    width: 10,
    height: 10,
    padding: 10,
    marginRight: 23,
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
    color: colors.lightGrey,
  },
  subtitleText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
});

export default CollapsibleTitle;

import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import {width, height, colors, images} from '../config/globalStyles';

const CollapsibleTitle = ({
  style,
  onPress,
  section,
  index,
  isActive,
  sections,
  ...props
}) => {
  const navigation = useNavigation();

  const titleArea = () => {
    // #### content가 없을 경우 글쓰기 스크린으로 이동 합니다 #####
    if (section.content === null) {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.push('WritingScreen', {
              title: section.noteTitle,
              placeholder: section.notePlaceholder,
              noteId: props.noteInfo.noteId,
            });
          }}>
          <View
            style={isActive ? styles.boxContainerActive : styles.boxContainer}>
            <View style={styles.checkbox}>
              <Image
                style={[styles.unchecking, {width: 20, height: 15}]}
                source={images.check}
              />
            </View>
            <View>
              <Text style={styles.titleText}>{section.noteTitle}</Text>
              <Text style={styles.subtitleText}>{section.noteSubtitle}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    // #### Content가 있을 경우 작성한 글 확인. 아래로 펼쳐집니다.  ####
    return (
      <View style={isActive ? styles.boxContainerActive : styles.boxContainer}>
        <View style={styles.checkbox}>
          <Image
            style={
              section.content
                ? {width: 20, height: 15}
                : [styles.unchecking, {width: 20, height: 15}]
            }
            source={images.check}
          />
        </View>

        <View>
          <Text style={styles.titleText}>{section.noteTitle}</Text>
          <Text style={styles.subtitleText}>{section.noteSubtitle}</Text>
        </View>

        {!isActive && (
          <View style={styles.dropButton}>
            <Image
              style={
                props.isOpened
                  ? {width: 18, height: 18}
                  : {width: 18, height: 18}
              }
              source={images.dropButton}
            />
          </View>
        )}
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
    height: height * 71,
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.22,
    shadowRadius: 2.65,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    // android
    elevation: 3,
  },
  boxContainerActive: {
    paddingHorizontal: 16,
    paddingLeft: 19,
    marginTop: 21,
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 341,
    height: height * 71,
    borderStyle: 'solid',
    borderColor: '#ffffff',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
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
    width: 34,
    height: 34,
    padding: 23,
    marginRight: 23,
  },
  dropButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
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

export default CollapsibleTitle;

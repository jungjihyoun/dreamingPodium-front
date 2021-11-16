/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {width, height, colors, images} from '../../config/globalStyles';

import {useNavigation} from '@react-navigation/native';

const CollapsibleContent = ({
  style,
  onPress,
  isActive,
  content,
  image,
  noteIdx,
  ...props
}) => {
  const navigation = useNavigation();

  const contentArea = () => {
    return (
      <View
        style={
          isActive
            ? [styles.contentSection, styles.contentActive]
            : styles.contentSection
        }>
        {/* 가로줄 */}

        <View
          style={{
            borderTopColor: colors.white,
            borderTopWidth: 1,
          }}
        />

        {image && (
          <Image
            source={{uri: image}}
            resizeMode="cover"
            resizeMethod="scale"
            style={styles.photo}
          />
        )}

        <Text multiline={true} style={styles.text}>
          {content}
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.push('WritingScreen', {
              value: content,
              noteIdx: noteIdx,
            });
          }}>
          <Text>수정하기</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return <>{contentArea()}</>;
};

const styles = StyleSheet.create({
  photo: {
    width: width * 310,
    height: height * 250,
  },
  text: {
    paddingTop: 16,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    backgroundColor: colors.primary,
    color: colors.white,
  },

  contentSection: {
    padding: 15,
    flexDirection: 'column',
    flexShrink: 1,
    width: width * 341,
    borderStyle: 'solid',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.primary,
  },

  // TODO : 스타일 디테일 수정하기
  contentActive: {
    backgroundColor: colors.primary,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 1.65,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    // android
    elevation: 3,
  },
  dropButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
});

export default CollapsibleContent;

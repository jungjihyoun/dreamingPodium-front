/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {StyleSheet, Text, View, Image} from 'react-native';
import {width, height, colors, images} from '../../config/globalStyles';

const CollapsibleContent = ({
  style,
  onPress,
  isActive,
  content,
  photo,
  ...props
}) => {
  const contentArea = () => {
    return (
      <View
        style={
          isActive
            ? [styles.contentSection, styles.contentActive]
            : styles.contentSection
        }>
        <Image
          source={{uri: photo}}
          resizeMode="cover"
          resizeMethod="scale"
          style={styles.photo}
        />
        <Text multiline={true} style={styles.text}>
          {content}
        </Text>

        {isActive && (
          <View style={styles.dropButton}>
            <Image style={{width: 18, height: 18}} source={images.upButton} />
          </View>
        )}
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
  },

  contentSection: {
    padding: 15,
    flexDirection: 'column',
    flexShrink: 1,

    width: width * 341,
    borderStyle: 'solid',
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: '#ffffff',
  },

  // TODO : 스타일 디테일 수정하기
  contentActive: {
    backgroundColor: '#ffffff',
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

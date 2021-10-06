import React, {useState} from 'react';

import {StyleSheet, Text, View, Image} from 'react-native';
import {width, height, colors, images} from '../config/globalStyles';

const CollapsibleContent = ({style, onPress, isActive, content, ...props}) => {
  const contentArea = () => {
    return (
      <View
        style={
          isActive ? [styles.content, styles.contentActive] : styles.content
        }>
        <Text multiline={true}>{content}</Text>

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
  content: {
    padding: 10,
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
    width: width * 341,
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },

  // TODO : 스타일 디테일 수정하기
  contentActive: {
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
  dropButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
  },
});

export default CollapsibleContent;

import React, {useState} from 'react';

import {StyleSheet, Text, View, Image} from 'react-native';
import {width, height, colors, images} from '../config/globalStyles';

const CollapsibleContent = ({
  style,
  onPress,
  section,
  index,
  isActive,
  sections,
  ...props
}) => {
  const contentArea = () => {
    return (
      <View
        style={
          isActive ? [styles.content, styles.contentActive] : styles.content
        }>
        <Text multiline={true}>{section.content}</Text>

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
    height: '100%',
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  contentActive: {
    borderBottomWidth: 2,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderColor: '#ffffff',
  },
  dropButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
  },

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
});

export default CollapsibleContent;

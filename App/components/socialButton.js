import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
//custom imports
import {width, height, colors} from '../config/globalStyles';

export const SocialButton = ({disable, style, onPress, children, ...props}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.socialButton, style]}
      disabled={disable}
      onPress={onPress}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    flexDirection: 'row',
    width: height * 343,
    height: height * 57,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: '#EBF0FF',
  },
});

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
} from 'react-native';
//custom imports
import {width, height, colors, fonts} from '../config/globalStyles';

export const HomePartCard = ({style, onPress, Logo, ...props}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.partCardSvg}>
        {props.children}
        <View style={styles.titleGroup}>
          <Text style={styles.partTitle}>{props.partTitle}</Text>
          <Text style={styles.partSubtitle}>{props.partSubtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  partCardSvg: {
    width: width * 340,
    height: height > 0.9 ? height * 210 : height * 190,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: height * 15,
  },
  HomePartCard: {
    flexDirection: 'column',
    width: 300,
    height: 190,
    borderRadius: 10,
    borderStyle: 'solid',
    marginBottom: 27,
  },
  titleGroup: {
    marginLeft: width * 25,
    marginTop: height * 37,
  },
  partTitle: {
    fontFamily: fonts.spoqaBold,
    fontSize: 26,
    color: colors.white,
  },
  partSubtitle: {
    fontFamily: fonts.spoqaBold,
    fontSize: 14,
    color: colors.white,
  },
});

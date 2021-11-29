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
import Logo from '../assets/svg/conditioningCard';

export const HomePartCard = ({style, onPress, ...props}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {props.partSvgImg ? (
        <>
          <View style={styles.partCardSvg}>
            <Logo
              style={{
                position: 'absolute',
              }}
            />
            <View style={styles.titleGroup}>
              <Text style={styles.partTitle}>{props.partTitle}</Text>
              <Text style={styles.partSubtitle}>{props.partSubtitle}</Text>
            </View>
          </View>
        </>
      ) : (
        <ImageBackground
          source={props.partCardImg}
          style={styles.HomePartCard}
          {...props}>
          <View style={styles.titleGroup}>
            <Text style={styles.partTitle}>{props.partTitle}</Text>
            <Text style={styles.partSubtitle}>{props.partSubtitle}</Text>
          </View>
        </ImageBackground>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  partCardSvg: {
    width: width * 341,
    height: height * 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  HomePartCard: {
    flexDirection: 'column',
    width: width * 341,
    height: height * 190,
    borderRadius: 10,
    borderStyle: 'solid',
    marginBottom: 27,
  },
  titleGroup: {
    marginLeft: 23,
    marginTop: 37,
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

import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
} from 'react-native';
//custom imports
import {width, height, colors} from '../config/globalStyles';

export const HomePartCard = ({style, onPress, ...props}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={props.partCardImg}
        style={styles.HomePartCard}
        {...props}>
        <View style={styles.titleGroup}>
          <Text style={styles.partTitle}>{props.partTitle}</Text>
          <Text style={styles.partSubtitle}>{props.partSubtitle}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  partSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.white,
  },
});

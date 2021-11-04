/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

// COMPONENT
import Slider from '@react-native-community/slider';
import DreamPicker from '../DreamPicker';

// CONFIG
import {colors, width, height} from '../../config/globalStyles';

const DreamSliderGroup = ({sliderData, setSliderData}) => {
  return (
    <>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <Text style={styles.sliderData}>{sliderData}</Text>
        <Slider
          style={{
            width: width * 330,
            height: 50,
          }}
          minimumValue={0}
          maximumValue={10}
          value={sliderData}
          step={1}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.darkGrey}
          onValueChange={e => {
            setSliderData(e);
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sliderData: {
    fontSize: 16,
    color: colors.primary,
  },
});

export default DreamSliderGroup;

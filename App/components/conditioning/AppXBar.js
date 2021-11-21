/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import {colors, width, height} from '../../config/globalStyles';

function AppXBar({amount, ...props}) {
  return (
    <>
      <View style={{position: 'absolute', right: width * 25}}>
        <View style={styles.graph}>
          <View
            style={
              amount < 10
                ? {
                    ...styles.graphColors,
                    width: width * 17 * 1 * amount,
                  }
                : {
                    ...styles.graphFull,
                    width: width * 17 * 1 * amount,
                  }
            }
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  graphColors: {
    backgroundColor: colors.primary,
    height: height * 13,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  graphFull: {
    backgroundColor: colors.primary,
    height: height * 13,
    borderRadius: 7,
  },
  graph: {
    width: width * 170,
    height: height * 15,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#E3E3E3',
    backgroundColor: '#E3E3E3',
  },
});

export default AppXBar;

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import {ObjectWritingCard} from '../../components/ObjectWritingCard';

import {colors, images} from '../../config/globalStyles';

function DreamScreen(props) {
  return (
    <SafeAreaView>
      <View style={styles.dreamPartCard}>
        <Text>9월29일 수요일에 완성 해야지 .....</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.lightGrey,
    paddingTop: 25,
    paddingBottom: 48,
  },
  dreamPartCard: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default DreamScreen;

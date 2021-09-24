import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import DreamCalendar from '../../components/DreamCalendar';
import {DreamPartCard} from '../../components/DreamPartCard';

import {colors, images} from '../../config/globalStyles';

function HomeScreen(props) {
  return (
    <SafeAreaView>
      <DreamCalendar />

      <View style={styles.dreamPartCard}>
        <Text style={styles.homeTitle}>
          오늘의 훈련은 어땠나요? 당신의 기록을 남겨주세요 !
        </Text>
        <DreamPartCard
          onPress={() => {
            props.navigation.navigate('TrainingNote');
          }}
          partCardImg={images.trainingPart}
          partTitle="트레이닝 파트"
          partSubtitle="훈련내용, 피드백 남기기"
        />
        <DreamPartCard
          onPress={() => {
            props.navigation.navigate('ConditioningNote');
          }}
          partCardImg={images.conditioningPart}
          partTitle="컨디셔닝 파트"
          partSubtitle="부상 정보 남기기"
        />
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

export default HomeScreen;

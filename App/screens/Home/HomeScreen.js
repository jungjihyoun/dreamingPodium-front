import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import {DreamPartCard} from '../../components/DreamPartCard';

import {useDispatch} from 'react-redux';
import {selectDate} from '../../reducer/postingSlice';

import {colors, images} from '../../config/globalStyles';

function HomeScreen(props) {
  const dispatch = useDispatch();

  const zero = num => {
    return num < 10 && num >= 0 ? '0' + num : num;
  };
  const dateKo = date => {
    return `${date.getFullYear()}년 ${zero(date.getMonth() + 1)}월 ${zero(
      date.getDate(),
    )}일`;
  };

  return (
    <SafeAreaView>
      <View style={styles.dreamPartCard}>
        <Text style={styles.DateTitle}>{dateKo(new Date())}</Text>
        <Text style={styles.homeTitle}>
          오늘의 훈련은 어땠나요? 당신의 기록을 남겨주세요 !
        </Text>
        <DreamPartCard
          onPress={() => {
            dispatch(selectDate({date: new Date().toDateString()}));
            props.navigation.push('TrainingNote');
          }}
          partCardImg={images.trainingPart}
          partTitle="트레이닝 파트"
          partSubtitle="훈련내용, 피드백 남기기"
        />
        <DreamPartCard
          onPress={() => {
            dispatch(selectDate({date: new Date().toDateString()}));
            props.navigation.push('ConditioningNote');
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
  DateTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    // color: colors.darkGrey,
    paddingTop: 48,
    paddingBottom: 28,
  },
  homeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darkGrey,
    // paddingTop: 95,
    paddingBottom: 48,
  },
  dreamPartCard: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default HomeScreen;

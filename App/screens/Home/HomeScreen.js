import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import {HomePartCard} from '../../components/HomePartCard';
import {HeaderProfile} from '../../components/training/HeaderProfile.js';

import {useDispatch, useSelector} from 'react-redux';
import {selectDate, fetchNoteData} from '../../reducer/postingSlice';

import {colors, images} from '../../config/globalStyles';

function HomeScreen(props) {
  const todayDate = useSelector(state => state.posting.todayDate);
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
      <View style={styles.HomePartCard}>
        <HeaderProfile />

        <HomePartCard
          onPress={() => {
            dispatch(selectDate({date: new Date().toDateString()}));
            // dispatch(
            //   fetchNoteData({
            //     user_id: '1951543508',
            //     date: todayDate,
            //   }),
            // );
            props.navigation.push('TrainingNote');
          }}
          partCardImg={images.trainingPart}
          partTitle="트레이닝 파트"
          partSubtitle="훈련내용, 피드백 남기기"
        />
        <HomePartCard
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
  HomePartCard: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default HomeScreen;

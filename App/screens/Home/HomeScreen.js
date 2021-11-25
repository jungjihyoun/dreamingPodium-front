import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {HomePartCard} from '../../components/HomePartCard';
import {HeaderProfile} from '../../components/training/HeaderProfile.js';

import {useDispatch, useSelector} from 'react-redux';
import {selectDate, fetchNoteData} from '../../reducer/postingSlice';
import {setLogout} from '../../reducer/userSlice';

import {colors, images} from '../../config/globalStyles';

function HomeScreen(props) {
  const todayDate = useSelector(state => state.posting.todayDate);
  const userToken = useSelector(state => state.user.userToken);
  const dispatch = useDispatch();

  // 접속시 training, conditioning 데이터 불러오기 주석해제
  // useEffect(() => {
  //   dispatch(
  //     fetchNoteData({
  //       user_id: userToken,
  //       date: todayDate,
  //     }),
  //   );
  // }, [dispatch, todayDate, userToken]);

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <View style={styles.HomePartCard}>
        <HeaderProfile />

        <HomePartCard
          onPress={() => {
            dispatch(selectDate({date: new Date().toDateString()}));
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

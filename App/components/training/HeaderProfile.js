/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {StyleSheet, Text, View, Platform, Image} from 'react-native';
import {fetchProfileData} from '../../reducer/userSlice';
import {width, height, colors, images, fonts} from '../../config/globalStyles';

const HeaderProfile = ({style, ...props}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user);
  const userToken = useSelector(state => state.user.userToken);

  const userObject = useSelector(state => state.posting.ObjectNote.objectives);

  useEffect(() => {
    dispatch(
      fetchProfileData({
        user_id: userToken,
      }),
    );
  }, [dispatch, userToken]);

  return (
    <>
      <View style={styles.profileGroup}>
        <View style={styles.userImageSection}>
          {userInfo.userImage ? (
            <Image source={{uri: userInfo.userImage}} style={styles.image} />
          ) : (
            <Image source={images.profileImgGroup} style={styles.image} />
          )}
        </View>

        <View style={styles.columnGroup}>
          <Text style={styles.name}>{userInfo.username}</Text>
          <View style={styles.contentGroup}>
            <Text style={styles.title}>소속</Text>
            <Text style={styles.content}>{userInfo.team}</Text>
          </View>
          <View style={styles.contentGroup}>
            <Text style={styles.title}>종목</Text>
            <Text style={styles.content}>{userInfo.field}</Text>
          </View>
          <View style={styles.contentGroup}>
            <Text style={styles.title}>나의 목표</Text>
            <Text style={styles.content}>{userObject}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.homeTitle}>
        오늘의 훈련은 어땠나요? 당신의 기록을 남겨주세요 !
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  userImageSection: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'left',
    marginTop: height * 20,
  },
  profileGroup: {
    width: width * 410,
    height: height * 180,
    borderBottomWidth: 4,
    borderColor: '#EEEEEE',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? height * 20 : 0,
  },
  columnGroup: {
    marginLeft: width * 35,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'left',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    width: width * 300,
    height: height * 130,
  },
  title: {
    fontFamily: fonts.gmarket,
    fontSize: Platform.OS === 'android' ? 12 : 14,
    color: colors.textGrey,
    fontWeight: '600',
    width: width * 60,
  },
  content: {
    fontFamily: fonts.spoqaBold,
    fontSize: Platform.OS === 'android' ? 16 : 18,
    fontWeight: 'bold',
    width: width * 180,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  name: {
    fontFamily: fonts.spoqaBold,
    fontSize: Platform.OS === 'android' ? 18 : 22,
    fontWeight: 'bold',
    width: width * 300,
    paddingBottom: 10,
  },
  contentGroup: {
    width: width * 300,
    paddingBottom: height * 7,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  homeTitle: {
    fontFamily: fonts.gmarket,
    fontSize: Platform.OS === 'android' ? 13 : 15,
    fontWeight: '500',
    color: colors.darkGrey,
    paddingBottom: 14,
    marginTop: height * 30,
  },
});

export {HeaderProfile};

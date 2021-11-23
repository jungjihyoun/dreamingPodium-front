/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import {width, height, colors, images} from '../../config/globalStyles';

const HeaderProfile = ({style, ...props}) => {
  const userInfo = useSelector(state => state.user);
  const userObject = useSelector(
    state => state.posting.ObjectNote.objectives[0],
  );

  return (
    <>
      <View style={styles.profileGroup}>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          {userInfo.userImage ? (
            <Image source={{uri: userInfo.userImage}} style={styles.image} />
          ) : (
            <Image source={images.profileImgGroup} style={styles.image} />
          )}
        </View>

        <View style={styles.columnGroup}>
          <Text style={styles.name}>{userInfo.username}</Text>

          <View style={styles.rowGroup}>
            <View style={styles.contentGroup}>
              <Text style={styles.title}>소속</Text>
              <Text style={styles.content}>{userInfo.team}</Text>
            </View>
            <View style={styles.contentGroup}>
              <Text style={styles.title}>종목</Text>
              <Text style={styles.content}>{userInfo.field}</Text>
            </View>
          </View>

          <View>
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
  profileGroup: {
    width: width * 400,
    height: height * 200,
    marginTop: height * 20,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  columnGroup: {flex: 1, flexDirection: 'column', marginRight: width * 35},
  rowGroup: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  title: {
    fontSize: 14,
    color: colors.textGrey,
    fontWeight: '500',
    paddingBottom: 3,
  },
  content: {fontSize: 18, fontWeight: '600'},
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginRight: width * 28,
    marginTop: height * 10,
  },
  name: {fontSize: 22, fontWeight: 'bold'},
  contentGroup: {width: width * 90},
  homeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    paddingBottom: 28,
  },
});

export {HeaderProfile};

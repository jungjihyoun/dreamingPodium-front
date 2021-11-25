/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

// REDUX
import {useSelector, useDispatch} from 'react-redux';
import {signOutKakaoTalk} from '../../screens/Auth/loginKakao';
import {fetchProfileData, setLogout} from '../../reducer/userSlice';

import {colors, images, width, height} from '../../config/globalStyles';

function ProfileScreen({navigation, ...props}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const userToken = useSelector(state => state.user.userToken);

  useEffect(() => {
    dispatch(
      fetchProfileData({
        user_id: userToken,
      }),
    );
  }, [dispatch, userToken]);

  const logout = () => {
    dispatch(setLogout());
  };

  const zero = num => (num < 10 && num >= 0 ? '0' + num : num);
  const dateKo = date =>
    `${date.getFullYear()}년 ${zero(date.getMonth() + 1)}월 ${zero(
      date.getDate(),
    )}일`;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImg}>
          {user.userImage !== '' ? (
            <Image
              style={{
                width: 150,
                height: 150,
              }}
              resizeMode="cover"
              resizeMethod="auto"
              source={{
                uri: user.userImage,
              }}
            />
          ) : (
            <Image source={images.profileImgGroup} />
          )}
        </View>

        <View style={styles.userInfoArea}>
          <Text
            style={{...styles.userInfoText, fontWeight: 'bold', fontSize: 20}}>
            {user.username}
          </Text>

          <Text
            style={{...styles.userInfoText, fontSize: 16, marginVertical: 5}}>
            {dateKo(new Date(user.birth))}
          </Text>

          <View style={styles.userInfoRow}>
            <Text style={{...styles.userInfoTitle, marginRight: 10}}>소속</Text>
            <Text style={styles.userInfoText}>{user.team}</Text>
          </View>

          <View style={styles.userInfoRow}>
            <Text style={{...styles.userInfoTitle, marginRight: 10}}>종목</Text>
            <Text style={styles.userInfoText}>{user.field}</Text>
          </View>
        </View>
      </View>

      <View style={{flex: 3, alignSelf: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.push('ProfileEditScreen')}
          style={styles.buttonSection}>
          <Text style={{...styles.buttonText, color: colors.primary}}>
            프로필 수정하기
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSection}
          onPress={() => {
            logout();
          }}>
          <Text style={styles.buttonText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userInfoArea: {
    width: width * 300,
    height: height * 100,
    marginTop: height * 6,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  userInfoText: {
    fontSize: 18,
  },
  userInfoTitle: {
    fontSize: 16,
    color: colors.textGrey,
  },
  profileHeader: {
    flex: 4,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: height * 25,
  },

  profileImg: {
    width: 150,
    height: 150,
    overflow: 'hidden',
    borderRadius: 100,
  },
  profileImgGroup: {
    width: width * 160,
    height: height * 160,
  },

  buttonSection: {
    // flex: 1,
    width: width * 300,
    height: height * 40,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: colors.whiteGrey,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'center',
  },
});

export default ProfileScreen;

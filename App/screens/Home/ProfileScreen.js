/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import TermsScreen from '../../config/TermsScreen';

import {useSelector, useDispatch} from 'react-redux';
import {setLogout} from '../../reducer/userSlice';
import {colors, images, width, height} from '../../config/globalStyles';

function ProfileScreen({navigation, ...props}) {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const logout = () => {
    dispatch(setLogout());
  };

  // TODO : DATE 핸들링 모듈 따로 빼기
  const zero = num => (num < 10 && num >= 0 ? '0' + num : num);
  const dateKo = date =>
    `${date.getFullYear()}년 ${zero(date.getMonth() + 1)}월 ${zero(
      date.getDate(),
    )}일`;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImg}>
          {user.userImage !== null ? (
            <Image
              style={{
                width: 116,
                height: 116,
              }}
              resizeMode="cover"
              resizeMethod="auto"
              source={{
                uri: user.userImage,
              }}
            />
          ) : (
            <Image
              style={{
                width: 116,
                height: 116,
              }}
              source={images.profileImgGroup}
            />
          )}
        </View>

        <View style={styles.userInfoArea}>
          <Text style={[styles.userInfoText, styles.username]}>
            {user.username}
          </Text>

          <Text style={[styles.birthday, styles.userInfoText]}>
            {dateKo(new Date(user.birth))}
            {/* {dateKo(user.birth)} */}
          </Text>

          <View>
            <View style={styles.userInfoRow}>
              <Text style={{...styles.userInfoTitle, marginRight: 15}}>
                소속
              </Text>
              <Text style={styles.userInfoText}>{user.team}</Text>
            </View>

            <View style={styles.userInfoRow}>
              <Text
                style={{
                  ...styles.userInfoTitle,
                  marginRight: 15,
                }}>
                종목
              </Text>
              <Text style={styles.userInfoText}>{user.field}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.editSection}>
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

        <TouchableOpacity
          style={styles.buttonSection}
          onPress={() => {
            setModal(!modal);
          }}>
          <Text style={styles.buttonText}>이용약관 보기</Text>
          {/* 이용 약관 모달 */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => setModal(!modal)}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                zIndex: 1,
              }}
              onPress={() => setModal(!modal)}
            />
            {<TermsScreen />}
          </Modal>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userInfoArea: {
    width: width * 300,
    height: height * 100,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  userInfoText: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '700',
  },
  userInfoTitle: {
    fontSize: 14,
    color: colors.textGrey,
    alignSelf: 'center',
  },
  profileHeader: {
    flex: 4,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: height * 25,
  },
  profileImg: {
    width: 116,
    height: 116,
    overflow: 'hidden',
    borderRadius: 100,
    alignItems: 'center',
  },
  profileImgGroup: {
    width: width * 160,
    height: height * 160,
  },
  buttonSection: {
    width: width * 300,
    height: height * 40,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#EEEEEE',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 16,
    alignSelf: 'center',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 24,
    height: 30,
    marginTop: height * 90,
    marginBottom: height * 8,
  },
  birthday: {
    fontSize: 16,
    color: colors.textGrey,
    marginBottom: height * 15,
    fontWeight: '600',
  },
  editSection: {
    flex: 3,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height * 100,
  },
});

export default ProfileScreen;

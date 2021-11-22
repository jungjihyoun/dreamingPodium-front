/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// REDUX
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../../reducer/userSlice';
import {fetchNoteData} from '../../reducer/postingSlice';

import {colors, images, width, height} from '../../config/globalStyles';

import {SocialButton} from '../../components/SocialButton';
import {signInKakaoTalk} from './loginKakao';
import {signInApple} from './loginApple';

import Logo from '../../assets/svg/dreamingLogo';

function LoginScreen({navigation}) {
  const dispatch = useDispatch();

  const setUserInfo = params => {
    dispatch(setUser(params));
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={{flex: 2}}>
        <Logo width={150} height={400} />
      </View>

      <View style={{flex: 1}}>
        <Text style={styles.headerSection}>
          운동을 올바르게{' '}
          <Text style={{color: '#20C1A1', fontWeight: 'bold', fontSize: 18}}>
            right
          </Text>
        </Text>
        <Text style={styles.headerSection}>
          똑똑하게 기록하기{' '}
          <Text style={{fontWeight: 'bold', color: '#20C1A1', fontSize: 18}}>
            write
          </Text>
        </Text>
      </View>

      <View style={styles.bottomDivider}>
        <View style={{flex: 1, height: 1, backgroundColor: '#F8FAFF'}} />
        <View>
          <Text style={styles.dividerText}>⚡️ 3초만에 빠른 회원가입 </Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: '#F8FAFF'}} />
      </View>

      <View
        style={{
          flex: 1.5,
          alignItems: 'center',
        }}>
        <SocialButton
          style={{backgroundColor: colors.kakaoTalk}}
          onPress={() => {
            console.log('카카오 로그인 ');
            signInKakaoTalk(setUserInfo);
          }}>
          <Image style={{width: 15, height: 15}} source={images.kakao} />
          <Text style={{...styles.socialText, color: '#421919'}}>
            카카오톡으로 로그인하기
          </Text>
        </SocialButton>
        {Platform.OS === 'ios' && (
          <View>
            <SocialButton
              style={{backgroundColor: colors.apple}}
              onPress={() => {
                console.log('애플 로그인 ');
                signInApple(setUserInfo);
              }}>
              <Image style={{width: 14, height: 17}} source={images.apple} />
              <Text style={{...styles.socialText, color: colors.white}}>
                Apple로 로그인하기
              </Text>
            </SocialButton>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  headerSection: {
    width: width * 200,
    textAlign: 'center',
    color: '#424141',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    flex: 0.5,
  },
  dividerText: {
    width: width * 150,
    textAlign: 'center',
    color: colors.lightGrey,
    fontWeight: 'bold',
  },
  socialText: {
    color: colors.textGrey,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});

export default LoginScreen;

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';

import {colors, images, width, height} from '../../config/globalStyles';

import {SocialButton} from '../../components/socialButton';

function LoginScreen({navigation}) {
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}>
      <View style={{flex: 2}}>
        <Image style={styles.mainLogoImg} source={images.logo} />
        <Text style={styles.mainLogoText}>Dreaming Podium</Text>
      </View>

      <View style={{flex: 2}}>
        <TextInput
          style={styles.loginInput}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="아이디"
          keyboardType="numeric"
        />

        <TextInput
          style={styles.loginInput}
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="비밀번호"
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            navigation.navigate('HomeApp');
          }}>
          <Text style={{color: colors.white}}>로그인</Text>
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 21}}>
          <View
            style={{flex: 1, height: 1, backgroundColor: colors.borderGrey}}
          />
          <View>
            <Text
              style={{
                width: 50,
                textAlign: 'center',
                color: colors.darkGrey,
                fontWeight: 'bold',
              }}>
              OR
            </Text>
          </View>
          <View
            style={{flex: 1, height: 1, backgroundColor: colors.borderGrey}}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
        }}>
        <SocialButton>
          <Image style={styles.socialIcon} source={images.kakao} />
          <Text style={styles.socialText}>카카오톡으로 로그인하기</Text>
        </SocialButton>
        {Platform.OS === 'ios' && (
          <SocialButton>
            <Image style={styles.socialIcon} source={images.kakao} />
            <Text style={styles.socialText}>애플아이디로 로그인하기</Text>
          </SocialButton>
        )}
      </View>

      <View
        style={{
          flex: 1,
        }}>
        <Text style={styles.aboutSignUp}>비밀번호를 잊었나요?</Text>
        <Text style={{color: colors.darkGrey, fontSize: 12, marginTop: 10}}>
          계정이 없다면? <Text style={styles.aboutSignUp}>회원가입</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mainLogoImg: {
    width: width * 115,
    height: height * 91,
    marginTop: 75,
    marginLeft: 13,
  },
  mainLogoText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
  },
  loginInput: {
    width: width * 343,
    height: height * 48,
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: colors.borderGrey,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: colors.primary,
    width: width * 343,
    height: height * 57,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'white',
  },
  socialIcon: {
    marginRight: 20,
  },
  socialText: {
    color: colors.lightGrey,
  },
  aboutSignUp: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 15,
  },
});

export default LoginScreen;

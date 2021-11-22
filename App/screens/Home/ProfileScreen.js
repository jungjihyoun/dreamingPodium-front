/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImagePropTypes,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setProfile, setUser, setUserImage} from '../../reducer/userSlice';
import {signOutKakaoTalk} from '../../screens/Auth/loginKakao';

import ImagePicker from 'react-native-image-crop-picker';

import TextInputLine from '../../components/TextInputLine';
import {colors, images, width, height} from '../../config/globalStyles';

import API from '../../utils/note';

function ProfileScreen({navigation, ...props}) {
  const user = useSelector(state => state.user);
  const todayDate = useSelector(state => state.posting.todayDate);
  const dispatch = useDispatch();

  const [name, setName] = useState(user.username);
  const [gender, setGender] = useState(user.gender);
  const [birth, setBirth] = useState(user.birthday);
  const [image, setImage] = useState(user.userImage);
  const [team, setTeam] = useState(user.team);
  const [field, setField] = useState(user.field);

  const logout = () => {
    // asyncstorage 지우기

    if (user.provider === 'kakao') {
      signOutKakaoTalk();
      navigation.navigate('Login');
    } else {
      // 애플 로그아웃
    }
  };

  const submitUserProfile = async () => {
    //redux
    dispatch(
      setProfile({
        username: name,
        gender: gender,
        birth: birth,
        userImage: image['_parts'][0][1]['uri']
          ? image['_parts'][0][1]['uri']
          : '',
        field: field,
        team: team,
      }),
    );
    // 이미지 포스트
    // if (image !== '') {
    //   await API.postImage('KA1992149316', 'profile', todayDate, image);
    // }
  };

  const showImage = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: false,
    }).then(_image => {
      var body = new FormData();
      body.append('file', {
        uri: _image.sourceURL,
        type: 'image/jpeg',
        name: _image.filename,
      });
      // 이미지 state
      setImage(body);
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <View style={styles.profileTitleArea}>
        <Text style={styles.profileTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            logout();
          }}>
          <Text
            style={{color: colors.primary, fontWeight: 'bold', fontSize: 16}}>
            LogOut
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1.5}}>
        <TouchableOpacity
          style={styles.profileImgArea}
          onPress={() => {
            showImage();
          }}>
          {image !== '' && image !== undefined ? (
            <Image
              style={{
                width: 150,
                height: 150,
              }}
              resizeMode="cover"
              resizeMethod="auto"
              source={{uri: image['_parts'][0][1]['uri']}}
            />
          ) : (
            <Image source={images.profileImgGroup} />
          )}
        </TouchableOpacity>
      </View>

      <View style={{flex: 3}}>
        <TextInputLine
          inputName="이름"
          value={name}
          onChangeText={event => {
            setName(event);
          }}
        />
        <TextInputLine
          inputName="성별"
          value={gender}
          onChangeText={event => {
            setGender(event);
          }}
        />
        <TextInputLine
          inputName="생일"
          value={birth}
          onChangeText={event => {
            setBirth(event);
          }}
        />
        <TextInputLine
          inputName="소속"
          onChangeText={event => {
            setTeam(event);
          }}
          value={team}
        />
        <TextInputLine
          inputName="종목"
          onChangeText={event => {
            setField(event);
          }}
          value={field}
        />
      </View>

      <View style={{flex: 0.8, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            submitUserProfile();
          }}
          style={styles.submitButton}>
          <Text style={styles.submitButtonText}> 저장 </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkGrey,
    paddingTop: 30,
    paddingLeft: 25,
  },
  profileTitleArea: {
    flexDirection: 'row',
  },
  profileImgArea: {
    width: 150,
    height: 150,
    overflow: 'hidden',
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  profileImgGroup: {
    width: width * 160,
    height: height * 160,
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    width: 80,
    height: 40,
    backgroundColor: colors.primary,
    color: colors.white,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    position: 'absolute',
    right: 30,
    top: 40,
  },
});

export default ProfileScreen;

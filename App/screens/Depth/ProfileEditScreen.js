/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

// REDUX
import {useSelector, useDispatch} from 'react-redux';
import {setProfile, setUser, setUserImage} from '../../reducer/userSlice';

import ImagePicker from 'react-native-image-crop-picker';

import ProfileInputLine from '../../components/ProfileInputLine';
import {colors, images, width, height} from '../../config/globalStyles';

import API from '../../utils/note';

function ProfileEditScreen({navigation, ...props}) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user.username);
  const [gender, setGender] = useState(user.gender);
  const [birth, setBirth] = useState(user.birth);
  const [image, setImage] = useState(user.userImage);
  const [team, setTeam] = useState(user.team);
  const [field, setField] = useState(user.field);

  const submitUserProfile = async () => {
    //redux
    dispatch(
      setProfile({
        username: name ? name : user.username,
        gender: gender ? gender : user.gender,
        birth: birth ? birth : user.birth,
        userImage: image !== '' && image !== undefined ? image : '',
        field: field ? field : user.field,
        team: team ? team : user.team,
      }),
    );

    Alert.alert('라잇', '프로필 설정이 완료되었습니다.', [{text: '확인'}]);

    // 이미지 포스트 API
    // if (image !== '') {
    //   await API.postImage('KA1951543508', 'profile', todayDate, image);
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
      const img = body['_parts'][0][1]['uri'];
      setImage(img);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={height * 20}
        behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
        enabled
        style={{flex: 1, backgroundColor: colors.white}}>
        <SafeAreaView style={{height: '100%'}}>
          <View style={styles.profileTitleArea}>
            <Text style={styles.profileTitle}>프로필 수정</Text>
          </View>

          <View style={{flex: 1.5}}>
            <TouchableOpacity
              style={styles.profileImgArea}
              onPress={() => {
                showImage();
              }}>
              {image !== '' ? (
                <Image
                  style={{
                    width: 150,
                    height: 150,
                  }}
                  resizeMode="cover"
                  resizeMethod="auto"
                  source={{
                    uri: image,
                  }}
                />
              ) : (
                <Image source={images.profileImgGroup} />
              )}
            </TouchableOpacity>
          </View>

          <View style={{flex: 3}}>
            <ProfileInputLine
              inputName="이름"
              value={name}
              onChangeText={event => {
                setName(event);
              }}
            />
            <ProfileInputLine
              inputType="gender"
              inputName="성별"
              value={gender}
              onChangeGender={setGender}
            />
            <ProfileInputLine
              inputType="date"
              inputName="생일"
              value={birth}
              onConfirm={event => {
                setBirth(event);
              }}
            />

            <ProfileInputLine
              inputName="소속"
              onChangeText={event => {
                setTeam(event);
              }}
              value={team}
            />
            <ProfileInputLine
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
                Keyboard.dismiss();
                navigation.push('ProfileScreen');
              }}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}> 저장 </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    width: width * 90,
    height: height * 30,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: colors.whiteGrey,
    borderRadius: 10,
    justifyContent: 'center',
  },
  submitButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default ProfileEditScreen;

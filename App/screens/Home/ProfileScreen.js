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
import {setDepartment, setUser, setUserImage} from '../../reducer/userSlice';

import ImagePicker from 'react-native-image-crop-picker';

import DreamTextInputLine from '../../components/DreamTextInputLine';
import {colors, images, width, height} from '../../config/globalStyles';

function ProfileScreen(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const submitUserProfile = () => {
    dispatch(
      setUser({username: '정지현', field: field, team: team, userImage: image}),
    );
  };

  const [image, setImage] = useState('');
  const [team, setTeam] = useState();
  const [field, setField] = useState();

  const showImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: false,
    }).then(_image => {
      setImage(_image.sourceURL);
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.profileTitleArea}>
        <Text style={styles.profileTitle}>Profile</Text>
      </View>

      <View style={{flex: 1.5}}>
        <TouchableOpacity
          style={styles.profileImgArea}
          onPress={() => {
            showImage();
          }}>
          {image ? (
            <Image
              style={{
                width: 150,
                height: 150,
              }}
              resizeMode="cover"
              resizeMethod="auto"
              source={{uri: image}}
            />
          ) : (
            <Image source={images.profileImgGroup} />
          )}
        </TouchableOpacity>
      </View>

      <View style={{flex: 3}}>
        <DreamTextInputLine inputName="이름" value="정지현" />
        <DreamTextInputLine inputName="성별" value="여자" />
        <DreamTextInputLine inputName="생일" value="98-06-02" />
        <DreamTextInputLine
          inputName="소속"
          onChangeText={event => {
            setTeam(event);
          }}
        />
        <DreamTextInputLine
          inputName="종목"
          onChangeText={event => {
            setField(event);
          }}
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
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
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
});

export default ProfileScreen;

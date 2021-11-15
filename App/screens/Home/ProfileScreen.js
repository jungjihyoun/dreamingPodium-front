import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setDepartment, setField} from '../../reducer/userSlice';

import DreamTextInputLine from '../../components/DreamTextInputLine';
import {colors, images, width, height} from '../../config/globalStyles';

function ProfileScreen(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const submitUserProfile = () => {
    console.log(user.department);
    console.log(user.field);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.profileTitleArea}>
        <Text style={styles.profileTitle}>Profile</Text>
      </View>

      <View style={styles.profileImgArea}>
        <Image source={images.profileImgGroup} />
      </View>

      <View style={{flex: 3}}>
        <DreamTextInputLine inputName="이름" value="정지현" />
        <DreamTextInputLine inputName="성별" value="여자" />
        <DreamTextInputLine inputName="생일" value="98-06-02" />
        <DreamTextInputLine
          inputName="소속"
          onChangeText={event => {
            dispatch(setDepartment(event));
          }}
        />
        <DreamTextInputLine
          inputName="종목"
          onChangeText={event => {
            dispatch(setField(event));
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
    flex: 1.5,
    alignItems: 'center',
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

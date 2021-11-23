/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import ObjectCard from '../../components/ObjectCard';
import {colors, width, height} from '../../config/globalStyles';

import {submitObject, deleteObject} from '../../reducer/postingSlice';
import API from '../../utils/note';

function DreamScreen(props) {
  const [test, setKeyBoardAvoid] = useState(true);
  const objectNote = useSelector(state => state.posting.ObjectNote);
  const dispatch = useDispatch();
  const initData = async () => {
    try {
      return await AsyncStorage.getItem('visitCheck');
    } catch (error) {
      console.log(error);
    }
  };

  const submitObjectList = () => {
    const objectives = objectNote.objectives;
    const requirements = objectNote.requirements;
    const efforts = objectNote.efforts;
    const routines = objectNote.routines;

    // API.postObjectInit(
    //   'KA1951543508',
    //   objectives,
    //   requirements,
    //   efforts,
    //   routines,
    // );
  };

  const addObjectItem = (type, text) => {
    if (objectNote[type].includes(text)) {
      Alert.alert('라잇', '중복된 내용은 작성할 수 없습니다 😢 ', [
        {text: '확인'},
      ]);
    } else if (text === '') {
      Alert.alert('라잇', '내용을 작성해 주세요 ✍️', [{text: '확인'}]);
    } else {
      dispatch(
        submitObject({
          ObjectType: type,
          content: text,
        }),
      );

      // API update 호출
    }
  };

  const deleteObjectItem = (type, text) => {
    dispatch(
      deleteObject({
        ObjectType: type,
        content: text,
      }),
    );
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height * 10}
      behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
      enabled={test}
      style={{
        backgroundColor: colors.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <SafeAreaView>
        <View style={styles.SafeAreaView}>
          <View>
            <Text style={styles.dreamTitle}>목표달성</Text>
          </View>

          {/* 첫 접속 유져일때만 보여주기 */}
          {initData !== 'true' && (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                submitObjectList();
                // AsyncStorage.setItem('visitCheck', 'true');
                // props.navigation.push('HomeApp');
              }}>
              <Text style={styles.submitText}>완료</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView>
          <View>
            <ObjectCard
              title="나의 최종 목표"
              objectValues={objectNote.objectives}
              addObjectItem={text => {
                addObjectItem('objectives', text);
              }}
              deleteObjectItem={text => {
                deleteObjectItem('objectives', text);
              }}
              onPress={() => setKeyBoardAvoid(false)}
            />
            <ObjectCard
              title="필요한 자질"
              objectValues={objectNote.requirements}
              addObjectItem={text => {
                addObjectItem('requirements', text);
              }}
              deleteObjectItem={text => {
                deleteObjectItem('requirements', text);
              }}
              onPress={() => setKeyBoardAvoid(false)}
            />
            <ObjectCard
              title="매일 해야 하는 노력"
              objectValues={objectNote.efforts}
              addObjectItem={text => {
                addObjectItem('efforts', text);
              }}
              deleteObjectItem={text => {
                deleteObjectItem('efforts', text);
              }}
              onPress={() => setKeyBoardAvoid(true)}
            />
            <ObjectCard
              title="루틴 설정"
              objectValues={objectNote.routines}
              addObjectItem={text => {
                addObjectItem('routines', text);
              }}
              deleteObjectItem={text => {
                deleteObjectItem('routines', text);
              }}
              onPress={() => setKeyBoardAvoid(true)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flexDirection: 'row',
    marginTop: height * 35,
    marginBottom: height * 35,
  },
  dreamTitle: {
    fontSize: 22,
    color: colors.darkGrey,
    fontWeight: 'bold',
  },
  addObjectItem: {
    fontSize: 18,
    color: colors.lightGrey,
    fontWeight: 'bold',
  },
  submitButton: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  submitText: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default DreamScreen;

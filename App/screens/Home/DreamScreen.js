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
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import ObjectCard from '../../components/ObjectCard';
import {colors, width, height} from '../../config/globalStyles';

import {submitObject, deleteObject} from '../../reducer/postingSlice';

function DreamScreen(props) {
  const objectNote = useSelector(state => state.posting.ObjectNote);
  const todayDate = useSelector(state => state.posting.todayDate);
  const dispatch = useDispatch();

  // const deleteButton = (text, array) => {
  //   const a = array.filter(data => data !== text);
  //   return a;
  // };
  // const goToNext = async () => {
  //   await AsyncStorage.getItem('verifiedUser', (_err, result) => {
  //     if (result === 'true') {
  //       setVerifiedUser(result);
  //     } else {
  //       setVerifiedUser(result);
  //     }
  //   });
  //   console.log(verifiedUser);
  // };

  // useEffect(() => {
  //   //TODO 디비 정보 불러오기
  //   goToNext(false);
  // }, []);
  const addObjectItem = (type, text) => {
    if (objectNote[type].includes(text)) {
      // TODO : 토스트 문구로 중복 안됨 알리기
    } else {
      dispatch(
        submitObject({
          ObjectType: type,
          content: text,
        }),
      );
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
      keyboardVerticalOffset={height * 20}
      behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
      enabled
      style={{
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

          {true && (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                AsyncStorage.setItem('verifiedUser', 'true');
                props.navigation.navigate('HomeApp');
              }}>
              <Text style={styles.submitText}>완료</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView>
          <View>
            <ObjectCard
              title="나의 최종 목표"
              objectValues={objectNote.object}
              addObjectItem={text => {
                addObjectItem('object', text);
              }}
              deleteObjectItem={text => {
                deleteObjectItem('object', text);
              }}
            />
            <ObjectCard
              title="필요한 자질"
              objectValues={objectNote.capability}
              addObjectItem={text => {
                addObjectItem('capability', text);
              }}
              deleteObjectItem={text => {
                deleteObjectItem('capability', text);
              }}
            />
            <ObjectCard
              title="매일 해야 하는 노력"
              objectValues={objectNote.effort}
              addObjectItem={text => {
                addObjectItem('effort', text);
              }}
              deleteObjectItem={text => {
                deleteObjectItem('effort', text);
              }}
            />
            <ObjectCard
              title="루틴 설정"
              objectValues={objectNote.routine}
              addObjectItem={text => {
                addObjectItem('routine', text);
              }}
              deleteObjectItem={text => {
                deleteObjectItem('routine', text);
              }}
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

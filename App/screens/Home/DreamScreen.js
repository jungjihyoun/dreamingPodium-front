/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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

import DreamObjectCard from '../../components/DreamObjectCard';

import {colors, width, height} from '../../config/globalStyles';

function DreamScreen(props) {
  const [visitedUser, setVisitedUser] = useState();
  const [state, setState] = useState({
    object: [],
    capability: [],
    effort: [],
    routine: [],
  });

  const deleteButton = (text, array) => {
    const a = array.filter(data => data !== text);

    return a;
  };
  const goToNext = async () => {
    await AsyncStorage.getItem('visitedUser', (_err, result) => {
      if (result === 'true') {
        setVisitedUser(result);
      } else {
        setVisitedUser(result);
      }
    });
    console.log(visitedUser);
  };

  useEffect(() => {
    //TODO 디비 정보 불러오기
    goToNext(false);
  }, []);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={height * 20}
      behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
      enabled
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <SafeAreaView>
        <Text style={styles.dreamTitle}>목표 설정</Text>
        {visitedUser !== 'true' && (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              AsyncStorage.setItem('visitedUser', 'true');
              props.navigation.navigate('HomeApp');
            }}>
            <Text style={{color: colors.primary, fontWeight: 'bold'}}>
              제출 하고 기록하러 가기 >>
            </Text>
          </TouchableOpacity>
        )}

        <ScrollView>
          <View>
            <DreamObjectCard
              title="나의 최종 목표"
              handleAddText={text => {
                setState({
                  object: [...state.object, text],
                  capability: [...state.capability],
                  effort: [...state.effort],
                  routine: [...state.routine],
                });
              }}
              deleteListButton={(data, array) => {
                setState({
                  object: deleteButton(data, array),
                  capability: [...state.capability],
                  effort: [...state.effort],
                  routine: [...state.routine],
                });
              }}
              state={state.object}
              multiple={false}
            />
            <DreamObjectCard
              title="필요한 자질"
              handleAddText={text => {
                setState({
                  object: [...state.object],
                  capability: [...state.capability, text],
                  effort: [...state.effort],
                  routine: [...state.routine],
                });
              }}
              deleteListButton={(data, array) => {
                setState({
                  object: [...state.object],
                  capability: deleteButton(data, array),
                  effort: [...state.effort],
                  routine: [...state.routine],
                });
              }}
              state={state.capability}
            />
            <DreamObjectCard
              title="매일 해야 하는 노력"
              handleAddText={text => {
                setState({
                  object: [...state.object],
                  capability: [...state.capability],
                  effort: [...state.effort, text],
                  routine: [...state.routine],
                });
              }}
              deleteListButton={(data, array) => {
                setState({
                  object: [...state.object],
                  capability: [...state.capability],
                  effort: deleteButton(data, array),
                  routine: [...state.routine],
                });
              }}
              state={state.effort}
            />
            <DreamObjectCard
              title="루틴 설정"
              handleAddText={text => {
                setState({
                  object: [...state.object],
                  capability: [...state.capability],
                  effort: [...state.effort],
                  routine: [...state.routine, text],
                });
              }}
              deleteListButton={(data, array) => {
                setState({
                  object: [...state.object],
                  capability: [...state.capability],
                  effort: [...state.effort],
                  routine: deleteButton(data, array),
                });
              }}
              state={state.routine}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  dreamTitle: {
    fontSize: 18,
    color: colors.darkGrey,
    fontWeight: 'bold',
    marginTop: height * 48,
    marginBottom: height * 20,
  },

  boxContainer: {
    paddingHorizontal: 16,
    paddingLeft: 19,
    marginTop: 21,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 341,
    minHeight: height * 100,

    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
  },
  savedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  addArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 23,
  },

  handleAddText: {
    fontSize: 18,
    color: colors.lightGrey,
    fontWeight: 'bold',
  },
  inputHolder: {
    width: width * 200,
    minHeight: height * 40,
    borderWidth: 1,
    borderColor: colors.darkGrey,
    marginLeft: 20,
  },
  submitButton: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default DreamScreen;

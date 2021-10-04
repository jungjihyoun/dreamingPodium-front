import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import DreamObjectCard from '../../components/DreamObjectCard';

import {colors, width, height} from '../../config/globalStyles';

function DreamScreen(props) {
  const [state, setState] = useState({
    object: [],
    capability: [],
    effort: [],
    routine: [],
  });

  const deleteButton = (text, array) => {
    const a = array.filter(data => data !== text);
    console.log(a);
    return a;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <View>
        <Text style={styles.dreamTitle}>목표 설정</Text>
      </View>

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
  );
}

const styles = StyleSheet.create({
  dreamTitle: {
    fontSize: 16,
    color: colors.lightGrey,
    fontWeight: 'bold',
    marginTop: 28,
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
    shadowColor: '#000000',
    shadowOpacity: 0.22,
    shadowRadius: 2.65,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    // android
    elevation: 3,
  },

  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.lightGrey,
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
    color: colors.darkGrey,
    fontWeight: 'bold',
  },
  inputHolder: {
    width: width * 200,
    minHeight: height * 40,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    marginLeft: 20,
  },
});

export default DreamScreen;

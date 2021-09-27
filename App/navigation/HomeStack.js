import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';

import TrainingNoteScreen from '../screens/Depth/TrainingNoteScreen';
import ConditioningNoteScreen from '../screens/Depth/ConditioningNoteScreen';
import WritingScreen from '../screens/Depth/WritingScreen';

const StackHome = createStackNavigator();
const navOptionHandler = () => ({
  headerShown: false,
});
//메인 화면 스택
const HomeStack = ({navigation, route}) => {
  return (
    <StackHome.Navigator initialRouteName="HomeScreen">
      <StackHome.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="TrainingNote"
        component={TrainingNoteScreen}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="ConditioningNote"
        component={ConditioningNoteScreen}
        options={navOptionHandler}
      />
      <StackHome.Screen
        name="WritingScreen"
        component={WritingScreen}
        options={navOptionHandler}
      />
    </StackHome.Navigator>
  );
};

export default HomeStack;

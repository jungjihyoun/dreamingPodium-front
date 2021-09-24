import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import WriteTrainingScreen from '../screens/Depth/WriteTrainingScreen';

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
        name="WritingTraining"
        component={WriteTrainingScreen}
        options={navOptionHandler}
      />
    </StackHome.Navigator>
  );
};

export default HomeStack;

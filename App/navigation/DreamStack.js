import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DreamScreen from '../screens/Home/DreamScreen';

const StackDream = createStackNavigator();
const navOptionHandler = () => ({
  headerShown: false,
});
//메인 화면 스택
const DreamStack = ({navigation, route}) => {
  return (
    <StackDream.Navigator initialRouteName="DreamScreen">
      <StackDream.Screen
        name="DreamScreen"
        component={DreamScreen}
        options={navOptionHandler}
      />
    </StackDream.Navigator>
  );
};

export default DreamStack;

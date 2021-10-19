import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WritingScreen from '../screens/Depth/WritingScreen';
import ConditionWriteScreen from '../screens/Depth/ConditionWriteScreen';

const StackDepth = createStackNavigator();
const navOptionHandler = () => ({
  headerShown: false,
});
//메인 화면 스택
const DepthStack = ({navigation, route}) => {
  return (
    <StackDepth.Navigator>
      <StackDepth.Screen
        name="WritingScreen"
        component={WritingScreen}
        options={navOptionHandler}
      />
      <StackDepth.Screen
        name="ConditionWriteScreen"
        component={ConditionWriteScreen}
        options={navOptionHandler}
      />
    </StackDepth.Navigator>
  );
};

export default DepthStack;

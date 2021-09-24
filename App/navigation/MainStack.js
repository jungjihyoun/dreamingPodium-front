import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//navigation

//screens

import BottomTabNavigator from './BottomTab';
import DepthStack from './DepthStack';

const Stack = createStackNavigator();

function MainStack() {
  // Check whether an initial notification is available

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      presentation="card">
      <Stack.Screen name="Tab" component={BottomTabNavigator} />
      <Stack.Screen name="Depth" component={DepthStack} />
    </Stack.Navigator>
  );
}

export default MainStack;

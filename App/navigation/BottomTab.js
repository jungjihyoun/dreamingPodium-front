import React from 'react';
import {Image} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStack';
import DreamStack from './DreamStack';
import ProfileStack from './ProfileStack';

import {colors, width, height, images} from '../config/globalStyles';

//custom imports

const Tab = createBottomTabNavigator();

const TabBarIcon = (focused, name) => {
  let iconImagePath;
  let iconSize;

  if (name === 'Home') {
    iconSize = {width: width * 22.4, height: height * 22};
    iconImagePath = images.home;
  } else if (name === 'Dream') {
    iconSize = {width: width * 18, height: height * 18};
    iconImagePath = images.dream;
  } else {
    iconSize = {width: width * 18.67, height: height * 20};
    iconImagePath = images.profile;
  }

  return <Image source={iconImagePath} style={iconSize} />;
};

export default function BottomTabNavigator({navigation, route}) {
  //탭 네비게이터 함수
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        activeTintColor: colors.primary,
        tabBarLabel: route.name,
        tabBarIcon: ({focused}) => TabBarIcon(focused, route.name),
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Dream" component={DreamStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

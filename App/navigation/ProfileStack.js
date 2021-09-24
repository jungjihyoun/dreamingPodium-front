import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/Home/ProfileScreen';

const StackProfile = createStackNavigator();
const navOptionHandler = () => ({
  headerShown: false,
});
//메인 화면 스택
const ProfileStack = ({navigation, route}) => {
  return (
    <StackProfile.Navigator initialRouteName="ProfileScreen">
      <StackProfile.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={navOptionHandler}
      />
    </StackProfile.Navigator>
  );
};

export default ProfileStack;

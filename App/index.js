import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import MainStack from './navigation/MainStack';
import LoginScreen from './screens/Auth/LoginScreen';
import DreamStack from './navigation/DreamStack';
import ProfileStack from './navigation/ProfileStack';

import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {selectLogin, setUserToken} from './reducer/userSlice';
import {postingReducer} from './reducer/postingSlice';
const StackApp = createStackNavigator();

const navOptionHandler = () => ({
  headerShown: false,
});

const App = navigation => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectLogin);

  // 자동로그인
  useEffect(() => {
    AsyncStorage.getItem('userToken').then(token => {
      if (token !== null) {
        dispatch(setUserToken({userToken: token}));
      }
    });
  }, [dispatch]);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackApp.Navigator presentation="modal">
            {/* UserToken이 없으면 로그인 페이지 */}
            {!loggedIn ? (
              <StackApp.Screen
                name="Login"
                component={LoginScreen}
                options={navOptionHandler}
              />
            ) : (
              <>
                <StackApp.Screen
                  name="HomeApp"
                  component={MainStack}
                  options={navOptionHandler}
                />
                <StackApp.Screen
                  name="dream"
                  component={DreamStack}
                  options={navOptionHandler}
                />
                <StackApp.Screen
                  name="profile"
                  component={ProfileStack}
                  options={navOptionHandler}
                />
              </>
            )}
          </StackApp.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

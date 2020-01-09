import React from 'react';
import {Text, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/RegisterScreen';
import AuthorizedScreen from './screens/AuthorizedScreen';
import AuthLoading from './components/AuthLoading';
import {HeaderBackIcon, HeaderMiddleIcon, HeaderRightTitle} from './components/Header';

const UnauthorizedNavigator = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        headerBackTitle: ' ',
        headerTitleAlign: 'center',
        headerStyle: {
          shadowColor: 'transparent',
          backgroundColor: '#222222',
          boxShadow: 'none'
        },
        headerBackImage: HeaderBackIcon,
        headerTitle: HeaderMiddleIcon,
        headerRight: HeaderRightTitle,
      }
    },
  },
  {
    initialRouteName: 'Splash',
  },
);

const AuthorizedNavigator = createStackNavigator(
  {
    Authorized: AuthorizedScreen,
  },
  {
    initialRouteName: 'Authorized',
  },
);

const Navigator = createSwitchNavigator(
  {
    UnauthorizedNavigator: UnauthorizedNavigator,
    AuthorizedNavigator: AuthorizedNavigator,
    AuthLoading: AuthLoading,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(Navigator);

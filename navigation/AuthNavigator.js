import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator} from 'react-navigation';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const authNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    SignUp: SignUpScreen
  },
  config
);

export default authNavigator;

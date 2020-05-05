import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AgendaScreen from '../screens/AgendaScreen';
import CreateReportScreen from '../screens/CreateReportScreen';
import TeamScreen from '../screens/TeamScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DueDateScreen from '../screens/DueDateScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-home'}
    />
  ),
};

HomeStack.path = '';

const AgendaStack = createStackNavigator(
  {
  Agenda: AgendaScreen,
  },
  config
);

AgendaStack.navigationOptions = {
  tabBarLabel: 'Agenda',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-clipboard'} />
  ),
};

AgendaStack.path = '';

const CreateReportStack = createStackNavigator(
  {
    CreateReport: CreateReportScreen,
    DueDate: DueDateScreen
  },
  config
);

CreateReportStack.navigationOptions = {
  tabBarLabel: 'Create',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-add-circle'} />
  ),
};

CreateReportStack.path = '';


const TeamStack = createStackNavigator(
  {
  Team: TeamScreen,
  },
  config
);

TeamStack.navigationOptions = {
  tabBarLabel: 'Team',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-contacts'} />
  ),
};

TeamStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  AgendaStack,
  CreateReportStack,
  TeamStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;

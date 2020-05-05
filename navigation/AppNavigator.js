import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoadingScreen from '../screens/LoadingScreen'
import AuthNavigator from './AuthNavigator'
import ReportScreen from '../screens/ReportScreen';
import InspectionReport from '../screens/InspectionReport';
import OfflineNavigator from './OfflineNavigator';
import DryDockReport from '../screens/DryDockReport';

export default createAppContainer(
  createSwitchNavigator({
    Loading: LoadingScreen,
    Auth: AuthNavigator,
    Main: MainTabNavigator,
    InspectionReport: InspectionReport,
    ReportScreen: ReportScreen,
    OfflineMain: OfflineNavigator,
    DryDockReport: DryDockReport,
  })
);

import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import OfflineHome from '../screens/OfflineHome';
import OfflineCreateReport from '../screens/OfflineCreateReport';
import ReportDetails from '../screens/ReportDetails';
import TabBarIcon from '../components/TabBarIcon';
import TableOfContentScreen from '../screens/TableOfContent'
import InspectionTableOfContentScreen from '../screens/InspectionTableOfContent'
import JobTableOfContentScreen from '../screens/JobTableOfContent'
import TakePicture from '../screens/TakePicture'
import {
  CoatingKey1,
  CoatingScheme1,
  TextSlide3,
  TextSlide7,
  TextSlide8,
  ImagesNoteSlide4,
  ImagesNoteSlide5,
  TableSlide6,
  TableSlide9,
  TableSlide10,
  DragPenalty,
  BulbFoulingTable,
  ImagesAndNotes
} from '../screens/pages';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const OfflineHomeStack = createStackNavigator(
  {
    OfflineHome: OfflineHome,
    ReportDetails: ReportDetails,
    TableOfContent: TableOfContentScreen,
    CoatingKey1: CoatingKey1,
    CoatingScheme1: CoatingScheme1,
    TextSlide3: TextSlide3,
    TextSlide7: TextSlide7,
    TextSlide8: TextSlide8,
    ImagesNoteSlide4: ImagesNoteSlide4,
    ImagesNoteSlide5: ImagesNoteSlide5,
    TableSlide6: TableSlide6,
    TableSlide9: TableSlide9,
    TableSlide10: TableSlide10,
    DragPenalty: DragPenalty,
    BulbFoulingTable: BulbFoulingTable,
    ImagesAndNotes: ImagesAndNotes,
    InspectionTableOfContent: InspectionTableOfContentScreen,
    JobTableOfContent: JobTableOfContentScreen,
    TakePicture: TakePicture
  },
  config
);

OfflineHomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'ios-home'}
    />
  ),
};

OfflineHomeStack.path = '';


const OfflineCreateReportStack = createStackNavigator(
  {
    OfflineCreateReport: OfflineCreateReport,
    ReportDetails: ReportDetails,
  },
  config
);

OfflineCreateReportStack.navigationOptions = {
  tabBarLabel: 'Create',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-add-circle'} />
  ),
};

OfflineCreateReportStack.path = '';

const offlineTabNavigator = createBottomTabNavigator({
  OfflineHomeStack,
});

offlineTabNavigator.path = '';

export default offlineTabNavigator;

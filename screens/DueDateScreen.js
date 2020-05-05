import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  DatePickerAndroid,
  ActivityIndicator
} from 'react-native';

import { MonoText } from '../components/StyledText';
import {inject, observer} from "mobx-react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
const uuidv4 = require('uuid/v4');
import moment from 'moment';

@inject('inspectionStore', 'userStore')
@observer
export default class DueDateScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      year: undefined,
      month: undefined,
      day: undefined,
      loading: false
    }
  }

  componentDidMount(){

  }

  async openDatePicker(){
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date(),
      });
      this.setState({
        year,
        month,
        day
      })
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  async reportScreen(){
    const {year, month, day} = this.state;
    if(year && month && day){
      this.setState({loading: true});
      this.props.inspectionStore.resetData();
      this.props.inspectionStore.reportData.id = uuidv4();
      this.props.inspectionStore.reportData.dueDate = year + '-' + month + '-' + day;
      this.props.inspectionStore.reportData.createdBy = this.props.userStore.uid;
      this.props.inspectionStore.reportData.name = this.props.userStore.profile.name;
      this.props.inspectionStore.reportData.timestamp = moment().format();
      await this.props.inspectionStore.createReport();
      this.setState({loading: false});
      this.props.navigation.navigate('InspectionReport')
    } else {
      this.setState({loading: false});
    }
  }

  _renderDate(){
    const {year, month, day} = this.state;
    if(year && month && day){
      const dateString = year + '-' + (month + 1) + '-' + day
      console.log(dateString)
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 16, marginTop: 40, marginBottom: 5}}>Report Due Date: {moment(dateString).format("MMM Do, YYYY")}</Text>
          <TouchableOpacity onPress={() => this.reportScreen()}>
            <View style={[styles.button, {backgroundColor: '#5bc750', width: wp('35%'), height: wp('12%')}]}>
              <Text style={{fontSize: 15}}>Create Report</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View />
      )
    }
  }

  render(){

    if(this.state.loading){
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="#03fc88" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.openDatePicker()}>
          <View style={styles.button}>
            <Ionicons name="md-calendar" size={30} color='black' />
            <Text style={{fontSize: 18, marginLeft: 5}}>Set Due Date</Text>
          </View>
        </TouchableOpacity>
        {this._renderDate()}
      </View>
    );
  }
}

DueDateScreen.navigationOptions = {
  title: 'Report Due Date',
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: wp('40%'),
    height: wp('15%'),
    shadowOpacity: 0.2,
    borderRadius: 20,
    backgroundColor: '#9ce2f7',
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  indicator: {
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: 'white',
      flex: 1,
      height: hp('100%'),
      width: wp('100%')
  },
});

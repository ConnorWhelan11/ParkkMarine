import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ProgressBarAndroid,
  ActivityIndicator
} from 'react-native';

import { MonoText } from '../components/StyledText';
import {inject, observer} from "mobx-react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons, FontAwesome } from '@expo/vector-icons';


@inject('userStore', 'inspectionStore')
@observer
export default class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }

  reportScreen(report){
    this.props.inspectionStore.reportData = report;
    console.log(report)
    this.props.navigation.navigate('InspectionReport')
  }

  _renderReport(report){
    return (
      <TouchableOpacity key={report.id} onPress={() => this.reportScreen(report)}>
        <View style={{
          width: wp('90%'),
          height: hp('20%'),
          shadowOpacity: 0.2,
          backgroundColor: 'white',
          borderRadius: 5,
          marginBottom: 10,
          backgroundColor: '#9ce2f7',
          shadowColor: 'black',
          shadowOpacity: 1,
          elevation: 3,
        }}>
          <View style={{width: wp('90%'), height: 30, alignItems: 'center'}}>
            <Text style={{fontSize: 18}}>{report.title}</Text>
          </View>
          <View
            style={{
              borderColor: '#9c9c9c',
              borderBottomWidth: 1,
              height: 1,
              width: wp('80%'),
              paddingHorizontal: 5,
              alignSelf: 'center'
            }}
          />
          <View style={{width: wp('90%'), alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
            <Text style={{fontSize: 12, color: 'green'}}>100% Complete</Text>
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <View style={{padding: 5, flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome name="user-circle" size={22} color='black' />
              <Text style={{fontSize: 20, marginLeft: 5}}>{this.props.userStore.profile.name}</Text>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
            <View style={{padding: 5, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 15, marginRight: 5}}>0</Text>
              <Ionicons name="md-chatbubbles" size={16} color='black' />
            </View>
            <View style={{padding: 5, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 15, marginRight: 5}}>4d</Text>
              <Ionicons name="md-calendar" size={16} color='black' />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderReports(reports){
    return reports.map((report) => this._renderReport(report))
  }

  render(){

    const {profile, uid} = this.props.userStore;
    console.log(uid)
    if(!profile){
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="#03fc88" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          {
            this.props.userStore.myReports.length > 0 ?
              this._renderReports(this.props.userStore.myReports)
              :
              <View style={{width: wp('100%'), paddingVertical: 30, alignItems: 'center'}}>
                <Text style={{fontSize: 18}}>No Current Reports</Text>
              </View>
          }
        </ScrollView>
      </View>
    )
  }
}

HomeScreen.navigationOptions = {
  title: 'My Reports',
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    alignItems: 'center'
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

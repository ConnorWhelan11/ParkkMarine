import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import {inject, observer} from "mobx-react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

@inject("userStore")
@observer
export default class CreateReportScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    console.log(this.props.userStore.profile)
  }

  dueDate(){
    this.props.navigation.navigate('DueDate')
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.row}>
            <View style={styles.column}>
              <TouchableOpacity onPress={() => this.dueDate()}>
                <View style={[styles.button, {backgroundColor: '#7de398'}]}>
                  <Text style={{fontSize: 15, marginBottom: 5}}>Inspection Report</Text>
                  <Ionicons name="ios-add-circle-outline" size={20} color='black' />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.column}>
              <TouchableOpacity onPress={() => this.dueDate()}>
                <View style={[styles.button, {backgroundColor: '#ffd154'}]}>
                  <Text style={{fontSize: 15, marginBottom: 5}}>Dry Dock Report</Text>
                  <Ionicons name="ios-add-circle-outline" size={20} color='black' />
                </View>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    )
  }
}

CreateReportScreen.navigationOptions = {
  title: 'New Report',
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    width: wp('100%'),
    height: wp('45%'),
    flexDirection: 'row'
  },
  column:{
    width: wp('50%'),
    height: wp('45%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: wp('40%'),
    height: wp('40%'),
    shadowOpacity: 0.2,
    borderRadius: 5,
    backgroundColor: '#9ce2f7',
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center'
  }

});

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

@inject("userStore")
@observer
export default class SettingsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    console.log(this.props.userStore.profile)
  }

  async logout(){
    await this.props.userStore.logout();
    this.props.navigation.navigate('Auth')
  }

  render(){
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.logout()}>
          <View style={styles.button}>
            <Text style={{fontSize: 18, color: 'white'}}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: hp('90%'),
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    width: wp('40%'),
    height: wp('15%'),
    shadowOpacity: 0.2,
    borderRadius: 7,
    backgroundColor: '#4d91ff',
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
});

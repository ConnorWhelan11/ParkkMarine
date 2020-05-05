import React from 'react';
import { StyleSheet, View, ActivityIndicator, NetInfo, TouchableOpacity, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Firebase from "../components/Firebase";

import {inject, observer} from "mobx-react";

@inject("userStore")
@observer
export default class LoadingScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
    }
  }

  componentDidMount(){
    Firebase.auth.onAuthStateChanged((user) => {
      this.setState({user});
      this.goOffline();
    });
  }

  async goOnline(){
    await this.props.userStore.init(false);
    if(this.state.user){
      this.props.navigation.navigate('OfflineMain');
    } else {
      this.props.navigation.navigate('Auth');
    }
  }

  async goOffline(){
    await this.props.userStore.init(true);
    this.props.navigation.navigate('OfflineMain');
  }

  render(){
    return(
      <View style={styles.root}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

}


const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'white',
        flex: 1,
        height: hp('100%'),
        width: wp('100%')
    },
    button: {
      width: wp('40%'),
      height: wp('10%'),
      shadowOpacity: 0.2,
      borderRadius: 5,
      backgroundColor: '#9ce2f7',
      shadowColor: 'black',
      shadowOpacity: 1,
      elevation: 3,
      alignItems: 'center',
      justifyContent: 'center'
    },
});

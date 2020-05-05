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
export default class TeamScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    console.log(this.props.userStore.profile)
  }

  _renderUser(user){
    return (
      <TouchableOpacity>
        <View style={{
          width: wp('90%'),
          height: hp('20%'),
          shadowOpacity: 0.2,
          borderRadius: 5,
          marginBottom: 10,
          backgroundColor: '#B2FFA6',
          shadowColor: 'black',
          shadowOpacity: 1,
          elevation: 3,
        }}>
          <View style={{width: wp('90%'), paddingLeft: 15}}>
            <View style={{padding: 5, flexDirection: 'row', alignItems: 'center'}}>
              <FontAwesome name="user-circle" size={22} color='black' />
              <Text style={{fontSize: 20, marginLeft: 5}}>{user.name}</Text>
            </View>
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
            <Ionicons name="ios-copy" size={30} color='black' />
            <Text style={{fontSize: 20, marginLeft: 5}}>0 Reports</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render(){
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.props.userStore.allUsers.map((user) => this._renderUser(user))}
        </ScrollView>
      </View>
    )
  }
}

TeamScreen.navigationOptions = {
  title: 'My Team',
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 30
  },

});

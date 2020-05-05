import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';

import Firebase from "../components/Firebase";
import {inject, observer} from "mobx-react";

@inject("userStore")
@observer
export default class SignUpScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      first: '',
      last: '',
      loading: false
    }
  }

  async signUp() {
      const {password, email, first, last} = this.state;
      const displayName = first + ' ' + last;
      try {
          if (password === "") {
              throw new Error("Please provide a password.");
          }
          this.setState({ loading: true });
          const user = await Firebase.auth.createUserWithEmailAndPassword(email, password);
          var profile = {
              name: displayName,
              picture: {
                  uri: "https://firebasestorage.googleapis.com/v0/b/parkk-marine.appspot.com/o/guest_user.png?alt=media&token=171423d2-36a4-4d05-9766-bd4b1c673829",
              }
          };

          await Firebase.firestore.collection("users").doc(user.user.uid).set(profile);
          this.props.navigation.navigate('OfflineMain');
          profile.uid = user.user.uid
          this.props.userStore.profile = profile;

      } catch (e) {
          // eslint-disable-next-line no-alert
          alert(e);
          this.setState({ loading: false });
      }
  }

  render(){
    return(
      <View style={styles.root}>
        <View>
          <Input
            placeholder='Email'
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            containerStyle={{width: 300, height: 50}}
            containerStyle={{width: 300, height: 50, marginBottom: 10}}
            leftIconContainerStyle={{marginRight: 10}}
            onChangeText={(val) => this.setState({email: val})}
          />
          <Input
            placeholder='Password'
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            inputStyle={{width: 300, height: 50}}
            containerStyle={{width: 300, height: 50, marginBottom: 30}}
            leftIconContainerStyle={{marginRight: 10}}
            onChangeText={(val) => this.setState({password: val})}
          />
          <Input
            placeholder='Re-enter Password'
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            inputStyle={{width: 300, height: 50}}
            containerStyle={{width: 300, height: 50, marginBottom: 30}}
            leftIconContainerStyle={{marginRight: 10}}
          />
          <Input
            placeholder='First Name'
            inputStyle={{width: 300, height: 50}}
            containerStyle={{width: 300, height: 50, marginBottom: 30}}
            onChangeText={(val) => this.setState({first: val})}
          />
          <Input
            placeholder='Last Name'
            inputStyle={{width: 300, height: 50}}
            containerStyle={{width: 300, height: 50, marginBottom: 30}}
            onChangeText={(val) => this.setState({last: val})}
          />
        </View>
        <View>
          <Button
            title="Sign Up"
            raised
            onPress={() => this.signUp()}
            containerStyle={{width: 250, height: 50}}
            titleStyle={{fontSize: 24}}
          />
        </View>
      </View>
    )
  }

}

SignUpScreen.navigationOptions = {
  title: 'Sign Up',
};

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'white',
        flex: 1,
        height: '100%'
    },
});

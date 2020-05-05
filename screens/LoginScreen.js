import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import {inject, observer} from "mobx-react";
import Firebase from "../components/Firebase";

@inject("userStore")
@observer
export default class LoginScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  async login() {
      const {email, password} = this.state;
      try {
          if (email === "") {
              throw new Error("Please provide an email address.");
          }
          if (password === "") {
              throw new Error("Please provide a password.");
          }
          this.setState({ loading: true });
          await Firebase.auth.signInWithEmailAndPassword(email, password).then((res) => {
            this.props.userStore.fetchUser(res.user.uid).then(() => this.props.navigation.navigate('OfflineMain'));
          });
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
        </View>
        <View>
          <Button
            title="Login"
            raised
            containerStyle={{width: 250, height: 50}}
            titleStyle={{fontSize: 24}}
            onPress={() => this.login()}
          />
        </View>
      </View>
    )
  }

}

LoginScreen.navigationOptions = {
  title: 'Login',
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

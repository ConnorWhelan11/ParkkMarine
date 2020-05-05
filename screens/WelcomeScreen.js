// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, Dimensions, Linking, TouchableOpacity, View, Image} from "react-native";

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';



export default class WelcomeScreen extends React.Component {

    @autobind
    signUp() {
        this.props.navigation.navigate("SignUp");
    }

    @autobind
    login() {
        this.props.navigation.navigate("Login");
    }

    render(){
        return (
            <View style={styles.root}>
              <View style={{width: '100%', marginBottom: 50, marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={ require('../assets/images/icon.png')}
                  style={styles.welcomeImage}
                />
              </View>
              <View style={{width: '100%', marginBottom: 40, justifyContent: 'center', alignItems: 'center'}}>
                <Button
                  title="Login"
                  raised
                  onPress={this.login}
                  containerStyle={{width: '40%', height: 35}}
                  titleStyle={{fontSize: 24}}
                />
              </View>
              <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Button
                  title="Sign Up"
                  raised
                  onPress={this.signUp}
                  containerStyle={{width: '40%', height: 35}}
                  titleStyle={{fontSize: 24}}
                />
              </View>
            </View>
        );
    }
}

WelcomeScreen.navigationOptions = {
  title: 'Welcome',
};

const {width} = Dimensions.get("window");
const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        backgroundColor: 'white'
    },
    welcomeImage: {
      width: 192,
      height: 192,
      resizeMode: 'contain',
    }
});

import React, { Component } from "react";
import { Button, Text, View, FlatList, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Input } from 'react-native-elements';
const input = React.createRef();

export default class TableTextModal extends Component {
  state = {
    isModalVisible: false,
    row: null,
    col: null,
    text: '',
  };

  toggleModal = (inputText, row, col) => {
    this.setState({ isModalVisible: !this.state.isModalVisible, text: inputText, row, col });
  };

  setText(){
    const {text, row, col} = this.state;
    if(row!== null && col !== null){
      this.props.setText(text, row, col)
    }
    this.toggleModal('', null, null)
  }

  render() {
    return (
      <View style={{flex: 1, width: wp('100%'), alignItems: 'center'}}>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ width: wp('90%'), height: hp('60%'), backgroundColor: 'white', borderRadius: 7, justifyContent: 'center', alignItems: 'center' }}>
            <Input
              ref={input}
              placeholder={''}
              inputStyle={{width: 300, height: 50}}
              label={this.state.col}
              containerStyle={{width: 300, height: 50, marginBottom: 30}}
              onChangeText={(val) => this.setState({text: val})}
            />
            <Button title="Set Text" onPress={() => this.setText()} style={{width: wp('80%')}}/>
          </View>
        </Modal>
      </View>
    );
  }
}

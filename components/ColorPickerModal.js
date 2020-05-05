import React, { Component } from "react";
import { Button, Text, View, FlatList, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const colors = [
  {
    color: '#f53131',
    text: 'Bright Red'
  },
  {
    color: '#a30707',
    text: 'Dark Red'
  },
  {
    color: '#7d2c2c',
    text: 'Reddish Brown'
  },
  {
    color: '#593434',
    text: 'Dark Brown'
  },
  {
    color: '#ffb8ed',
    text: 'Light Pink'
  },
  {
    color: '#f8ffa6',
    text: 'Pale Yellow'
  },
  {
    color: '#088cff',
    text: 'Bright Blue'
  },
  {
    color: '#004887',
    text: 'Dark Blue'
  },
  {
    color: '#ffffff',
    text: 'White'
  },
  {
    color: '#5e37fa',
    text: 'Indigo'
  },
  {
    color: '#000080',
    text: 'Navy Blue'
  },
  {
    color: '#6ecaff',
    text: 'Sky Blue'
  },
  {
    color: '#aec6cf',
    text: 'Pastel Blue'
  },
  {
    color: '#000000',
    text: 'Black'
  },
  {
    color: '#999999',
    text: 'Grey'
  },
  {
    color: '#d1d1d1',
    text: 'Light Grey'
  },
  {
    color: '#525252',
    text: 'Dark Grey'
  },
  {
    color: '#3cde3a',
    text: 'Light Green'
  },
  {
    color: '#087307',
    text: 'Dark Green'
  },
  {
    color: '#031d38',
    text: 'Very Dark Blue'
  },
]

export default class ColorPickerModal extends Component {
  state = {
    isModalVisible: false,
    index: null
  };

  toggleModal = (index) => {
    console.log('index on toggle in modal', index)
    this.setState({ isModalVisible: !this.state.isModalVisible, index });
  };

  _renderColor(item){
    return (
      <TouchableOpacity onPress={() => this.setColor(item.color)}>
        <View style={{width: wp('22%'), height: wp('26%'), alignItems: 'center'}}>
          <View style={{width: wp('13%'), height: wp('13%'), borderRadius: wp('15%') / 2, borderWidth: 2, backgroundColor: item.color}} />
          <Text style={{fontSize: 16, textAlign: 'center'}}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  setColor(color){
    const i = this.state.index;
    if(i !== null){
      this.props.setColor(i, color);
    }
    this.toggleModal(null);
  }

  render() {
    return (
      <View style={{flex: 1, width: wp('100%'), alignItems: 'center'}}>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ width: wp('90%'), height: hp('80%'), backgroundColor: 'white', borderRadius: 7, justifyContent: 'center' }}>
            <FlatList
              data={colors}
              renderItem={({ item }) => this._renderColor(item)}
              keyExtractor={item => item.color}
              numColumns={4}
              style={{marginTop: 10}}
            />
            <Button title="Hide" onPress={() => this.toggleModal(null)} />
          </View>
        </Modal>
      </View>
    );
  }
}

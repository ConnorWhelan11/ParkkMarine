import React, { Component } from "react";
import { Button, Text, View, FlatList, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Input } from 'react-native-elements';
const input = React.createRef();



export default class MultiselectModal extends Component {
  state = {
    isModalVisible: false,
    row: null,
    col: null,
    text: '',
    values: [
      {value: 'Top sides', selected: false},
      {value: 'Boot top', selected: false},
      {value:'Vertical sides', selected: false},
      {value:'Stern', selected: false},
      {value: 'Bow thruster area', selected: false},
      {value: 'Bulbous Bow', selected: false},
      {value: 'Balconies', selected: false},
      {value: 'Sea chests', selected: false},
      {value: 'Crossovers', selected: false},
      {value: 'Flats', selected: false},
      {value: 'Stabilizers', selected: false},
      {value: 'Azipods', selected: false},
      {value: 'Thruster tunnels', selected: false},
      {value: 'Rudder', selected: false}
    ]
  };

  toggleModal = (inputText, row, col) => {
    this.setState({ isModalVisible: !this.state.isModalVisible, text: inputText, row, col });
  };

  _renderItem(item, i){
    return (
      <TouchableOpacity onPress={() => this.onSelect(item, i)} style={{padding: 5}}>
        <View style={{
          width: wp('25%'),
          height: wp('18%'),
          alignItems: 'center',
          borderRadius:10,
          justifyContent: 'center',
          backgroundColor: item.selected ? '#8ae38c' : '#85b4ff'
        }}>
          <Text style={{fontSize: 16, lineHeight: 16, color: 'white', fontWeight: '500', textAlign: 'center'}}>{item.value}</Text>
        </View>
      </TouchableOpacity>
    )
  }


  onSelect(item, i){
    const {values} = this.state;
    console.log(values);
    console.log(i);
    values[i].selected = !values[i].selected;
    this.setState({values});
  }

  submit(){
    let text = '';
    this.state.values.forEach((item, i) => {
      if(item.selected){
        if(text === ''){
          text = item.value;
        } else {
          text = text + ', ' + item.value;
        }
      }
    })

    const {row, col} = this.state;
    if(row!== null && col !== null){
      this.props.onSelect(text, row, col)
    }
    this.toggleModal('', null, null)
  }

  render() {
    return (
      <View style={{flex: 1, width: wp('100%'), alignItems: 'center'}}>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ width: wp('90%'), height: hp('75%'), backgroundColor: 'white', borderRadius: 7, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
              data={this.state.values}
              renderItem={({ item, index }) => this._renderItem(item, index)}
              keyExtractor={item => item.value}
              numColumns={3}
              style={{marginTop: 10}}
            />
            <Button title="Done" onPress={() => this.submit()} style={{width: wp('80%'), marginTop: 10}}/>
          </View>
        </Modal>
      </View>
    );
  }
}

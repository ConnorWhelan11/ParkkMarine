import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Picker,
  ActivityIndicator,
  Alert,
  ScrollView
} from 'react-native'
import Header from '../../components/Header'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {inject, observer} from "mobx-react";
import Swiper from 'react-native-swiper';
import { Table, TableWrapper, Row, Cell, Col, Cols } from 'react-native-table-component';
import RNPickerSelect from 'react-native-picker-select';

import {
  Button,
  Card,
  CardHeader,
  Text,
  Select,
} from '@ui-kitten/components';

import { Input } from '@ui-kitten/components';

const Header1 = () => (
  <CardHeader
    title='Bulbous Bow'
  />
);

const Header2 = () => (
  <CardHeader
    title='Bow Thrusters'
  />
);

const Header3 = () => (
  <CardHeader
    title='Forward Sides'
  />
);

const Header4 = () => (
  <CardHeader
    title='Shoulder'
  />
);

const Header5 = () => (
  <CardHeader
    title='Side 1'
  />
);

const Header6 = () => (
  <CardHeader
    title='Side 2'
  />
);

const Header7 = () => (
  <CardHeader
    title='Side 3'
  />
);

const Header8 = () => (
  <CardHeader
    title='Aft'
  />
);

const Header9 = () => (
  <CardHeader
    title='Stern'
  />
);

const Header10 = () => (
  <CardHeader
    title='Flats'
  />
);


@inject('dryDockStore', 'userStore')
@observer
export default class TableSlide9 extends Component {

  constructor(props){
    super(props);

    this.state = {
      tableData: props.dryDockStore.offlineReportData.slides[8],
      displayTable: props.dryDockStore.offlineReportData.slides[8].displayTable,
    }
  }


  _pickerItems(){
    const items = [
      {
        key: 'external',
        text: 'External Damage',
        value: 'external',
      },
      {
        key: 'good',
        color: '#C2D69A',
        text: 'Good',
        value: 'good',
      },
      {
        key: 'average',
        text: 'Average',
        value: 'average',
      },
      {
        key: 'failed',
        text: 'Failed',
        value: 'failed',
      },
    ];
    return items;
  }


  setItem(area, i, item){
    var table = this.state.tableData;
    var display = this.state.displayTable;
    display[area][i] = item;
    table[area][i] = item.value;
    this.setState({tableData: table, displayTable: display});
  }

  componentWillUnmount(){
    this.props.dryDockStore.offlineReportData.slides[8] = this.state.tableData;
    this.props.dryDockStore.stringify()
  }


  render(){
    const options = this._pickerItems()
    const displayTable = this.state.displayTable;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card header={Header1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Select
              data={options}
              label="Subzone A"
              selectedOption={displayTable.bulb[0]}
              onSelect={(value) => this.setItem('bulb', 0, value)}
            />
            <Select
              data={options}
              label="Subzone B"
              selectedOption={displayTable.bulb[1]}
              onSelect={(value) => this.setItem('bulb', 1, value)}
            />
            <Select
              data={options}
              label="Subzone C"
              selectedOption={displayTable.bulb[2]}
              onSelect={(value) => this.setItem('bulb', 2, value)}
            />
            <Select
              data={options}
              label="Subzone D"
              selectedOption={displayTable.bulb[3]}
              onSelect={(value) => this.setItem('bulb', 3, value)}
            />
            <Select
              data={options}
              label="Subzone E"
              selectedOption={displayTable.bulb[4]}
              onSelect={(value) => this.setItem('bulb', 4, value)}
            />
          </Card>
          <Card header={Header2} style={{ width: wp('90%'), marginBottom: 7}}>
            <Select
              data={options}
              label="Subzone A"
              selectedOption={displayTable.thrust[0]}
              onSelect={(value) => this.setItem('thrust', 0, value)}
            />
            <Select
              data={options}
              label="Subzone B"
              selectedOption={displayTable.thrust[1]}
              onSelect={(value) => this.setItem('thrust', 1, value)}
            />
            <Select
              data={options}
              label="Subzone C"
              selectedOption={displayTable.thrust[2]}
              onSelect={(value) => this.setItem('thrust', 2, value)}
            />
            <Select
              data={options}
              label="Subzone D"
              selectedOption={displayTable.thrust[3]}
              onSelect={(value) => this.setItem('thrust', 3, value)}
            />
            <Select
              data={options}
              label="Subzone E"
              selectedOption={displayTable.thrust[4]}
              onSelect={(value) => this.setItem('thrust', 4, value)}
            />
          </Card>
          <Card header={Header3} style={{ width: wp('90%'), marginBottom: 7}}>
            <Select
              data={options}
              label="Subzone A"
              selectedOption={displayTable.forward[0]}
              onSelect={(value) => this.setItem('forward', 0, value)}
            />
            <Select
              data={options}
              label="Subzone B"
              selectedOption={displayTable.forward[1]}
              onSelect={(value) => this.setItem('forward', 1, value)}
            />
            <Select
              data={options}
              label="Subzone C"
              selectedOption={displayTable.forward[2]}
              onSelect={(value) => this.setItem('forward', 2, value)}
            />
            <Select
              data={options}
              label="Subzone D"
              selectedOption={displayTable.forward[3]}
              onSelect={(value) => this.setItem('forward', 3, value)}
            />
            <Select
              data={options}
              label="Subzone E"
              selectedOption={displayTable.forward[4]}
              onSelect={(value) => this.setItem('forward', 4, value)}
            />
          </Card>
          <Card header={Header4} style={{ width: wp('90%'), marginBottom: 7}}>
            <Select
              data={options}
              label="Subzone A"
              selectedOption={displayTable.shoulders[0]}
              onSelect={(value) => this.setItem('shoulders', 0, value)}
            />
            <Select
              data={options}
              label="Subzone B"
              selectedOption={displayTable.shoulders[1]}
              onSelect={(value) => this.setItem('shoulders', 1, value)}
            />
            <Select
              data={options}
              label="Subzone C"
              selectedOption={displayTable.shoulders[2]}
              onSelect={(value) => this.setItem('shoulders', 2, value)}
            />
            <Select
              data={options}
              label="Subzone D"
              selectedOption={displayTable.shoulders[3]}
              onSelect={(value) => this.setItem('shoulders', 3, value)}
            />
            <Select
              data={options}
              label="Subzone E"
              selectedOption={displayTable.shoulders[4]}
              onSelect={(value) => this.setItem('shoulders', 4, value)}
            />
          </Card>
          <Card header={Header5} style={{ width: wp('90%'), marginBottom: 7}}>
            <Select
              data={options}
              label="Subzone A"
              selectedOption={displayTable.side1[0]}
              onSelect={(value) => this.setItem('side1', 0, value)}
            />
            <Select
              data={options}
              label="Subzone B"
              selectedOption={displayTable.side1[1]}
              onSelect={(value) => this.setItem('side1', 1, value)}
            />
            <Select
              data={options}
              label="Subzone C"
              selectedOption={displayTable.side1[2]}
              onSelect={(value) => this.setItem('side1', 2, value)}
            />
            <Select
              data={options}
              label="Subzone D"
              selectedOption={displayTable.side1[3]}
              onSelect={(value) => this.setItem('side1', 3, value)}
            />
            <Select
              data={options}
              label="Subzone E"
              selectedOption={displayTable.side1[4]}
              onSelect={(value) => this.setItem('side1', 4, value)}
            />
          </Card>
          <Card header={Header6} style={{ width: wp('90%'), marginBottom: 7}}>
            <Select
              data={options}
              label="Subzone A"
              selectedOption={displayTable.side2[0]}
              onSelect={(value) => this.setItem('side2', 0, value)}
            />
            <Select
              data={options}
              label="Subzone B"
              selectedOption={displayTable.side2[1]}
              onSelect={(value) => this.setItem('side2', 1, value)}
            />
            <Select
              data={options}
              label="Subzone C"
              selectedOption={displayTable.side2[2]}
              onSelect={(value) => this.setItem('side2', 2, value)}
            />
            <Select
              data={options}
              label="Subzone D"
              selectedOption={displayTable.side2[3]}
              onSelect={(value) => this.setItem('side2', 3, value)}
            />
            <Select
              data={options}
              label="Subzone E"
              selectedOption={displayTable.side2[4]}
              onSelect={(value) => this.setItem('side2', 4, value)}
            />
          </Card>
          <Card header={Header7} style={{ width: wp('90%'), marginBottom: 7}}>
            <Select
              data={options}
              label="Subzone A"
              selectedOption={displayTable.side3[0]}
              onSelect={(value) => this.setItem('side3', 0, value)}
            />
            <Select
              data={options}
              label="Subzone B"
              selectedOption={displayTable.side3[1]}
              onSelect={(value) => this.setItem('side3', 1, value)}
            />
            <Select
              data={options}
              label="Subzone C"
              selectedOption={displayTable.side3[2]}
              onSelect={(value) => this.setItem('side3', 2, value)}
            />
            <Select
              data={options}
              label="Subzone D"
              selectedOption={displayTable.side3[3]}
              onSelect={(value) => this.setItem('side3', 3, value)}
            />
            <Select
              data={options}
              label="Subzone E"
              selectedOption={displayTable.side3[4]}
              onSelect={(value) => this.setItem('side3', 4, value)}
            />
          </Card>
          <Card header={Header8} style={{ width: wp('90%'), marginBottom: 7}}>
            <Select
              data={options}
              label="Subzone A"
              selectedOption={displayTable.aft[0]}
              onSelect={(value) => this.setItem('aft', 0, value)}
            />
            <Select
              data={options}
              label="Subzone B"
              selectedOption={displayTable.aft[1]}
              onSelect={(value) => this.setItem('aft', 1, value)}
            />
            <Select
              data={options}
              label="Subzone C"
              selectedOption={displayTable.aft[2]}
              onSelect={(value) => this.setItem('aft', 2, value)}
            />
            <Select
              data={options}
              label="Subzone D"
              selectedOption={displayTable.aft[3]}
              onSelect={(value) => this.setItem('aft', 3, value)}
            />
            <Select
              data={options}
              label="Subzone E"
              selectedOption={displayTable.aft[4]}
              onSelect={(value) => this.setItem('aft', 4, value)}
            />
          </Card>
          <Card header={Header9} style={{ width: wp('90%'), marginBottom: 7}}>
            <Select
              data={options}
              label="Subzone A"
              selectedOption={displayTable.stern[0]}
              onSelect={(value) => this.setItem('stern', 0, value)}
            />
            <Select
              data={options}
              label="Subzone B"
              selectedOption={displayTable.stern[1]}
              onSelect={(value) => this.setItem('stern', 1, value)}
            />
            <Select
              data={options}
              label="Subzone E"
              selectedOption={displayTable.stern[2]}
              onSelect={(value) => this.setItem('stern', 2, value)}
            />
          </Card>
          <Card header={Header10} style={{ width: wp('90%'), marginBottom: 7}}>
            <Select
              data={options}
              label="Subzone A"
              selectedOption={displayTable.flats[0]}
              onSelect={(value) => this.setItem('flats', 0, value)}
            />
            <Select
              data={options}
              label="Subzone B"
              selectedOption={displayTable.flats[1]}
              onSelect={(value) => this.setItem('flats', 1, value)}
            />
          </Card>
          <View style={{height: 10, width: wp('80%')}} />
        </ScrollView>
      </View>
    )
  }
}

TableSlide9.navigationOptions = {
  title: 'In Docking Coating Condition Table',
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    alignItems: 'center',
  },
})

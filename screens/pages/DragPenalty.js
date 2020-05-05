import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ProgressBarAndroid,
  ActivityIndicator
} from 'react-native';

import {inject, observer} from "mobx-react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {
  Button,
  Card,
  CardHeader,
  Text,
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


@inject('userStore', 'inspectionStore', 'dryDockStore')
@observer
export default class DragPenalty extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: this.props.dryDockStore.offlineReportData.slides[13],
    }
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    this.props.dryDockStore.stringify()
  }



  setValue(area, side, value){
    var curData = this.state.data;
    curData[area][side] = value;
    this.setState({data: curData})
  }


  render(){
    const data = this.state.data;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card header={Header1} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Port'
              placeholder='Drag penalty'
              value={data['bulb']['port'] + ''}
              onChangeText={(e) => this.setValue('bulb', 'port')}
            />
            <Input
              label='Stbd'
              placeholder='Drag penalty'
              value={data['bulb']['port'] + ''}
              onChangeText={(e) => this.setValue('bulb', 'port')}
            />
          </Card>
          <Card header={Header2} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Port'
              placeholder='Drag penalty'
              value={data['thrust']['port'] + ''}
              onChangeText={(e) => this.setValue('thrust', 'port')}
            />
            <Input
              label='Stbd'
              placeholder='Drag penalty'
              value={data['thrust']['port'] + ''}
              onChangeText={(e) => this.setValue('thrust', 'port')}
            />
          </Card>
          <Card header={Header3} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Port'
              placeholder='Drag penalty'
              value={data['forward']['port'] + ''}
              onChangeText={(e) => this.setValue('forward', 'port')}
            />
            <Input
              label='Stbd'
              placeholder='Drag penalty'
              value={data['forward']['port'] + ''}
              onChangeText={(e) => this.setValue('forward', 'port')}
            />
          </Card>
          <Card header={Header4} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Port'
              placeholder='Drag penalty'
              value={data['shoulders']['port'] + ''}
              onChangeText={(e) => this.setValue('shoulders', 'port')}
            />
            <Input
              label='Stbd'
              placeholder='Drag penalty'
              value={data['shoulders']['port'] + ''}
              onChangeText={(e) => this.setValue('shoulders', 'port')}
            />
          </Card>
          <Card header={Header5} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Port'
              placeholder='Drag penalty'
              value={data['side1']['port'] + ''}
              onChangeText={(e) => this.setValue('side1', 'port')}
            />
            <Input
              label='Stbd'
              placeholder='Drag penalty'
              value={data['side1']['port'] + ''}
              onChangeText={(e) => this.setValue('side1', 'port')}
            />
          </Card>
          <Card header={Header6} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Port'
              placeholder='Drag penalty'
              value={data['side2']['port'] + ''}
              onChangeText={(e) => this.setValue('side2', 'port')}
            />
            <Input
              label='Stbd'
              placeholder='Drag penalty'
              value={data['side2']['port'] + ''}
              onChangeText={(e) => this.setValue('side2', 'port')}
            />
          </Card>
          <Card header={Header7} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Port'
              placeholder='Drag penalty'
              value={data['side3']['port'] + ''}
              onChangeText={(e) => this.setValue('side3', 'port')}
            />
            <Input
              label='Stbd'
              placeholder='Drag penalty'
              value={data['side3']['port'] + ''}
              onChangeText={(e) => this.setValue('side3', 'port')}
            />
          </Card>
          <Card header={Header8} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Port'
              placeholder='Drag penalty'
              value={data['aft']['port'] + ''}
              onChangeText={(e) => this.setValue('aft', 'port')}
            />
            <Input
              label='Stbd'
              placeholder='Drag penalty'
              value={data['aft']['port'] + ''}
              onChangeText={(e) => this.setValue('aft', 'port')}
            />
          </Card>
          <Card header={Header9} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Port'
              placeholder='Drag penalty'
              value={data['stern']['port'] + ''}
              onChangeText={(e) => this.setValue('stern', 'port')}
            />
            <Input
              label='Stbd'
              placeholder='Drag penalty'
              value={data['stern']['port'] + ''}
              onChangeText={(e) => this.setValue('stern', 'port')}
            />
          </Card>
          <Card header={Header10} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Port'
              placeholder='Drag penalty'
              value={data['flats']['port'] + ''}
              onChangeText={(e) => this.setValue('flats', 'port')}
            />
            <Input
              label='Stbd'
              placeholder='Drag penalty'
              value={data['flats']['port'] + ''}
              onChangeText={(e) => this.setValue('flats', 'port')}
            />
          </Card>
          <View style={{height: 250, width: wp('80%')}} />
        </ScrollView>
      </View>
    )
  }
}

DragPenalty.navigationOptions = {
  title: 'Summary of Drag Penalty',
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    alignItems: 'center',
  },
  indicator: {
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: 'white',
      flex: 1,
      height: hp('100%'),
      width: wp('100%')
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 4,
    marginTop: 10
  },
});

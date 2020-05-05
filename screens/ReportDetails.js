import React from 'react';
import { StyleSheet, View, SafeAreaView, ActivityIndicator, NetInfo, TouchableOpacity,ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Firebase from "../components/Firebase";
import { Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { FloatingAction } from "react-native-floating-action";
import {
  Card,
  CardHeader,
  Text,
  Input,
  Select,
  SelectItem
} from '@ui-kitten/components';
import {inject, observer} from "mobx-react";

const actions = [
  {
    text: "Preview",
    icon: require("./images/preview.png"),
    name: "preview",
    position: 2
  },
  {
    text: "Clear All",
    icon: require("./images/cross.png"),
    name: "clear",
    position: 1
  }
];

const options = [
  {
    key: 'rcl',
    color: 'black',
    text: 'Royal Caribbean',
    value: 'Royal Caribbean',
  },
  {
    key: 'pc',
    color: 'black',
    text: 'Princess Cruise',
    value: 'Princess Cruise',
  },
  {
    key: 'ha',
    color: 'black',
    text: 'Holland America',
    value: 'Holland America',
  },
  {
    key: 'cc',
    color: 'black',
    text: 'Carnival Cruise',
    value: 'Carnival Cruise',
  },
  {
    key: 'celeb',
    color: 'black',
    text: 'Celebrity Cruises',
    value: 'Celebrity Cruises',
  },
  {
    key: 'ida',
    color: 'black',
    text: 'Ida cruises',
    value: 'Ida cruises',
  },
  {
    key: 'costa',
    color: 'black',
    text: 'Costa Cruises',
    value: 'Costa Cruises',
  },
  {
    key: 'p',
    color: 'black',
    text: 'Pullmantur Cruises',
    value: 'Pullmantur Cruises',
  },
  {
    key: 'az',
    color: 'black',
    text: 'Azmara Cruises',
    value: 'Azmara Cruises',
  },
];

@inject("userStore", 'dryDockStore')
@observer
export default class ReportDetails extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null,
      company: this.props.dryDockStore.offlineReportData.company,
      shipName: this.props.dryDockStore.offlineReportData.shipName,
      reportType: '',
      port: this.props.dryDockStore.offlineReportData.port,
      country: this.props.dryDockStore.offlineReportData.cityCountry,
      preparedFor: this.props.dryDockStore.offlineReportData.slides[0].preparedFor,
      cover: this.props.dryDockStore.offlineReportData.cover,
      logo: '',
    }
  }


  async pickCoverImage(slide) {
    const result = await ImagePicker.launchImageLibraryAsync();
    const { uri } = result;
    this.setState({cover: uri})
  }

  async pickLogo(slide) {
    const result = await ImagePicker.launchImageLibraryAsync();
    const { uri } = result;
    this.setState({logo: uri});
  }

  componentWillUnmount(){
    this.saveReport();
  }

  _renderCover(){
    const {cover} = this.state;
    if(!cover || cover === ''){
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginTop: 6}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15}}>
            <TouchableOpacity onPress={() => this.pickCoverImage()}>
              <View style={{marginHorizontal: 20}}>
                <Ionicons name={'ios-image'} size={50} style={{marginBottom: 15}}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('TakePicture', {onGoBack: (uri) => this.setState({cover: uri})})}>
              <View style={{marginHorizontal: 20}}>
                <Ionicons name={'ios-camera'} size={50} style={{marginBottom: 15}}/>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Add Cover Photo</Text>
        </View>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => this.pickCoverImage()}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 15}}>
            <Image source={{uri: cover}} style={{width: wp('30%'), height: wp('30%')}} />
          </View>
        </TouchableOpacity>
      )
    }
  }

  _renderLogo(){
    const {logo} = this.state;
    if(logo === ''){
      return (
        <TouchableOpacity onPress={() => this.pickLogo()}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 45}}>
            <Ionicons name={'ios-add-circle'} size={50} style={{marginBottom: 15, marginBottom: 15}}/>
            <Text style={styles.text}>Add Ship Company Logo</Text>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => this.pickLogo()}>
          <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 45}}>
            <Image source={{uri: logo}} style={{width: wp('30%'), height: wp('30%')}} />
          </View>
        </TouchableOpacity>
      )
    }
  }

  saveReport(){
    this.props.dryDockStore.offlineReportData.shipName = this.state.shipName;
    this.props.dryDockStore.offlineReportData.port = this.state.port;
    this.props.dryDockStore.offlineReportData.cover = this.state.cover;
    this.props.dryDockStore.offlineReportData.cityCountry = this.state.country;
    this.props.dryDockStore.offlineReportData.slides[0].preparedFor = this.state.preparedFor;
    this.props.dryDockStore.offlineReportData.company = this.state.company;
    this.props.dryDockStore.stringify();
  }

  _renderPreparedFor(){
    const {preparedFor} = this.state;
    return preparedFor.map((elem, index) => {
      return(
        <View key={index + ''} style={{flexDirection: 'row', alignItems: 'center'}}>
          <Input
            label={index === 0 ? 'Prepared for' : ''}
            placeholder='Prepared For'
            style={{width: wp('60%')}}
            value={elem}
            onChangeText={(val) => this.setPreparedFor(val, index)}
          />
          <TouchableOpacity onPress={() => this.addPreparedForRow(index, preparedFor.length)}>
            <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 5}}>
              <Ionicons name={index === preparedFor.length - 1 && index >= 1 ? 'ios-close-circle-outline' : 'ios-add-circle'} size={25}/>
            </View>
          </TouchableOpacity>
        </View>
      );
    })
  }

  addPreparedForRow(i, len){
    const {preparedFor} = this.state;
    if(i === len - 1 && i >= 1){
      preparedFor.splice(-1,1);
    } else {
      preparedFor.push('');
    }
    this.setState({preparedFor})
  }

  setPreparedFor(text, i){
    const {preparedFor} = this.state;
    preparedFor[i] = text;
    this.setState({preparedFor})
  }

  render(){
    return(
      <ScrollView containerStyle={styles.root} style={styles.root}>
        <FloatingAction
          actions={actions}
          distanceToEdge={10}
          position="right"
          actionsPaddingTopBottom={3}
          onPressItem={name => {
            console.log(`selected button: ${name}`);
          }}
        />
        {this._renderCover()}
        <Select
          data={options}
          label="Cruise Company Name"
          selectedOption={this.state.company}
          onSelect={(value) => this.setState({company: value})}
        >
        </Select>
        <Input
          label="Ship Name"
          placeholder='Ship Name'
          value={this.state.shipName}
          onChangeText={(val) => this.setState({shipName: val})}
        />
        <Input
          label='Port / Shipyard'
          placeholder='Port / Shipyard'
          value={this.state.port}
          onChangeText={(val) => this.setState({port: val})}
        />
        <Input
          label='City, Country'
          placeholder='City, Country'
          value={this.state.country}
          onChangeText={(val) => this.setState({country: val})}
        />
        {this._renderPreparedFor()}
      </ScrollView>
    )
  }

}


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    floatButton: {

    },
    root: {
      paddingHorizontal: 10,
      backgroundColor: 'white',
      width: wp('100%'),
      flex: 1,
      paddingHorizontal: 5,
      flexGrow: 1
    },
    button: {
      width: wp('50%'),
      height: wp('15%'),
      shadowOpacity: 0.2,
      borderRadius: 7,
      backgroundColor: '#4d91ff',
      shadowColor: 'black',
      shadowOpacity: 1,
      elevation: 3,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30
    },
    text: {
      fontSize: 30,
      fontWeight: 'bold',
      lineHeight: 32
    },
});

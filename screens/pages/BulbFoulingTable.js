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

import * as ImagePicker from 'expo-image-picker';
import ImageUpload from '../../components/ImageUpload'


const ImgHeader1 = () => (
  <CardHeader
    title='Port'
  />
);

const ImgHeader2 = () => (
  <CardHeader
    title='Stbd'
  />
);

const Header1 = () => (
  <CardHeader
    title='Port - Row 1'
  />
);

const Header2 = () => (
  <CardHeader
    title='Port - Row 2'
  />
);

const Header3 = () => (
  <CardHeader
    title='Port - Row 3'
  />
);

const Header4 = () => (
  <CardHeader
    title='Port - Row 4'
  />
);

const Header5 = () => (
  <CardHeader
    title='Port - Row 5'
  />
);

const Header6 = () => (
  <CardHeader
    title='Stbd - Row 1'
  />
);

const Header7 = () => (
  <CardHeader
    title='Stbd - Row 2'
  />
);

const Header8 = () => (
  <CardHeader
    title='Stbd - Row 3'
  />
);

const Header9 = () => (
  <CardHeader
    title='Stbd - Row 4'
  />
);

const Header10 = () => (
  <CardHeader
    title='Stbd - Row 5'
  />
);


@inject('userStore', 'inspectionStore', 'dryDockStore')
@observer
export default class BulbFoulingTable extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: this.props.dryDockStore.offlineReportData.slides[14],
      portImage: this.props.dryDockStore.offlineReportData.slides[14].portImage,
      stbdImage: this.props.dryDockStore.offlineReportData.slides[14].stbdImage,
    }
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    this.props.dryDockStore.stringify()
  }



  setValue(side, row, col){
    var curData = this.state.data;
    curData[side][col][row] = value;
    this.setState({data: curData})
  }

  renderImage(uri){
    console.log(uri)
    return (
      <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
        <Image source={{uri: uri.item}} style={{width: wp('30%'), height: wp('30%')}} />
      </View>
    );
  }

  async pickImage(shipArea) {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (result.cancelled === false) {
      const { uri } = result;
      this.upload(uri, shipArea);
    }
  }

  async upload(uri, shipArea) {
      this.setState({ loading: true });
      try {
          this.id = ImageUpload.uid();
          if(uri != null){
              const set_uri = await ImageUpload.upload(uri);
              switch (shipArea) {
                case 'port':
                  this.setState({portImage: set_uri});
                  break;
                case 'stbd':
                  this.setState({stbdImage: set_uri});
                  break;
                default:
                  console.log('default')
              }
          } else {
              this.setState({ loading: false });
          }
      } catch (e) {
          const message = serializeException(e);
          Alert.alert(message);
          this.setState({ loading: false });
      }
  }

  renderPortButton(){
    if(this.state.portImage !== ''){
      return (
        <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Image source={{uri: this.state.portImage}} style={{width: wp('30%'), height: wp('30%')}} />
        </View>
      )
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Ionicons name={'ios-add-circle'} size={50} style={{marginBottom: 15}}/>
          <Text style={styles.text} category='h3'>Add Image</Text>
        </View>
      )
    }
  }

  renderStbdButton(){
    if(this.state.stbdImage !== ''){
      return (
        <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Image source={{uri: this.state.stbdImage}} style={{width: wp('30%'), height: wp('30%')}} />
        </View>
      )
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Ionicons name={'ios-add-circle'} size={50} style={{marginBottom: 15}}/>
          <Text style={styles.text} category='h3'>Add Image</Text>
        </View>
      )
    }
  }


  render(){
    const data = this.state.data;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card header={ImgHeader1} style={{ width: wp('90%'), marginBottom: 7}}>
            <TouchableOpacity onPress={() => this.pickImage('port')}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                  this.renderPortButton()
                }
              </View>
            </TouchableOpacity>
          </Card>
          <Card header={Header1} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Location'
              placeholder='Example: BB_A'
              value={data.port.location[0] + ''}
              onChangeText={(e) => this.setValue('port', 0, 'location')}
            />
            <Input
              label='Coating'
              placeholder='Example: Jotun SPC'
              value={data.port.coating[0] + ''}
              onChangeText={(e) => this.setValue('port', 0, 'coating')}
            />
            <Input
              label='% Lt BioF'
              value={data.port.ltBioF[0] + ''}
              onChangeText={(e) => this.setValue('port', 0, 'ltBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF[0] + ''}
              onChangeText={(e) => this.setValue('port', 0, 'dragF')}
            />
            <Input
              label='% Hvy BioF'
              value={data.port.hvyBioF[0] + ''}
              onChangeText={(e) => this.setValue('port', 0, 'hvyBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF2[0] + ''}
              onChangeText={(e) => this.setValue('port', 0, 'dragF2')}
            />
            <Input
              label='% Ulva'
              value={data.port.ulva[0] + ''}
              onChangeText={(e) => this.setValue('port', 0, 'ulva')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF3[0] + ''}
              onChangeText={(e) => this.setValue('port', 0, 'dragF3')}
            />
            <Input
              label='Total'
              value={data.port.total[0] + ''}
              onChangeText={(e) => this.setValue('port', 0, 'total')}
            />
            <Input
              label='Area'
              placeholder='Example: Jotun SPC'
              value={data.port.area[0] + ''}
              onChangeText={(e) => this.setValue('port', 0, 'area')}
            />
          </Card>
          <Card header={Header2} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Location'
              placeholder='Example: BB_A'
              value={data.port.location[0] + ''}
              onChangeText={(e) => this.setValue('port', 1, 'location')}
            />
            <Input
              label='Coating'
              placeholder='Example: Jotun SPC'
              value={data.port.coating[0] + ''}
              onChangeText={(e) => this.setValue('port', 1, 'coating')}
            />
            <Input
              label='% Lt BioF'
              value={data.port.ltBioF[0] + ''}
              onChangeText={(e) => this.setValue('port', 1, 'ltBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF[0] + ''}
              onChangeText={(e) => this.setValue('port', 1, 'dragF')}
            />
            <Input
              label='% Hvy BioF'
              value={data.port.hvyBioF[0] + ''}
              onChangeText={(e) => this.setValue('port', 1, 'hvyBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF2[0] + ''}
              onChangeText={(e) => this.setValue('port', 1, 'dragF2')}
            />
            <Input
              label='% Ulva'
              value={data.port.ulva[0] + ''}
              onChangeText={(e) => this.setValue('port', 1, 'ulva')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF3[0] + ''}
              onChangeText={(e) => this.setValue('port', 1, 'dragF3')}
            />
            <Input
              label='Total'
              value={data.port.total[0] + ''}
              onChangeText={(e) => this.setValue('port', 1, 'total')}
            />
            <Input
              label='Area'
              placeholder='Example: Jotun SPC'
              value={data.port.area[0] + ''}
              onChangeText={(e) => this.setValue('port', 1, 'area')}
            />
          </Card>
          <Card header={Header3} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Location'
              placeholder='Example: BB_A'
              value={data.port.location[0] + ''}
              onChangeText={(e) => this.setValue('port', 2, 'location')}
            />
            <Input
              label='Coating'
              placeholder='Example: Jotun SPC'
              value={data.port.coating[0] + ''}
              onChangeText={(e) => this.setValue('port', 2, 'coating')}
            />
            <Input
              label='% Lt BioF'
              value={data.port.ltBioF[0] + ''}
              onChangeText={(e) => this.setValue('port', 2, 'ltBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF[0] + ''}
              onChangeText={(e) => this.setValue('port', 2, 'dragF')}
            />
            <Input
              label='% Hvy BioF'
              value={data.port.hvyBioF[0] + ''}
              onChangeText={(e) => this.setValue('port', 2, 'hvyBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF2[0] + ''}
              onChangeText={(e) => this.setValue('port', 2, 'dragF2')}
            />
            <Input
              label='% Ulva'
              value={data.port.ulva[0] + ''}
              onChangeText={(e) => this.setValue('port', 2, 'ulva')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF3[0] + ''}
              onChangeText={(e) => this.setValue('port', 2, 'dragF3')}
            />
            <Input
              label='Total'
              value={data.port.total[0] + ''}
              onChangeText={(e) => this.setValue('port', 2, 'total')}
            />
            <Input
              label='Area'
              placeholder='Example: Jotun SPC'
              value={data.port.area[0] + ''}
              onChangeText={(e) => this.setValue('port', 2, 'area')}
            />
          </Card>
          <Card header={Header4} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Location'
              placeholder='Example: BB_A'
              value={data.port.location[0] + ''}
              onChangeText={(e) => this.setValue('port', 3, 'location')}
            />
            <Input
              label='Coating'
              placeholder='Example: Jotun SPC'
              value={data.port.coating[0] + ''}
              onChangeText={(e) => this.setValue('port', 3, 'coating')}
            />
            <Input
              label='% Lt BioF'
              value={data.port.ltBioF[0] + ''}
              onChangeText={(e) => this.setValue('port', 3, 'ltBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF[0] + ''}
              onChangeText={(e) => this.setValue('port', 3, 'dragF')}
            />
            <Input
              label='% Hvy BioF'
              value={data.port.hvyBioF[0] + ''}
              onChangeText={(e) => this.setValue('port', 3, 'hvyBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF2[0] + ''}
              onChangeText={(e) => this.setValue('port', 3, 'dragF2')}
            />
            <Input
              label='% Ulva'
              value={data.port.ulva[0] + ''}
              onChangeText={(e) => this.setValue('port', 3, 'ulva')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF3[0] + ''}
              onChangeText={(e) => this.setValue('port', 3, 'dragF3')}
            />
            <Input
              label='Total'
              value={data.port.total[0] + ''}
              onChangeText={(e) => this.setValue('port', 3, 'total')}
            />
            <Input
              label='Area'
              placeholder='Example: Jotun SPC'
              value={data.port.area[0] + ''}
              onChangeText={(e) => this.setValue('port', 3, 'area')}
            />
          </Card>
          <Card header={Header5} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Location'
              placeholder='Example: BB_A'
              value={data.port.location[0] + ''}
              onChangeText={(e) => this.setValue('port', 4, 'location')}
            />
            <Input
              label='Coating'
              placeholder='Example: Jotun SPC'
              value={data.port.coating[0] + ''}
              onChangeText={(e) => this.setValue('port', 4, 'coating')}
            />
            <Input
              label='% Lt BioF'
              value={data.port.ltBioF[0] + ''}
              onChangeText={(e) => this.setValue('port', 4, 'ltBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF[0] + ''}
              onChangeText={(e) => this.setValue('port', 4, 'dragF')}
            />
            <Input
              label='% Hvy BioF'
              value={data.port.hvyBioF[0] + ''}
              onChangeText={(e) => this.setValue('port', 4, 'hvyBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF2[0] + ''}
              onChangeText={(e) => this.setValue('port', 4, 'dragF2')}
            />
            <Input
              label='% Ulva'
              value={data.port.ulva[0] + ''}
              onChangeText={(e) => this.setValue('port', 4, 'ulva')}
            />
            <Input
              label='Drag Factor'
              value={data.port.dragF3[0] + ''}
              onChangeText={(e) => this.setValue('port', 4, 'dragF3')}
            />
            <Input
              label='Total'
              value={data.port.total[0] + ''}
              onChangeText={(e) => this.setValue('port', 4, 'total')}
            />
            <Input
              label='Area'
              placeholder='Example: Jotun SPC'
              value={data.port.area[0] + ''}
              onChangeText={(e) => this.setValue('port', 4, 'area')}
            />
          </Card>
          <Card header={ImgHeader2} style={{ width: wp('90%'), marginBottom: 7}}>
            <TouchableOpacity onPress={() => this.pickImage('stbd')}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                  this.renderStbdButton()
                }
              </View>
            </TouchableOpacity>
          </Card>
          <Card header={Header6} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Location'
              placeholder='Example: BB_A'
              value={data.stbd.location[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 0, 'location')}
            />
            <Input
              label='Coating'
              placeholder='Example: Jotun SPC'
              value={data.stbd.coating[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 0, 'coating')}
            />
            <Input
              label='% Lt BioF'
              value={data.stbd.ltBioF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 0, 'ltBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 0, 'dragF')}
            />
            <Input
              label='% Hvy BioF'
              value={data.stbd.hvyBioF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 0, 'hvyBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF2[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 0, 'dragF2')}
            />
            <Input
              label='% Ulva'
              value={data.stbd.ulva[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 0, 'ulva')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF3[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 0, 'dragF3')}
            />
            <Input
              label='Total'
              value={data.stbd.total[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 0, 'total')}
            />
            <Input
              label='Area'
              placeholder='Example: Jotun SPC'
              value={data.stbd.area[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 0, 'area')}
            />
          </Card>
          <Card header={Header7} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Location'
              placeholder='Example: BB_A'
              value={data.stbd.location[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 1, 'location')}
            />
            <Input
              label='Coating'
              placeholder='Example: Jotun SPC'
              value={data.stbd.coating[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 1, 'coating')}
            />
            <Input
              label='% Lt BioF'
              value={data.stbd.ltBioF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 1, 'ltBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 1, 'dragF')}
            />
            <Input
              label='% Hvy BioF'
              value={data.stbd.hvyBioF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 1, 'hvyBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF2[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 1, 'dragF2')}
            />
            <Input
              label='% Ulva'
              value={data.stbd.ulva[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 1, 'ulva')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF3[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 1, 'dragF3')}
            />
            <Input
              label='Total'
              value={data.stbd.total[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 1, 'total')}
            />
            <Input
              label='Area'
              placeholder='Example: Jotun SPC'
              value={data.stbd.area[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 1, 'area')}
            />
          </Card>
          <Card header={Header8} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Location'
              placeholder='Example: BB_A'
              value={data.stbd.location[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 2, 'location')}
            />
            <Input
              label='Coating'
              placeholder='Example: Jotun SPC'
              value={data.stbd.coating[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 2, 'coating')}
            />
            <Input
              label='% Lt BioF'
              value={data.stbd.ltBioF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 2, 'ltBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 2, 'dragF')}
            />
            <Input
              label='% Hvy BioF'
              value={data.stbd.hvyBioF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 2, 'hvyBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF2[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 2, 'dragF2')}
            />
            <Input
              label='% Ulva'
              value={data.stbd.ulva[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 2, 'ulva')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF3[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 2, 'dragF3')}
            />
            <Input
              label='Total'
              value={data.stbd.total[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 2, 'total')}
            />
            <Input
              label='Area'
              placeholder='Example: Jotun SPC'
              value={data.stbd.area[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 2, 'area')}
            />
          </Card>
          <Card header={Header9} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Location'
              placeholder='Example: BB_A'
              value={data.stbd.location[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 3, 'location')}
            />
            <Input
              label='Coating'
              placeholder='Example: Jotun SPC'
              value={data.stbd.coating[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 3, 'coating')}
            />
            <Input
              label='% Lt BioF'
              value={data.stbd.ltBioF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 3, 'ltBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 3, 'dragF')}
            />
            <Input
              label='% Hvy BioF'
              value={data.stbd.hvyBioF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 3, 'hvyBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF2[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 3, 'dragF2')}
            />
            <Input
              label='% Ulva'
              value={data.stbd.ulva[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 3, 'ulva')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF3[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 3, 'dragF3')}
            />
            <Input
              label='Total'
              value={data.stbd.total[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 3, 'total')}
            />
            <Input
              label='Area'
              placeholder='Example: Jotun SPC'
              value={data.stbd.area[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 3, 'area')}
            />
          </Card>
          <Card header={Header10} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Location'
              placeholder='Example: BB_A'
              value={data.stbd.location[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 4, 'location')}
            />
            <Input
              label='Coating'
              placeholder='Example: Jotun SPC'
              value={data.stbd.coating[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 4, 'coating')}
            />
            <Input
              label='% Lt BioF'
              value={data.stbd.ltBioF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 4, 'ltBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 4, 'dragF')}
            />
            <Input
              label='% Hvy BioF'
              value={data.stbd.hvyBioF[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 4, 'hvyBioF')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF2[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 4, 'dragF2')}
            />
            <Input
              label='% Ulva'
              value={data.stbd.ulva[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 4, 'ulva')}
            />
            <Input
              label='Drag Factor'
              value={data.stbd.dragF3[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 4, 'dragF3')}
            />
            <Input
              label='Total'
              value={data.stbd.total[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 4, 'total')}
            />
            <Input
              label='Area'
              placeholder='Example: Jotun SPC'
              value={data.stbd.area[0] + ''}
              onChangeText={(e) => this.setValue('stbd', 4, 'area')}
            />
          </Card>
          <View style={{height: 250, width: wp('80%')}} />
        </ScrollView>
      </View>
    )
  }
}

BulbFoulingTable.navigationOptions = {
  title: 'Fouling Condition Analysis',
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

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


const Header1 = () => (
  <CardHeader
    title='Note'
  />
);

const Header2 = () => (
  <CardHeader
    title='Bulbous Bow'
  />
);

const Header3 = () => (
  <CardHeader
    title='Bow Thruster Area'
  />
);

const Header4 = () => (
  <CardHeader
    title='Forward Side'
  />
);

const Header5 = () => (
  <CardHeader
    title='Shoulders'
  />
);

const Header6 = () => (
  <CardHeader
    title='Side 1'
  />
);

const Header7 = () => (
  <CardHeader
    title='Side 2'
  />
);

const Header8 = () => (
  <CardHeader
    title='Side 3'
  />
);

const Header9 = () => (
  <CardHeader
    title='Aft'
  />
);

const Header10 = () => (
  <CardHeader
    title='Stern'
  />
);


@inject('userStore', 'inspectionStore', 'dryDockStore')
@observer
export default class ImagesNoteSlide5 extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      bulb: this.props.dryDockStore.offlineReportData.slides[4].bulb,
      thrust: this.props.dryDockStore.offlineReportData.slides[4].thrust,
      forward: this.props.dryDockStore.offlineReportData.slides[4].forward,
      shoulders: this.props.dryDockStore.offlineReportData.slides[4].shoulders,
      side1: this.props.dryDockStore.offlineReportData.slides[4].side1,
      side2: this.props.dryDockStore.offlineReportData.slides[4].side2,
      side3: this.props.dryDockStore.offlineReportData.slides[4].side3,
      aft: this.props.dryDockStore.offlineReportData.slides[4].aft,
      stern: this.props.dryDockStore.offlineReportData.slides[4].stern,
      note: this.props.dryDockStore.offlineReportData.slides[4].note,
    }
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    this.props.dryDockStore.offlineReportData.slides[4].bulb = this.state.bulb;
    this.props.dryDockStore.offlineReportData.slides[4].thrust = this.state.thrust;
    this.props.dryDockStore.offlineReportData.slides[4].forward = this.state.forward;
    this.props.dryDockStore.offlineReportData.slides[4].shoulders = this.state.shoulders;
    this.props.dryDockStore.offlineReportData.slides[4].side1 = this.state.side1;
    this.props.dryDockStore.offlineReportData.slides[4].side2 = this.state.side2;
    this.props.dryDockStore.offlineReportData.slides[4].side3 = this.state.side3;
    this.props.dryDockStore.offlineReportData.slides[4].aft = this.state.aft;
    this.props.dryDockStore.offlineReportData.slides[4].stern = this.state.stern;
    this.props.dryDockStore.offlineReportData.slides[4].note = this.state.note;
    this.props.dryDockStore.stringify()
  }

  setNote(value){
    this.setState({note: value});
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
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });
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
                case 'bulb':
                  this.setState({bulb: set_uri});
                  break;
                case 'thrust':
                  this.setState({thrust: set_uri});
                  break;
                case 'forward':
                  this.setState({forward: set_uri});
                  break;
                case 'shoulders':
                  this.setState({shoulders: set_uri});
                  break;
                case 'side1':
                  this.setState({side1: set_uri});
                  break;
                case 'side2':
                  this.setState({side2: set_uri});
                  break;
                case 'side3':
                  this.setState({side3: set_uri});
                  break;
                case 'aft':
                  this.setState({aft: set_uri});
                  break;
                case 'stern':
                  this.setState({stern: set_uri});
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

  renderBulbButton(){
    if(this.state.bulb !== ''){
      return (
        <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Image source={{uri: this.state.bulb}} style={{width: wp('30%'), height: wp('30%')}} />
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

  renderThrustButton(){
    if(this.state.thrust !== ''){
      return (
        <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Image source={{uri: this.state.thrust}} style={{width: wp('30%'), height: wp('30%')}} />
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

  renderForwardButton(){
    if(this.state.forward !== ''){
      return (
        <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Image source={{uri: this.state.forward}} style={{width: wp('30%'), height: wp('30%')}} />
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

  renderShouldersButton(){
    if(this.state.shoulders !== ''){
      return (
        <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Image source={{uri: this.state.shoulders}} style={{width: wp('30%'), height: wp('30%')}} />
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

  renderSide1Button(){
    if(this.state.side1 !== ''){
      return (
        <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Image source={{uri: this.state.side1}} style={{width: wp('30%'), height: wp('30%')}} />
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

  renderSide2Button(){
    if(this.state.side2 !== ''){
      return (
        <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Image source={{uri: this.state.side2}} style={{width: wp('30%'), height: wp('30%')}} />
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

  renderSide3Button(){
    if(this.state.side3 !== ''){
      return (
        <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Image source={{uri: this.state.side3}} style={{width: wp('30%'), height: wp('30%')}} />
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

  renderAftButton(){
    if(this.state.aft !== ''){
      return (
        <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Image source={{uri: this.state.aft}} style={{width: wp('30%'), height: wp('30%')}} />
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

  renderSternButton(){
    if(this.state.stern !== ''){
      return (
        <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Image source={{uri: this.state.stern}} style={{width: wp('30%'), height: wp('30%')}} />
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

    return (
      <View style={styles.container}>
        <ScrollView>
          <Card style={{ width: wp('90%'), marginBottom: 7}}>
              <Input
                placeholder='Start typing...'
                label='Note'
                value={this.state.note}
                onChangeText={(e) => this.setNote(e, 0)}
                numberOfLines={5}
                multiline = {true}
                textStyle={{ height: 80, textAlignVertical: "top" }}
              />
          </Card>
          <Card header={Header2} style={{ width: wp('90%'), marginBottom: 7}}>
            <TouchableOpacity onPress={() => this.pickImage('bulb')}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                  this.renderBulbButton()
                }
              </View>
            </TouchableOpacity>
          </Card>
          <Card header={Header3} style={{ width: wp('90%'), marginBottom: 7}}>
            <TouchableOpacity onPress={() => this.pickImage('thrust')}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                  this.renderThrustButton()
                }
              </View>
            </TouchableOpacity>
          </Card>
          <Card header={Header4} style={{ width: wp('90%'), marginBottom: 7}}>
            <TouchableOpacity onPress={() => this.pickImage('forward')}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                  this.renderForwardButton()
                }
              </View>
            </TouchableOpacity>
          </Card>
          <Card header={Header5} style={{ width: wp('90%'), marginBottom: 7}}>
            <TouchableOpacity onPress={() => this.pickImage('shoulders')}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                  this.renderShouldersButton()
                }
              </View>
            </TouchableOpacity>
          </Card>
          <Card header={Header6} style={{ width: wp('90%'), marginBottom: 7}}>
            <TouchableOpacity onPress={() => this.pickImage('side1')}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                  this.renderSide1Button()
                }
              </View>
            </TouchableOpacity>
          </Card>
          <Card header={Header7} style={{ width: wp('90%'), marginBottom: 7}}>
            <TouchableOpacity onPress={() => this.pickImage('side2')}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                  this.renderSide2Button()
                }
              </View>
            </TouchableOpacity>
          </Card>
          <Card header={Header8} style={{ width: wp('90%'), marginBottom: 7}}>
            <TouchableOpacity onPress={() => this.pickImage('side3')}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                  this.renderSide3Button()
                }
              </View>
            </TouchableOpacity>
          </Card>
          <Card header={Header9} style={{ width: wp('90%'), marginBottom: 7}}>
            <TouchableOpacity onPress={() => this.pickImage('aft')}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                  this.renderAftButton()
                }
              </View>
            </TouchableOpacity>
          </Card>
          <Card header={Header10} style={{ width: wp('90%'), marginBottom: 7}}>
            <TouchableOpacity onPress={() => this.pickImage('stern')}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {
                  this.renderSternButton()
                }
              </View>
            </TouchableOpacity>
          </Card>
        </ScrollView>
      </View>
    )
  }
}

ImagesNoteSlide5.navigationOptions = {
  title: 'In Docking Fouling Condition',
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
  text: {
    marginTop: 5
  }
});

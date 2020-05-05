import React from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ProgressBarAndroid,
  ActivityIndicator,
  FlatList
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
import * as Permissions from 'expo-permissions';

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
export default class ImagesAndNotes extends React.Component {

  constructor(props){
    super(props);
    const index = props.navigation.getParam('index', 25);
    const slideData = props.dryDockStore.offlineReportData.slides[index];
    this.state = {
      images: slideData.images,
      note: slideData.note,
      index
    }
  }

  componentDidMount(){
    //this.props.navigation.addListener('willFocus', this.tookPicture)
  }


  componentWillUnmount(){
    this.props.dryDockStore.offlineReportData.slides[this.state.index].images = this.state.images;
    this.props.dryDockStore.offlineReportData.slides[this.state.index].note = this.state.note;
    this.props.dryDockStore.stringify()
  }

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  async pickImage(slide) {
    await this.askPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync();
    if (result.cancelled === false) {
      const { uri } = result;
      this.upload(uri, slide);
    }
  }

  async upload(uri, slide) {
      this.setState({ loading: true });
      try {
          if(uri != null){
              const set_uri = await ImageUpload.upload(uri);
              var images = this.state.images;
              images.push(set_uri);
              this.setState({images});
          }
      } catch (e) {
          // const message = serializeException(e);
          console.log(e);
          Alert.alert(e);
          this.setState({ loading: false });
      }
  }

  renderImage(uri){
    return (
      <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
        <Image source={{uri: uri.item}} style={{width: wp('30%'), height: wp('30%')}} />
      </View>
    );
  }

  setNote(value){
    this.setState({note: value});
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
          <View>
            <FlatList data={this.state.images} extraData={this.state} renderItem={(uri) => this.renderImage(uri)} numColumns={3} />
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 15, marginTop: 6}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 15}}>
                <TouchableOpacity onPress={() => this.pickImage()}>
                  <View style={{marginHorizontal: 20}}>
                    <Ionicons name={'ios-image'} size={50} style={{marginBottom: 15}}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('TakePicture', { onGoBack: (uri) => this.upload(uri) })}>
                  <View style={{marginHorizontal: 20}}>
                    <Ionicons name={'ios-camera'} size={50} style={{marginBottom: 15}}/>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

ImagesAndNotes.navigationOptions = {
  title: 'Images and note',
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

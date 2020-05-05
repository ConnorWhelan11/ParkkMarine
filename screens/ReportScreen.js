import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Picker
} from 'react-native'
import Header from '../components/Header'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import Swiper from 'react-native-swiper'

export default class ReportScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      images: [],
      images2: [],
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      company: 'r'
    }
  }

  renderImage(uri){
    console.log(uri)
    return (
      <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
        <Image source={{uri: uri.item}} style={{width: wp('30%'), height: wp('30%')}} />
      </View>
    )
  }

  async pickImage(){
    const imageData = await ImagePicker.launchImageLibraryAsync({});
    const images = this.state.images;
    images.push(imageData.uri);
    this.setState({images})
  }

  async pickImage2(){
    const imageData = await ImagePicker.launchImageLibraryAsync({});
    const images = this.state.images2;
    images.push(imageData.uri);
    this.setState({images2: images})
  }

  render() {
    return (
        <Swiper style={styles.wrapper} loop={false}>
          <View style={styles.slide}>
            <Header title='Slide 1' onPress={() => this.props.navigation.navigate('Main')} backIcon={true} />
            <View style={styles.slideContent}>
              <Text style={styles.text}>Prepared by:</Text>
              <TextInput
                style={{ height: 40, width: wp('50%'), borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingHorizontal: 5, marginTop: 5, marginBottom: 15 }}
                onChangeText={text => this.setState({ text1: text })}
                value={this.state.text1}
              />
              <Text style={styles.text}>Prepared for:</Text>
              <Picker
                selectedValue={this.state.company}
                style={{height: 60, width: wp('50%'), marginTop: 5}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({company: itemValue})
                }>
                <Picker.Item label="Royal Carribean" value="r" />
                <Picker.Item label="Carnival Cruise" value="cc" />
                <Picker.Item label="Celebrity" value="c" />
                <Picker.Item label="Norwegian" value="n" />
              </Picker>

            </View>
          </View>
          <View style={styles.slide}>
            <Header title='Slide 2' onPress={() => this.props.navigation.navigate('Main')} backIcon={true} />
            <View style={styles.slideContent}>
              <TextInput
                style={{ height: hp('70%'), width: wp('90%'), borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingHorizontal: 5, }}
                onChangeText={text => this.setState({ text2: text })}
                value={this.state.text2}
                multiline
                numberOfLines={50}
              />
            </View>
          </View>
          <View style={styles.slide}>
            <Header title='Slide 3' onPress={() => this.props.navigation.navigate('Main')} backIcon={true} />
            <FlatList data={this.state.images} extraData={this.state} renderItem={(uri) => this.renderImage(uri)} numColumns={3} />
            <View style={styles.slideContent}>
              <TouchableOpacity onPress={() => this.pickImage()}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name={'ios-add-circle'} size={50} style={{marginBottom: 15}}/>
                  <Text style={styles.text}>Add Image</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.slide}>
            <Header title='Slide 3' onPress={() => this.props.navigation.navigate('Main')} backIcon={true} />
            <FlatList data={this.state.images2} extraData={this.state} renderItem={(uri) => this.renderImage(uri)} numColumns={3} />
            <View style={styles.slideContent}>
              <TouchableOpacity onPress={() => this.pickImage2()}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name={'ios-add-circle'} size={50} style={{marginBottom: 15}}/>
                  <Text style={styles.text}>Add Image</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Swiper>
    )
  }
}

ReportScreen.navigationOptions = {
  title: 'Report',
};



const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    backgroundColor: 'white'
  },
  slideContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  imageButton:{
    justifyContent: 'center',
    alignItems: 'center',
  }
})

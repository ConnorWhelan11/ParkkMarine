import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Picker,
  ActivityIndicator
} from 'react-native'
import Header from '../components/Header'
import ImageUpload from '../components/ImageUpload'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {inject, observer} from "mobx-react";
import Swiper from 'react-native-swiper'

@inject('inspectionStore', 'userStore')
@observer
export default class InspectionReport extends Component {

  constructor(props){
    super(props);
    this.state = {
      reportData: this.props.inspectionStore.reportData,
      uri: '',
      loading: false,
      reportGenerated: false,
      generating: false,
    }
  }

  async goBack(){
    this.setState({loading: true});
    await this.props.inspectionStore.updateReport(this.state.reportData);
    this.setState({loading: false});
    this.props.navigation.navigate('Main');
  }

  renderImage(uri){
    console.log(uri)
    return (
      <View style={{width: wp('100%') / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
        <Image source={{uri: uri.item}} style={{width: wp('30%'), height: wp('30%')}} />
      </View>
    );
  }

  _lastSlide(){
    const {generating, reportGenerated} = this.state;
    if(generating){
      return <ActivityIndicator size="large" color="#03fc88" />
    } else {
      return (
        <TouchableOpacity onPress={() => this.generateReport()}>
          <View style={styles.button}>
            <Text style={styles.p}>Generate Report</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  async generateReport(){
    this.setState({generating: true});
    await this.props.inspectionStore.generateReport(this.state.reportData);
    setTimeout(() => this.setState({generating: false, reportGenerated: true}), 3000);
  }

  async pickImage(slide) {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (result.cancelled === false) {
      const { uri } = result;
      this.upload(uri, slide);
    }
  }

  async upload(uri, slide) {
      this.setState({ loading: true });
      try {
          this.id = ImageUpload.uid();
          const uid = this.props.userStore.profile.uid;
          if(uri != null){
              const set_uri = await ImageUpload.upload(uri);
              var reportData = this.state.reportData;
              reportData.slides[slide].images.push(set_uri);
              this.setState({reportData});
              this.setState({ loading: false });
          } else {
              this.setState({ loading: false });
          }
      } catch (e) {
          const message = serializeException(e);
          Alert.alert(message);
          this.setState({ loading: false });
      }
  }


  setPreparedFor(item){
    var reportData = this.state.reportData;
    reportData.slides[0].preparedFor = item;
    this.setState({reportData});
  }

  setSlide1Text(text){
    var reportData = this.state.reportData;
    reportData.slides[1].text = text;
    this.setState({reportData});
  }

  setSlide4Text(text){
    var reportData = this.state.reportData;
    reportData.slides[4].text = text;
    this.setState({reportData});
  }

  setSlide5Text(text){
    var reportData = this.state.reportData;
    reportData.slides[5].text = text;
    this.setState({reportData});
  }

  setSlide6Text(text){
    var reportData = this.state.reportData;
    reportData.slides[6].text = text;
    this.setState({reportData});
  }

  setSlide7Text(text){
    var reportData = this.state.reportData;
    reportData.slides[7].text = text;
    this.setState({reportData});
  }

  render() {

    return (
        <Swiper style={styles.wrapper} loop={false}>
          <View style={styles.slide}>
            <Header title='Inspection Report' onPress={() => this.goBack()} backIcon={true} />
            <View style={styles.slideContent}>
              <Text style={styles.text}>Prepared by:</Text>
              <Text style={[styles.p, {marginBottom: 15}]}>{this.props.userStore.profile.name}</Text>
              <Text style={styles.text}>Prepared for:</Text>
              <Picker
                selectedValue={this.state.company}
                style={{height: 60, width: wp('50%'), marginTop: 5}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setPreparedFor(itemValue)
                }>
                <Picker.Item label="Royal Carribean" value="r" />
                <Picker.Item label="Carnival Cruise" value="cc" />
                <Picker.Item label="Celebrity" value="c" />
                <Picker.Item label="Norwegian" value="n" />
              </Picker>
            </View>
          </View>
          <View style={styles.slide}>
            <Header title='Slide 1' onPress={() => this.goBack()} backIcon={true} />
            <View style={styles.slideContent}>
              <TextInput
                style={{ height: hp('70%'), width: wp('90%'), borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingHorizontal: 5, paddingVertical: 7, textAlignVertical: 'top'}}
                onChangeText={text => this.setSlide1Text(text)}
                value={this.state.reportData.slides[1].text}
                multiline
                numberOfLines={50}
              />
            </View>
          </View>
          <View style={styles.slide}>
            <Header title='Slide 2' onPress={() => this.goBack()} backIcon={true} />
            <FlatList data={this.state.reportData.slides[2].images} extraData={this.state} renderItem={(uri) => this.renderImage(uri)} numColumns={3} />
            <View style={styles.slideContent}>
              <TouchableOpacity onPress={() => this.pickImage(2)}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name={'ios-add-circle'} size={50} style={{marginBottom: 15}}/>
                  <Text style={styles.text}>Add Image</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.slide}>
            <Header title='Slide 3' onPress={() => this.goBack()} backIcon={true} />
            <FlatList data={this.state.reportData.slides[3].images} extraData={this.state} renderItem={(uri) => this.renderImage(uri)} numColumns={3} />
            <View style={styles.slideContent}>
              <TouchableOpacity onPress={() => this.pickImage(3)}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name={'ios-add-circle'} size={50} style={{marginBottom: 15}}/>
                  <Text style={styles.text}>Add Image</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.slide}>
            <Header title='Slide 4' onPress={() => this.goBack()} backIcon={true} />
            <View style={styles.slideContent}>
              <TextInput
                style={{ height: hp('70%'), width: wp('90%'), borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingHorizontal: 5, paddingVertical: 7, textAlignVertical: 'top'}}
                onChangeText={text => this.setSlide4Text(text)}
                value={this.state.reportData.slides[4].text}
                multiline
                numberOfLines={50}
              />
            </View>
          </View>
          <View style={styles.slide}>
            <Header title='Slide 5 Images' onPress={() => this.goBack()} backIcon={true} />
            <FlatList data={this.state.reportData.slides[5].images} extraData={this.state} renderItem={(uri) => this.renderImage(uri)} numColumns={3} />
            <View style={styles.slideContent}>
              <TouchableOpacity onPress={() => this.pickImage(5)}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name={'ios-add-circle'} size={50} style={{marginBottom: 15}}/>
                  <Text style={styles.text}>Add Image</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.slide}>
            <Header title='Slide 5 Text' onPress={() => this.goBack()} backIcon={true} />
            <View style={styles.slideContent}>
              <TextInput
                style={{ height: hp('70%'), width: wp('90%'), borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingHorizontal: 5, paddingVertical: 7, textAlignVertical: 'top'}}
                onChangeText={text => this.setSlide5Text(text)}
                value={this.state.reportData.slides[5].text}
                multiline
                numberOfLines={50}
              />
            </View>
          </View>
          <View style={styles.slide}>
            <Header title='Slide 6 Images' onPress={() => this.goBack()} backIcon={true} />
            <FlatList data={this.state.reportData.slides[6].images} extraData={this.state} renderItem={(uri) => this.renderImage(uri)} numColumns={3} />
            <View style={styles.slideContent}>
              <TouchableOpacity onPress={() => this.pickImage(6)}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name={'ios-add-circle'} size={50} style={{marginBottom: 15}}/>
                  <Text style={styles.text}>Add Image</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.slide}>
            <Header title='Slide 6 Text' onPress={() => this.goBack()} backIcon={true} />
            <View style={styles.slideContent}>
              <TextInput
                style={{ height: hp('70%'), width: wp('90%'), borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingHorizontal: 5, paddingVertical: 7, textAlignVertical: 'top'}}
                onChangeText={text => this.setSlide6Text(text)}
                value={this.state.reportData.slides[6].text}
                multiline
                numberOfLines={50}
              />
            </View>
          </View>
          <View style={styles.slide}>
            <Header title='Slide 7 Images' onPress={() => this.goBack()} backIcon={true} />
            <FlatList data={this.state.reportData.slides[7].images} extraData={this.state} renderItem={(uri) => this.renderImage(uri)} numColumns={3} />
            <View style={styles.slideContent}>
              <TouchableOpacity onPress={() => this.pickImage(7)}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Ionicons name={'ios-add-circle'} size={50} style={{marginBottom: 15}}/>
                  <Text style={styles.text}>Add Image</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.slide}>
            <Header title='Slide 7 Text' onPress={() => this.goBack()} backIcon={true} />
            <View style={styles.slideContent}>
              <TextInput
                style={{ height: hp('70%'), width: wp('90%'), borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingHorizontal: 5, paddingVertical: 7, textAlignVertical: 'top'}}
                onChangeText={text => this.setSlide7Text(text)}
                value={this.state.reportData.slides[7].text}
                multiline
                numberOfLines={50}
              />
            </View>
          </View>
          <View style={styles.slide}>
            <Header title='Finish' onPress={() => this.goBack()} backIcon={true} />
            <View style={[styles.slideContent, {justifyContent: 'center'}]}>
              {this._lastSlide()}
            </View>
          </View>
        </Swiper>
    )
  }
}

InspectionReport.navigationOptions = {
  title: 'InspectionReport',
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
  p: {
    fontSize: 18,
  },
  imageButton:{
    justifyContent: 'center',
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
  button: {
    width: wp('60%'),
    height: wp('18%'),
    shadowOpacity: 0.2,
    borderRadius: 20,
    backgroundColor: '#9ce2f7',
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
})

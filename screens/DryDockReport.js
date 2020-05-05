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
  ActivityIndicator,
  Alert,
  ScrollView
} from 'react-native'
import Header from '../components/Header'
import ImageUpload from '../components/ImageUpload'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {inject, observer} from "mobx-react";
import Swiper from 'react-native-swiper';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import {CoatingKeyTable, CoatingSchemeTable} from '../components'


@inject('dryDockStore', 'userStore')
@observer
export default class DryDockReport extends Component {

  constructor(props){
    super(props);
    this.state = {
      reportData: this.props.dryDockStore.offlineReportData,
      uri: '',
      loading: false,
      reportGenerated: false,
      generating: false,
      tableData: [
      ],
      tableHead: ['Color', 'Location', 'Type', 'Name'],
    }
  }

  async goBack(){
    this.setState({loading: true});
    this.setState({loading: false});
    this.props.navigation.navigate('OfflineMain');
  }

  componentWillUnmount(){
    this.props.dryDockStore.offlineReportData = this.props.dryDockStore.offlineReportData;
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

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  addCoatingTableRow(){
    var tableData = this.state.tableData;
    tableData.push(['','','','']);
    this.setState({tableData});
  }

  removeCoatingTableRow(){
    var tableData = this.state.tableData;
    tableData.splice(-1,1)
    this.setState({tableData});
  }

  _renderColorRow = (data, index) => (
    <TouchableOpacity onPress={() => this._alertIndex(index)}>
      <View style={styles.btn}>
      </View>
    </TouchableOpacity>
  );


  render() {
    const state = this.state;
    const {tableData} = this.state;
    return (
        <Swiper style={styles.wrapper} loop={false}>
          <View style={styles.slide}>
            <Header title='IN - Docking Coating Scheme' onPress={() => this.goBack()} backIcon={true} />
            <View style={styles.tableSlideContent}>
              <CoatingKeyTable />
            </View>
          </View>
          <View style={styles.slide}>
            <ScrollView>
              <Header title='IN - Docking Coating Scheme' onPress={() => this.goBack()} backIcon={true} />
              <View style={styles.tableSlideContent}>
                <CoatingSchemeTable coatItems={this.props.dryDockStore.offlineReportData.slides[1].colors}/>
              </View>
            </ScrollView>
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

DryDockReport.navigationOptions = {
  title: 'InspectionReport',
};



const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    backgroundColor: 'white'
  },
  slideContent: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center'
  },
  tableSlideContent: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingTop: 5,
    marginBottom: 70
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  p: {
    fontSize: 18,
    textAlign: 'center'
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
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
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
  head: { height: 50, backgroundColor: '#dedede' },
  row: { flexDirection: 'row', backgroundColor: 'white', height: 40 },
  btn: { height: 30, width: 60, marginLeft: 15, backgroundColor: 'black',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
})

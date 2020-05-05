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
  Alert
} from 'react-native'
import Header from '../../components/Header'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {inject, observer} from "mobx-react";
import Swiper from 'react-native-swiper';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import ColorPickerModal from '../../components/ColorPickerModal';
import TableTextModal from '../../components/TableTextModal';


@inject('dryDockStore', 'userStore')
@observer
export default class CoatingKey1 extends Component {

  constructor(props){
    super(props);
    const index = this.props.navigation.getParam('index', 1);
    this.state = {
      reportData: this.props.dryDockStore.offlineReportData,
      index,
      uri: '',
      loading: false,
      reportGenerated: false,
      generating: false,
      tableData: [
      ],
      tableHead: ['Color', 'Location', 'Coating Type', 'Name'],
    }
  }


  _toggleColorModal(index) {
    this._colorModal.toggleModal(index);
  }

  _toggleTextModal(text, row, col) {
    this._textModal.toggleModal(text, row, col);
  }

  addCoatingTableRow(){
    this.props.dryDockStore.addCoatingTableRow(this.state.index)
  }

  removeCoatingTableRow(){
    this.props.dryDockStore.removeCoatingTableRow(this.state.index);
  }

  _renderColorCol(color, index){
    return(
      <TouchableOpacity onPress={() => this._toggleColorModal(index)}>
        <View style={[styles.btn, {backgroundColor: color }]}>
        </View>
      </TouchableOpacity>
    )
  }

  _renderTextCol(text, row, col){
    return(
      <TouchableOpacity onPress={() => this._toggleTextModal(text, row, col)}>
        <View>
          <Text style={styles.p} numberOfLines={1}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }


  render() {
    const state = this.state;
    return (
        <View style={styles.tableSlideContent}>
          <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.p}/>
            {
              this.props.dryDockStore.offlineReportData.slides[this.state.index].colors.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  <Cell data={this._renderColorCol(rowData.code, index)} textStyle={styles.p}/>
                  <Cell data={this._renderTextCol(rowData.location, index, 'location')} textStyle={styles.p}/>
                  <Cell data={this._renderTextCol(rowData.type, index, 'type')} textStyle={styles.p}/>
                  <Cell data={this._renderTextCol(rowData.name, index, 'name')} textStyle={styles.p}/>
                </TableWrapper>
              ))
            }
          </Table>
          <View style={{width: wp('100%'), marginTop: 15, justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.removeCoatingTableRow()} disabled={this.props.dryDockStore.offlineReportData.slides[this.state.index].colors.length == 0}>
              <View style={styles.addButton}>
                <Ionicons name={'ios-remove-circle'} size={25} style={{color: this.props.dryDockStore.offlineReportData.slides[this.state.index].colors.length == 0 ? '#C1C0B9' : 'black'}}/>
                <Text style={[styles.p, {marginLeft: 5, color: this.props.dryDockStore.offlineReportData.slides[this.state.index].colors.length == 0 ? '#C1C0B9' : 'black'}]}>Remove Row</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{width: wp('100%'), marginTop: 15, justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.addCoatingTableRow()}>
              <View style={styles.addButton}>
                <Ionicons name={'ios-add-circle'} size={25}/>
                <Text style={styles.p}>Add Row</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ColorPickerModal ref={component => this._colorModal = component} setColor={(i, color) => {
            this.props.dryDockStore.offlineReportData.slides[this.state.index].colors[i].code = color;
          }}/>
          <TableTextModal ref={component => this._textModal = component} setText={(text, row, col) => {
            this.props.dryDockStore.offlineReportData.slides[this.state.index].colors[row][col] = text;
          }}/>
        </View>
    )
  }
}

CoatingKey1.navigationOptions = {
  title: 'In Docking Coating Key',
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
    paddingTop: 5
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
  btn: { height: 30, width: 60, marginLeft: 15, backgroundColor: 'black',  borderRadius: 2, borderWidth: 1, borderColor: 'black' },
  btnText: { textAlign: 'center', color: '#fff' }
})

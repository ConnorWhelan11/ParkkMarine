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
import { Table, TableWrapper, Row, Cell, Col, Cols } from 'react-native-table-component';
import ColorPickerModal from './ColorPickerModal';
import TableTextModal from './TableTextModal';
import RNPickerSelect from 'react-native-picker-select';


@inject('dryDockStore', 'userStore')
@observer
export default class CoatingSchemeTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      reportData: this.props.dryDockStore.offlineofflineReportData,
      uri: '',
      loading: false,
      reportGenerated: false,
      generating: false,
      tableData1: [
        ['Bulbous Bow', this._renderPickerCol('bulb',0), this._renderPickerCol('bulb',1), this._renderPickerCol('bulb',2), this._renderPickerCol('bulb',3), this._renderPickerCol('bulb',4)],
        ['Bow Thrusters', this._renderPickerCol('thrust', 0), this._renderPickerCol('thrust', 1), this._renderPickerCol('thrust', 2), this._renderPickerCol('thrust', 3), this._renderPickerCol('thrust', 4)],
        ['Forward Side', this._renderPickerCol('forward', 0), this._renderPickerCol('forward', 1), this._renderPickerCol('forward', 2), this._renderPickerCol('forward', 3), this._renderPickerCol('forward', 4)]
      ],
      tableData2: [
        ['Shoulders', this._renderPickerCol('shoulders', 0), this._renderPickerCol('shoulders', 1), this._renderPickerCol('shoulders', 2), this._renderPickerCol('shoulders', 3), this._renderPickerCol('shoulders', 4)],
        ['Side #1', this._renderPickerCol('side1', 0), this._renderPickerCol('side1', 1), this._renderPickerCol('side1', 2), this._renderPickerCol('side1', 3), this._renderPickerCol('side1', 4)],
        ['Side #2', this._renderPickerCol('side2', 0), this._renderPickerCol('side2', 1), this._renderPickerCol('side2', 2), this._renderPickerCol('side2', 3), this._renderPickerCol('side2', 4)]
      ],
      tableData3: [
        ['Side #3', this._renderPickerCol('side3', 0), this._renderPickerCol('side3', 1), this._renderPickerCol('side3', 2), this._renderPickerCol('side3', 3), this._renderPickerCol('side3', 4)],
        ['Aft', this._renderPickerCol('aft', 0), this._renderPickerCol('aft', 1), this._renderPickerCol('aft', 2), this._renderPickerCol('aft', 3), this._renderPickerCol('aft', 4)],
        ['Stern', this._renderPickerCol('stern', 0), this._renderPickerCol('stern', 1), this._renderPickerCol('stern', 2), this._renderPickerCol('stern', 3), this._renderPickerCol('stern', 4)]
      ],
      tableData4: [
        ['Boot Top', this._renderPickerCol('boot', 0)],
        ['Flats', this._renderPickerCol('flats', 0)]
      ],
      tableTitle: ['Subzone A', 'Subzone B', 'Subzone C', 'Subzone D', 'Subzone E']
    }
  }



  _renderColorCol(color, index){
    return(
      <TouchableOpacity onPress={() => this._toggleColorModal(index)}>
        <View style={[styles.btn, {backgroundColor: color }]}>
        </View>
      </TouchableOpacity>
    )
  }

  _renderPickerCol(area, i){
    const items = this._pickerItems()
    return(
      <RNPickerSelect
        onValueChange={(value) => this.props.dryDockStore.coatingSelect(1, area, i, value)}
        items={items}
        style={{color: this.props.dryDockStore.offlineReportData.slides[1].scheme[area][i].code}}
      />
    )
  }

  _pickerItems(){
    console.log(this.props.dryDockStore.offlineReportData.slides[1].colors)
    return this.props.coatItems.map((elem, index) => {
      console.log(elem)
      return {
        label: elem.name,
        value: elem.code
      }
    })
  }


  render() {
    const state = this.state;
    return (
        <View style={styles.tableSlideContent}>
            <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
              {/* Left Wrapper */}
              <TableWrapper style={{width: 80}}>
                <Cell data="" style={styles.singleHead}/>
                <TableWrapper style={{flexDirection: 'row'}}>
                  <Col data={state.tableTitle} style={styles.title} heightArr={[30, 30, 30, 30, 30]} textStyle={styles.titleText}></Col>
                </TableWrapper>
              </TableWrapper>

              {/* Right Wrapper */}
              <TableWrapper style={{flex:1}}>
                <Cols data={state.tableData1} heightArr={[40, 30, 30, 30, 30, 30]} textStyle={styles.p}/>
              </TableWrapper>
            </Table>
            <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
              {/* Left Wrapper */}
              <TableWrapper style={{width: 80}}>
                <Cell data="" style={styles.singleHead}/>
                <TableWrapper style={{flexDirection: 'row'}}>
                  <Col data={state.tableTitle} style={styles.title} heightArr={[30, 30, 30, 30]} textStyle={styles.titleText}></Col>
                </TableWrapper>
              </TableWrapper>

              {/* Right Wrapper */}
              <TableWrapper style={{flex:1}}>
                <Cols data={state.tableData2} heightArr={[40, 30, 30, 30, 30, 30]} textStyle={styles.p}/>
              </TableWrapper>
            </Table>
            <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
              {/* Left Wrapper */}
              <TableWrapper style={{width: 80}}>
                <Cell data="" style={styles.singleHead}/>
                <TableWrapper style={{flexDirection: 'row'}}>
                  <Col data={state.tableTitle} style={styles.title} heightArr={[30, 30, 30, 30, 30]} textStyle={styles.titleText}></Col>
                </TableWrapper>
              </TableWrapper>

              {/* Right Wrapper */}
              <TableWrapper style={{flex:1}}>
                <Cols data={state.tableData3} heightArr={[40, 30, 30, 30, 30, 30]} textStyle={styles.p}/>
              </TableWrapper>
            </Table>
            <Table style={{flexDirection: 'row'}} borderStyle={{borderWidth: 1}}>
              {/* Left Wrapper */}
              <TableWrapper style={{width: 80}}>
                <Cell data="" style={styles.singleHead}/>
                <TableWrapper style={{flexDirection: 'row'}}>
                  <Col data={state.tableTitle} style={styles.title} heightArr={[30, 30, 30, 30, 30]} textStyle={styles.titleText}></Col>
                </TableWrapper>
              </TableWrapper>

              {/* Right Wrapper */}
              <TableWrapper style={{flex:1}}>
                <Cols data={state.tableData4} heightArr={[40, 30, 30, 30, 30, 30]} textStyle={styles.p}/>
              </TableWrapper>
            </Table>
          </View>
    )
  }
}



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
  singleHead: { width: 80, height: 40, backgroundColor: '#c8e1ff' },
  head: { flex: 1, backgroundColor: '#c8e1ff' },
  title: { flex: 2, backgroundColor: '#f6f8fa' },
  titleText: { marginRight: 6, textAlign:'right' },
  btn: { width: 58, height: 18, marginLeft: 15, backgroundColor: '#c8e1ff', borderRadius: 2 },
  btnText: { textAlign: 'center' }
})

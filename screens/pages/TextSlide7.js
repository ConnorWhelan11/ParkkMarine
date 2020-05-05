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
    title='Vertical Sides'
  />
);

const Header2 = () => (
  <CardHeader
    title='Flats'
  />
);

const Header3 = () => (
  <CardHeader
    title='Niche Areas'
  />
);


@inject('userStore', 'inspectionStore', 'dryDockStore')
@observer
export default class TextSlide7 extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      verticalCoat: this.props.dryDockStore.offlineReportData.slides[6].vert.type,
      verticalPoints: this.props.dryDockStore.offlineReportData.slides[6].vert.list,
      flatsCoat: this.props.dryDockStore.offlineReportData.slides[6].flats.type,
      flatsPoints: this.props.dryDockStore.offlineReportData.slides[6].flats.list,
    }
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    this.props.dryDockStore.offlineReportData.slides[6].vert.type = this.state.verticalCoat;
    this.props.dryDockStore.offlineReportData.slides[6].vert.list = this.state.verticalPoints;
    this.props.dryDockStore.offlineReportData.slides[6].flats.type = this.state.flatsCoat;
    this.props.dryDockStore.offlineReportData.slides[6].flats.list = this.state.flatsPoints;
    this.props.dryDockStore.stringify()
  }

  footer1 = () => (
    <View>
      {this.renderVertList()}
      <View style={styles.footerContainer}>
        <Button
          style={styles.footerControl}
          onPress={() => this.removeVertRow()}
          size='small'>
          REMOVE
        </Button>
        <Button
          style={styles.footerControl}
          size='small'
          onPress={() => this.addVertRow()}
          status='basic'>
          ADD
        </Button>
      </View>
    </View>
  );

  footer2 = () => (
    <View>
      {this.renderFlatsList()}
      <View style={styles.footerContainer}>
        <Button
          style={styles.footerControl}
          onPress={() => this.removeFlatsRow()}
          size='small'>
          REMOVE
        </Button>
        <Button
          style={styles.footerControl}
          size='small'
          onPress={() => this.addFlatsRow()}
          status='basic'>
          ADD
        </Button>
      </View>
    </View>
  );

  footer3 = () => (
    <View>
      {this.renderNicheList()}
      <View style={styles.footerContainer}>
        <Button
          style={styles.footerControl}
          onPress={() => this.removeNicheRow()}
          size='small'>
          REMOVE
        </Button>
        <Button
          style={styles.footerControl}
          size='small'
          onPress={() => this.addNicheRow()}
          status='basic'>
          ADD
        </Button>
      </View>
    </View>
  );

  addVertRow(){
    var list = this.state.verticalPoints;
    list.push('');
    this.setState({verticalPoints: list})
  }

  removeVertRow(){
    var list = this.state.verticalPoints;
    list.splice(-1,1)
    this.setState({verticalPoints: list});
  }

  setVerticalCoat(value){
    console.log(value)
    this.setState({verticalCoat: value});
  }

  setVerticalItem(value, i){
    var list = this.state.verticalPoints;
    list[i] = value;
    this.setState({verticalPoints: list});
  }

  addFlatsRow(){
    var list = this.state.flatsPoints;
    list.push('');
    this.setState({flatsPoints: list})
  }

  removeFlatsRow(){
    var list = this.state.flatsPoints;
    list.splice(-1,1)
    this.setState({flatsPoints: list});
  }

  setFlatsCoat(value){
    this.setState({flatsCoat: value});
  }

  setFlatsItem(value, i){
    var list = this.state.flatsPoints;
    list[i] = value;
    this.setState({flatsPoints: list});
  }

  addNicheRow(){
    var list = this.state.nichePoints;
    list.push('');
    this.setState({nichePoints: list})
  }

  removeNicheRow(){
    var list = this.state.nichePoints;
    list.splice(-1,1)
    this.setState({nichePoints: list});
  }

  setNicheCoat(value){
    this.setState({nicheCoat: value});
  }

  setNicheItem(value, i){
    var list = this.state.nichePoints;
    list[i] = value;
    this.setState({nichePoints: list});
  }

  renderVertList(){
    return this.state.verticalPoints.map((item, i) => {
      return (
        <Input
          placeholder='Bullet point'
          value={item}
          onChangeText={(e) => this.setVerticalItem(e, i)}
        />
      )
    })
  }

  renderFlatsList(){
    return this.state.flatsPoints.map((item, i) => {
      return (
        <Input
          placeholder='Bullet point'
          value={item}
          onChangeText={(e) => this.setFlatsItem(e, i)}
        />
      )
    })
  }

  renderNicheList(){
    return this.state.nichePoints.map((item, i) => {
      return (
        <Input
          placeholder='Bullet point'
          value={item}
          onChangeText={(e) => this.setNicheItem(e, i)}
        />
      )
    })
  }


  render(){
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card header={Header1} footer={this.footer1} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Coating'
              placeholder='Example: Jotun SPC'
              value={this.state.verticalCoat}
              onChangeText={(e) => this.setVerticalCoat(e)}
            />
          </Card>
          <Card header={Header2} footer={this.footer2} style={{ width: wp('90%'), marginBottom: 7}}>
            <Input
              label='Coating'
              placeholder='Example: Jotun SPC'
              value={this.state.flatsCoat}
              onChangeText={(e) => this.setFlatsCoat(e)}
            />
          </Card>
          <View style={{height: 250, width: wp('80%')}} />
        </ScrollView>
      </View>
    )
  }
}

TextSlide7.navigationOptions = {
  title: 'In Docking Coating Condition',
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

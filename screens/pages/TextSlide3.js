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
import autobind from 'autobind-decorator'


@inject('userStore', 'inspectionStore', 'dryDockStore')
@observer
export default class TextSlide3 extends React.Component {

  constructor(props){
    super(props);
    const index = props.navigation.getParam('index', 33);
    this.state = {
      sections: this.props.dryDockStore.offlineReportData.slides[index].sections,
      index
    }
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    this.props.dryDockStore.offlineReportData.slides[this.state.index].sections = this.state.sections;
    this.props.dryDockStore.stringify();
  }

  footer(index){
    return () => (
      <View>
        {this.renderList(index)}
        <View style={styles.footerContainer}>
          <Button
            style={styles.footerControl}
            onPress={() => this.removeBulletRow(index)}
            size='small'>
            REMOVE
          </Button>
          <Button
            style={styles.footerControl}
            size='small'
            onPress={() => this.addBulletRow(index)}
            status='basic'>
            ADD
          </Button>
        </View>
      </View>
    );
  }

  header(index){
    return () => (
      <View style={{paddingVertical: 3, paddingHorizontal: 5}}>
        <Input
          label='Title'
          placeholder='Example: Flats, Niche Areas'
          value={this.state.sections[index].title}
          onChangeText={(e) => this.setTitle(index, e)}
        />
      </View>
    );
  }

  addBulletRow(index){
    var sections = this.state.sections;
    sections[index].list.push('');
    this.setState({sections});
  }

  removeBulletRow(index){
    var sections = this.state.sections;
    sections[index].list.splice(-1,1);
    this.setState({sections});
  }

  setBulletItem(value, i, sectionIndex){
    var sections = this.state.sections;
    sections[sectionIndex].list[i] = value;
    this.setState({sections});
  }

  setCoat(index, value){
    var sections = this.state.sections;
    sections[index].coat = value;
    this.setState({sections});
  }

  setTitle(index, value){
    var sections = this.state.sections;
    sections[index].title = value;
    this.setState({sections});
  }

  addSection(index, value){
    var sections = this.state.sections;
    sections.push({
      "type": "",
      "list": [
        "",
      ],
      "title": "",
    })
    this.setState({sections});
  }

  removeSection(index, value){
    var sections = this.state.sections;
    sections.splice(-1,-1);
    this.setState({sections});
  }

  renderList(index){
    return this.state.sections[index].list.map((item, i) => {
      return (
        <Input
          placeholder='Bullet point'
          value={item}
          onChangeText={(e) => this.setBulletItem(e, i, index)}
        />
      )
    })
  }

  renderSection(section, index){
    return (
      <Card header={this.header(index)} footer={this.footer(index)} style={{ width: wp('90%'), marginBottom: 7}}>
        <Input
          label='Coating'
          placeholder='Example: Jotun SPC'
          value={section.coat}
          onChangeText={(e) => this.setCoat(index, e)}
        />
      </Card>
    )
  }


  render(){

    return (
      <View style={styles.container}>
        <ScrollView>
          {
            this.state.sections.map((section, i) => this.renderSection(section, i))
          }
          <View style={[styles.footerContainer, {marginTop: 7, paddingHorizontal: 5}]}>
            <Button
              style={styles.footerControl}
              onPress={() => this.removeSection()}
              size='small'>
              REMOVE
            </Button>
            <Button
              style={styles.footerControl}
              size='small'
              onPress={() => this.addSection()}
              status='basic'>
              ADD
            </Button>
          </View>
          <View style={{height: 250, width: wp('80%')}} />
        </ScrollView>
      </View>
    )
  }
}

TextSlide3.navigationOptions = {
  title: 'In Docking Fouling Condition Summary',
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

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
export default class TextSlide8 extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      nichePoints: this.props.dryDockStore.offlineReportData.slides[7].niche.list,
    }
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    this.props.dryDockStore.offlineReportData.slides[7].niche.list = this.state.nichePoints;
    this.props.dryDockStore.stringify()
  }




  setNicheItem(value, i){
    var list = this.state.nichePoints;
    list[i] = value;
    this.setState({nichePoints: list});
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
          <Card header={Header3} style={{ width: wp('90%'), marginBottom: 7}}>
            <View>
              <Input
                placeholder='Note'
                label='Azipod'
                value={this.state.nichePoints[0]}
                onChangeText={(e) => this.setNicheItem(e, 0)}
              />
              <Input
                placeholder='Note'
                label='Stabilizer Pocket and Fins'
                value={this.state.nichePoints[1]}
                onChangeText={(e) => this.setNicheItem(e, 1)}
              />
              <Input
                placeholder='Note'
                label='Sea chests'
                value={this.state.nichePoints[2]}
                onChangeText={(e) => this.setNicheItem(e, 2)}
              />
              <Input
                placeholder='Note'
                label='Crossovers'
                value={this.state.nichePoints[3]}
                onChangeText={(e) => this.setNicheItem(e, 3)}
              />
              <Input
                placeholder='Note'
                label='Thruster tunnels'
                value={this.state.nichePoints[4]}
                onChangeText={(e) => this.setNicheItem(e, 4)}
              />
            </View>
          </Card>
          <View style={{height: 250, width: wp('80%')}} />
        </ScrollView>
      </View>
    )
  }
}

TextSlide8.navigationOptions = {
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
});

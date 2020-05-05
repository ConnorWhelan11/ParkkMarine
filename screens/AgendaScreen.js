import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ProgressBarAndroid
} from 'react-native';

import { MonoText } from '../components/StyledText';
import {inject, observer} from "mobx-react";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

@inject("userStore")
@observer
export default class AgendaScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: {}
    }
  }

  componentDidMount(){

  }

  renderItem(item) {
    console.log('item: ', item)
    return (
      <View style={styles.item}>
        {
          item.first ?
          <View
            style={{
              borderColor: '#9c9c9c',
              borderBottomWidth: 1,
              height: 1,
              width: wp('60%'),
              paddingHorizontal: 5,
              alignSelf: 'center',
              marginBottom: 7
            }}
          />
          :
          <View />
        }
        <TouchableOpacity>
          <View style={styles.card}>
            <View style={{width: wp('70%'), height: 30, alignItems: 'center'}}>
              <Text style={{fontSize: 18}}>{item.name}</Text>
            </View>
            <View
              style={{
                borderColor: '#9c9c9c',
                borderBottomWidth: 1,
                height: 1,
                width: wp('50%'),
                paddingHorizontal: 5,
                alignSelf: 'center'
              }}
            />
            <View style={{width: wp('70%'), alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
              <Text style={{fontSize: 12, color: 'green'}}>100% Complete</Text>
            </View>
            <View style={{alignItems: 'flex-start'}}>
              <View style={{padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome name="user-circle" size={22} color='black' />
                <Text style={{fontSize: 20, marginLeft: 5}}>Abhi Koka</Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
              <View style={{padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 15, marginRight: 5}}>10</Text>
                <Ionicons name="md-chatbubbles" size={16} color='black' />
              </View>
              <View style={{padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: 15, marginRight: 5}}>4d</Text>
                <Ionicons name="md-calendar" size={16} color='black' />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime] = []
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      newItems['2019-10-21'] = [{ name: 'Carnival Custom Report', first: true }, { name: 'Royal Carribean Custom Report', first: false }]
      newItems['2019-10-22'] = [{ name: 'Celebrity Dry Dock Report', first: true }]
      newItems['2019-10-25'] = [{ name: 'Norwegian Custom Report', first: true }, { name: 'Royal Carribean Dry Dock Report', first: false }]
      newItems['2019-10-27'] = [{ name: 'Norwegian Custom Report', first: true }]

      this.setState({items: newItems});
      console.log('done loading')
    }, 1000);
  }

  render(){
    return (
      <View style={styles.container}>
        <Agenda
          items={this.state.items}
          selected={'2019-10-21'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          loadItemsForMonth={this.loadItems.bind(this)}
          theme={{calendarBackground: '#d1d1d1', agendaKnobColor: '#409cff'}}
          monthFormat={'MMM yyyy'}
          renderDay={(day, item) => {
            console.log('day: ', day)
            if(day){
              return (
                <View style={{width: wp('20%'), alignItems: 'center'}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>{moment(day.dateString).format("DD")}</Text>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>{moment(day.dateString).format("MMM")}</Text>
                </View>
              )
            } else {
              return (
                <View style={{width: wp('20%')}}>
                </View>
              )
            }
          }}
        />
      </View>
    )
  }
}

AgendaScreen.navigationOptions = {
  title: 'Agenda',
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    width: wp('80%'),
    alignItems: 'center',
    paddingVertical: 5
  },
  emptyDate: {
  },
  card: {
    backgroundColor: 'white',
    width: wp('70%'),
    borderRadius: 10,
    height: hp('20%'),
    shadowOpacity: 0.2,
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
  }
});

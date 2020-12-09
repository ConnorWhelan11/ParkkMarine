import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';

import { MonoText } from '../components/StyledText';
import {inject, observer} from "mobx-react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { ListItem, CheckBox } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  Card,
  CardHeader,
  Text,
  Modal,
  Layout,
  Input
} from '@ui-kitten/components';


@inject('dryDockStore', 'userStore')
@observer
export default class TableOfContentScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list: [
        {
          id: '1',
          name: 'Report Details',
          avatar: require('../assets/images/page1.png'),
          subtitle: 'Location, Ship, Cover Photo, Prepared For',
          onPress: () => this.props.navigation.navigate('ReportDetails'),
        },
        {
          id: '2',
          name: 'In Docking Coating Scheme: Key',
          avatar: require('../assets/images/page2.png'),
          subtitle: 'Coating color, type, and location',
          onPress: () => this.props.navigation.navigate('CoatingKey1', {index: 1}),
        },
        {
          id: '3',
          name: 'In Docking Coating Scheme: Diagram',
          avatar: require('../assets/images/page2.png'),
          subtitle: 'Select cooating of each ship section',
          onPress: () => this.props.navigation.navigate('CoatingScheme1', {index: 1}),
        },
        {
          id: '4',
          name: 'In Docking Fouling Condition Summary',
          avatar: require('../assets/images/page3.png'),
          subtitle: 'Descriptions of fouling condition port and stbd',
          onPress: () => this.props.navigation.navigate('TextSlide3', { index: 2}),
        },
        {
          id: '5',
          name: 'In Docking Port Fouling Condition',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesNoteSlide4' , { index: 3}),
        },
        {
          id: '6',
          name: 'In Docking Starboard Fouling Condition',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesNoteSlide4', { index: 4}),
        },
        {
          id: '7',
          name: 'In Docking Fouling Condition Table',
          avatar: require('../assets/images/page6.png'),
          subtitle: 'Table to input condition for each area',
          onPress: () => this.props.navigation.navigate('TableSlide6'),
        },
        {
          id: '8',
          name: 'In Docking Coating Condition Summary',
          avatar: require('../assets/images/page3.png'),
          subtitle: 'Page 1',
          onPress: () => this.props.navigation.navigate('TextSlide3', { index: 6}),
        },
        {
          id: '9',
          name: 'In Docking Coating Condition Summary',
          avatar: require('../assets/images/page3.png'),
          subtitle: 'Page 2',
          onPress: () => this.props.navigation.navigate('TextSlide3', { index: 7}),
        },
        {
          id: '10',
          name: 'In Docking Coating Condition Table Port Side',
          avatar: require('../assets/images/page9.png'),
          subtitle: 'Table to input coating for each area',
          onPress: () => this.props.navigation.navigate('TableSlide9'),
        },
        {
          id: '11',
          name: 'In Docking Coating Condition Table Stbd Side',
          avatar: require('../assets/images/page9.png'),
          subtitle: 'Table to input coating for each area',
          onPress: () => this.props.navigation.navigate('TableSlide10'),
        },
        {
          id: '12',
          name: 'In Docking Port Coating Condition',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesNoteSlide4' , { index: 13}),
        },
        {
          id: '13',
          name: 'In Docking Stbd Coating Condition',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesNoteSlide4' , { index: 14}),
        },
        {
          id: '14',
          name: 'Out Docking Coating Scheme: Key',
          avatar: require('../assets/images/page2.png'),
          subtitle: 'Coating color, type, and location',
          onPress: () => this.props.navigation.navigate('CoatingKey1', {index: 10}),
        },
        {
          id: '15',
          name: 'Out Docking Coating Scheme: Diagram',
          avatar: require('../assets/images/page2.png'),
          subtitle: 'Select cooating of each ship section',
          onPress: () => this.props.navigation.navigate('CoatingScheme1', {index: 10}),
        },
        {
          id: '16',
          name: 'Out Docking Port Coating Condition',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesNoteSlide4', { index: 11}),
        },
        {
          id: '17',
          name: 'Out Docking Stbd Coating Condtion',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesNoteSlide4', { index: 12}),
        },
      ],
      visible: false,
      title: '',
      extraList: this.generateList(),
      customSlides: this.props.dryDockStore.offlineReportData.customSlides
    }
  }

  componentWillUnmount(){
    this.props.dryDockStore.offlineReportData.customSlides = this.state.customSlides;
  }

  generateList(){
    const id  = uuidv4();
    console.log(this.props.dryDockStore.offlineReportData.customSlides)
    return this.props.dryDockStore.offlineReportData.customSlides.map((slide, i) => {
      return {
        id: id,
        name: slide.title,
        avatar: require('../assets/images/page1.png'),
        subtitle: 'Images and description',
        checked: slide.checked,
        onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: i, title: slide.title}),
      }
    })
  }

  addSlide(){
    this.setState({visible: true});
  }

  createSlide(){
    const list = this.state.extraList;
    const customSlides = this.state.customSlides;
    const id  = uuidv4();

    customSlides.push({
      title: this.state.title,
      note: '',
      checked: true,
      images: []
    });

    this.props.dryDockStore.offlineReportData.customSlides = customSlides;

    list.push({
      id: id,
      name: this.state.title,
      avatar: require('../assets/images/page1.png'),
      subtitle: 'Images and description',
      checked: true,
      onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: customSlides.length - 1, title: this.state.title}),
    });

    this.setState({
      visible: false,
      title: '',
      extraList: list
    });
  }



  renderModalElement = () => (
    <Layout
      level='3'
      style={styles.modalContainer}>
      <Input
        label='Slide Title'
        placeholder='Start typing...'
        value={this.state.title}
        onChangeText={(e) => this.setState({title: e})}
      />
      <Button
        size='small'
        style={{marginTop: 10}}
        onPress={() => this.createSlide()}>
        ADD SLIDE
      </Button>
    </Layout>
  );

  render(){
    return (
      <ScrollView>
        <FlatList
          data={this.state.list}
          renderItem={({ item }) => (
            <ListItem
              key={item.id}
              Component={TouchableScale}
              leftAvatar={{ source: item.avatar }}
              title={item.name}
              subtitle={item.subtitle}
              onPress={() => item.onPress()}
              bottomDivider
              friction={90}
              tension={100}
              chevron={{ color: 'black' }}
              rightTitle={item.id}
            />
          )}
          keyExtractor={item => item.id}
        />
        <View style={{width: wp('100%'), height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 10}}>
            <Button
              size='small'
              onPress={() => this.addSlide()}>
              ADD SLIDE
            </Button>
        </View>
        <FlatList
          data={this.state.extraList}
          extraData={this.state}
          renderItem={({ item, index }) => (
            <ListItem
              key={item.id}
              Component={TouchableScale}
              leftAvatar={{ source: item.avatar }}
              title={item.name}
              subtitle={item.subtitle}
              onPress={() => item.onPress()}
              checkmark={this.state.extraList[index].checked}
              onLongPress={() => {
                const extraList = this.state.extraList;
                const customSlides = this.state.customSlides;

                extraList[index].checked = !extraList[index].checked;
                customSlides[index].checked = !customSlides[index].checked;

                this.setState({extraList, customSlides});
              }}
              bottomDivider
              friction={90}
              tension={100}
              chevron={{ color: 'black' }}
            />
          )}
          keyExtractor={item => item.id}
        />
        <Modal
          visible={this.state.visible}
          backdropStyle={styles.backdrop}>
          {this.renderModalElement()}
        </Modal>
      </ScrollView>
    );
  }
}

TableOfContentScreen.navigationOptions = {
  title: 'Dry Dock Report',
};



const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: wp('80%'),
    height: wp('80%'),
    paddingHorizontal: 5,
    borderRadius: 5
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

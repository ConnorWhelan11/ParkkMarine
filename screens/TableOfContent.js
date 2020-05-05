import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';

import { MonoText } from '../components/StyledText';
import {inject, observer} from "mobx-react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';


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
          onPress: () => this.props.navigation.navigate('ImagesNoteSlide4'),
        },
        {
          id: '6',
          name: 'In Docking Starboard Fouling Condition',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesNoteSlide5'),
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
          subtitle: 'Vertical sides, flats',
          onPress: () => this.props.navigation.navigate('TextSlide7'),
        },
        {
          id: '9',
          name: 'In Docking Coating Condition Summary',
          avatar: require('../assets/images/page3.png'),
          subtitle: 'Niche ares',
          onPress: () => this.props.navigation.navigate('TextSlide8'),
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
          name: 'Out Docking Coating Scheme: Key',
          avatar: require('../assets/images/page2.png'),
          subtitle: 'Coating color, type, and location',
          onPress: () => this.props.navigation.navigate('CoatingKey1', {index: 10}),
        },
        {
          id: '13',
          name: 'Out Docking Coating Scheme: Diagram',
          avatar: require('../assets/images/page2.png'),
          subtitle: 'Select cooating of each ship section',
          onPress: () => this.props.navigation.navigate('CoatingScheme1', {index: 10}),
        },
        {
          id: '14',
          name: 'Out Docking Port Coating Scheme',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesNoteSlide4'),
        },
        {
          id: '15',
          name: 'Out Docking Starboard Coating',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesNoteSlide5'),
        },
        {
          id: '16',
          name: 'Summary of Drag Penalty',
          avatar: require('../assets/images/page22.png'),
          subtitle: 'Table to input drag penalty values',
          onPress: () => this.props.navigation.navigate('DragPenalty'),
        },
        {
          id: '17',
          name: 'Bulbous Bow Fouling Condition Analysis',
          avatar: require('../assets/images/page23.png'),
          subtitle: 'Table to input drag penalty values',
          onPress: () => this.props.navigation.navigate('BulbFoulingTable'),
        },
        {
          id: '18',
          name: 'Bow Thrusters Fouling Condition Analysis',
          avatar: require('../assets/images/page23.png'),
          subtitle: 'Table to input drag penalty values',
          onPress: () => this.props.navigation.navigate('BulbFoulingTable'),
        },{
          id: '19',
          name: 'Forward Sides Fouling Condition Analysis',
          avatar: require('../assets/images/page23.png'),
          subtitle: 'Table to input drag penalty values',
          onPress: () => this.props.navigation.navigate('BulbFoulingTable'),
        },
        {
          id: '20',
          name: 'Shoulders Fouling Condition Analysis',
          avatar: require('../assets/images/page23.png'),
          subtitle: 'Table to input drag penalty values',
          onPress: () => this.props.navigation.navigate('BulbFoulingTable'),
        },
        {
          id: '21',
          name: 'Side 1 Fouling Condition Analysis',
          avatar: require('../assets/images/page23.png'),
          subtitle: 'Table to input drag penalty values',
          onPress: () => this.props.navigation.navigate('BulbFoulingTable'),
        },
        {
          id: '22',
          name: 'Side 2 Fouling Condition Analysis',
          avatar: require('../assets/images/page23.png'),
          subtitle: 'Table to input drag penalty values',
          onPress: () => this.props.navigation.navigate('BulbFoulingTable'),
        },
        {
          id: '23',
          name: 'Side 3 Fouling Condition Analysis',
          avatar: require('../assets/images/page23.png'),
          subtitle: 'Table to input drag penalty values',
          onPress: () => this.props.navigation.navigate('BulbFoulingTable'),
        },
        {
          id: '24',
          name: 'Aft Fouling Condition Analysis',
          avatar: require('../assets/images/page23.png'),
          subtitle: 'Table to input drag penalty values',
          onPress: () => this.props.navigation.navigate('BulbFoulingTable'),
        },
        {
          id: '25',
          name: 'Stern Fouling Condition Analysis',
          avatar: require('../assets/images/page23.png'),
          subtitle: 'Table to input drag penalty values',
          onPress: () => this.props.navigation.navigate('BulbFoulingTable'),
        },
        {
          id: '26',
          name: 'Flats Condition Analysis',
          avatar: require('../assets/images/page23.png'),
          subtitle: 'Table to input drag penalty values',
          onPress: () => this.props.navigation.navigate('BulbFoulingTable'),
        },
        {
          id: '27',
          name: 'Niche Areas – Sea Chests - Fouling Condition Analysis',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 25}),
        },
        {
          id: '28',
          name: 'Niche Areas – Crossovers Tunnels - Fouling Condition Analysis',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 26}),
        },
        {
          id: '29',
          name: 'Niche Areas – Stabilizers - Fouling Condition Analysis',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 27}),
        },
        {
          id: '30',
          name: 'Niche Areas – Bow Thrusters - Fouling Condition Analysis',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 28}),
        },
        {
          id: '31',
          name: 'Niche Areas – Azipods/ Stern - Fouling Condition Analysis',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 29}),
        },
        {
          id: '32',
          name: 'Coating Condition Summary – In docking Port/ Stbd Side',
          avatar: require('../assets/images/page3.png'),
          subtitle: 'Text sections with bullet points',
          onPress: () => this.props.navigation.navigate('TextSlide3', { index: 30 }),
        },
        {
          id: '33',
          name: 'Coating Condition Analysis – No HP Washing – Port Side',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 31}),
        },
        {
          id: '34',
          name: 'Coating Condition Analysis – No HP Washing – Stbd Side',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 32}),
        },
        {
          id: '35',
          name: 'Coating Condition Analysis – No HP Washing – Flats',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 33}),
        },
        {
          id: '36',
          name: 'Coating Condition Analysis – No HP Washing – Flats',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 34}),
        },
        {
          id: '37',
          name: 'Coating Condition Analysis – Niche Areas',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 35}),
        },
        {
          id: '38',
          name: 'Observations – Underwater Cleaning Brush Marks',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 36}),
        },
        {
          id: '39',
          name: 'Observations – Delamination and Cracking',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 37}),
        },
        {
          id: '40',
          name: 'Observations – Anchor & Chain',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 38}),
        },
        {
          id: '41',
          name: 'Quality Control – Slurry Blast Residue',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 29}),
        },
        {
          id: '42',
          name: 'Quality Control – Substrate Chloride Level',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 40}),
        },
        {
          id: '43',
          name: 'Quality Control – Coating Application',
          avatar: require('../assets/images/page4.png'),
          subtitle: 'Images and note',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes', {index: 41}),
        },
      ],
    }
  }

  render(){
    return (
      <View>
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
      </View>
    );
  }
}

TableOfContentScreen.navigationOptions = {
  title: 'Dry Dock Report',
};



const styles = StyleSheet.create({

});

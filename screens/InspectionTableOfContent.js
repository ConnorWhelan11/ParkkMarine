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
import { ListItem } from 'react-native-elements'
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
export default class InspectionTableOfContentScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: (
          <View>
            <Text>Inspection Report</Text>
            <Text>subtitle</Text>
          </View>
        )
    }
  }

  constructor(props){
    super(props);
    this.state = {
      visible: false,
      title: '',
      list: [
        {
          id: '1',
          name: 'Expample Page',
          avatar: require('../assets/images/page1.png'),
          subtitle: 'Images and description',
          onPress: () => this.props.navigation.navigate('ImagesAndNotes'),
        },
      ]
    }
  }

  addSlide(){
    this.setState({visible: true});
  }

  createSlide(){
    const list = this.state.list;
    const id  = uuidv4();
    list.push({
      id: id,
      name: this.state.title,
      avatar: require('../assets/images/page1.png'),
      subtitle: 'Images and description',
      onPress: () => this.props.navigation.navigate('ImagesAndNotes'),
    });
    this.setState({
      visible: false,
      title: '',
      list: list
    })
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
      <View>
        <View style={{width: wp('100%'), height: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Button
            size='small'
            onPress={() => this.addSlide()}>
            ADD SLIDE
          </Button>
        </View>
        <FlatList
          data={this.state.list}
          extraData={this.state}
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
            />
          )}
          keyExtractor={item => item.id}
        />
        <Modal
          visible={this.state.visible}
          backdropStyle={styles.backdrop}>
          {this.renderModalElement()}
        </Modal>
      </View>
    );
  }
}




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

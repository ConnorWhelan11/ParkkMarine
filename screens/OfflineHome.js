import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ProgressBarAndroid,
  ActivityIndicator,
  Alert
} from 'react-native';

import { MonoText } from '../components/StyledText';
import {inject, observer} from "mobx-react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import {
  Button,
  Card,
  CardHeader,
  Text,
  Modal,
  Layout,
  Input
} from '@ui-kitten/components';


const Header1 = () => (
  <CardHeader
    title='Dry Dock Report'
    description='0% Complete'
  />
);

const Header2 = () => (
  <CardHeader
    title='Inspection Report'
    description='0% Complete'
  />
);

const Header3 = () => (
  <CardHeader
    title='Specific Job Report'
    description='0% Complete'
  />
);


@inject('userStore', 'inspectionStore', 'dryDockStore')
@observer
export default class OfflineHome extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      visible1: false,
      visible2: false,
      email: ''
    }
  }

  componentDidMount(){

  }

  componentWillUnmount(){
    this.props.dryDockStore.stringify()
  }

  reportScreen(report){
    this.props.inspectionStore.reportData = report;
    this.props.navigation.navigate('TableOfContent')
  }

  _renderReport(report){
    return (
      <TouchableOpacity key={report.id} onPress={() => this.reportScreen(report)}>
        <View style={{
          width: wp('90%'),
          height: hp('20%'),
          shadowOpacity: 0.2,
          backgroundColor: 'white',
          borderRadius: 5,
          marginBottom: 10,
          backgroundColor: '#9ce2f7',
          shadowColor: 'black',
          shadowOpacity: 1,
          elevation: 3,
        }}>
          <View style={{width: wp('90%'), height: 30, alignItems: 'center'}}>
            <Text style={{fontSize: 18}}>Dry Dock Report</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderReports(reports){
    return reports.map((report) => this._renderReport(report))
  }

  footer = () => (
    <View style={styles.footerContainer}>
      <Button
        style={styles.footerControl}
        onPress={() => this.openModal2()}
        size='small'>
        GENERATE REPORT
      </Button>
      <Button
        style={styles.footerControl}
        size='small'
        onPress={() => this.props.navigation.navigate('TableOfContent')}
        status='basic'>
        EDIT
      </Button>
    </View>
  );

  footer2 = () => (
    <View style={styles.footerContainer}>
      <Button
        style={styles.footerControl}
        size='small'>
        GENERATE REPORT
      </Button>
      <Button
        style={styles.footerControl}
        size='small'
        onPress={() => this.props.navigation.navigate('InspectionTableOfContent')}
        status='basic'>
        EDIT
      </Button>
    </View>
  );

  footer3 = () => (
    <View style={styles.footerContainer}>
      <Button
        style={styles.footerControl}
        size='small'>
        GENERATE REPORT
      </Button>
      <Button
        style={styles.footerControl}
        size='small'
        onPress={() => this.props.navigation.navigate('JobTableOfContent')}
        status='basic'>
        EDIT
      </Button>
    </View>
  );

  renderModalElement1 = () => (
    <Layout
      level='3'
      style={styles.modalContainer}>
      <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: wp('100%'),
            height: 400,
            backgroundColor: '#eee',
          }}
          autoPlay
          source={require('../assets/sailing-boat.json')}
        />
    </Layout>
  );

  renderEmailModal = () => (
    <Layout
      level='3'
      style={styles.modalEmailContainer}>
      <Input
        label='Email'
        placeholder='Start typing'
        value={this.state.email}
        style={{marginBottom: 7}}
        onChangeText={(val) => this.setState({email: val})}
      />
      <View style={styles.footerContainer}>
        <Button
          style={styles.footerControl}
          onPress={() => this.openModal1()}
          size='small'>
          GENERATE REPORT
        </Button>
        <Button
          style={styles.footerControl}
          size='small'
          onPress={() => this.setState({visible2: false})}
          status='basic'>
          CLOSE
        </Button>
      </View>
    </Layout>
  );

  openModal1(){
    this.setState({visible1: true, visible2: false});
    this.props.dryDockStore.generateReport(this.state.email).then(() => {
      this.closeModal1()
      Alert.alert(
        'Success!',
        'Check your email for the report attached as a PDF!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    })
  }

  openModal2(){
    this.setState({visible2: true});
  }

  closeModal1(){
    this.setState({visible1: false})
  }




  render(){

    return (
      <View style={styles.container}>
        <ScrollView>
          <Card header={Header1} footer={this.footer} style={{ width: wp('90%'), marginBottom: 7}} status='success'>
            <Text>
              Full report to be completed during ship dry docks. Includes all information and pictures
              related to coating condition, coating scheme, fouling, and drag penalty. Edit the information as needed,
              and it will be automatically saved locally to your phone with no internet connection required. Connection is needed to upload images and generate the report itself. Click to generate report and it will
              be emailed to the whole team!
            </Text>
          </Card>
          <Card header={Header2} footer={this.footer2} style={{backgroundColor: '#8fc1ff', width: wp('90%'), marginBottom: 7}} status='success'>
            <Text>
              Customizable report template. Choose each slide to be images and a note, just notes, or just images.
            </Text>
          </Card>
          <Card header={Header3} footer={this.footer3} style={{backgroundColor: '#c08fff', width: wp('90%'), marginBottom: 7}} status='success'>
            <Text>
              Customizable report template with flexible titles depending on the specific job completed. Choose each slide to be images and a note, just notes, or just images.
            </Text>
          </Card>
        </ScrollView>
        <Modal
          visible={this.state.visible1}>
          {this.renderModalElement1()}
        </Modal>
        <Modal
          visible={this.state.visible2}
          backdropStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          {this.renderEmailModal()}
        </Modal>
      </View>
    )
  }
}

OfflineHome.navigationOptions = {
  title: 'My Reports',
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    alignItems: 'center'
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
  },
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: wp('100%'),
    height: hp('100%'),
  },
  modalEmailContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
    width: wp('95%'),
    padding: 10,
    height: 300,
  },
});

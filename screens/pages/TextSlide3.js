import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
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
import {actions, defaultActions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';


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

  onEditorInitialized(){
    console.log('editor is a go');
  }

  onChange(data) {
    this.setState({sections: data});
  }


  render(){

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll}>
          <RichEditor
            ref={(r) => this.richtext = r}
            onChange={data => this.onChange(data)}
            initialContentHTML={this.state.sections}
            editorInitializedCallback={() => this.onEditorInitialized()}
          />
        </ScrollView>
        <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={0} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <RichToolbar getEditor={() => this.richtext}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

TextSlide3.navigationOptions = {
  title: 'In Docking Fouling Condition Summary',
};



const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
  },
  scroll: {
      backgroundColor: '#ffffff',
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

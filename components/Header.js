import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons as Icon } from '@expo/vector-icons';

export default function Header(props) {
  return (
    <View style={styles.root}>
      {
        props.backIcon ? _renderBackIcon(props.onPress) : <View />
      }
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.bar} />
    </View>
  );
}

const _renderBackIcon = (onPress) => {
  return(
    <TouchableOpacity onPress={onPress}>
      <View>
        <Icon name={'ios-arrow-back'} size={40} style={styles.backIcon} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root:{
    width: wp('100%'),
    paddingHorizontal: 15,
    paddingBottom: 7,
    paddingTop: hp('4%')
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  bar:{
    width: wp('65%'),
    height: 12,
    borderRadius: 10,
    backgroundColor: '#01DFFD'
  },
  backIcon: {
    marginBottom: hp('2%')
  }
});

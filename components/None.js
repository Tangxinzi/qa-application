import React, { Component } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

export default class None extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View underlayColor="transparent" style={styles.view}>
        <Ionicons name="cloudy-outline" size={30} />
        <Text allowFontScaling={false} numberOfLines={1} style={styles.text}>
          No data yet.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: 200,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center'
  },
});

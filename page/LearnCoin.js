import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

class LearnCoin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#f4511e'} />
        <View style={styles.coin}>
          <Text allowFontScaling={false} style={styles.coinNum}>0</Text>
          <Text allowFontScaling={false} style={{ marginBottom: 4, color: '#FFF' }}>Learn Coin</Text>
        </View>
        <View style={styles.content}>
          <Text allowFontScaling={false}>Learn Coin Details</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  coin: {
    padding: 15,
    paddingBottom: 45,
    backgroundColor: '#f4511e',
    alignItems: 'center',
  },
  coinNum: {
    fontSize: 36,
    color: '#FFF',
    fontWeight: '600',
    marginBottom: 15,
  },
  content: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginTop: -15
  }
};

module.exports = LearnCoin;

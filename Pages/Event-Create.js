import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import globalStyle from '../assets/global-style';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

class EventCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={globalStyle.form}>
            <View style={globalStyle.formRow}>
              <Text allowFontScaling={false} style={globalStyle.formText}>Title</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text allowFontScaling={false} style={globalStyle.formText}>Content</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text allowFontScaling={false} style={globalStyle.formText}>Start Time</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text allowFontScaling={false} style={globalStyle.formText}>Estimated Duration</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text allowFontScaling={false} style={globalStyle.formText}>LearnCoin</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text allowFontScaling={false} style={globalStyle.formText}>Estimated LearnCoin</Text>
              <Text allowFontScaling={false} style={globalStyle.formText}>自动计算</Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              style={{...styles.button, backgroundColor: '#3eb96e'}}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                Confirm
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                Cancel
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'space-between'
  },
  buttons: {
    alignItems: 'center',
    marginBottom: 100,
  },
  button: {
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCC',
    width: 120,
    height: 40,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
};

module.exports = EventCreate;

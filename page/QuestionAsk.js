import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import globalStyle from '../assets/global-style';
import Ionicons from '@expo/vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
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

class QuestionAsk extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      params: this.props.route.params,
      lists: [],
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.swiperContainer}>
          <Image
            resizeMode="cover"
            style={styles.swiperImage}
            source={{
              uri: this.state.params.assets.uri || 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
            }}
          />
        </View>
        <View style={styles.container}>
          <View style={globalStyle.form}>
            <TouchableHighlight underlayColor="transparent">
              <View style={globalStyle.formRow}>
                <Text style={globalStyle.formText}>Country</Text>
                <TextInput
                  style={globalStyle.formInput}
                  placeholder="Please input ..."
                />
              </View>
            </TouchableHighlight>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>School</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Module Name</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Module Code</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
          </View>

          <View style={styles.buttons}>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: '#3eb96e' }}
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
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },

  // swiper
  swiperContainer: {
    // height: 160,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
  },
  swiperTouch: {
    borderRadius: 5,
  },
  swiperImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  swiperTitle: {
    marginTop: 10,
    width: '80%',
    fontSize: 16,
    fontWeight: '600',
  },

  // bottons
  buttons: {
    alignItems: 'center',
    position: 'relative',
    bottom: -100,
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

module.exports = QuestionAsk;

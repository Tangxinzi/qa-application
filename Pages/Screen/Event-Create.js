import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import Api from '../../components/Api';
import globalStyle from '../../assets/global-style';
import { DatePicker } from 'react-native-common-date-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      userinfo: {},
    };

    this.getUserinfo();
  }

  async getUserinfo() {
    const userinfo = await AsyncStorage.getItem('userinfo');
    this.setState({ userinfo: JSON.parse(userinfo) });
  }

  createEvent() {
    fetch(Api.uri + `/api/v2/event/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.userinfo._id,
        event_title: this.state.title,
        event_content: this.state.content,
        event_start_time: this.state.starTime,
        event_duration: this.state.duration,
        event_coin: this.state.coin,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={globalStyle.form}>
            <View style={globalStyle.formRow}>
              <Text allowFontScaling={false} style={globalStyle.formText}>
                Title
              </Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                onChangeText={(title) => this.setState({ title })}
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text allowFontScaling={false} style={globalStyle.formText}>
                Content
              </Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                onChangeText={(content) => this.setState({ content })}
              />
            </View>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.setState({ picker: true })}>
              <View style={globalStyle.formRow}>
                <Text allowFontScaling={false} style={globalStyle.formText}>
                  Start Time
                </Text>
                <Text allowFontScaling={false} style={globalStyle.formText}>
                  {this.state.starTime || 'Select Date'}
                </Text>
              </View>
            </TouchableHighlight>
            <View style={globalStyle.formRow}>
              <Text allowFontScaling={false} style={globalStyle.formText}>
                Estimated Duration
              </Text>
              <TextInput
                style={{ ...globalStyle.formInput }}
                placeholder="Please input ..."
                onChangeText={(duration) => this.setState({ duration })}
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text allowFontScaling={false} style={globalStyle.formText}>
                UpCoin
              </Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="ex 100/h"
                onChangeText={(coin) => this.setState({ coin })}
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text allowFontScaling={false} style={globalStyle.formText}>
                Estimated UpCoin
              </Text>
              <Text allowFontScaling={false} style={globalStyle.formText}>
                {this.state.duration * this.state.coin || 0}
              </Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: '#3eb96e' }}
              underlayColor="transparent"
              onPress={() => this.createEvent()}>
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
        <View style={{ display: this.state.picker ? 'flex' : 'none' }}>
          <DatePicker
            // cancelText="取消"
            // confirmText="确定"
            defaultDate={new Date()}
            maxDate={'2057-03-25'}
            monthDisplayMode={'digit'}
            // yearSuffix={'年'}
            // monthSuffix={'月'}
            // daySuffix={'日'}
            cancel={() => {
              this.setState({ picker: false });
            }}
            confirm={(starTime) => {
              this.setState({ starTime, picker: false });
            }}
          />
        </View>
      </>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
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

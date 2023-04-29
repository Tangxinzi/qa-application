import React, { Component } from 'react';
import Moment from 'moment';
import ViewSwiper from 'react-native-swiper';
import Ionicons from '@expo/vector-icons/Ionicons';
import Api from '../../../components/Api';
import { faker } from '@faker-js/faker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  DeviceEventEmitter,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

export default class Days extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userinfo: {},
      days: [],
    };

    this.getUserinfo();
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
  }

  async getUserinfo() {
    var userinfo = await AsyncStorage.getItem('userinfo');
    userinfo = JSON.parse(userinfo);
    this.setState({ userinfo });
    this.fetchData();
  }

  fetchData() {
    fetch(Api.uri + '/api/v2/user/sign?user_id=' + this.state.userinfo._id)
      .then((response) => response.json())
      .then((days) => {
        console.log(days);
        this.setState({
          days,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.contents}>
          {this.state.days.map((item, key) => {
            return (
              <View style={styles.content}>
                <View style={styles.contentMain}>
                  <Text
                    allowFontScaling={false}
                    style={styles.title}
                    numberOfLines={1}>
                    {item.day}
                  </Text>
                </View>
                <View style={styles.contentFoot}>
                  <Text allowFontScaling={false} style={{ color: 'grey' }}>
                    {Moment(item.created_at).format('YYYY-MM-DD hh:mm:ss')}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {},
  tool: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    marginBottom: 0.5,
    padding: 10,
    backgroundColor: '#FFF',
  },
  title: {
    fontWeight: '600',
    marginBottom: 5,
  },
  contentFoot: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

import React, { Component } from 'react';
import Moment from 'moment';
import ViewSwiper from 'react-native-swiper';
import Ionicons from '@expo/vector-icons/Ionicons';
import Api from '../../../components/Api';
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

export default class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userinfo: {},
      questions: [],
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
    fetch(Api.uri + '/api/v2/question?user_id=' + this.state.userinfo._id, {
      // method: 'GET',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          questions: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.tool}>
          <Text allowFontScaling={false}>
            {this.state.questions.length} Question
          </Text>
          <TouchableHighlight style={styles.button}>
            <>
              <Text allowFontScaling={false}>Like</Text>
              <Text
                allowFontScaling={false}
                style={{ marginLeft: 20, fontWeight: '500' }}>
                Time
              </Text>
            </>
          </TouchableHighlight>
        </View>
        <View style={styles.contents}>
          {this.state.questions.map((item, key) => {
            return (
              <View style={styles.content}>
                <View style={styles.contentMain}>
                  <Text
                    allowFontScaling={false}
                    style={styles.title}
                    numberOfLines={1}>
                    {item.question_name} {item.question_title}
                  </Text>
                  <Text allowFontScaling={false} numberOfLines={2}>
                    {item.question_description || 'description...'}
                  </Text>
                </View>
                <View style={styles.contentFoot}>
                  <Text allowFontScaling={false} style={{ color: 'gray' }}>
                    80 Likes · 95 Comments
                  </Text>
                  <Text allowFontScaling={false} style={{ color: 'gray' }}>
                    {Moment(item.created_at).format('YYYY-MM-DD')}
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
import React, { Component } from 'react';
import Api from '../components/Api';
import None from '../components/None';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
moment.localeData('en');
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

    this.state = {
      userinfo: {},
      count: 0,
      data: {
        sum: 0,
        coins: [],
      },
    };

    this.getUserinfo();
  }

  async getUserinfo() {
    // set local storage
    var userinfo = await AsyncStorage.getItem('userinfo');
    userinfo = userinfo ? JSON.parse(userinfo) : {};
    this.setState({ userinfo });

    // get user info
    this.fetchUserCoin();
  }

  fetchUserCoin() {
    fetch(Api.uri + '/api/v2/coin?user_id=' + this.state.userinfo._id, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#FFF'} />
        <View
          style={{
            ...styles.coin,
            display: this.state.data.coins.length ? 'flex' : 'none',
          }}>
          <Text allowFontScaling={false} style={styles.coinNum}>
            {this.state.data.sum}
          </Text>
          <Text
            allowFontScaling={false}
            style={{ marginBottom: 4, fontWeight: '600' }}>
            Upcoin
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.lists}>
            {!this.state.data.coins.length ? <None /> : <></>}
            {this.state.data.coins.map((item, key) => {
              return (
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => {
                    switch (item.coin_type) {
                      case 'Question':
                        this.props.navigation.navigate('Question Content', {
                          id: item.related_id,
                        });
                        break;
                    }
                  }}>
                  <View style={styles.list}>
                    <View style={styles.listRow}>
                      <Text
                        allowFontScaling={false}
                        style={{ fontWeight: '600' }}>
                        {item.coin_type}
                      </Text>
                      <Text allowFontScaling={false} style={styles.listCoinNum}>
                        +{item.num || 0}
                      </Text>
                    </View>
                    <Text
                      allowFontScaling={false}
                      style={{ color: '#333', marginTop: 5, marginBottom: 5 }}>
                      {item.content || ''}
                    </Text>
                    <View style={styles.listRow}>
                      <Text allowFontScaling={false} style={styles.listCoinNum}>
                        {moment(item.created_at).format('YYYY-MM-DD HH:mm')}
                      </Text>
                      <Ionicons
                        style={{ display: item.data ? 'flex' : 'none' }}
                        name="chevron-forward-outline"
                        size={10}
                      />
                    </View>
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
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
    // backgroundColor: '#f4511e',
    alignItems: 'center',
  },
  coinNum: {
    fontSize: 36,
    // color: '#FFF',
    fontWeight: '600',
    marginBottom: 15,
  },
  content: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginTop: -15,
  },

  // lists
  list: {
    // paddingLeft: 2,
    // paddingRight: 2,
    paddingTop: 10,
    paddingBottom: 10,
    // marginBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CCC',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

module.exports = LearnCoin;

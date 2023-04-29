import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import Ionicons from '@expo/vector-icons/Ionicons';
import Api from '../../components/Api';
import Avatar from '../../components/Avatar';
import ActionSheet from 'react-native-actionsheet';
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

class Teacher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userinfo: {},
      tabActive: 'Post',
      tabs: ['Post', 'Discussion', 'Live', 'Record', 'Comments'],
    };

    this.fetchUserinfo(this.props.route.params.uid);
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
  }

  fetchUserinfo(uid) {
    fetch(Api.uri + '/api/v2/user/info/' + uid, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((userinfo) => {
        this.setState({
          userinfo,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.head}>
          <Image
            resizeMode="cover"
            style={styles.teacherImage}
            source={{
              uri: this.state.userinfo.avatar
                ? Api.uri + this.state.userinfo.avatar
                : Api.avatar,
            }}
          />
          <View style={{ flex: 1 }}></View>
          <View style={styles.headerButton}>
            <Text style={{ color: '#FFF' }}>+ Follow</Text>
          </View>
          <View style={styles.headIcon}>
            <Ionicons name="mail" size={18} />
          </View>
        </View>
        <View style={styles.userinfo}>
          <Text style={styles.username}>
            {this.state.userinfo.user_name || ''}
          </Text>
          <Text>
            {this.state.userinfo.other
              ? this.state.userinfo.other.description
              : ''}
          </Text>
        </View>
        <View style={styles.userData}>
          {[0, 1, 2, 3].map((item, key) => {
            return (
              <View style={styles.data}>
                <Text style={styles.dataNum}>{item + 1}</Text>
                <Text>data</Text>
              </View>
            );
          })}
        </View>
        <ScrollView
          style={styles.tabs}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {this.state.tabs.map((item, key) => {
            return (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => this.setState({ tabActive: item })}>
                <Text
                  style={{
                    ...styles.tabText,
                    borderBottomColor:
                      this.state.tabActive == item ? '#000' : '#FFF',
                  }}
                  allowFontScaling={false}>
                  {item}
                </Text>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    padding: 15,
    backgroundColor: '#FFF',
  },
  head: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  headerButton: {
    marginLeft: 10,
    height: 30,
    width: 88,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'green',
  },
  headIcon: {
    marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CCC',
    borderWidth: 1,
  },
  teacherImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  username: { fontSize: 18, fontWeight: '600', marginBottom: 5 },
  userData: {
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  data: {
    alignItems: 'center',
  },
  dataNum: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 5,
  },

  // tabs
  tabs: {
    flexDirection: 'row',
  },
  tabText: {
    marginRight: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
  },
};

module.exports = Teacher;

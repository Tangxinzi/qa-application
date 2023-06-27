import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import Ionicons from '@expo/vector-icons/Ionicons';
import Api from '../../components/Api';
import Avatar from '../../components/Avatar';
import None from '../../components/None';
import ActionSheet from 'react-native-actionsheet';
import moment from 'moment';
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

let { width, height } = Dimensions.get('window');

class Teacher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.route.params
        ? this.props.route.params.uid
        : '6465f2bf7c4c7354a3b8988a',
      follow: false,
      userinfo: {},
      count: [],
      tabActive: 'Comments',
      tabs: ['Post', 'Discussion', 'Live', 'Record', 'Comments'],
      data: [],
    };

    this.fetchUserinfo();
    this.fetchUserdata();
    this.fetchComments();
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
  }

  async fetchUserinfo() {
    var userinfo = await AsyncStorage.getItem('userinfo');
    userinfo = JSON.parse(userinfo);

    fetch(
      `${Api.uri}/api/v2/user/info/${this.state.uid}?to_follow_id=${userinfo._id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
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

  fetchUserdata() {
    fetch(Api.uri + '/api/v2/user/data/' + this.state.uid, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((userdata) => {
        this.setState({
          count: userdata.count,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchComments() {
    fetch(Api.uri + '/api/v2/user/comment?user_id=' + this.state.uid, {
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

  async fetchFollow(follow_status) {
    var userinfo = await AsyncStorage.getItem('userinfo');
    userinfo = JSON.parse(userinfo);

    fetch(
      Api.uri +
        '/api/v2/user/follow?' +
        `user_id=${userinfo._id}&follow_id=${this.state.uid}&follow_status=${follow_status}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.fetchUserinfo();
        this.fetchUserdata();
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
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() =>
              this.state.userinfo.follow_status
                ? this.fetchFollow(false)
                : this.fetchFollow(true)
            }>
            <View style={styles.headerButton}>
              <Text style={{ color: '#FFF' }}>
                {this.state.userinfo.follow_status ? 'Unfollow' : 'Follow'}
              </Text>
            </View>
          </TouchableHighlight>
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
          {this.state.count.map((item, key) => {
            return (
              <View
                style={{
                  ...styles.data,
                  width: width / this.state.count.length,
                }}>
                <Text style={styles.dataNum}>{item.number}</Text>
                <Text>{item.text}</Text>
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
                onPress={() => {
                  this.setState({ tabActive: item });
                  if (item == 'Comments') {
                    this.fetchComments();
                  } else {
                    this.setState({
                      data: [],
                    });
                  }
                }}>
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
        {this.state.data.map((item, key) => {
          return (
            <View
              style={{
                backgroundColor: 'rgba(241, 241, 241, 0.5)',
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text allowFontScaling={false}>
                  {item.comment_content || ''}
                </Text>
                <Text allowFontScaling={false}>
                  {moment(item.created_at).format('YYYY-MM-DD')}
                </Text>
              </View>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() =>
                  this.props.navigation.navigate('Question Content', {
                    id: item.question_id,
                  })
                }>
                <View style={styles.commentContent}>
                  <Text allowFontScaling={false}>Question</Text>
                </View>
              </TouchableHighlight>
            </View>
          );
        })}
        {!this.state.data.length ? <None /> : <></>}
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
  // content
  commentContent: {
    backgroundColor: '#f1f1f1',
    width: '100%',
    flex: 1,
    padding: 4,
    marginTop: 10,
  },
};

module.exports = Teacher;

import React, { Component } from 'react';
import globalStyle from '../../assets/global-style';
import ViewSwiper from 'react-native-swiper';
import Ionicons from '@expo/vector-icons/Ionicons';
import Api from '../../components/Api';
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

class Me extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userinfo: {
        avatar: 'https://mart.ferer.net/web/statics/images/wx_avatar.png',
        other: {
          year: '',
          school: '',
        },
      },
      tabActive: 'Post',
      tabs: [
        {
          text: 'Questions',
          name: 'Question List',
          icon: 'receipt-outline',
          url: 'https://i.postimg.cc/hj6XjwXn/collect.png',
        },
        {
          text: 'Comments',
          name: 'Comment',
          icon: 'chatbubble-ellipses-outline',
          url: 'https://i.postimg.cc/L5QZzXCc/comment.png',
        },
        {
          text: 'Collect',
          name: 'Favorites',
          icon: 'star-outline',
          url: 'https://i.postimg.cc/hPGCYQmH/note.png',
        },
        {
          text: 'Events',
          name: 'Event List',
          icon: 'browsers-outline',
          url: 'https://i.postimg.cc/MXkv1QJv/post.png',
        },
        {
          text: 'Recent',
          name: 'Recent Views',
          icon: 'time-outline',
          url: 'https://i.postimg.cc/XJGwQ9FV/like.png',
        },
        {
          text: 'Notes',
          name: 'Notes',
          icon: 'calendar-outline',
          url: 'https://i.postimg.cc/dtdy7qRx/note.png',
        },
      ],
    };

    this.getUserinfo();
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('Change', () => {
      this.getUserinfo();
    });
  }

  async getUserinfo() {
    // set local storage
    var userinfo = await AsyncStorage.getItem('userinfo');
    userinfo = userinfo ? JSON.parse(userinfo) : {};
    this.setState({ userinfo });

    // get user info
    this.fetchUserinfo();

    this.props.navigation.setOptions({
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: 'transparent',
      },
    });
  }

  fetchUserinfo() {
    fetch(Api.uri + '/api/v2/user/info/' + this.state.userinfo._id, {
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
        <TouchableHighlight
          style={{}}
          activeOpacity={0.85}
          underlayColor="transparent"
          onPress={() =>
            this.props.navigation.navigate(
              this.state.userinfo._id ? 'Userinfo' : 'Login'
            )
          }>
          <View style={styles.head}>
            <Image
              resizeMode="cover"
              style={styles.teacherImage}
              source={{
                uri:
                  (this.state.userinfo.avatar
                    ? Api.uri + this.state.userinfo.avatar
                    : null) || Api.avatar,
              }}
            />
            <View style={styles.info}>
              <Text allowFontScaling={false} style={styles.username}>
                {this.state.userinfo._id
                  ? this.state.userinfo.user_name
                  : 'Login'}
              </Text>
              <Text allowFontScaling={false}>
                {this.state.userinfo._id
                  ? this.state.userinfo.user_identity
                  : 'Not logged in yet'}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        {this.state.userinfo ? (
          <>
            <View style={styles.userinfo}>
              <Text
                allowFontScaling={false}
                style={[styles.userinfoRow, { marginTop: 0 }]}>
                <Text style={styles.key} allowFontScaling={false}>School:</Text>
                <Text style={styles.value} allowFontScaling={false}>
                  {(this.state.userinfo._id &&
                    this.state.userinfo.other.school) ||
                    ''}
                </Text>
              </Text>
              <Text allowFontScaling={false} style={styles.userinfoRow}>
                <Text style={styles.key} allowFontScaling={false}>Year:</Text>
                <Text style={styles.value} allowFontScaling={false}>
                  {(this.state.userinfo.other &&
                    this.state.userinfo.other.year) ||
                    ''}
                </Text>
              </Text>
              <Text allowFontScaling={false} style={styles.userinfoRow}>
                <Text style={styles.key} allowFontScaling={false}>Major:</Text>
                <Text style={styles.value} allowFontScaling={false}>
                  {(this.state.userinfo.other &&
                    this.state.userinfo.other.major) ||
                    ''}
                </Text>
              </Text>
              <Text allowFontScaling={false} style={styles.userinfoRow}>
                <Text style={styles.key} allowFontScaling={false}>Country:</Text>
                <Text style={styles.value} allowFontScaling={false}>
                  {(this.state.userinfo.other &&
                    this.state.userinfo.other.country) ||
                    ''}
                </Text>
              </Text>
              <Text allowFontScaling={false} style={styles.userinfoRow}>
                <Text style={styles.key} allowFontScaling={false}>Focus Area:</Text>
                <Text style={styles.value} allowFontScaling={false}>
                  {(this.state.userinfo.other &&
                    this.state.userinfo.other.area) ||
                    ''}
                </Text>
              </Text>
              <Text allowFontScaling={false} style={styles.userinfoRow}>
                <Text style={styles.key} allowFontScaling={false}>Position:</Text>
                <Text style={styles.value} allowFontScaling={false}>
                  {(this.state.userinfo.other &&
                    this.state.userinfo.other.position) ||
                    ''}
                </Text>
              </Text>
              <Text allowFontScaling={false} style={styles.userinfoRow}>
                <Text style={styles.key} allowFontScaling={false}>Expected Salary:</Text>
                <Text style={styles.value} allowFontScaling={false}>
                  {(this.state.userinfo.other &&
                    this.state.userinfo.other.es) ||
                    ''}
                </Text>
              </Text>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() =>
                  this.props.navigation.navigate('User Status Edit')
                }>
                <Text
                  allowFontScaling={false}
                  style={[styles.userEdit, globalStyle.text]}>
                  Edit
                </Text>
              </TouchableHighlight>
            </View>
          </>
        ) : null}
        <View style={styles.userData}>
          {this.state.tabs.map((item, key) => {
            return (
              <TouchableHighlight
                style={styles.data}
                activeOpacity={0.85}
                underlayColor="transparent"
                onPress={() => this.props.navigation.navigate(item.name)}>
                <>
                  <Image
                    resizeMode="contain"
                    style={{ width: 40, height: 40 }}
                    source={{
                      uri: item.url,
                    }}
                  />
                  <Text allowFontScaling={false} style={styles.iconText}>
                    {item.text || ''}
                  </Text>
                </>
              </TouchableHighlight>
            );
          })}
        </View>
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
    alignItems: 'center',
  },
  info: {
    marginLeft: 10,
  },
  headerButton: {
    padding: 3,
    // width: 70,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
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
  username: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  userinfo: {
    marginTop: 10
    // backgroundColor: '#e6e6e6',
    // padding: 10,
    // borderRadius: 6,
  },
  userinfoRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
  userEdit: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  key: {
    width: 120,
    display: 'flex',
  },
  value: {
    marginLeft: 40,
    color: 'grey',
    display: 'flex',
  },
  userData: {
    // padding: 10,
    // display: 'flex',
    // margin: 10,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  data: {
    // marginLeft: 5,
    // marginRight: 5,
    // backgroundColor: '#CCC',
    // padding: 15,
    width: width / 5,
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#CCC',
  },
  dataNum: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 5,
  },
  iconText: {
    // flex: 1,
    textAlign: 'center',
    marginTop: 10,
  },
};

module.exports = Me;

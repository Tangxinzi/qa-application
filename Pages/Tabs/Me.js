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
        },
        {
          text: 'Comments',
          name: 'Comment',
          icon: 'chatbubble-ellipses-outline',
        },
        {
          text: 'Favorites',
          name: 'Favorites',
          icon: 'star-outline',
        },
        {
          text: 'Events',
          name: 'Event List',
          icon: 'browsers-outline',
        },
        {
          text: 'Recent',
          name: 'Recent Views',
          icon: 'time-outline',
        },
        {
          text: 'Notes',
          name: 'Notes',
          icon: 'calendar-outline',
        },
        {
          text: 'Topup',
          name: 'Topup',
          icon: 'help-circle-outline',
        },
        {
          text: 'Withdraw',
          name: 'Withdraw',
          icon: 'help-circle-outline',
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
    var userinfo = await AsyncStorage.getItem('userinfo');
    userinfo = userinfo ? JSON.parse(userinfo) : {};
    this.setState({ userinfo });

    this.props.navigation.setOptions({
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: 'transparent',
      }
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
      .then((data) => {
        this.setState({
          userinfo: data,
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
          style={styles.data}
          activeOpacity={0.85}
          underlayColor="transparent"
          onPress={() =>
            this.props.navigation.navigate(
              this.state.userinfo ? 'Userinfo' : 'Login'
            )
          }>
          <View style={styles.head}>
            <Image
              resizeMode="cover"
              style={styles.teacherImage}
              source={{
                uri:
                  (this.state.userinfo && this.state.userinfo.avatar
                    ? Api.uri + this.state.userinfo.avatar
                    : null) || Api.avatar,
              }}
            />
            <View style={styles.info}>
              <Text allowFontScaling={false} style={styles.username}>
                {this.state.userinfo ? this.state.userinfo.user_name : 'Login'}
              </Text>
              <Text allowFontScaling={false}>
                {this.state.userinfo ? this.state.userinfo.user_identity : 'Not logged in yet'}
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
                <Text style={styles.key}>School:</Text>
                <Text style={styles.value}>
                  {(this.state.userinfo.other &&
                    this.state.userinfo.other.school) ||
                    ''}
                </Text>
              </Text>
              <Text allowFontScaling={false} style={styles.userinfoRow}>
                <Text style={styles.key}>Year:</Text>
                <Text style={styles.value}>
                  {(this.state.userinfo.other &&
                    this.state.userinfo.other.year) ||
                    ''}
                </Text>
              </Text>
              <Text allowFontScaling={false} style={styles.userinfoRow}>
                <Text style={styles.key}>Major:</Text>
                <Text style={styles.value}>
                  {(this.state.userinfo.other &&
                    this.state.userinfo.other.major) ||
                    ''}
                </Text>
              </Text>
              <Text allowFontScaling={false} style={styles.userinfoRow}>
                <Text style={styles.key}>Country:</Text>
                <Text style={styles.value}>
                  {(this.state.userinfo.other &&
                    this.state.userinfo.other.country) ||
                    ''}
                </Text>
              </Text>
              <Text allowFontScaling={false} style={styles.userinfoRow}>
                <Text style={styles.key}>Focus Area:</Text>
                <Text style={styles.value}>
                  {(this.state.userinfo.other &&
                    this.state.userinfo.other.area) ||
                    ''}
                </Text>
              </Text>
              <Text allowFontScaling={false} style={styles.userinfoRow}>
                <Text style={styles.key}>Position:</Text>
                <Text style={styles.value}>
                  {(this.state.userinfo.other &&
                    this.state.userinfo.other.position) ||
                    ''}
                </Text>
              </Text>
              <Text allowFontScaling={false} style={styles.userinfoRow}>
                <Text style={styles.key}>Expected Salary:</Text>
                <Text style={styles.value}>
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
          {true &&
            this.state.tabs.map((item, key) => {
              return (
                <TouchableHighlight
                  style={styles.data}
                  activeOpacity={0.85}
                  underlayColor="transparent"
                  onPress={() => this.props.navigation.navigate(item.name)}>
                  <>
                    <Ionicons name={item.icon} size={20} />
                    <Text allowFontScaling={false} style={styles.iconText}>
                      {item.text || ''}
                    </Text>
                    <Ionicons name="chevron-forward-outline" size={20} />
                  </>
                </TouchableHighlight>
              );
            })}
        </View>
        <View style={styles.tabs}></View>
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
    backgroundColor: '#e6e6e6',
    padding: 10,
    borderRadius: 6,
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
    display: 'flex',
  },
  userData: {
    marginTop: 20,
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  data: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#CCC',
  },
  dataNum: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 5,
  },
  iconText: {
    flex: 1,
    marginLeft: 10,
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

module.exports = Me;

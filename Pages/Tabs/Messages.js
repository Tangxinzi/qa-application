import React, { Component } from 'react';
import globalStyle from '../../assets/global-style';
import ViewSwiper from 'react-native-swiper';
import Ionicons from '@expo/vector-icons/Ionicons';
import Api from '../../components/Api';
import { faker } from '@faker-js/faker';
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

export default class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userinfo: {},
      labels: [
        {
          text: 'All',
        },
        {
          text: 'Recent',
        },
        {
          text: 'Active Now',
        },
        {
          text: 'Academic Star',
        },
      ],
      labelActiveText: 'All',
      messages: [],
    };

    this.getUserinfo();
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
    // this.listener.remove();
    // this.interval.remove();
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('Change', () => {
      this.getUserinfo();
    });

    this.interval = this.props.navigation.addListener('focus', () => {
      this.getUserinfo();
    });
  }

  async getUserinfo() {
    const userinfo = await AsyncStorage.getItem('userinfo');
    this.setState({ userinfo: JSON.parse(userinfo) });
    this.fetchData();

    this.props.navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: 'transparent',
      },
    });
  }

  async fetchData() {
    await fetch(Api.uri + '/api/v2/chat?user_id=' + this.state.userinfo._id, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((messages) => {
        this.setState({
          messages: [
            // ...messages,
            {
              user: {
                _avatar:
                  'https://i.postimg.cc/HsQgM77P/WX20230426-214215-2x.png',
                user_name: 'AI Helper',
              },
              room: {
                _id: '',
                modified_at: '2023-04-25',
              },
              chat: {
                chat_content: 'Hope this can help you a lot.',
              },
              unread: 1,
            },
            {
              user: {
                _avatar: 'https://i.postimg.cc/NM30sqWy/2-4x.png',
                user_name: 'Amy Schneider',
              },
              room: {
                _id: '',
                modified_at: new Date(),
              },
              chat: {
                chat_content: 'Great to hear that!',
              },
              unread: 1,
            },
            {
              user: {
                _avatar: 'https://i.postimg.cc/d0cnyLrn/3-4x.png',
                user_name: 'Carlos Wilkins',
              },
              room: {
                _id: '',
                modified_at: '2023-04-26',
              },
              chat: {
                chat_content: 'Yeah. No problem.',
              },
              unread: 0,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.search}>
          <Ionicons name="search" size={18} color="#CCC" />
          <Text
            allowFontScaling={false}
            style={{ marginLeft: 10, color: '#CCC', flex: 1 }}>
            Search People
          </Text>
          <Ionicons name="add-circle-outline" size={18} color="#2276e9" />
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.labels}>
            {this.state.labels.map((item, key) => {
              return (
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => {
                    this.setState({ labelActiveText: item.text });
                    this.fetchData();
                  }}>
                  <View
                    style={{
                      ...styles.label,
                      backgroundColor:
                        this.state.labelActiveText == item.text
                          ? '#2276e9'
                          : 'transparent',
                      borderColor:
                        this.state.labelActiveText == item.text
                          ? '#2276e9'
                          : 'grey',
                    }}>
                    <Text
                      style={{
                        ...styles.labelText,
                        color:
                          this.state.labelActiveText == item.text
                            ? '#FFF'
                            : '#000',
                      }}
                      allowFontScaling={false}>
                      {item.text}
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.messages}>
          {this.state.messages.map((item, key) => {
            return (
              <TouchableHighlight
                key={key}
                style={styles.row}
                underlayColor="transparent"
                onPress={() =>
                  this.props.navigation.navigate('Chat', {
                    room_id: item.room._id,
                  })
                }>
                <>
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{
                      uri:
                        item.user && item.user.avatar
                          ? Api.uri + item.user.avatar
                          : item.user._avatar || Api.avatar,
                    }}
                  />
                  <View style={styles.rowContents}>
                    <View style={styles.rowContent}>
                      <Text
                        allowFontScaling={false}
                        style={{ ...globalStyle.text, fontWeight: '600' }}>
                        {item.user ? item.user.user_name : ''}
                      </Text>
                      <Text allowFontScaling={false} style={styles.text}>
                        {moment(item.room.modified_at).toNow()}
                      </Text>
                    </View>
                    <View style={styles.rowContent}>
                      <Text
                        allowFontScaling={false}
                        numberOfLines={1}
                        style={{ width: '84%', color: 'grey' }}>
                        {item.chat && item.chat.chat_content
                          ? item.chat.chat_content
                          : 'Send a message'}
                      </Text>
                      <View
                        style={{
                          ...styles.unread,
                          display: item.unread ? 'flex' : 'none',
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={{ color: '#FFF', fontSize: 9 }}>
                          {item.unread}
                        </Text>
                      </View>
                    </View>
                  </View>
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
    // backgroundColor: '#FFF',
  },
  search: {
    backgroundColor: '#e6e6e6',
    borderRadius: 14,
    marginLeft: 14,
    marginRight: 14,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labels: {
    padding: 15,
    flexDirection: 'row',
  },
  label: {
    color: '#000',
    // backgroundColor: '#e6e6e6',
    marginRight: 8,
    padding: 6,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  labelText: {},
  row: {
    marginLeft: 12,
    marginRight: 12,
    paddingTop: 12,
    paddingBottom: 12,
    // backgroundColor: '#FFF',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e6e6e6',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {},
  rowContents: {
    flex: 1,
    height: 46,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  rowContent: {
    // backgroundColor: '#CCC',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  rowRead: {
    borderRadius: '50%',
    width: 20,
    height: 20,
    lineHeight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'red',
  },
  unread: {
    width: 17,
    height: 17,
    // padding: 4,
    marginLeft: 5,
    borderRadius: 16,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

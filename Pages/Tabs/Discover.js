import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import globalStyle from '../../assets/global-style';
import Api from '../../components/Api';
import Avatar from '../../components/Avatar';
import moment from 'moment';
import { faker } from '@faker-js/faker';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  DeviceEventEmitter,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

let { width, height } = Dimensions.get('window');

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: [
        {
          text: 'Question',
        },
        {
          text: 'Post',
        },
        {
          text: 'Discussion',
        },
        {
          text: 'Live',
        },
        {
          text: 'Record',
        },
      ],
      labelActiveText: 'Question',
      tabs: [
        {
          text: 'New',
        },
        {
          text: 'Hot',
        },
        {
          text: 'Unresolved',
        },
      ],
      tabActiveText: 'New',
      questions: [],
    };

    this.fetchData();
    this.getUserinfo();
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('Change', () => {
      this.fetchData();
      this.getUserinfo();
    });

    this.interval = this.props.navigation.addListener('focus', () => {
      this.fetchData();
      this.getUserinfo();
    });
  }

  async getUserinfo() {
    var userinfo = await AsyncStorage.getItem('userinfo');
    userinfo = userinfo ? JSON.parse(userinfo) : {};
    this.setState({ userinfo });

    this.props.navigation.setOptions({
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: 'transparent',
      },
      headerLeft: (props) => (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() =>
            this.props.navigation.navigate(userinfo._id ? 'Userinfo' : 'Login')
          }>
          <Avatar {...userinfo} />
        </TouchableHighlight>
      ),
    });
  }

  fetchData() {
    fetch(
      `${
        Api.uri
      }/api/v2/discover?type=${this.state.labelActiveText.toLowerCase()}&sort=${this.state.tabActiveText.toLocaleLowerCase()}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (this.state.labelActiveText == 'Question') {
          this.setState({
            questions: data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onPress = () => {
    try {
      this.props.navigation.navigate('Discover Content', {
        id: 10,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
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
                          : '#e6e6e6',
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
        <View style={styles.tabs}>
          {this.state.tabs.map((item, key) => {
            return (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => {
                  this.setState({ tabActiveText: item.text });
                  this.fetchData();
                }}>
                <View
                  style={{
                    ...styles.tabText,
                    ...(this.state.tabActiveText == item.text
                      ? styles.tabActiveText
                      : ''),
                  }}>
                  <Text allowFontScaling={false}>{item.text}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
        <View style={styles.questions}>
          {this.state.questions.map((item, key) => {
            return (
              <TouchableOpacity
                key={key}
                underlayColor="transparent"
                onPress={() =>
                  this.props.navigation.navigate('Question Content', {
                    id: item._id,
                  })
                }>
                <View style={styles.row}>
                  <View style={styles.headUserRow}>
                    <Image
                      resizeMode="cover"
                      style={styles.rowAvatar}
                      source={{
                        uri:
                          (item.userinfo[0] && item.userinfo[0].avatar
                            ? Api.uri + item.userinfo[0].avatar
                            : null) || Api.avatar,
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.rowTitle} allowFontScaling={false} numberOfLines={2}>
                        {item.question_name} {item.title}
                      </Text>
                      <Text style={styles.userName} allowFontScaling={false}>
                        {item.userinfo[0] ? item.userinfo[0].user_name : ''} ·{' '}
                        {moment(item.created_at).toNow()}
                      </Text>
                    </View>
                    <Ionicons
                      name={
                        item.question_solve
                          ? 'checkmark-circle'
                          : 'help-circle-outline'
                      }
                      color={item.question_solve ? 'green' : '#000'}
                      size={20}
                    />
                  </View>
                  <View style={styles.rowContent}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{ width: width * 0.55 }}>
                        <Text allowFontScaling={false} numberOfLines={3}>
                          {item.question_detail || faker.lorem.text()}
                        </Text>
                      </View>
                      <View
                        style={{ ...styles.labels, marginTop: 10, padding: 0 }}>
                        {['ST1131', 'Statistic'].map((item, key) => {
                            return (
                              <Text
                                style={{ ...globalStyle.label }}
                                allowFontScaling={false}>
                                {item}
                              </Text>
                            );
                          })}
                      </View>
                    </View>
                    <Image
                      resizeMode="cover"
                      style={styles.image}
                      source={{ uri: item.file ? Api.uri + item.file : '' }}
                    />
                  </View>
                  <View style={styles.rowFoot}>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      Like {item.like || 0}
                    </Text>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      ·
                    </Text>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      Reply {item.comment || 0}
                    </Text>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      ·
                    </Text>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      Read {item.question_view || 0}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
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
  labels: {
    padding: 15,
    flexDirection: 'row',
  },
  label: {
    color: '#000',
    backgroundColor: '#e6e6e6',
    marginRight: 8,
    padding: 6,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 8,
  },
  labelText: {},

  // tabs
  tabs: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  tabText: {
    marginRight: 30,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActiveText: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },

  // rows
  rows: {},
  row: {
    padding: 15,
    borderWidth: 0,
    borderTopWidth: 7.5,
    borderTopColor: '#e6e6e6',
    backgroundColor: '#FFF',
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  rowTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 3,
  },
  rowAvatar: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginRight: 8,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    marginLeft: 10,
    width: width * 0.3,
    height: 65,
    borderRadius: 6,
  },
  headUserRow: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 12,
    flex: 1,
    color: 'grey',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 18,
    marginRight: 10,
  },
  rowFoot: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowFootText: {
    fontSize: 12,
    marginRight: 10,
    color: 'grey',
  },
};

module.exports = Home;

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
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

// http://www.dailynews.lk/line/bbc
const Posts = [
  {
    title: `Kipyegon: How Kenyan achieved mother of all feats in Tokyo`,
    image: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
  },
  {
    title: `Thailand cave rescue: Boys 'could be in cave for months'`,
    image: 'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
  },
];

class Courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: Posts,
      labelsActive: 'Tutors',
      labels: [
        {
          text: 'Tutors',
        },
        {
          text: 'Event',
        },
      ],
      sortByColumn: {
        index: 0,
        text: ['Edit', 'Cancel'],
      },
      tutors: [],
      event: [],
    };

    this.fetchData();
    this.getUserinfo();
  }

  fetchEventData() {
    fetch(Api.uri + `/api/v2/event`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((event) => {
        this.setState({
          event,
        });
      })
      .catch((error) => {
        console.log(error);
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
    fetch(Api.uri + '/api/v2/user/tutors')
      .then((response) => response.json())
      .then((tutors) => {
        this.setState({
          tutors,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.swiperContainer}>
          <ViewSwiper
            autoplay
            autoplayTimeout={4}
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  width: 20,
                  height: 3,
                  margin: 2,
                  borderRadius: 2,
                  bottom: -25,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: '#ffffff',
                  width: 20,
                  height: 3,
                  margin: 2,
                  borderRadius: 2,
                  bottom: -25,
                }}
              />
            }
            paginationStyle={{ bottom: 40 }}>
            {this.state.lists.map((item, key) => {
              if (key < 3) {
                return (
                  <TouchableHighlight
                    key={key}
                    style={styles.swiperTouch}
                    activeOpacity={0.9}
                    underlayColor="none"
                    onPress={() => {
                      this.props.navigation.navigate('Detail', { index: key });
                    }}>
                    <>
                      <Image
                        resizeMode="cover"
                        style={styles.swiperImage}
                        source={{ uri: item.image }}
                      />
                      <Text
                        allowFontScaling={false}
                        numberOfLines={1}
                        style={styles.swiperTitle}>
                        {item.title}
                      </Text>
                    </>
                  </TouchableHighlight>
                );
              }
            })}
          </ViewSwiper>
        </View>
        <View style={styles.labels}>
          {this.state.labels.map((item, key) => {
            return (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => {
                  this.setState({ labelsActive: item.text });
                  item.text == 'Tutors'
                    ? this.fetchData()
                    : this.fetchEventData();
                }}>
                <View
                  style={{
                    ...styles.label,
                    backgroundColor:
                      this.state.labelsActive == item.text
                        ? '#b0b0b0'
                        : '#e6e6e6',
                  }}>
                  <Text style={styles.labelText} allowFontScaling={false}>
                    {item.text}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}
          <Ionicons style={styles.labelIcon} name="filter" size={20} />
        </View>

        <View
          style={{
            ...styles.teachers,
            display: this.state.labelsActive == 'Tutors' ? 'flex' : 'none',
          }}>
          {this.state.tutors.map((item, key) => {
            return (
              <View style={styles.teacher}>
                <View style={styles.teacherHead}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() =>
                      this.props.navigation.navigate('Teacher', {
                        uid: item._id,
                      })
                    }>
                    <Image
                      resizeMode="cover"
                      style={styles.teacherImage}
                      source={{
                        uri: item.avatar ? Api.uri + item.avatar : Api.avatar,
                      }}
                    />
                  </TouchableHighlight>
                  <Text
                    style={styles.teacherUserName}
                    allowFontScaling={false}
                    onPress={() => this.props.navigation.navigate('Teacher')}>
                    {item.user_name}
                  </Text>
                  <View>
                    <Text allowFontScaling={false}>-%</Text>
                  </View>
                </View>
                <View style={styles.teacherCon}>
                  <Text style={styles.teacherLabel} allowFontScaling={false}>
                    Country: {item.other.country}
                  </Text>
                  <Text style={styles.teacherLabel} allowFontScaling={false}>
                    School: {item.other.school}
                  </Text>
                  <Text style={styles.teacherLabel} allowFontScaling={false}>
                    Job: {item.other.job}
                  </Text>
                  <Text style={styles.teacherLabel} allowFontScaling={false}>
                    Focus Area: {item.other.area}
                  </Text>
                </View>
                <Text style={styles.extLabel} allowFontScaling={false}>
                  {item.other.coin} Hour
                </Text>
              </View>
            );
          })}
        </View>
        <View
          style={{
            ...styles.teachers,
            display: this.state.labelsActive == 'Event' ? 'flex' : 'none',
          }}>
          {this.state.event.map((item, key) => {
            return (
              <View style={styles.teacher}>
                <View style={styles.teacherHead}>
                  <Text style={styles.teacherUserName} allowFontScaling={false}>
                    {item.event_title || ''}
                  </Text>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => this.ActionSheet.show()}>
                    <Ionicons
                      name="ellipsis-horizontal-circle-outline"
                      size={20}
                    />
                  </TouchableHighlight>
                </View>
                <View style={styles.teacherCon}>
                  <Text allowFontScaling={false}>
                    {item.event_content || ''}
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.teacherCon,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                  }}>
                  <Text allowFontScaling={false}>
                    Estimated UpCoin {item.event_coin * item.event_duration}
                  </Text>
                  <Text allowFontScaling={false}>
                    {item.event_start_time || ''}
                  </Text>
                </View>
                <ActionSheet
                  ref={(o) => (this.ActionSheet = o)}
                  title={'Select ...'}
                  options={this.state.sortByColumn.text}
                  cancelButtonIndex={1}
                  onPress={(index) => {
                    console.log(index);
                  }}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    // padding: 15,
  },

  // swiper
  swiperContainer: {
    margin: 15,
    height: 160,
    width: Dimensions.get('window').width - 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
    borderRadius: 8,
    overflow: 'hidden',
  },
  swiperTouch: {
    borderRadius: 5,
  },
  swiperImage: {
    width: Dimensions.get('window').width - 30,
    height: 160,
  },
  swiperTitle: {
    marginTop: 10,
    width: '80%',
    fontSize: 16,
    fontWeight: '600',
  },

  labels: {
    position: 'relative',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
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
  labelIcon: {
    position: 'absolute',
    right: 15,
  },
  labelText: {},
  // teacher
  teacher: {
    position: 'relative',
    margin: 15,
    marginTop: 0,
    padding: 15,
    paddingBottom: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  teacherHead: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 15,
  },
  teacherImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  teacherUserName: {
    flex: 1,
    fontWeight: '600',
  },
  teacherLabel: {
    marginBottom: 5,
  },
  extLabel: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
};

module.exports = Courses;

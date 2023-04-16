import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import moment from 'moment';
moment.localeData('en');
import Api from '../../components/Api';
import Avatar from '../../components/Avatar';
import ActionSheet from 'react-native-actionsheet';
import globalStyle from '../../assets/global-style';
import CameraView from '../../components/CameraView';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Modal,
  Image,
  ScrollView,
  Dimensions,
  DeviceEventEmitter,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

let { width, height } = Dimensions.get('window');

export default class Home extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      date: {
        userinfo: {},
        now: moment().weekday(1).format('YYYY'),
        month: moment().format('MMMM'),
        days: [
          {
            active: true,
            time: moment().weekday(1).format('DD'),
          },
          {
            active: false,
            time: moment().weekday(2).format('DD'),
          },
          {
            active: false,
            time: moment().weekday(3).format('DD'),
          },
          {
            active: false,
            time: moment().weekday(4).format('DD'),
          },
          {
            active: false,
            time: moment().weekday(5).format('DD'),
          },
          {
            active: false,
            time: moment().weekday(6).format('DD'),
          },
          {
            active: false,
            time: moment().weekday(7).format('DD'),
          },
        ],
      },
      status: false,
      questions: [],
    };

    this.fetchData();
    this.getUserinfo();
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('Change', () => {
      this.getUserinfo();
    });
  }

  async getUserinfo() {
    var userinfo = await AsyncStorage.getItem('userinfo');
    userinfo = JSON.parse(userinfo);
    this.setState({ userinfo });

    this.props.navigation.setOptions({
      headerLeft: (props) => (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() =>
            this.props.navigation.navigate(userinfo ? 'Userinfo' : 'Login')
          }>
          <Avatar {...userinfo} />
        </TouchableHighlight>
      ),
    });
  }

  fetchData() {
    fetch(Api.uri + '/api/question?type=json')
      .then((response) => response.json())
      .then((questions) => {
        this.setState({
          questions,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result) {
      this.props.navigation.navigate('Ask Question', { assets: result });
    }
  }

  setStatus(value) {
    this.setState({
      status: value,
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.blocks}>
          <TouchableHighlight
            style={{ ...styles.block, backgroundColor: '#5e9dff' }}
            underlayColor="transparent"
            onPress={() => this.ActionSheet.show()}>
            <>
              <Ionicons name="search-outline" color="#FFF" size={48} />
              <Text style={styles.blockText} allowFontScaling={false}>
                Find Solution
              </Text>
            </>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...styles.block, backgroundColor: '#ff8b85' }}
            underlayColor="transparent"
            onPress={() => this.props.navigation.navigate('Note Share')}>
            <>
              <Ionicons name="reader-outline" color="#FFF" size={48} />
              <Text style={styles.blockText} allowFontScaling={false}>
                Share Notes
              </Text>
            </>
          </TouchableHighlight>
        </View>
        <Modal
          animationType="fade"
          visible={this.state.status}
          onRequestClose={() => this.setState({ status: false })}>
          <ScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <CameraView {...this.props} setStatus={this.setStatus.bind(this)} />
            <TouchableHighlight
              underlayColor="transparent"
              style={{ position: 'absolute', left: 30, top: 50 }}
              onPress={() => this.setState({ status: false })}>
              <Ionicons name={'close-circle'} color="#FFF" size={30} />
            </TouchableHighlight>
          </ScrollView>
        </Modal>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={'Select ...'}
          options={['Pick Image', 'Camera', 'Cancel']}
          cancelButtonIndex={2}
          onPress={(index) => {
            console.log(this.props.navigation);
            index == 0 ? this.pickImage() : '';
            index == 1 ? this.setState({ status: true }) : '';
          }}
        />
        <View style={styles.calendar}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            allowFontScaling={false}>
            <Text
              allowFontScaling={false}
              style={{ ...styles.blockText, color: '#000' }}>
              {this.state.date.month}
            </Text>
            <Text
              allowFontScaling={false}
              style={{ ...styles.blockText, color: '#2276e9' }}>
              {this.state.date.now}
            </Text>
          </View>
          <View style={styles.days}>
            <Text allowFontScaling={false}>Mon</Text>
            <Text allowFontScaling={false}>Tue</Text>
            <Text allowFontScaling={false}>Wed</Text>
            <Text allowFontScaling={false}>Thu</Text>
            <Text allowFontScaling={false}>Fri</Text>
            <Text allowFontScaling={false}>Sat</Text>
            <Text allowFontScaling={false}>Sun</Text>
          </View>
          <View style={styles.days}>
            {this.state.date.days.map((item, key) => {
              return (
                <View style={styles.day}>
                  <Text
                    style={{
                      ...styles.dayText,
                      backgroundColor: item.active ? '#2276e9' : '#e3e3e3',
                      color: item.active ? '#FFF' : '#000',
                    }}
                    allowFontScaling={false}>
                    {item.time}
                  </Text>
                  <View
                    style={{
                      display: 'none',
                      position: 'absolute',
                      bottom: 2,
                      left: 13,
                      backgroundColor: item.active ? '#FFF' : 'transparent',
                      borderRadius: 3,
                      height: 3,
                      width: 3,
                    }}></View>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.questions}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() =>
              this.props.navigation.navigate('Question Content', {
                id: '121',
              })
            }>
            <View style={styles.question}>
              <View style={styles.questionHead}>
                <Text
                  style={{
                    ...styles.questionLabel,
                    color: '#FFF',
                    backgroundColor: 'red',
                  }}
                  allowFontScaling={false}>
                  Easy
                </Text>
                <Text
                  numberOfLines={1}
                  style={styles.questionHeadTitle}
                  allowFontScaling={false}>
                  0. item 0
                </Text>
                <Ionicons name={'help-circle-outline'} size={20} />
              </View>
              <View style={styles.questionCon}>
                <Text
                  numberOfLines={2}
                  style={styles.questionHeadLabel}
                  allowFontScaling={false}>
                  tip...
                </Text>
              </View>
              <View style={styles.questionFoot}>
                <Text style={styles.questionLabel} allowFontScaling={false}>
                  ST1131
                </Text>
                <Text style={styles.questionLabel} allowFontScaling={false}>
                  statistics
                </Text>
                <View style={{ flex: 1 }}></View>
                <Text
                  style={{ ...styles.questionLabel, marginRight: 0 }}
                  allowFontScaling={false}>
                  Solve
                </Text>
              </View>
            </View>
          </TouchableHighlight>
          {this.state.questions.map((item, key) => {
            return (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() =>
                  this.props.navigation.navigate('Question Content', {
                    id: item.question_id,
                  })
                }>
                <View style={styles.question}>
                  <View style={styles.questionHead}>
                    <Text
                      style={{
                        ...styles.questionLabel,
                        color: '#FFF',
                        backgroundColor:
                          item.question_level == 0
                            ? 'green'
                            : item.question_level == 1
                            ? 'orange'
                            : 'red',
                      }}
                      allowFontScaling={false}>
                      {!item.question_level ? 'Easy' : ''}
                      {item.question_level == 0 ? 'Easy' : ''}
                      {item.question_level == 1 ? 'Medium' : ''}
                      {item.question_level == 2 ? 'Hard' : ''}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={styles.questionHeadTitle}
                      allowFontScaling={false}>
                      {key + 1}. {item.question_name} {item.question_title}
                    </Text>
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
                  <View style={styles.questionCon}>
                    <Text
                      numberOfLines={2}
                      style={styles.questionHeadLabel}
                      allowFontScaling={false}>
                      {item.question_tips}
                    </Text>
                  </View>
                  <View style={styles.questionFoot}>
                    <Text style={styles.questionLabel} allowFontScaling={false}>
                      ST1131
                    </Text>
                    <Text style={styles.questionLabel} allowFontScaling={false}>
                      statistics
                    </Text>
                    <View style={{ flex: 1 }}></View>
                    <Text
                      style={{ ...styles.questionLabel, marginRight: 0 }}
                      allowFontScaling={false}>
                      Solve
                    </Text>
                  </View>
                </View>
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
  },

  // blocks
  blocks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  block: {
    width: (width - 15 * 2) / 2.1,
    height: 130,
    backgroundColor: '#FFF',
    padding: 20,
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'space-around',
  },
  blockLine: {
    height: 10,
  },
  blockText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },

  // calendar
  calendar: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  days: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  day: {
    position: 'relative',
  },
  dayText: {
    fontSize: 14,
    width: 28,
    height: 28,
    lineHeight: 28,
    borderRadius: 14,
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: '#e3e3e3',
  },

  // question
  questions: {
    paddingBottom: 30,
  },
  question: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  questionHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionHeadTitle: {
    flex: 1,
    fontWeight: '600',
  },
  questionCon: {
    marginTop: 6,
    marginBottom: 6,
  },
  questionLabel: {
    fontSize: 12,
    paddingLeft: 5,
    paddingRight: 5,
    width: 'auto',
    height: 18,
    lineHeight: 18,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 8,
    textAlign: 'center',
    color: '#333',
    backgroundColor: '#e6e6e6',
  },
  questionFoot: {
    flexDirection: 'row',
  },
};

module.exports = Home;

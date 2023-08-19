import React, { Component } from 'react';
import moment from 'moment';
import ViewSwiper from 'react-native-swiper';
import Api from '../../components/Api';
import globalStyle from '../../assets/global-style';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import RenderHtml from 'react-native-render-html';
import { faker } from '@faker-js/faker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Image,
  Share,
  Alert,
  TextInput,
  ScrollView,
  Dimensions,
  Platform,
  SafeAreaView,
  DeviceEventEmitter,
  KeyboardAvoidingView,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

let { width, height } = Dimensions.get('window');

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userinfo: {},
    };

    this.getUserinfo();
    this.fetchData(this.props.route.params.id);
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
  }

  async getUserinfo() {
    const userinfo = await AsyncStorage.getItem('userinfo');
    this.setState({ userinfo: JSON.parse(userinfo) });
    this.fetchUserinfo();
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

        this.props.route.params && this.props.route.params.id
          ? this.fetchData(this.props.route.params.id)
          : this.fetchData('643cefdb955a59768f1cacf5');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchData(id) {
    fetch(
      `${Api.uri}/api/v2/question/show/${id}?user_id=${this.state.userinfo._id}`
    )
      .then((response) => response.json())
      .then((question) => {
        this.setState({
          question: question[0],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async onShare() {
    try {
      const result = await Share.share({
        message: this.state.question.question_title || '',
      });

      AsyncStorage.getItem('coin')
        .then((coin) => {
          coin = coin ? coin : [];
          if (coin.length) {
            coin = JSON.parse(coin);
            coin.unshift({
              num: 400,
              date: moment().format('YYYY/MM/DD'),
              type: 'Share',
              content: 'Shared article 「...」',
              route: 'Note Share',
            });
            AsyncStorage.setItem('coin', JSON.stringify(coin));
          } else {
            AsyncStorage.setItem(
              'coin',
              JSON.stringify([
                {
                  num: 400,
                  date: moment().format('YYYY/MM/DD'),
                  type: 'Share',
                  content: 'Shared article 「...」',
                  route: 'Note Share',
                },
              ])
            );
          }
        })
        .catch((error) => {
          console.log('error', error);
        });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  async createComment(comment_content) {
    if (!this.state.userinfo._id) {
      this.props.navigation.navigate('Login');
      return;
    }

    await fetch(Api.uri + '/api/v2/comment/create', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question_id: this.state.question._id || '',
        user_id: this.state.userinfo._id || '',
        comment_content: comment_content || '',
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ comment: '' });
        this.fetchData(this.state.question._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async onStar() {
    if (!this.state.userinfo._id) {
      this.props.navigation.navigate('Login');
      return;
    }

    await fetch(Api.uri + '/api/v2/question/star', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question_id: this.state.question._id || '',
        user_id: this.state.userinfo._id || '',
        star_status: true,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.fetchData(this.state.question._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async onLike() {
    if (!this.state.userinfo._id) {
      this.props.navigation.navigate('Login');
      return;
    }

    await fetch(Api.uri + '/api/v2/question/like', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question_id: this.state.question._id || '',
        user_id: this.state.userinfo._id || '',
        like_status: true,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.fetchData(this.state.question._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async onChat() {
    if (!this.state.userinfo._id) {
      this.props.navigation.navigate('Login');
      return;
    }
    
    await fetch(Api.uri + '/api/v2/chat/create', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        room_name: '',
        from: this.state.userinfo._id || '',
        to: this.state.question.u_id || '',
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.props.navigation.navigate('Chat', { room_id: response._id });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.question) {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            position: 'relative',
          }}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={250}
            behavior={Platform.OS == 'ios' ? 'height' : 'height'}
            style={{ flex: 1 }}>
            <ScrollView>
              <View style={styles.main}>
                <Text style={styles.headTitleText} allowFontScaling={false}>
                  {this.state.question.question_name ||
                    this.state.question.question_title ||
                    'Unnamed'}
                </Text>
                <View style={styles.head}>
                  <View style={styles.headUser}>
                    <View style={styles.headUserRow}>
                      <Image
                        resizeMode="cover"
                        style={styles.headUserImage}
                        source={{
                          uri: this.state.question.userinfo[0].avatar
                            ? Api.uri + this.state.question.userinfo[0].avatar
                            : Api.avatar,
                        }}
                      />
                      <View style={{ flex: 1 }}>
                        <Text
                          style={styles.headUserName}
                          allowFontScaling={false}>
                          {this.state.question.userinfo[0].user_name}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text allowFontScaling={false} style={styles.text}>
                            {moment(this.state.question.created_at).format(
                              'YYYY-MM-DD'
                            )}
                          </Text>
                          <Text allowFontScaling={false} style={styles.text}>
                            ·
                          </Text>
                          <Text allowFontScaling={false} style={styles.text}>
                            Read {this.state.question.question_view || 0}
                          </Text>
                        </View>
                      </View>
                      <TouchableHighlight
                        style={styles.icon}
                        underlayColor="transparent"
                        onPress={() => this.onChat()}>
                        <Ionicons
                          name={'chatbubble-ellipses-sharp'}
                          color="skyblue"
                          size={30}
                        />
                      </TouchableHighlight>
                    </View>
                    <View style={styles.headUserRow}>
                      {faker.lorem
                        .words(5)
                        .split(' ')
                        .map((item, key) => {
                          return (
                            <Text
                              style={{ ...globalStyle.label, marginBottom: 7 }}
                              allowFontScaling={false}>
                              {item}
                            </Text>
                          );
                        })}
                    </View>
                  </View>
                </View>
                <View style={styles.content}>
                  <RenderHtml
                    style={{ fontSize: 14 }}
                    source={{
                      html:
                        this.state.question.question_detail ||
                        faker.lorem.text(),
                    }}
                  />
                  <Image
                    resizeMode="cover"
                    style={styles.contentImage}
                    source={{
                      uri: this.state.question.file
                        ? Api.uri + this.state.question.file
                        : Api.avatar,
                    }}
                  />
                </View>
              </View>
              <View style={styles.comments}>
                <Text
                  allowFontScaling={false}
                  style={{
                    padding: 15,
                    marginBottom: 0.5,
                    backgroundColor: '#FFF',
                  }}>
                  All Comments
                </Text>
                {this.state.question.comments.map((item, key) => {
                  return (
                    <View style={styles.comment}>
                      <View style={styles.commentHead}>
                        <Image
                          resizeMode="cover"
                          style={{
                            ...styles.headUserImage,
                            width: 30,
                            height: 30,
                          }}
                          source={{
                            uri: item.userinfo.avatar
                              ? Api.uri + item.userinfo.avatar
                              : Api.avatar,
                          }}
                        />
                        <View style={{ flex: 1 }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              flex: 1,
                            }}>
                            <View style={{ flexDirection: 'column' }}>
                              <Text
                                style={{ fontWeight: '600' }}
                                allowFontScaling={false}>
                                {item.userinfo.user_name}
                              </Text>
                              <Text
                                allowFontScaling={false}
                                style={{
                                  color: 'grey',
                                  fontSize: 12,
                                  marginTop: 2,
                                }}>
                                {moment(item.created_at).toNow()}
                              </Text>
                            </View>
                            <Ionicons
                              name={'ellipsis-horizontal-circle-outline'}
                              color="grey"
                              size={20}
                            />
                          </View>
                        </View>
                      </View>
                      <Text allowFontScaling={false} style={{ marginTop: 5 }}>
                        {item.comment_content || ''}
                      </Text>
                    </View>
                  );
                })}
                <View
                  style={{
                    display: !this.state.question.comments.length
                      ? 'flex'
                      : 'none',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    backgroundColor: '#FFF',
                    height: 150,
                    padding: 20,
                  }}>
                  <Ionicons
                    name="chatbox-ellipses-outline"
                    size={40}
                    color="grey"
                  />
                  <Text allowFontScaling={false}>
                    No one has commented yet.
                  </Text>
                </View>
              </View>
            </ScrollView>
            <View style={styles.pageBottom}>
              <TouchableHighlight
                style={styles.icon}
                underlayColor="transparent"
                onPress={() => this.onLike()}>
                <>
                  <AntDesign
                    name={
                      this.state.question.like &&
                      this.state.question.like.like_status
                        ? 'like1'
                        : 'like2'
                    }
                    size={20}
                    color={
                      this.state.question.like &&
                      this.state.question.like.like_status
                        ? 'skyblue'
                        : '#666'
                    }
                  />
                  <Text style={styles.iconText} allowFontScaling={false}>
                    {this.state.question.count[0]}
                  </Text>
                </>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.icon}
                underlayColor="transparent"
                onPress={() => this.onStar()}>
                <>
                  <AntDesign
                    name={
                      this.state.question.star &&
                      this.state.question.star.star_status
                        ? 'star'
                        : 'staro'
                    }
                    size={20}
                    color={
                      this.state.question.star &&
                      this.state.question.star.star_status
                        ? 'orange'
                        : '#666'
                    }
                  />
                  <Text style={styles.iconText} allowFontScaling={false}>
                    {this.state.question.count[0]}
                  </Text>
                </>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.icon}
                underlayColor="transparent"
                onPress={() => this.onShare()}>
                <>
                  <Ionicons name="share-outline" size={20} color="#666" />
                  <Text style={styles.iconText} allowFontScaling={false}>
                    Share
                  </Text>
                </>
              </TouchableHighlight>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Please input ..."
                  placeholderTextColor="#ccc"
                  value={this.state.comment || ''}
                  onChangeText={(comment) => this.setState({ comment })}
                  onSubmitEditing={() => {
                    this.createComment(this.state.comment);
                  }}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    }
  }
}

const styles = {
  container: {
    padding: 15,
  },
  // head
  head: {},
  headTitleText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15
  },
  headUser: {
    marginTop: 0,
  },
  headUserRow: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  headUserName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  headUserImage: {
    width: 40,
    height: 40,
    borderRadius: 18,
    marginRight: 10,
  },
  text: {
    marginRight: 10,
  },

  main: {
    backgroundColor: '#FFF',
    padding: 15,
  },

  // content
  content: {
    minHeight: 300,
  },
  contentImage: {
    width: '100%',
    height: 300,
    marginTop: 10,
    marginBottom: 10,
  },

  // comments
  comments: {
    marginTop: 10,
    marginBottom: 150,
  },
  comment: {
    backgroundColor: '#FFF',
    padding: 15,
    paddingTop: 15,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 10,
    borderBottomStyle: 'solid',
  },
  commentHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  // pageBottom
  pageBottom: {
    backgroundColor: '#FFF',
    borderTopColor: '#CCC',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: 15,
    paddingBottom: 30,
    // paddingBottom: 30,
    // position: 'fixed',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    backgroundColor: '#e2e2e2',
    padding: 8,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    width: width * 0.5,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    marginTop: 1,
    fontSize: 8,
    color: 'grey',
    textAlign: 'center',
  },
};

module.exports = Question;

import React, { Component } from 'react';
import moment from 'moment';
import ViewSwiper from 'react-native-swiper';
import globalStyle from '../assets/global-style';
import Ionicons from '@expo/vector-icons/Ionicons';
import RenderHtml from 'react-native-render-html';
import Api from '../components/Api';
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
  KeyboardAvoidingView,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

let { width, height } = Dimensions.get('window');

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: {
        _id: '6424392dfd52a54afb9db4aa',
        question_title: 'Sum of two numbers',
        question_tips: 'tips tips...',
        question_detail:
          "<p>↗️ Hey, it's me again</p><p>Remember what we mentioned in the last issue about the preparation before the written exam, some assessment focuses that need attention, how to prepare for the written exam, and finally prepared a nine-day review plan for the students, I don't know if you have reviewed steadily according to the plan, and now it is the first few days?</p><p><br></p><p>Students who need to make up lessons can click Portal 👉🏻: How much do you know about written test skills Written Exam Preparation Guide</p><p><br></p><p>In this issue, Study Jun will take an in-depth study of the knowledge about data structures and algorithms often encountered in written exams.</p>",
        question_status: '1',
        question_level: '0',
        question_catalog_id: '',
        question_id: '1',
      },
      comments: [
        {
          avatar:
            'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
          name: 'Andy',
          comment: 'good',
          date: '2023-03-22',
        },
        {
          avatar:
            'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
          name: 'Tom',
          comment: 'nice',
          date: '2023-03-22',
        },
        {
          avatar:
            'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
          name: 'Andy',
          comment: 'good',
          date: '2023-03-22',
        },
        {
          avatar:
            'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
          name: 'Tom',
          comment: 'nice',
          date: '2023-03-22',
        },
      ],
    };

    // console.log(props.route.params.id);
    // props.route.params.id = 1
    // this.fetchData('6424392dfd52a54afb9db4aa');
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

  onStar() {
    const question = this.state.question;
    question.star = !question.star;
    this.setState({
      question,
    });

    AsyncStorage.getItem('coin')
      .then((coin) => {
        coin = coin ? coin : [];
        if (coin.length) {
          coin = JSON.parse(coin);
          coin.unshift({
            num: 100,
            date: moment().format('YYYY/MM/DD'),
            type: 'Star',
            content: 'Star content',
            route: 'Comment',
          });
          AsyncStorage.setItem('coin', JSON.stringify(coin));
        } else {
          AsyncStorage.setItem(
            'coin',
            JSON.stringify([
              {
                num: 100,
                date: moment().format('YYYY/MM/DD'),
                type: 'Star',
                content: 'Star content',
                route: 'Comment',
              },
            ])
          );
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  async onLike() {
    const question = this.state.question;
    question.like = !question.like;
    this.setState({
      question,
    });

    AsyncStorage.getItem('coin')
      .then((coin) => {
        coin = coin ? coin : [];
        if (coin.length) {
          coin = JSON.parse(coin);
          coin.unshift({
            num: 100,
            date: moment().format('YYYY/MM/DD'),
            type: 'Like',
            content: 'Like content',
            route: 'Comment',
          });
          AsyncStorage.setItem('coin', JSON.stringify(coin));
        } else {
          AsyncStorage.setItem(
            'coin',
            JSON.stringify([
              {
                num: 100,
                date: moment().format('YYYY/MM/DD'),
                type: 'Like',
                content: 'Like content',
                route: 'Comment',
              },
            ])
          );
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  fetchData(id) {
    fetch(
      Api.uri +
        `/api/question/show/${id}?type=json&relation_type=question&relation_user_id=TlzPsHCm6g5R8h6UCT5fxQHFoEqDa3sC`
    )
      .then((response) => response.json())
      .then((question) => {
        this.setState({
          question,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          paddingBottom: 15,
          position: 'relative',
        }}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={250}
          behavior={Platform.OS == 'ios' ? 'height' : 'height'}
          style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.head}>
                <View style={styles.headUser}>
                  <View style={styles.headUserRow}>
                    <Image
                      resizeMode="cover"
                      style={styles.headUserImage}
                      source={{
                        uri: 'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
                      }}
                    />
                    <View>
                      <Text
                        style={styles.headUserName}
                        allowFontScaling={false}>
                        User name
                      </Text>
                      <Text allowFontScaling={false}>read · date · from</Text>
                    </View>
                  </View>
                  <View style={styles.headUserRow}>
                    <Text style={globalStyle.label}>1212</Text>
                    <Text style={globalStyle.label}>1212</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.headTitleText} allowFontScaling={false}>
                {this.state.question.question_title || 'Unnamed'}
              </Text>
              <View style={styles.content}>
                <RenderHtml
                  source={{ html: this.state.question.question_detail || '' }}
                />
              </View>
            </View>
            <View style={styles.comments}>
              <Text allowFontScaling={false}>All Comments</Text>
              {this.state.comments.map((item, key) => {
                return (
                  <View
                    style={{
                      ...styles.headUserRow,
                      alignItems: 'flex-start',
                      marginTop: 15,
                      marginBottom: 0,
                    }}>
                    <Image
                      resizeMode="cover"
                      style={{ ...styles.headUserImage, width: 30, height: 30 }}
                      source={{
                        uri: item.avatar,
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
                        <Text
                          style={{ fontWeight: '600' }}
                          allowFontScaling={false}>
                          {item.name}
                        </Text>
                        <Text allowFontScaling={false}>{item.date}</Text>
                      </View>
                      <Text allowFontScaling={false} style={{ marginTop: 5 }}>
                        {item.comment}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <View style={styles.pageBottom}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Please input ..."
                placeholderTextColor="#ccc"
                value={this.state.comment || ''}
                onChangeText={(comment) => this.setState({ comment })}
                onSubmitEditing={() => {
                  const comments = this.state.comments;
                  comments.unshift({
                    avatar:
                      'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
                    name: 'Tony',
                    comment: this.state.comment || 'nice',
                    date: 'Now',
                  });
                  this.setState({ comments, comment: '' });
                }}
              />
            </View>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.onLike()}>
              <Ionicons
                name={this.state.question.like ? 'heart' : 'heart-outline'}
                size={20}
                color={this.state.question.like ? 'red' : '#666'}
              />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.onStar()}>
              <Ionicons
                name={this.state.question.star ? 'star' : 'star-outline'}
                size={20}
                color={this.state.question.star ? 'orange' : '#666'}
              />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.onShare()}>
              <Ionicons name="share-outline" size={20} color="#666" />
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    padding: 15,
    backgroundColor: '#FFF',
  },
  // head
  head: {},
  headTitleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headUser: {
    marginTop: 10,
  },
  headUserRow: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
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

  // content
  content: {
    minHeight: 300,
  },

  // comments
  comments: {
    marginTop: 10,
    padding: 15,
    marginBottom: 150,
    backgroundColor: '#FFF',
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
    // paddingBottom: 30,
    // position: 'fixed',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {},
  input: {
    flex: 1,
    width: width * 0.5,
  },
};

module.exports = Question;

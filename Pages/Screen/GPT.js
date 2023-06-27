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
  Platform,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  DeviceEventEmitter,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

class GPT extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      room_id: this.props.route.params
        ? this.props.route.params.room_id
        : '6440adf23aed62486a5aa77a',
      userinfo: {},
      to: {},
      chat_content: '',
      data: {
        room: {},
        users: [],
      },
      messages: [],
    };

    this.listContent(this.state.room_id);
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
  }

  async listContent(user_id) {
    fetch(Api.uri + '/api/v2/chat/chatgpt/list?user_id=' + user_id)
      .then((response) => response.json())
      .then((messages) => {
        this.setState({
          messages,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async saveContent(user_id, user_role, chat_content) {
    fetch(Api.uri + '/api/v2/chat/chatgpt/save', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        user_role,
        chat_content,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.listContent(this.state.room_id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async send() {
    this.saveContent(this.state.room_id, 'user', this.state.chat_content);

    await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        Authorization:
          'Bearer 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',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: this.state.chat_content || '介绍一下 OpenAI',
          },
        ],
        // "max_tokens": 70,
        temperature: 0,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.saveContent(
          this.state.room_id,
          'assistant',
          data.choices[0].message.content
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: 15 }}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={250}
          behavior={Platform.OS == 'ios' ? 'height' : 'height'}
          style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            <View style={styles.rows}>
              {this.state.messages.map((item, key) => {
                if (item.user_role == 'user') {
                  return (
                    <View style={styles.row} key={key}>
                      <View style={styles.rowHeadRight}>
                        <View style={styles.rowUserRight}>
                          <Text allowFontScaling={false}>User</Text>
                        </View>
                        <Image
                          resizeMode="cover"
                          style={styles.image}
                          source={{
                            uri: Api.avatar,
                          }}
                        />
                      </View>
                      <View style={styles.rowHeadRight}>
                        <View style={styles.rowUserRight}>
                          <Text
                            style={styles.rowConRight}
                            allowFontScaling={false}>
                            {item.chat_content}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.row} key={key}>
                      <View style={styles.rowHeadLeft}>
                        <Image
                          resizeMode="cover"
                          style={styles.image}
                          source={{
                            uri: 'https://i.postimg.cc/HsQgM77P/WX20230426-214215-2x.png',
                          }}
                        />
                        <View style={styles.rowUserLeft}>
                          <Text allowFontScaling={false}>AI Helper</Text>
                        </View>
                      </View>
                      <View style={styles.rowHeadLeft}>
                        <Text
                          allowFontScaling={false}
                          style={styles.rowConLeft}>
                          {item.chat_content}
                        </Text>
                      </View>
                    </View>
                  );
                }
              })}
            </View>
          </ScrollView>

          <View style={styles.bottom}>
            <TextInput
              allowFontScaling={false}
              style={styles.textInput}
              placeholder="Input content ..."
              clearButtonMode="while-editing"
              keyboardType="text"
              defaultValue={this.state.chat_content || ''}
              placeholderTextColor="grey"
              onChangeText={(chat_content) => this.setState({ chat_content })}
              returnKeyType="send"
              onSubmitEditing={() => {
                this.setState({ chat_content: '' });
                this.send();
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    padding: 15,
  },

  // bottom
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#CCC',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  textInput: {
    height: 25,
    lineHeight: 25,
    flex: 1,
    marginRight: 15,
  },
  pickImage: {
    borderColor: 'grey',
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // row
  rows: {
    paddingBottom: 130,
  },
  row: {
    marginBottom: 15,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  rowHeadLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowUserLeft: {
    marginLeft: 10,
    marginBottom: 10,
  },
  rowConLeft: {
    width: 'auto',
    overflow: 'hidden',
    borderColor: '#CCC',
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: -5,
    marginLeft: 40,
    marginRight: 80,
    backgroundColor: '#FFF',
    padding: 10,
    textAlign: 'left',
  },
  rowHeadRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rowUserRight: {
    marginRight: 10,
    marginBottom: 10,
  },
  rowConRight: {
    width: 'auto',
    overflow: 'hidden',
    borderColor: '#CCC',
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: -5,
    marginRight: 30,
    marginLeft: 80,
    backgroundColor: '#FFF',
    padding: 10,
    textAlign: 'right',
  },
};

module.exports = GPT;

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

class Chats extends React.Component {
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
        chats: [],
      },
    };

    this.getUserinfo();
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
    clearInterval(this.stopTimer());
    // this.timer.delete();
  }

  componentDidMount() {
    this.timer = this.launchTimer();
  }

  launchTimer = () => {
    this.timer = setInterval(() => this.fetchData(), 1000);
  };

  stopTimer = () => {
    console.log('stoooop');
    clearInterval(this.timer);
  };

  async getUserinfo() {
    const userinfo = await AsyncStorage.getItem('userinfo');
    this.setState({ userinfo: JSON.parse(userinfo) });
    this.fetchData();
  }

  fetchData() {
    fetch(`${Api.uri}/api/v2/chat/show/${this.state.room_id}`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.users.map((item) => {
          if (item._id != this.state.userinfo._id) {
            this.setState({
              to: item,
            });
          }
        });
        this.setState({
          data,
        });
      })
      .catch((err) => {
        console.log(err);
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

    console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri);
    }
  }

  async send() {
    await fetch(`${Api.uri}/api/v2/chat/send/${this.state.room_id}`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.userinfo._id || '',
        chat_type: 'text',
        chat_content: this.state.chat_content || '',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.fetchData();
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
              {this.state.data &&
                this.state.data.chats.map((item, key) => {
                  if (item.user_id == this.state.userinfo._id) {
                    return (
                      <View style={styles.row} key={key}>
                        <View style={styles.rowHeadRight}>
                          <View style={styles.rowUserRight}>
                            <Text allowFontScaling={false}>
                              {this.state.userinfo.user_name || ''}
                            </Text>
                          </View>
                          <Image
                            resizeMode="cover"
                            style={styles.image}
                            source={{
                              uri:
                                (this.state.userinfo.avatar
                                  ? Api.uri + this.state.userinfo.avatar
                                  : null) || Api.avatar,
                            }}
                          />
                        </View>
                        <View style={styles.rowHeadRight}>
                          <View style={styles.rowUserRight}>
                            <Text style={styles.rowConRight}>
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
                              uri: this.state.to.avatar
                                ? Api.uri + this.state.to.avatar
                                : Api.avatar,
                            }}
                          />
                          <View style={styles.rowUserLeft}>
                            <Text allowFontScaling={false}>
                              {this.state.to.user_name}
                            </Text>
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
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.pickImage()}
              style={styles.pickImage}>
              <Ionicons name="image-outline" size={18} color="grey" />
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

module.exports = Chats;

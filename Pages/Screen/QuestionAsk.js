import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import Api from '../../components/Api';
import globalStyle from '../../assets/global-style';
import Ionicons from '@expo/vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  DeviceEventEmitter,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

class QuestionAsk extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      params: this.props.route.params,
      lists: [],
      userinfo: {
        other: {
          year: '',
          school: '',
        },
      },
    };

    this.upload();
    this.getUserinfo();
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('Change', () => {
      this.getUserinfo();
    });
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
      .then((data) => {
        this.setState({
          userinfo: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  upload() {
    let formdata = new FormData();
    formdata.append('file', {
      uri: this.state.params.assets.uri || '',
    });

    console.log(Api.uri + '/api/v2/file/upload');
    fetch(Api.uri + '/api/v2/file/upload', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createQuestion() {
    fetch(Api.uri + '/api/v2/question/create', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.userinfo._id,
        question_name: this.state.moduleName || '',
        question_code: this.state.moduleCode || '',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.props.navigation.navigate('Discover');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.swiperContainer}>
          <Image
            resizeMode="cover"
            style={styles.swiperImage}
            source={{
              uri:
                this.state.params.assets.uri ||
                'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
            }}
          />
        </View>
        <View style={styles.container}>
          <View style={globalStyle.form}>
            <TouchableHighlight underlayColor="transparent">
              <View style={globalStyle.formRow}>
                <Text style={globalStyle.formText}>Country</Text>
                <TextInput
                  style={globalStyle.formInput}
                  placeholder="Please input ..."
                  defaultValue={
                    (this.state.userinfo.other &&
                      this.state.userinfo.other.country) ||
                    ''
                  }
                  placeholderTextColor="#CCC"
                  onChangeText={(value) => {
                    var userinfo = this.state.userinfo;
                    userinfo.other.country = value;
                    this.setState({ userinfo });
                  }}
                />
              </View>
            </TouchableHighlight>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>School</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                defaultValue={
                  (this.state.userinfo.other &&
                    this.state.userinfo.other.school) ||
                  ''
                }
                placeholderTextColor="#CCC"
                onChangeText={(value) => {
                  var userinfo = this.state.userinfo;
                  userinfo.other.school = value;
                  this.setState({ userinfo });
                }}
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Module Name</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                placeholderTextColor="#CCC"
                onChangeText={(moduleName) => this.setState({ moduleName })}
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Module Code</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                placeholderTextColor="#CCC"
                onChangeText={(moduleCode) => this.setState({ moduleCode })}
              />
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: '#3eb96e' }}
              onPress={() => this.createQuestion()}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                Confirm
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              underlayColor="transparent"
              onPress={() => this.props.navigation.goBack()}>
              <Text allowFontScaling={false} style={styles.buttonText}>
                Cancel
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    minHidth: Dimensions.get('window').height,
  },

  // swiper
  swiperContainer: {
    // height: 160,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
  },
  swiperTouch: {
    borderRadius: 5,
  },
  swiperImage: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  swiperTitle: {
    marginTop: 10,
    width: '80%',
    fontSize: 16,
    fontWeight: '600',
  },

  // bottons
  buttons: {
    alignItems: 'center',
    position: 'relative',
    marginTop: 100,
  },
  button: {
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCC',
    width: 120,
    height: 40,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
};

module.exports = QuestionAsk;

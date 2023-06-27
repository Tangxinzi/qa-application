import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import Api from '../../components/Api';
import globalStyle from '../../assets/global-style';
import Ionicons from '@expo/vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import { faker } from '@faker-js/faker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Image,
  Modal,
  Platform,
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
      file: this.props.route.params.assets,
      // file: '',
      lists: [],
      modalVisible: false,
      userinfo: {
        other: {
          year: '',
          school: '',
        },
      },
    };

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

  async upload() {
    const data = new FormData();
    data.append('image', {
      name: 'image',
      uri:
        Platform.OS === 'android'
          ? this.state.file
          : this.state.file.uri.replace('file://', ''),
    });

    await fetch(Api.uri + '/api/v2/tool/ocr', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        Type: 'application/octet-stream',
        Accept: 'application/json',
      },
      body: data,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.errno == 0) {
          this.setState({
            upload: response.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async createQuestion() {
    await this.upload();
    var question_detail = '';
    this.state.upload.ocr.words_result.map(
      (item) => (question_detail += item.words)
    );

    await fetch(Api.uri + '/api/v2/question/create', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.userinfo._id,
        question_name: this.state.moduleName || '',
        question_code: this.state.moduleCode || '',
        question_detail: question_detail || '',
        file: this.state.upload.image.fileSrc || '',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('create success.');
        this.props.navigation.navigate('Discover');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}>
          <View style={{ ...styles.moda, marginTop: 50, padding: 20 }}>
            <Text
              style={{ fontSize: 20, fontWeight: '600', marginBottom: 10 }}
              allowFontScaling={false}>
              Find Question
            </Text>
            <Image
              resizeMode="cover"
              style={{ marginTop: 10, width: '100%', height: 130 }}
              source={{
                uri: this.state.file.uri || '',
              }}
            />
            <Text
              // numberOfLines={2}
              style={styles.questionHeadLabel}
              allowFontScaling={false}>
              No relevant answers found
            </Text>
            <Image
              resizeMode="cover"
              style={{
                display: 'none',
                marginTop: 10,
                marginBottom: 10,
                width: '100%',
                height: 130,
              }}
              source={{
                uri: faker.image.image(),
              }}
            />
          </View>
          <View
            style={{
              ...styles.buttons,
              // flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: '#3eb96e' }}
              onPress={() => this.createQuestion()}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                AI Helper
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              underlayColor="transparent"
              onPress={() => this.setState({ modalVisible: false })}>
              <Text allowFontScaling={false} style={styles.buttonText}>
                Academic Star
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
        </Modal>
        <View style={styles.swiperContainer}>
          <Image
            resizeMode="cover"
            style={styles.swiperImage}
            source={{
              uri: this.state.file.uri || '',
            }}
          />
        </View>
        <View style={styles.container}>
          <View style={globalStyle.form}>
            <TouchableHighlight underlayColor="transparent">
              <View style={globalStyle.formRow}>
                <Text style={globalStyle.formText} allowFontScaling={false}>
                  Country
                </Text>
                <TextInput
                  style={globalStyle.formInput}
                  placeholder="Please input ..."
                  allowFontScaling={false}
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
              <Text style={globalStyle.formText} allowFontScaling={false}>
                School
              </Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                allowFontScaling={false}
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
              <Text style={globalStyle.formText} allowFontScaling={false}>
                Module Name
              </Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                allowFontScaling={false}
                placeholderTextColor="#CCC"
                onChangeText={(moduleName) => this.setState({ moduleName })}
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText} allowFontScaling={false}>
                Module Code
              </Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                allowFontScaling={false}
                placeholderTextColor="#CCC"
                onChangeText={(moduleCode) => this.setState({ moduleCode })}
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText} allowFontScaling={false}>
                User
              </Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                allowFontScaling={false}
                placeholderTextColor="#CCC"
                value={this.state.userinfo._id}
              />
            </View>
          </View>
          <View
            style={{
              ...styles.buttons,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableHighlight
              style={{
                ...styles.button,
                backgroundColor: '#3eb96e',
                width: 140,
              }}
              onPress={() => this.setState({ modalVisible: true })}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                Find Question
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...styles.button,
                backgroundColor: '#3eb96e',
                width: 140,
              }}
              onPress={() => this.createQuestion()}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                Create Question
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

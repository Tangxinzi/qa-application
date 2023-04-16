import React, { Component } from 'react';
import Api from '../../../components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Image,
  Alert,
  Linking,
  StatusBar,
  ScrollView,
  Dimensions,
  FlatList,
  SectionList,
  Platform,
  TextInput,
  RefreshControl,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
  DeviceEventEmitter,
  TouchableHighlight,
} from 'react-native';

let { width, height } = Dimensions.get('window');

export default class Userinfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userinfo: {},
    };

    this.getUserinfo();
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <Image
              style={styles.avatar}
              source={{
                uri: this.state.userinfo.avatar || Api.avatar,
              }}
            />
            <Text allowFontScaling={false} style={{ fontSize: 16 }}>
              {this.state.userinfo.user_name || ''}
            </Text>
          </View>
          <View style={styles.textSubmitFoot}>
            <TouchableHighlight
              underlayColor="transparent"
              style={{
                backgroundColor: 'skyblue',
                width: 145,
                height: 46,
                justifyContent: 'center',
                borderRadius: 23,
              }}
              onPress={() => {
                AsyncStorage.removeItem('userinfo');
                this.props.navigation.navigate('Login');
              }}>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.9)',
                  textAlign: 'center',
                  marginHorizontal: 16,
                }}>
                LOGOUT
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
    height: height - 120,
    position: 'relative',
    padding: 30,
    width: '100%',
    justifyContent: 'space-around',
  },
  row: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    borderColor: '#d3d6d9',
    borderWidth: 1,
    padding: 15,
    marginTop: 10,
    fontWeight: '700',
    borderRadius: 1,
    color: '#111',
    textAlign: 'left',
  },
  textSubmitFoot: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
  },
  textInputContainer: {
    width: '100%',
    marginBottom: 30,
  },
};

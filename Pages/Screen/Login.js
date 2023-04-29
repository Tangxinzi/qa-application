import React, { Component } from 'react';
import Api from '../../components/Api';
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

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '123456789@qq.com',
      password: '123456789',
    };
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
  }

  fetchLogin() {
    fetch(Api.uri + `/api/v2/user/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_email: this.state.email,
        user_password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((userinfo) => {
        alert(userinfo)
        AsyncStorage.setItem('userinfo', JSON.stringify(userinfo));
        this.props.navigation.navigate('Home')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <View style={styles.login}>
            <KeyboardAvoidingView keyboardVerticalOffset={10}>
              <View style={styles.textInputContainer}>
                <Text
                  allowFontScaling={false}
                  style={{ color: 'rgb(51, 51, 51)' }}>
                  Email Address
                </Text>
                <TextInput
                  allowFontScaling={false}
                  style={styles.textInput}
                  placeholder="For eg. name@example.com"
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  defaultValue={this.state.email}
                  placeholderTextColor="#CCC"
                  onChangeText={(email) => this.setState({ email })}
                />
              </View>
              <View style={styles.textInputContainer}>
                <Text
                  allowFontScaling={false}
                  style={{ color: 'rgb(51, 51, 51)' }}>
                  Password
                </Text>
                <TextInput
                  allowFontScaling={false}
                  style={styles.textInput}
                  placeholder=""
                  clearButtonMode="while-editing"
                  password={true}
                  defaultValue={this.state.password}
                  placeholderTextColor="#CCC"
                  secureTextEntry
                  onChangeText={(password) => this.setState({ password })}
                />
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => {
                    var url = 'https://www.baidu.com/';
                    Linking.canOpenURL(url)
                      .then((supported) => {
                        if (!supported) {
                          console.warn("Can't handle url: " + url);
                        } else {
                          return Linking.openURL(url);
                        }
                      })
                      .catch((err) => console.error('An error occurred', url));
                  }}>
                  <Text
                    allowFontScaling={false}
                    style={{ marginTop: 15, color: 'grey', fontWeight: '700' }}>
                    Forgot password?
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.textSubmitFoot}>
                <TouchableHighlight
                  underlayColor="transparent"
                  style={{
                    backgroundColor:
                      this.state.email != '' && this.state.password != ''
                        ? 'skyblue'
                        : 'grey',
                    width: 145,
                    height: 46,
                    justifyContent: 'center',
                    borderRadius: 23,
                  }}
                  onPress={() => {
                    if (this.state.email != '' && this.state.password != '') {
                      this.fetchLogin();
                    }
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
                    LOGIN
                  </Text>
                </TouchableHighlight>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    position: 'relative',
    padding: 30,
    width: '100%',
    backgroundColor: '#FFF',
  },
  login: {
    position: 'relative',
    padding: 0,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
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

module.exports = Login;

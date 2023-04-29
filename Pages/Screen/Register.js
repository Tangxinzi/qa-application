import React, { Component } from 'react';
import Api from '../../components/Api';
import Ionicons from '@expo/vector-icons/Ionicons';
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
  KeyboardAvoidingView,
  ActivityIndicator,
  DeviceEventEmitter,
  TouchableHighlight,
} from 'react-native';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      user_identity: false
    };
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
  }

  fetchRegister() {
    fetch(Api.uri + `/api/v2/user/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_email: this.state.email,
        user_name: this.state.username,
        user_password: this.state.password,
        user_identity: this.state.user_identity ? 'Tutor' : '',
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.props.navigation.goBack();
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
                  Username
                </Text>
                <TextInput
                  allowFontScaling={false}
                  style={styles.textInput}
                  placeholder="For eg. name"
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  defaultValue={this.state.username}
                  placeholderTextColor="#CCC"
                  onChangeText={(username) => this.setState({ username })}
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
              </View>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() =>
                  this.setState({
                    user_identity: !this.state.user_identity,
                  })
                }>
                <Text>
                  <Ionicons
                    name={
                      this.state.user_identity
                        ? 'checkmark-circle-outline'
                        : 'ellipse-outline'
                    }
                    color="#666"
                    size={20}
                    style={{ position: 'relative', top: 2, marginRight: 5 }}
                  />
                  <Text style={{ color: '#666' }} allowFontScaling={false}>tutor identity</Text>
                </Text>
              </TouchableHighlight>
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
                      this.fetchRegister();
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
                    REGISTER
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

module.exports = Register;

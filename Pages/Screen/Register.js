import React, { Component } from 'react';
import Api from '../../components/Api';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  DeviceEventEmitter,
  TouchableHighlight,
} from 'react-native';
import Button from '../../components/Button';
import TextInputContainer from '../../components/TextInputContainer';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required('email is required.'),
  username: Yup.string().required('username is required.'),
  password: Yup.string()
    .label('password')
    .min(6)
    .max(12)
    .required('password is required.')
    .matches(/^\w+$/, 'Special characters present.'),
});

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      user_identity: false,
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
              <Formik
                onSubmit={(values) => {
                  alert(JSON.stringify(values, null, 3));
                  this.setState({
                    email: values.email,
                    username: values.username,
                    password: values.password,
                  })
                  Keyboard.dismiss();
                  this.fetchRegister();
                }}
                validationSchema={validationSchema}>
                {({ handleChange, handleSubmit, values, errors }) => (
                  <View>
                    <TextInputContainer
                      title={''}
                      onChangeText={handleChange('username')}
                      name="username"
                      value={values.username}
                      label="username"
                      placeholder={'Please enter your Username'}
                    />
                    {errors.username ? (
                      <Text style={{ color: 'red' }}>{errors.username}</Text>
                    ) : (
                      <></>
                    )}
                    <TextInputContainer
                      title={''}
                      onChangeText={handleChange('email')}
                      name="email"
                      value={values.email}
                      label="email"
                      placeholder={'Please enter your Email'}
                      password={false}
                      secureTextEntry={false}
                    />
                    {errors.email ? (
                      <Text style={{ color: 'red' }}>{errors.email}</Text>
                    ) : (
                      <></>
                    )}
                    <TextInputContainer
                      title={''}
                      onChangeText={handleChange('password')}
                      name="password"
                      value={values.password}
                      label="password"
                      placeholder={'Please enter your Password'}
                      password={true}
                      secureTextEntry={true}
                    />
                    {errors.password ? (
                      <Text style={{ color: 'red' }}>{errors.password}</Text>
                    ) : (
                      <></>
                    )}
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
                          style={{
                            position: 'relative',
                            top: 2,
                            marginRight: 5,
                          }}
                        />
                        <Text
                          style={{ color: '#666' }}
                          allowFontScaling={false}>
                          tutor identity
                        </Text>
                      </Text>
                    </TouchableHighlight>
                    <View style={styles.textSubmitFoot}>
                      <Button text="Create Account" onPress={handleSubmit} />
                      <TouchableHighlight
                        underlayColor="transparent"
                        style={{ marginTop: 20 }}
                        onPress={() => this.props.navigation.navigate('Login')}>
                        <Text>Go to Login.</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                )}
              </Formik>
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
    position: 'relative',
    // bottom: -230,
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

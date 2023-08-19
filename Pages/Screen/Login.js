import React, { Component } from 'react';
import Api from '../../components/Api';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
  password: Yup.string()
    .label('password')
    .min(3)
    .max(12)
    .required('password is required.')
    .matches(/^\w+$/, 'Special characters present.'),
});

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
  }

  fetchLogin() {
    fetch(Api.uri + `/api/v2/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_email: this.state.email,
        user_password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((userinfo) => {
        // alert(userinfo);
        AsyncStorage.setItem('userinfo', JSON.stringify(userinfo));
        this.props.navigation.popToTop('Home');
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
            <View style={styles.avatarContainer}>
              <Image
                resizeMode="cover"
                style={styles.avatar}
                source={{
                  uri: 'https://mart.ferer.net/web/statics/images/wx_avatar.png',
                }}
              />
            </View>
            <KeyboardAvoidingView keyboardVerticalOffset={10}>
              <Formik
                onSubmit={(values) => {
                  Keyboard.dismiss();
                  this.setState({
                    email: values.email,
                    password: values.password
                  })
                  this.fetchLogin();
                }}
                validationSchema={validationSchema}>
                {({ handleChange, handleSubmit, values, errors }) => (
                  <View>
                    <TextInputContainer
                      title={''}
                      onChangeText={handleChange('email')}
                      name="email"
                      value={values.email}
                      label="email"
                      placeholder={'Please enter your Email'}
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
                      secureTextEntry={false}
                    />
                    {errors.password ? (
                      <Text style={{ color: 'red' }}>{errors.password}</Text>
                    ) : (
                      <></>
                    )}
                    <View style={styles.textSubmitFoot}>
                      <Button text="Log In" onPress={handleSubmit} />
                      <TouchableHighlight
                        underlayColor="transparent"
                        style={{ marginTop: 20 }}
                        onPress={() =>
                          this.props.navigation.navigate('Register')
                        }>
                        <Text>No account yet, go to register.</Text>
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  login: {
    position: 'relative',
    padding: 0,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  textSubmitFoot: {
    position: 'relative',
    // bottom: -230,
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
  },
};

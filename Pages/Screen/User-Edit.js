import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import Api from '../../components/Api';
import globalStyle from '../../assets/global-style';
import Ionicons from '@expo/vector-icons/Ionicons';
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

class UserEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userinfo: {},
      tabActive: 'Study',
      tab: ['Study', 'Graduated', 'Resarch'],
    };

    this.getUserinfo();
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
  }

  async getUserinfo() {
    var userinfo = await AsyncStorage.getItem('userinfo');
    userinfo = JSON.parse(userinfo);
    this.setState({ userinfo, tabActive: userinfo.user_identity || 'Study' });
  }

  fetchData() {
    fetch(Api.uri + '/api/v2/user/info/' + this.state.userinfo._id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_identity: this.state.tabActive,
        other: {
          country: this.state.country || '',
          school: this.state.school || '',
          year: this.state.year || '',
          major: this.state.major || '',
          area: this.state.area || '',
          position: this.state.position || '',
          es: this.state.es || '',
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(this.state.tabActive, data);
        this.props.navigation.goBack()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <View style={styles.tab}>
          {this.state.tab.map((item, key) => {
            return (
              <TouchableHighlight
                style={{
                  ...styles.tabText,
                  borderBottomColor:
                    this.state.tabActive == item ? '#000' : '#FFF',
                }}
                underlayColor="transparent"
                onPress={() => this.setState({ tabActive: item })}>
                <Text allowFontScaling={false}>{item}</Text>
              </TouchableHighlight>
            );
          })}
        </View>
        <View
          style={{
            ...styles.container,
            display: this.state.tabActive == 'Study' ? 'flex' : 'none',
          }}>
          <View style={globalStyle.form}>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Country</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                onChangeText={(country) => this.setState({ country })}
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>School</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                onChangeText={(school) => this.setState({ school })}
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Year</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                onChangeText={(year) => this.setState({ year })}
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Major</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                onChangeText={(major) => this.setState({ major })}
              />
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: '#3eb96e' }}
              underlayColor="transparent"
              onPress={() => this.fetchData()}>
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
        <View
          style={{
            ...styles.container,
            display: this.state.tabActive == 'Graduated' ? 'flex' : 'none',
          }}>
          <View style={globalStyle.form}>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Area</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                onChangeText={(area) => this.setState({ area })}
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Position</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                onChangeText={(position) => this.setState({ position })}
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Expected Salary</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                onChangeText={(es) => this.setState({ es })}
              />
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: '#3eb96e' }}
              underlayColor="transparent"
              onPress={() => this.fetchData()}>
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
        <View
          style={{
            ...styles.container,
            display: this.state.tabActive == 'Resarch' ? 'flex' : 'none',
          }}>
          <View style={globalStyle.form}>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Area</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                onChangeText={(area) => this.setState({ area })}
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Position</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                onChangeText={(position) => this.setState({ position })}
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Expected Salary</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
                onChangeText={(es) => this.setState({ es })}
              />
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: '#3eb96e' }}
              underlayColor="transparent"
              onPress={() => this.fetchData()}>
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
      </>
    );
  }
}

const styles = {
  // tab
  tab: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabText: {
    // flex: 1,
    width: '33.3%',
    textAlign: 'center',
    padding: 15,
    borderBottomWidth: 1,
  },

  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
  },
  buttons: {
    alignItems: 'center',
    marginBottom: 100,
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

module.exports = UserEdit;

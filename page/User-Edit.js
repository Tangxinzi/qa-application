import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import globalStyle from '../assets/global-style';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

class UserEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabActive: 'Study',
      tab: ['Study', 'Graduated', 'Resarch'],
    };
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
        <View style={{...styles.container, display: this.state.tabActive == 'Study' ? 'flex' : 'none'}}>
          <View style={globalStyle.form}>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Country</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>School</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Year</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Major</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              style={{...styles.button, backgroundColor: '#3eb96e'}}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                Confirm
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                Cancel
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{...styles.container, display: this.state.tabActive == 'Graduated' ? 'flex' : 'none'}}>
          <View style={globalStyle.form}>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Area</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Position</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Expected Salary</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              style={{...styles.button, backgroundColor: '#3eb96e'}}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                Confirm
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                Cancel
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={{...styles.container, display: this.state.tabActive == 'Resarch' ? 'flex' : 'none'}}>
          <View style={globalStyle.form}>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Area</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Position</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Expected Salary</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight
              style={{...styles.button, backgroundColor: '#3eb96e'}}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                Confirm
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              underlayColor="transparent">
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
    justifyContent: 'space-between'
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

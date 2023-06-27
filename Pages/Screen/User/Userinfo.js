import React, { Component } from 'react';
import Api from '../../../components/Api';
import List from '../../../components/List';
import * as ImagePicker from 'expo-image-picker';
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
      file: {},
    };

    this.getUserinfo();
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('Change');
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

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      cropping: true,
    });

    if (result) {
      this.setState({ file: result });
      await this.upload();
    } else if (result.canceled) {
      Alert.alert('Tips', 'Are you sure you want to delete the image', [
        { text: 'Yes', onPress: () => null },
        { text: 'No' },
      ]);
    }
  }

  async upload() {
    const data = new FormData();
    data.append('file', {
      name: 'image',
      // type: 'image/png',
      uri:
        Platform.OS === 'android'
          ? this.state.file
          : this.state.file.uri.replace('file://', ''),
    });

    await fetch(Api.uri + '/api/v2/file/upload', {
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
          this.updateUserinfo(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async updateUserinfo(info) {
    await fetch(Api.uri + '/api/v2/user/info/' + this.state.userinfo._id, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'avatar',
        avatar: info.url,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        Alert.alert('Tips', 'Updated user avatar success', [
          { text: 'Yes', onPress: () => null },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.pickImage()}>
              <Image
                style={styles.avatar}
                source={{
                  uri:
                    (this.state.userinfo.avatar
                      ? Api.uri + this.state.userinfo.avatar
                      : null) ||
                    this.state.file.uri ||
                    Api.avatar,
                }}
              />
            </TouchableHighlight>
            <Text allowFontScaling={false} style={{ fontSize: 16 }}>
              {this.state.userinfo.user_name || ''}
            </Text>
          </View>

          <List
            text={'My Upcoin'}
            style={{ borderBottomWidth: 0 }}
            onPress={() => this.props.navigation.navigate('Upcoin')}
          />
          <List
            text={'Logout'}
            style={{ borderBottomWidth: 0 }}
            onPress={() => {
              AsyncStorage.removeItem('userinfo');
              this.props.navigation.navigate('Login');
            }}
          />
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
    height: 80,
    width: 80,
    borderRadius: 80,
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

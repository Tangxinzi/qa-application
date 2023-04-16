import React, { Component } from 'react';
import moment from 'moment';
import ViewSwiper from 'react-native-swiper';
import globalStyle from '../assets/global-style';
import Ionicons from '@expo/vector-icons/Ionicons';
import RenderHtml from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker';
import {
  Text,
  View,
  Image,
  Platform,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableHighlight,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';

let { width, height } = Dimensions.get('window');

class DiscoverContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      discover: {
        discover_title: '',
      },
      comments: [
        {
          avatar:
            'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
          name: 'Andy',
          comment: 'good',
          date: '2023-03-22',
        },
        {
          avatar:
            'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
          name: 'Tom',
          comment: 'nice',
          date: '2023-03-22',
        },
        {
          avatar:
            'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
          name: 'Andy',
          comment: 'good',
          date: '2023-03-22',
        },
        {
          avatar:
            'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
          name: 'Tom',
          comment: 'nice',
          date: '2023-03-22',
        },
      ],
    };
  }

  async pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri);
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.head}>
            <Text style={styles.headTitleText} allowFontScaling={false}>
              {this.state.discover.discover_title || 'Unnamed'}
            </Text>
            <View style={styles.headUser}>
              <View style={styles.headUserRow}>
                <Image
                  resizeMode="cover"
                  style={styles.headUserImage}
                  source={{
                    uri: 'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
                  }}
                />
                <View>
                  <Text style={styles.headUserName} allowFontScaling={false}>
                    User name
                  </Text>
                  <Text allowFontScaling={false}>read · date · from</Text>
                </View>
              </View>
              <View style={styles.headUserRow}>
                <Text style={globalStyle.label}>1212</Text>
                <Text style={globalStyle.label}>1212</Text>
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <RenderHtml
              source={{ html: this.state.discover.discover_detail || '' }}
            />
          </View>
        </View>
        <View style={styles.comments}>
          <Text allowFontScaling={false}>All Comments</Text>
          {this.state.comments.map((item, key) => {
            return (
              <View
                style={{
                  ...styles.headUserRow,
                  alignItems: 'flex-start',
                  marginTop: 15,
                  marginBottom: 0,
                }}>
                <Image
                  resizeMode="cover"
                  style={{ ...styles.headUserImage, width: 30, height: 30 }}
                  source={{
                    uri: item.avatar,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flex: 1,
                    }}>
                    <Text
                      style={{ fontWeight: '600' }}
                      allowFontScaling={false}>
                      {item.name}
                    </Text>
                    <Text allowFontScaling={false}>{item.date}</Text>
                  </View>
                  <Text allowFontScaling={false} style={{ marginTop: 5 }}>
                    {item.comment}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    padding: 15,
    backgroundColor: '#FFF',
  },
  // head
  head: {},
  headTitleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headUser: {
    marginTop: 10,
  },
  headUserRow: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headUserName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  headUserImage: {
    width: 40,
    height: 40,
    borderRadius: 18,
    marginRight: 10,
  },

  // content
  content: {
    minHeight: 300,
  },

  // comments
  comments: {
    marginTop: 10,
    padding: 15,
    marginBottom: 150,
    backgroundColor: '#FFF',
  },

  // pageBottom
  pageBottom: {
    backgroundColor: '#FFF',
    borderTopColor: '#CCC',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    width: '100%',
    // position: 'absolute',
    bottom: 0,
    padding: 15,
    // paddingBottom: 30,
    position: 'fixed',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {},
  input: {
    flex: 1,
    width: width * 0.5,
  },
};

module.exports = DiscoverContent;

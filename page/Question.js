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

let { width, height } = Dimensions.get('window');

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.head}>
            <Text style={styles.headTitleText} allowFontScaling={false}>
              Title Title Title Title Title
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
            <Text style={{ lineHeight: 300, textAlign: 'center' }}>
              内容区域
            </Text>
          </View>
        </View>
        <View style={styles.comments}>
          <Text allowFontScaling={false}>全部评论</Text>
          {[0, 1, 2, 3, 4, 5].map((item, key) => {
            return (
              <View
                style={{
                  ...styles.headUserRow,
                  alignItems: 'flex-start',
                  marginTop: 15,
                  marginBottom: 0
                }}>
                <Image
                  resizeMode="cover"
                  style={{ ...styles.headUserImage, width: 30, height: 30 }}
                  source={{
                    uri: 'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
                  }}
                />
                <View>
                  <Text style={{ fontWeight: '600' }} allowFontScaling={false}>
                    User name
                  </Text>
                  <Text allowFontScaling={false}>date</Text>
                  <Text allowFontScaling={false} style={{ marginTop: 5 }}>
                    评论内容
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.pageBottom}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Please input ..." placeholderTextColor="#ccc" />
          </View>
          <Ionicons name="heart-outline" size={20} color="#666" />
          <Ionicons name="star-outline" size={20} color="#666" />
          <Ionicons name="share-outline" size={20} color="#666" />
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
    // bottom: 0,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {},
  input: {
    flex: 1,
    width: width * 0.5
  },
};

module.exports = Question;

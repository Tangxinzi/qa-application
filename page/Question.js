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
                <Image resizeMode='cover' style={styles.headUserImage} source={{uri: 'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF'}} />
                <View>
                  <Text style={styles.headUserName} allowFontScaling={false}>User name</Text>
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
            <Text style={{lineHeight: 300, textAlign: 'center'}}>内容区域</Text>
          </View>
        </View>
        <View style={styles.comments}>
          <Text style={{lineHeight: 100, textAlign: 'center'}}>评论区域</Text>
        </View>
        <View style={styles.pageBottom}>
          <Text>点赞</Text>
          <Text>收藏</Text>
          <Text>分享</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Please input ..." />
          </View>
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
  head: {
  },
  headTitleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headUser: {
    marginTop: 10
  },
  headUserRow: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headUserName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5
  },
  headUserImage: {
    width: 40,
    height: 40,
    borderRadius: 18,
    marginRight: 10
  },

  // content
  content: {
    minHeight: 300,
    
  },

  // comments
  comments: {
    marginTop: 10,
    backgroundColor: '#FFF',
  },

  // pageBottom
  pageBottom: {
    backgroundColor: '#FFF',
    borderTopColor: '#CCC',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    
  },
  input: {

  }
};

module.exports = Question;

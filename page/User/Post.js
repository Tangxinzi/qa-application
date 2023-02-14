import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.tool}>
          <Text allowFontScaling={false}>8 个回答</Text>
          <TouchableHighlight style={styles.button}>
            <>
              <Text allowFontScaling={false}>Time</Text>
              <Text allowFontScaling={false} style={{marginLeft: 10, marginRight: 10, fontWeight: '500'}}>Comment</Text>
              <Text allowFontScaling={false}>Like</Text>
            </>
          </TouchableHighlight>
        </View>
        <View style={styles.contents}>
          {
            [0, 1, 2, 3, 4].map((item, key) => {
              return (
                <View style={styles.content}>
                  <View style={styles.contentMain}>
                    <Text allowFontScaling={false} style={styles.title} numberOfLines={1}>标题</Text>
                    <Text allowFontScaling={false} numberOfLines={2}>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</Text>
                  </View>
                  <View style={styles.contentFoot}>
                    <Text allowFontScaling={false} style={{color: 'gray'}}>519 赞同  ·  80 喜欢  ·  95 评论</Text>
                    <Text allowFontScaling={false} style={{color: 'gray'}}>2023-01-01</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {},
  tool: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    marginBottom: 0.5,
    padding: 10,
    backgroundColor: '#FFF',
  },
  title: {
    fontWeight: '600',
    marginBottom: 5
  },
  contentFoot: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

module.exports = Favorites;

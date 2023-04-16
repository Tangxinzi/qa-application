import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import globalStyle from '../../../assets/global-style';
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

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.comments}>
          {[0, 1, 2, 3, 4, 5].map((item, key) => {
            return (
              <View
                style={styles.headUserRow}>
                <Image
                  resizeMode="cover"
                  style={{ ...styles.headUserImage, width: 30, height: 30 }}
                  source={{
                    uri: 'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
                  }}
                />
                <View style={{flex: 1}}>
                  <Text style={{ fontWeight: '600' }} allowFontScaling={false}>
                    User name
                  </Text>
                  <Text allowFontScaling={false}>date</Text>
                  <View style={styles.content}>
                    <Text allowFontScaling={false}>
                      Comment content
                    </Text>
                  </View>
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
    padding: 15,
    backgroundColor: '#FFF',
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    backgroundColor: '#f1f1f1',
    width: '100%',
    flex: 1,
    padding: 4,
    marginTop: 8
  },

  // comments
  comments: {
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
  input: {},
};

module.exports = Comment;

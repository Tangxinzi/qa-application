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

class Chats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.rows}>
          <View style={styles.row}>
            <View style={styles.rowHeadLeft}>
              <Image
                resizeMode="cover"
                style={styles.image}
                source={{
                  uri: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
                }}
              />
              <View style={styles.rowUserLeft}>
                <Text allowFontScaling={false}>user name</Text>
              </View>
            </View>
            <View style={styles.rowHeadLeft}>
              <Text allowFontScaling={false} style={styles.rowConLeft}>
                content
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowHeadRight}>
              <View style={styles.rowUserRight}>
                <Text allowFontScaling={false}>user name</Text>
              </View>
              <Image
                resizeMode="cover"
                style={styles.image}
                source={{
                  uri: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
                }}
              />
            </View>
            <View style={styles.rowHeadRight}>
              <View style={styles.rowUserRight}>
                <Text style={styles.rowConRight}>content content content</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    padding: 15,
  },

  // row
  row: {
    marginBottom: 15,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  rowHeadLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowUserLeft: {
    marginLeft: 10,
    marginBottom: 10,
  },
  rowConLeft: {
    width: 'auto',
    overflow: 'hidden',
    borderColor: '#CCC',
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: -5,
    marginLeft: 40,
    marginRight: 80,
    backgroundColor: '#FFF',
    padding: 10,
    textAlign: 'left',
  },
  rowHeadRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rowUserRight: {
    marginRight: 10,
    marginBottom: 10,
  },
  rowConRight: {
    width: 'auto',
    overflow: 'hidden',
    borderColor: '#CCC',
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: -5,
    marginRight: 30,
    marginLeft: 80,
    backgroundColor: '#FFF',
    padding: 10,
    textAlign: 'right',
  },
};

module.exports = Chats;

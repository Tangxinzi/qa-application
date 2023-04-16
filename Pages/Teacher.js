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

class Teacher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabActive: 'Post',
      tabs: ['Post', 'Discussion', 'Live', 'Record', 'Comments'],
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.head}>
          <Image
            resizeMode="cover"
            style={styles.teacherImage}
            source={{
              uri: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
            }}
          />
          <View style={{ flex: 1 }}></View>
          <View style={styles.headerButton}>
            <Text style={{ color: '#FFF' }}>+ Follow</Text>
          </View>
          <View style={styles.headIcon}>
            <Ionicons name="mail" size={18} />
          </View>
        </View>
        <View style={styles.userinfo}>
          <Text style={styles.username}>Username</Text>
          <Text>user info ...</Text>
        </View>
        <View style={styles.userData}>
          {[0, 1, 2, 3].map((item, key) => {
            return (
              <View style={styles.data}>
                <Text style={styles.dataNum}>{item + 1}</Text>
                <Text>data</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.tabs}>
          {this.state.tabs.map((item, key) => {
            return (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => this.setState({ tabActive: item })}>
                <Text
                  style={{
                    ...styles.tabText,
                    borderBottomColor:
                      this.state.tabActive == item ? '#000' : '#FFF',
                  }}
                  allowFontScaling={false}>
                  {item}
                </Text>
              </TouchableHighlight>
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
  head: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  headerButton: {
    marginLeft: 10,
    height: 30,
    width: 88,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'green',
  },
  headIcon: {
    marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CCC',
    borderWidth: 1,
  },
  teacherImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  username: { fontSize: 18, fontWeight: '600', marginBottom: 5 },
  userData: {
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  data: {
    alignItems: 'center',
  },
  dataNum: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 5,
  },

  // tabs
  tabs: {
    flexDirection: 'row',
  },
  tabText: {
    marginRight: 20,
    paddingBottom: 10,
    borderBottomWidth: 2
  }
};

module.exports = Teacher;

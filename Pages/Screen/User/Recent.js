import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import Ionicons from '@expo/vector-icons/Ionicons';
import Api from '../../../components/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

class Recent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userinfo: {},
      recents: [],
    };

    this.getUserinfo();
  }

  componentWillUnmount() {}

  async getUserinfo() {
    const userinfo = await AsyncStorage.getItem('userinfo');
    console.log(JSON.parse(userinfo));
    this.setState({ userinfo: JSON.parse(userinfo) });
    this.fetchData();
  }

  fetchData() {
    console.log(
      Api.uri + '/api/v2/user/recents?user_id=' + this.state.userinfo._id
    );
    fetch(Api.uri + '/api/v2/user/recents?user_id=' + this.state.userinfo._id)
      .then((response) => response.json())
      .then((recents) => {
        this.setState({
          recents,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.recents.map((item, key) => {
          return (
            <>
              <Text style={styles.time} allowFontScaling={false}>
                {item.date}
              </Text>
              <View style={styles.views}>
                <View style={styles.view}>
                  <View style={styles.content}>
                    <Text style={styles.title} allowFontScaling={false}>
                      Title
                    </Text>
                    <Text style={styles.author} allowFontScaling={false}></Text>
                  </View>
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{
                      uri: item.question.file
                        ? 'https://jbawesome.com' + item.question.file
                        : 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
                    }}
                  />
                </View>
              </View>
            </>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = {
  container: {},
  time: {
    padding: 10,
    // backgroundColor: '#FFF',
  },
  view: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    marginTop: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '600',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
};

module.exports = Recent;

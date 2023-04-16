import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

class LearnCoin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1500,
      data: [
        {
          num: 400,
          date: '2023/03/01',
          type: 'My Post',
          content: 'Published an article',
          route: 'Post',
        },
        {
          num: 200,
          date: '2023/03/01',
          type: 'Comment',
          content: 'Commented on the article',
          route: 'Comment',
        },
        {
          num: 400,
          date: '2023/03/01',
          type: 'My Post',
          content: 'Published an article',
          route: 'Post',
        },
        {
          num: 100,
          date: '2023/03/01',
          type: 'Like',
          content: 'Like content',
          route: 'Comment',
        },
        {
          num: 400,
          date: '2023/03/01',
          type: 'Share',
          content: 'Shared article 「...」',
          route: 'Note Share',
        },
      ],
    };

    AsyncStorage.getItem('coin')
      .then((coin) => {
        coin = JSON.parse(coin)
        var data = this.state.data, count = 0
        for(let i = 0; i < coin.length; i++) {
          data.unshift(coin[i])
        }
        for(let i = 0; i < data.length; i++) {
          count += data[i].num
        }
        this.setState({
          count,
          data
        })
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'#FFF'} />
        <View style={styles.coin}>
          <Text allowFontScaling={false} style={styles.coinNum}>
            {this.state.count || 0}
          </Text>
          <Text
            allowFontScaling={false}
            style={{ marginBottom: 4, fontWeight: '600' }}>
            Upcoin
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.lists}>
            {this.state.data.map((item, key) => {
              return (
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => {
                    this.props.navigation.navigate(item.route);
                  }}>
                  <View style={styles.list}>
                    <View style={styles.listRow}>
                      <Text
                        allowFontScaling={false}
                        style={{ fontWeight: '600' }}>
                        {item.type}
                      </Text>
                      <Text allowFontScaling={false} style={styles.listCoinNum}>
                        +{item.num}
                      </Text>
                    </View>
                    <Text
                      allowFontScaling={false}
                      style={{ color: '#333', marginTop: 5, marginBottom: 5 }}>
                      {item.content || ''}
                    </Text>
                    <View style={styles.listRow}>
                      <Text allowFontScaling={false} style={styles.listCoinNum}>
                        {item.date}
                      </Text>
                      <Ionicons name="chevron-forward-outline" size={10} />
                    </View>
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  coin: {
    padding: 15,
    paddingBottom: 45,
    // backgroundColor: '#f4511e',
    alignItems: 'center',
  },
  coinNum: {
    fontSize: 36,
    // color: '#FFF',
    fontWeight: '600',
    marginBottom: 15,
  },
  content: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginTop: -15,
  },

  // lists
  list: {
    // paddingLeft: 2,
    // paddingRight: 2,
    paddingTop: 10,
    paddingBottom: 10,
    // marginBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CCC',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

module.exports = LearnCoin;

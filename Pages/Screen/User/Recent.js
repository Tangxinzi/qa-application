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

class Recent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {[0, 1, 2, 3, 4].map((item, key) => {
          return (
            <>
              <Text style={styles.time} allowFontScaling={false}>
                Day {item + 1}
              </Text>
              <View style={styles.views}>
                <View style={styles.view}>
                  <View style={styles.content}>
                    <Text style={styles.title} allowFontScaling={false}>
                      Title
                    </Text>
                    <Text style={styles.author} allowFontScaling={false}>
                      author
                    </Text>
                  </View>
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{
                      uri: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
                    }}
                  />
                </View>
                <View style={styles.view}>
                  <View style={styles.content}>
                    <Text style={styles.title} allowFontScaling={false}>
                      Title
                    </Text>
                    <Text style={styles.author} allowFontScaling={false}>
                      author
                    </Text>
                  </View>
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{
                      uri: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
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

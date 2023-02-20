import React, { Component } from 'react';
import globalStyle from '../../assets/global-style';
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

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [
        {
          image: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
          text: 'image',
        },
        {
          image: 'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
          text: 'image',
        },
        {
          image: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
          text: 'image',
        },
        {
          image: 'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
          text: 'image',
        },
        {
          image: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
          text: 'image',
        },
        {
          image: 'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
          text: 'image',
        },
        {
          image: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
          text: 'image',
        },
        {
          image: 'https://t7.baidu.com/it/u=2168645659,3174029352&fm=193&f=GIF',
          text: 'image',
        },
      ],
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.search}>
          <Ionicons name="search" size={18} color="#CCC" />
          <Text allowFontScaling={false} style={{ marginLeft: 10, color: '#CCC' }}>
            Search
          </Text>
        </View>
        {this.state.rows.map((item, key) => {
          return (
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.props.navigation.navigate('Chat')}>
              <View style={styles.row}>
                <Image
                  resizeMode="cover"
                  style={styles.image}
                  source={{ uri: item.image }}
                />
                <View style={styles.rowContents}>
                  <View style={styles.rowContent}>
                    <Text
                      allowFontScaling={false}
                      style={{ ...globalStyle.text, fontWeight: '600' }}>
                      username {key + 1}
                    </Text>
                    <Text allowFontScaling={false} style={styles.text}>
                      date
                    </Text>
                  </View>
                  <View style={styles.rowContent}>
                    <Text allowFontScaling={false}>content</Text>
                    <View style={styles.rowRead}>
                      <Text
                        allowFontScaling={false}
                        style={{ color: '#FFF', fontSize: 12 }}>
                        1
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#FFF'
  },
  search: {
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    margin: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    padding: 10,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e9e9e9'
  },
  image: {
    width: 44,
    height: 44,
    borderRadius: 22,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {},
  rowContents: {
    flex: 1,
    height: 44,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  rowContent: {
    // backgroundColor: '#CCC',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  rowRead: {
    borderRadius: '50%',
    width: 20,
    height: 20,
    lineHeight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: 'red',
  },
};

module.exports = Messages;

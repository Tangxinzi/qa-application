import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
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

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: [
        {
          text: 'Post',
        },
        {
          text: 'Discussion',
        },
        {
          text: 'Live',
        },
        {
          text: 'Record',
        },
      ],
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
      ],
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.labels}>
          {this.state.labels.map((item, key) => {
            return (
              <View style={styles.label}>
                <Text style={styles.labelText} allowFontScaling={false}>
                  {item.text}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.tabs}>
          <Text
            style={(styles.tabText, styles.tabActiveText)}
            allowFontScaling={false}>
            New
          </Text>
          <Text style={styles.tabText} allowFontScaling={false}>
            Hot
          </Text>
          <Text style={styles.tabText} allowFontScaling={false}>
            Unresolved
          </Text>
        </View>
        <View style={styles.rows}>
          {this.state.rows.map((item, key) => {
            return (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => this.props.navigation.navigate('Question')}>
                <View style={styles.row}>
                  <View style={styles.headUserRow}>
                    <Text style={styles.headUserName} allowFontScaling={false}>
                      title
                    </Text>
                    <Ionicons name="help-circle-outline" size={20} />
                  </View>
                  <View style={styles.rowContent}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}>
                      <Text allowFontScaling={false}>description ...</Text>
                      <View style={{ ...styles.labels, margin: 0, padding: 0 }}>
                        <Text style={globalStyle.label}>1212</Text>
                      </View>
                    </View>
                    <Image
                      resizeMode="cover"
                      style={styles.image}
                      source={{ uri: item.image }}
                    />
                  </View>
                  <View style={styles.rowFoot}>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      点赞
                    </Text>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      ·
                    </Text>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      回复
                    </Text>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      ·
                    </Text>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      浏览
                    </Text>
                  </View>
                </View>
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
    backgroundColor: '#FFF',
  },
  labels: {
    padding: 15,
    flexDirection: 'row',
  },
  label: {
    color: '#000',
    backgroundColor: '#e6e6e6',
    marginRight: 8,
    padding: 6,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 8,
  },
  labelText: {},

  // tabs
  tabs: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  tabText: {
    marginRight: 30,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
  },
  tabActiveText: {
    marginRight: 30,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },

  // rows
  row: {
    padding: 15,
    borderTopWidth: 10,
    borderTopColor: '#e6e6e6',
    backgroundColor: '#FFF',
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  rowTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    marginLeft: 10,
    width: 120,
    height: 65,
    borderRadius: 6,
  },
  headUserRow: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headUserName: {
    fontWeight: '600',
    fontSize: 16,
  },
  headUserImage: {
    width: 40,
    height: 40,
    borderRadius: 18,
    marginRight: 10,
  },

  rowFoot: {
    marginTop: 10,
    flexDirection: 'row',
  },
  rowFootText: {
    fontSize: 12,
    marginRight: 10,
  },
};

module.exports = Home;
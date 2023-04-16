import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';
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

    this.state = {
      listViewData: Array(20).fill('').map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.tool}>
          <Text allowFontScaling={false}>1 Favorite Content</Text>
          <TouchableHighlight style={styles.button}>
            <>
              <Ionicons
                name="folder-outline"
                size={18}
                style={{ marginRight: 5 }}
              />
              <Text allowFontScaling={false}>Favorites</Text>
            </>
          </TouchableHighlight>
        </View>
        <View style={styles.contents}>
          {
            [0, 1, 2, 3, 4].map((item, key) => {
              return (
                <View style={styles.content}>
                  <View style={styles.contentMain}>
                    <Text allowFontScaling={false} style={styles.title} numberOfLines={1}>Title</Text>
                    <Text allowFontScaling={false} numberOfLines={2}>Content Content Content Content Content Content Content</Text>
                  </View>
                  <View style={{display: 'none'}}>
                    <Text allowFontScaling={false} style={{color: 'gray'}}>519 Approve  ·  95 Comments</Text>
                  </View>
                  <View style={styles.contentFoot}>
                    <Text allowFontScaling={false} style={{color: 'gray'}}>Collect in collection item { key }</Text>
                    <Ionicons name="ellipsis-horizontal-circle-outline" size={18} color="gray" />
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

import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
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

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.search}>
          <Ionicons name="search" size={18} color="#CCC" />
          <TextInput
            allowFontScaling={false}
            style={{flex: 1, marginLeft: 5}}
            placeholder="Search ..."
            clearButtonMode="while-editing"
            keyboardType="text"
            defaultValue={this.state.text}
            placeholderTextColor="grey"
            onChangeText={(text) => this.setState({ text })}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    // padding: 15,
  },
  search: {
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    margin: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

module.exports = Search;

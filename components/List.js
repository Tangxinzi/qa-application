import React, { Component } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

let { width, height } = Dimensions.get('window');

export default class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={this.props.onPress}>
        <View style={{ ...styles.list, ...this.props.style }}>
          <Image
            resizeMode="cover"
            style={{
              ...styles.listImage,
              display: 'none'
            }}
            source={{
              uri: this.props.uri,
            }}
          />
          <Text style={{ fontSize: 20, flex: 1 }}>
            {this.props.text || 'List'}
          </Text>
          <Ionicons name={'chevron-forward-outline'} size={30} color={'grey'} />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // flex: 1,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    paddingTop: 20,
    paddingBottom: 20,
    width: width - 50,
  },
  listImage: {
    marginRight: 20,
    width: 30,
    height: 30,
    borderRadius: 30,
  },
});

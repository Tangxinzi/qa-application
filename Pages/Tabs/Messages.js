import React, { Component } from 'react';
import globalStyle from '../../assets/global-style';
import Api from '../../components/Api';
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

export default class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    this.fetchData();
  }

  fetchData() {
    console.log(Api.uri + '/api/message?type=json')
    fetch(Api.uri + '/api/message?type=json')
      .then((response) => response.json())
      .then((messages) => {
        this.setState({
          messages
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.search}>
          <Ionicons name="search" size={18} color="#CCC" />
          <Text
            allowFontScaling={false}
            style={{ marginLeft: 10, color: '#CCC' }}>
            Search
          </Text>
        </View>
        <View style={styles.messages}>
          {this.state.messages.map((item, key) => {
            return (
              <TouchableHighlight
                key={key}
                style={styles.row}
                underlayColor="transparent"
                onPress={() => this.props.navigation.navigate('Chat')}>
                <>
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{
                      uri: item.image,
                    }}
                  />
                  <View style={styles.rowContents}>
                    <View style={styles.rowContent}>
                      <Text
                        allowFontScaling={false}
                        style={{ ...globalStyle.text, fontWeight: '600' }}>
                        {item.username}
                      </Text>
                      <Text allowFontScaling={false} style={styles.text}>
                        {item.date}
                      </Text>
                    </View>
                    <View style={styles.rowContent}>
                      <Text allowFontScaling={false}>{item.description}</Text>
                      <View style={{...styles.unread, display: item.unread ? 'flex' : 'none'}}>
                        <Text
                          allowFontScaling={false}
                          style={{ color: '#FFF', fontSize: 9 }}>
                          {item.unread}
                        </Text>
                      </View>
                    </View>
                  </View>
                </>
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
  search: {
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    margin: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    padding: 10,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e9e9e9',
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
  unread: {
    width: 17,
    height: 17,
    // padding: 4,
    borderRadius: 16,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import globalStyle from '../../../assets/global-style';
import Ionicons from '@expo/vector-icons/Ionicons';
import Api from '../../../components/Api';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userinfo: {},
      comments: [],
    };

    this.getUserinfo();
  }

  async getUserinfo() {
    const userinfo = await AsyncStorage.getItem('userinfo');
    this.setState({ userinfo: JSON.parse(userinfo) });
    this.fetchData();
  }

  fetchData() {
    fetch(Api.uri + '/api/v2/user/comment?user_id=' + this.state.userinfo._id, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((comments) => {
        this.setState({
          comments,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.comments}>
          {this.state.comments.map((item, key) => {
            return (
              <View style={styles.headUserRow}>
                <Image
                  resizeMode="cover"
                  style={{ ...styles.headUserImage, width: 30, height: 30 }}
                  source={{
                    uri:
                      (this.state.userinfo.avatar
                        ? Api.uri + this.state.userinfo.avatar
                        : null) || Api.avatar,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '600' }} allowFontScaling={false}>
                    {this.state.userinfo.user_name}
                  </Text>
                  <View
                    style={{
                      marginTop: 5,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text allowFontScaling={false}>
                      {item.comment_content || ''}
                    </Text>
                    <Text allowFontScaling={false}>
                      {Moment(item.created_at).format('YYYY-MM-DD')}
                    </Text>
                  </View>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() =>
                      this.props.navigation.navigate('Question Content', {
                        id: item.question_id,
                      })
                    }>
                    <View style={styles.content}>
                      <Text allowFontScaling={false}>Question</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {},
  // head
  head: {},
  headTitleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headUser: {
    marginTop: 10,
  },
  headUserRow: {
    padding: 15,
    backgroundColor: '#FFF',
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  headUserName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  headUserImage: {
    width: 40,
    height: 40,
    borderRadius: 18,
    marginRight: 10,
  },

  // content
  content: {
    backgroundColor: '#f1f1f1',
    width: '100%',
    flex: 1,
    padding: 4,
    marginTop: 8,
  },

  // comments
  comments: {},

  // pageBottom
  pageBottom: {
    backgroundColor: '#FFF',
    borderTopColor: '#CCC',
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    width: '100%',
    // position: 'absolute',
    // bottom: 0,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {},
  input: {},
};

module.exports = Comment;

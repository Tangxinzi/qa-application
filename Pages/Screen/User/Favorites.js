import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import globalStyle from '../../../assets/global-style';
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import Api from '../../../components/Api';
import { faker } from '@faker-js/faker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userinfo: {},
      favorites: [],
      listViewData: Array(20)
        .fill('')
        .map((_, i) => ({ key: `${i}`, text: `item #${i}` })),
    };

    this.getUserinfo();
  }

  async getUserinfo() {
    const userinfo = await AsyncStorage.getItem('userinfo');
    this.setState({ userinfo: JSON.parse(userinfo) });
    this.fetchData();
  }

  fetchData() {
    fetch(
      Api.uri + '/api/v2/user/favorites?user_id=' + this.state.userinfo._id,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((favorites) => {
        this.setState({
          favorites,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.tool}>
          <Text allowFontScaling={false}>
            {this.state.favorites.length} Favorite Content
          </Text>
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
          {this.state.favorites.map((item, key) => {
            return (
              <TouchableOpacity
                key={key}
                underlayColor="transparent"
                onPress={() =>
                  this.props.navigation.navigate('Question Content', {
                    id: item.question_id,
                  })
                }>
                <View style={styles.content}>
                  <View style={styles.contentMain}>
                    <Text
                      allowFontScaling={false}
                      style={styles.title}
                      numberOfLines={1}>
                      {item.question.question_name}{' '}
                      {item.question.question_title || ''}
                    </Text>
                    <Text allowFontScaling={false} numberOfLines={2}>
                      {item.question.question_detail || faker.lorem.text()}
                    </Text>
                  </View>
                  <View style={styles.contentFoot}>
                    <Text allowFontScaling={false} style={{ color: 'gray' }}>
                      {moment(item.created_at).format('YYYY-MM-DD')} · View{' '}
                      {item.question.question_view} · Reply {item.comment || 0}
                    </Text>
                    <Ionicons
                      name="ellipsis-horizontal-circle-outline"
                      size={18}
                      color="gray"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
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
    marginBottom: 5,
  },
  contentMain: {
    marginTop: 5,
    marginBottom: 5,
  },
  contentFoot: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

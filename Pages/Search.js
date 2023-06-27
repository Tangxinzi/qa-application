import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import Api from '../components/Api';
import { faker } from '@faker-js/faker';
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
      word: '',
      datas: [],
    };
  }

  fetchData(word) {
    fetch(Api.uri + '/api/v2/search?word=' + word)
      .then((response) => response.json())
      .then((datas) => {
        this.setState({
          datas,
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
          <TextInput
            allowFontScaling={false}
            style={{ flex: 1, marginLeft: 5 }}
            placeholder="Search ..."
            clearButtonMode="while-editing"
            keyboardType="text"
            defaultValue={this.state.word}
            placeholderTextColor="grey"
            onChangeText={(word) => {
              this.fetchData(word);
            }}
          />
        </View>

        <View style={styles.questions}>
          {this.state.datas.map((item, key) => {
            return (
              <TouchableHighlight
                key={key}
                underlayColor="transparent"
                onPress={() =>
                  this.props.navigation.navigate('Question Content', {
                    id: item._id,
                  })
                }>
                <View style={styles.question}>
                  <View style={styles.questionHead}>
                    <Text
                      style={{
                        ...styles.questionLabel,
                        color: '#FFF',
                        backgroundColor:
                          item.question_level == 0
                            ? 'green'
                            : item.question_level == 1
                            ? 'orange'
                            : 'red',
                      }}
                      allowFontScaling={false}>
                      {!item.question_level ? 'Easy' : ''}
                      {item.question_level == 0 ? 'Easy' : ''}
                      {item.question_level == 1 ? 'Medium' : ''}
                      {item.question_level == 2 ? 'Hard' : ''}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={styles.questionHeadTitle}
                      allowFontScaling={false}>
                      {item.question_name} {item.question_title}
                    </Text>
                    <Ionicons
                      name={
                        item.question_solve
                          ? 'checkmark-circle'
                          : 'help-circle-outline'
                      }
                      color={item.question_solve ? 'green' : '#000'}
                      size={20}
                    />
                  </View>
                  <View style={styles.questionCon}>
                    <Text
                      numberOfLines={2}
                      style={styles.questionHeadLabel}
                      allowFontScaling={false}>
                      {item.question_detail || faker.lorem.text()}
                    </Text>
                  </View>
                  <View style={styles.questionFoot}>
                    {['ST1131', 'Statistic'].map((item, key) => {
                      return (
                        <Text
                          style={styles.questionLabel}
                          allowFontScaling={false}>
                          {item}
                        </Text>
                      );
                    })}
                    <View style={{ flex: 1 }}></View>
                    <Text
                      style={{ ...styles.questionLabel, marginRight: 0 }}
                      allowFontScaling={false}>
                      Unresolved
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

  // question
  questions: {
    paddingBottom: 30,
    margin: 8,
  },
  question: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  questionHead: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionHeadTitle: {
    flex: 1,
    fontWeight: '600',
  },
  questionCon: {
    marginTop: 6,
    marginBottom: 6,
  },
  questionLabel: {
    fontSize: 12,
    paddingLeft: 5,
    paddingRight: 5,
    width: 'auto',
    height: 18,
    lineHeight: 18,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 8,
    textAlign: 'center',
    color: '#333',
    backgroundColor: '#e6e6e6',
  },
  questionFoot: {
    flexDirection: 'row',
  },
};

module.exports = Search;

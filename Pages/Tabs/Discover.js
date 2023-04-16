import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import globalStyle from '../../assets/global-style';
import Api from '../../components/Api';
import Avatar from '../../components/Avatar';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  DeviceEventEmitter,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: [
        {
          text: 'Question',
        },
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
      labelActiveText: 'Question',
      tabs: [
        {
          text: 'New',
        },
        {
          text: 'Hot',
        },
        {
          text: 'Unresolved',
        },
      ],
      tabActiveText: 'New',
      questions: [],
    };

    this.fetchData();
    this.getUserinfo();
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('Change', () => {
      this.fetchData();
      this.getUserinfo();
    });
  }

  async getUserinfo() {
    var userinfo = await AsyncStorage.getItem('userinfo');
    userinfo = JSON.parse(userinfo);
    this.setState({ userinfo });

    this.props.navigation.setOptions({
      headerLeft: (props) => (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() =>
            this.props.navigation.navigate(userinfo ? 'Userinfo' : 'Login')
          }>
          <Avatar {...userinfo} />
        </TouchableHighlight>
      ),
    });
  }

  fetchData() {
    fetch(
      `${
        Api.uri
      }/api/v2/discover?type=${this.state.labelActiveText.toLowerCase()}&sort=${this.state.tabActiveText.toLocaleLowerCase()}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (this.state.labelActiveText == 'Question') {
          this.setState({
            questions: data,
          });
          console.log(this.state.questions);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onPress = () => {
    try {
      this.props.navigation.navigate('Discover Content', {
        id: 10,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.labels}>
            {this.state.labels.map((item, key) => {
              return (
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => {
                    this.setState({ labelActiveText: item.text });
                    this.fetchData();
                  }}>
                  <View
                    style={{
                      ...styles.label,
                      backgroundColor:
                        this.state.labelActiveText == item.text
                          ? '#2276e9'
                          : '#e6e6e6',
                    }}>
                    <Text
                      style={{
                        ...styles.labelText,
                        color:
                          this.state.labelActiveText == item.text
                            ? '#FFF'
                            : '#000',
                      }}
                      allowFontScaling={false}>
                      {item.text}
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.tabs}>
          {this.state.tabs.map((item, key) => {
            return (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => {
                  this.setState({ tabActiveText: item.text });
                  this.fetchData();
                }}>
                <View
                  style={{
                    ...styles.tabText,
                    ...(this.state.tabActiveText == item.text
                      ? styles.tabActiveText
                      : ''),
                  }}>
                  <Text allowFontScaling={false}>{item.text}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
        <View style={styles.questions}>
          {this.state.questions.map((item, key) => {
            return (
              <TouchableOpacity
                key={key}
                underlayColor="transparent"
                onPress={() => this.onPress()}>
                <View style={styles.row}>
                  <View style={styles.headUserRow}>
                    <Text style={styles.rowTitle} allowFontScaling={false}>
                      {item.question_name} {item.title}
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
                  <View style={styles.rowContent}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                      }}>
                      <Text allowFontScaling={false}>
                        {item.description || 'description...'}
                      </Text>
                      <View style={{ ...styles.labels, margin: 0, padding: 0 }}>
                        {item.labels &&
                          item.labels.map((item, key) => {
                            return (
                              <Text style={globalStyle.label} key={key}>
                                {item}
                              </Text>
                            );
                          })}
                      </View>
                    </View>
                    <Image
                      resizeMode="cover"
                      style={styles.image}
                      source={{ uri: item.image }}
                    />
                  </View>
                  <View style={styles.rowFoot}>
                    <Image
                      resizeMode="cover"
                      style={styles.rowAvatar}
                      source={{
                        uri: item.userinfo[0].avatar || Api.avatar,
                      }}
                    />
                    <Text style={styles.userName} allowFontScaling={false}>
                      {item.userinfo[0].user_name}
                    </Text>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      Like
                    </Text>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      ·
                    </Text>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      Reply
                    </Text>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      ·
                    </Text>
                    <Text allowFontScaling={false} style={styles.rowFootText}>
                      View {item.view}
                    </Text>
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
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },

  // rows
  rows: {},
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
  rowAvatar: {
    width: 16,
    height: 16,
    borderRadius: 16,
    marginRight: 6,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    marginLeft: 10,
    width: 110,
    height: 65,
    borderRadius: 6,
  },
  headUserRow: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    fontWeight: '600',
    fontSize: 12,
    flex: 1,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 18,
    marginRight: 10,
  },
  rowFoot: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowFootText: {
    fontSize: 12,
    marginLeft: 10,
  },
};

module.exports = Home;

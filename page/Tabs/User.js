import React, { Component } from 'react';
import globalStyle from '../../assets/global-style';
import ViewSwiper from 'react-native-swiper';
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

let { width, height } = Dimensions.get('window');

class Me extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabActive: 'Post',
      tabs: [
        {
          text: 'Post',
          name: 'Post',
          icon: 'receipt-outline',
        },
        {
          text: 'Comment',
          name: 'Comment',
          icon: 'chatbubble-ellipses-outline',
        },
        {
          text: 'Like',
          name: 'Post',
          icon: 'heart-outline',
        },
        {
          text: 'Favorites',
          name: 'Favorites',
          icon: 'folder-outline',
        },
        {
          text: 'Recent',
          name: 'Recent Views',
          icon: 'time-outline',
        },
        {
          text: 'Notes',
          name: 'Notes',
          icon: 'calendar-outline',
        },
        {
          text: 'Topup',
          name: 'Topup',
        },
        {
          text: 'Withdraw',
          name: 'Withdraw',
        },
      ],
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.head}>
          <Image
            resizeMode="cover"
            style={styles.teacherImage}
            source={{
              uri: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
            }}
          />
          <View style={styles.info}>
            <Text allowFontScaling={false} style={styles.username}>
              Username
            </Text>
            <Text allowFontScaling={false} style={globalStyle.label}>
              Study
            </Text>
          </View>
        </View>
        <View style={styles.userinfo}>
          <Text
            allowFontScaling={false}
            style={[styles.userinfoRow, globalStyle.text, { marginTop: 0 }]}>
            School: user info ...
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.userinfoRow, globalStyle.text]}>
            Year: user info ...
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.userinfoRow, globalStyle.text]}>
            Major: user info ...
          </Text>
          <Text
            allowFontScaling={false}
            style={[styles.userinfoRow, globalStyle.text]}>
            Focus Area: user info ...
          </Text>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.props.navigation.navigate('User Status Edit')}>
            <Text
              allowFontScaling={false}
              style={[styles.userEdit, globalStyle.text]}>
              edit
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.userData}>
          {this.state.tabs.map((item, key) => {
            return (
              <TouchableHighlight
                style={styles.data}
                activeOpacity={0.85}
                underlayColor="transparent"
                onPress={() => this.props.navigation.navigate(item.name)}>
                <>
                  <Ionicons name={item.icon} size={20} />
                  <Text allowFontScaling={false} style={styles.iconText}>
                    {item.text}
                  </Text>
                  <Ionicons name="chevron-forward-outline" size={20} />
                </>
              </TouchableHighlight>
            );
          })}
        </View>
        <View style={styles.tabs}></View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    padding: 15,
    backgroundColor: '#FFF',
  },
  head: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    marginLeft: 10,
  },
  headerButton: {
    padding: 3,
    // width: 70,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'green',
  },
  headIcon: {
    marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CCC',
    borderWidth: 1,
  },
  teacherImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  userinfo: {
    backgroundColor: '#e6e6e6',
    padding: 10,
    borderRadius: 6,
  },
  userinfoRow: {
    marginTop: 8,
  },
  userEdit: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  userData: {
    marginTop: 20,
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  data: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#CCC',
  },
  dataNum: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 5,
  },
  iconText: {
    flex: 1,
    marginLeft: 10,
  },

  // tabs
  tabs: {
    flexDirection: 'row',
  },
  tabText: {
    marginRight: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
  },
};

module.exports = Me;

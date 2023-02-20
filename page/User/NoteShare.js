import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import globalStyle from '../../assets/global-style';
import Ionicons from '@expo/vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
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

// http://www.dailynews.lk/line/bbc
const Posts = [
  {
    title: `Kipyegon: How Kenyan achieved mother of all feats in Tokyo`,
    image:
      'https://www.dailynews.lk/sites/default/files/styles/node-teaser-default/public/news/2018/07/10/j1.jpg?itok=f1K5atuR',
  },
  {
    title: `Thailand cave rescue: Boys 'could be in cave for months'`,
    image:
      'https://www.dailynews.lk/sites/default/files/styles/node-teaser-default/public/news/2018/07/03/p06cpwh2.jpg?itok=iQLvnqFH',
  },
  {
    title: `Maryland shooting: Five killed in 'targeted' attack on US newspaper`,
    image:
      'https://www.dailynews.lk/sites/default/files/styles/node-teaser-default/public/news/2018/06/29/capitalgazetteannapolisshooting_062818getty.jpg?itok=iyCg4HsJ',
  },
  {
    title: `US border agents halt migrant family prosecutions`,
    image:
      'https://www.dailynews.lk/sites/default/files/news/2018/06/26/_102196904_tv047655697_0.png',
  },
  {
    title: `Putin set to be inaugurated for fourth term as president of Russia`,
    image:
      'https://www.dailynews.lk/sites/default/files/news/2018/05/07/5aac372092c0691c008b47d8-750-563.jpg',
  },
  {
    title: `Methane ice dunes found on Pluto by NASA spacecraft`,
    image:
      'https://www.dailynews.lk/sites/default/files/news/2018/06/01/_101830883_f54f60cc-a294-47c8-8214-ce7063f83463.jpg',
  },
  {
    title: `Supreme Court rejects NI abortion law case`,
    image:
      'https://www.dailynews.lk/sites/default/files/news/2018/06/07/_101916767_scourt3.jpg',
  },
  {
    title: `Cambridge Analytica: Facebook data-harvest firm to shut`,
    image:
      'https://www.dailynews.lk/sites/default/files/news/2018/05/03/download-%281%29.png',
  },
];

class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: Posts,
      tabActive: 'Module Notes',
      tab: ['Module Notes', 'Research Paper', 'Center'],
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.swiperContainer}>
          <ViewSwiper
            autoplay
            autoplayTimeout={4}
            dot={
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  width: 20,
                  height: 3,
                  margin: 2,
                  borderRadius: 2,
                  bottom: -20,
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: '#ffffff',
                  width: 20,
                  height: 3,
                  margin: 2,
                  borderRadius: 2,
                  bottom: -20,
                }}
              />
            }
            paginationStyle={{ bottom: 40 }}>
            {this.state.lists.map((item, key) => {
              if (key < 3) {
                return (
                  <TouchableHighlight
                    key={key}
                    style={styles.swiperTouch}
                    activeOpacity={0.9}
                    underlayColor="none"
                    onPress={() => {
                      this.props.navigation.navigate('Detail', { index: key });
                    }}>
                    <>
                      <Image
                        resizeMode="cover"
                        style={styles.swiperImage}
                        source={{ uri: item.image }}
                      />
                      <Text
                        allowFontScaling={false}
                        numberOfLines={1}
                        style={styles.swiperTitle}>
                        {item.title}
                      </Text>
                    </>
                  </TouchableHighlight>
                );
              }
            })}
          </ViewSwiper>
        </View>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={'Select ...'}
          options={this.state.tab}
          cancelButtonIndex={2}
          onPress={(index, value) => {
            this.setState({
              tabActive: this.state.tab[index]
            })
          }}
        />
        <View
          style={{
            ...styles.container,
            display: this.state.tabActive == 'Module Notes' ? 'flex' : 'none',
          }}>
          <View style={globalStyle.form}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.ActionSheet.show()}>
              <View style={globalStyle.formRow}>
                <Text style={globalStyle.formText}>Type</Text>
                <Text style={globalStyle.formText}>{this.state.tabActive}</Text>
              </View>
            </TouchableHighlight>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Country</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>School</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Module Name</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Module Code</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
          </View>
          
          <View style={styles.buttons}>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: '#3eb96e' }}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                Confirm
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                Cancel
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <View
          style={{
            ...styles.container,
            display: this.state.tabActive == 'Research Paper' ? 'flex' : 'none',
          }}>
          <View style={globalStyle.form}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.ActionSheet.show()}>
              <View style={globalStyle.formRow}>
                <Text style={globalStyle.formText}>Type</Text>
                <Text style={globalStyle.formText}>{this.state.tabActive}</Text>
              </View>
            </TouchableHighlight>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Focus Area</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
            <View style={globalStyle.formRow}>
              <Text style={globalStyle.formText}>Materials</Text>
              <TextInput
                style={globalStyle.formInput}
                placeholder="Please input ..."
              />
            </View>
          </View>
          
          <View style={styles.buttons}>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: '#3eb96e' }}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                Confirm
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              underlayColor="transparent">
              <Text allowFontScaling={false} style={styles.buttonText}>
                Cancel
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },

  // swiper
  swiperContainer: {
    height: 160,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
    borderRadius: 8,
  },
  swiperTouch: {
    borderRadius: 5,
  },
  swiperImage: {
    width: Dimensions.get('window').width,
    height: 160,
  },
  swiperTitle: {
    marginTop: 10,
    width: '80%',
    fontSize: 16,
    fontWeight: '600',
  },

  // bottons
  buttons: {
    alignItems: 'center',
    position: 'relative',
    bottom: -100
  },
  button: {
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCC',
    width: 120,
    height: 40,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
};

module.exports = Notes;

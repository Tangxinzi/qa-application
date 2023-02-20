import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import globalStyle from '../../assets/global-style';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Permissions } from 'expo';
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

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri);
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.blocks}>
          <TouchableHighlight
            style={styles.block}
            underlayColor="transparent"
            onPress={() => this.pickImage()}>
            <>
              <Text style={styles.blockText} allowFontScaling={false}>
                Find
              </Text>
              <View style={styles.blockLine}></View>
              <Text style={styles.blockText} allowFontScaling={false}>
                Solution
              </Text>
            </>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.block}
            underlayColor="transparent"
            onPress={() => this.props.navigation.navigate('Note Share')}>
            <>
              <Text style={styles.blockText} allowFontScaling={false}>
                Share
              </Text>
              <View style={styles.blockLine}></View>
              <Text style={styles.blockText} allowFontScaling={false}>
                Notes
              </Text>
            </>
          </TouchableHighlight>
        </View>
        <View style={styles.calendar}>
          <Text style={styles.blockText} allowFontScaling={false}>
            Date 2023.02
          </Text>
          <View style={styles.days}>
            {[0, 1, 2, 3, 4, 5, 6].map((item, key) => {
              return (
                <View style={styles.day}>
                  <Text style={styles.dayText} allowFontScaling={false}>
                    {item + 1}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.questions}>
          {[0, 1, 2, 3, 4, 5, 6].map((item, key) => {
            return (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => this.props.navigation.navigate('Question')}>
                <View style={styles.question}>
                  <View style={styles.questionHead}>
                    <Text style={styles.questionLabel} allowFontScaling={false}>
                      easy
                    </Text>
                    <Text
                      style={styles.questionHeadTitle}
                      allowFontScaling={false}>
                      {item + 1}. Question
                    </Text>
                    <Ionicons
                      name={
                        item % 2
                          ? 'help-circle-outline'
                          : 'checkmark-circle-outline'
                      }
                      size={20}
                    />
                  </View>
                  <View style={styles.questionCon}>
                    <Text
                      style={styles.questionHeadLabel}
                      allowFontScaling={false}>
                      Question description ...
                    </Text>
                  </View>
                  <View style={styles.questionFoot}>
                    <Text style={styles.questionLabel} allowFontScaling={false}>
                      ST1131
                    </Text>
                    <Text style={styles.questionLabel} allowFontScaling={false}>
                      statistics
                    </Text>
                    <View style={{ flex: 1 }}></View>
                    <Text
                      style={{ ...styles.questionLabel, marginRight: 0 }}
                      allowFontScaling={false}>
                      Solve
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
    padding: 15,
  },

  // blocks
  blocks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  block: {
    width: (width - 15 * 2) / 2.1,
    backgroundColor: '#FFF',
    padding: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  blockLine: {
    height: 10,
  },
  blockText: {
    fontSize: 15,
    fontWeight: '600',
  },

  // calendar
  calendar: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  days: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayText: {
    fontSize: 14,
    width: 28,
    height: 28,
    lineHeight: 28,
    borderRadius: 14,
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: '#CCC',
  },

  // question
  question: {
    marginTop: 15,
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
    color: '#000',
    backgroundColor: '#e6e6e6',
  },
  questionFoot: {
    flexDirection: 'row',
  },
};

module.exports = Home;

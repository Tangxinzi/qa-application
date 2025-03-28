import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import { faker } from '@faker-js/faker';
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

class Notes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.tool}>
          <Text allowFontScaling={false} style={styles.toolText}>
            Normal
          </Text>
        </View>
        <View style={styles.contents}>
          {[0, 1, 2, 3, 4].map((item, key) => {
            return (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => this.props.navigation.navigate('Note Share')}>
                <View style={styles.content}>
                  <View style={styles.contentMain}>
                    <Text
                      allowFontScaling={false}
                      style={styles.title}
                      numberOfLines={1}>
                      {faker.lorem.sentence(5)}
                    </Text>
                    <Text allowFontScaling={false} numberOfLines={2}>
                      {faker.lorem.text()}
                    </Text>
                  </View>
                  <View style={styles.contentFoot}>
                    <Text allowFontScaling={false} style={{ color: 'gray' }}>
                      {faker.date.weekday()}
                    </Text>
                    <Ionicons
                      name="ellipsis-horizontal-circle-outline"
                      size={18}
                      color="gray"
                    />
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
  container: {},
  tool: {
    padding: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  toolText: {
    marginRight: 30,
    color: '#616470',
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    padding: 12,
    margin: 12,
    marginTop: 0,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  title: {
    fontWeight: '600',
    marginBottom: 5,
  },
  contentFoot: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

module.exports = Notes;

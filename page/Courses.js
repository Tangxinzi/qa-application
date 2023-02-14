import React, { Component } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';

class Courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labelsActive: 'Tutors',
      labels: [
        {
          text: 'Tutors',
        },
        {
          text: 'Event',
        },
      ],
      sortByColumn: {
        index: 0,
        text: [
          'Edit',
          'Cancel',
        ],
      },
      teachers: [
        {
          avatar:
            'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
          username: 'Username',
          country: '',
          school: '',
          job: '',
          focus: '',
        },
        {
          avatar:
            'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
          username: 'Username',
          country: '',
          school: '',
          job: '',
          focus: '',
        },
        {
          avatar:
            'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
          username: 'Username',
          country: '',
          school: '',
          job: '',
          focus: '',
        },
        {
          avatar:
            'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
          username: 'Username',
          country: '',
          school: '',
          job: '',
          focus: '',
        },
      ],
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.labels}>
          {this.state.labels.map((item, key) => {
            return (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => this.setState({ labelsActive: item.text })}>
                <View
                  style={{
                    ...styles.label,
                    backgroundColor:
                      this.state.labelsActive == item.text
                        ? '#b0b0b0'
                        : '#e6e6e6',
                  }}>
                  <Text style={styles.labelText} allowFontScaling={false}>
                    {item.text}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}

          <Ionicons style={styles.labelIcon} name="filter" size={20} />
        </View>

        <View
          style={{
            ...styles.teachers,
            display: this.state.labelsActive == 'Tutors' ? 'flex' : 'none',
          }}>
          {this.state.teachers.map((item, key) => {
            return (
              <View style={styles.teacher}>
                <View style={styles.teacherHead}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => this.props.navigation.navigate('Teacher')}>
                    <Image
                      resizeMode="cover"
                      style={styles.teacherImage}
                      source={{ uri: item.avatar }}
                    />
                  </TouchableHighlight>
                  <Text
                    style={styles.teacherUserName}
                    allowFontScaling={false}
                    onPress={() => this.props.navigation.navigate('Teacher')}>
                    {item.username}
                  </Text>
                  <View>
                    <Text allowFontScaling={false}>99%</Text>
                  </View>
                </View>
                <View style={styles.teacherCon}>
                  <Text style={styles.teacherLabel} allowFontScaling={false}>
                    Country: {item.country}
                  </Text>
                  <Text style={styles.teacherLabel} allowFontScaling={false}>
                    School: {item.school}
                  </Text>
                  <Text style={styles.teacherLabel} allowFontScaling={false}>
                    Job: {item.job}
                  </Text>
                  <Text style={styles.teacherLabel} allowFontScaling={false}>
                    Focus Area: {item.focus}
                  </Text>
                </View>
                <Text style={styles.extLabel} allowFontScaling={false}>
                  {key + 1} Hour
                </Text>
              </View>
            );
          })}
        </View>
        <View
          style={{
            ...styles.teachers,
            display: this.state.labelsActive == 'Event' ? 'flex' : 'none',
          }}>
          {this.state.teachers.map((item, key) => {
            return (
              <View style={styles.teacher}>
                <View style={styles.teacherHead}>
                  <Text style={styles.teacherUserName} allowFontScaling={false}>
                    title
                  </Text>
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => this.ActionSheet.show()}>
                    <Ionicons
                      name="ellipsis-horizontal-circle-outline"
                      size={20}
                    />
                  </TouchableHighlight>
                </View>
                <View style={styles.teacherCon}>
                  <Text style={styles.teacherLabel} allowFontScaling={false}>
                    Event Content
                  </Text>
                </View>
                <Text style={styles.extLabel} allowFontScaling={false}>
                  In 2 Days
                </Text>
                <ActionSheet
                  ref={(o) => (this.ActionSheet = o)}
                  title={'Select ...'}
                  options={this.state.sortByColumn.text}
                  cancelButtonIndex={1}
                  onPress={(index) => {
                    console.log(index);
                  }}
                />
              </View>
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
  labels: {
    position: 'relative',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
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
  labelIcon: {
    position: 'absolute',
    right: 15,
  },
  labelText: {},
  // teacher
  teacher: {
    position: 'relative',
    margin: 15,
    marginTop: 0,
    padding: 15,
    paddingBottom: 10,
    borderRadius: 8,
    backgroundColor: '#FFF',
  },
  teacherHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  teacherImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  teacherUserName: {
    flex: 1,
    fontWeight: '600',
  },
  teacherLabel: {
    marginBottom: 5,
  },
  extLabel: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
};

module.exports = Courses;

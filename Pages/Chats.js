import React, { Component } from 'react';
import ViewSwiper from 'react-native-swiper';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Text,
  View,
  Image,
  Platform,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableHighlight,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';

class Chats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
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
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: 15 }}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={250}
          behavior={Platform.OS == 'ios' ? 'height' : 'height'}
          style={{ flex: 1 }}>
          <ScrollView style={styles.container}>
            <View style={styles.rows}>
              <View style={styles.row}>
                <View style={styles.rowHeadLeft}>
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{
                      uri: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
                    }}
                  />
                  <View style={styles.rowUserLeft}>
                    <Text allowFontScaling={false}>user name</Text>
                  </View>
                </View>
                <View style={styles.rowHeadLeft}>
                  <Text allowFontScaling={false} style={styles.rowConLeft}>
                    content
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.rowHeadRight}>
                  <View style={styles.rowUserRight}>
                    <Text allowFontScaling={false}>user name</Text>
                  </View>
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{
                      uri: 'https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF',
                    }}
                  />
                </View>
                <View style={styles.rowHeadRight}>
                  <View style={styles.rowUserRight}>
                    <Text style={styles.rowConRight}>
                      content content content
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottom}>
            <TextInput
              allowFontScaling={false}
              style={styles.textInput}
              placeholder="Input content ..."
              clearButtonMode="while-editing"
              keyboardType="email-address"
              defaultValue={this.state.email}
              placeholderTextColor="grey"
              onChangeText={(email) => this.setState({ email })}
            />
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => this.pickImage()}
              style={styles.pickImage}>
              <Ionicons name="image-outline" size={18} color="grey" />
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    padding: 15,
  },

  // bottom
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#CCC',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15
  },
  textInput: {
    height: 25,
    lineHeight: 25,
    flex: 1,
    marginRight: 15,
  },
  pickImage: {
    borderColor: 'grey',
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // row
  row: {
    marginBottom: 15,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  rowHeadLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowUserLeft: {
    marginLeft: 10,
    marginBottom: 10,
  },
  rowConLeft: {
    width: 'auto',
    overflow: 'hidden',
    borderColor: '#CCC',
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: -5,
    marginLeft: 40,
    marginRight: 80,
    backgroundColor: '#FFF',
    padding: 10,
    textAlign: 'left',
  },
  rowHeadRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rowUserRight: {
    marginRight: 10,
    marginBottom: 10,
  },
  rowConRight: {
    width: 'auto',
    overflow: 'hidden',
    borderColor: '#CCC',
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: -5,
    marginRight: 30,
    marginLeft: 80,
    backgroundColor: '#FFF',
    padding: 10,
    textAlign: 'right',
  },
};

module.exports = Chats;

import * as React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Search(props) {
  return (
    <View style={styles.row}>
      <TouchableHighlight
        style={styles.button}
        underlayColor="transparent"
        onPress={() => props.navigation.navigate('Search')}>
        <Ionicons name="search" size={26} />
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.button}
        underlayColor="transparent"
        onPress={() => props.navigation.navigate('LearnCoin')}>
        <Ionicons name="ribbon-outline" size={25} />
      </TouchableHighlight>
    </View>
  );
}

const styles = {
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    marginLeft: 15,
  },
};

export default Search;

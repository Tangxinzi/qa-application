import * as React from 'react';
import { TouchableHighlight, View, Button, Text, Image } from 'react-native';

export default class Avatar extends React.Component {
  render() {
    return (
      <View style={styles.row}>
        <Image
          style={styles.logo}
          source={require('@expo/snack-static/react-native-logo.png')}
        />
        <Text allowFontScaling={false} style={{ fontSize: 16 }}>
          user name
        </Text>
      </View>
    );
  }
}

const styles = {
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
};

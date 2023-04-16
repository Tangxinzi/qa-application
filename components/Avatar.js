import * as React from 'react';
import Api from './Api';
import { TouchableHighlight, View, Button, Text, Image } from 'react-native';

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.row}>
        <Image
          style={styles.logo}
          source={{
            uri: this.props.avatar || Api.avatar,
          }}
        />
        <Text allowFontScaling={false} style={{ fontSize: 16 }}>
          {this.props.user_name || ''}
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

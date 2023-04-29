import * as React from 'react';
import Api from './Api';
import { TouchableHighlight, View, Button, Text, Image } from 'react-native';

export default class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: {
        avatar: ''
      },
    };
    
    props._id ? this.fetchUserinfo() : {};
  }

  fetchUserinfo() {
    fetch(Api.uri + '/api/v2/user/info/' + this.props._id, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          userinfo: data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.row}>
        <Image
          style={styles.logo}
          source={{
            uri:
              (this.state.userinfo && this.state.userinfo.avatar
                ? Api.uri + this.state.userinfo.avatar
                : null) || Api.avatar,
          }}
        />
        <Text allowFontScaling={false} style={{ fontSize: 16 }}>
          {this.state.userinfo.user_name || 'Login'}
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

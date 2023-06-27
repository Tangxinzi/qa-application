import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';

export default class TextInputContainer extends Component {
  // static defaultProps = { name: 'Jack', age: 25 };

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  render() {
    return (
      <View style={styles.textInputContainer}>
        <Text allowFontScaling={false} style={{ color: 'rgb(51, 51, 51)' }}>
          {this.props.title}
        </Text>
        <TextInput
          title={this.props.title}
          name={this.props.name}
          value={this.props.value}
          label={this.props.label}
          allowFontScaling={false}
          style={styles.textInput}
          placeholder={this.props.placeholder || ''}
          placeholderTextColor="#999"
          clearButtonMode="while-editing"
          password={this.props.password}
          defaultValue={this.state.value || ''}
          secureTextEntry={this.props.secureTextEntry}
          onChangeText={this.props.onChangeText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    borderColor: '#CCC',
    borderWidth: 1,
    // backgroundColor: '#ffc2c2',
    padding: 15,
    marginTop: 10,
    fontWeight: '700',
    borderRadius: 8,
    color: '#111',
    textAlign: 'left',
  },
});
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

export default class DetailScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>DetailScreen</Text>
      </View>
    );
  }a
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
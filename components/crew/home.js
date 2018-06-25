import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Home extends Component {
  static navigationOptions = { title: 'Home' }
  render() {
    return (
      <View style={styles.container}>
        <Text>Crew Home Screen</Text>
        <Text>View open work orders</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

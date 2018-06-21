import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddLocation from './AddLocation'
import AddLocation2 from './AddLocation2'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <AddLocation2 />
        <Text>Pothole Patrol</Text>
        <Text>Let's make Chicago better, together.</Text>
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
});

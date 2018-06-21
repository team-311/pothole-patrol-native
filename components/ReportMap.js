import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


export default class ReportMap extends React.Component {
  static navigationOptions = { title: 'Welcome' }
  render() {
    //const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Text>NavBar</Text>
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
  button: {
    backgroundColor: '#B3DDF2',
    width: 200,
    height: 93,
    resizeMode: Image.resizeMode.contain
  }
});

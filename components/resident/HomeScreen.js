import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';


export default class HomeScreen extends React.Component {
  static navigationOptions = { title: 'HOME' }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Text>Welcome to the home screen!</Text>
        <Text>Let's see if this works</Text>
        <TouchableOpacity onPress={() => navigate('ReportPothole')} color="blue">
          <Image source={require('../../customStyling/butReportAPothole.png')} style={styles.button} />
        </TouchableOpacity>
        <Text>Here are your active potholes:</Text>
        <Text>------------------------</Text>
        <Text>------------------------</Text>
        <Text>------------------------</Text>
        <Text>------------------------</Text>
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

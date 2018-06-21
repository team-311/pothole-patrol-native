import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export default class HomeScreen extends React.Component {
  static navigationOptions = { title: 'Welcome' }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Text>Welcome to the home screen!</Text>
        <Text>Let's see if this works</Text>
        <Button
          title="Report a Pothole"
          onPress={() => navigate('ReportPhoto')}
        />
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

import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import ReportPhoto from './components/ReportPhoto.js'
import HomeScreen from './components/HomeScreen.js'
import AddPotholeLocation from './components/AddPotholeLocation'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <NavLinks />
      <AddPotholeLocation />
        <Text>Pothole Patrol</Text>
        <Text>Let's make Chicago better, together.</Text>
      </View>
    );
  }
}

const NavLinks = createStackNavigator(
  {
    Home: HomeScreen,
    ReportPhoto: ReportPhoto
  },
  { initialRouteName: 'Home' }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


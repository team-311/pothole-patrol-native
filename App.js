import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import ReportPhoto from './components/ReportPhoto.js'
import HomeScreen from './components/HomeScreen.js'

const NavLinks = createStackNavigator(
  {
    Home: HomeScreen,
    ReportPhoto: ReportPhoto
  },
  { initialRouteName: 'Home' }
)

export default class App extends React.Component {
  render() {
    return <NavLinks />
  }
}

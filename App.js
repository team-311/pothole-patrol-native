import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import ReportPhoto from './components/ReportPhoto.js'
import HomeScreen from './components/HomeScreen.js'

const BottomLinks = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      tabBarOptions: {
        activeTintColor: '#e91e63',
        labelStyle: {
          fontSize: 12,
        }
      }
    },
    ReportPothole: {
      screen: ReportPhoto,
    },
  })

const NavLinks = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    ReportPothole: {
      screen: ReportPhoto,
    }
  })

export default class App extends React.Component {
  render() {
    return (
      <BottomLinks />
    )
  }
}

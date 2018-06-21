import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import store from './store'
import ReportPhoto from './components/ReportPhoto.js'
import HomeScreen from './components/HomeScreen.js'
import IndividualPothole from './components/IndividualPothole.js'

const BottomLinks = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      tabBarOptions: {
        activeTintColor: '#e91e63',
        labelStyle: {
          fontSize: 12,
        }
      },
      style: {
        backgroundColor: 'blue'
      }
    },
    ReportPothole: {
      screen: ReportPhoto,
    },
    IndividualPothole: {
      screen: IndividualPothole
    }
  })

// const NavLinks = createStackNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//     },
//     ReportPothole: {
//       screen: ReportPhoto,
//     }
//   })

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BottomLinks />
      </Provider>
    );
  }
}

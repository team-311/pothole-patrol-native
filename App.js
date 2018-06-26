import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';
import ReportPhoto from './components/ReportPhoto.js';
import HomeScreen from './components/HomeScreen.js';
import ReportDescription from './components/ReportDescription'
import IndividualPothole from './components/IndividualPothole'
import LoginScreen from './components/Login'
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import store from './store';
if (process.env.NODE_ENV !== 'production') require('./secrets');

const BottomLinks = createDrawerNavigator({
  Login: {
    screen: LoginScreen
  },
  Home: {
    screen: HomeScreen
  },
  ReportPothole: {
    screen: ReportPhoto,
  },
  ReportDescription: {
    screen: ReportDescription,
  },
  ViewSinglePothole: {
    screen: IndividualPothole
  }
})

const BaseNavigator = createStackNavigator({
  Base: {
    screen: BottomLinks,
  },
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#B3DDF2' },
      headerTintColor: '#FF0000',
      title: 'Pothole Patrol',
      headerLeft: <Text style={{ color: '#FFFFFF' }} onPress={() => navigation.toggleDrawer()}>     MENU   </Text>
    })
  });

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BaseNavigator />
      </Provider>
    );
  }
}

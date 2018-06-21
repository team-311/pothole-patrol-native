import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ReportPhoto from './components/ReportPhoto.js';
import HomeScreen from './components/HomeScreen.js';
import { Provider } from 'react-redux';
import AddPotholeLocation from './components/AddPotholeLocation';
import store from './store'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <NavLinks />
          <AddPotholeLocation />
          <Text>Pothole Patrol</Text>
          <Text>Let's make Chicago better, together.</Text>
        </View>
      </Provider>
    );
  }
}

const NavLinks = createStackNavigator(
  {
    Home: HomeScreen,
    ReportPhoto: ReportPhoto,
  },
  { initialRouteName: 'Home' }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

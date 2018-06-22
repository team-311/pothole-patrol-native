import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import ReportPhoto from './components/ReportPhoto.js';
import HomeScreen from './components/HomeScreen.js';
import ReportDescription from './components/ReportDescription'
import IndividualPothole from './components/IndividualPothole'
import { Provider } from 'react-redux';
import store from './store';

const BottomLinks = createBottomTabNavigator(
  {
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
  });

const NavLinks = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  ReportPothole: {
    screen: ReportPhoto,
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BottomLinks />
      </Provider>
    );
  }
}

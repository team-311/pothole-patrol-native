import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import ReportPhoto from './components/ReportPhoto.js';
import HomeScreen from './components/HomeScreen.js';
import ReportDescription from './components/ReportDescription';
import { Provider } from 'react-redux';
import store from './store';

const report = createStackNavigator(
  {
    Camera: {
      screen: ReportPhoto,
    },
    ReportDescription: {
      screen: ReportDescription,
    },
  },
  { initialRouteName: 'Camera' }
);

const BottomLinks = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    tabBarOptions: {
      activeTintColor: '#e91e63',
      labelStyle: {
        fontSize: 12,
      },
    },
  },
  ReportPothole: {
    screen: report,
  },
});

const NavLinks = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  ReportPothole: {
    screen: ReportPhoto,
  },
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

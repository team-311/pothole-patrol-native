import React from 'react';
import * as Expo from 'expo'
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';
import ReportPhoto from './components/ReportPhoto.js';
import HomeScreen from './components/HomeScreen.js';
import ReportDescription from './components/ReportDescription'
import IndividualPothole from './components/IndividualPothole'
import AddPotholeLocation from './components/AddPotholeLocation'
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import store from './store';
if (process.env.NODE_ENV !== 'production') require('./secrets');

const ReportStack = createStackNavigator(
  {
    Location: {
      screen: AddPotholeLocation,
    },
    Camera: {
      screen: ReportPhoto,
    },
    ReportDescription: {
      screen: ReportDescription,
    },
  },
  {
    initialRouteName: 'Location',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);

const BottomLinks = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  ReportPothole: {
    screen: ReportStack,
    navigationOptions: {
      title: 'Report a Pothole'
    }
  },
  ViewSinglePothole: {
    screen: IndividualPothole,
    navigationOptions: {
      title: 'View Single Pothole'
    }
  }
},
{
  initialRouteName: 'Home',
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
      headerLeft: <Text onPress={() => navigation.toggleDrawer()}>     MENU</Text>
    })
  });

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      isReady: false
    };
  }

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) return <View />
    return (
      <Provider store={store}>
        <BaseNavigator />
      </Provider>
    );
  }
}

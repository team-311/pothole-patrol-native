import React from 'react'
import { Icon } from 'native-base'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import AddPotholeLocation from '../resident/AddPotholeLocation';
import ReportPhoto from '../resident/ReportPhoto';
import ReportDescription from '../resident/ReportDescription';
import HomeScreen from '../resident/HomeScreen';
import IndividualPothole from '../IndividualPothole';
import Settings from '../Settings'

// request form routes
const ReportStack = createStackNavigator(
  {
    Location: {
      screen: AddPotholeLocation,
    },
    ViewPothole: {
      screen: IndividualPothole
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
)

// main app routes
const DrawerLinks = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  ReportPothole: {
    screen: ReportStack,
    navigationOptions: {
      drawerLabel: 'Report a Pothole' // () => null
    }
  },
  ViewSinglePothole: {
    screen: IndividualPothole,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings'
    }
  }
},
  {
    initialRouteName: 'Home',
  })

export default createStackNavigator({
  Base: {
    screen: DrawerLinks,
  },
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#B3DDF2' },
      headerTintColor: '#FF0000',
      title: 'Pothole Patrol',
      headerLeft: <Icon name="menu" style={{ marginLeft: 15 }} onPress={() => navigation.toggleDrawer()} />
    })
  })

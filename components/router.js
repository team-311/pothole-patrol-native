import React from 'react'
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import Login from './login'
import AddPotholeLocation from './AddPotholeLocation';
import ReportPhoto from './ReportPhoto';
import ReportDescription from './ReportDescription';
import HomeScreen from './HomeScreen';
import IndividualPothole from './IndividualPothole';
import Settings from './Settings'

// Authentication routes
export const SignedOut = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  }
}, {
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
})

// Application routes
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
)

const DrawerLinks = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  ReportPothole: {
    screen: ReportStack,
    navigationOptions: {
      drawerLabel: 'Report a Pothole' //() => null
    }
  },
  ViewSinglePothole: {
    screen: IndividualPothole,
    navigationOptions: {
      title: 'View Single Pothole'
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

export const SignedIn = createStackNavigator({
  Base: {
    screen: DrawerLinks,
  },
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#B3DDF2' },
      headerTintColor: '#FF0000',
      title: 'Pothole Patrol',
      headerLeft: <Icon name="menu" style={{marginLeft: 15}} onPress={() => navigation.toggleDrawer()} />
    })
})

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator({
    SignedIn: {
      screen: SignedIn,
    },
    SignedOut: {
      screen: SignedOut,
    }
  },{
    initialRouteName: (signedIn) ? 'SignedIn' : 'SignedOut'
  })
}
